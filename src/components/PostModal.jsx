import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { X } from 'lucide-react';

export default function PostModal({ post, onClose }) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!post) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <button className="close-btn" onClick={onClose} aria-label="Close modal">
                <X size={24} />
            </button>
            <div className="modal-content" onClick={e => e.stopPropagation()}>

                <h1>{post.title}</h1>



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
            </div>
        </div>
    );
}
