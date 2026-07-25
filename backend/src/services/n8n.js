const config = require('../config');
const logger = require('../utils/logger');
const ApiError = require('../utils/ApiError');

async function triggerWorkflow(workflowName, payload) {
  const baseUrl = config.n8n.webhookUrl;
  if (!baseUrl) {
    throw ApiError.internal('n8n webhook URL not configured. Set N8N_WEBHOOK_URL in .env.');
  }

  const url = `${baseUrl.replace(/\/+$/, '')}/${workflowName}`;
  const timeoutMs = config.n8n.timeoutMs;

  logger.debug('n8n.triggerWorkflow', { workflow: workflowName, url });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      logger.error('n8n webhook returned error', {
        status: response.status,
        body: text,
        workflow: workflowName,
      });
      throw ApiError.badRequest(
        `n8n workflow returned status ${response.status}`,
        'N8N_WEBHOOK_ERROR'
      );
    }

    const data = await response.json().catch(() => ({}));
    logger.info('n8n workflow completed', { workflow: workflowName, status: response.status });
    return { success: true, data };
  } catch (err) {
    clearTimeout(timer);

    if (err instanceof ApiError) throw err;

    if (err.name === 'AbortError') {
      logger.error('n8n webhook timed out', { workflow: workflowName, timeoutMs });
      throw ApiError.internal('n8n webhook timed out', 'N8N_TIMEOUT');
    }

    logger.error('n8n webhook connection failed', {
      workflow: workflowName,
      error: err.message,
    });
    throw ApiError.internal('Failed to reach n8n webhook', 'N8N_CONNECTION_ERROR');
  }
}

module.exports = { triggerWorkflow };
