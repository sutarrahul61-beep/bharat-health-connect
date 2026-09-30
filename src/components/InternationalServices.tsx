import React from 'react';
import {
  FileCheck2,
  Car,
  Languages,
  Utensils,
  Smartphone,
  Video,
  ArrowRight,
  Globe2,
} from 'lucide-react';
import { SupportedLanguage, translations } from '../data/translations';
import { internationalServicesData } from '../data/mockData';

interface InternationalServicesProps {
  currentLang: SupportedLanguage;
  onEnquireClick: () => void;
}

const serviceIcons = [FileCheck2, Car, Languages, Utensils, Smartphone, Video];

export const InternationalServices: React.FC<InternationalServicesProps> = ({
  currentLang,
  onEnquireClick,
}) => {
  const t = translations[currentLang];

  return (
    <section id="international" className="py-16 sm:py-24 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 text-teal-400 text-xs font-semibold mb-3 border border-slate-700">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Dedicated International Concierge</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Comprehensive Support Beyond the Operating Theatre
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Navigating healthcare in a foreign country can be daunting. We manage every logistical, linguistic, and travel detail for you and your accompanying family.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internationalServicesData.map((item, idx) => {
            const Icon = serviceIcons[idx % serviceIcons.length];
            return (
              <div
                key={item.id}
                className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 hover:border-teal-500/60 hover:bg-slate-800 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-900/60 border border-teal-700/50 text-teal-400 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-medium text-teal-300 bg-teal-950 px-2.5 py-1 rounded-full border border-teal-800">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-teal-900/30 border border-teal-700/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Need assistance with your Medical Visa Invitation?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Share your diagnostic reports to receive an official hospital letter for the Indian Embassy within 24 hours.
            </p>
          </div>
          <button
            onClick={onEnquireClick}
            className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Request Visa Invitation Support</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
