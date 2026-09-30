import React from 'react';
import {
  Quote,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Heart,
} from 'lucide-react';
import { SupportedLanguage, translations } from '../data/translations';
import { testimonialsData } from '../data/mockData';

interface TestimonialsSectionProps {
  currentLang: SupportedLanguage;
  onEnquireClick: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  currentLang,
  onEnquireClick,
}) => {
  const t = translations[currentLang];

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>Consent-Verified Patient Experiences</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Real Patient Journeys & Clinical Outcomes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Hear from international and domestic patients who trusted Miraj’s medical teams for their complex surgeries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50/80 rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-teal-300 hover:bg-white hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                    <Quote className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {item.consentStatus}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "{item.quote}"
                </p>

                <p className="mt-3 text-xs text-slate-500">
                  {item.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80 space-y-1">
                <div className="text-xs font-bold text-slate-900">
                  {item.patientName}
                </div>
                <div className="text-[11px] text-teal-700 font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{item.country} • {item.treatment}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  {item.verificationNote}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
