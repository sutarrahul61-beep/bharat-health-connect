import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Globe,
  Award,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { SupportedLanguage, translations } from '../data/translations';
import { Hospital } from '../types';

interface HospitalNetworkProps {
  currentLang: SupportedLanguage;
  onSelectHospital: (hospitalName: string) => void;
  hospitals: Hospital[];
}

export const HospitalNetwork: React.FC<HospitalNetworkProps> = ({
  currentLang,
  onSelectHospital,
  hospitals,
}) => {
  const t = translations[currentLang];
  const [filterCity, setFilterCity] = useState<'All' | 'Miraj' | 'Sangli'>('All');

  const filteredHospitals = hospitals.filter((h) => {
    if (filterCity === 'All') return true;
    return h.city.toLowerCase() === filterCity.toLowerCase();
  });

  return (
    <section id="hospitals" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
            <Building2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Verified Healthcare Infrastructure</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Accredited Hospital Network in Miraj & Sangli
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            From historic tertiary teaching hospitals founded in the 19th century to modern superspeciality cardiac and robotic surgical suites.
          </p>

          {/* City Filter Pills */}
          <div className="mt-6 flex justify-center gap-2">
            {(['All', 'Miraj', 'Sangli'] as const).map((city) => (
              <button
                key={city}
                onClick={() => setFilterCity(city)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filterCity === city
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {city === 'All' ? 'All Partner Centers' : `${city} Hospitals`}
              </button>
            ))}
          </div>
        </div>

        {/* Hospital Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-teal-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {hospital.imageUrl && (
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={hospital.imageUrl}
                      alt={hospital.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      {hospital.isPartner ? (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-600 text-white shadow-xs">
                          Formal Partner
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800 text-slate-200 shadow-xs">
                          Affiliated Center
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 mb-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{hospital.city}, Maharashtra</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                    {hospital.name}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {hospital.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    <div className="flex items-start gap-1.5">
                      <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span className="font-medium text-slate-800">{hospital.accreditation}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {hospital.specialties.slice(0, 3).map((spec, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectHospital(hospital.name)}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Select & Request Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
