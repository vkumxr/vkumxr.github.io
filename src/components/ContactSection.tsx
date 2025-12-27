import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 section-light">
      <div ref={ref} className="container mx-auto max-w-4xl">
        <div className={`section-header transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="section-label">Get in touch</p>
          <h2 className="section-title">Contact</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className={`transition-all duration-700 delay-100 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="bg-background"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="bg-background"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Your message..."
                  rows={5}
                  className="bg-background resize-none"
                />
              </div>
              
              <Button type="submit" disabled={isSubmitting} className="w-full">
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
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <a 
                  href="mailto:vishwakumarv05@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail size={18} />
                  <span>vishwakumarv05@gmail.com</span>
                </a>
                <a 
                  href="tel:+919342236718"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone size={18} />
                  <span>+91 9342236718</span>
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin size={18} />
                  <span>Bengaluru, Karnataka, India</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/vkumxr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://linkedin.com/in/vishwakumarv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="mailto:vishwakumarv05@gmail.com"
                  className="social-icon"
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
