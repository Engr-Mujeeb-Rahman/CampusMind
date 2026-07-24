const config = require('../config');
const logger = require('../utils/logger');

const n8n = {
  async triggerWorkflow(workflowName, payload) {
    const url = `${config.n8n.webhookBaseUrl}/webhook/${workflowName}`;
    logger.debug('n8n.triggerWorkflow called — not yet implemented', { url });
    return { status: 'placeholder', workflow: workflowName };
  },
};

module.exports = n8n;
