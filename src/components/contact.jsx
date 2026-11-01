import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useHeroInfo } from "@/components/hero-info-context";

const Contact = () => {
  const HeroInfo = useHeroInfo();
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, create a mailto link with the form data
      const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      
      window.location.href = `mailto:${HeroInfo.email}?subject=${subject}&body=${body}`;
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      value: HeroInfo.email,
      link: `mailto:${HeroInfo.email}`,
      description: "Send me an email"
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "Connect with me",
      link: HeroInfo.linkedinUrl,
      description: "Professional network"
    },
    {
      icon: "📍",
      title: "Location",
      value: HeroInfo.location,
      link: "#",
      description: HeroInfo.workArrangement
    }
  ];

  return (
    <section id="contact" className="py-20 px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
      
      <motion.div
        ref={containerRef}
        className="max-w-6xl mx-auto relative z-10"
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
                        Let&apos;s Connect
            <motion.p className="text-sm text-gray-300 mt-2">
              Ready to bring your ideas to life? Let&apos;s discuss your next project
            </motion.p>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <motion.div
            className="space-y-6"
            style={{ rotate }}
          >
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Profile Card */}
              <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-white/10">
                <motion.div
                  className="relative w-16 h-16 flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-violet-500 p-0.5">
                    <motion.img
                      src={HeroInfo.aboutMeImage}
                      alt={HeroInfo.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <motion.div
                    className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/30 to-violet-500/30 blur-sm -z-10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-[#0d1117]" />
                </motion.div>
                <div>
                  <h4 className="text-white font-bold text-lg">{HeroInfo.name}</h4>
                  <p className="text-blue-400 text-sm">{HeroInfo.title}</p>
                  <p className="text-gray-400 text-xs">{HeroInfo.availability}</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I&apos;m always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={method.link}
                      target={method.link.startsWith('http') ? '_blank' : '_self'}
                      className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-xl">{method.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {method.title}
                        </h4>
                        <p className="text-sm text-gray-400">{method.description}</p>
                        <p className="text-blue-400 text-sm">{method.value}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Send Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <motion.input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                    placeholder="Enter your name"
                    whileFocus={{ scale: 1.02 }}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <motion.input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                    placeholder="Enter your email"
                    whileFocus={{ scale: 1.02 }}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <motion.textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all resize-none"
                    placeholder="Tell me about your project..."
                    whileFocus={{ scale: 1.02 }}
                    required
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-4 rounded-xl text-white font-semibold transition-all relative overflow-hidden group ${
                    isSubmitting 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-violet-600 hover:scale-105'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <PaperAirplaneIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  
                  {!isSubmitting && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{
                        background: [
                          "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                          "linear-gradient(45deg, #8b5cf6, #3b82f6)"
                        ]
                      }}
                      transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                    />
                  )}
                </motion.button>
                
                {/* Status Messages */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-center ${
                      submitStatus === 'success' 
                        ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                        : 'bg-red-500/20 border border-red-500/30 text-red-300'
                    }`}
                  >
                    {submitStatus === 'success' 
                      ? '✅ Message sent! Your email client should open shortly.'
                      : '❌ Something went wrong. Please try again or email me directly.'
                    }
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
