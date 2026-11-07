"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import { useHeroInfo } from "@/components/hero-info-context";
import { toggleAudio, getAudioMuted, playTactileClick } from "@/utility/sound";

const NAV_ITEMS = [
  { name: "About", href: "#about", code: "01" },
  { name: "Experience", href: "#experience", code: "02" },
  { name: "Work", href: "#project", code: "03" },
  { name: "Skills", href: "#skills", code: "04" },
  { name: "Contact", href: "#contact", code: "05" },
];

export default function Header() {
  const HeroInfo = useHeroInfo();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState("");

  // Live IST Clock
  useEffect(() => {
    setIsMuted(getAudioMuted());

    const updateClock = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        setCurrentTime(`${timeStr} IST`);
      } catch {
        setCurrentTime("IST");
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSoundToggle = () => {
    const next = toggleAudio();
    setIsMuted(next);
    if (!next) {
      playTactileClick("success");
    }
  };

  const handleNavClick = () => {
    setMenuOpen(false);
    playTactileClick("tick");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ivory/95 backdrop-blur-md border-b border-border-subtle shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
      role="banner"
    >
      <nav
        className="max-w-6xl mx-auto px-6 lg:px-8 flex items-center justify-between"
        aria-label="Main Navigation"
      >
        {/* Left: Brand Monogram & Live Status */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            onClick={() => playTactileClick("tick")}
            className="flex items-center gap-2 group"
            aria-label={`${HeroInfo.name} — Home`}
          >
            <span className="w-8 h-8 rounded bg-charcoal text-chartreuse font-mono font-bold flex items-center justify-center text-sm shadow-sm group-hover:scale-105 transition-transform">
              AG
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-charcoal group-hover:text-muted-green transition-colors">
                {HeroInfo.name}
              </span>
              <span className="font-mono text-[10px] text-charcoal-light tracking-wider uppercase">
                {HeroInfo.title.split(" ")[0]} · BlackRock
              </span>
            </div>
          </Link>

          {/* Telemetry pill */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded bg-paper border border-border-subtle font-mono text-[10px] text-charcoal-light">
            <span className="w-1.5 h-1.5 rounded-full bg-chartreuse animate-pulse" />
            <span>DELHI {currentTime}</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7" role="list">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              role="listitem"
              onClick={() => playTactileClick("tick")}
              className="group flex items-baseline gap-1 text-xs font-mono uppercase tracking-wider text-charcoal-mid hover:text-charcoal transition-colors relative py-1"
            >
              <span className="text-[10px] text-muted-green opacity-60 group-hover:opacity-100 transition-opacity">
                {item.code}
              </span>
              <span className="font-sans text-sm capitalize tracking-normal font-medium text-charcoal-mid group-hover:text-charcoal">
                {item.name}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-chartreuse group-hover:w-full transition-all duration-200" />
            </Link>
          ))}

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={handleSoundToggle}
            className="p-2 rounded border border-border-subtle text-charcoal-mid hover:text-charcoal hover:border-charcoal hover:bg-paper transition-all"
            aria-label={isMuted ? "Enable UI sound" : "Mute UI sound"}
            title={isMuted ? "Enable subtle audio cues" : "Audio cues active"}
          >
            {isMuted ? (
              <SpeakerXMarkIcon className="w-4 h-4 opacity-50" />
            ) : (
              <SpeakerWaveIcon className="w-4 h-4 text-muted-green" />
            )}
          </button>

          {/* Direct Contact Button */}
          <Link
            href="#contact"
            onClick={() => playTactileClick("snap")}
            className="text-xs font-mono uppercase tracking-wider font-bold bg-chartreuse text-charcoal px-4 py-2 rounded shadow-sm hover:bg-chartreuse-dark hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Initiate Contact &rarr;
          </Link>
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={handleSoundToggle}
            className="p-2 rounded border border-border-subtle text-charcoal-mid"
            aria-label="Toggle Sound"
          >
            {isMuted ? (
              <SpeakerXMarkIcon className="w-4 h-4 opacity-40" />
            ) : (
              <SpeakerWaveIcon className="w-4 h-4 text-muted-green" />
            )}
          </button>

          <button
            type="button"
            className="p-2 rounded text-charcoal hover:bg-paper transition-colors"
            onClick={() => {
              setMenuOpen(!menuOpen);
              playTactileClick("tick");
            }}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-ivory border-b border-border-subtle shadow-lg overflow-hidden"
          >
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-3 font-mono">
              <div className="text-[11px] text-charcoal-light uppercase tracking-widest pb-2 border-b border-border-subtle flex justify-between">
                <span>System Navigation</span>
                <span>{currentTime}</span>
              </div>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleNavClick}
                  className="flex items-center justify-between py-2 text-sm text-charcoal hover:text-muted-green border-b border-border-subtle/50"
                >
                  <span className="font-sans font-medium">{item.name}</span>
                  <span className="text-xs text-muted-green">{item.code} {"//"}</span>
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={handleNavClick}
                className="mt-3 text-center py-3 bg-chartreuse text-charcoal font-bold rounded text-xs uppercase tracking-widest hover:bg-chartreuse-dark transition-colors"
              >
                Initiate Contact &rarr;
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
