import React from 'react';
import { Sun, Moon, ChevronDown } from 'lucide-react';

export default function Sidebar({ selectedNode, posts, graphData, showAllPosts, onPostClick, theme, onToggleTheme, onClose }) {
    // Find adjacent (neighbor) topics for the selected node
    const getAdjacentTopics = () => {
        if (!selectedNode || !graphData) return [];
        const neighbors = new Set();
        for (const link of graphData.links) {
            const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
            const targetId = typeof link.target === 'object' ? link.target.id : link.target;
            if (sourceId === selectedNode.id) neighbors.add(targetId);
            if (targetId === selectedNode.id) neighbors.add(sourceId);
        }
        return Array.from(neighbors);
    };

    const adjacentTopics = getAdjacentTopics();
    const nodePosts = selectedNode ? posts.filter(post => post.topics.includes(selectedNode.id)) : [];

    // Posts from adjacent topics (excluding ones already in nodePosts)
    const nodePostIds = new Set(nodePosts.map(p => p.id));
    const relatedPosts = adjacentTopics.length > 0
        ? posts.filter(p => !nodePostIds.has(p.id) && p.topics.some(t => adjacentTopics.includes(t)))
        : [];

    const PostCard = ({ post }) => (
        <div className="glass-card" onClick={() => onPostClick(post)}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{post.title}</h3>
            {post.date && <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{post.date}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {post.topics.map(topic => (
                    <span key={topic} style={{ background: 'rgba(88, 166, 255, 0.2)', color: 'var(--accent-color)', padding: '0.2rem 0.5rem', borderRadius: '12px', fontSize: '0.75rem' }}>
                        {topic}
                    </span>
                ))}
            </div>
        </div>
    );

    const isActive = selectedNode !== null || showAllPosts;

    const headerContent = (
        <div className="sidebar-header">
            <div className="sidebar-header-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {isActive && (
                        <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: 'none', color: 'var(--text-color)', cursor: 'pointer', display: 'flex', padding: '0.2rem' }}>
                            <ChevronDown size={22} />
                        </button>
                    )}
                    <h2 style={{ fontSize: '1.4rem', margin: 0 }}>
                        {selectedNode ? selectedNode.name : (showAllPosts ? 'All Posts' : 'Blog Graph')}
                    </h2>
                </div>
                <button className="theme-toggle-btn" onClick={onToggleTheme} aria-label="Toggle theme">
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
            </div>
            {selectedNode ? (
                <>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                        {nodePosts.length} post{nodePosts.length !== 1 ? 's' : ''}
                    </p>
                    {adjacentTopics.length > 0 && (
                        <div style={{ marginTop: '0.6rem' }}>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Related Topics</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                {adjacentTopics.map(topic => (
                                    <span key={topic} style={{
                                        background: 'rgba(88, 166, 255, 0.15)',
                                        color: 'var(--accent-color)',
                                        padding: '0.25rem 0.6rem',
                                        borderRadius: '12px',
                                        fontSize: '0.8rem',
                                        fontWeight: 500,
                                    }}>
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            ) : (showAllPosts ? (
                <p style={{ color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                    {posts.length} post{posts.length !== 1 ? 's' : ''} total
                </p>
            ) : (
                <p style={{ color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                    Select a node in the graph to view related posts.
                </p>
            ))}
        </div>
    );

    if (!isActive) {
        return (
            <div className={`sidebar-container glass`}>
                {headerContent}
            </div>
        );
    }

    return (
        <div className={`sidebar-container glass active`}>
            {headerContent}
            <div className="sidebar-content">
                {!selectedNode && showAllPosts ? (
                    posts.map(post => <PostCard key={post.id} post={post} />)
                ) : (
                    <>
                        {nodePosts.length > 0 ? (
                            nodePosts.map(post => <PostCard key={post.id} post={post} />)
                        ) : (
                            <p style={{ color: 'var(--text-muted)' }}>No posts found for this topic.</p>
                        )}

                        {relatedPosts.length > 0 && (
                            <>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem', paddingBottom: '0.3rem', borderBottom: '1px solid var(--primary-border)' }}>
                                    Related Posts
                                </p>
                                {relatedPosts.map(post => <PostCard key={post.id} post={post} />)}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
