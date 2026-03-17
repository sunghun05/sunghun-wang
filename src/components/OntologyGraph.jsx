import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { RefreshCw, List } from 'lucide-react';
import { forceCollide, forceX, forceY } from 'd3-force';

// Node sizing
const NODE_R = 7;
const NODE_R_HOVER = 9;

export default function OntologyGraph({ graphData, onNodeClick, theme, onShowAllPosts }) {
    const fgRef = useRef();
    const containerRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const [hoveredNode, setHoveredNode] = useState(null); // node object or null

    // Theme-aware colors
    const isLight = theme === 'light';
    const graphBg = isLight ? '#ffffff' : '#0d1117';
    const nodeColor = isLight ? '#0969da' : '#58a6ff';
    const nodeGlow = isLight ? 'rgba(9, 105, 218, 0.4)' : 'rgba(88, 166, 255, 0.6)';
    const labelColor = isLight ? 'rgba(31,35,40,0.85)' : 'rgba(201,209,217,0.85)';
    const labelHoverColor = isLight ? '#000000' : '#ffffff';
    const labelShadow = isLight ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
    const linkColor = isLight ? 'rgba(9, 105, 218, 0.15)' : 'rgba(88, 166, 255, 0.15)';

    // Responsive dimensions
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight,
                });
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Configure d3-force: adjust spacing based on screen size
    const isMobile = dimensions.width < 768;

    useEffect(() => {
        if (fgRef.current) {
            fgRef.current.d3Force('charge').strength(isMobile ? -200 : -200);
            fgRef.current.d3Force('link').distance(isMobile ? 60 : 120);
            fgRef.current.d3Force('collide', forceCollide(isMobile ? 30 : 50));
            // Add a weak center gravity so disconnected subgraphs don't fly off to infinity
            fgRef.current.d3Force('x', fgRef.current.d3Force('x') || forceX(0).strength(0.05));
            fgRef.current.d3Force('y', fgRef.current.d3Force('y') || forceY(0).strength(0.05));
        }
    }, [graphData, isMobile]);

    // Set fixed initial zoom
    useEffect(() => {
        if (fgRef.current) {
            setTimeout(() => {
                if (fgRef.current) {
                    fgRef.current.centerAt(0, 0);
                    fgRef.current.zoom(isMobile ? 0.8 : 1.0, 800);
                }
            }, 100);
        }
    }, [graphData, isMobile]);

    // Build highlight sets from hoveredNode — derived, not separate state
    const { highlightNodeIds, highlightLinks } = useMemo(() => {
        const nodeIds = new Set();
        const links = new Set();
        if (hoveredNode && graphData) {
            nodeIds.add(hoveredNode.id);
            graphData.links.forEach(link => {
                const srcId = typeof link.source === 'object' ? link.source.id : link.source;
                const tgtId = typeof link.target === 'object' ? link.target.id : link.target;
                if (srcId === hoveredNode.id || tgtId === hoveredNode.id) {
                    links.add(link);
                    nodeIds.add(srcId);
                    nodeIds.add(tgtId);
                }
            });
        }
        // console.log(nodeIds, links);
        return { highlightNodeIds: nodeIds, highlightLinks: links };
    }, [hoveredNode, graphData]);

    // Custom node drawing: circle + label below
    const paintNode = useCallback((node, ctx, globalScale) => {
        const isHovered = hoveredNode && hoveredNode.id === node.id;
        const r = isHovered ? NODE_R_HOVER : NODE_R;

        // Dim nodes not in the highlight set when something is hovered
        const shouldDim = hoveredNode !== null && !highlightNodeIds.has(node.id);


        // ---- Circle with glow ----
        ctx.shadowColor = nodeGlow;
        ctx.globalAlpha = shouldDim ? 0.12 : 1.0;

        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        // ---- Label below ----
        const label = node.name;
        const fontSize = 11 / globalScale;
        ctx.font = `600 ${fontSize}px Inter, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        const labelY = node.y + r + 2;

        // Text shadow for readability
        ctx.fillStyle = labelShadow;
        ctx.fillText(label, node.x + 0.5, labelY + 0.5);

        ctx.fillStyle = isHovered ? labelHoverColor : labelColor;
        ctx.fillText(label, node.x, labelY);

        // Save for pointer area
        const tw = ctx.measureText(label).width;
        node.__hitR = r;
        node.__labelBounds = { x: node.x - tw / 2, y: labelY, w: tw, h: fontSize };

        // Reset alpha
        ctx.globalAlpha = 1.0;
    }, [hoveredNode, highlightNodeIds, nodeColor, nodeGlow, labelColor, labelHoverColor, labelShadow]);

    // Pointer area for clicks/hover
    const paintPointerArea = useCallback((node, color, ctx) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, (node.__hitR || NODE_R) + 10, 0, 2 * Math.PI);
        ctx.fill();
        if (node.__labelBounds) {
            const b = node.__labelBounds;
            ctx.fillRect(b.x - 2, b.y - 2, b.w + 4, b.h + 4);
        }
    }, []);

    // Custom link drawing
    const paintLink = useCallback((link, ctx) => {
        const start = link.source;
        const end = link.target;

        const shouldDim = hoveredNode !== null && !highlightLinks.has(link);
        ctx.globalAlpha = shouldDim ? 0.04 : 1.0;

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = linkColor;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.globalAlpha = 1.0;
    }, [hoveredNode, highlightLinks, linkColor]);

    if (!graphData || graphData.nodes.length === 0) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#8b949e' }}>
                No graph data available. Add some markdown posts!
            </div>
        );
    }

    const handleRelayout = () => {
        if (fgRef.current) {
            fgRef.current.d3ReheatSimulation();
            fgRef.current.centerAt(0, 0, 800);
            fgRef.current.zoom(isMobile ? 0.8 : 1.0, 800);
        }
    };

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
            <div className="graph-controls">
                <button
                    className="all-posts-btn"
                    onClick={onShowAllPosts}
                    aria-label="View All Posts"
                >
                    All Posts
                </button>
                <button
                    className="theme-toggle-btn"
                    onClick={handleRelayout}
                    aria-label="Re-layout graph"
                >
                    <RefreshCw size={18} />
                </button>
            </div>
            <ForceGraph2D
                ref={fgRef}
                width={dimensions.width}
                height={dimensions.height}
                graphData={graphData}
                backgroundColor={graphBg}
                nodeCanvasObject={paintNode}
                nodePointerAreaPaint={paintPointerArea}
                linkCanvasObject={paintLink}
                onNodeClick={onNodeClick}
                onNodeHover={node => setHoveredNode(node || null)}
                enableNodeDrag={true}
                enableZoomInteraction={true}
                enablePanInteraction={true}
                minZoom={0.1}
                autoPauseRedraw={false}
                d3VelocityDecay={0.15}
                d3AlphaDecay={0.02}
                cooldownTime={3000}
            />
        </div>
    );
}
