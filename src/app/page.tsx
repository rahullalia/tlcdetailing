"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, MapPin, Clock, Star, ChevronDown, Play, X, Menu, Instagram, ArrowRight } from "lucide-react";
import Image from "next/image";

const PHONE_NUMBER = "(832) 466-1100";
const PHONE_LINK = "tel:+18324661100";
const SMS_LINK = "sms:+18324661100";

// Animated counter hook
function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!startOnView || !isInView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, isInView, startOnView]);

  return { count, ref };
}

// Navigation
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#gallery" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "glass-strong py-3" : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-1">
              <span className="text-2xl md:text-3xl font-black tracking-tight">TLC</span>
              <span className="text-2xl md:text-3xl font-light text-amber-400">.</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <a
                href={PHONE_LINK}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-amber-400 transition-all duration-300 magnetic-btn"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden lg:inline">{PHONE_NUMBER}</span>
                <span className="lg:hidden">Call</span>
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-12">
                <span className="text-2xl font-black">TLC<span className="text-amber-400">.</span></span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-4xl font-bold text-white/80 hover:text-amber-400 transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto space-y-4">
                <a
                  href={PHONE_LINK}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-full bg-amber-400 text-black font-bold text-lg"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
                <a
                  href={SMS_LINK}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-full border border-white/20 text-white font-semibold text-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  Text Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Hero images for slideshow
const heroImages = [
  "/gallery/car.jpeg",
  "/gallery/RR.jpg",
  "/gallery/bmw-convertible.jpg",
  "/gallery/vintage.jpg",
  "/gallery/bmw-suv.jpg",
  "/gallery/RR_wheel.jpg",
  "/gallery/bmw.jpg",
  "/gallery/Bike.jpg",
  "/gallery/vintage-2.jpg",
];

// Hero Section - Cinematic slideshow with Ken Burns effect
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic slideshow background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentSlide]}
              alt="TLC Detailing - Professional Car Detailing"
              fill
              className="object-cover kenburns"
              priority={currentSlide < 2}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

        {/* Vignette overlay */}
        <div className="absolute inset-0 vignette" />
      </div>

      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-[120px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Hero content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-sm text-white/80">Bakersfield&apos;s Premier Mobile Detailing</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.9] tracking-tight mb-6"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 4px 40px rgba(0,0,0,0.5)' }}
        >
          <span className="block text-white">Protection</span>
          <span className="block gradient-text glow-text">Perfected.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-white/90 max-w-xl mx-auto mb-10"
          style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}
        >
          Expert ceramic coating, paint correction, polishing, and headlight restoration.
          We come to you.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={PHONE_LINK}
            className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-amber-400 text-black font-bold text-lg overflow-hidden magnetic-btn shadow-lg shadow-amber-400/30"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Phone className="w-5 h-5" />
              Call {PHONE_NUMBER}
            </span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </a>

          <a
            href={SMS_LINK}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            Text Us
          </a>
        </motion.div>
      </motion.div>

      {/* Slideshow progress dots */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === currentSlide
                ? "bg-amber-400 w-8"
                : "bg-white/30 w-2 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Single stat card component (hooks must be at top level)
function StatCard({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const isRating = suffix === "★";
  const { count, ref } = useCounter(isRating ? 50 : value, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass rounded-2xl md:rounded-3xl p-4 md:p-10 text-center shine"
    >
      <div className="text-2xl sm:text-4xl md:text-6xl font-black gradient-text mb-1 md:mb-2">
        {isRating ? (count / 10).toFixed(1) : count}{suffix}
      </div>
      <div className="text-xs sm:text-sm md:text-base text-white/50 uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}

// Stats Section - Floating cards
function Stats() {
  const stats = [
    { value: 5.0, suffix: "★", label: "Rating" },
    { value: 315, suffix: "+", label: "Reviews" },
    { value: 5, suffix: "+", label: "Years" },
  ];

  return (
    <section className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} index={i} />
          ))}
        </div>

        {/* Brand marquee */}
        <div className="mt-16 overflow-hidden">
          <div className="flex items-center gap-16 marquee whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-16">
                <span className="text-2xl md:text-3xl font-bold text-white/20">CERAMIC COATING</span>
                <span className="text-2xl md:text-3xl font-bold text-white/20">PAINT CORRECTION</span>
                <span className="text-2xl md:text-3xl font-bold text-white/20">POLISHING</span>
                <span className="text-2xl md:text-3xl font-bold text-white/20">HEADLIGHT RESTORATION</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Services Section - Bento grid
function Services() {
  const services = [
    {
      title: "Ceramic Coating",
      description: "Long-lasting ceramic protection that creates an incredible hydrophobic barrier, making your car easier to clean and protected from the elements for years.",
      featured: true,
      tags: ["Hydrophobic", "UV Protection", "Long-Lasting"],
    },
    {
      title: "Paint Correction",
      description: "Multi-stage polishing to eliminate swirls, scratches, water spots, and oxidation. Restore your paint to better than showroom condition.",
      tags: ["Swirl Removal", "Scratch Removal", "Restoration"],
    },
    {
      title: "Polishing & Waxing",
      description: "Professional polishing and wax application for a deep, glossy shine that turns heads.",
      tags: ["Deep Gloss", "Protection", "Show-Ready"],
    },
    {
      title: "Headlight Restoration",
      description: "Restore foggy, yellowed headlights to crystal clear condition. Improve visibility and your car's appearance.",
      tags: ["UV Damage Repair", "Clarity Restored", "Safety"],
    },
  ];

  return (
    <section id="services" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">Services</span>
          <h2 className="text-4xl md:text-6xl font-black mt-4 leading-tight">
            What We<br />
            <span className="gradient-text">Specialize In</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group relative rounded-3xl overflow-hidden ${
                service.featured ? "md:row-span-2" : ""
              }`}
            >
              <div className={`glass-strong p-8 md:p-10 h-full flex flex-col ${
                service.featured ? "min-h-[400px] md:min-h-full" : "min-h-[280px]"
              }`}>
                {/* Service image placeholder */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <h3 className={`font-bold mb-4 ${
                    service.featured ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
                  }`}>
                    {service.title}
                  </h3>

                  <p className="text-white/60 text-lg mb-6 flex-grow">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 border border-amber-400/0 group-hover:border-amber-400/30 rounded-3xl transition-colors duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href={PHONE_LINK}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-amber-400 text-black font-bold text-lg magnetic-btn"
          >
            <Phone className="w-5 h-5" />
            Get a Free Quote
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// Gallery Section - Masonry-style grid
function Gallery() {
  const galleryItems = [
    { title: "Full Detail", category: "Complete Detail", span: "col-span-2 row-span-2", image: "/gallery/car.jpeg" },
    { title: "Rolls Royce", category: "Luxury Detail", span: "", image: "/gallery/RR.jpg" },
    { title: "Wheel Perfection", category: "Wheel Detail", span: "", image: "/gallery/RR_wheel.jpg" },
    { title: "BMW Convertible", category: "Paint Correction", span: "col-span-2", image: "/gallery/bmw-convertible.jpg" },
    { title: "Vintage Beauty", category: "Classic Restoration", span: "", image: "/gallery/vintage.jpg" },
    { title: "BMW SUV", category: "Full Detail", span: "", image: "/gallery/bmw-suv.jpg" },
    { title: "BMW Shine", category: "Ceramic Coating", span: "", image: "/gallery/bmw.jpg" },
    { title: "Bike Detail", category: "Motorcycle", span: "", image: "/gallery/Bike.jpg" },
    { title: "Classic Finish", category: "Vintage", span: "col-span-2", image: "/gallery/vintage-2.jpg" },
  ];

  return (
    <section id="gallery" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6"
        >
          <div>
            <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">Gallery</span>
            <h2 className="text-4xl md:text-6xl font-black mt-4">
              Our Work
            </h2>
          </div>
          <a
            href="https://www.instagram.com/tlc.detailing_661/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/60 hover:text-amber-400 transition-colors"
          >
            <Instagram className="w-5 h-5" />
            <span>Follow @tlc.detailing_661</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer ${item.span}`}
            >
              {/* Real image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-amber-400 text-sm font-medium mb-1">{item.category}</p>
                  <p className="text-white text-xl font-bold">{item.title}</p>
                </div>
              </div>

              {/* Border effect */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-amber-400/30 rounded-2xl md:rounded-3xl transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials - Horizontal scroll on mobile
function Testimonials() {
  const testimonials = [
    {
      text: "I had some really tough hard water spots on my car that just wouldn't come off no matter what I tried. Not only did they get rid of all the water spots, but they also went the extra mile with some additional services to make sure the problem was fully taken care of. My car looks spotless and better than ever!",
      author: "Kristian Parilla",
      rating: 5,
    },
    {
      text: "TLC Detailing will certainly be my first call for any vehicle upkeep & detailing needs from now on. I called Trevor on a Friday afternoon and he was still able to be at my door by 6pm to provide same day service! The work done on my vehicle brought it back to that 'just came home from the dealer' level of cleanliness.",
      author: "Eric Crawford",
      rating: 5,
    },
    {
      text: "They did a great job detailing my car. They buffed out marks left from the drive thru car wash, and they were fast too! Will be calling them again for sure. Prices extremely reasonable as well!",
      author: "Elissa Harsh",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">Testimonials</span>
          <h2 className="text-4xl md:text-6xl font-black mt-4">
            What People Say
          </h2>
        </motion.div>

        {/* Testimonials - horizontal scroll on mobile */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory md:snap-none -mx-5 px-5 md:mx-0 md:px-0">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-strong rounded-3xl p-8 min-w-[85vw] md:min-w-0 snap-center"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <p className="font-semibold text-amber-400">{testimonial.author}</p>
            </motion.div>
          ))}
        </div>

        {/* See all reviews */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="https://www.google.com/search?q=TLC+Detailing+Bakersfield+CA+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/60 hover:text-amber-400 transition-colors"
          >
            Read all 315+ reviews
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// About Section
function About() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden glass">
              {/* Placeholder for team photo */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                <span className="text-zinc-700">Team Photo</span>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-amber-400 text-black p-6 md:p-8 rounded-2xl shadow-2xl"
            >
              <div className="text-4xl md:text-5xl font-black">5+</div>
              <div className="font-medium">Years</div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">About Us</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-8">
              Meet<br />Trevor
            </h2>

            <div className="space-y-6 text-white/70 text-lg">
              <p>
                Founded in 2020, TLC.Detailing was built on a simple principle:
                every vehicle deserves to be cared for with the same passion its owner has.
              </p>
              <p>
                As Bakersfield&apos;s premier mobile detailing service, we bring professional-grade
                equipment and years of expertise directly to your door. No need to drop off
                your car—we come to you.
              </p>
              <p>
                We&apos;re not just detailers—we&apos;re car enthusiasts who treat every
                vehicle as if it were our own. That&apos;s the TLC difference.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              <div className="glass rounded-2xl p-5">
                <div className="text-2xl font-bold text-amber-400 mb-1">Mobile</div>
                <div className="text-sm text-white/50">We Come to You</div>
              </div>
              <div className="glass rounded-2xl p-5">
                <div className="text-2xl font-bold text-amber-400 mb-1">5.0★</div>
                <div className="text-sm text-white/50">Perfect Rating</div>
              </div>
            </div>

            <a
              href={PHONE_LINK}
              className="inline-flex items-center gap-3 mt-10 px-8 py-4 rounded-full bg-white text-black font-bold text-lg magnetic-btn"
            >
              <Phone className="w-5 h-5" />
              Talk to Trevor
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-[2rem] md:rounded-[3rem] p-10 md:p-16 text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
            Ready to<br />
            <span className="gradient-text">Protect Your Ride?</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto mb-10">
            Call or text us today for a free quote. We&apos;ll take care of the rest.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={PHONE_LINK}
              className="relative w-full sm:w-auto group"
            >
              <div className="absolute inset-0 bg-amber-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-amber-400 text-black font-bold text-xl">
                <Phone className="w-6 h-6" />
                {PHONE_NUMBER}
              </div>
            </a>

            <a
              href={SMS_LINK}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-full border-2 border-white/20 text-white font-bold text-xl hover:bg-white/5 transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
              Text Us
            </a>
          </div>
        </motion.div>

        {/* Contact info grid */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <MapPin className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="font-bold text-lg mb-2">Service Area</h3>
            <p className="text-white/60 mb-3">
              Bakersfield, CA<br />
              & Surrounding Areas
            </p>
            <p className="text-amber-400 text-sm font-medium">
              Mobile Service - We Come to You!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-8"
          >
            <Clock className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="font-bold text-lg mb-2">Hours</h3>
            <p className="text-white/60">
              Every Day<br />
              7:00 AM - 7:00 PM
            </p>
            <p className="text-white/40 text-sm mt-2">Same-day service available</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-8"
          >
            <Phone className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="font-bold text-lg mb-2">Contact</h3>
            <a href={PHONE_LINK} className="text-white/60 hover:text-amber-400 transition-colors block mb-1">
              {PHONE_NUMBER}
            </a>
            <a href="https://www.instagram.com/tlc.detailing_661/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-amber-400 transition-colors text-sm">
              @tlc.detailing_661
            </a>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 rounded-2xl md:rounded-3xl overflow-hidden h-[300px] md:h-[400px] glass"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103220.8!2d-119.1!3d35.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ea6b3834c7a747%3A0x7cb44d2cfe537bd8!2sBakersfield%2C%20CA!5e0!3m2!1sen!2sus!4v1704652800000"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="TLC.Detailing Service Area - Bakersfield, CA"
          />
        </motion.div>
      </div>
    </section>
  );
}

// Sticky Mobile CTA - Always visible on mobile
function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/90 backdrop-blur-xl border-t border-white/10 md:hidden"
        >
          <div className="flex gap-3">
            <a
              href={PHONE_LINK}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-amber-400 text-black font-bold"
            >
              <Phone className="w-5 h-5" />
              Call
            </a>
            <a
              href={SMS_LINK}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full border border-white/20 text-white font-semibold"
            >
              <MessageCircle className="w-5 h-5" />
              Text
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-10 pb-28 md:pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-1">
            <span className="text-xl font-black">TLC</span>
            <span className="text-xl font-light text-amber-400">.</span>
            <span className="text-xl font-black">Detailing</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/tlc.detailing_661/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-amber-400 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href={PHONE_LINK} className="text-white/40 hover:text-amber-400 transition-colors">
              <Phone className="w-5 h-5" />
            </a>
            <a href={SMS_LINK} className="text-white/40 hover:text-amber-400 transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>

          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} TLC.Detailing | Bakersfield, CA
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main Component
export default function Home() {
  return (
    <>
      <div className="noise" />
      <Navigation />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Gallery />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
