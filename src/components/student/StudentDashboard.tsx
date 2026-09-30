import React, { useState } from 'react';
import { User, Exam, ExamStatus, ExamResultRecord } from '../../types';
import { examStore } from '../../services/api';
import {
  Clock,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Play,
  FileText,
  Printer,
  ChevronRight,
  School,
  Sparkles,
  History
} from 'lucide-react';

interface StudentDashboardProps {
  student: User;
  onStartExam: (exam: Exam) => void;
  onViewResult: (result: ExamResultRecord) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  student,
  onStartExam,
  onViewResult
}) => {
  const [activeTab, setActiveTab] = useState<'available' | 'history'>('available');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Available' | 'Upcoming' | 'Completed' | 'Expired'>('All');

  const allExams = examStore.getExams().filter((e) => e.isPublished);
  const studentResults = examStore.getStudentResults(student.id);

  // Helper to determine status for this specific student
  const getExamStatus = (exam: Exam): ExamStatus => {
    const isCompleted = studentResults.some((r) => r.examId === exam.id);
    if (isCompleted) return 'Completed';

    const now = new Date();
    const start = new Date(`${exam.startDate}T${exam.startTime}`);
    const end = new Date(`${exam.endDate}T${exam.endTime}`);

    if (now < start) return 'Upcoming';
    if (now > end) return 'Expired';
    return 'Available';
  };

  const filteredExams = allExams.filter((exam) => {
    const status = getExamStatus(exam);
    if (statusFilter === 'All') return true;
    return status === statusFilter;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* 1. SIMPLE STUDENT PROFILE HEADER */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
              10th Standard SSC
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {student.medium} Medium • Div {student.division}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {student.name}
          </h1>
          <p className="text-xs text-slate-500 flex items-center gap-2 mt-1">
            <School className="w-3.5 h-3.5 text-slate-400" />
            <span>{student.schoolName}, {student.district}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-left">
            <span className="text-[10px] uppercase font-bold text-slate-400 block leading-none">
              Student ID
            </span>
            <span className="text-sm font-mono font-bold text-blue-700">{student.id}</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-left">
            <span className="text-[10px] uppercase font-bold text-slate-400 block leading-none">
              Completed Tests
            </span>
            <span className="text-sm font-bold text-slate-800">{studentResults.length}</span>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION TABS (Available Exams vs Exam History) */}
      <div className="flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setActiveTab('available')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'available'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Online Examinations</span>
            <span className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-full">
              {allExams.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'history'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Completed History</span>
            <span className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-full">
              {studentResults.length}
            </span>
          </button>
        </div>

        {/* Filter Badges (when on available tab) */}
        {activeTab === 'available' && (
          <div className="hidden sm:flex items-center gap-1.5 pb-2 text-xs">
            {(['All', 'Available', 'Upcoming', 'Completed', 'Expired'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  statusFilter === st
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3. AVAILABLE EXAMS VIEW */}
      {activeTab === 'available' && (
        <div className="space-y-4">
          {filteredExams.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 text-sm">
              No examinations matching the selected status ({statusFilter}).
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredExams.map((exam) => {
                const status = getExamStatus(exam);
                const existingResult = studentResults.find((r) => r.examId === exam.id);
                const isCompleted = status === 'Completed';
                const isAvailable = status === 'Available';
                const isUpcoming = status === 'Upcoming';
                const isExpired = status === 'Expired';

                let statusBadgeClass = 'bg-slate-100 text-slate-700 border-slate-200';
                if (isAvailable) statusBadgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                if (isUpcoming) statusBadgeClass = 'bg-blue-50 text-blue-700 border-blue-200';
                if (isCompleted) statusBadgeClass = 'bg-purple-50 text-purple-700 border-purple-200';
                if (isExpired) statusBadgeClass = 'bg-rose-50 text-rose-700 border-rose-200';

                return (
                  <div
                    key={exam.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow p-5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top status & subject */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                          {exam.subjectName}
                        </span>
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${statusBadgeClass}`}
                        >
                          {status}
                        </span>
                      </div>

                      {/* Exam Title */}
                      <h3 className="font-bold text-base text-slate-900 leading-snug line-clamp-2">
                        {exam.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {exam.description}
                      </p>

                      {/* Exam Specs Grid */}
                      <div className="grid grid-cols-2 gap-2 my-4 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                        <div className="space-y-0.5">
                          <span className="text-slate-400 block text-[11px]">Questions</span>
                          <span className="font-bold text-slate-800">{exam.numberOfQuestions} Qs</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-slate-400 block text-[11px]">Total Marks</span>
                          <span className="font-bold text-slate-800">{exam.totalMarks} (Pass: {exam.passingMarks})</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-slate-400 block text-[11px]">Duration</span>
                          <span className="font-bold text-blue-600 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {exam.durationMinutes} Mins
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-slate-400 block text-[11px]">Exam Date</span>
                          <span className="font-bold text-slate-700 truncate block">
                            {exam.startDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2 border-t border-slate-100">
                      {isCompleted && existingResult ? (
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-xs">
                            <span className="text-slate-400 block text-[10px]">Score:</span>
                            <span className="font-bold text-emerald-700">
                              {existingResult.marksObtained}/{existingResult.totalMarks} ({existingResult.percentage}%)
                            </span>
                          </div>
                          <button
                            type="button"
                            id={`view-result-btn-${exam.id}`}
                            onClick={() => onViewResult(existingResult)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                          >
                            VIEW RESULT
                          </button>
                        </div>
                      ) : isAvailable ? (
                        <button
                          type="button"
                          id={`start-exam-btn-${exam.id}`}
                          onClick={() => onStartExam(exam)}
                          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>START EXAM</span>
                        </button>
                      ) : isUpcoming ? (
                        <div className="text-center py-2 text-xs font-semibold text-slate-400 bg-slate-100 rounded-xl">
                          Starts on {exam.startDate} at {exam.startTime}
                        </div>
                      ) : (
                        <div className="text-center py-2 text-xs font-semibold text-rose-500 bg-rose-50 rounded-xl">
                          Exam Expired on {exam.endDate}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 4. STUDENT EXAM HISTORY VIEW */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900">Completed Examinations</h3>
              <p className="text-xs text-slate-500">Your permanent academic records and result sheets</p>
            </div>
          </div>

          {studentResults.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              You haven&apos;t taken any exams yet. Start an available test to see your marksheet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="p-4">Exam Name</th>
                    <th className="p-4">Subject</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4 text-center">Marks</th>
                    <th className="p-4 text-center">Percentage</th>
                    <th className="p-4 text-center">Result</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentResults.map((res) => {
                    const isPass = res.result === 'PASS';
                    return (
                      <tr key={res.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-4 font-bold text-slate-900">{res.examTitle}</td>
                        <td className="p-4 text-slate-600">{res.subjectName}</td>
                        <td className="p-4 text-slate-500">{res.date}</td>
                        <td className="p-4 text-center font-bold text-slate-800">
                          {res.marksObtained} / {res.totalMarks}
                        </td>
                        <td className="p-4 text-center font-bold text-blue-700">{res.percentage}%</td>
                        <td className="p-4 text-center">
                          <span
                            className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                              isPass
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {res.result}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              id={`history-view-${res.id}`}
                              onClick={() => onViewResult(res)}
                              className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors"
                            >
                              VIEW RESULT
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
