import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import StatsSection from '../components/StatsSection';
import CertificationsSection from '../components/CertificationsSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import WritingSection from '../components/WritingSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import KeyboardNavigation from '../components/KeyboardNavigation';
import ScrollDepthEffects from '../components/ScrollDepthEffects';

const Index = () => {
  return (
    <ScrollDepthEffects>
      <main className="relative min-h-screen bg-background overflow-x-hidden">
        <KeyboardNavigation />
        <Navbar />
        
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <StatsSection />
        <CertificationsSection />
        <ExperienceSection />
        <ProjectsSection />
        <WritingSection />
        <ContactSection />
        <Footer />
      </main>
    </ScrollDepthEffects>
  );
};

export default Index;
