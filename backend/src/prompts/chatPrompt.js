function build(message) {
  return (
    'You are CampusMind, an AI academic assistant for university students. ' +
    'You help students understand concepts, answer questions, and guide their learning. ' +
    'Be concise, accurate, and supportive. Use examples where helpful.\n\n' +
    `Student: ${message}\n\nCampusMind:`
  );
}

function buildWithContext(message, documentText, documentTitle) {
  if (!documentText) {
    return build(message);
  }

  const truncatedText = documentText.length > 8000
    ? documentText.slice(0, 8000) + '\n...[content truncated]'
    : documentText;

  return (
    'You are CampusMind, an AI academic assistant. You have access to the following study document. ' +
    'Answer the student\'s questions based ONLY on this document content. ' +
    'If the document doesn\'t contain the answer, say so politely.\n\n' +
    `--- Document: ${documentTitle || 'Untitled'} ---\n${truncatedText}\n--- End of Document ---\n\n` +
    `Student: ${message}\n\nCampusMind:`
  );
}

module.exports = { build, buildWithContext };
