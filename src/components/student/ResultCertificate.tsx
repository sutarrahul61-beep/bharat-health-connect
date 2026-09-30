import React from 'react';
import { ExamResultRecord } from '../../types';
import { Award, Printer, ArrowLeft, CheckCircle2, XCircle, GraduationCap } from 'lucide-react';

interface ResultCertificateProps {
  result: ExamResultRecord;
  onBack: () => void;
}

export const ResultCertificate: React.FC<ResultCertificateProps> = ({ result, onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  const isPass = result.result === 'PASS';

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6">
      {/* Top Action Bar (hidden when printing) */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between no-print">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Result Overview</span>
        </button>

        <button
          id="print-certificate-btn"
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-xs"
        >
          <Printer className="w-4 h-4" />
          <span>PRINT / SAVE AS PDF</span>
        </button>
      </div>

      {/* A4 OFFICIAL PRINTABLE MARKSHEET */}
      <div className="max-w-4xl mx-auto bg-white border-2 border-slate-800 p-8 sm:p-12 shadow-xl rounded-none text-slate-900 font-sans print:p-6 print:border print:shadow-none print:max-w-full">
        {/* State Board Header */}
        <div className="text-center border-b-2 border-slate-800 pb-6 mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full border-2 border-slate-800 flex items-center justify-center font-bold text-xl text-blue-900">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 uppercase">
                10वी ONLINE EXAM
              </h1>
              <h2 className="text-xs sm:text-sm font-bold text-slate-700">
                MAHARASHTRA STATE BOARD OF SECONDARY & HIGHER SECONDARY EDUCATION
              </h2>
            </div>
          </div>
          <div className="inline-block px-4 py-1 mt-1 bg-slate-100 border border-slate-300 text-xs font-bold uppercase tracking-widest text-slate-800">
            Official Examination Result & Marksheet
          </div>
        </div>

        {/* Student & Examination Details Grid */}
        <div className="grid grid-cols-2 gap-4 border border-slate-300 p-4 mb-6 text-xs bg-slate-50/50">
          <div className="space-y-1.5">
            <div>
              <span className="text-slate-500 font-medium">Student Name: </span>
              <strong className="text-slate-900 text-sm">{result.studentName}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Student ID: </span>
              <strong className="text-blue-900 font-mono text-sm">{result.studentId}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">School Name: </span>
              <span className="text-slate-800 font-semibold">{result.schoolName}</span>
            </div>
          </div>

          <div className="space-y-1.5 border-l border-slate-200 pl-4">
            <div>
              <span className="text-slate-500 font-medium">Examination: </span>
              <strong className="text-slate-900">{result.examTitle}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Subject: </span>
              <strong className="text-slate-900">{result.subjectName} ({result.medium} Medium)</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Date & Time Taken: </span>
              <span className="text-slate-800">{result.date} ({result.timeTaken})</span>
            </div>
          </div>
        </div>

        {/* Performance Summary Matrix */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
            Performance Breakdown
          </h3>
          <table className="w-full border-collapse border border-slate-300 text-xs text-center">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold">
                <th className="border border-slate-300 p-2.5">Total Questions</th>
                <th className="border border-slate-300 p-2.5">Attempted</th>
                <th className="border border-slate-300 p-2.5 text-emerald-800">Correct</th>
                <th className="border border-slate-300 p-2.5 text-rose-800">Incorrect</th>
                <th className="border border-slate-300 p-2.5 text-slate-700">Unanswered</th>
                <th className="border border-slate-300 p-2.5">Maximum Marks</th>
                <th className="border border-slate-300 p-2.5">Marks Obtained</th>
                <th className="border border-slate-300 p-2.5">Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr className="font-semibold text-slate-800">
                <td className="border border-slate-300 p-3">{result.totalQuestions}</td>
                <td className="border border-slate-300 p-3">{result.attempted}</td>
                <td className="border border-slate-300 p-3 font-bold text-emerald-600">{result.correct}</td>
                <td className="border border-slate-300 p-3 text-rose-600">{result.incorrect}</td>
                <td className="border border-slate-300 p-3 text-slate-400">{result.unanswered}</td>
                <td className="border border-slate-300 p-3">{result.totalMarks}</td>
                <td className="border border-slate-300 p-3 font-extrabold text-blue-900 text-sm">
                  {result.marksObtained}
                </td>
                <td className="border border-slate-300 p-3 font-bold">{result.percentage}%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Final Grade / Status Banner */}
        <div className="border-2 border-slate-800 p-4 mb-8 flex items-center justify-between bg-slate-50">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">Final Evaluation Result</div>
            <div className="text-2xl font-black mt-0.5 tracking-tight flex items-center gap-2">
              {isPass ? (
                <span className="text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-6 h-6" /> PASS
                </span>
              ) : (
                <span className="text-rose-700 flex items-center gap-1.5">
                  <XCircle className="w-6 h-6" /> FAIL
                </span>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-500 font-medium">Grade / Percentage</div>
            <div className="text-xl font-bold text-slate-900">{result.percentage}%</div>
          </div>
        </div>

        {/* Signatures & Seal */}
        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200 text-xs text-center">
          <div>
            <div className="h-10"></div>
            <div className="border-t border-slate-400 pt-1 font-semibold text-slate-700">
              Candidate Signature
            </div>
          </div>
          <div>
            <div className="w-16 h-16 mx-auto rounded-full border border-dashed border-slate-400 flex items-center justify-center text-[10px] text-slate-400 font-bold">
              OFFICIAL SEAL
            </div>
            <div className="mt-1 font-semibold text-slate-700">Board Seal</div>
          </div>
          <div>
            <div className="h-10 flex items-center justify-center font-serif text-slate-800 italic">
              S. V. Patil
            </div>
            <div className="border-t border-slate-400 pt-1 font-semibold text-slate-700">
              Headmaster / Controller of Exam
            </div>
          </div>
        </div>

        {/* Official Footer */}
        <div className="mt-8 pt-4 border-t border-slate-200 text-center text-[11px] text-slate-400">
          Generated by 10वी ONLINE EXAM — Maharashtra State Secondary School Certificate Examination System
        </div>
      </div>
    </div>
  );
};
