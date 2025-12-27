import { useEffect, useRef, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
  id: number;
}

interface Connection {
  from: number; // -1 means mouse node
  to: number;
  opacity: number;
  targetOpacity: number;
  drawProgress: number;
  targetDrawProgress: number;
}

interface NetworkBackgroundProps {
  variant?: 'light' | 'dark';
}

const NetworkBackground = ({ variant = 'light' }: NetworkBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const mouseConnectionsRef = useRef<Connection[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, isActive: false });
  const animationRef = useRef<number>();
  const lastInteractionRef = useRef<number>(0);
  const connectedToMouseRef = useRef<Set<number>>(new Set());

  // Colors based on variant
  const lineColor = variant === 'dark' ? '#FFFFFF' : '#000000';

  const initNetwork = useCallback((width: number, height: number) => {
    const nodes: Node[] = [];
    const connections: Connection[] = [];
    
    // Create a grid for neural network appearance
    const cols = Math.floor(width / 120);
    const rows = Math.floor(height / 120);
    const spacingX = width / (cols + 1);
    const spacingY = height / (rows + 1);
    
    let id = 0;
    for (let row = 0; row <= rows; row++) {
      for (let col = 0; col <= cols; col++) {
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;
        nodes.push({
          x: spacingX * (col + 0.5) + offsetX,
          y: spacingY * (row + 0.5) + offsetY,
          id: id++
        });
      }
    }

    // Create connections between nearby nodes
    const maxDistance = 180;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < maxDistance && Math.random() > 0.5) {
          connections.push({
            from: i,
            to: j,
            opacity: 1,
            targetOpacity: 1,
            drawProgress: 1,
            targetDrawProgress: 1
          });
        }
      }
    }

    nodesRef.current = nodes;
    connectionsRef.current = connections;
    mouseConnectionsRef.current = [];
    connectedToMouseRef.current = new Set();
  }, []);

  const findNearbyNodes = useCallback((x: number, y: number, radius: number) => {
    const nodes = nodesRef.current;
    const nearby: { index: number; distance: number }[] = [];

    nodes.forEach((node, index) => {
      const dx = node.x - x;
      const dy = node.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        nearby.push({ index, distance: dist });
      }
    });

    return nearby.sort((a, b) => a.distance - b.distance);
  }, []);

  const findConnectionsToNode = useCallback((nodeIndex: number) => {
    return connectionsRef.current.filter(
      conn => (conn.from === nodeIndex || conn.to === nodeIndex) && conn.targetOpacity > 0.3
    );
  }, []);

  const handleInteraction = useCallback((mouseX: number, mouseY: number) => {
    const now = Date.now();
    if (now - lastInteractionRef.current < 100) return;
    lastInteractionRef.current = now;

    const nearbyNodes = findNearbyNodes(mouseX, mouseY, 150);
    const connections = connectionsRef.current;
    const mouseConnections = mouseConnectionsRef.current;
    const connectedToMouse = connectedToMouseRef.current;

    // Get the closest nodes to connect to mouse
    const nodesToConnect = nearbyNodes.slice(0, 4);
    const nodeIndicesToConnect = new Set(nodesToConnect.map(n => n.index));

    // For nodes entering the radius - create mouse connections and disconnect one of their existing connections
    nodesToConnect.forEach(({ index: nodeIndex }) => {
      if (!connectedToMouse.has(nodeIndex)) {
        // Create connection to mouse
        mouseConnections.push({
          from: -1, // -1 represents mouse
          to: nodeIndex,
          opacity: 0,
          targetOpacity: 1,
          drawProgress: 0,
          targetDrawProgress: 1
        });
        connectedToMouse.add(nodeIndex);

        // Find and disconnect one existing connection from this node
        const existingConnections = findConnectionsToNode(nodeIndex);
        if (existingConnections.length > 0) {
          const toDisconnect = existingConnections[Math.floor(Math.random() * existingConnections.length)];
          toDisconnect.targetOpacity = 0;
          toDisconnect.targetDrawProgress = 0;
        }
      }
    });

    // For nodes leaving the radius - remove mouse connections and restore their original connections
    const nodesToDisconnect: number[] = [];
    connectedToMouse.forEach(nodeIndex => {
      if (!nodeIndicesToConnect.has(nodeIndex)) {
        nodesToDisconnect.push(nodeIndex);
      }
    });

    nodesToDisconnect.forEach(nodeIndex => {
      // Fade out mouse connection
      const mouseConn = mouseConnections.find(c => c.to === nodeIndex);
      if (mouseConn) {
        mouseConn.targetOpacity = 0;
        mouseConn.targetDrawProgress = 0;
      }
      connectedToMouse.delete(nodeIndex);

      // Restore a previously disconnected connection
      const nodeConns = connections.filter(
        c => (c.from === nodeIndex || c.to === nodeIndex) && c.targetOpacity < 0.3
      );
      if (nodeConns.length > 0) {
        const toRestore = nodeConns[Math.floor(Math.random() * nodeConns.length)];
        toRestore.targetOpacity = 1;
        toRestore.targetDrawProgress = 1;
      }
    });

    mouseConnectionsRef.current = mouseConnections;
  }, [findNearbyNodes, findConnectionsToNode]);

  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    const nodes = nodesRef.current;
    const connections = connectionsRef.current;
    const mouseConnections = mouseConnectionsRef.current;
    const mouse = mouseRef.current;

    // Animate connection properties
    const animateConnections = (conns: Connection[]) => {
      conns.forEach(conn => {
        const opacityDiff = conn.targetOpacity - conn.opacity;
        conn.opacity += opacityDiff * 0.08;
        
        const progressDiff = conn.targetDrawProgress - conn.drawProgress;
        conn.drawProgress += progressDiff * 0.1;
      });
    };

    animateConnections(connections);
    animateConnections(mouseConnections);

    // Remove fully faded connections
    connectionsRef.current = connections.filter(conn => 
      conn.opacity > 0.01 || conn.targetOpacity > 0 || conn.drawProgress > 0.01
    );
    mouseConnectionsRef.current = mouseConnections.filter(conn => 
      conn.opacity > 0.01 || conn.targetOpacity > 0 || conn.drawProgress > 0.01
    );

    // Draw regular connections
    ctx.strokeStyle = lineColor;
    ctx.lineCap = 'round';
    
    connections.forEach(conn => {
      if (conn.opacity < 0.01 || conn.drawProgress < 0.01) return;
      
      const nodeFrom = nodes[conn.from];
      const nodeTo = nodes[conn.to];
      
      const endX = nodeFrom.x + (nodeTo.x - nodeFrom.x) * conn.drawProgress;
      const endY = nodeFrom.y + (nodeTo.y - nodeFrom.y) * conn.drawProgress;
      
      ctx.globalAlpha = conn.opacity * 0.15;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(nodeFrom.x, nodeFrom.y);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      ctx.globalAlpha = conn.opacity * 0.08;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(nodeFrom.x, nodeFrom.y);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    });

    // Draw mouse connections (slightly brighter)
    mouseConnections.forEach(conn => {
      if (conn.opacity < 0.01 || conn.drawProgress < 0.01) return;
      
      const nodeTo = nodes[conn.to];
      
      const endX = mouse.x + (nodeTo.x - mouse.x) * conn.drawProgress;
      const endY = mouse.y + (nodeTo.y - mouse.y) * conn.drawProgress;
      
      ctx.globalAlpha = conn.opacity * 0.25;
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    });

    // Draw nodes
    ctx.fillStyle = lineColor;
    nodes.forEach(node => {
      const hasActiveConnection = connections.some(
        conn => (conn.from === node.id || conn.to === node.id) && conn.opacity > 0.3
      );
      const connectedToMouse = connectedToMouseRef.current.has(node.id);
      
      ctx.globalAlpha = connectedToMouse ? 0.4 : (hasActiveConnection ? 0.25 : 0.12);
      ctx.beginPath();
      ctx.arc(node.x, node.y, connectedToMouse ? 2.5 : 1.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw mouse node when active
    if (mouse.isActive && connectedToMouseRef.current.size > 0) {
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }, [lineColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.scale(dpr, dpr);
        initNetwork(rect.width, rect.height);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        draw(ctx, rect.width, rect.height);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initNetwork, draw]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Check if mouse is within canvas bounds
      const isWithinBounds = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      
      mouseRef.current = {
        x,
        y,
        isActive: isWithinBounds
      };
      
      if (isWithinBounds) {
        handleInteraction(x, y);
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
      // Fade out all mouse connections when leaving
      mouseConnectionsRef.current.forEach(conn => {
        conn.targetOpacity = 0;
        conn.targetDrawProgress = 0;
      });
      // Restore all disconnected connections
      connectedToMouseRef.current.forEach(nodeIndex => {
        const nodeConns = connectionsRef.current.filter(
          c => (c.from === nodeIndex || c.to === nodeIndex) && c.targetOpacity < 0.3
        );
        nodeConns.forEach(conn => {
          conn.targetOpacity = 1;
          conn.targetDrawProgress = 1;
        });
      });
      connectedToMouseRef.current.clear();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleInteraction]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.8 }}
    />
  );
};

export default NetworkBackground;
