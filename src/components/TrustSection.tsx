import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  FileCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { SupportedLanguage, translations } from '../data/translations';

interface TrustSectionProps {
  currentLang: SupportedLanguage;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section id="trust" className="py-12 sm:py-16 bg-slate-100/70 border-b border-slate-200/80 text-xs text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Ethical Healthcare Facilitation Standard & Legal Disclaimer
              </h3>
              <p className="text-xs text-slate-500">
                Operating strictly under Indian healthcare compliance and medical tourism ethics guidelines.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                Medical Facilitator Role
              </h4>
              <p>
                Bharat Health Connect acts solely as an independent medical travel facilitator. We assist patients in obtaining medical opinions, hospital coordination, and travel support. We do not provide clinical diagnosis or perform medical procedures.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                Direct Hospital Billing
              </h4>
              <p>
                All medical fees, surgery packages, diagnostic tests, and hospitalization charges are billed directly by accredited hospitals. Bharat Health Connect never collects surgery fees or marks up hospital quotes.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                Data Privacy & HIPAA Compliance
              </h4>
              <p>
                Your diagnostic reports, MRI/CT scans, and confidential medical history are encrypted in transit and shared exclusively with qualified consultant doctors on our verified panel for clinical opinion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
