import React from 'react';
import {
  HeartHandshake,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  AlertTriangle,
  ArrowUp,
  Globe,
  Sparkles,
} from 'lucide-react';
import { SupportedLanguage, translations } from '../data/translations';
import { SiteConfig } from '../types';

interface FooterProps {
  currentLang: SupportedLanguage;
  siteConfig: SiteConfig;
  onOpenLegalModal: (type: 'privacy' | 'terms' | 'disclaimer') => void;
  onCountryClick: (code: string) => void;
  onOpenAdminPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  siteConfig,
  onOpenLegalModal,
  onCountryClick,
}) => {
  const t = translations[currentLang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const countries = [
    { code: 'BD', name: 'Bangladesh' },
    { code: 'NP', name: 'Nepal' },
    { code: 'AE', name: 'UAE' },
    { code: 'OM', name: 'Oman' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'QA', name: 'Qatar' },
    { code: 'KW', name: 'Kuwait' },
    { code: 'BH', name: 'Bahrain' },
    { code: 'KE', name: 'Kenya & Africa' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'US', name: 'United States' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900">
      {/* Emergency Alert Banner */}
      <div className="bg-amber-950/80 border-b border-amber-900/60 text-amber-200 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 text-center text-xs">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>{(t.footerEmergencyNotice || t.emergencyBannerTitle || 'Medical Emergency Notice:').split(':')[0]}: </strong>
            {(t.footerEmergencyNotice || t.emergencyBanner || '').split(':').slice(1).join(':') || t.emergencyBanner}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Concierge Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-teal-800 text-white flex items-center justify-center font-bold shadow-xs">
                <HeartHandshake className="w-6 h-6 text-teal-300" />
              </div>
              <div>
                <span className="block text-sm font-extrabold text-white tracking-tight">
                  {siteConfig.brandName}
                </span>
                <span className="block text-[11px] text-teal-400 font-medium">
                  {siteConfig.location}
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              {t.footerBrandDesc}
            </p>

            <div className="space-y-1.5 pt-2 text-slate-300 text-xs">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                <a href={`tel:${siteConfig.phoneDisplay.replace(/[^0-9+]/g, '')}`} className="hover:text-white">
                  Call: {siteConfig.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-ai-chat'))}
                  className="flex items-center space-x-2 text-teal-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>24/7 AI Health Assistant</span>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-teal-400" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>Miraj & Sangli Medical Cluster, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footerQuickNav}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#why-miraj" className="hover:text-teal-300 transition-colors">{t.navAbout}</a></li>
              <li><a href="#treatments" className="hover:text-teal-300 transition-colors">{t.navTreatments}</a></li>
              <li><a href="#how-it-works" className="hover:text-teal-300 transition-colors">{t.navHowItWorks}</a></li>
              <li><a href="#international-services" className="hover:text-teal-300 transition-colors">{t.navInternational}</a></li>
              <li><a href="#hospitals" className="hover:text-teal-300 transition-colors">{t.navHospitals}</a></li>
              <li><a href="#faq" className="hover:text-teal-300 transition-colors">{t.navFaq}</a></li>
              <li><a href="#contact" className="hover:text-teal-300 transition-colors">{t.navContact}</a></li>
              <li className="pt-1 border-t border-slate-800">
                <a
                  href="/patient"
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.pushState(null, '', '/patient');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  className="text-teal-400 hover:text-teal-300 transition-colors font-medium flex items-center gap-1.5"
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Patient Login</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Target Patient Regions (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center">
              <Globe className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
              {t.footerPatientDesks}
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {countries.map((c) => (
                <button
                  key={c.code}
                  onClick={() => onCountryClick(c.code)}
                  className="text-left py-1 hover:text-teal-300 transition-colors cursor-pointer truncate"
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Col 4: Institutional Heritage & Disclaimer (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footerRegionalHeritage}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footerHeritageDesc}
            </p>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-teal-400 mb-1" />
              <span>
                "{t.ethicalCareNotice}"
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal Links, Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2">
            <span>© {new Date().getFullYear()} {siteConfig.brandName}. {t.allRightsReserved}.</span>
            <button
              onClick={() => onOpenLegalModal('privacy')}
              className="hover:text-teal-400 transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              {t.footerPrivacyPolicy}
            </button>
            <button
              onClick={() => onOpenLegalModal('terms')}
              className="hover:text-teal-400 transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              {t.footerTermsOfService}
            </button>
            <button
              onClick={() => onOpenLegalModal('disclaimer')}
              className="hover:text-teal-400 transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              {t.footerMedicalDisclaimer}
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center space-x-1.5 text-slate-400 hover:text-teal-300 transition-colors cursor-pointer"
          >
            <span>{t.footerBackToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
