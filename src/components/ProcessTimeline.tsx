import React from 'react';
import {
  FileText,
  Calculator,
  Plane,
  Building,
  HeartPulse,
  Home,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { SupportedLanguage, translations } from '../data/translations';
import { processStepsData } from '../data/mockData';

interface ProcessTimelineProps {
  currentLang: SupportedLanguage;
  onEnquireClick: () => void;
}

const stepIcons = [FileText, Calculator, Plane, Building, HeartPulse, Home];

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({
  currentLang,
  onEnquireClick,
}) => {
  const t = translations[currentLang];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Seamless 6-Step Patient Pathway</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.howItWorksTitle || 'How Bharat Health Connect Works For You'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {t.howItWorksSubtitle || 'From your initial medical inquiry at home to safe recovery in Miraj and continuous follow-up after return.'}
          </p>
        </div>

        {/* Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processStepsData.map((step, idx) => {
            const Icon = stepIcons[idx % stepIcons.length];
            return (
              <div
                key={step.step}
                className="relative bg-slate-50/80 rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-teal-300 hover:bg-white hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-xl bg-teal-600 text-white font-mono font-bold text-sm flex items-center justify-center shadow-xs">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                  <p className="mt-3 text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-100">
                    {step.detail}
                  </p>
                </div>

                <div className="mt-4 pt-3 flex items-center gap-1.5 text-xs font-semibold text-teal-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Personal coordinator guided</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onEnquireClick}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Start Your Confidential Enquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
