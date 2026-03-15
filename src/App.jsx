import React, { useState, useEffect } from 'react';
import OntologyGraph from './components/OntologyGraph';
import Sidebar from './components/Sidebar';
import PostModal from './components/PostModal';
import PortfolioPanel from './components/PortfolioPanel';
import { getPostsAndGraphData } from './utils/markdownParser';
import { User } from 'lucide-react';

function App() {
  const [graphData, setGraphData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
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
        onPostClick={setSelectedPost}
        theme={theme}
        onToggleTheme={toggleTheme}
        onClose={() => {
          setSelectedNode(null);
          setShowAllPosts(false);
        }}
      />

      <PostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />

      <PortfolioPanel
        isOpen={portfolioOpen}
        onClose={() => setPortfolioOpen(false)}
      />
    </div>
  );
}

export default App;
