import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/NavigationContext';
import { workspaceCategories, locations } from '../data/coworkingData';
import { Menu, X, Search, Calendar, MapPin, Layers, ArrowRight, Compass, ShieldAlert, Download, Phone, Instagram, MessageSquare, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';
import { generateBrochurePDF } from '../utils/pdfGenerator';
import { useTheme } from '../context/ThemeContext';

export const Header: React.FC = () => {
  const { currentPath, navigate, searchQuery, setSearchQuery } = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  // Handle scroll events to transition navigation styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on path changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
    setShowSearchModal(false);
  }, [currentPath]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Workspace', path: '/workspace', hasMega: 'workspace' },
    { label: 'Solutions', path: '/solutions', hasMega: 'solutions' },
    { label: 'Locations', path: '/locations', hasMega: 'locations' },
    { label: 'Community', path: '/community' },
    { label: 'About', path: '/about' },
    { label: 'Insights', path: '/insights' },
    { label: 'Contact', path: '/contact' },
  ];

  // Simulated search matches across locations, articles, workspaces
  const getSearchResults = () => {
    if (!localSearch) return [];
    const searchLower = localSearch.toLowerCase();
    
    const matchedLocations = locations
      .filter(l => l.name.toLowerCase().includes(searchLower) || l.neighborhood.toLowerCase().includes(searchLower))
      .map(l => ({
        title: `${l.name} Coworking Space`,
        category: 'Locations',
        path: `/locations/${l.id}`,
        desc: l.address
      }));

    const matchedSpaces = workspaceCategories
      .filter(w => w.name.toLowerCase().includes(searchLower) || w.tagline.toLowerCase().includes(searchLower))
      .map(w => ({
        title: w.name,
        category: 'Workspaces',
        path: '/workspace',
        desc: w.description
      }));

    return [...matchedLocations, ...matchedSpaces].slice(0, 5);
  };

  const searchResults = getSearchResults();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen || activeMegaMenu
            ? 'bg-white border-b border-concrete shadow-sm text-charcoal'
            : 'bg-transparent text-white'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Logo size={40} light={!(isScrolled || mobileMenuOpen || activeMegaMenu)} />
            <span className="font-display font-semibold tracking-[0.2em] text-lg uppercase">
              Second Desk
            </span>
          </div>

          {/* Desktop Navigation Link Items */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <div
                  key={link.label}
                  className="relative py-2"
                  onMouseEnter={() => link.hasMega ? setActiveMegaMenu(link.hasMega) : setActiveMegaMenu(null)}
                >
                  <button
                    onClick={() => navigate(link.path)}
                    className={`font-sans text-sm font-medium tracking-wide flex items-center gap-1 transition-colors duration-200 cursor-pointer ${
                      isActive 
                        ? 'text-sand font-semibold' 
                        : isScrolled || activeMegaMenu 
                          ? 'text-charcoal/80 hover:text-charcoal' 
                          : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                  {/* Underline Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-sand"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop Call To Actions & Tools */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Theme Switcher Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 transition-colors duration-200 cursor-pointer ${
                isScrolled || activeMegaMenu ? 'text-charcoal hover:text-sand' : 'text-white hover:text-sand'
              }`}
              aria-label="Toggle theme mode"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-sand" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => setShowSearchModal(true)}
              className={`p-2 transition-colors duration-200 cursor-pointer ${
                isScrolled || activeMegaMenu ? 'text-charcoal hover:text-sand' : 'text-white hover:text-sand'
              }`}
              aria-label="Search Second Desk"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => navigate('/workspace')}
              className={`font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                isScrolled || activeMegaMenu
                  ? 'text-charcoal/80 hover:text-charcoal'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Get Started
            </button>

            {/* Primary CTA */}
            <button
              onClick={() => navigate('/book-tour')}
              className={`font-sans text-xs font-semibold uppercase tracking-widest px-6 py-3 border transition-all duration-300 cursor-pointer ${
                isScrolled || activeMegaMenu
                  ? 'bg-charcoal text-white hover:bg-sand hover:text-charcoal border-charcoal hover:border-sand'
                  : 'bg-white text-charcoal hover:bg-sand hover:border-sand border-white'
              }`}
            >
              Book a Tour
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center space-x-4 lg:hidden">
            {/* Theme Switcher Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 transition-colors duration-200 cursor-pointer ${
                isScrolled || mobileMenuOpen ? 'text-charcoal hover:text-sand' : 'text-white hover:text-sand'
              }`}
              aria-label="Toggle theme mode"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-sand" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setShowSearchModal(true)}
              className={`p-2 transition-colors duration-200 cursor-pointer ${
                isScrolled || mobileMenuOpen ? 'text-charcoal' : 'text-white'
              }`}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 transition-colors duration-200 cursor-pointer ${
                isScrolled || mobileMenuOpen ? 'text-charcoal' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mega Menu Overlay (Desktop only) */}
        <AnimatePresence>
          {activeMegaMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-20 bg-white border-b border-concrete shadow-xl z-40 hidden lg:block"
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <div className="max-w-[1440px] mx-auto p-12 grid grid-cols-4 gap-8">
                {activeMegaMenu === 'workspace' && (
                  <>
                    <div className="col-span-1 border-r border-concrete pr-8">
                      <span className="text-xs font-semibold tracking-widest uppercase text-sand block mb-2">Workspace</span>
                      <h3 className="font-display text-2xl font-semibold text-charcoal leading-tight mb-4">Find Your Ideal Setting</h3>
                      <p className="font-sans text-sm text-charcoal/60 mb-6">Explore flexible shared desks, premium team offices, and tech-ready meeting spaces crafted with architectural excellence.</p>
                      <button 
                        onClick={() => { navigate('/workspace'); setActiveMegaMenu(null); }}
                        className="text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-sand inline-flex items-center gap-2 group cursor-pointer"
                      >
                        All Workspace Categories <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </button>
                    </div>
                    <div className="col-span-3 grid grid-cols-3 gap-6">
                      {workspaceCategories.slice(0, 3).map((space) => (
                        <div 
                          key={space.id} 
                          onClick={() => { navigate('/workspace'); setActiveMegaMenu(null); }}
                          className="group cursor-pointer hover-zoom-container"
                        >
                          <div className="aspect-video relative mb-3 bg-concrete overflow-hidden">
                            <img 
                              src={space.image} 
                              alt={space.name} 
                              className="w-full h-full object-cover hover-zoom-image"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-2 left-2 bg-charcoal text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-1">
                              {space.startingPrice}
                            </div>
                          </div>
                          <h4 className="font-display font-medium text-charcoal text-base group-hover:text-sand transition-colors duration-200">{space.name}</h4>
                          <p className="font-sans text-xs text-charcoal/60 line-clamp-2 mt-1">{space.description}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {activeMegaMenu === 'solutions' && (
                  <>
                    <div className="col-span-1 border-r border-concrete pr-8">
                      <span className="text-xs font-semibold tracking-widest uppercase text-sand block mb-2">Solutions</span>
                      <h3 className="font-display text-2xl font-semibold text-charcoal leading-tight mb-4">Tailored Workspace Strategies</h3>
                      <p className="font-sans text-sm text-charcoal/60 mb-6">Discover space strategies calibrated perfectly for independent creators, scaling startups, agencies, and regional corporate hubs.</p>
                      <button 
                        onClick={() => { navigate('/solutions'); setActiveMegaMenu(null); }}
                        className="text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-sand inline-flex items-center gap-2 group cursor-pointer"
                      >
                        View All Solutions <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </button>
                    </div>
                    <div className="col-span-3 grid grid-cols-3 gap-6">
                      <div 
                        onClick={() => { navigate('/solutions'); setActiveMegaMenu(null); }}
                        className="p-6 border border-concrete hover:border-sand transition-all duration-300 cursor-pointer"
                      >
                        <Compass className="w-6 h-6 text-sand mb-4" />
                        <h4 className="font-display font-medium text-charcoal text-base mb-2">Freelancers & Solopreneurs</h4>
                        <p className="font-sans text-xs text-charcoal/60">Shatter the isolation of working from home. Tap into robust fiber internet, artisanal coffees, and dynamic networking events.</p>
                      </div>
                      <div 
                        onClick={() => { navigate('/solutions'); setActiveMegaMenu(null); }}
                        className="p-6 border border-concrete hover:border-sand transition-all duration-300 cursor-pointer"
                      >
                        <Layers className="w-6 h-6 text-sand mb-4" />
                        <h4 className="font-display font-medium text-charcoal text-base mb-2">Startups & Hybrid Teams</h4>
                        <p className="font-sans text-xs text-charcoal/60">Scale your desks seamlessly up or down. Keep your capital agile and bypass complex long-term commercial lease lines.</p>
                      </div>
                      <div 
                        onClick={() => { navigate('/solutions'); setActiveMegaMenu(null); }}
                        className="p-6 border border-concrete hover:border-sand transition-all duration-300 cursor-pointer"
                      >
                        <Calendar className="w-6 h-6 text-sand mb-4" />
                        <h4 className="font-display font-medium text-charcoal text-base mb-2">Agencies & SMEs</h4>
                        <p className="font-sans text-xs text-charcoal/60">Secure private glass suites, custom branding, executive receptionist greetings, and enterprise power/fiber stability.</p>
                      </div>
                    </div>
                  </>
                )}

                {activeMegaMenu === 'locations' && (
                  <>
                    <div className="col-span-1 border-r border-concrete pr-8">
                      <span className="text-xs font-semibold tracking-widest uppercase text-sand block mb-2">Locations</span>
                      <h3 className="font-display text-2xl font-semibold text-charcoal leading-tight mb-4">Nairobi Hub Network</h3>
                      <p className="font-sans text-sm text-charcoal/60 mb-6">Select your primary premium business node across Nairobi’s most prestigious central commercial neighborhoods.</p>
                      <button 
                        onClick={() => { navigate('/locations'); setActiveMegaMenu(null); }}
                        className="text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-sand inline-flex items-center gap-2 group cursor-pointer"
                      >
                        Browse Interactive Map <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </button>
                    </div>
                    <div className="col-span-3 grid grid-cols-3 gap-6">
                      {locations.slice(0, 3).map((loc) => (
                        <div 
                          key={loc.id} 
                          onClick={() => { navigate(`/locations/${loc.id}`); setActiveMegaMenu(null); }}
                          className="group cursor-pointer hover-zoom-container"
                        >
                          <div className="aspect-video relative mb-3 bg-concrete overflow-hidden">
                            <img 
                              src={loc.image} 
                              alt={loc.name} 
                              className="w-full h-full object-cover hover-zoom-image"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute bottom-2 left-2 bg-white/95 text-charcoal text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 backdrop-blur-xs flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-sand" /> {loc.neighborhood.split(',')[1] || loc.name}
                            </div>
                          </div>
                          <h4 className="font-display font-medium text-charcoal text-base group-hover:text-sand transition-colors duration-200">{loc.name}</h4>
                          <p className="font-sans text-xs text-charcoal/60 line-clamp-1 mt-1">{loc.address}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Side Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-charcoal/40 backdrop-blur-md z-50 lg:hidden"
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-[360px] bg-white h-screen shadow-2xl z-50 overflow-hidden flex flex-col border-l border-concrete"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-concrete flex items-center justify-between">
                <div 
                  onClick={() => {
                    navigate('/');
                    setMobileMenuOpen(false);
                  }} 
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Logo size={36} light={false} />
                  <span className="font-display font-semibold tracking-[0.15em] text-base uppercase text-charcoal">
                    Second Desk
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleTheme}
                    className="p-1.5 bg-concrete/40 hover:bg-concrete text-charcoal hover:text-sand rounded-full transition-colors cursor-pointer flex items-center justify-center"
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? <Sun className="w-4 h-4 text-sand" /> : <Moon className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 bg-concrete/40 hover:bg-concrete text-charcoal hover:text-sand rounded-full transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Quick Search Trigger */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowSearchModal(true);
                    }}
                    className="w-full flex items-center justify-between px-4 py-2.5 bg-concrete/30 text-charcoal/60 rounded-sm font-sans text-xs hover:bg-concrete/50 hover:text-charcoal transition-all text-left"
                  >
                    <span className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-charcoal/40" />
                      Search workspaces or articles...
                    </span>
                    <span className="font-mono text-[9px] bg-charcoal/5 px-1.5 py-0.5">SEARCH</span>
                  </button>

                  {/* Navigation Links */}
                  <nav className="flex flex-col space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal/40 font-bold block mb-2">Navigation Menu</span>
                    {navLinks.map((link) => {
                      const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
                      return (
                        <button
                          key={link.label}
                          onClick={() => {
                            navigate(link.path);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full text-left font-sans text-sm font-medium tracking-wide py-2.5 px-3 flex items-center justify-between rounded-xs transition-all ${
                            isActive 
                              ? 'bg-sand/10 text-sand font-bold pl-4' 
                              : 'text-charcoal hover:bg-concrete/20 hover:pl-4'
                          }`}
                        >
                          <span>{link.label}</span>
                          {isActive && <div className="w-1.5 h-1.5 bg-sand rounded-full" />}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="space-y-6 border-t border-concrete/60 pt-6">
                  {/* Premium CTAs */}
                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={() => {
                        navigate('/book-tour');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-charcoal text-white font-sans text-xs font-bold uppercase tracking-widest py-3.5 text-center hover:bg-sand hover:text-charcoal transition-all cursor-pointer shadow-xs"
                    >
                      Book a Tour
                    </button>
                    
                    <button
                      onClick={() => {
                        generateBrochurePDF();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full border border-charcoal/20 hover:border-charcoal text-charcoal font-sans text-xs font-bold uppercase tracking-widest py-3.5 flex items-center justify-center gap-2 transition-all cursor-pointer bg-white"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Brochure
                    </button>
                  </div>

                  {/* Contact Info & Socials */}
                  <div className="space-y-3 bg-concrete/20 p-4 rounded-sm">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal/40 font-bold block">Contact Desk</span>
                    <a 
                      href="https://wa.me/254724454757" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-2 text-xs font-sans text-charcoal/80 hover:text-charcoal transition-colors font-medium"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-sand" />
                      <span>WhatsApp: +254 724 454757</span>
                    </a>
                  </div>

                  {/* Developer Signature */}
                  <div className="text-center pt-2">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-charcoal/30">
                      Developed by <span className="font-bold text-charcoal/50">KKDES</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Full-screen Immersive Search Modal */}
      <AnimatePresence>
        {showSearchModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/95 z-50 flex flex-col p-6 lg:p-24 justify-start backdrop-blur-md"
          >
            {/* Search Header */}
            <div className="flex items-center justify-between w-full max-w-4xl mx-auto mb-12">
              <span className="font-display text-white/50 text-xs font-bold uppercase tracking-widest">Global Search</span>
              <button
                onClick={() => {
                  setShowSearchModal(false);
                  setLocalSearch('');
                }}
                className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-all rounded-full cursor-pointer"
                aria-label="Close Search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input Container */}
            <div className="w-full max-w-4xl mx-auto relative mb-8">
              <input
                autoFocus
                type="text"
                placeholder="Search locations, private offices, hot desks, articles..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 focus:border-sand text-white text-xl lg:text-3xl font-display font-light py-4 pr-12 focus:outline-hidden transition-colors"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40" />
            </div>

            {/* Results Container */}
            <div className="w-full max-w-4xl mx-auto overflow-y-auto max-h-[60vh]">
              {localSearch && searchResults.length > 0 ? (
                <div className="space-y-6">
                  <h4 className="text-white/40 font-sans text-xs font-bold uppercase tracking-widest">Matched Results</h4>
                  <div className="divide-y divide-white/10">
                    {searchResults.map((result, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          navigate(result.path);
                          setShowSearchModal(false);
                          setLocalSearch('');
                        }}
                        className="py-4 flex items-start justify-between group cursor-pointer hover:bg-white/5 px-4 rounded-lg transition-colors"
                      >
                        <div>
                          <span className="text-sand font-mono text-[10px] uppercase tracking-wider block mb-1">{result.category}</span>
                          <h5 className="text-white text-lg font-display font-medium group-hover:text-sand transition-colors">{result.title}</h5>
                          <p className="text-white/60 text-xs font-sans line-clamp-1 mt-1">{result.desc}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-sand group-hover:translate-x-1.5 transition-all self-center" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : localSearch ? (
                <div className="text-center py-12">
                  <p className="text-white/50 font-sans">No matching workspaces or locations found for "{localSearch}"</p>
                  <p className="text-sand/80 text-xs mt-2 font-sans">Try searching for "Westlands", "Private", "Desk", or "Meeting".</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/70">
                  <div>
                    <h4 className="text-white/40 font-sans text-xs font-bold uppercase tracking-widest mb-4">Popular Queries</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Westlands', 'Private Offices', 'Hot Desks', 'Karen', 'Meeting Rooms', 'Kilimani'].map((term) => (
                        <button
                          key={term}
                          onClick={() => setLocalSearch(term)}
                          className="bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 rounded-full px-4 py-1.5 text-xs font-sans transition-all cursor-pointer"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white/40 font-sans text-xs font-bold uppercase tracking-widest mb-4">Second Desk Concept</h4>
                    <p className="font-sans text-xs text-white/50 leading-relaxed">
                      Enter any keyword to locate active workspaces, corporate suites, boardrooms, community calendar events, or blog articles on the platform. Click on a result to navigate instantly.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Header;
