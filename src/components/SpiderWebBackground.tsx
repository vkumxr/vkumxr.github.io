import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const SpiderWebBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
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
      const particleCount = Math.floor((canvas.width * canvas.height) / 4000);
      particlesRef.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
        });
      }
    };

    const getBackgroundColor = (y: number): 'dark' | 'light' => {
      // Determine section based on scroll position
      const sections = document.querySelectorAll('section');
      let isDark = true;
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;
        
        if (y >= sectionTop && y < sectionBottom) {
          const bgColor = window.getComputedStyle(section).backgroundColor;
          // Check if background is light (white or light colors)
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
      const connectionDistance = 150;
      const mouseConnectionDistance = 200;

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Get color based on background
        const bgType = getBackgroundColor(particle.y);
        const particleColor = bgType === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)';
        const lineColor = bgType === 'dark' ? 'rgba(255, 255, 255,' : 'rgba(0, 0, 0,';

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Connect to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `${lineColor}${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect to mouse
        const mouseY = mouse.y + window.scrollY;
        const dxMouse = particle.x - mouse.x;
        const dyMouse = particle.y - mouseY;
        const mouseDistance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (mouseDistance < mouseConnectionDistance) {
          const opacity = (1 - mouseDistance / mouseConnectionDistance) * 0.7;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouse.x, mouseY);
          ctx.strokeStyle = `${lineColor}${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animationRef.current = requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    const handleScroll = () => {
      canvas.height = document.documentElement.scrollHeight;
    };

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    // Observe DOM changes to update canvas height
    const observer = new ResizeObserver(() => {
      canvas.height = document.documentElement.scrollHeight;
    });
    observer.observe(document.body);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
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
