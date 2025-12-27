import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const SpiderWebBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    const createParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 25000);
      particlesRef.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 4 + 4, // Random radius between 4-8
        });
      }
    };

    const getBackgroundColor = (y: number): 'dark' | 'light' => {
      const sections = document.querySelectorAll('section');
      let isDark = true;
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;
        
        if (y >= sectionTop && y < sectionBottom) {
          const bgColor = window.getComputedStyle(section).backgroundColor;
          if (bgColor.includes('255, 255, 255') || bgColor.includes('248, 250, 252') || section.classList.contains('section-light')) {
            isDark = false;
          }
        }
      });
      
      return isDark ? 'dark' : 'light';
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const connectionDistance = 200;
      const mouseConnectionDistance = 250;

      // Update particle positions
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      });

      // Draw connections first (behind nodes)
      particles.forEach((particle, i) => {
        const bgType = getBackgroundColor(particle.y);
        const lineColor = bgType === 'dark' ? 'rgba(255, 255, 255,' : 'rgba(0, 0, 0,';

        // Connect to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.6;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `${lineColor}${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }

        // Connect to mouse
        const mouseY = mouse.y + window.scrollY;
        const dxMouse = particle.x - mouse.x;
        const dyMouse = particle.y - mouseY;
        const mouseDistance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (mouseDistance < mouseConnectionDistance && mouse.x > 0) {
          const opacity = (1 - mouseDistance / mouseConnectionDistance) * 0.8;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouse.x, mouseY);
          ctx.strokeStyle = `${lineColor}${opacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      // Draw nodes on top
      particles.forEach((particle) => {
        const bgType = getBackgroundColor(particle.y);
        const nodeColor = bgType === 'dark' ? 'rgba(255, 255, 255,' : 'rgba(0, 0, 0,';
        const fillColor = bgType === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)';

        // Draw outer ring
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius + 3, 0, Math.PI * 2);
        ctx.strokeStyle = `${nodeColor}0.3)`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw filled center
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.strokeStyle = `${nodeColor}0.7)`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw inner dot
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `${nodeColor}0.9)`;
        ctx.fill();
      });

      // Draw mouse cursor node if on screen
      if (mouse.x > 0) {
        const mouseY = mouse.y + window.scrollY;
        const bgType = getBackgroundColor(mouseY);
        const nodeColor = bgType === 'dark' ? 'rgba(255, 255, 255,' : 'rgba(0, 0, 0,';

        // Outer glow ring
        ctx.beginPath();
        ctx.arc(mouse.x, mouseY, 18, 0, Math.PI * 2);
        ctx.strokeStyle = `${nodeColor}0.2)`;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Middle ring
        ctx.beginPath();
        ctx.arc(mouse.x, mouseY, 12, 0, Math.PI * 2);
        ctx.strokeStyle = `${nodeColor}0.5)`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner filled circle
        ctx.beginPath();
        ctx.arc(mouse.x, mouseY, 6, 0, Math.PI * 2);
        ctx.fillStyle = `${nodeColor}0.8)`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    const observer = new ResizeObserver(() => {
      canvas.height = document.documentElement.scrollHeight;
    });
    observer.observe(document.body);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ position: 'fixed', top: 0, left: 0 }}
    />
  );
};

export default SpiderWebBackground;
