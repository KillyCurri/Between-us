// Cloudflare Worker (Module Syntax)
// Deploy this via Cloudflare Workers; bind your Gemini API key as a secret named `GEMINI_API_KEY`.

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // CORS preflight
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

    // Upstream target is configurable via AI_UPSTREAM env binding. If you want to call
    // Google's Gemini REST API directly, set AI_UPSTREAM to the official endpoint and
    // bind your API key to the `GEMINI_API_KEY` secret.
    const upstream = env.AI_UPSTREAM || env.GEMINI_UPSTREAM || 'https://api.example.gemini/v1/generate'
    const key = env.GEMINI_API_KEY

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
    if (key) headers['Authorization'] = `Bearer ${key}`

    try {
      const apiRes = await fetch(upstream, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      })

      const text = await apiRes.text()
      const resHeaders = new Headers({
        'Content-Type': apiRes.headers.get('content-type') || 'application/json',
        'Access-Control-Allow-Origin': '*',
      })

      return new Response(text, { status: apiRes.status, headers: resHeaders })
    } catch (err) {
      return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }
  }
}
