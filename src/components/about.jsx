"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useHeroInfo } from "@/components/hero-info-context";

export default function About() {
  const HeroInfo = useHeroInfo();

  return (
    <section
      id="about"
      className="bg-paper py-24 px-6 lg:px-8 border-t border-border-subtle relative bg-grain"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 mb-16 border-b border-border-subtle font-mono text-xs text-charcoal-light">
          <div className="flex items-center gap-2">
            <span className="text-muted-green font-bold">[01]</span>
            <span className="uppercase tracking-widest text-charcoal">
              BIOGRAPHICAL DOSSIER
            </span>
          </div>
          <span className="text-[11px] uppercase tracking-wider">
            AMAN GUPTA {"//"} SOFTWARE ENGINEER
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait & Meta Stamp (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative group">
              <div className="relative aspect-[4/5] w-full max-w-sm rounded-xl overflow-hidden border border-border-mid bg-ivory shadow-sm">
                <Image
                  src={`/${HeroInfo.aboutMeImage}`}
                  alt={`${HeroInfo.name} — Software Engineer`}
                  fill
                  className="object-cover filter contrast-[1.02] hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority={false}
                />
              </div>

              {/* Offset Technical Framing */}
              <div
                className="absolute -bottom-3 -right-3 w-full max-w-sm aspect-[4/5] border border-chartreuse rounded-xl pointer-events-none -z-0"
                aria-hidden="true"
              />

              {/* Stamp Badge */}
              <div className="absolute top-4 left-4 bg-charcoal/90 text-ivory backdrop-blur-md px-3 py-1 rounded font-mono text-[10px] uppercase tracking-widest border border-white/20">
                ACTIVE · BLACKROCK
              </div>
            </div>

            {/* Quick Metadata Spec */}
            <div className="bg-ivory border border-border-subtle rounded-xl p-5 font-mono text-xs space-y-3">
              <div className="flex justify-between border-b border-border-subtle/60 pb-2">
                <span className="text-charcoal-light">Role</span>
                <span className="font-semibold text-charcoal">{HeroInfo.title}</span>
              </div>
              <div className="flex justify-between border-b border-border-subtle/60 pb-2">
                <span className="text-charcoal-light">Organization</span>
                <span className="font-semibold text-charcoal">BlackRock</span>
              </div>
              <div className="flex justify-between border-b border-border-subtle/60 pb-2">
                <span className="text-charcoal-light">Focus Platforms</span>
                <span className="font-semibold text-charcoal">AEM · TeamSite · Next.js</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-light">Location</span>
                <span className="font-semibold text-charcoal">{HeroInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Core Pillars (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <h2
                id="about-heading"
                className="text-3xl sm:text-4xl font-bold text-charcoal leading-tight tracking-tight mb-4"
              >
                Building reliable software where high performance meets intuitive craft.
              </h2>
              <div className="w-16 h-1 bg-chartreuse mb-6" />
            </div>

            <div className="space-y-4 text-charcoal-mid text-base leading-relaxed">
              {HeroInfo.aboutMe.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Three Core Engineering Commitments */}
            <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-border-subtle">
              <div className="p-4 bg-ivory rounded-xl border border-border-subtle">
                <span className="font-mono text-xs text-muted-green font-bold block mb-1">
                  01 {"//"} SCALE
                </span>
                <h3 className="font-bold text-sm text-charcoal mb-1">
                  Enterprise Resilience
                </h3>
                <p className="text-xs text-charcoal-light leading-relaxed">
                  Managing mission-critical CMS & microservice infrastructures with zero downtime.
                </p>
              </div>

              <div className="p-4 bg-ivory rounded-xl border border-border-subtle">
                <span className="font-mono text-xs text-muted-green font-bold block mb-1">
                  02 {"//"} SPEED
                </span>
                <h3 className="font-bold text-sm text-charcoal mb-1">
                  Latency Optimization
                </h3>
                <p className="text-xs text-charcoal-light leading-relaxed">
                  Optimized database aggregation queries and reduced asset pipeline delivery times.
                </p>
              </div>

              <div className="p-4 bg-ivory rounded-xl border border-border-subtle">
                <span className="font-mono text-xs text-muted-green font-bold block mb-1">
                  03 {"//"} CRAFT
                </span>
                <h3 className="font-bold text-sm text-charcoal mb-1">
                  Modern Interfaces
                </h3>
                <p className="text-xs text-charcoal-light leading-relaxed">
                  Pixel-accurate, accessible, and responsive user interfaces with seamless interactivity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
