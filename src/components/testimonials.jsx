import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useHeroInfo } from "@/components/hero-info-context";

const Testimonials = () => {
  const HeroInfo = useHeroInfo();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section id="testimonials" className="py-20 px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

      <motion.div ref={containerRef} className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400">
            Testimonials
            <motion.p className="text-sm text-gray-300 mt-2">
              What clients say about my work
            </motion.p>
          </h2>
        </motion.div>

        {/* Profile Banner */}
        <motion.div
          className="relative rounded-2xl overflow-hidden mb-12 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0">
            <motion.img
              src={HeroInfo.aboutMeImage}
              alt={HeroInfo.name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117] via-[#0d1117]/80 to-transparent" />
          </div>
          <div className="relative z-10 p-8 flex items-center space-x-6">
            <motion.div
              className="relative w-20 h-20 flex-shrink-0"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-violet-500 p-0.5">
                <motion.img
                  src={HeroInfo.heroImage}
                  alt={HeroInfo.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <motion.div
                className="absolute -inset-1 rounded-full border border-dashed border-blue-400/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-white">{HeroInfo.name}</h3>
              <p className="text-blue-400">{HeroInfo.title}</p>
              <div className="flex items-center space-x-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
                <span className="text-gray-400 text-sm ml-2">5.0 overall rating</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {HeroInfo.testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              style={{ x: index % 2 === 0 ? x : -x, rotate }}
              className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">&quot;{testimonial.content}&quot;</p>
              <div>
                <h4 className="text-white font-semibold">{testimonial.name}</h4>
                <p className="text-blue-400 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;