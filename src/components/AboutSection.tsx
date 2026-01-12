import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { staggerContainer, fadeUp } from '../hooks/useMotionAnimations';

const AboutSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section ref={ref} id="about" className="py-20 md:py-28 px-6 section-dark overflow-hidden relative">
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg-light opacity-30" />

      <motion.div 
        className="container mx-auto max-w-3xl relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer(0.15, 0.1)}
      >
        <motion.div className="section-header text-center mb-10" variants={fadeUp}>
          <p className="section-label text-background/50">About</p>
          <h2 className="section-title text-background">Who I am</h2>
        </motion.div>

        <motion.div 
          className="space-y-5 text-base md:text-lg leading-relaxed text-background/80"
          variants={fadeUp}
        >
          <p>
            I'm a third-year Electronics and Communication Engineering student with a focus on 
            building <span className="text-background font-medium">security-focused engineering tools</span>. 
            I prefer writing software that solves real problems over solving toy challenges.
          </p>
          
          <p>
            My work sits at the intersection of <span className="text-background font-medium">Linux systems</span>, 
            <span className="text-background font-medium"> reverse engineering</span>, and 
            <span className="text-background font-medium"> AI-assisted analysis</span>. I run Linux as my primary OS 
            because understanding what's happening under the hood matters when you're building security tools.
          </p>
          
          <p>
            Currently building <span className="text-background font-medium">ReDroid-AI</span> — an AI-powered 
            framework for automated Android APK analysis and vulnerability discovery. When I'm not coding, 
            I'm exploring CTF challenges, experimenting with automation workflows, or digging into 
            network protocols.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
