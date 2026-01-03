import { lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import StatsSection from '../components/StatsSection';
import CertificationsSection from '../components/CertificationsSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import KeyboardNavigation from '../components/KeyboardNavigation';
import ScrollDepthEffects from '../components/ScrollDepthEffects';

// Lazy load the 3D model viewer
const ModelViewer = lazy(() => import('../components/ModelViewer'));
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
        
        {/* Interactive 3D Model Showcase */}
        <Suspense fallback={
          <div className="py-24 flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
          </div>
        }>
          <ModelViewer 
            title="Interactive 3D Showcase"
            description="Drag to rotate • Monochrome rendering • WebGL powered"
          />
        </Suspense>
        
        <ContactSection />
        <Footer />
      </main>
    </ScrollDepthEffects>
  );
};

export default Index;
