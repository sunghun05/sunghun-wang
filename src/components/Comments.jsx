import React, { useState, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';

export default function Comments({ slug }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments/${slug}`);
      const data = await res.json();
      if (data.comments) {
        setComments(data.comments);
      }
    } catch (err) {
      console.error("Failed to load comments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      setLoading(true);
      fetchComments();
    }
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nickname.trim() || !content.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/comments/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, content })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        // Clear form and refetch
        setContent('');
        // Keep nickname for convenience of multiple comments
        await fetchComments();
      } else {
        setError(data.error || "Failed to post comment");
      }
    } catch (err) {
      setError("Network error occurred while posting comment.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="comments-section">
      <h3 className="comments-header">
        <MessageSquare size={20} />
        Comments ({comments.length})
      </h3>

      <div className="comments-list">
        {loading ? (
          <p className="comments-loading">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="comments-empty">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-meta">
                <span className="comment-author">{comment.nickname}</span>
                <span className="comment-date">
                  {new Date(comment.created_at).toLocaleDateString(undefined, {
                    year: 'numeric', month: 'short', day: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="comment-text">{comment.content}</div>
            </div>
          ))
        )}
      </div>

      <form className="comment-form" onSubmit={handleSubmit}>
        <h4>Leave a comment</h4>
        {error && <div className="comment-error">{error}</div>}
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Nickname (Anonymous)"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            maxLength={30}
            className="comment-input"
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="What do you think?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            className="comment-textarea"
          />
        </div>
        <button type="submit" className="comment-submit" disabled={submitting || !nickname.trim() || !content.trim()}>
          {submitting ? 'Posting...' : (
            <>
              <Send size={16} /> Post Comment
            </>
          )}
        </button>
      </form>
    </div>
  );
}
