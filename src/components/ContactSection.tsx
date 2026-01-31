import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useInView } from '../hooks/useInView';
import { Github, Linkedin, Mail, MapPin, Phone, Send, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EMAILJS_SERVICE_ID = 'service_hbvqs2f';
const EMAILJS_TEMPLATE_ID = 'template_h66mljm';
const EMAILJS_PUBLIC_KEY = 'pEkZwmUeWy6anm2tc';

const ContactSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setIsSubmitting(true);
    
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      
      toast({
        title: "Handshake successful",
        description: "Message transmitted. Awaiting response.",
      });
      
      formRef.current.reset();
    } catch (error) {
      toast({
        title: "Transmission failed",
        description: "Connection error. Try direct channel.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 section-cyber relative">
      <div className="absolute inset-0 grid-cyber opacity-30" />
      
      <motion.div 
        ref={ref} 
        className="container mx-auto max-w-4xl relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-label">// establish connection</p>
          <h2 className="section-title cyber-glow flex items-center justify-center gap-3">
            <Shield className="w-8 h-8" />
            ESTABLISH SECURE CHANNEL
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            className="glass-panel-glow p-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-destructive/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-primary/50" />
              <span className="ml-4 font-mono text-xs text-muted-foreground">
                secure_channel.sh
              </span>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-muted-foreground mb-2">
                  SENDER_ID:
                </label>
                <input
                  name="from_name"
                  type="text"
                  required
                  placeholder="Enter name..."
                  className="w-full terminal-input rounded-sm px-4 py-3 text-sm"
                />
              </div>
              
              <div>
                <label className="block font-mono text-xs text-muted-foreground mb-2">
                  RETURN_ADDRESS:
                </label>
                <input
                  name="from_email"
                  type="email"
                  required
                  placeholder="Enter email..."
                  className="w-full terminal-input rounded-sm px-4 py-3 text-sm"
                />
              </div>
              
              <div>
                <label className="block font-mono text-xs text-muted-foreground mb-2">
                  MESSAGE_PAYLOAD:
                </label>
                <textarea
                  name="message"
                  required
                  placeholder="Enter message..."
                  rows={5}
                  className="w-full terminal-input rounded-sm px-4 py-3 text-sm resize-none"
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full cyber-button-primary flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="font-mono"
                  >
                    TRANSMITTING...
                  </motion.span>
                ) : (
                  <>
                    <Send size={16} />
                    INITIATE HANDSHAKE
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="glass-panel p-6">
              <div className="font-mono text-xs text-muted-foreground mb-4 tracking-widest">
                DIRECT_CHANNELS:
              </div>
              
              <div className="space-y-4">
                <a 
                  href="mailto:vishwakumarv05@gmail.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail size={14} className="text-primary" />
                  </div>
                  <span className="font-mono">vishwakumarv05@gmail.com</span>
                </a>
                
                <a 
                  href="tel:+919342236718"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone size={14} className="text-primary" />
                  </div>
                  <span className="font-mono">+91 9342236718</span>
                </a>
                
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <MapPin size={14} className="text-primary" />
                  </div>
                  <span className="font-mono">Bengaluru, Karnataka, India</span>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6">
              <div className="font-mono text-xs text-muted-foreground mb-4 tracking-widest">
                NETWORK_PROFILES:
              </div>
              
              <div className="flex items-center gap-3">
                {[
                  { href: 'https://github.com/vkumxr', icon: Github, label: 'GitHub' },
                  { href: 'https://linkedin.com/in/vishwakumarv/', icon: Linkedin, label: 'LinkedIn' },
                  { href: 'mailto:vishwakumarv05@gmail.com', icon: Mail, label: 'Email' },
                ].map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="social-icon"
                    aria-label={link.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <link.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Status indicator */}
            <div className="glass-panel p-4 flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
              <span className="font-mono text-xs text-muted-foreground">
                OPEN TO OPPORTUNITIES • RESPONSE TIME: &lt;24H
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
