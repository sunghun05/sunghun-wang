import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { getPostsAndGraphData } from '../utils/markdownParser';

export default function PostPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

    const { posts } = useMemo(() => getPostsAndGraphData(), []);
    const post = posts.find(p => p.id === slug);

    // Set document title for SEO
    useEffect(() => {
        if (post) {
            document.title = `${post.title} — Sunghun Wang`;
        } else {
            document.title = 'Post Not Found — Sunghun Wang';
        }
        return () => {
            document.title = 'Sunghun Wang — AI Researcher & Portfolio';
        };
    }, [post]);

    // Allow body scroll on this page
    useEffect(() => {
        document.body.style.overflow = 'auto';
        return () => {
            document.body.style.overflow = 'hidden';
        };
    }, []);

    if (!post) {
        return (
            <div className="post-page">
                <div className="post-page-content">
                    <button className="post-back-btn" onClick={() => navigate('/')}>
                        <ArrowLeft size={18} />
                        Back to Graph
                    </button>
                    <h1>Post not found</h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        The post "{slug}" could not be found.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="post-page">

            <div className="post-page-content">
                <div className="post-page-top-btns">
                    <button className="post-back-btn" onClick={() => navigate('/')}>
                        <ArrowLeft size={18} />
                        Back to Graph
                    </button>
                    <button className="theme-toggle-btn post-page-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>
                <article>
                    <header className="post-page-header">
                        <h1>{post.title}</h1>
                        {post.date && (
                            <time className="post-page-date">{post.date}</time>
                        )}
                        <div className="post-page-topics">
                            {post.topics.map(topic => (
                                <span key={topic} className="post-page-topic-tag">
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </header>

                    <div className="markdown-body">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                            components={{
                                img: ({ node, src, alt, ...props }) => {
                                    let imageSrc = src;
                                    if (src && src.startsWith('/') && !src.startsWith('//')) {
                                        const base = import.meta.env.BASE_URL || '/';
                                        imageSrc = base.endsWith('/') ? base + src.slice(1) : base + src;
                                    }
                                    return (
                                        <img
                                            src={imageSrc}
                                            alt={alt}
                                            style={{
                                                maxWidth: '100%',
                                                height: 'auto',
                                                display: 'block',
                                                margin: '1rem auto',
                                                borderRadius: '8px',
                                            }}
                                            {...props}
                                        />
                                    );
                                }
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </article>
            </div>
        </div>
    );
}
