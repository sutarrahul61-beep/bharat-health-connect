import React from 'react';
import {
  FileSearch,
  Stethoscope,
  Receipt,
  FileCheck,
  PlaneTakeoff,
  Car,
  Building,
  Activity,
  Bed,
  PlaneLanding,
  Video,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { SupportedLanguage, translations } from '../data/translations';

interface PatientJourneyProps {
  currentLang: SupportedLanguage;
}

const journeyStages = [
  { step: '01', title: 'Clinical Inquiry', desc: 'Secure report upload and patient history submission', icon: FileSearch },
  { step: '02', title: 'Specialist Evaluation', desc: 'Panel doctor case review within 4 to 12 hours', icon: Stethoscope },
  { step: '03', title: 'Formal Estimate', desc: 'All-inclusive transparent hospital treatment quote', icon: Receipt },
  { step: '04', title: 'Visa Letter (MED)', desc: 'Official Indian Embassy Medical Visa invitation issued', icon: FileCheck },
  { step: '05', title: 'Travel Scheduling', desc: 'Flight and executive train reservations to Miraj', icon: PlaneTakeoff },
  { step: '06', title: 'Airport Chauffeur', desc: 'Warm reception at Mumbai / Pune / Goa / Kolhapur', icon: Car },
  { step: '07', title: 'Admission & Tests', desc: 'Direct hospital admission with personal coordinator', icon: Building },
  { step: '08', title: 'Surgery / Treatment', desc: 'Intervention by senior surgeons in modular OTs', icon: Activity },
  { step: '09', title: 'Post-Op Recovery', desc: 'Specialist nursing, physiotherapy, and dietary care', icon: Bed },
  { step: '10', title: 'Discharge & Transit', desc: 'Fit-to-fly clearance, medical summary & return travel', icon: PlaneLanding },
  { step: '11', title: 'Digital Follow-Up', desc: 'Post-return teleconsultations with your operating doctor', icon: Video },
];

export const PatientJourney: React.FC<PatientJourneyProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section id="patient-journey" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-teal-600" />
            <span>Structured Clinical Protocol</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            The 11-Stage International Patient Journey
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            A transparent, predictable roadmap designed to remove all anxiety and ensure continuous medical supervision.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {journeyStages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      Stage {stage.step}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {stage.title}
                  </h4>
                  <p className="mt-1 text-[11px] text-slate-500 leading-snug">
                    {stage.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
