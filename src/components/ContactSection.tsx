import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';

const EMAILJS_SERVICE_ID = 'service_hbvqs2f';
const EMAILJS_TEMPLATE_ID = 'template_h66mljm';
const EMAILJS_PUBLIC_KEY = 'pEkZwmUeWy6anm2tc';

const ContactSection = () => {
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
        title: "Message sent",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });

      formRef.current.reset();
    } catch {
      toast({
        title: "Failed to send",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-6 bg-foreground text-background">
      <div className="max-w-xl mx-auto">
        <div className="section-header">
          <p className="section-label text-background/60">Contact</p>
          <h2 className="section-title text-background">Get in Touch</h2>
        </div>

        <motion.p
          className="text-background/70 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Open to collaborations and serious projects.
        </motion.p>

        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-background">
              Name
            </label>
            <Input
              id="name"
              name="from_name"
              type="text"
              required
              placeholder="Your name"
              className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-background">
              Email
            </label>
            <Input
              id="email"
              name="from_email"
              type="email"
              required
              placeholder="your@email.com"
              className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-background">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              required
              placeholder="Your message..."
              rows={4}
              className="bg-background/10 border-background/20 text-background placeholder:text-background/50 resize-none"
            />
          </div>

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-background text-foreground hover:bg-background/90"
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  <Send size={16} className="mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </motion.div>
        </motion.form>

        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.a
            href="https://github.com/vkumxr"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-inverted"
            aria-label="GitHub"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={18} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/vishwakumarv/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-inverted"
            aria-label="LinkedIn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin size={18} />
          </motion.a>
          <motion.a
            href="mailto:vishwakumarv05@gmail.com"
            className="social-icon-inverted"
            aria-label="Email"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
