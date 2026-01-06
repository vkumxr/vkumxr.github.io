import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="section-header">
          <p className="section-label">About</p>
          <h2 className="section-title">Who I Am</h2>
        </div>

        <motion.p
          className="text-lg text-muted-foreground leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          I build practical software tools and systems that automate work, improve clarity, and solve real engineering problems. I iterate fast and focus on shipping working solutions.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutSection;
