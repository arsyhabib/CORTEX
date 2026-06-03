# CORTEX AI Proxy

This local proxy is the safe bridge between the CORTEX shell and a private ModelArk-compatible key.

Important:
- Do not place provider API keys in `index.html`, `404.html`, or any GitHub Pages asset.
- Do not use a ModelArk Coding Plan key for public app API wiring. The coding-plan quota is intended for supported AI programming tools, not a deployed web app.
- If you want live AI inside the shell, use a standard ModelArk API entitlement or another compliant provider route behind a proxy like this one.

## Local run

```bash
cd /Users/arsyhabib/Documents/APLIKASI\ UNNTUK\ ADEK
MODELARK_API_KEY=your_real_key_here node ai_proxy/local_modelark_proxy.mjs
```

Optional environment variables:
- `PORT` defaults to `8787`
- `MODELARK_BASE_URL` defaults to `https://ark.ap-southeast.bytepluses.com/api/v3`

## Frontend hook

The shell can detect a local runtime config through:

```js
window.__CORTEX_AI_LOCAL_CONFIG__ = {
  proxyUrl: 'http://localhost:8787',
  provider: 'BytePlus ModelArk',
  mode: 'proxy'
};
```

Use `/Users/arsyhabib/Documents/APLIKASI UNNTUK ADEK/ai_workspace.local.example.js` as the template, then copy it to `ai_workspace.local.js` locally if you want the shell to auto-detect the proxy path during development.
