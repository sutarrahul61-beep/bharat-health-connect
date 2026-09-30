import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  Plane,
  HeartHandshake,
  Building,
} from 'lucide-react';
import { SupportedLanguage, translations } from '../data/translations';
import { SiteConfig } from '../types';
import { trackEvent } from '../utils/analytics';
import { HeaderLogoIcon } from './AIChatWidget';

interface HeroProps {
  currentLang: SupportedLanguage;
  siteConfig: SiteConfig;
  onGetAssistanceClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  siteConfig,
  onGetAssistanceClick,
}) => {
  const t = translations[currentLang];

  const handleOpenAIChat = () => {
    trackEvent('hero_ai_chat_click');
    window.dispatchEvent(new CustomEvent('open-ai-chat'));
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100/80 via-white to-slate-50 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/70">
      {/* Background Hero Image with Medical Architecture & Gradient Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=80"
          alt="Modern Indian Hospital and Healthcare Infrastructure"
          className="w-full h-full object-cover object-center opacity-15"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-blue-50/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100/90 via-transparent to-slate-50" />
      </div>

      {/* Background soft geometric accents */}
      <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(13,148,136,0.12),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines, Value Proposition, Trust Badges, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Institutional Label */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200/90 text-blue-950 text-xs sm:text-sm font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
              <span>{t.heroBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              {t.heroHeadline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              {t.heroSubheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full">
              <button
                id="hero-primary-cta"
                onClick={() => {
                  trackEvent('hero_cta_click', { action: 'Get Medical Assistance' });
                  onGetAssistanceClick();
                }}
                className="w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 bg-blue-950 hover:bg-blue-900 active:bg-slate-900 text-white font-bold text-sm sm:text-base rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center group cursor-pointer border border-blue-900 text-center"
              >
                <span className="truncate">{t.heroPrimaryCTA}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              <button
                id="hero-ai-assistant-cta"
                onClick={handleOpenAIChat}
                className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold text-sm sm:text-base rounded-lg shadow-2xs hover:shadow-sm transition-all flex items-center justify-center cursor-pointer border border-teal-500 text-center gap-2 group"
                title={t.heroSecondaryCTA}
              >
                <div className="w-5 h-5 rounded bg-[#0B1E3F] border border-blue-900 flex items-center justify-center shrink-0 p-0.5 shadow-2xs group-hover:scale-105 transition-transform">
                  <HeaderLogoIcon className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{t.heroSecondaryCTA}</span>
              </button>
            </div>

            {/* Trust Line */}
            <div className="pt-3 border-t border-slate-200/80">
              <p className="text-xs sm:text-sm text-slate-700 font-medium flex items-center justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
                <span>{t.heroTrustLine}</span>
              </p>
            </div>

            {/* Important Ethical Care Disclaimer Note */}
            <div className="bg-slate-100/90 rounded-xl p-3 text-xs text-slate-600 border border-slate-200/90 text-left max-w-2xl">
              <span className="font-semibold text-slate-800">{t.portalLabel}: </span>
              {t.ethicalCareNotice}
            </div>
          </div>

          {/* Right Column: High-Craft Medical Concierge Overview Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-7 space-y-6">
              {/* Header card indicator */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      {t.conciergeCardTitle}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {t.conciergeCardSub}
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200 flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  {t.realHumanTeam}
                </span>
              </div>

              {/* Verified Care Coordination Pillars */}
              <div className="space-y-3.5">
                <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Building className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      {t.pillar1Title}
                    </h3>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      {t.pillar1Desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <CalendarCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      {t.pillar2Title}
                    </h3>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      {t.pillar2Desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Plane className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      {t.pillar3Title}
                    </h3>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      {t.pillar3Desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Factual Regional Context Snapshot */}
              <div className="pt-2 border-t border-slate-100">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="block text-sm font-bold text-slate-900">{t.stat1Num}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{t.stat1Label}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="block text-sm font-bold text-slate-900">{t.stat2Num}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{t.stat2Label}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="block text-sm font-bold text-slate-900">{t.stat3Num}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{t.stat3Label}</span>
                  </div>
                </div>
              </div>

              {/* Quick direct action footer */}
              <div className="bg-teal-50/70 rounded-xl p-3 flex items-center justify-between border border-teal-100">
                <div className="text-left">
                  <p className="text-xs font-bold text-teal-950">{t.haveReports}</p>
                  <p className="text-[11px] text-teal-800">{t.uploadSecurely}</p>
                </div>
                <button
                  onClick={onGetAssistanceClick}
                  className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  {t.startForm}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
