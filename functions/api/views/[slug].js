export async function onRequestGet(context) {
  const { request, env, params } = context;
  const slug = params.slug;

  if (!slug) {
    return new Response(JSON.stringify({ error: "Missing slug" }), { status: 400 });
  }

  try {
    const { results } = await env.DB.prepare(
      "SELECT count FROM views WHERE slug = ?"
    ).bind(slug).all();

    const count = results.length > 0 ? results[0].count : 0;

    return new Response(JSON.stringify({ count }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

export async function onRequestPost(context) {
  const { request, env, params } = context;
  const slug = params.slug;

  if (!slug) {
    return new Response(JSON.stringify({ error: "Missing slug" }), { status: 400 });
  }

  try {
    // Insert with count 1, or increment existing count by 1
    await env.DB.prepare(`
      INSERT INTO views (slug, count)
      VALUES (?, 1)
      ON CONFLICT(slug) DO UPDATE SET count = count + 1
    `).bind(slug).run();

    // Fetch the updated count
    const { results } = await env.DB.prepare(
      "SELECT count FROM views WHERE slug = ?"
    ).bind(slug).all();

    const count = results.length > 0 ? results[0].count : 0;

    return new Response(JSON.stringify({ success: true, count }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
