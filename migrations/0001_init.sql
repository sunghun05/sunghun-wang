-- Create views table
CREATE TABLE IF NOT EXISTS views (
  slug TEXT PRIMARY KEY,
  count INTEGER DEFAULT 0
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL,
  nickname TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create an index to quickly fetch comments for a specific post
CREATE INDEX IF NOT EXISTS idx_comments_slug ON comments(slug);
