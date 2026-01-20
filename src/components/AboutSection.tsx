import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useScrollY } from '../hooks/useParallax';
import { staggerContainer, fadeUp, blurIn, springPresets } from '../hooks/useMotionAnimations';
import { Parallax } from './motion/ScrollAnimations';
import profileImage from '@/assets/profile.png';
import { AboutDecorations } from './DecorativeShapes';

const AboutSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const sectionRef = useRef<HTMLElement>(null);
  const scrollY = useScrollY();

  const textVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        delay: i * 0.15,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-32 px-6 section-dark overflow-hidden relative grid-bg-light">
      {/* Decorative geometric shapes */}
      <AboutDecorations />
      
      {/* Gradient orbs with parallax */}
      <Parallax offset={30}>
        <div 
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-background/5 rounded-full blur-3xl pointer-events-none"
        />
      </Parallax>
      <Parallax offset={-40}>
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-background/3 rounded-full blur-3xl pointer-events-none"
        />
      </Parallax>

      <motion.div 
        ref={ref} 
        className="container mx-auto max-w-6xl relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer(0.15, 0.1)}
      >
        {/* Centered Header */}
        <motion.div className="section-header text-center mb-12" variants={fadeUp}>
          <p className="section-label text-background/60">Get to know me</p>
          <h2 className="section-title text-background">About Vishwa Kumar Venkateswaran</h2>
        </motion.div>

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* Profile Photo - First on mobile, positioned right on desktop */}
          <motion.div 
            className="order-1 lg:order-2 mb-8 lg:mb-0 lg:w-1/2 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2"
            variants={blurIn}
          >
            <div className="relative w-full h-[300px] lg:h-[600px]">
              {/* Mobile gradient - bottom fade */}
              <div 
                className="absolute inset-0 z-10 lg:hidden"
                style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, hsl(var(--foreground)) 100%)' }}
              />
              {/* Desktop gradient - left fade */}
              <div 
                className="absolute inset-0 z-10 hidden lg:block"
                style={{ background: 'linear-gradient(to left, transparent 0%, transparent 30%, hsl(var(--foreground)) 100%)' }}
              />
              <motion.img 
                src={profileImage} 
                alt="Vishwa Kumar Venkateswaran" 
                className="w-full h-full object-cover object-top lg:object-center opacity-40 grayscale"
                whileHover={{ scale: 1.05, opacity: 0.5 }}
                transition={springPresets.smooth}
              />
            </div>
          </motion.div>

          {/* Content - Second on mobile, positioned left on desktop */}
          <div className="order-2 lg:order-1 relative z-10 lg:w-1/2">
            <div className="space-y-6 text-lg leading-relaxed text-background/70">
              {[
                <>
                  I'm an engineering student with a focus on building{' '}
                  <span className="text-background font-medium">intelligent tools</span> that actually work in the real world.
                  My interests span AI-driven systems, backend development, and cybersecurity—three areas that, when combined, 
                  create software that's both smart and secure.
                </>,
                <>
                  I run <span className="text-background font-medium">Linux as my primary OS</span>, not because it's trendy, 
                  but because I want to understand what's happening under the hood. From writing BASH scripts to automate 
                  repetitive tasks to debugging embedded systems on Raspberry Pi, I'm drawn to problems that require 
                  digging deeper than surface-level solutions.
                </>,
                <>
                  My projects reflect this approach: a{' '}
                  <span className="text-background font-medium">reverse engineering framework</span> for Android apps, 
                  a <span className="text-background font-medium">conversational banking assistant</span> powered by LLMs, 
                  and a <span className="text-background font-medium">modular robotics system</span> with voice control.
                  Each one started with a practical problem and ended with working code.
                </>,
                <>
                  When I'm not coding, I'm usually exploring CTF challenges, learning about network protocols, 
                  or experimenting with new automation workflows.
                </>,
              ].map((content, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  variants={textVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                >
                  {content}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
