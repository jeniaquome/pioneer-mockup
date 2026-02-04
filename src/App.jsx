import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  ArrowRight,
  MapPin,
  Home,
  BookOpen,
  Users,
  CheckCircle2,
  Globe,
  Play,
  Sparkles,
  Camera,
  Menu,
  X
} from 'lucide-react';

// Pittsburgh photos from public folder
const pittsburghPhotos = [
  { src: '/Copy of downtownfrombridge-unsplash.jpg', title: 'Downtown from the Bridge', location: 'Point State Park' },
  { src: '/Copy of AdobeStock_436357547yellowbridgewithwhitesky.jpeg', title: 'Iconic Yellow Bridge', location: 'Roberto Clemente Bridge' },
  { src: '/Copy of jason-pischke-YfoxivJxNT4-yellowbridgeatnight.jpg', title: 'City Lights', location: 'North Shore' },
  { src: '/Copy of yosselin-artavia-RKH2ws90pMI-unsplashriversunsetpittsburghdowntownviewacrosswater.jpg', title: 'Golden Hour', location: 'Three Rivers' },
  { src: '/Copy of zhen-yao-is1I1XTI4NU-unsplashcitybluewithlightslitupatnightbridgescrossingriver.jpg', title: 'Bridges at Night', location: 'Allegheny River' },
  { src: '/Copy of AdobeStock_371672182_yellow_bridge.jpeg', title: 'Steel City Pride', location: 'Andy Warhol Bridge' },
  { src: '/Copy of jocelyn-allen-AgpI111Z4Ys-unsplashPGAplacewithyellowbridgecuttinginfront.jpg', title: 'PPG Place', location: 'Downtown' },
  { src: '/Copy of willie-shaw-64iuIOektb4-unsplashyellowbridgeroadviewwithsunshiningthrough.jpg', title: 'Morning Light', location: 'Fort Duquesne Bridge' },
  { src: '/Copy of AdobeStock_392745144PPGplaceglass_building.jpeg', title: 'Glass Castle', location: 'PPG Place' },
  { src: '/Copy of jimmy-woo-l4pVJ4zzwt0-unsplashaspinwallpittsburghneighborhoodhillview.jpg', title: 'Neighborhood Views', location: 'Aspinwall' },
  { src: '/Copy of nathan-kelly-U3eEA6puoA4-unsplashschenleyparkbridgepillarsforestunderrustygreenbridge.jpg', title: 'Hidden Gems', location: 'Schenley Park' },
  { src: '/Copy of jocelyn-allen-0Orb6gDDn4g-unsplashriverwithskyreflectedonwater.jpg', title: 'Reflections', location: 'Ohio River' },
];

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="antialiased bg-white text-[#1A1A1A] font-sans selection:bg-[#FFB81C] selection:text-[#003366] overflow-x-hidden">
      {/* Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[150] opacity-[0.015] mix-blend-overlay grain-texture" />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] px-8 py-5 flex justify-between items-center transition-all duration-700 ease-out ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-[#003366]/5 py-4' : 'bg-transparent'}`}>
        <a href="https://www.pittsburghpioneer.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 cursor-pointer group">
          <img
            src="https://www.pittsburghpioneer.com/branding/assets/logo-0.svg"
            alt="Pittsburgh Pioneer Logo"
            className={`h-10 w-auto transition-all duration-500 group-hover:scale-105 ${scrolled ? '' : 'brightness-0 invert drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]'}`}
          />
        </a>

        <div className={`hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.25em] ${scrolled ? 'text-[#003366]' : 'text-white drop-shadow-lg'}`}>
          <a href="#neighborhoods" className="relative hover:text-[#FFB81C] transition-colors duration-300 group">
            Neighborhoods
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FFB81C] group-hover:w-full transition-all duration-500" />
          </a>
          <a href="#gallery" className="relative hover:text-[#FFB81C] transition-colors duration-300 group">
            Gallery
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FFB81C] group-hover:w-full transition-all duration-500" />
          </a>
          <a href="https://www.pittsburghpioneer.com/resources" target="_blank" rel="noopener noreferrer" className="relative hover:text-[#FFB81C] transition-colors duration-300 group">
            Resources
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FFB81C] group-hover:w-full transition-all duration-500" />
          </a>
          <a href="https://www.pittsburghpioneer.com/about" target="_blank" rel="noopener noreferrer" className="relative hover:text-[#FFB81C] transition-colors duration-300 group">
            The Pioneer Story
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FFB81C] group-hover:w-full transition-all duration-500" />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://www.pittsburghpioneer.com/resources" target="_blank" rel="noopener noreferrer" className={`hidden md:flex relative overflow-hidden px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 transform hover:scale-110 hover:shadow-2xl ${scrolled ? 'bg-[#003366] text-white shadow-lg shadow-[#003366]/20' : 'bg-white text-[#003366] shadow-2xl'} group`}>
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              Get Your Guide
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFB81C] to-[#FF9500] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-all duration-300 ${scrolled ? 'text-[#003366] hover:bg-[#003366]/10' : 'text-white hover:bg-white/10'}`}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[99] bg-[#003366] transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 text-white">
          <a href="#neighborhoods" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.2em] hover:text-[#FFB81C] transition-colors duration-300">
            Neighborhoods
          </a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.2em] hover:text-[#FFB81C] transition-colors duration-300">
            Gallery
          </a>
          <a href="https://www.pittsburghpioneer.com/resources" target="_blank" rel="noopener noreferrer" className="text-2xl font-black uppercase tracking-[0.2em] hover:text-[#FFB81C] transition-colors duration-300">
            Resources
          </a>
          <a href="https://www.pittsburghpioneer.com/about" target="_blank" rel="noopener noreferrer" className="text-2xl font-black uppercase tracking-[0.2em] hover:text-[#FFB81C] transition-colors duration-300">
            The Pioneer Story
          </a>
          <a href="https://www.pittsburghpioneer.com/resources" target="_blank" rel="noopener noreferrer" className="mt-8 px-10 py-4 bg-[#FFB81C] text-[#003366] rounded-full text-sm font-black uppercase tracking-[0.2em] hover:shadow-[0_0_40px_rgba(255,184,28,0.5)] transition-all duration-300">
            Get Your Guide
          </a>
        </div>
      </div>

      {/* Cinematic Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Mesh Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-radial from-[#003366] via-[#002244] to-black opacity-40 z-[5]" />
          <div
            className="absolute inset-0 opacity-30 z-[6] transition-transform duration-1000"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, #FFB81C 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* Immersive Video/Image Background */}
        <div className="absolute inset-0 z-0 scale-110 animate-slow-zoom">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#003366]/50 to-white z-10" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20 z-[8]" />
          <img
            src="/Copy of yosselin-artavia-RKH2ws90pMI-unsplashriversunsetpittsburghdowntownviewacrosswater.jpg"
            alt="Pittsburgh Three Rivers Sunrise"
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 z-[15] pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-20 text-center max-w-6xl px-6 space-y-12">
          {/* Decorative Top Element */}
          <div className="flex justify-center mb-8 animate-slide-down">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
              <div className="w-2 h-2 bg-[#FFB81C] rounded-full animate-pulse-slow" />
              <span className="text-[9px] uppercase tracking-[0.3em] font-black text-white/80">Welcome to the Steel City</span>
            </div>
          </div>

          <div className="space-y-6 animate-slide-up">
            <h1 className="text-white text-7xl md:text-[8.5rem] font-serif font-black leading-[0.85] tracking-tighter drop-shadow-2xl">
              A New Chapter <br />
              <span className="italic font-light bg-gradient-to-r from-white via-[#FFB81C] to-white bg-clip-text text-transparent animate-shimmer">in the Steel City.</span>
            </h1>
            {/* Decorative Line */}
            <div className="flex justify-center items-center gap-4 animate-fade-in delay-300">
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#FFB81C] to-transparent" />
              <div className="w-2 h-2 bg-[#FFB81C] rounded-full rotate-45" />
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#FFB81C] to-transparent" />
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-10 animate-fade-in delay-500">
            <p className="text-2xl md:text-3xl text-white/95 font-light leading-relaxed tracking-wide drop-shadow-lg">
              Moving to Pittsburgh? Don't spend hours searching dozens of sites.
              <span className="font-black text-[#FFB81C] drop-shadow-[0_0_20px_rgba(255,184,28,0.5)]"> Pittsburgh Pioneer</span> is your personal, free guide to settling in quickly and warmly.
            </p>

            <div className="flex flex-col md:flex-row gap-5 justify-center animate-fade-in delay-700">
              <a href="https://www.pittsburghpioneer.com/resources" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden bg-gradient-to-r from-[#FFB81C] via-[#FF9500] to-[#FFB81C] text-[#003366] px-12 py-6 rounded-full text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:shadow-[0_0_60px_rgba(255,184,28,0.6)] transition-all duration-500 hover:scale-105 bg-[length:200%_100%] hover:bg-[position:100%_0]">
                <span className="relative z-10">Begin Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500 relative z-10" />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>
              <a href="#neighborhoods" className="group px-12 py-6 rounded-full text-sm font-black uppercase tracking-[0.2em] text-white border-2 border-white/30 backdrop-blur-xl hover:bg-white/20 hover:border-white/60 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  Explore The Map
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </a>
            </div>
          </div>
        </div>

        {/* Enhanced Floating Stat/Mission Snippet */}
        <div className="absolute bottom-16 left-16 hidden lg:block z-20 animate-slide-right">
          <div className="flex items-center gap-6 text-white/70 group cursor-pointer">
            <div className="w-16 h-[2px] bg-gradient-to-r from-[#FFB81C] to-transparent group-hover:w-24 transition-all duration-700" />
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-[0.35em] font-black text-white/90 block">100% Free • Personalized</span>
              <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-white/60">Community Backed</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a href="#mission" className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce-slow cursor-pointer group">
          <div className="flex flex-col items-center gap-3 text-white/50 group-hover:text-white/80 transition-colors duration-300">
            <span className="text-[8px] uppercase tracking-[0.3em] font-bold">Scroll to Explore</span>
            <div className="w-[2px] h-12 bg-gradient-to-b from-white/50 to-transparent group-hover:from-[#FFB81C] transition-all duration-300" />
          </div>
        </a>
      </section>

      {/* The Mission Statement Section - Editorial Layout */}
      <section id="mission" className="py-40 px-6 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#FFB81C]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#003366]/5 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[4rem] shadow-[0_40px_100px_rgba(0,51,102,0.25)] group">
             {/* Decorative Corner Elements */}
             <div className="absolute top-8 left-8 w-12 h-12 border-l-4 border-t-4 border-[#FFB81C] opacity-0 group-hover:opacity-100 transition-all duration-700 z-20" />
             <div className="absolute bottom-8 right-8 w-12 h-12 border-r-4 border-b-4 border-[#FFB81C] opacity-0 group-hover:opacity-100 transition-all duration-700 z-20" />

             <img
               src="/Copy of AdobeStock_392745144PPGplaceglass_building.jpeg"
               alt="PPG Place Pittsburgh"
               className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 group-hover:rotate-1"
             />
             <div className="absolute inset-0 bg-gradient-to-br from-[#003366]/30 via-transparent to-[#FFB81C]/20 group-hover:opacity-0 transition-opacity duration-700" />

             {/* Image Caption */}
             <div className="absolute bottom-12 left-12 text-white transform translate-y-0 group-hover:translate-y-[-8px] transition-transform duration-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-[2px] bg-[#FFB81C]" />
                  <span className="text-[9px] uppercase tracking-[0.3em] font-black">PPG Place • Downtown</span>
                </div>
                <h4 className="text-3xl font-serif italic drop-shadow-lg">Where glass meets steel.</h4>
             </div>
          </div>

          <div className="space-y-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#003366]/10 to-[#003366]/5 rounded-full text-[#003366] text-[10px] font-black uppercase tracking-[0.25em] border border-[#003366]/10">
              <div className="w-2 h-2 bg-[#FFB81C] rounded-full animate-pulse-slow" />
              The Mission
            </div>

            {/* Main Heading */}
            <h2 className="text-6xl md:text-8xl font-serif font-black text-[#003366] leading-[0.95] tracking-tight">
              The most complete, time-saving way to <span className="relative inline-block text-[#FFB81C]">
                start your life
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M0 6 Q150 0, 300 6" stroke="#FFB81C" strokeWidth="2" fill="none" opacity="0.3"/>
                </svg>
              </span> here.
            </h2>

            {/* Description */}
            <p className="text-xl text-[#1A1A1A]/70 leading-relaxed max-w-xl font-light">
              From housing and schools to language, faith, and community life—we've consolidated everything into a single, seamless roadmap. It's not just a directory; it's a <span className="font-bold text-[#003366]">welcoming hand</span> into your new community.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-10 pt-8">
              <div className="group cursor-pointer">
                <div className="relative inline-block">
                  <span className="text-6xl font-serif font-black text-[#003366] group-hover:text-[#FFB81C] transition-colors duration-500">500+</span>
                  <div className="absolute -right-2 -top-2 w-4 h-4 bg-[#FFB81C] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1A1A1A]/40 mt-3 group-hover:text-[#003366]/60 transition-colors duration-500">Vetted Resources</p>
                <div className="w-0 h-[2px] bg-[#FFB81C] group-hover:w-full transition-all duration-500 mt-2" />
              </div>
              <div className="group cursor-pointer">
                <div className="relative inline-block">
                  <span className="text-6xl font-serif font-black text-[#003366] group-hover:text-[#FFB81C] transition-colors duration-500">15m</span>
                  <div className="absolute -right-2 -top-2 w-4 h-4 bg-[#FFB81C] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1A1A1A]/40 mt-3 group-hover:text-[#003366]/60 transition-colors duration-500">To get started</p>
                <div className="w-0 h-[2px] bg-[#FFB81C] group-hover:w-full transition-all duration-500 mt-2" />
              </div>
            </div>

            {/* Mission CTA */}
            <div className="pt-12">
              <a
                href="https://www.pittsburghpioneer.com/resources"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 px-10 py-5 bg-[#003366] text-white rounded-full text-sm font-black uppercase tracking-[0.2em] hover:bg-[#FFB81C] hover:text-[#003366] hover:shadow-[0_20px_50px_rgba(255,184,28,0.4)] transition-all duration-500"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Feature Grid (Dribbble Influence) */}
      <section id="neighborhoods" className="py-40 bg-gradient-to-b from-[#FAFBFC] via-[#F5F7FA] to-white relative overflow-hidden">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `repeating-linear-gradient(0deg, #003366 0px, #003366 1px, transparent 1px, transparent 60px),
                           repeating-linear-gradient(90deg, #003366 0px, #003366 1px, transparent 1px, transparent 60px)`
        }} />

        {/* Floating Decorative Elements */}
        <div className="absolute top-40 left-20 w-72 h-72 bg-gradient-to-br from-[#FFB81C]/10 to-transparent rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-br from-[#003366]/10 to-transparent rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
           {/* Header */}
           <div className="text-center mb-24 space-y-6">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-[#003366]/10 mb-4">
                <Sparkles className="w-4 h-4 text-[#FFB81C]" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-black text-[#003366]">Six Essential Modules</span>
              </div>
              <h3 className="text-5xl md:text-7xl font-serif font-black text-[#003366] tracking-tight">Your Personal Guide</h3>
              <p className="text-lg text-[#1A1A1A]/50 max-w-2xl mx-auto font-light leading-relaxed">Explore the modules that make your transition seamless, from finding a home to becoming part of the community.</p>
           </div>

           {/* Feature Cards Grid */}
           <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Living Essentials', icon: <Home />, desc: 'Housing, utilities, healthcare, and everything you need to settle in.', color: 'from-blue-500/10 to-blue-600/5', link: 'https://www.pittsburghpioneer.com/resources?lang=en#housing' },
                { title: 'Community And Belonging', icon: <Users />, desc: 'Find your faith, your hobby, and your local neighborhood council.', color: 'from-purple-500/10 to-purple-600/5', link: 'https://www.pittsburghpioneer.com/resources?lang=en#community' },
                { title: 'Education: Adult And Youth', icon: <BookOpen />, desc: 'Navigating the Pittsburgh school system with ease.', color: 'from-green-500/10 to-green-600/5', link: 'https://www.pittsburghpioneer.com/resources?lang=en#education' },
                { title: 'ESL And Immigrant Support', icon: <Globe />, desc: 'Connecting you with local translators and ESL programs.', color: 'from-orange-500/10 to-orange-600/5', link: 'https://www.pittsburghpioneer.com/resources?lang=en#language' },
                { title: 'Jobs And Business Resources', icon: <CheckCircle2 />, desc: 'Career services, job boards, and business resources.', color: 'from-pink-500/10 to-pink-600/5', link: 'https://www.pittsburghpioneer.com/resources?lang=en#settling-in' },
                { title: 'Culture, Arts And Fun', icon: <MapPin />, desc: 'Museums, events, parks, and entertainment in the Steel City.', color: 'from-teal-500/10 to-teal-600/5', link: 'https://www.pittsburghpioneer.com/resources?lang=en#neighborhoods' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white p-12 rounded-[3rem] hover:shadow-[0_30px_80px_rgba(0,51,102,0.15)] transition-all duration-700 hover:-translate-y-3 border border-[#003366]/5 overflow-hidden cursor-pointer"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                   {/* Animated Background Gradient */}
                   <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                   {/* Decorative Corner */}
                   <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#FFB81C]/0 group-hover:border-[#FFB81C]/50 transition-all duration-700 rounded-tr-3xl" />

                   {/* Icon */}
                   <div className="relative w-16 h-16 bg-gradient-to-br from-[#003366]/10 to-[#003366]/5 rounded-2xl flex items-center justify-center text-[#003366] mb-10 group-hover:bg-gradient-to-br group-hover:from-[#FFB81C] group-hover:to-[#FF9500] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-lg shadow-[#003366]/0 group-hover:shadow-[#FFB81C]/30">
                     {item.icon}
                   </div>

                   {/* Content */}
                   <h4 className="relative text-3xl font-serif font-black text-[#003366] mb-5 group-hover:text-[#FFB81C] transition-colors duration-500">{item.title}</h4>
                   <p className="relative text-[#1A1A1A]/60 leading-relaxed text-base mb-10 group-hover:text-[#1A1A1A]/80 transition-colors duration-500">{item.desc}</p>

                   {/* CTA Button */}
                   <span className="relative flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#003366] group-hover:text-[#FFB81C] group-hover:gap-5 transition-all duration-500">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FFB81C] group-hover:w-full transition-all duration-700" />
                   </span>

                   {/* Number Badge */}
                   <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-[#003366]/5 flex items-center justify-center text-[#003366]/20 font-black text-2xl group-hover:bg-[#FFB81C]/10 group-hover:text-[#FFB81C]/40 transition-all duration-500">
                     {idx + 1}
                   </div>
                </a>
              ))}
           </div>
        </div>
      </section>

      {/* Pittsburgh Photo Showcase */}
      <section id="gallery" className="py-32 bg-[#003366] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #FFB81C 1px, transparent 1px),
                             radial-gradient(circle at 75% 75%, #FFB81C 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
              <Camera className="w-4 h-4 text-[#FFB81C]" />
              <span className="text-[9px] uppercase tracking-[0.3em] font-black text-white/80">Explore the City</span>
            </div>
            <h3 className="text-5xl md:text-7xl font-serif font-black text-white tracking-tight mb-6">
              Discover <span className="text-[#FFB81C]">Pittsburgh</span>
            </h3>
            <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
              From iconic bridges to hidden neighborhoods, experience the beauty of the Steel City
            </p>
          </motion.div>

          {/* Bento Grid Photo Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {/* Large Featured Image */}
            <motion.div
              className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden rounded-3xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={pittsburghPhotos[0].src}
                alt={pittsburghPhotos[0].title}
                className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <motion.div
                className="absolute bottom-6 left-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#FFB81C] mb-1">{pittsburghPhotos[0].location}</p>
                <h4 className="text-2xl font-serif font-bold">{pittsburghPhotos[0].title}</h4>
              </motion.div>
            </motion.div>

            {/* Smaller Grid Images */}
            {pittsburghPhotos.slice(1, 5).map((photo, idx) => (
              <motion.div
                key={idx}
                className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-square"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <p className="text-[8px] uppercase tracking-[0.2em] text-[#FFB81C]">{photo.location}</p>
                  <h4 className="text-sm font-bold">{photo.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Horizontal Scrolling Marquee */}
          <div className="relative overflow-hidden py-8">
            <motion.div
              className="flex gap-6"
              animate={{ x: [0, -1920] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...pittsburghPhotos, ...pittsburghPhotos].map((photo, idx) => (
                <motion.div
                  key={idx}
                  className="relative flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-[8px] uppercase tracking-[0.2em] text-[#FFB81C]">{photo.location}</p>
                    <h4 className="text-sm font-bold">{photo.title}</h4>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-white/60 mb-6 text-lg">Ready to call Pittsburgh home?</p>
            <motion.a
              href="https://www.pittsburghpioneer.com/resources"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#FFB81C] text-[#003366] rounded-full font-black uppercase tracking-[0.2em] text-sm hover:shadow-[0_0_60px_rgba(255,184,28,0.5)] transition-all duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Neighborhoods
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="relative bg-gradient-to-br from-[#002244] via-[#003366] to-[#001a33] py-32 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #FFB81C 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, #FFB81C 0%, transparent 50%)`
          }} />
        </div>

        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #FFB81C 0px, #FFB81C 2px, transparent 2px, transparent 50px),
                           repeating-linear-gradient(-45deg, #FFB81C 0px, #FFB81C 2px, transparent 2px, transparent 50px)`
        }} />

        <div className="max-w-7xl mx-auto px-6 text-center space-y-16 relative z-10">
           {/* Logo */}
           <div className="animate-fade-in">
             <img
                src="https://www.pittsburghpioneer.com/branding/assets/logo-0.svg"
                alt="Logo"
                className="h-14 w-auto mx-auto brightness-0 invert drop-shadow-[0_0_30px_rgba(255,184,28,0.3)]"
             />
           </div>

           {/* Main CTA */}
           <div className="space-y-8 animate-slide-up">
             <h2 className="text-5xl md:text-8xl font-serif font-black italic leading-[1] tracking-tight">
               Ready to become <br />
               <span className="bg-gradient-to-r from-white via-[#FFB81C] to-white bg-clip-text text-transparent">a local?</span>
             </h2>
             <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
               Join thousands of newcomers who found their home in Pittsburgh with our free, comprehensive guide.
             </p>
           </div>

           {/* CTA Button */}
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in delay-300">
             <a href="https://www.pittsburghpioneer.com/resources" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden bg-gradient-to-r from-[#FFB81C] to-[#FF9500] text-[#003366] px-16 py-7 rounded-full text-sm font-black uppercase tracking-[0.25em] hover:shadow-[0_0_80px_rgba(255,184,28,0.6)] transition-all duration-700 hover:scale-110">
               <span className="relative z-10 flex items-center gap-3">
                 Start Your Journey
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
               </span>
               <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
             </a>

             <a href="https://www.pittsburghpioneer.com/about" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-white/80 hover:text-white text-sm font-bold uppercase tracking-[0.2em] transition-colors duration-300">
               <div className="w-12 h-12 rounded-full border-2 border-white/30 group-hover:border-[#FFB81C] flex items-center justify-center group-hover:bg-[#FFB81C]/10 transition-all duration-500">
                 <Play className="w-5 h-5 ml-0.5" />
               </div>
               Watch The Story
             </a>
           </div>

           {/* Trust Indicators */}
           <div className="grid grid-cols-3 gap-12 max-w-3xl mx-auto pt-16 border-t border-white/10">
             <div className="space-y-2">
               <div className="text-4xl font-serif font-black text-[#FFB81C]">10k+</div>
               <div className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/50">Families Helped</div>
             </div>
             <div className="space-y-2">
               <div className="text-4xl font-serif font-black text-[#FFB81C]">90</div>
               <div className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/50">Neighborhoods</div>
             </div>
             <div className="space-y-2">
               <div className="text-4xl font-serif font-black text-[#FFB81C]">100%</div>
               <div className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/50">Free Forever</div>
             </div>
           </div>

           {/* Footer Links */}
           <div className="pt-20 space-y-8">
             <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-12 text-[9px] uppercase tracking-[0.3em] font-bold text-white/40">
                <p>© 2025 Pittsburgh Pioneer • Made with ❤️ in the Steel City</p>
                <div className="flex gap-12 mt-6 md:mt-0">
                   <a href="https://www.pittsburghpioneer.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFB81C] transition-colors duration-300">Terms</a>
                   <a href="https://www.pittsburghpioneer.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFB81C] transition-colors duration-300">Privacy</a>
                   <a href="https://www.pittsburghpioneer.com/about" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFB81C] transition-colors duration-300">Contact</a>
                </div>
             </div>
           </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFB81C] to-transparent opacity-50" />
      </footer>

      {/* Global CSS for custom animations and Fonts */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400..800&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&display=swap');

        body {
          font-family: 'Syne', sans-serif;
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="%23FFB81C" opacity="0.5"/><circle cx="10" cy="10" r="3" fill="%23003366"/></svg>'), auto;
        }
        .font-serif { font-family: 'Crimson Pro', serif; }

        /* Grain Texture */
        .grain-texture {
          background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="3" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 12px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #003366, #FFB81C);
          border-radius: 6px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #FFB81C, #003366);
        }

        /* Animations */
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(80px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slowZoom {
          from { transform: scale(1.0); }
          to { transform: scale(1.2); }
        }
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.2; }
          25% { transform: translate(10px, -20px) rotate(90deg); opacity: 0.4; }
          50% { transform: translate(-10px, -40px) rotate(180deg); opacity: 0.6; }
          75% { transform: translate(15px, -60px) rotate(270deg); opacity: 0.4; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        /* Animation Classes */
        .animate-slide-up {
          animation: slideUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-slide-down {
          animation: slideDown 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-slide-right {
          animation: slideRight 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-fade-in {
          animation: fadeIn 1.8s ease forwards;
          opacity: 0;
        }
        .animate-slow-zoom {
          animation: slowZoom 40s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        /* Delays */
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }

        /* Custom Gradient */
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        /* Smooth Scroll */
        html {
          scroll-behavior: smooth;
        }
      `}} />
    </div>
  );
};

export default App;
