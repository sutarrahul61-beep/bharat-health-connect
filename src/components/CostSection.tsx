import React from 'react';
import {
  Wallet,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';
import { SupportedLanguage, translations } from '../data/translations';
import { treatmentEstimatesData } from '../data/mockData';

interface CostSectionProps {
  currentLang: SupportedLanguage;
  onRequestEstimateClick: () => void;
}

export const CostSection: React.FC<CostSectionProps> = ({
  currentLang,
  onRequestEstimateClick,
}) => {
  const t = translations[currentLang];

  return (
    <section id="cost" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Honest, Transparent Healthcare Pricing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Transparent Treatment Estimates
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Compare average procedure costs in Miraj versus Tier-1 metropolitan centers. We never charge broker commissions or mark up hospital bills.
          </p>
        </div>

        {/* Pricing Table */}
        <div className="overflow-x-auto bg-slate-50/80 rounded-2xl border border-slate-200 shadow-xs mb-8">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-4 px-4 sm:px-6">Treatment / Procedure</th>
                <th className="py-4 px-4 sm:px-6 text-teal-800 bg-teal-50/80">Miraj Network Cost</th>
                <th className="py-4 px-4 sm:px-6 text-slate-500">Tier-1 Metro Average</th>
                <th className="py-4 px-4 sm:px-6 text-emerald-700">Estimated Savings</th>
                <th className="py-4 px-4 sm:px-6">Hospital Stay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 text-slate-800">
              {treatmentEstimatesData.map((row, idx) => (
                <tr key={idx} className="hover:bg-white transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-semibold text-slate-900">
                    {row.treatment}
                  </td>
                  <td className="py-4 px-4 sm:px-6 font-bold text-teal-700 bg-teal-50/40">
                    {row.mirajCost}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-slate-500 line-through">
                    {row.metroCost}
                  </td>
                  <td className="py-4 px-4 sm:px-6">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {row.savings}
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-slate-600">
                    {row.stay}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Disclaimer Note */}
        <div className="p-4 sm:p-5 bg-amber-50 rounded-2xl border border-amber-200/80 text-amber-900 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold">Transparent Billing Policy:</span>
            <p className="text-amber-800 leading-relaxed">
              Costs shown above are historical benchmark package ranges for general and semi-private categories. Final itemized quotes depend on patient co-morbidities, pre-operative lab work, chosen implant brand (e.g. US FDA-approved knee/heart implants), and room category. All bills are settled directly with the hospital cash desk.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onRequestEstimateClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs cursor-pointer"
          >
            <span>Request a Customized Written Estimate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
