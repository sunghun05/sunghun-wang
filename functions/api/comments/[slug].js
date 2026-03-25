export async function onRequestGet(context) {
  const { request, env, params } = context;
  const slug = params.slug;

  if (!slug) {
    return new Response(JSON.stringify({ error: "Missing slug" }), { status: 400 });
  }

  try {
    // Fetch comments ordered by created_at ascending (oldest first)
    const { results } = await env.DB.prepare(
      "SELECT id, nickname, content, created_at FROM comments WHERE slug = ? ORDER BY created_at ASC"
    ).bind(slug).all();

    return new Response(JSON.stringify({ comments: results }), {
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
    const data = await request.json();
    const { nickname, content } = data;

    if (!nickname || !content || nickname.trim() === "" || content.trim() === "") {
      return new Response(JSON.stringify({ error: "Nickname and content are required" }), { status: 400 });
    }

    // Insert new comment
    await env.DB.prepare(`
      INSERT INTO comments (slug, nickname, content)
      VALUES (?, ?, ?)
    `).bind(slug, nickname.trim(), content.trim()).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
