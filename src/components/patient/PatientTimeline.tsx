import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Stethoscope,
  Building2,
  Calendar,
  Plane,
  FileText,
  HeartHandshake,
  ChevronRight,
  Info,
} from 'lucide-react';
import { TreatmentTimelineStageInfo } from '../../types/portalTypes';

interface PatientTimelineProps {
  stages: TreatmentTimelineStageInfo[];
  patientTreatment: string;
  assignedHospital: string;
}

export const PatientTimeline: React.FC<PatientTimelineProps> = ({
  stages,
  patientTreatment,
  assignedHospital,
}) => {
  const [selectedStageId, setSelectedStageId] = useState<string>(
    stages.find((s) => s.status === 'current')?.id || stages[0].id
  );

  const selectedStage = stages.find((s) => s.id === selectedStageId) || stages[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              Treatment Journey & Stage Tracker
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Live Medical Workflow
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tracking your clinical facilitation across all 11 stages from initial enquiry to post-operative follow-up.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-right">
          <div>Treatment: <strong className="text-slate-800">{patientTreatment}</strong></div>
          <div>Hospital: <strong className="text-teal-700">{assignedHospital}</strong></div>
        </div>
      </div>

      {/* Main Timeline Interactive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: 11 Stages Vertical Interactive Flow */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="space-y-3">
            {stages.map((stage, idx) => {
              const isCompleted = stage.status === 'completed';
              const isCurrent = stage.status === 'current';
              const isSelected = stage.id === selectedStageId;

              return (
                <div
                  key={stage.id}
                  onClick={() => setSelectedStageId(stage.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? 'bg-teal-50/80 border-teal-500 shadow-sm ring-2 ring-teal-500/20'
                      : isCurrent
                      ? 'bg-amber-50/50 border-amber-300'
                      : isCompleted
                      ? 'bg-slate-50/70 border-slate-200 hover:border-teal-200'
                      : 'bg-white border-slate-100 opacity-60 hover:opacity-100'
                  }`}
                >
                  {/* Step Number / Icon */}
                  <div className="shrink-0 mt-0.5">
                    {isCompleted ? (
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                    ) : isCurrent ? (
                      <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs shadow-md animate-pulse">
                        {stage.stepNumber}
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-semibold text-xs">
                        {stage.stepNumber}
                      </div>
                    )}
                  </div>

                  {/* Stage Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">
                        Stage {stage.stepNumber}: {stage.label}
                      </h4>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : isCurrent
                            ? 'bg-teal-100 text-teal-800 font-bold'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {isCompleted ? 'COMPLETED' : isCurrent ? 'CURRENT ACTIVE STAGE' : 'UPCOMING'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {stage.description}
                    </p>

                    {stage.completedDate && (
                      <div className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>Completed on: {stage.completedDate}</span>
                      </div>
                    )}
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 self-center" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Stage Detail Spotlight Card */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 sticky top-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                Stage {selectedStage.stepNumber} of 11 Details
              </span>
              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                  selectedStage.status === 'completed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : selectedStage.status === 'current'
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {selectedStage.status.toUpperCase()}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {selectedStage.label}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {selectedStage.description}
              </p>
            </div>

            {selectedStage.notes && (
              <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-950">
                <strong className="block text-teal-800 mb-0.5">Coordinator Note:</strong>
                {selectedStage.notes}
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Hospital Assigned: <strong>{assignedHospital}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Speciality: <strong>{patientTreatment}</strong></span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 leading-relaxed flex items-start gap-2">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                <strong>Workflow Security Notice:</strong> Treatment stages are officially updated by the hospital board and Bharat Health Connect coordinators. You cannot manually modify stages to maintain clinical integrity.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
