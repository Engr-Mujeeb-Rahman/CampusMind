const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

export async function generateContent(prompt, options = {}) {
  if (!GEMINI_API_KEY) {
    console.warn('VITE_GEMINI_API_KEY is not configured')
    return null
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        ...options,
      }),
    },
  )

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`)
  }

  const data = await response.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
}

export default { generateContent }
