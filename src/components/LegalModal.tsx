import React from 'react';
import { X, ShieldAlert, FileText, Lock } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'disclaimer' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative my-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2 min-w-0 pr-3">
            {type === 'privacy' && <Lock className="w-5 h-5 text-teal-400 shrink-0" />}
            {type === 'terms' && <FileText className="w-5 h-5 text-teal-400 shrink-0" />}
            {type === 'disclaimer' && <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />}
            <h2 className="text-base sm:text-lg font-bold text-white truncate">
              {type === 'privacy' && 'Privacy Policy & Medical Data Protection'}
              {type === 'terms' && 'Terms of Healthcare Facilitation Service'}
              {type === 'disclaimer' && 'Medical & Regulatory Disclaimer'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8 space-y-4 overflow-y-auto flex-1 min-h-0 text-xs sm:text-sm text-slate-600 leading-relaxed custom-scrollbar">
          {type === 'privacy' && (
            <>
              <h3 className="text-sm font-bold text-slate-900">1. Medical Information Confidentiality</h3>
              <p>
                Bharat Health Connect adheres strictly to confidentiality protocols regarding patient records, diagnostic scans, and personal identifiers. Any reports shared via our website forms, email, or WhatsApp are used solely to facilitate medical review by qualified clinicians and accredited hospital departments in India.
              </p>
              <h3 className="text-sm font-bold text-slate-900">2. Sharing with Treating Institutions</h3>
              <p>
                By providing your medical history, you grant informed authorization for our patient concierge team to forward relevant diagnostic summaries to licensed hospitals, doctors, and diagnostic centers for preliminary evaluation, quotation estimation, and scheduling.
              </p>
              <h3 className="text-sm font-bold text-slate-900">3. Non-Commercial Data Clause</h3>
              <p>
                We do not sell, lease, or monetize patient records or contact numbers to third-party telemarketing companies. Data retention adheres to ethical healthcare communication guidelines.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <h3 className="text-sm font-bold text-slate-900">1. Nature of Facilitation</h3>
              <p>
                Bharat Health Connect operates as an independent patient-concierge and healthcare liaison service based in India. We connect international and outstation patients with verified hospitals and clinical practitioners.
              </p>
              <h3 className="text-sm font-bold text-slate-900">2. Clinical Autonomy</h3>
              <p>
                All clinical assessments, examinations, diagnoses, surgeries, therapies, and prescriptions remain under the exclusive professional jurisdiction of licensed doctors and the hospital administration. We do not practice medicine or issue independent clinical directions.
              </p>
              <h3 className="text-sm font-bold text-slate-900">3. Hospital Charges & Invoicing</h3>
              <p>
                All procedural charges, hospital stay fees, and surgical quotes are determined and billed directly by the treating hospital institutions. Cost estimations shared prior to travel are indicative and contingent on in-person clinical examination.
              </p>
            </>
          )}

          {type === 'disclaimer' && (
            <>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 font-semibold text-xs">
                MANDATORY REGULATORY DECLARATION:
                "We are a healthcare facilitation and coordination service. We do not replace medical professionals or provide medical diagnosis."
              </div>
              <h3 className="text-sm font-bold text-slate-900">1. Not An Emergency Service</h3>
              <p>
                Our service is engineered for planned medical travel and elective/semi-urgent consultations. If you or a patient in your care is experiencing a life-threatening medical emergency, call your local ambulance/emergency services or visit the nearest hospital emergency room immediately.
              </p>
              <h3 className="text-sm font-bold text-slate-900">2. No Guaranteed Clinical Outcomes</h3>
              <p>
                Medical science involves biological complexities and individualized physiological responses. We neither advertise nor guarantee specific surgical outcomes or cure rates.
              </p>
              <h3 className="text-sm font-bold text-slate-900">3. Immigration & Travel Discretion</h3>
              <p>
                Visa issuance (e-Medical / MED Visa) remains under the sovereign authority of the Government of India and consular embassies. Our assistance is confined to liaising with hospitals for formal invitation documentation.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
};
