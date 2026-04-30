"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import HeroInfo from "@/utility/hero.json";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 100], [0, -10]);
  const headerOpacity = useTransform(scrollY, [0, 50, 100], [1, 0.9, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", href: "/", icon: "🏠" },
    { name: "About", href: "#about", icon: "👨‍💻" },
    { name: "Experience", href: "#experience", icon: "💼" },
    { name: "Projects", href: "#project", icon: "🚀" },
    { name: "Skills", href: "#skills", icon: "⚡" },
    { name: "Contact", href: "#contact", icon: "📧" },
  ];

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/20 backdrop-blur-xl border-b border-white/10 py-3"
          : "bg-transparent py-6"
      }`}
      style={{ y: headerY, opacity: headerOpacity }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <motion.div
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              {/* Avatar */}
              <motion.div
                className="relative"
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 p-0.5">
                  <motion.img
                    src={HeroInfo.heroImage}
                    alt={HeroInfo.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <motion.div
                  className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/50 to-violet-500/50 blur-sm -z-10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
              
              {/* Name and Title */}
              <div className="hidden sm:block">
                <motion.h1 
                  className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-violet-100 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {HeroInfo.name}
                </motion.h1>
                <motion.p 
                  className="text-xs text-gray-400 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {HeroInfo.title}
                </motion.p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  href={item.href}
                  className="group relative px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white/5"
                >
                  <span className="flex items-center space-x-2 text-gray-300 group-hover:text-white transition-colors">
                    <span className="text-sm">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </span>
                  
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.05 }}
                  />
                  
                  {/* Active indicator */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 group-hover:w-full group-hover:left-0 transition-all duration-300"
                  />
                </Link>
              </motion.div>
            ))}
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="#contact"
                className="ml-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl text-white font-semibold hover:scale-105 transition-transform relative overflow-hidden group"
              >
                <span className="relative z-10">Hire Me</span>
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
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="lg:hidden p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6 text-white" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-white" />
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`lg:hidden absolute top-full left-0 right-0 mt-2 mx-4 overflow-hidden ${
            mobileMenuOpen ? "max-h-96" : "max-h-0"
          }`}
          initial={false}
          animate={{
            height: mobileMenuOpen ? "auto" : 0,
            opacity: mobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="px-4 py-6 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: mobileMenuOpen ? 1 : 0, 
                    x: mobileMenuOpen ? 0 : -20 
                  }}
                  transition={{ delay: mobileMenuOpen ? 0.1 * index : 0 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: mobileMenuOpen ? 1 : 0, 
                  y: mobileMenuOpen ? 0 : 20 
                }}
                transition={{ delay: mobileMenuOpen ? 0.4 : 0 }}
                className="pt-4 border-t border-white/10"
              >
                <Link
                  href="#contact"
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>💼</span>
                  <span>Hire Me</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}
