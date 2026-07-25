import * as pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export async function extractTextFromTxtMd(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

export async function extractTextFromDocx(file) {
  let arrayBuffer;
  try {
    arrayBuffer = await file.arrayBuffer();
  } catch {
    throw new Error('Failed to read DOCX file. The file may be corrupted.');
  }

  const mammoth = await import('mammoth');
  let result;
  try {
    result = await mammoth.extractRawText({ arrayBuffer });
  } catch {
    throw new Error(
      'Failed to extract text from DOCX. The file may be corrupted or password-protected.'
    );
  }

  const text = result.value?.trim();
  if (!text) {
    throw new Error(
      'The DOCX file appears to contain no extractable text. ' +
        'It may contain only images or scanned content. Try a file with selectable text.'
    );
  }
  return text;
}

export async function extractTextFromPdf(file) {
  let arrayBuffer;
  try {
    arrayBuffer = await file.arrayBuffer();
  } catch {
    throw new Error('Failed to read PDF file. The file may be corrupted.');
  }

  let pdf;
  try {
    pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  } catch (err) {
    if (err?.name === 'PasswordException') {
      throw new Error(
        'This PDF is password-protected. Please remove the password and try again.'
      );
    }
    throw new Error(
      'Failed to read PDF. The file may be corrupted or unsupported.'
    );
  }

  const pages = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    let page;
    try {
      page = await pdf.getPage(i);
    } catch {
      continue;
    }

    const textContent = await page.getTextContent();
    const text = textContent.items.map((item) => item.str).join(' ');
    pages.push(text);
  }

  const allText = pages.join('\n\n').trim();
  if (!allText) {
    throw new Error(
      'No text could be extracted from this PDF. It may be a scanned document or contain only images. ' +
        'Please use a file with selectable text or run OCR on the document first.'
    );
  }
  return allText;
}

export async function extractTextFromFile(file) {
  const name = file.name.toLowerCase();

  if (name.endsWith('.txt') || name.endsWith('.md')) {
    return extractTextFromTxtMd(file);
  }
  if (name.endsWith('.docx')) {
    return extractTextFromDocx(file);
  }
  if (name.endsWith('.pdf')) {
    return extractTextFromPdf(file);
  }

  throw new Error(`Unsupported file format: "${file.name}". Accepted formats: .txt, .md, .docx, .pdf`);
}
