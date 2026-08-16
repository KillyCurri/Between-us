// Cloudflare Worker (Module Syntax)
// Deploy this via Cloudflare Workers; bind your Gemini API key as a secret named `GEMINI_API_KEY`.

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }

    if (url.pathname !== '/generate' && url.pathname !== '/followup') {
      return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
    }

    let body
    try {
      body = await request.json()
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const key = env.GEMINI_API_KEY
    if (!key) {
      return new Response(JSON.stringify({ error: 'Missing GEMINI_API_KEY' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }

    // NOTE: Replace the endpoint below with the official Gemini REST endpoint and adjust the
    // request shape to match Google's API. This proxy simply forwards requests and adds
    // Authorization header so your secret key remains on the server-side.
    try {
      const apiRes = await fetch('https://api.example.gemini/v1/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`,
        },
        body: JSON.stringify(body),
      })

      const json = await apiRes.json()
      return new Response(JSON.stringify(json), {
        status: apiRes.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    } catch (err) {
      return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }
  }
}
