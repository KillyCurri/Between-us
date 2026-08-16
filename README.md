# Between Us ❤️

Private long-distance couple game built with React, TypeScript, Vite and Firebase.

## Quick start

1. Copy `.env.example` to `.env` and fill in your Firebase project and AI endpoint.
2. Install dependencies: `npm install`
3. Run dev: `npm run dev`

## Build

```
npm run build
```

## GitHub Pages Deployment

1. Push to GitHub.
2. Go to repository Settings → Pages and ensure Actions is selected as source.
3. The included GitHub Action will build and publish `dist` to GitHub Pages on push to `main`.

Notes:
- Set `VITE_PUBLIC_PATH` or the `GITHUB_REPOSITORY` env in CI to ensure assets resolve under repo subpath.
- Keep AI secrets only on your serverless backend; set `VITE_AI_ENDPOINT` to your function URL.

## AI Proxy (recommended)

This project expects a server-side AI proxy so the Gemini API key stays secret. Two example serverless templates are included:

- Cloudflare Worker: `serverless/cloudflare-worker/index.js` (module-style Worker). Bind a secret named `GEMINI_API_KEY` and deploy. Update the proxied endpoint URL inside the worker to the official Gemini REST endpoint and adjust request shapes.
- Vercel Serverless Function: `serverless/vercel/api/ai.js`. Deploy to Vercel and set the `GEMINI_API_KEY` env var in Project Settings.

When deployed, set the frontend environment variable `VITE_AI_ENDPOINT` to the full URL of your proxy (example: `https://my-proxy.example.com/generate`). The frontend will POST JSON to this endpoint; do not include the Gemini key in the frontend.

Example Cloudflare publish steps:

1. `wrangler login`
2. `wrangler publish serverless/cloudflare-worker/index.js --name between-us-ai-proxy` (bind `GEMINI_API_KEY` as a secret in Wrangler or the dashboard)

### Detailed Cloudflare Worker deployment (recommended)

1. Install Wrangler (Cloudflare CLI) if you don't have it:

```bash
npm install -g wrangler
# or use npx: npx wrangler <command>
```

2. Login to Cloudflare:

```bash
npx wrangler login
```

3. Update `wrangler.toml` in the project root: replace `YOUR_ACCOUNT_ID` with your Cloudflare account ID. Optionally set `route`/`zone_id` to publish under a custom domain.

4. Add your Gemini API key as a secret (do NOT commit it). Wrangler will prompt for the value:

```bash
npx wrangler secret put GEMINI_API_KEY
# enter your secret when prompted
```

5. Publish the Worker (workers_dev or custom route):

```bash
npx wrangler publish
```

6. Set `VITE_AI_ENDPOINT` in your frontend environment to the deployed worker URL (e.g. `https://between-us-ai-proxy.YOUR_SUBDOMAIN.workers.dev/generate`). Rebuild the frontend and deploy.

Notes:
- The included worker forwards `/generate` and `/followup` paths and injects the `Authorization: Bearer <GEMINI_API_KEY>` header when calling Gemini. Replace the placeholder Gemini URL in `serverless/cloudflare-worker/index.js` with the official Gemini REST endpoint and adjust the payload per their API.
- Secrets such as `GEMINI_API_KEY` must never be placed in the frontend or committed to the repo.

Example Vercel deploy steps:

1. Push `serverless/vercel` to a git repo and import the repo into Vercel.
2. Set environment variable `GEMINI_API_KEY` in Vercel Dashboard → Settings → Environment Variables.

After deploying, set `VITE_AI_ENDPOINT` to your deployed function's URL in your frontend environment and rebuild the frontend.

