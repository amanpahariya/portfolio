"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BriefcaseIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  BuildingOffice2Icon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { useHeroInfo } from "@/components/hero-info-context";
import { playTactileClick } from "@/utility/sound";

export default function Experience() {
  const HeroInfo = useHeroInfo();
  const [expandedIndex, setExpandedIndex] = useState(0); // first expanded by default

  const toggleExpand = (idx) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
    playTactileClick("tick");
  };

  return (
    <section
      id="experience"
      className="bg-ivory py-24 px-6 lg:px-8 border-t border-border-subtle relative bg-grain"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 mb-16 border-b border-border-subtle font-mono text-xs text-charcoal-light">
          <div className="flex items-center gap-2">
            <span className="text-muted-green font-bold">[02]</span>
            <span className="uppercase tracking-widest text-charcoal">
              CAREER TIMELINE & ENTERPRISE ROLES
            </span>
          </div>
          <span className="text-[11px] uppercase tracking-wider">
            2021 &mdash; PRESENT
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Summary Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div>
              <h2
                id="experience-heading"
                className="text-3xl sm:text-4xl font-bold text-charcoal leading-tight tracking-tight mb-4"
              >
                Track record across enterprise & high-growth environments.
              </h2>
              <div className="w-16 h-1 bg-chartreuse mb-4" />
            </div>

            <p className="text-sm text-charcoal-mid leading-relaxed font-normal">
              From enterprise digital experience platforms at BlackRock and TCS to core full-stack
              product engineering at Invock, delivering measurable latency reductions and robust software architectures.
            </p>

            <div className="p-4 bg-paper rounded-xl border border-border-subtle font-mono text-xs space-y-3">
              <span className="text-muted-green font-bold block uppercase tracking-wider">
                Enterprise Standards
              </span>
              <ul className="space-y-2 text-charcoal-light">
                <li className="flex items-center gap-2">
                  <CheckBadgeIcon className="w-4 h-4 text-chartreuse-dark flex-shrink-0" />
                  <span>Agile Sprint & Release Governance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckBadgeIcon className="w-4 h-4 text-chartreuse-dark flex-shrink-0" />
                  <span>CI/CD Automation & Cloud Deployment</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckBadgeIcon className="w-4 h-4 text-chartreuse-dark flex-shrink-0" />
                  <span>High-Scale CMS & Database Systems</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Timeline Cards (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {HeroInfo.experience.map((exp, index) => {
              const isCurrent = index === 0;
              const isExpanded = expandedIndex === index;

              return (
                <div
                  key={index}
                  className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? "bg-paper border-charcoal/40 shadow-sm"
                      : "bg-ivory border-border-subtle hover:border-border-mid"
                  }`}
                >
                  {/* Card Header (Clickable Accordion) */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(index)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 select-none focus:outline-none"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            isCurrent
                              ? "bg-chartreuse text-charcoal"
                              : "bg-paper border border-border-subtle text-charcoal-light"
                          }`}
                        >
                          {isCurrent ? "ACTIVE ROLE" : `ROLE 0${index + 1}`}
                        </span>
                        <span className="text-charcoal-light flex items-center gap-1">
                          <CalendarDaysIcon className="w-3.5 h-3.5" />
                          {exp.period}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-baseline gap-2">
                        <h3 className="text-xl font-bold text-charcoal">
                          {exp.title}
                        </h3>
                        <span className="text-base text-muted-green font-semibold">
                          @ {exp.company}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`p-2 rounded-full border border-border-subtle transition-transform duration-200 ${
                        isExpanded ? "rotate-180 bg-charcoal text-ivory" : "text-charcoal-light"
                      }`}
                    >
                      <ChevronDownIcon className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Expandable Body */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-border-subtle/50 flex flex-col gap-4">
                          <p className="text-sm text-charcoal-mid leading-relaxed">
                            {exp.description}
                          </p>

                          <div>
                            <span className="font-mono text-xs text-charcoal-light uppercase tracking-wider block mb-2 font-semibold">
                              Key Impact & Contributions:
                            </span>
                            <div className="grid sm:grid-cols-2 gap-2">
                              {exp.achievements.map((ach, aIdx) => (
                                <div
                                  key={aIdx}
                                  className="flex items-start gap-2 p-2.5 rounded bg-ivory border border-border-subtle/80 text-xs text-charcoal"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-chartreuse-dark mt-1.5 flex-shrink-0" />
                                  <span className="leading-snug">{ach}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
