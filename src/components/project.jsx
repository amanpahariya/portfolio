"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
  CpuChipIcon,
  CheckCircleIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import { useHeroInfo } from "@/components/hero-info-context";
import { playTactileClick } from "@/utility/sound";

const CATEGORIES = [
  { id: "all", label: "All Engineering" },
  { id: "fullstack", label: "Full Stack & ERP" },
  { id: "web", label: "Web Applications" },
];

export default function Project() {
  const HeroInfo = useHeroInfo();
  const [activeTab, setActiveTab] = useState("all");
  const [inspectedProject, setInspectedProject] = useState(null);
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [benchmarkDone, setBenchmarkDone] = useState(false);

  const filteredProjects =
    activeTab === "all"
      ? HeroInfo.projects
      : HeroInfo.projects.filter((p) => p.category === activeTab);

  const handleTabChange = (catId) => {
    setActiveTab(catId);
    playTactileClick("tick");
  };

  const handleInspect = (project) => {
    setInspectedProject(project);
    playTactileClick("snap");
  };

  const closeInspect = () => {
    setInspectedProject(null);
    playTactileClick("tick");
  };

  const runBenchmark = () => {
    setIsBenchmarking(true);
    setBenchmarkDone(false);
    playTactileClick("snap");

    setTimeout(() => {
      setIsBenchmarking(false);
      setBenchmarkDone(true);
      playTactileClick("success");
    }, 1100);
  };

  return (
    <section
      id="project"
      className="bg-paper py-24 px-6 lg:px-8 border-t border-border-subtle relative bg-grain"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 mb-12 border-b border-border-subtle font-mono text-xs text-charcoal-light">
          <div className="flex items-center gap-2">
            <span className="text-muted-green font-bold">[03]</span>
            <span className="uppercase tracking-widest text-charcoal">
              SELECTED PRODUCTION WORK & BLUEPRINTS
            </span>
          </div>
          <span className="text-[11px] uppercase tracking-wider">
            {filteredProjects.length} ARCHITECTURES CATALOGED
          </span>
        </div>

        {/* Headline & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2
              id="projects-heading"
              className="text-3xl sm:text-4xl font-bold text-charcoal leading-tight tracking-tight mb-2"
            >
              Enterprise systems, ERP platforms & high-speed interfaces.
            </h2>
            <p className="text-sm text-charcoal-mid max-w-xl">
              Engineered with modern full-stack architectures, cloud integrations, and strict performance targets.
            </p>
          </div>

          {/* Filter Pills */}
          <div
            className="flex items-center gap-1.5 p-1 bg-ivory border border-border-subtle rounded-xl self-start md:self-auto"
            role="group"
            aria-label="Filter projects"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleTabChange(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all ${
                  activeTab === cat.id
                    ? "bg-charcoal text-chartreuse font-bold shadow-sm"
                    : "text-charcoal-mid hover:text-charcoal hover:bg-paper"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const hasExternal = project.link && project.link !== "#";

            return (
              <article
                key={project.title}
                className="group relative flex flex-col justify-between bg-ivory border border-border-subtle hover:border-charcoal/40 rounded-xl p-6 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {/* Header Tag Bar */}
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-subtle font-mono text-[11px]">
                    <span className="text-muted-green font-bold">
                      PRJ-0{idx + 1} {"//"}
                    </span>
                    <span className="text-charcoal-light uppercase">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-charcoal group-hover:text-muted-green transition-colors mb-3">
                    {project.title}
                  </h3>

                  <p className="text-sm text-charcoal-mid leading-relaxed mb-6 font-normal">
                    {project.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-1.5 mb-6">
                    {project.highlights.slice(0, 3).map((h, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-2 text-xs text-charcoal-mid"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-chartreuse-dark mt-1.5 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer: Tech Stack & Blueprint Action */}
                <div className="pt-4 border-t border-border-subtle/80 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-paper border border-border-subtle text-charcoal-light"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => handleInspect(project)}
                      className="inline-flex items-center gap-1.5 text-charcoal font-bold hover:text-muted-green transition-colors uppercase tracking-wider"
                    >
                      <CpuChipIcon className="w-4 h-4 text-chartreuse-dark" />
                      <span>Blueprint</span>
                    </button>

                    {hasExternal && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-muted-green hover:text-charcoal transition-colors uppercase tracking-wider"
                        aria-label={`Open ${project.title} in new tab`}
                      >
                        <span>Live Site</span>
                        <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Interactive Optimization Benchmark Simulator */}
        <div className="mt-16 bg-ivory border border-border-subtle rounded-2xl p-6 sm:p-8 font-mono shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-subtle mb-6">
            <div>
              <span className="text-muted-green font-bold text-xs uppercase tracking-wider block mb-1">
                SYSTEM SIMULATOR {"//"} PRODUCTION BENCHMARK
              </span>
              <h3 className="text-lg font-bold text-charcoal font-sans">
                Interactive Latency Optimizer: MongoDB &amp; AWS Lambda
              </h3>
            </div>

            <button
              type="button"
              onClick={runBenchmark}
              disabled={isBenchmarking}
              className="px-5 py-2.5 rounded-xl bg-charcoal text-chartreuse font-mono text-xs uppercase tracking-wider font-bold shadow hover:bg-black transition-all flex items-center gap-2 self-start sm:self-auto disabled:opacity-50"
            >
              <BoltIcon className="w-4 h-4 text-chartreuse" />
              <span>{isBenchmarking ? "Profiling Pipeline..." : "Run Benchmark"}</span>
            </button>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 bg-paper rounded-xl border border-border-subtle space-y-1">
              <span className="text-[11px] text-charcoal-light uppercase block">
                Legacy Unindexed
              </span>
              <span className="text-xl font-bold text-charcoal">
                1,280 ms
              </span>
              <span className="text-[10px] text-red-500 block">
                Unindexed queries &amp; cold starts
              </span>
            </div>

            <div className="p-4 bg-paper rounded-xl border border-border-subtle space-y-1">
              <span className="text-[11px] text-charcoal-light uppercase block">
                Aman&apos;s Optimization
              </span>
              <span className="text-xl font-bold text-chartreuse-dark">
                {benchmarkDone ? "418 ms" : isBenchmarking ? "Measuring..." : "420 ms"}
              </span>
              <span className="text-[10px] text-muted-green block">
                AWS Lambda + Pipeline Aggregation
              </span>
            </div>

            <div className="p-4 bg-paper rounded-xl border border-border-subtle space-y-1">
              <span className="text-[11px] text-charcoal-light uppercase block">
                Throughput Speedup
              </span>
              <span className="text-xl font-bold text-charcoal">
                +35.2%
              </span>
              <span className="text-[10px] text-chartreuse-dark font-bold block">
                Production-verified metric
              </span>
            </div>
          </div>
        </div>

        {/* Architecture Blueprint Modal */}
        <AnimatePresence>
          {inspectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-2xl bg-ivory rounded-2xl border border-border-mid shadow-2xl p-6 sm:p-8 overflow-hidden"
              >
                <div className="flex items-start justify-between pb-4 border-b border-border-subtle mb-6">
                  <div>
                    <span className="font-mono text-xs text-muted-green font-bold uppercase tracking-wider block mb-1">
                      ARCHITECTURAL BLUEPRINT
                    </span>
                    <h3 className="text-2xl font-bold text-charcoal">
                      {inspectedProject.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={closeInspect}
                    className="p-2 rounded-full border border-border-subtle text-charcoal-mid hover:text-charcoal hover:bg-paper transition-colors"
                    aria-label="Close Blueprint"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="font-mono text-xs text-charcoal-light uppercase tracking-wider block mb-2 font-semibold">
                      System Overview &amp; Purpose
                    </span>
                    <p className="text-sm text-charcoal-mid leading-relaxed">
                      {inspectedProject.description}
                    </p>
                  </div>

                  <div className="p-4 bg-paper rounded-xl border border-border-subtle space-y-2">
                    <span className="font-mono text-xs text-charcoal font-bold uppercase tracking-wider block">
                      Production Outcomes &amp; Achievements
                    </span>
                    <div className="grid sm:grid-cols-2 gap-2 pt-1">
                      {inspectedProject.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs text-charcoal-mid"
                        >
                          <CheckCircleIcon className="w-4 h-4 text-chartreuse-dark flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-xs text-charcoal-light uppercase tracking-wider block mb-2 font-semibold">
                      Full Technology Infrastructure
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {inspectedProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs px-3 py-1 rounded bg-paper border border-border-mid text-charcoal font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {inspectedProject.link && inspectedProject.link !== "#" && (
                    <div className="pt-4 border-t border-border-subtle flex justify-end">
                      <a
                        href={inspectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-chartreuse text-charcoal font-mono text-xs uppercase tracking-wider font-bold shadow-sm hover:bg-chartreuse-dark transition-colors"
                      >
                        <span>Launch Live Deployment</span>
                        <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
