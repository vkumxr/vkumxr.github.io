import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { FileCode, Shield, Target, Cpu } from 'lucide-react';

const systemInfo = [
  { 
    icon: Shield, 
    label: 'FOCUS', 
    value: 'Reverse engineering, web security, exploit analysis' 
  },
  { 
    icon: Target, 
    label: 'BACKGROUND', 
    value: 'Engineering student interested in how systems fail' 
  },
  { 
    icon: FileCode, 
    label: 'OBJECTIVE', 
    value: 'Build and break software to make it secure' 
  },
  { 
    icon: Cpu, 
    label: 'ENVIRONMENT', 
    value: 'Linux primary • Low-level systems • CTF platforms' 
  },
];

const AboutSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section id="about" className="py-24 md:py-32 px-6 section-cyber section-brackets relative">
      <div className="absolute inset-0 grid-animated opacity-20" />
      
      <motion.div 
        ref={ref} 
        className="container mx-auto max-w-4xl relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="section-header" variants={itemVariants}>
          <p className="section-label">// system profile</p>
          <h2 className="section-title">SYSTEM PROFILE</h2>
        </motion.div>

        {/* Terminal-style profile log */}
        <motion.div 
          className="glass-panel-glow p-6 md:p-8"
          variants={itemVariants}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-destructive/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-primary/50" />
            <span className="ml-4 font-mono text-xs text-muted-foreground">
              profile.log — vishwa@security-console
            </span>
          </div>

          {/* System info entries */}
          <div className="space-y-6">
            {systemInfo.map((info, index) => (
              <motion.div
                key={info.label}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <info.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-mono text-xs text-muted-foreground tracking-widest mb-1">
                    {info.label}:
                  </div>
                  <div className="font-mono text-sm text-foreground">
                    {info.value}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-border" />

          {/* Extended bio */}
          <div className="space-y-4 font-mono text-sm text-muted-foreground">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-primary">{'>'}</span> Running Linux as primary OS to understand what's happening under the hood.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-primary">{'>'}</span> From BASH automation scripts to debugging embedded systems on Raspberry Pi.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-primary">{'>'}</span> Projects include reverse engineering frameworks, LLM-powered banking assistants, and voice-controlled robotics.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <span className="text-primary">{'>'}</span> When not coding: CTF challenges, network protocol analysis, automation workflows.
            </motion.p>
          </div>

          {/* Status line */}
          <div className="mt-8 pt-4 border-t border-border flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
            <span className="font-mono text-xs text-muted-foreground">
              STATUS: ACTIVE • SEEKING OPPORTUNITIES
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
