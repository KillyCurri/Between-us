// Vercel Serverless Function: serverless/vercel/api/ai.js
// Deploy to Vercel (or similar). Set the environment variable GEMINI_API_KEY in your project settings.

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return res.status(204).end()
  }

  const { body } = req
  const key = process.env.GEMINI_API_KEY
  if (!key) return res.status(500).json({ error: 'Missing GEMINI_API_KEY' })

  try {
    // Replace with actual Gemini REST API URL and payload format.
    const apiRes = await fetch('https://api.example.gemini/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify(body),
    })

    const json = await apiRes.json()
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.status(apiRes.status).json(json)
  } catch (err) {
    return res.status(500).json({ error: String(err) })
  }
}
