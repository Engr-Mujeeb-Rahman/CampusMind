const supabase = require('../services/supabase');
const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

async function uploadFile(req, res) {
  const { title, content, subject_id } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    throw ApiError.badRequest('A file title is required.');
  }

  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    throw ApiError.badRequest('Extracted text content is required.');
  }

  const userId = req.user.id;

  if (!supabase.isConfigured()) {
    return res.json({
      success: true,
      data: {
        id: 'dev-' + Date.now(),
        title: title.trim(),
        status: 'ready',
        message: 'Document saved (dev mode — no database).',
      },
    });
  }

  const client = supabase.getServiceClient();

  let storagePath = null;
  if (req.file) {
    const fileExt = req.file.originalname.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await client.storage
      .from('documents')
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (uploadError) {
      logger.error('Storage upload failed', uploadError.message);
    } else {
      storagePath = fileName;
    }
  }

  const docData = {
    user_id: userId,
    title: title.trim(),
    extracted_text: content.trim(),
    storage_path: storagePath,
    status: 'ready',
    subject_id: subject_id || null,
  };

  const { data, error } = await client
    .from('documents')
    .insert(docData)
    .select()
    .single();

  if (error) {
    logger.error('Document insert failed', error.message);
    throw ApiError.internal('Failed to save document record.');
  }

  res.status(201).json({
    success: true,
    data: {
      id: data.id,
      title: data.title,
      status: data.status,
      created_at: data.created_at,
    },
  });
}

module.exports = { uploadFile };
