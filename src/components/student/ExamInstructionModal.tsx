import React, { useState } from 'react';
import { Exam, User } from '../../types';
import {
  Clock,
  HelpCircle,
  Award,
  AlertTriangle,
  CheckCircle2,
  FileText,
  ShieldCheck,
  X
} from 'lucide-react';

interface ExamInstructionModalProps {
  exam: Exam;
  student: User;
  isOpen: boolean;
  onClose: () => void;
  onConfirmStart: () => void;
}

export const ExamInstructionModal: React.FC<ExamInstructionModalProps> = ({
  exam,
  student,
  isOpen,
  onClose,
  onConfirmStart
}) => {
  const [agreed, setAgreed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto no-print">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/15 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">10वी ONLINE EXAM - Instructions</h2>
              <p className="text-xs text-blue-100">{exam.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Exam Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div className="space-y-0.5">
              <span className="text-slate-700 block font-medium">Subject</span>
              <span className="font-bold text-slate-800">{exam.subjectName}</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-700 block font-medium">Duration</span>
              <span className="font-bold text-blue-600 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {exam.durationMinutes} Minutes
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-700 block font-medium">Questions</span>
              <span className="font-bold text-slate-800">{exam.numberOfQuestions} MCQs</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-700 block font-medium">Total Marks</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> {exam.totalMarks} (Pass: {exam.passingMarks})
              </span>
            </div>
          </div>

          {/* Student details bar */}
          <div className="flex items-center justify-between text-xs px-3 py-2 bg-blue-50/50 rounded-lg border border-blue-100 text-slate-700">
            <div>
              Student: <strong className="text-blue-900">{student.name}</strong> ({student.id})
            </div>
            <div>
              Medium: <strong className="text-slate-900">{student.medium}</strong>
            </div>
          </div>

          {/* Guidelines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Important Examination Guidelines (परीक्षेचे नियम):
            </h4>
            <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
              <li>
                <strong>Automatic Saving:</strong> Every response you select is immediately saved. You do not risk losing your answers if you navigate between questions.
              </li>
              <li>
                <strong>Timer & Auto-Submit:</strong> The examination countdown will start as soon as you click &quot;Start Exam&quot;. If the timer reaches 00:00, the test will automatically submit.
              </li>
              <li>
                <strong>Timer Persistence:</strong> The timer runs continuously. Accidental page refresh will NOT reset your timer; remaining time will be preserved.
              </li>
              <li>
                <strong>Question Palette Indicators:</strong>
                <div className="grid grid-cols-2 gap-2 mt-1.5 pl-2 text-[11px]">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <span className="w-4 h-4 bg-emerald-100 text-emerald-700 border border-emerald-300 rounded flex items-center justify-center font-bold text-[10px]">✓</span> Answered
                  </span>
                  <span className="flex items-center gap-1 text-slate-600">
                    <span className="w-4 h-4 bg-slate-100 text-slate-600 border border-slate-300 rounded flex items-center justify-center font-bold text-[10px]">2</span> Unanswered
                  </span>
                  <span className="flex items-center gap-1 text-purple-700">
                    <span className="w-4 h-4 bg-purple-100 text-purple-700 border border-purple-300 rounded flex items-center justify-center font-bold text-[10px]">?</span> Marked for Review
                  </span>
                  <span className="flex items-center gap-1 text-blue-700">
                    <span className="w-4 h-4 bg-blue-600 text-white rounded flex items-center justify-center font-bold text-[10px]">●</span> Current Question
                  </span>
                </div>
              </li>
              {exam.negativeMarking ? (
                <li className="text-rose-600 font-semibold">
                  <strong>Negative Marking:</strong> Each wrong answer deducts {exam.negativeMarkValue} mark(s). Unanswered questions carry 0 penalty.
                </li>
              ) : (
                <li className="text-emerald-700 font-semibold">
                  <strong>No Negative Marking:</strong> There is no penalty for incorrect answers.
                </li>
              )}
              {exam.maxAttempts === 1 && (
                <li className="text-amber-800">
                  <strong>Single Attempt:</strong> Once submitted, you cannot take this exam again.
                </li>
              )}
            </ul>
          </div>

          {/* Agreement Checkbox */}
          <div className="pt-2 border-t border-slate-200">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                id="agree-checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span className="text-xs text-slate-700 leading-relaxed font-medium">
                I have read, understood and agree to follow all the Maharashtra SSC Examination guidelines. I am ready to begin the test.
              </span>
            </label>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            id="start-exam-confirm-btn"
            disabled={!agreed}
            onClick={onConfirmStart}
            className={`px-5 py-2 text-xs font-bold rounded-lg shadow-xs transition-all ${
              agreed
                ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Start Exam Now
          </button>
        </div>
      </div>
    </div>
  );
};
