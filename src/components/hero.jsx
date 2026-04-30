import React, { useRef } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import Link from "next/link";

import HeroInfo from "@/utility/hero.json";
import TypingAnimation from "@/components/typing-animation";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1 },
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref })
  const rawScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.6]);

  const scale = useSpring(rawScale, {
    stiffness: 40,
    damping: 15,
    mass: 1
  });

  return (
    <React.Fragment>
      <motion.div
        className="intro-hero-content relative overflow-hidden"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        style={{ scale }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-violet-900/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        
        {/* Content Container */}
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center min-h-screen px-6 lg:px-8">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse" />
                <span className="text-sm text-gray-300">Available for work</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-white/90">Hi, I&apos;m</span>
                <span className="block mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                  {HeroInfo.name}
                </span>
              </h1>
            </motion.div>

            <motion.h2
              className="text-2xl md:text-3xl font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <TypingAnimation
                texts={[
                  "Software Engineer",
                  "Full Stack Developer",
                  "AI & Automation Builder",
                  "Problem Solver"
                ]}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400"
              />
            </motion.h2>

            <motion.p
              className="text-lg text-gray-400 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {HeroInfo.bio}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {/* Primary CTA with Torch Effect */}
              <Link
                href="#project"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                <span className="relative z-10 text-white font-semibold flex items-center gap-2">
                  View My Work
                  <motion.span
                    className="text-lg"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                
                {/* Torch Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 via-white to-violet-400 opacity-0 group-hover:opacity-20"
                  initial={false}
                  whileHover={{
                    background: [
                      "linear-gradient(45deg, rgba(59, 130, 246, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(139, 92, 246, 0.3) 100%)",
                      "linear-gradient(45deg, rgba(139, 92, 246, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(59, 130, 246, 0.3) 100%)"
                    ],
                    transition: { duration: 0.6, repeat: Infinity, repeatType: "reverse" }
                  }}
                />
                
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
                  transition={{ duration: 0.6 }}
                />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="#contact"
                className="group relative px-8 py-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
              >
                <span className="relative z-10 text-white font-semibold flex items-center gap-2">
                  Let&apos;s Talk
                  <motion.span
                    className="w-2 h-2 bg-blue-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Enhanced 3D Element */}
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            <div className="relative">
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-8 -left-8 w-16 h-16 bg-blue-500/20 rounded-full blur-xl"
                animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-8 -right-8 w-20 h-20 bg-violet-500/20 rounded-full blur-xl"
                animate={{ y: [10, -10, 10], rotate: [360, 180, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Main Image Container */}
              <motion.div
                className="relative w-80 h-80 lg:w-96 lg:h-96"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-violet-500/30 rounded-full blur-2xl" />
                
                {/* Image */}
                <motion.img
                  className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white/10 shadow-2xl"
                  src={HeroInfo.heroImage}
                  alt={HeroInfo.name}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(59, 130, 246, 0.4)",
                      "0 0 0 20px rgba(59, 130, 246, 0)",
                      "0 0 0 0 rgba(139, 92, 246, 0.4)",
                      "0 0 0 20px rgba(139, 92, 246, 0)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                {/* Rotating Ring */}
                <motion.div
                  className="absolute inset-4 rounded-full border-2 border-dashed border-white/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default Hero;
