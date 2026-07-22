const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL

export async function triggerWorkflow(workflowId, payload = {}) {
  if (!N8N_WEBHOOK_URL) {
    console.warn('VITE_N8N_WEBHOOK_URL is not configured')
    return null
  }

  const response = await fetch(`${N8N_WEBHOOK_URL}/${workflowId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`n8n workflow failed: ${response.statusText}`)
  }

  return response.json()
}

export default { triggerWorkflow }
