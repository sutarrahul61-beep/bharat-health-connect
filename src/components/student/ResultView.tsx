import React, { useState } from 'react';
import { ExamResultRecord, Exam } from '../../types';
import { examStore } from '../../services/api';
import { ResultCertificate } from './ResultCertificate';
import {
  CheckCircle2,
  XCircle,
  Award,
  Clock,
  Printer,
  FileText,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  HelpCircle,
  Share2
} from 'lucide-react';

interface ResultViewProps {
  result: ExamResultRecord;
  onBackToDashboard: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ result, onBackToDashboard }) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [showReview, setShowReview] = useState(true);

  const exam: Exam | undefined = examStore.getExamById(result.examId);
  const canShowAnswers = exam ? exam.showCorrectAnswers : true;
  const isPass = result.result === 'PASS';

  if (showCertificate) {
    return <ResultCertificate result={result} onBack={() => setShowCertificate(false)} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Top action header */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            id="open-marksheet-btn"
            onClick={() => setShowCertificate(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Official A4 Marksheet / Print</span>
          </button>
        </div>
      </div>

      {/* Main Scorecard Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        {/* Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">
                SSC 10th Standard
              </span>
              <span className="text-xs text-slate-500 font-medium">{result.subjectName}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {result.examTitle}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Student: <strong className="text-slate-800">{result.studentName}</strong> ({result.studentId}) • {result.schoolName}
            </p>
          </div>

          {/* PASS / FAIL BADGE */}
          <div className="text-left sm:text-right">
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl font-extrabold text-sm sm:text-base border shadow-xs ${
                isPass
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-rose-50 text-rose-700 border-rose-300'
              }`}
            >
              {isPass ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              <span>{isPass ? 'PASS' : 'FAIL'}</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">{result.date}</div>
          </div>
        </div>

        {/* Score & Percentage Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <span className="text-xs text-slate-500 font-medium block">Marks Obtained</span>
            <div className="text-2xl font-black text-blue-600 mt-0.5">
              {result.marksObtained}{' '}
              <span className="text-xs text-slate-400 font-normal">/ {result.totalMarks}</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <span className="text-xs text-slate-500 font-medium block">Percentage</span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">
              {result.percentage}%
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <span className="text-xs text-slate-500 font-medium block">Time Taken</span>
            <div className="text-lg font-bold text-slate-700 mt-1 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{result.timeTaken}</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <span className="text-xs text-slate-500 font-medium block">Accuracy Rate</span>
            <div className="text-lg font-bold text-emerald-600 mt-1">
              {result.attempted > 0
                ? `${Math.round((result.correct / result.attempted) * 100)}%`
                : '0%'}
            </div>
          </div>
        </div>

        {/* Question Stats Row */}
        <div className="grid grid-cols-5 gap-2 p-3 bg-slate-50/70 border border-slate-100 rounded-xl text-center text-xs">
          <div>
            <div className="font-bold text-slate-800 text-sm">{result.totalQuestions}</div>
            <div className="text-[11px] text-slate-500">Total Qs</div>
          </div>
          <div>
            <div className="font-bold text-blue-700 text-sm">{result.attempted}</div>
            <div className="text-[11px] text-slate-500">Attempted</div>
          </div>
          <div>
            <div className="font-bold text-emerald-600 text-sm">{result.correct}</div>
            <div className="text-[11px] text-slate-500">Correct</div>
          </div>
          <div>
            <div className="font-bold text-rose-600 text-sm">{result.incorrect}</div>
            <div className="text-[11px] text-slate-500">Incorrect</div>
          </div>
          <div>
            <div className="font-bold text-slate-500 text-sm">{result.unanswered}</div>
            <div className="text-[11px] text-slate-500">Unanswered</div>
          </div>
        </div>
      </div>

      {/* Answer Key Review (if allowed by Admin settings) */}
      {canShowAnswers ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Answer Review</h3>
              <p className="text-xs text-slate-500">Detailed question evaluation with correct answers</p>
            </div>
            <button
              onClick={() => setShowReview(!showReview)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>{showReview ? 'Collapse' : 'Expand All'}</span>
              {showReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {showReview && (
            <div className="space-y-4 pt-2">
              {result.questionDetails && result.questionDetails.length > 0 ? (
                result.questionDetails.map((qd, index) => {
                  const isCorrect = qd.isCorrect;
                  const isAnswered = Boolean(qd.studentAnswer);

                  return (
                    <div
                      key={qd.questionId || index}
                      className={`p-4 rounded-xl border transition-colors ${
                        isCorrect
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : isAnswered
                          ? 'bg-rose-50/40 border-rose-200'
                          : 'bg-slate-50/60 border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <span className="font-bold text-xs text-slate-800">
                          Q{index + 1}. {qd.question}
                        </span>
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded shrink-0 ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-800'
                              : isAnswered
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isCorrect ? `+${qd.marksAwarded} Marks` : isAnswered ? `${qd.marksAwarded} Marks` : '0 Marks'}
                        </span>
                      </div>

                      {/* Student vs Correct Answer */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mt-3">
                        <div className="p-2 rounded-lg bg-white border border-slate-200 flex items-center gap-2">
                          <span className="text-slate-500 font-medium">Your Answer:</span>
                          <strong className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                            {qd.studentAnswer || 'Not Answered'}
                          </strong>
                          {isCorrect && <Check className="w-3.5 h-3.5 text-emerald-600 ml-auto" />}
                          {isAnswered && !isCorrect && <X className="w-3.5 h-3.5 text-rose-600 ml-auto" />}
                        </div>

                        <div className="p-2 rounded-lg bg-white border border-slate-200 flex items-center gap-2">
                          <span className="text-slate-500 font-medium">Correct Answer:</span>
                          <strong className="text-emerald-700">{qd.correctAnswer}</strong>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-auto" />
                        </div>
                      </div>

                      {/* Explanation */}
                      {qd.explanation && (
                        <div className="mt-2.5 text-[11px] text-slate-600 bg-white/80 p-2 rounded-lg border border-slate-100">
                          <strong>Explanation: </strong> {qd.explanation}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-6 text-xs text-slate-500">
                  No individual question review available.
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center text-xs text-slate-600">
          The administrator has configured this exam to show marks only. Detailed answer key review is hidden.
        </div>
      )}
    </div>
  );
};
