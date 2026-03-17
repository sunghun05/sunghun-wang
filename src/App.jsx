import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import OntologyGraph from './components/OntologyGraph';
import Sidebar from './components/Sidebar';
import PostPage from './components/PostPage';
import PortfolioPanel from './components/PortfolioPanel';
import { getPostsAndGraphData } from './utils/markdownParser';
import { User } from 'lucide-react';

function HomePage() {
  const [graphData, setGraphData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [theme, setTheme] = useState('light');
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(true);

  useEffect(() => {
    const { posts: parsedPosts, graphData: parsedGraphData } = getPostsAndGraphData();
    setPosts(parsedPosts);
    setGraphData(parsedGraphData);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app-container">
      <div className="graph-container">
        {/* Portfolio toggle button — top-left of graph */}
        <button
          className="portfolio-toggle-btn"
          onClick={() => setPortfolioOpen(true)}
        >
          <User size={16} />
          Portfolio
        </button>

        {graphData ? (
          <OntologyGraph
            graphData={graphData}
            onNodeClick={(node) => {
              setSelectedNode(node);
              setShowAllPosts(false);
            }}
            theme={theme}
            onShowAllPosts={() => {
              setSelectedNode(null);
              setShowAllPosts(true);
            }}
          />
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--text-muted)' }}>
            Loading Graph...
          </div>
        )}
      </div>

      <Sidebar
        selectedNode={selectedNode}
        posts={posts}
        graphData={graphData}
        showAllPosts={showAllPosts}
        theme={theme}
        onToggleTheme={toggleTheme}
        onClose={() => {
          setSelectedNode(null);
          setShowAllPosts(false);
        }}
      />

      <PortfolioPanel
        isOpen={portfolioOpen}
        onClose={() => setPortfolioOpen(false)}
      />

      {/* Hidden SEO nav — invisible to users but crawlable by search engines */}
      <nav aria-label="All blog posts" className="seo-nav">
        <h2>Blog Posts</h2>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <a href={`/post/${post.id}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/post/:slug" element={<PostPage />} />
    </Routes>
  );
}

export default App;
