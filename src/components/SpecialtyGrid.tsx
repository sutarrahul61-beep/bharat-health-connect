import React, { useState } from 'react';
import {
  Activity,
  Heart,
  Brain,
  ShieldAlert,
  Eye,
  Layers,
  Stethoscope,
  Sparkles,
  Search,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { SupportedLanguage, translations } from '../data/translations';
import { localizedSpecialties } from '../data/localizedSpecialties';

interface SpecialtyGridProps {
  currentLang: SupportedLanguage;
  onSelectSpecialty: (specialtyName: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Activity,
  Heart,
  Brain,
  ShieldAlert,
  Eye,
  Layers,
  Stethoscope,
  Sparkles,
};

export const SpecialtyGrid: React.FC<SpecialtyGridProps> = ({
  currentLang,
  onSelectSpecialty,
}) => {
  const t = translations[currentLang];
  const specialties = localizedSpecialties[currentLang] || localizedSpecialties.en;
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = specialties.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.description && s.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section id="treatments" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>{t.specialtiesBadge || 'Clinical Centers of Excellence'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.specialtiesTitle || 'World-Class Medical Specialties in Miraj'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {t.specialtiesSubtitle || 'Advanced tertiary procedures performed by senior board-certified specialists at 70% lower costs than metro hospitals.'}
          </p>

          {/* Search Input */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search treatments (e.g. Knee Replacement, Heart, Eye, Spine)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-xs"
            />
          </div>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const Icon = (item.iconName && iconMap[item.iconName]) || Stethoscope;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-teal-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  {item.keyProcedures && item.keyProcedures.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Key Procedures
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.keyProcedures.map((proc, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5 text-teal-600 mr-1" />
                            {proc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onSelectSpecialty(item.name)}
                    className="inline-flex items-center text-xs font-semibold text-teal-700 hover:text-teal-800 gap-1.5 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Request Doctor Opinion</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
