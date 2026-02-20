import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "@/components/ThemeProvider";
import Preloader from "@/components/Preloader";
import CursorTrail from "@/components/CursorTrail";
import BackToTop from "@/components/BackToTop";
import ScrollProgress from "@/components/ScrollProgress";
import SideNavDots from "@/components/SideNavDots";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import CTFWriteupDetail from "./pages/CTFWriteupDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn' as const,
    },
  },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial="initial"
              animate="enter"
              exit="exit"
              variants={pageVariants}
            >
              <Index />
            </motion.div>
          }
        />
        <Route
          path="/projects/:slug"
          element={
            <motion.div
              initial="initial"
              animate="enter"
              exit="exit"
              variants={pageVariants}
            >
              <ProjectDetail />
            </motion.div>
          }
        />
        <Route
          path="/ctf/:slug"
          element={
            <motion.div
              initial="initial"
              animate="enter"
              exit="exit"
              variants={pageVariants}
            >
              <CTFWriteupDetail />
            </motion.div>
          }
        />
        <Route
          path="*"
          element={
            <motion.div
              initial="initial"
              animate="enter"
              exit="exit"
              variants={pageVariants}
            >
              <NotFound />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Preloader />
          <CursorTrail />
          <BackToTop />
          <ScrollProgress />
          <SideNavDots />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
