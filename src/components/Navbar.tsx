import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  MessageSquare,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  Globe,
  Lock,
  Phone,
  ArrowRight,
  FileText,
  Building2,
  Stethoscope,
  Plane,
  HeartHandshake,
  CheckCircle2,
  Check,
  ExternalLink,
  LogIn,
} from 'lucide-react';
import { SupportedLanguage, translations } from '../data/translations';
import { SiteConfig } from '../types';
import { trackEvent } from '../utils/analytics';

interface NavbarProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  siteConfig: SiteConfig;
  onOpenCountryModal: (countrySlug?: string) => void;
  onOpenAdminModal?: () => void;
  leadCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  siteConfig,
  onOpenCountryModal,
  leadCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [treatmentsDropdownOpen, setTreatmentsDropdownOpen] = useState(false);
  const [internationalDropdownOpen, setInternationalDropdownOpen] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'larger'>('normal');
  const [isScrolled, setIsScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const t = translations[currentLang];

  // Scroll listener for sticky header height transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 35);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search suggestions and language dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchFocused(false);
      }
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFontSizeToggle = () => {
    if (fontSizeLevel === 'normal') {
      setFontSizeLevel('large');
      document.documentElement.style.fontSize = '105%';
    } else if (fontSizeLevel === 'large') {
      setFontSizeLevel('larger');
      document.documentElement.style.fontSize = '110%';
    } else {
      setFontSizeLevel('normal');
      document.documentElement.style.fontSize = '100%';
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
    setSearchFocused(false);
    setTreatmentsDropdownOpen(false);
    setInternationalDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
    setSearchFocused(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      scrollToSection('treatments');
      return;
    }

    // Direct routing based on search intent
    if (q.includes('hospital') || q.includes('wanless') || q.includes('gmc') || q.includes('bharati') || q.includes('clinic')) {
      scrollToSection('hospitals');
      const input = document.getElementById('hospital-search') as HTMLInputElement | null;
      if (input) {
        input.value = searchQuery;
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    } else if (q.includes('doctor') || q.includes('dr.') || q.includes('surgeon') || q.includes('specialist')) {
      scrollToSection('doctors');
    } else if (q.includes('visa') || q.includes('travel') || q.includes('stay') || q.includes('flight') || q.includes('hotel')) {
      scrollToSection('travel-stay');
    } else if (q.includes('cost') || q.includes('price') || q.includes('estimate') || q.includes('fee')) {
      scrollToSection('cost-guide');
    } else {
      scrollToSection('treatments');
      const input = document.getElementById('specialty-search') as HTMLInputElement | null;
      if (input) {
        input.value = searchQuery;
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
    setSearchFocused(false);
    setMobileSearchOpen(false);
  };

  const quickSearchSuggestions = [
    { label: 'Cardiology & Heart Surgery', section: 'treatments', query: 'Cardiology' },
    { label: 'Orthopaedics & Joint Replacement', section: 'treatments', query: 'Orthopaedics' },
    { label: 'Oncology & Cancer Care', section: 'treatments', query: 'Oncology' },
    { label: 'Wanless Hospital (Miraj)', section: 'hospitals', query: 'Wanless' },
    { label: 'Government Medical College (GMC)', section: 'hospitals', query: 'GMC' },
    { label: 'Medical Visa & Travel Guidance', section: 'travel-stay', query: 'Visa' },
  ];

  const languages: { code: SupportedLanguage; label: string; name: string }[] = [
    { code: 'en', label: 'English', name: 'English' },
    { code: 'hi', label: 'Hindi', name: 'हिन्दी' },
    { code: 'mr', label: 'Marathi', name: 'मराठी' },
    { code: 'bn', label: 'Bengali', name: 'বাংলা' },
    { code: 'ar', label: 'Arabic', name: 'العربية' },
  ];

  const treatmentCategories = [
    { name: 'Cardiology & Cardiac Surgery', id: 'treatments' },
    { name: 'Orthopaedics & Spine Surgery', id: 'treatments' },
    { name: 'Oncology & Chemotherapy', id: 'treatments' },
    { name: 'Neurology & Neurosurgery', id: 'treatments' },
    { name: 'Nephrology & Renal Care', id: 'treatments' },
    { name: 'Ophthalmology & Eye Surgery', id: 'treatments' },
    { name: 'ENT & Cochlear Implant', id: 'treatments' },
    { name: 'View All 20+ Specialties', id: 'treatments' },
  ];

  const internationalPortals = [
    { name: 'Global International Desk', slug: 'international', flag: '🌍' },
    { name: 'Bangladesh Patient Gateway', slug: 'bangladesh', flag: '🇧🇩' },
    { name: 'UAE & Gulf Patient Gateway', slug: 'uae', flag: '🇦🇪' },
    { name: 'Oman Patient Gateway', slug: 'oman', flag: '🇴🇲' },
    { name: 'Qatar Patient Gateway', slug: 'qatar', flag: '🇶🇦' },
    { name: 'Saudi Arabia Patient Gateway', slug: 'saudi', flag: '🇸🇦' },
    { name: 'Nepal Patient Gateway', slug: 'nepal', flag: '🇳🇵' },
    { name: 'African Nations Gateway', slug: 'africa', flag: '🌍' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white transition-all duration-200 shadow-xs">
      {/* ========================================================================= */}
      {/* LEVEL 1: TOP UTILITY BAR (Indian Institutional Dark Navy Portal Bar)       */}
      {/* ========================================================================= */}
      <div className="bg-[#0B1E3F] text-slate-200 text-[11px] sm:text-xs border-b border-blue-950/80 px-4 sm:px-6 lg:px-8 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Brand / Country Portal Anchor */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="font-semibold text-white tracking-wide flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933] mr-1.5 shrink-0" />
              Bharat Health Connect
              <span className="text-slate-400 font-normal mx-1.5">|</span>
              <span className="text-blue-200 font-normal hidden sm:inline">
                Healthcare in India
              </span>
            </span>
            <span className="hidden md:inline-block px-2 py-0.2 bg-blue-900/60 rounded text-[10px] text-blue-200 border border-blue-800/60">
              Private Healthcare Facilitation Portal
            </span>
          </div>

          {/* Right: Language switchers, Accessibility, Contact & CRM */}
          <div className="flex items-center space-x-3 sm:space-x-4 text-[11px]">
            {/* Language List Selection Button */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1.5 bg-blue-950/80 hover:bg-blue-900 text-white px-2.5 py-1 rounded border border-blue-900/80 transition-colors text-[11px] font-semibold cursor-pointer shadow-2xs focus:outline-none focus:ring-1 focus:ring-[#FF9933]"
                aria-expanded={langDropdownOpen}
                aria-haspopup="listbox"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#FF9933] shrink-0" />
                <span>{languages.find((l) => l.code === currentLang)?.name || 'English'}</span>
                <ChevronDown className={`w-3 h-3 text-slate-300 transition-transform duration-150 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div
                  role="listbox"
                  aria-label="Language selection"
                  className="absolute right-0 mt-1.5 w-44 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-50 animate-in fade-in slide-in-from-top-1 text-slate-800"
                >
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Language / भाषा
                  </div>
                  {languages.map((lang) => {
                    const isSelected = currentLang === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors cursor-pointer ${
                          isSelected ? 'bg-blue-50/80 text-[#0B1E3F] font-bold' : 'text-slate-700'
                        }`}
                      >
                        <span className="flex items-center space-x-1.5">
                          <span>{lang.name}</span>
                          <span className="text-[10px] text-slate-400 font-normal">({lang.label})</span>
                        </span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Accessibility: Font Size Control (Standard Indian Public Portal Feature) */}
            <div className="hidden lg:flex items-center space-x-1 text-[10px] text-slate-300 bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-900/60">
              <span className="text-slate-400 font-medium">Text Size:</span>
              <button
                onClick={handleFontSizeToggle}
                className="px-1 text-slate-200 hover:text-white font-bold cursor-pointer"
                title="Toggle font size: Normal / Large / Larger"
                aria-label="Toggle text size"
              >
                A{fontSizeLevel === 'large' ? '+' : fontSizeLevel === 'larger' ? '++' : ''}
              </button>
            </div>

            {/* Direct Call / Contact Link */}
            <a
              href={`tel:${siteConfig.phoneDisplay.replace(/[^0-9+]/g, '')}`}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer hidden sm:inline-flex items-center text-[11px] font-medium"
              title={`Call Assistance Desk: ${siteConfig.phoneDisplay}`}
            >
              <Phone className="w-3 h-3 mr-1 text-teal-400" />
              <span>Call: {siteConfig.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 2: MAIN BRAND HEADER (White Background, Institutional Logo, Search) */}
      {/* ========================================================================= */}
      <div
        className={`max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled ? 'py-2 sm:py-3' : 'py-2.5 sm:py-4'
        }`}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-6 min-w-0">
          {/* Left: Brand Identity & Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="flex items-center space-x-2 sm:space-x-3 text-left min-w-0 shrink group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 rounded-md p-1 -m-1"
            aria-label="Bharat Health Connect Home"
          >
            {/* Custom Institutional Healthcare Vector Logo: Cross + Geometric Ring + Network Nodes */}
            <div
              className={`rounded-lg bg-[#0B1E3F] text-white flex items-center justify-center shadow-xs border border-blue-950 transition-all shrink-0 relative overflow-hidden ${
                isScrolled ? 'w-8 h-8 sm:w-10 sm:h-10' : 'w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12'
              }`}
            >
              {/* Subtle India Geometric Hexagonal/Octagonal Pattern Watermark (NO Ashoka emblem) */}
              <svg
                className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
                viewBox="0 0 48 48"
                fill="none"
              >
                <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
                <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="0.8" />
                <line x1="24" y1="2" x2="24" y2="46" stroke="currentColor" strokeWidth="0.5" />
                <line x1="2" y1="24" x2="46" y2="24" stroke="currentColor" strokeWidth="0.5" />
                <line x1="8" y1="8" x2="40" y2="40" stroke="currentColor" strokeWidth="0.5" />
                <line x1="8" y1="40" x2="40" y2="8" stroke="currentColor" strokeWidth="0.5" />
              </svg>

              {/* Central Healthcare Symbol + 4 Connected Network Nodes */}
              <svg
                className={`transition-all relative z-10 ${
                  isScrolled ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7'
                }`}
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Healthcare Cross */}
                <path
                  d="M13 5C13 4.44772 13.4477 4 14 4H18C18.5523 4 19 4.44772 19 5V13H27C27.5523 13 28 13.4477 28 14V18C28 18.5523 27.5523 19 27 19H19V27C19 27.5523 18.5523 28 18 28H14C13.4477 28 13 27.5523 13 27V19H5C4.44772 19 4 18.5523 4 18V14C4 13.4477 4.44772 13 5 13H13V5Z"
                  fill="#FFFFFF"
                />
                {/* 4 Quadrant Connection Network Nodes */}
                <circle cx="7" cy="7" r="2.2" fill="#38BDF8" />
                <circle cx="25" cy="7" r="2.2" fill="#FF9933" />
                <circle cx="7" cy="25" r="2.2" fill="#38BDF8" />
                <circle cx="25" cy="25" r="2.2" fill="#138808" />
                {/* Fine Connecting Lines */}
                <line x1="7" y1="7" x2="13" y2="13" stroke="#38BDF8" strokeWidth="1" strokeDasharray="1 1" />
                <line x1="25" y1="7" x2="19" y2="13" stroke="#FF9933" strokeWidth="1" strokeDasharray="1 1" />
                <line x1="7" y1="25" x2="13" y2="19" stroke="#38BDF8" strokeWidth="1" strokeDasharray="1 1" />
                <line x1="25" y1="25" x2="19" y2="19" stroke="#138808" strokeWidth="1" strokeDasharray="1 1" />
              </svg>
            </div>

            {/* Typography */}
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5">
                <span
                  className={`font-black tracking-tight text-[#0B1E3F] group-hover:text-blue-900 transition-colors uppercase leading-tight truncate ${
                    isScrolled ? 'text-xs sm:text-base md:text-lg' : 'text-xs sm:text-base md:text-lg lg:text-2xl'
                  }`}
                >
                  BHARAT HEALTH CONNECT
                </span>
              </div>
              <p
                className={`text-slate-600 font-semibold tracking-wide transition-all leading-tight truncate ${
                  isScrolled ? 'text-[9px] sm:text-[10px] hidden md:block' : 'text-[10px] sm:text-xs hidden sm:block'
                }`}
              >
                {t.brandTagline || 'Connecting You to Healthcare in India'}
              </p>
            </div>
          </a>

          {/* Center: Large Institutional Search Bar */}
          <div
            ref={searchContainerRef}
            className="hidden lg:block flex-1 max-w-md xl:max-w-lg relative mx-2"
          >
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  placeholder={t.searchNavPlaceholder || 'Search hospitals, treatments, doctors...'}
                  aria-label="Search hospitals, treatments, doctors in India"
                  className="w-full pl-10 pr-24 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-[#0B1E3F] transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-20 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    aria-label="Clear search query"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#0B1E3F] hover:bg-blue-900 text-white rounded-md text-xs font-semibold tracking-wide transition-colors cursor-pointer"
              >
                {t.searchBtn || 'Search'}
              </button>
            </form>

            {/* Quick Search Suggestions Popover */}
            {searchFocused && (
              <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50 text-xs animate-in fade-in slide-in-from-top-1">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Popular Healthcare Searches
                </div>
                <div className="divide-y divide-slate-100">
                  {quickSearchSuggestions.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSearchQuery(item.query);
                        scrollToSection(item.section);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-blue-50 text-slate-700 hover:text-[#0B1E3F] flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-3 h-3 text-slate-300" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Secondary CTA (WhatsApp) & Primary CTA (Get Medical Assistance) */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 shrink-0">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-slate-700 hover:text-[#0B1E3F] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle search input"
              aria-expanded={mobileSearchOpen}
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Login Button */}
            <button
              onClick={() => {
                window.history.pushState(null, '', '/patient');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              aria-label="Login"
              className="inline-flex items-center justify-center text-xs font-semibold px-2.5 py-1.5 sm:py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-300 rounded-lg transition-all shadow-2xs hover:shadow-xs active:scale-[0.98] cursor-pointer whitespace-nowrap gap-1.5"
              title="Login"
            >
              <LogIn className="w-3.5 h-3.5 text-teal-700" />
              <span>Login</span>
            </button>

            {/* Primary CTA: Get Medical Assistance (Responsive Auto-sizing) */}
            <button
              id="navbar-get-assistance-btn"
              onClick={() => {
                trackEvent('header_cta_click', { cta: 'Get Medical Assistance' });
                scrollToSection('quick-enquiry');
              }}
              className="inline-flex items-center justify-center text-[11px] sm:text-xs md:text-sm font-bold px-2 sm:px-3.5 md:px-4 py-1.5 sm:py-2 bg-[#0B1E3F] hover:bg-blue-900 active:bg-slate-900 text-white rounded-lg shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer border border-blue-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 min-w-0 max-w-[125px] xs:max-w-[165px] sm:max-w-none text-center"
            >
              <span className="truncate">{t.navGetAssistance}</span>
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 sm:p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 ml-0.5 sm:ml-1"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Expandable) */}
        {mobileSearchOpen && (
          <div className="lg:hidden pt-3 pb-1">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hospitals, treatments, doctors..."
                className="w-full pl-10 pr-20 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-[#0B1E3F]"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#0B1E3F] text-white rounded-md text-xs font-semibold"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 3: MAIN NAVIGATION BAR (Separate Dark Blue Institutional Portal Bar) */}
      {/* ========================================================================= */}
      <nav
        aria-label="Main Navigation"
        className="hidden xl:block bg-[#0B1E3F] text-white border-t border-blue-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-0.5 text-[13px] font-semibold tracking-wide">
              {/* Home */}
              <button
                onClick={scrollToTop}
                className="px-3 py-2.5 hover:bg-[#152E5A] text-slate-100 hover:text-white transition-colors cursor-pointer"
              >
                {t.breadcrumbHome || 'Home'}
              </button>

              {/* About Us */}
              <button
                onClick={() => scrollToSection('why-miraj')}
                className="px-3 py-2.5 hover:bg-[#152E5A] text-slate-100 hover:text-white transition-colors cursor-pointer"
              >
                {t.navWhyMiraj || 'About Us'}
              </button>

              {/* Treatments with Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => scrollToSection('treatments')}
                  onMouseEnter={() => setTreatmentsDropdownOpen(true)}
                  className="px-3 py-2.5 hover:bg-[#152E5A] text-slate-100 hover:text-white transition-colors flex items-center cursor-pointer"
                  aria-expanded={treatmentsDropdownOpen}
                >
                  <span>{t.navTreatments || 'Treatments'}</span>
                  <ChevronDown className="w-3 h-3 ml-1 text-slate-300 group-hover:rotate-180 transition-transform" />
                </button>

                {/* Dropdown Menu */}
                <div
                  onMouseLeave={() => setTreatmentsDropdownOpen(false)}
                  className="absolute left-0 top-full w-64 bg-white rounded-b-lg shadow-xl border border-slate-200 py-1.5 z-50 text-slate-800 text-xs hidden group-hover:block"
                >
                  <div className="px-3 py-1 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                    Key Specialties
                  </div>
                  {treatmentCategories.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setTreatmentsDropdownOpen(false);
                        scrollToSection(item.id);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-[#0B1E3F] transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hospitals */}
              <button
                onClick={() => scrollToSection('hospitals')}
                className="px-3 py-2.5 hover:bg-[#152E5A] text-slate-100 hover:text-white transition-colors cursor-pointer"
              >
                {t.navHospitals || 'Hospitals'}
              </button>

              {/* Doctors */}
              <button
                onClick={() => scrollToSection('doctors')}
                className="px-3 py-2.5 hover:bg-[#152E5A] text-slate-100 hover:text-white transition-colors cursor-pointer"
              >
                {t.doctorsBadge || 'Doctors'}
              </button>

              {/* International Patients with Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => scrollToSection('international-services')}
                  onMouseEnter={() => setInternationalDropdownOpen(true)}
                  className="px-3 py-2.5 hover:bg-[#152E5A] text-slate-100 hover:text-white transition-colors flex items-center cursor-pointer"
                  aria-expanded={internationalDropdownOpen}
                >
                  <span>{t.navInternational || 'International Patients'}</span>
                  <ChevronDown className="w-3 h-3 ml-1 text-slate-300 group-hover:rotate-180 transition-transform" />
                </button>

                {/* Dropdown Menu for Countries */}
                <div
                  onMouseLeave={() => setInternationalDropdownOpen(false)}
                  className="absolute left-0 top-full w-64 bg-white rounded-b-lg shadow-xl border border-slate-200 py-1.5 z-50 text-slate-800 text-xs hidden group-hover:block"
                >
                  <div className="px-3 py-1 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                    Country Medical Travel Portals
                  </div>
                  {internationalPortals.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInternationalDropdownOpen(false);
                        onOpenCountryModal(item.slug);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-[#0B1E3F] transition-colors cursor-pointer flex items-center space-x-2"
                    >
                      <span>{item.flag}</span>
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* How It Works */}
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="px-3 py-2.5 hover:bg-[#152E5A] text-slate-100 hover:text-white transition-colors cursor-pointer"
              >
                {t.navHowItWorks || 'How It Works'}
              </button>

              {/* Travel & Stay */}
              <button
                onClick={() => scrollToSection('travel-stay')}
                className="px-3 py-2.5 hover:bg-[#152E5A] text-slate-100 hover:text-white transition-colors cursor-pointer"
              >
                {t.travelStayTitle || 'Travel & Stay'}
              </button>

              {/* FAQ */}
              <button
                onClick={() => scrollToSection('faq')}
                className="px-3 py-2.5 hover:bg-[#152E5A] text-slate-100 hover:text-white transition-colors cursor-pointer"
              >
                {t.navFAQ || 'FAQ'}
              </button>

              {/* Contact */}
              <button
                onClick={() => scrollToSection('contact')}
                className="px-3 py-2.5 hover:bg-[#152E5A] text-slate-100 hover:text-white transition-colors cursor-pointer"
              >
                {t.navContact || 'Contact'}
              </button>
            </div>

            {/* Quick Country Portal Selector Badge on Navigation Row */}
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => onOpenCountryModal('international')}
                className="flex items-center text-xs font-semibold px-2.5 py-1 rounded bg-blue-900/60 hover:bg-blue-900 active:scale-95 text-blue-100 transition-all border border-blue-800 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Globe className="w-3.5 h-3.5 mr-1 text-[#FF9933] shrink-0" />
                <span>Country Portals</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* LEVEL 4: TIRANGA ACCENT LINE (3-4px height: Saffron | White | Green)      */}
      {/* ========================================================================= */}
      <div
        aria-hidden="true"
        className="w-full flex flex-col h-[3.5px] relative z-20 shadow-2xs"
      >
        <div className="h-[1.25px] bg-[#FF9933] w-full" />
        <div className="h-[1px] bg-white w-full opacity-95" />
        <div className="h-[1.25px] bg-[#138808] w-full" />
      </div>


      {/* ========================================================================= */}
      {/* LEVEL 6: INSTITUTIONAL TRUST STRIP (Healthcare info, hospitals, doctors)  */}
      {/* ========================================================================= */}
      <div className="hidden sm:block bg-white border-b border-slate-200/70 py-1.5 px-4 sm:px-6 lg:px-8 text-slate-700 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center lg:justify-between gap-y-1 gap-x-4">
          <div className="flex items-center space-x-1.5">
            <FileText className="w-3.5 h-3.5 text-[#0B1E3F] shrink-0" />
            <span className="font-semibold text-slate-800">Healthcare Information</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div className="flex items-center space-x-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#0B1E3F] shrink-0" />
            <span className="font-semibold text-slate-800">Hospital Coordination</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div className="flex items-center space-x-1.5">
            <Stethoscope className="w-3.5 h-3.5 text-[#0B1E3F] shrink-0" />
            <span className="font-semibold text-slate-800">Doctor Consultation</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div className="flex items-center space-x-1.5">
            <Plane className="w-3.5 h-3.5 text-[#0B1E3F] shrink-0" />
            <span className="font-semibold text-slate-800">Travel Assistance</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE NAVIGATION DRAWER (Slide-down with large touch-friendly CTAs)       */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto"
        >
          {/* Mobile Language Selector */}
          <div className="flex flex-col space-y-1.5 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 flex items-center">
                <Globe className="w-3.5 h-3.5 mr-1.5 text-blue-900" />
                Select Language:
              </span>
              <span className="text-[11px] font-bold text-teal-700">
                {languages.find((l) => l.code === currentLang)?.label}
              </span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-xs font-medium">
              {languages.map((lang, index) => (
                <React.Fragment key={lang.code}>
                  <button
                    onClick={() => {
                      onLanguageChange(lang.code);
                    }}
                    className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                      currentLang === lang.code
                        ? 'bg-[#0B1E3F] text-white font-bold'
                        : 'text-slate-700 hover:text-blue-900 hover:bg-slate-200'
                    }`}
                    aria-label={`Switch language to ${lang.label}`}
                  >
                    {lang.label}
                  </button>
                  {index < languages.length - 1 && (
                    <span className="text-slate-300">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col space-y-1 text-sm font-semibold text-slate-800 divide-y divide-slate-100">
            <button
              onClick={scrollToTop}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-[#0B1E3F] flex items-center justify-between"
            >
              <span>{t.breadcrumbHome || 'Home'}</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </button>
            <button
              onClick={() => scrollToSection('why-miraj')}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-[#0B1E3F] flex items-center justify-between"
            >
              <span>{t.navWhyMiraj || 'About Us'}</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </button>
            <button
              onClick={() => scrollToSection('treatments')}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-[#0B1E3F] flex items-center justify-between"
            >
              <span>{t.navTreatments || 'Treatments'}</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </button>
            <button
              onClick={() => scrollToSection('hospitals')}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-[#0B1E3F] flex items-center justify-between"
            >
              <span>{t.navHospitals || 'Hospitals'}</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </button>
            <button
              onClick={() => scrollToSection('doctors')}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-[#0B1E3F] flex items-center justify-between"
            >
              <span>{t.doctorsBadge || 'Doctors'}</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </button>
            <button
              onClick={() => scrollToSection('international-services')}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-[#0B1E3F] flex items-center justify-between"
            >
              <span>{t.navInternational || 'International Patients'}</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-[#0B1E3F] flex items-center justify-between"
            >
              <span>{t.navHowItWorks || 'How It Works'}</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </button>
            <button
              onClick={() => scrollToSection('travel-stay')}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-[#0B1E3F] flex items-center justify-between"
            >
              <span>{t.travelStayTitle || 'Travel & Stay'}</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-[#0B1E3F] flex items-center justify-between"
            >
              <span>{t.navFAQ || 'FAQ'}</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-[#0B1E3F] flex items-center justify-between"
            >
              <span>{t.navContact || 'Contact'}</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </button>
          </nav>

          {/* Quick Country Guide */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCountryModal('international');
              }}
              className="w-full text-left py-2.5 px-3 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center">
                <Globe className="w-4 h-4 mr-2 text-[#0B1E3F]" />
                Select Specific Country Guide
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Dedicated Patient Portal Section in Mobile Drawer */}
          <div className="pt-2 border-t border-slate-100 space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
              Patient Access
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.history.pushState(null, '', '/patient');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="w-full text-left py-2.5 px-3 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-teal-700" />
                <span>Patient Login (Encrypted Health Locker)</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-700" />
            </button>
          </div>

          {/* Bottom Touch-Friendly Large CTAs */}
          <div className="pt-2 space-y-2.5">
            {/* Primary CTA */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('quick-enquiry');
              }}
              className="w-full min-h-[48px] py-3.5 px-4 bg-[#0B1E3F] active:bg-slate-900 text-white font-bold text-sm rounded-lg text-center shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer border border-blue-950"
            >
              <span>{t.navGetAssistance}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
