import React from 'react';
import {
  History,
  Stethoscope,
  GitMerge,
  Wallet,
  Compass,
  UserCheck,
  MapPin,
} from 'lucide-react';
import { SupportedLanguage, translations } from '../data/translations';
import { whyMirajCards } from '../data/localizedContent';
import { HeaderLogoIcon } from './AIChatWidget';
import { SiteConfig } from '../types';

interface WhyMirajProps {
  currentLang: SupportedLanguage;
  siteConfig?: SiteConfig;
}

export const WhyMiraj: React.FC<WhyMirajProps> = ({ currentLang, siteConfig }) => {
  const t = translations[currentLang];
  const cardData = whyMirajCards[currentLang] || whyMirajCards.en;

  const cardIcons = [History, Stethoscope, GitMerge, Wallet, Compass, UserCheck];

  return (
    <section id="why-miraj" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            <span>{t.whyMirajBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.whyMirajTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.whyMirajSubtitle}
          </p>
        </div>

        {/* 6 Key Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cardData.map((card, index) => {
            const IconComponent = cardIcons[index % cardIcons.length];
            return (
              <div
                key={index}
                className="relative bg-slate-50/70 hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-teal-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center group-hover:bg-teal-700 group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold">{t.whyMirajPrompt}</h3>
            <p className="text-xs sm:text-sm text-slate-300">{t.contactSubtitle}</p>
          </div>
          {siteConfig && (
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-ai-chat'));
              }}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm rounded-xl shrink-0 flex items-center shadow-xs cursor-pointer gap-2"
            >
              <div className="w-5 h-5 rounded bg-[#0B1E3F] border border-blue-900 flex items-center justify-center shrink-0 p-0.5 shadow-2xs">
                <HeaderLogoIcon className="w-3.5 h-3.5" />
              </div>
              <span>{t.talkToCoordinator}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
