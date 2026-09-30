import React from 'react';
import {
  Train,
  Plane,
  Building,
  Hotel,
  Languages,
  ShieldCheck,
  MapPin,
  Clock,
} from 'lucide-react';
import { SupportedLanguage, translations } from '../data/translations';

interface TravelStayProps {
  currentLang: SupportedLanguage;
}

export const TravelStay: React.FC<TravelStayProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section id="travel-stay" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
            <Plane className="w-3.5 h-3.5 text-teal-600" />
            <span>Transit & Accommodation Logistics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Getting to Miraj & Comfortable Stays
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Miraj Junction is an A-grade railway crossroads connecting major hubs. We handle all ground transit and verified patient accommodations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 1. Airport Access */}
          <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Airport Connectivity
            </h3>
            <ul className="mt-4 space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-900 min-w-28">Kolhapur (KLH):</span>
                <span>45 km (~50 mins drive) - Domestic flights from Mumbai, Bengaluru, Hyderabad.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-900 min-w-28">Belagavi (IXG):</span>
                <span>85 km (~90 mins drive) - Multiple daily flights across India.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-900 min-w-28">Pune Intl (PNQ):</span>
                <span>225 km (~4.5 hrs via NH-48 expressway) - Major international links.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-900 min-w-28">Goa Intl (GOI):</span>
                <span>210 km (~4 hrs) - Direct Gulf & European charter flights.</span>
              </li>
            </ul>
          </div>

          {/* 2. Direct Train Access */}
          <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
              <Train className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Miraj Railway Junction
            </h3>
            <ul className="mt-4 space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-900 min-w-24">Vande Bharat:</span>
                <span>High-speed executive express connecting Pune and Miraj in under 4 hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-900 min-w-24">Direct Trains:</span>
                <span>Koyna Express, Sahyadri Express, Mahalaxmi Express from Mumbai CSMT directly to Miraj.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-900 min-w-24">Station Pickup:</span>
                <span>Coordinators meet patients at platform with wheelchairs and medical vans.</span>
              </li>
            </ul>
          </div>

          {/* 3. Patient Accommodation */}
          <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
              <Hotel className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Hotels & Serviced Stays
            </h3>
            <ul className="mt-4 space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-900 min-w-24">Guest Houses:</span>
                <span>Budget options (₹1,000–₹1,800/night) adjacent to Wanless & Sevasadan hospitals.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-900 min-w-24">3-Star / 4-Star:</span>
                <span>Comfortable hotels in Miraj & Sangli with kitchenettes for family attendants.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-900 min-w-24">Dietary Needs:</span>
                <span>Arrangements for Halal, vegetarian, and patient-specific low-sodium meal delivery.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
