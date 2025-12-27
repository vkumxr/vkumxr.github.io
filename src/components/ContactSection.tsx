import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useInView } from '../hooks/useInView';
import { useScrollY } from '../hooks/useParallax';
import { Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';

const EMAILJS_SERVICE_ID = 'service_hbvqs2f';
const EMAILJS_TEMPLATE_ID = 'template_h66mljm';
const EMAILJS_PUBLIC_KEY = 'pEkZwmUeWy6anm2tc';

const ContactSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const sectionRef = useRef<HTMLElement>(null);
  const scrollY = useScrollY();
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
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: "Failed to send",
        description: "Something went wrong. Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 md:py-32 px-6 section-dark overflow-hidden relative grid-bg-light">
      {/* Faded background elements with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
        <div 
          className="absolute top-20 right-10 text-background/[0.04] font-mono text-lg leading-relaxed select-none transition-transform duration-100"
          style={{ transform: `translateY(${scrollY * 0.03}px)` }}
        >
          <div>{'// Let\'s connect'}</div>
          <div>{'const contact = {'}</div>
          <div className="pl-4">{'email: "...",'}</div>
          <div className="pl-4">{'message: "..."'}</div>
          <div>{'};'}</div>
        </div>
        <div 
          className="absolute bottom-20 left-10 text-background/[0.04] font-mono text-lg leading-relaxed select-none transition-transform duration-100"
          style={{ transform: `translateY(${scrollY * -0.04}px)` }}
        >
          <div>{'async function sendMessage() {'}</div>
          <div className="pl-4">{'await fetch("/api/contact");'}</div>
          <div>{'}'}</div>
        </div>
        <div 
          className="absolute top-1/2 right-1/4 text-background/[0.03] font-mono text-6xl select-none transition-transform duration-100"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
        >
          @
        </div>
      </div>

      {/* Gradient orbs with parallax */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-background/10 to-transparent rounded-full blur-3xl pointer-events-none transition-transform duration-100"
        style={{ transform: `translateX(-50%) translateY(${scrollY * -0.03}px)` }}
      />

      <div ref={ref} className={`container mx-auto max-w-4xl relative z-10 ${isInView ? 'section-bounce' : 'opacity-0'}`}>
        <div className="section-header">
          <p className="section-label text-background/60">Get in touch</p>
          <h2 className="section-title shimmer-text-light">Contact</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className={`transition-all duration-700 delay-100 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
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
                  className="bg-foreground/10 border-background/20 text-background placeholder:text-background/50"
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
                  className="bg-foreground/10 border-background/20 text-background placeholder:text-background/50"
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
                  rows={5}
                  className="bg-foreground/10 border-background/20 text-background placeholder:text-background/50 resize-none"
                />
              </div>
              
              <Button type="submit" disabled={isSubmitting} className="w-full bg-background text-foreground hover:bg-background/90">
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className={`space-y-6 transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-background">Contact Information</h3>
              <div className="space-y-4">
                <a 
                  href="mailto:vishwakumarv05@gmail.com"
                  className="flex items-center gap-3 text-background/70 hover:text-background transition-colors"
                >
                  <Mail size={18} />
                  <span>vishwakumarv05@gmail.com</span>
                </a>
                <a 
                  href="tel:+919342236718"
                  className="flex items-center gap-3 text-background/70 hover:text-background transition-colors"
                >
                  <Phone size={18} />
                  <span>+91 9342236718</span>
                </a>
                <div className="flex items-center gap-3 text-background/70">
                  <MapPin size={18} />
                  <span>Bengaluru, Karnataka, India</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-background">Connect</h3>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/vkumxr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-inverted"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://linkedin.com/in/vishwakumarv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-inverted"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="mailto:vishwakumarv05@gmail.com"
                  className="social-icon-inverted"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
