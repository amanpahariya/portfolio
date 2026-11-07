"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MagnifyingGlassIcon,
  WrenchScrewdriverIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useHeroInfo } from "@/components/hero-info-context";
import { playTactileClick } from "@/utility/sound";

export default function Skills() {
  const { skills: categories } = useHeroInfo();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories
    .map((category) => {
      const filteredSkills = category.skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
      return { ...category, skills: filteredSkills };
    })
    .filter((category) => category.skills.length > 0);

  const totalSkillCount = categories.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  );

  return (
    <section
      id="skills"
      className="bg-ivory py-24 px-6 lg:px-8 border-t border-border-subtle relative bg-grain"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 mb-12 border-b border-border-subtle font-mono text-xs text-charcoal-light">
          <div className="flex items-center gap-2">
            <span className="text-muted-green font-bold">[04]</span>
            <span className="uppercase tracking-widest text-charcoal">
              TECHNICAL STACK & ENGINE TOOLKIT
            </span>
          </div>
          <span className="text-[11px] uppercase tracking-wider">
            {totalSkillCount} CORE CAPABILITIES
          </span>
        </div>

        {/* Section Headline & Real-time Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2
              id="skills-heading"
              className="text-3xl sm:text-4xl font-bold text-charcoal leading-tight tracking-tight mb-2"
            >
              Enterprise CMS, modern frontend & automated systems.
            </h2>
            <p className="text-sm text-charcoal-mid max-w-xl">
              From enterprise platforms like Adobe Experience Manager and TeamSite to full-stack JavaScript and AI automation.
            </p>
          </div>

          {/* Real-time Search Filter Bar */}
          <div className="relative w-full md:w-72">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-light" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) playTactileClick("tick");
              }}
              placeholder="Search stack (e.g. AEM, Next, AWS)..."
              className="w-full pl-9 pr-4 py-2 bg-paper border border-border-subtle rounded-xl text-xs font-mono text-charcoal placeholder-charcoal-light focus:outline-none focus:border-charcoal transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-charcoal-light hover:text-charcoal"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.title}
              className="bg-paper border border-border-subtle rounded-xl p-6 flex flex-col justify-between hover:border-border-mid transition-all shadow-sm"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-border-subtle">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-chartreuse-dark" />
                    <span>{cat.title}</span>
                  </h3>
                  <span className="font-mono text-[10px] text-charcoal-light">
                    {cat.skills.length} TOOLS
                  </span>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-medium text-charcoal">
                          {skill.name}
                        </span>
                        {skill.level !== undefined ? (
                          <span className="text-charcoal-light font-semibold">
                            {skill.level}%
                          </span>
                        ) : (
                          <span className="text-muted-green font-semibold uppercase text-[10px] bg-ivory px-2 py-0.5 rounded border border-border-subtle">
                            {skill.experience || "Enterprise"}
                          </span>
                        )}
                      </div>

                      {/* Progress bar if numerical level */}
                      {skill.level !== undefined && (
                        <div className="h-1.5 w-full bg-ivory rounded-full overflow-hidden border border-border-subtle/50">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`h-full rounded-full ${
                              skill.level >= 85
                                ? "bg-chartreuse-dark"
                                : "bg-muted-green"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-16 bg-paper rounded-xl border border-border-subtle font-mono text-xs text-charcoal-light">
            No technical skills found matching &ldquo;{searchQuery}&rdquo;.
          </div>
        )}
      </div>
    </section>
  );
}
