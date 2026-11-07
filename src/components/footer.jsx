"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useHeroInfo } from "@/components/hero-info-context";
import { playTactileClick } from "@/utility/sound";

const REACTIONS = [
  { id: "craft", label: "🔥 High Craft", initial: 142 },
  { id: "impressed", label: "⚡ Impressed", initial: 98 },
  { id: "hire", label: "💼 Interview", initial: 64 },
  { id: "coffee", label: "☕ Coffee", initial: 39 },
];

export default function Footer() {
  const HeroInfo = useHeroInfo();
  const currentYear = new Date().getFullYear();
  const [reactionCounts, setReactionCounts] = useState(() =>
    REACTIONS.reduce((acc, r) => ({ ...acc, [r.id]: r.initial }), {})
  );
  const [activeReactions, setActiveReactions] = useState({});

  // Anonymous Pageview Telemetry on Mount
  useEffect(() => {
    fetch("/api/telemetry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "page_view",
        metadata: { path: window.location.pathname },
      }),
    }).catch(() => {});
  }, []);

  const handleReaction = (id) => {
    playTactileClick("success");
    setReactionCounts((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
    setActiveReactions((prev) => ({
      ...prev,
      [id]: true,
    }));

    // Post to telemetry endpoint
    fetch("/api/telemetry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "visitor_reaction",
        metadata: { reactionId: id },
      }),
    }).catch(() => {});
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    playTactileClick("snap");
  };

  return (
    <footer
      className="bg-charcoal text-ivory/80 py-16 px-6 lg:px-8 border-t border-charcoal-light/30 relative font-mono text-xs"
      role="contentinfo"
      aria-label="Site Colophon"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Interactive Visitor Reaction Bar */}
        <div className="p-6 bg-black/40 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-chartreuse font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Visitor Pulse &amp; Feedback</span>
            </span>
            <p className="text-ivory/70 text-xs font-sans">
              Leave a quick tactile reaction for Aman&apos;s portfolio engineering.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {REACTIONS.map((r) => {
              const isPulsed = activeReactions[r.id];
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleReaction(r.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs transition-all duration-200 select-none ${
                    isPulsed
                      ? "bg-chartreuse text-charcoal border-chartreuse font-bold scale-105"
                      : "bg-white/5 border-white/15 text-ivory/85 hover:border-chartreuse hover:text-chartreuse"
                  }`}
                >
                  <span>{r.label}</span>
                  <span className="text-[10px] opacity-70 font-mono">
                    {reactionCounts[r.id]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Top Colophon Line */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="flex flex-col gap-2">
            <span className="text-chartreuse font-bold text-base tracking-tight font-sans">
              {HeroInfo.name} &mdash; Portfolio V3
            </span>
            <p className="text-ivory/60 text-xs max-w-md font-sans">
              Associate Software Engineer at BlackRock. Specializing in enterprise digital experience platforms, modern React architectures, and distributed systems.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/20 hover:border-chartreuse hover:text-chartreuse transition-all text-xs uppercase tracking-wider group"
          >
            <span>Return to Zenith</span>
            <ArrowUpIcon className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom Credits & Channels */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] text-ivory/50">
          <div className="flex items-center gap-6">
            <a
              href={HeroInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTactileClick("tick")}
              className="hover:text-chartreuse transition-colors uppercase tracking-wider"
            >
              GitHub
            </a>
            <a
              href={HeroInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTactileClick("tick")}
              className="hover:text-chartreuse transition-colors uppercase tracking-wider"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${HeroInfo.email}`}
              onClick={() => playTactileClick("tick")}
              className="hover:text-chartreuse transition-colors uppercase tracking-wider"
            >
              Email
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span>&copy; {currentYear} {HeroInfo.name}. All Rights Reserved.</span>
            <span>{"//"}</span>
            <span className="text-chartreuse">Engineered with Next.js &amp; TypeScript</span>
          </div>
        </div>

        {/* AI Transparency & Direct Contact Note */}
        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-ivory/40">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 inline-block flex-shrink-0" />
            <span>Archon agent responses are AI-generated and can make mistakes. For verified inquiries or opportunities, connect with Aman directly.</span>
          </p>
          <a
            href={`mailto:${HeroInfo.email}`}
            onClick={() => playTactileClick("tick")}
            className="text-ivory/70 hover:text-chartreuse transition-colors underline underline-offset-2 flex-shrink-0 font-medium"
          >
            Connect with Aman &rarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
