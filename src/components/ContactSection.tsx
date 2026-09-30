import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
  Sparkles,
} from 'lucide-react';
import { SupportedLanguage, translations } from '../data/translations';
import { SiteConfig } from '../types';
import { trackEvent } from '../utils/analytics';
import { HeaderLogoIcon } from './AIChatWidget';

interface ContactSectionProps {
  currentLang: SupportedLanguage;
  siteConfig: SiteConfig;
  onStartEnquiryClick: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLang,
  siteConfig,
  onStartEnquiryClick,
}) => {
  const t = translations[currentLang];

  const handleOpenAIChat = () => {
    trackEvent('contact_ai_chat_click');
    window.dispatchEvent(new CustomEvent('open-ai-chat'));
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-slate-100/80 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Column: Call to Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-teal-300 bg-teal-950 px-3 py-1 rounded-full border border-teal-800">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                <span>{t.confidentialNotice}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {t.contactTitle}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                {t.contactSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="contact-start-enquiry-cta"
                  onClick={() => {
                    trackEvent('contact_enquiry_start');
                    onStartEnquiryClick();
                  }}
                  className="w-full sm:w-auto px-7 py-3.5 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg transition-all flex items-center justify-center cursor-pointer"
                >
                  <span>{t.heroPrimaryCTA}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>

                <button
                  id="contact-ai-chat-cta"
                  onClick={handleOpenAIChat}
                  className="w-full sm:w-auto px-6 py-3.5 bg-blue-950 hover:bg-blue-900 border border-teal-500/50 text-white font-semibold text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center justify-center cursor-pointer gap-2"
                >
                  <div className="w-5 h-5 rounded bg-[#0B1E3F] border border-blue-900 flex items-center justify-center shrink-0 p-0.5 shadow-2xs">
                    <HeaderLogoIcon className="w-3.5 h-3.5" />
                  </div>
                  <span>{t.heroSecondaryCTA}</span>
                </button>
              </div>

              <div className="pt-2 text-xs text-teal-300/80 flex items-center justify-center lg:justify-start">
                <Clock className="w-4 h-4 mr-1.5 text-teal-400 shrink-0" />
                <span>{siteConfig.responseTimeNote}</span>
              </div>
            </div>

            {/* Right Column: Verified Coordination Desk Information */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-white/15 space-y-4 text-xs sm:text-sm text-slate-200">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3 flex items-center">
                <Building className="w-4 h-4 mr-2 text-teal-300" />
                {t.contactDesk}
              </h3>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-slate-400">{t.contactPhone}:</span>
                  <a
                    href={`tel:${siteConfig.phoneDisplay.replace(/[^0-9+]/g, '')}`}
                    className="font-bold text-white hover:text-teal-300 transition-colors"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-slate-400">24/7 AI Health Assistant:</span>
                  <button
                    onClick={handleOpenAIChat}
                    className="font-bold text-teal-300 hover:text-teal-200 transition-colors inline-flex items-center cursor-pointer gap-1.5"
                  >
                    <span>{t.heroSecondaryCTA}</span>
                    <span className="ml-1 text-[10px] px-1.5 py-0.5 bg-teal-900/80 text-teal-300 rounded border border-teal-700">Online</span>
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-slate-400">{t.contactEmail}:</span>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-bold text-white hover:text-teal-300 transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-slate-400">{t.contactCenters}:</span>
                  <p className="text-slate-300 leading-relaxed">
                    Wanless Hospital Road, Miraj 416410 &<br />
                    Vijayanagar Medical Corridor, Sangli 416416,<br />
                    Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400">
                {t.contactHours}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
