import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useHeroInfo } from "@/components/hero-info-context";

const Experience = () => {
  const HeroInfo = useHeroInfo();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="experience" className="py-20 px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        ref={containerRef}
        style={{ y, opacity }}
        className="max-w-6xl mx-auto"
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400">
            Experience
            <motion.p className="text-sm text-gray-300 mt-2">
              My professional journey
            </motion.p>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-violet-500"></div>
          
          {HeroInfo.experience.map((exp, index) => (
            <motion.div
              key={index}
              className="relative flex items-start mb-12 pl-20"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <motion.div
                className="absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-[#0d1117]"
                whileHover={{ scale: 1.2 }}
              />
              
              <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm flex-1">
                <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                <p className="text-blue-400 font-medium">{exp.company}</p>
                <p className="text-gray-400 text-sm mb-3">{exp.period}</p>
                <p className="text-gray-300 mb-4">{exp.description}</p>
                <ul className="space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;