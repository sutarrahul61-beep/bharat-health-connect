import React from 'react';
import {
  X,
  Plane,
  FileCheck2,
  Utensils,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  Activity,
} from 'lucide-react';
import { countryLandingPages } from '../data/mockData';
import { CountryLandingInfo, SiteConfig } from '../types';
import { trackEvent } from '../utils/analytics';
import { HeaderLogoIcon } from './AIChatWidget';

interface CountryLandingModalProps {
  countryCode: string | null;
  onClose: () => void;
  siteConfig: SiteConfig;
  onStartEnquiryForCountry: (countryName: string) => void;
}

const countryCodeMap: Record<string, string> = {
  BD: 'bangladesh',
  NP: 'nepal',
  AE: 'uae',
  OM: 'oman',
  QA: 'qatar',
  SA: 'saudi',
  KW: 'uae', // Gulf pathway
  BH: 'uae', // Gulf pathway
  KE: 'africa',
  GB: 'international',
  US: 'international',
};

export const CountryLandingModal: React.FC<CountryLandingModalProps> = ({
  countryCode,
  onClose,
  siteConfig,
  onStartEnquiryForCountry,
}) => {
  if (!countryCode) return null;

  const key = countryCodeMap[countryCode.toUpperCase()] || countryCode.toLowerCase();
  const data: CountryLandingInfo | undefined =
    countryLandingPages[key] || countryLandingPages['international'];

  if (!data) return null;

  const handleOpenAIChat = () => {
    trackEvent('country_modal_ai_chat_click', { country: data.countryName });
    onClose();
    window.dispatchEvent(new CustomEvent('open-ai-chat'));
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-lg md:max-w-3xl lg:max-w-4xl max-h-[92vh] sm:max-h-[88vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden relative my-auto animate-in zoom-in-95 duration-200">
        {/* Header with Country Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-4 sm:p-6 md:p-7 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="inline-flex items-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-xs font-bold text-teal-300 bg-teal-900/60 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-teal-700/60 mb-2 sm:mb-2.5 pr-8 sm:pr-3">
            <span>{data.flag} Dedicated Country Care Pathway</span>
          </div>

          <h2 className="text-base sm:text-xl md:text-2xl font-extrabold text-white pr-6 sm:pr-8 leading-snug">
            {data.headline}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 sm:mt-1.5 leading-relaxed line-clamp-2 sm:line-clamp-none">
            {data.subheadline}
          </p>
        </div>

        {/* Modal Body - Auto-Sizing Responsive Grid */}
        <div className="p-3.5 sm:p-5 md:p-6 space-y-3 sm:space-y-4 overflow-y-auto flex-1 min-h-0 custom-scrollbar">
          {/* 4 Core Logistics Cards: 1 col on mobile, 2 cols on tablet/desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3.5">
            {/* Flight & Travel Details */}
            <div className="flex items-start space-x-3 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200">
              <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-800">
                  Recommended Travel & Flight Transit
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 sm:mt-1 leading-relaxed">
                  {data.travelRecommendation}
                </p>
              </div>
            </div>

            {/* Visa Guidelines */}
            <div className="flex items-start space-x-3 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200">
              <FileCheck2 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-800">
                  Medical Visa (e-Medical) Requirements
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 sm:mt-1 leading-relaxed">
                  {data.visaGuidance}
                </p>
              </div>
            </div>

            {/* Currency & Financials */}
            <div className="flex items-start space-x-3 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-800">
                  Currency & Payment Methods
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 sm:mt-1 leading-relaxed">
                  {data.currency}
                </p>
              </div>
            </div>

            {/* Language & Cultural / Dietary Support */}
            <div className="flex items-start space-x-3 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200">
              <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-800">
                  Language & Communication Support
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 sm:mt-1 leading-relaxed">
                  {data.languageHelp}
                </p>
              </div>
            </div>
          </div>

          {/* Common Treatments */}
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center space-x-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5 sm:mb-2">
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-700 shrink-0" />
              <span>Commonly Coordinated Treatments</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {data.commonTreatments.map((treatment, idx) => (
                <span
                  key={idx}
                  className="text-[11px] sm:text-xs bg-white text-teal-900 border border-teal-200/80 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg font-medium shadow-2xs"
                >
                  {treatment}
                </span>
              ))}
            </div>
          </div>

          {/* Verification / Quality guarantee note */}
          <div className="p-2.5 sm:p-3 bg-teal-50/70 border border-teal-200 rounded-lg sm:rounded-xl text-[11px] sm:text-xs text-teal-900 flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-700 mr-2 shrink-0" />
            <span>Dedicated coordinator assigned to your enquiry at no upfront charge.</span>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="p-3.5 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 shrink-0">
          <button
            onClick={() => {
              onStartEnquiryForCountry(data.countryName);
              onClose();
            }}
            className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center cursor-pointer order-1"
          >
            <span>Start Enquiry for {data.countryName}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5" />
          </button>

          <button
            onClick={handleOpenAIChat}
            className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center justify-center cursor-pointer gap-2 order-2"
          >
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-[#0B1E3F] border border-blue-900 flex items-center justify-center shrink-0 p-0.5 shadow-2xs">
              <HeaderLogoIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
            <span>AI Healthcare Assistant</span>
          </button>
        </div>
      </div>
    </div>
  );
};
