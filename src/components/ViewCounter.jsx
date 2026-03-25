import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

export default function ViewCounter({ slug }) {
  const [viewCount, setViewCount] = useState(null);

  useEffect(() => {
    if (!slug) return;

    let mounted = true;

    // First fetch the current count (fast)
    fetch(`/api/views/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (mounted && data.count !== undefined) {
          setViewCount(data.count);
        }
      })
      .catch(err => console.error("Failed to fetch views:", err));

    // Wait a short moment then post to increment
    // This debounces slightly and ensures we don't spam hits on fast nav
    const timer = setTimeout(() => {
      fetch(`/api/views/${slug}`, { method: 'POST' })
        .then(res => res.json())
        .then(data => {
          if (mounted && data.success && data.count !== undefined) {
            setViewCount(data.count);
          }
        })
        .catch(err => console.error("Failed to increment views:", err));
    }, 1500);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [slug]);

  if (viewCount === null) {
    return (
      <span className="view-counter" title="Views">
        <Eye size={14} className="view-icon" />
        <span className="view-text">--</span>
      </span>
    );
  }

  return (
    <span className="view-counter" title="Views">
      <Eye size={14} className="view-icon" />
      <span className="view-text">{viewCount.toLocaleString()}</span>
    </span>
  );
}
