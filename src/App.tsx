import React, { useEffect } from "react";
import "./styles/globals.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import {
  AboutSection,
  CapabilitiesSection,
  ParallaxBanner,
  ClientsSection,
  FAQSection,
  ContactSection,
  Footer,
} from "./components/Sections";

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
      .forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

const App: React.FC = () => {
  useScrollReveal();
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <CapabilitiesSection />
        <ParallaxBanner />
        <ServicesSection />
        <ClientsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default App;