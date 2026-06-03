import http from 'node:http';

const PORT = Number(process.env.PORT || 8787);
const BASE_URL = (process.env.MODELARK_BASE_URL || 'https://ark.ap-southeast.bytepluses.com/api/v3').replace(/\/+$/, '');
const API_KEY = process.env.MODELARK_API_KEY || '';

const catalog = {
  text: [
    { id: 'seed-2-0-lite-260228', label: 'Responses / general reasoning', route: '/responses' },
    { id: 'seed-2-0-lite-260228', label: 'Chat / compatibility path', route: '/chat/completions' },
  ],
  visual: [
    { id: 'bytedance-seedream-5-0-lite', label: 'Image generation', route: '/images/generations' },
    { id: 'seedance-2-0', label: 'Video generation', route: '/contents/generations/tasks' },
    { id: '3d-generation-api', label: '3D generation workflow', route: '/contents/generations/tasks' },
  ],
  audio: [
    { id: 'seed-2-0-lite-260228', label: 'Audio understanding / AST', route: '/responses' },
    { id: 'speech-synthesis-via-provider', label: 'TTS route (provider-specific)', route: '/responses' },
  ],
};

function writeJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  });
  res.end(JSON.stringify(payload, null, 2));
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

async function proxyPost(req, res, upstreamPath) {
  if (!API_KEY) {
    writeJson(res, 503, {
      ok: false,
      error: 'MODELARK_API_KEY is not configured on the proxy.',
    });
    return;
  }

  try {
    const body = await readJson(req);
    const upstream = await fetch(`${BASE_URL}${upstreamPath}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const text = await upstream.text();
    res.writeHead(upstream.status, {
      'Content-Type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    });
    res.end(text);
  } catch (error) {
    writeJson(res, 502, {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown proxy failure',
    });
  }
}

const server = http.createServer(async (req, res) => {
  if (!req.url) {
    writeJson(res, 400, { ok: false, error: 'Missing URL' });
    return;
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    });
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/health') {
    writeJson(res, 200, {
      ok: true,
      configured: Boolean(API_KEY),
      provider: 'BytePlus ModelArk',
      baseUrl: BASE_URL,
      caution: 'Use a standard ModelArk API entitlement or another compliant provider route behind this proxy. Do not embed secrets in GitHub Pages.',
    });
    return;
  }

  if (req.method === 'GET' && req.url === '/config/models') {
    writeJson(res, 200, {
      ok: true,
      provider: 'BytePlus ModelArk',
      baseUrl: BASE_URL,
      catalog,
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/responses') {
    await proxyPost(req, res, '/responses');
    return;
  }

  if (req.method === 'POST' && req.url === '/chat/completions') {
    await proxyPost(req, res, '/chat/completions');
    return;
  }

  if (req.method === 'POST' && req.url === '/images/generations') {
    await proxyPost(req, res, '/images/generations');
    return;
  }

  if (req.method === 'POST' && req.url === '/contents/generations/tasks') {
    await proxyPost(req, res, '/contents/generations/tasks');
    return;
  }

  writeJson(res, 404, { ok: false, error: `Unknown route ${req.method} ${req.url}` });
});

server.listen(PORT, () => {
  console.log(`CORTEX AI proxy listening on http://localhost:${PORT}`);
});
