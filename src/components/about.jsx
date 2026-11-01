import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useHeroInfo } from "@/components/hero-info-context";

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  const HeroInfo = useHeroInfo();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const textY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section id="about" className="py-20 px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-40 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      
      <motion.div
        ref={containerRef}
        className="max-w-6xl mx-auto relative z-10"
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400">
            About Me
            <motion.p className="text-sm text-gray-300 mt-2">
              Get to know me better
            </motion.p>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            className="flex justify-center lg:justify-start"
            style={{ y: imageY }}
          >
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                rotateX: -2,
              }}
            >
              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/30 rounded-full blur-sm"
                animate={{ y: [-5, 5, -5], rotate: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-violet-500/30 rounded-full blur-sm"
                animate={{ y: [5, -5, 5], rotate: [360, 180, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Main image container */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-2xl blur-xl" />
                <motion.img
                  src={HeroInfo.aboutMeImage}
                  alt={HeroInfo.name}
                  className="relative z-10 w-80 h-80 object-cover rounded-2xl border border-white/10 shadow-2xl"
                  animate={{
                    boxShadow: [
                      "0 10px 30px rgba(59, 130, 246, 0.2)",
                      "0 10px 30px rgba(139, 92, 246, 0.2)",
                      "0 10px 30px rgba(59, 130, 246, 0.2)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                {/* Decorative border */}
                <motion.div
                  className="absolute inset-2 rounded-2xl border border-dashed border-white/20"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            className="space-y-6"
            style={{ y: textY }}
          >
            {HeroInfo.aboutMe.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{
                  background: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  scale: 1.02
                }}
              >
                <motion.p
                  className="text-gray-300 leading-relaxed flex flex-wrap"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={containerVariants}
                >
                  {item.split(" ").map((word, i) => (
                    <motion.span 
                      key={i} 
                      className="mr-1" 
                      variants={wordVariants}
                      whileHover={{ 
                        color: "#60a5fa",
                        scale: 1.05
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>
            ))}
            
            {/* Call to action */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let&apos;s Connect
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
