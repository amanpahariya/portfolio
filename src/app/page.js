'use client';
import { useEffect, useRef } from "react";
import Hero from "@/components/hero";
import About from "@/components/about";
import Project from "@/components/project";
import Skills from "@/components/skills";
import Header from "@/components/header";
import HeroVideo from "@/components/heroVideo";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Testimonials from "@/components/testimonials";
import Stats from "@/components/stats";
import ScrollProgress from "@/components/scroll-progress";
import CursorSpotlight from "@/components/cursor-spotlight";
import ParticlesBackground from "@/components/particles-background";

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [])

  return (
    <main className="min-h-screen text-white bg-[#0d1117]">
      <ParticlesBackground />
      <CursorSpotlight />
      <ScrollProgress />
      <Header />

      {/* Hero Section */}
      <section ref={containerRef} className="intro-hero">
        <Hero />
        <HeroVideo />
      </section>

      {/* About Section */}
      <About />

      {/* Stats Section */}
      <Stats />

      {/* Experience Section */}
      <Experience />

      {/* Projects Section */}
      <Project />

      {/* Skills Section */}
      <Skills />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact Section */}
      <Contact />
    </main>
  );
}