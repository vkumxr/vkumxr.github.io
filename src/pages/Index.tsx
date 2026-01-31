import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import CyberBackground, { Scanlines } from '../components/CyberBackground';
import KeyboardNavigation from '../components/KeyboardNavigation';

const Index = () => {
  return (
    <>
      {/* Global cyber background */}
      <CyberBackground />
      
      {/* Scanline overlay */}
      <Scanlines />
      
      <main className="relative min-h-screen overflow-x-hidden">
        <KeyboardNavigation />
        <Navbar />
        
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
