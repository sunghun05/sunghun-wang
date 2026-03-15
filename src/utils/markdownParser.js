import fm from 'front-matter';

// Load all markdown files synchronously for the initial graph build
const mdFiles = import.meta.glob('../assets/posts/*.md', { query: '?raw', import: 'default', eager: true });

export function getPostsAndGraphData() {
  const posts = [];
  const nodesMap = new Map();
  const linksMap = new Map();

  for (const path in mdFiles) {
    const rawContent = mdFiles[path];
    const { attributes, body } = fm(rawContent);
    const slug = path.split('/').pop().replace('.md', '');

    const post = {
      id: slug,
      title: attributes.title || slug,
      date: attributes.date || '',
      topics: attributes.topics || attributes.tags || [],
      content: body,
    };
    posts.push(post);

    // Build Graph Data
    // Nodes: Each topic is a node. There is also a central node maybe?
    for (const topic of post.topics) {
      if (!nodesMap.has(topic)) {
        nodesMap.set(topic, {
          id: topic,
          name: topic,
          val: 1,
          type: 'topic'
        });
      } else {
        nodesMap.get(topic).val += 1;
      }
    }

    // Links: connect topics if they share the same post
    for (let i = 0; i < post.topics.length; i++) {
      for (let j = i + 1; j < post.topics.length; j++) {
        const t1 = post.topics[i];
        const t2 = post.topics[j];
        // Consistent link ID
        const linkId = [t1, t2].sort().join('-');
        if (!linksMap.has(linkId)) {
          linksMap.set(linkId, {
            source: t1,
            target: t2,
            value: 1
          });
        } else {
          linksMap.get(linkId).value += 1;
        }
      }
    }
  }

  // Ensure there's at least one node to avoid empty graph issues when no topics
  if (nodesMap.size === 0 && posts.length > 0) {
    nodesMap.set('General', { id: 'General', name: 'General', val: 1 });
    posts.forEach(p => p.topics.push('General'));
  }

  const gData = {
    nodes: Array.from(nodesMap.values()),
    links: Array.from(linksMap.values()),
  };

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return { posts, graphData: gData };
}
