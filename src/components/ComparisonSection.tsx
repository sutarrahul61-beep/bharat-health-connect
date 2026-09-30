import React from 'react';
import {
  Check,
  X,
  ShieldCheck,
  ArrowRight,
  Scale,
} from 'lucide-react';
import { SupportedLanguage, translations } from '../data/translations';
import { comparisonData } from '../data/mockData';

interface ComparisonSectionProps {
  currentLang: SupportedLanguage;
  onEnquireClick: () => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({
  currentLang,
  onEnquireClick,
}) => {
  const t = translations[currentLang];

  return (
    <section id="comparison" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
            <Scale className="w-3.5 h-3.5 text-teal-600" />
            <span>Side-by-Side Fact Sheet</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Miraj Healthcare vs. Metropolitan Corporate Chains
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Compare key factors before making an informed clinical and financial decision for your family.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider py-4 px-4 sm:px-6 border-b border-slate-200">
            <div className="col-span-4 sm:col-span-4">Evaluation Criteria</div>
            <div className="col-span-4 sm:col-span-4 text-teal-800">Miraj Medical Network</div>
            <div className="col-span-4 sm:col-span-4 text-slate-500">Tier-1 Corporate Chains</div>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            {comparisonData.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 py-4 px-4 sm:px-6 items-center hover:bg-slate-50/60 transition-colors">
                <div className="col-span-4 sm:col-span-4 font-semibold text-slate-900 pr-2">
                  {item.metric}
                </div>
                <div className="col-span-4 sm:col-span-4 text-teal-800 font-medium flex items-start gap-1.5 pr-2">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{item.miraj}</span>
                </div>
                <div className="col-span-4 sm:col-span-4 text-slate-500 flex items-start gap-1.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{item.metro}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onEnquireClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs cursor-pointer"
          >
            <span>Discuss Your Case With Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
