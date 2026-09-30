import React from 'react';
import {
  Stethoscope,
  Award,
  CheckCircle2,
  Calendar,
  Languages,
  ArrowRight,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { SupportedLanguage, translations } from '../data/translations';
import { Doctor } from '../types';

interface DoctorSectionProps {
  currentLang: SupportedLanguage;
  onSelectDoctor: (doctorName: string) => void;
  doctors: Doctor[];
}

export const DoctorSection: React.FC<DoctorSectionProps> = ({
  currentLang,
  onSelectDoctor,
  doctors,
}) => {
  const t = translations[currentLang];

  return (
    <section id="doctors" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
            <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
            <span>Senior Medical Faculty</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Consult With Western Maharashtra’s Renowned Specialists
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Our panel comprises fellowship-trained surgeons and professors with decades of clinical excellence in complex tertiary operations.
          </p>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-slate-50/70 hover:bg-white rounded-2xl p-5 border border-slate-200 hover:border-teal-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="relative mb-4">
                  {doctor.imageUrl ? (
                    <img
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      className="w-20 h-20 rounded-2xl object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-teal-100 text-teal-800 font-bold text-lg flex items-center justify-center border border-teal-200">
                      {doctor.avatarText || 'DR'}
                    </div>
                  )}
                  {doctor.verified && (
                    <span className="absolute bottom-0 left-16 p-1 bg-teal-600 text-white rounded-full shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                  {doctor.name}
                </h3>
                <div className="text-xs font-semibold text-teal-700 mt-1">
                  {doctor.specialty}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {doctor.qualification}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>{doctor.yearsExperience}</span>
                  </div>
                  <div className="text-[11px] text-slate-700 font-medium">
                    {doctor.hospital}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Languages className="w-3 h-3 text-slate-400" />
                    <span>{doctor.languages.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/80">
                <button
                  onClick={() => onSelectDoctor(doctor.name)}
                  className="w-full py-2 px-3 bg-white hover:bg-teal-600 hover:text-white border border-slate-200 hover:border-teal-600 text-slate-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
