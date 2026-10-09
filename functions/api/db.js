// Stocke toute la base dans Cloudflare KV (binding "DB"), protégée par le secret PASSWORD.
export async function onRequest({ request, env }) {
  const auth = request.headers.get('Authorization') || '';
  if (!env.PASSWORD || auth !== 'Bearer ' + env.PASSWORD) {
    return new Response('Unauthorized', { status: 401 });
  }
  if (request.method === 'GET') {
    const v = await env.DB.get('db');
    return new Response(v || 'null', { headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
  }
  if (request.method === 'PUT') {
    const body = await request.text();
    if (body.length > 5000000) return new Response('Too large', { status: 413 });
    try { JSON.parse(body); } catch (e) { return new Response('Bad JSON', { status: 400 }); }
    await env.DB.put('db', body);
    return new Response('ok');
  }
  return new Response('Method not allowed', { status: 405 });
}
