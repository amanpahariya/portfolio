"use client";
import { useEffect } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import About from "@/components/about";
import Experience from "@/components/experience";
import Project from "@/components/project";
import Skills from "@/components/skills";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import AiCopilot from "@/components/ai-copilot";
import { playTactileClick } from "@/utility/sound";

export default function Home() {
  useEffect(() => {
    // Hash scrolling on initial mount
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }

    // Number keys quick jump (1-5) when not inside input/textarea
    const handleNumberNav = (e) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") return;

      const mapping = {
        "1": "about",
        "2": "experience",
        "3": "project",
        "4": "skills",
        "5": "contact",
      };

      if (mapping[e.key]) {
        const el = document.getElementById(mapping[e.key]);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          playTactileClick("tick");
        }
      }
    };

    window.addEventListener("keydown", handleNumberNav);
    return () => window.removeEventListener("keydown", handleNumberNav);
  }, []);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans selection:bg-chartreuse selection:text-charcoal relative">
      <Header />

      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Project />
        <Skills />
        <Contact />
      </main>

      <Footer />
      <AiCopilot />
    </div>
  );
}
