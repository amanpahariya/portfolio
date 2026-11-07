"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPinIcon,
  EnvelopeIcon,
  ArrowRightIcon,
  CommandLineIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useHeroInfo } from "@/components/hero-info-context";
import { playTactileClick } from "@/utility/sound";
import { sendGTMEvent } from "@/utility/gtm";

const HeroSculpture = dynamic(() => import("@/components/hero-sculpture"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center font-mono text-xs text-charcoal-light">
      [CALIBRATING KINETIC SCULPTURE...]
    </div>
  ),
});

export default function Hero() {
  const HeroInfo = useHeroInfo();

  return (
    <section
      className="relative min-h-[92vh] flex items-center pt-24 pb-16 bg-ivory bg-grain overflow-hidden"
      aria-label="Introduction"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-60" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full">
        {/* Top Editorial Index Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-border-subtle font-mono text-xs text-charcoal-light">
          <div className="flex items-center gap-3">
            <span className="text-muted-green font-bold">[V3.24]</span>
            <span className="uppercase tracking-widest">
              SYSTEM DOSSIER · {HeroInfo.name.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-chartreuse animate-pulse" />
            <span className="uppercase tracking-wider text-charcoal">
              {HeroInfo.availability}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: 7 Cols */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Identity & Current Enterprise Position */}
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-muted-green font-semibold uppercase tracking-wider">
                <span className="px-2 py-0.5 rounded bg-paper border border-border-subtle">
                  Associate Software Engineer
                </span>
                <span>@ BlackRock</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal leading-[1.08]">
                Architecting resilient, high-impact digital systems.
              </h1>
            </div>

            {/* Context & Location */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-charcoal-light">
              <span className="flex items-center gap-1.5">
                <MapPinIcon className="w-4 h-4 text-muted-green" />
                {HeroInfo.location} · {HeroInfo.workArrangement}
              </span>
              <span>{"//"}</span>
              <span className="flex items-center gap-1.5">
                <EnvelopeIcon className="w-4 h-4 text-muted-green" />
                <a
                  href={`mailto:${HeroInfo.email}`}
                  className="hover:text-charcoal underline underline-offset-2 transition-colors"
                >
                  {HeroInfo.email}
                </a>
              </span>
            </div>

            {/* Biography */}
            <p className="text-base sm:text-lg text-charcoal-mid leading-relaxed max-w-xl font-normal border-l-2 border-chartreuse pl-4">
              {HeroInfo.bio} Focused on enterprise content management (AEM, TeamSite), React ecosystems,
              scalable micro-architectures, and high-performance workflow automation.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="#project"
                onClick={() => {
                  playTactileClick("snap");
                  sendGTMEvent("cta_selected_work_clicked");
                }}
                className="group inline-flex items-center gap-2 bg-chartreuse text-charcoal px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-bold shadow-sm hover:bg-chartreuse-dark hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Selected Work</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-aman-ai"));
                    sendGTMEvent("archon_opened", { trigger: "hero_button" });
                  }
                }}
                className="group inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-charcoal text-chartreuse font-mono text-xs uppercase tracking-wider font-bold hover:bg-black shadow-sm transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-chartreuse animate-pulse" />
                <span>Ask Archon</span>
                <span className="text-[10px] opacity-60 font-mono">⌘K</span>
              </button>

              <Link
                href="#experience"
                onClick={() => playTactileClick("tick")}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-border-mid bg-paper font-mono text-xs uppercase tracking-wider text-charcoal hover:border-charcoal hover:bg-warm-white transition-all"
              >
                Timeline
              </Link>
            </div>

            {/* Micro-metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border-subtle font-mono">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-charcoal">05+</span>
                <span className="text-[11px] text-charcoal-light uppercase tracking-wider">
                  Years Active
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-charcoal">35%</span>
                <span className="text-[11px] text-charcoal-light uppercase tracking-wider">
                  Latency Slashed
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-charcoal">Enterprise</span>
                <span className="text-[11px] text-charcoal-light uppercase tracking-wider">
                  AEM & React
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 5 Cols -> Kinetic 3D Installation */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Architectural Frame Wrapper */}
            <div className="relative w-full aspect-square max-w-[480px] bg-paper/60 backdrop-blur-sm border border-border-subtle rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              {/* Corner crosshairs */}
              <span className="absolute -top-2.5 -left-2.5 font-mono text-xs text-charcoal-light/60">
                +
              </span>
              <span className="absolute -top-2.5 -right-2.5 font-mono text-xs text-charcoal-light/60">
                +
              </span>
              <span className="absolute -bottom-2.5 -left-2.5 font-mono text-xs text-charcoal-light/60">
                +
              </span>
              <span className="absolute -bottom-2.5 -right-2.5 font-mono text-xs text-charcoal-light/60">
                +
              </span>

              {/* 3D Canvas */}
              <div className="w-full h-full relative">
                <HeroSculpture />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
