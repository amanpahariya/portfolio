import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState, useRef } from "react";
import { ArrowRightIcon, EyeIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import { useHeroInfo } from "@/components/hero-info-context";

const Project = () => {
  const HeroInfo = useHeroInfo();
  const [activeTab, setActiveTab] = useState("all");
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const categories = [
    { id: "all", label: "All Projects", icon: "🚀" },
    { id: "web", label: "Web Development", icon: "🌐" },
    { id: "fullstack", label: "Full Stack", icon: "⚡" },
  ];

  const filteredProjects =
    activeTab === "all"
      ? HeroInfo.projects
      : HeroInfo.projects.filter((project) => project.category === activeTab);

  return (
    <section id="project" className="py-20 px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      
      <motion.div
        ref={containerRef}
        className="max-w-7xl mx-auto relative z-10"
        style={{ y }}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400">
            Featured Projects
            <motion.p className="text-sm text-gray-300 mt-2">
              Transforming ideas into exceptional digital experiences
            </motion.p>
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12 px-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 p-2 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 w-full sm:w-auto">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 w-full sm:w-auto ${
                  activeTab === category.id
                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{category.icon}</span>
                <span className="whitespace-nowrap">{category.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Project Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{project.icon}</span>
                  <div className="flex space-x-2">
                    {project.link && project.link !== "#" && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        <EyeIcon className="w-4 h-4 text-blue-400" />
                      </motion.a>
                    )}
                    <motion.div
                      className="p-2 bg-violet-500/20 rounded-lg hover:bg-violet-500/30 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                    >
                      <CodeBracketIcon className="w-4 h-4 text-violet-400" />
                    </motion.div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech, i) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-full text-blue-300 border border-blue-500/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Key Highlights */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {project.highlights.slice(0, 3).map((highlight, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start gap-3 text-sm text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Hover Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Project;
