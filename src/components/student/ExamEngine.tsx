import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Exam, Question, ExamAttempt, User, ExamResultRecord } from '../../types';
import { examStore } from '../../services/api';
import {
  Clock,
  Check,
  HelpCircle,
  Flag,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Send,
  Maximize,
  Minimize,
  Eye,
  X,
  GraduationCap
} from 'lucide-react';

interface ExamEngineProps {
  exam: Exam;
  student: User;
  onFinishExam: (result: ExamResultRecord) => void;
  onExitWithoutSubmit?: () => void;
}

export const ExamEngine: React.FC<ExamEngineProps> = ({
  exam,
  student,
  onFinishExam
}) => {
  // Retrieve or initialize attempt
  const [attempt, setAttempt] = useState<ExamAttempt>(() => {
    return examStore.startAttempt(exam.id, student);
  });

  // Filter exam questions in exact order
  const allQuestions = examStore.getQuestions();
  const questions: Question[] = exam.questionIds
    .map((id) => allQuestions.find((q) => q.id === id))
    .filter((q): q is Question => Boolean(q));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(attempt.answers || {});
  const [markedForReview, setMarkedForReview] = useState<string[]>(attempt.markedForReview || []);
  const [timeRemaining, setTimeRemaining] = useState<number>(attempt.timeRemainingSeconds);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showPaletteMobile, setShowPaletteMobile] = useState(false);
  const [tabSwitchAlert, setTabSwitchAlert] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion: Question | undefined = questions[currentIndex];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Submit attempt helper
  const performSubmit = useCallback(() => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (timerRef.current) clearInterval(timerRef.current);
    try {
      const result = examStore.submitAttempt(attempt.id);
      onFinishExam(result);
    } catch (e) {
      console.error('Submission error:', e);
      setIsSubmitting(false);
    }
  }, [attempt.id, isSubmitting, onFinishExam]);

  // Countdown Timer with auto-submit
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          performSubmit();
          return 0;
        }
        const updated = prev - 1;
        // Periodic sync to store every 5 seconds
        if (updated % 5 === 0) {
          examStore.updateAttemptTimer(attempt.id, updated);
        }
        return updated;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [attempt.id, performSubmit]);

  // Tab switch listener
  useEffect(() => {
    if (!exam.tabSwitchDetection) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        const count = examStore.incrementTabSwitch(attempt.id);
        setTabSwitchAlert(`Warning: Tab switch detected! (Attempt flagged: ${count} time${count > 1 ? 's' : ''})`);
        setTimeout(() => {
          setTabSwitchAlert(null);
        }, 5000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [exam.tabSwitchDetection, attempt.id]);

  // Handle Option Select
  const handleSelectOption = (optionKey: string) => {
    if (!currentQuestion) return;
    const newAnswers = { ...answers, [currentQuestion.id]: optionKey };
    setAnswers(newAnswers);
    examStore.saveAnswer(attempt.id, currentQuestion.id, optionKey);
  };

  // Clear answer
  const handleClearAnswer = () => {
    if (!currentQuestion) return;
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestion.id];
    setAnswers(newAnswers);
    examStore.saveAnswer(attempt.id, currentQuestion.id, '');
  };

  // Toggle Mark for Review
  const handleToggleReview = () => {
    if (!currentQuestion) return;
    const qId = currentQuestion.id;
    let newMarked: string[];
    if (markedForReview.includes(qId)) {
      newMarked = markedForReview.filter((id) => id !== qId);
    } else {
      newMarked = [...markedForReview, qId];
    }
    setMarkedForReview(newMarked);
    examStore.toggleMarkForReview(attempt.id, qId);
  };

  // Format MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Timer color states
  const isUrgent = timeRemaining <= 60; // < 1 min
  const isWarning = timeRemaining <= 300 && !isUrgent; // < 5 mins
  const isNotice = timeRemaining <= 600 && !isWarning && !isUrgent; // < 10 mins

  // Question counts
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = Math.max(0, questions.length - answeredCount);
  const reviewCount = markedForReview.length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col select-none no-print">
      {/* 1. DISTRACTION-FREE EXAM HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          {/* Brand & Exam Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-blue-900 text-sm sm:text-base">
                  10वी ONLINE EXAM
                </span>
                <span className="text-slate-300">|</span>
                <span className="font-semibold text-slate-800 text-xs sm:text-sm truncate max-w-[200px] sm:max-w-md">
                  {exam.title}
                </span>
              </div>
              <p className="text-[11px] text-slate-700">
                Student: <strong className="text-slate-900">{student.name}</strong> ({student.id})
              </p>
            </div>
          </div>

          {/* TIMER & SUBMIT BUTTON */}
          <div className="flex items-center gap-3">
            {/* Countdown Display */}
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono font-bold text-sm sm:text-base border transition-all ${
                isUrgent
                  ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                  : isWarning
                  ? 'bg-amber-50 text-amber-700 border-amber-300'
                  : isNotice
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-slate-50 text-slate-800 border-slate-200'
              }`}
            >
              <Clock className={`w-4 h-4 ${isUrgent ? 'text-rose-600' : 'text-slate-500'}`} />
              <div>
                <span className="text-[10px] uppercase font-sans font-semibold text-slate-700 block leading-none">
                  Time Left
                </span>
                <span>{formatTime(timeRemaining)}</span>
              </div>
            </div>

            {/* Submit Exam Button */}
            <button
              id="header-submit-btn"
              onClick={() => setShowSubmitModal(true)}
              className="px-3.5 sm:px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>SUBMIT EXAM</span>
            </button>
          </div>
        </div>

        {/* Tab switch warning alert banner */}
        {tabSwitchAlert && (
          <div className="bg-amber-500 text-white px-4 py-1.5 text-xs text-center font-semibold flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>{tabSwitchAlert}</span>
          </div>
        )}

        {/* Time warning alerts */}
        {isNotice && (
          <div className="bg-blue-50 border-t border-blue-200 text-blue-800 px-4 py-1 text-center text-xs font-medium">
            Reminder: Less than 10 minutes remaining in this examination.
          </div>
        )}
      </header>

      {/* 2. MAIN WORKSPACE: QUESTIONS + PALETTE */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT COLUMN: ACTIVE QUESTION CARD & CONTROLS */}
        <main className="lg:col-span-8 flex flex-col justify-between">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7 space-y-6">
            {/* Top metadata bar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  {currentQuestion?.chapter}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  +{currentQuestion?.marks || 1} Mark
                </span>
                {exam.negativeMarking && (
                  <span className="text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                    -{exam.negativeMarkValue} Negative
                  </span>
                )}
              </div>
            </div>

            {/* Question Text */}
            {currentQuestion ? (
              <div className="space-y-4">
                <div className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
                  {currentQuestion.question}
                </div>

                {/* Optional Image */}
                {currentQuestion.questionImage && (
                  <div className="p-2 border border-slate-200 rounded-xl bg-slate-50 max-w-md">
                    <img
                      src={currentQuestion.questionImage}
                      alt="Question Diagram"
                      className="max-h-56 object-contain rounded-lg mx-auto"
                    />
                  </div>
                )}

                {/* Options List */}
                <div className="space-y-2.5 pt-2">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = answers[currentQuestion.id] === opt.key;
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        id={`option-${opt.key.toLowerCase()}`}
                        onClick={() => handleSelectOption(opt.key)}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-sm font-medium transition-all flex items-start gap-3.5 cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/70 border-blue-500 text-blue-950 ring-2 ring-blue-500/20 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-colors ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-600 border border-slate-300'
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span className="flex-1 leading-normal pt-0.5">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-sm">
                No question available.
              </div>
            )}
          </div>

          {/* BOTTOM CONTROLS BAR */}
          <div className="mt-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="btn-previous-question"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                className="px-3 sm:px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>PREVIOUS</span>
              </button>

              <button
                type="button"
                id="btn-next-question"
                disabled={currentIndex === questions.length - 1}
                onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                className="px-3 sm:px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
              >
                <span>NEXT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Clear Answer */}
              {currentQuestion && answers[currentQuestion.id] && (
                <button
                  type="button"
                  id="btn-clear-answer"
                  onClick={handleClearAnswer}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>CLEAR ANSWER</span>
                </button>
              )}

              {/* Mark for Review */}
              {currentQuestion && (
                <button
                  type="button"
                  id="btn-mark-review"
                  onClick={handleToggleReview}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-1.5 ${
                    markedForReview.includes(currentQuestion.id)
                      ? 'bg-purple-100 text-purple-800 border-purple-300'
                      : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>
                    {markedForReview.includes(currentQuestion.id) ? 'UNMARK REVIEW' : 'MARK FOR REVIEW'}
                  </span>
                </button>
              )}

              {/* Palette button for mobile */}
              <button
                type="button"
                onClick={() => setShowPaletteMobile(!showPaletteMobile)}
                className="lg:hidden px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
              >
                Questions ({answeredCount}/{questions.length})
              </button>
            </div>
          </div>
        </main>

        {/* RIGHT COLUMN: QUESTION PALETTE (Desktop + Mobile Drawer) */}
        <aside
          className={`lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between ${
            showPaletteMobile
              ? 'fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto block rounded-t-2xl shadow-2xl'
              : 'hidden lg:flex'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Question Navigation
              </h3>
              {showPaletteMobile && (
                <button
                  onClick={() => setShowPaletteMobile(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Question Grid Numbers */}
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 my-4 max-h-[380px] overflow-y-auto p-1">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = Boolean(answers[q.id]);
                const isMarked = markedForReview.includes(q.id);

                let badgeColor = 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
                let symbol = '';

                if (isAnswered && isMarked) {
                  badgeColor = 'bg-purple-600 text-white border-purple-700';
                  symbol = '✓?';
                } else if (isAnswered) {
                  badgeColor = 'bg-emerald-600 text-white border-emerald-700';
                  symbol = '✓';
                } else if (isMarked) {
                  badgeColor = 'bg-purple-100 text-purple-800 border-purple-300';
                  symbol = '?';
                }

                return (
                  <button
                    key={q.id}
                    id={`palette-btn-${idx + 1}`}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowPaletteMobile(false);
                    }}
                    className={`h-10 rounded-xl border text-xs font-bold transition-all relative flex flex-col items-center justify-center cursor-pointer ${badgeColor} ${
                      isCurrent ? 'ring-2 ring-blue-600 ring-offset-2 scale-105 z-10 font-extrabold' : ''
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {symbol && (
                      <span className="text-[9px] leading-none absolute -top-1 -right-1 px-1 bg-slate-900 text-white rounded-full">
                        {symbol}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Status Legend (Both icons/text and visual indicators) */}
            <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
              <div className="font-semibold text-[11px] text-slate-700 uppercase tracking-wider">
                Status Summary:
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="flex items-center gap-1.5 text-emerald-800">
                  <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                    ✓
                  </span>
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-5 h-5 rounded-md bg-slate-100 border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                    {unansweredCount}
                  </span>
                  <span>Unanswered ({unansweredCount})</span>
                </div>
                <div className="flex items-center gap-1.5 text-purple-800">
                  <span className="w-5 h-5 rounded-md bg-purple-100 border border-purple-300 text-purple-800 flex items-center justify-center font-bold text-[10px]">
                    ?
                  </span>
                  <span>Review ({reviewCount})</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-800">
                  <span className="w-5 h-5 rounded-md border-2 border-blue-600 bg-blue-50 text-blue-800 flex items-center justify-center font-bold text-[10px]">
                    ●
                  </span>
                  <span>Current ({currentIndex + 1})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Submit Block on Palette bottom */}
          <div className="pt-4 border-t border-slate-100">
            <button
              type="button"
              id="palette-submit-btn"
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              FINISH & SUBMIT TEST
            </button>
          </div>
        </aside>
      </div>

      {/* 3. SUBMISSION CONFIRMATION MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-emerald-600 px-6 py-4 text-white">
              <h3 className="text-base font-bold">Submit Online Examination</h3>
              <p className="text-xs text-emerald-100">{exam.title}</p>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-700 leading-relaxed">
                Are you sure you want to submit your exam now? Once submitted, your attempt will be permanently locked and answers cannot be altered.
              </p>

              {/* Status breakdown table */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-700">
                  <span>Total Questions:</span>
                  <strong className="text-slate-900">{questions.length}</strong>
                </div>
                <div className="flex justify-between items-center text-emerald-700">
                  <span>Answered Questions:</span>
                  <strong>{answeredCount}</strong>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Unanswered Questions:</span>
                  <strong>{unansweredCount}</strong>
                </div>
                <div className="flex justify-between items-center text-purple-700">
                  <span>Marked for Review:</span>
                  <strong>{reviewCount}</strong>
                </div>
              </div>

              {unansweredCount > 0 && (
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>You still have {unansweredCount} unanswered questions.</span>
                </div>
              )}
            </div>

            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors"
              >
                CANCEL & RESUME
              </button>
              <button
                type="button"
                id="confirm-submit-exam-btn"
                onClick={performSubmit}
                disabled={isSubmitting}
                className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs transition-colors"
              >
                {isSubmitting ? 'SUBMITTING...' : 'YES, SUBMIT EXAM'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
