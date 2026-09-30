export type UserRole = 'ADMIN' | 'STUDENT';

export type StudentMedium = 'Marathi' | 'English';

export type ExamStatus = 'Upcoming' | 'Available' | 'Completed' | 'Expired';

export type QuestionType = 'MCQ' | 'True/False' | 'Fill in the Blank';

export type QuestionDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface User {
  id: string; // STU-000001 or admin-id
  role: UserRole;
  name: string;
  email: string;
  mobile: string;
  schoolName: string;
  className: string; // '10th Standard'
  division: string; // 'A', 'B', 'C', 'D'
  medium: StudentMedium;
  district: string;
  status: 'Active' | 'Inactive';
  registeredAt: string;
  password?: string;
}

export interface Subject {
  id: string;
  name: string; // e.g., "Mathematics"
  marathiName: string; // "गणित"
  code: string; // "MATH-10"
  chapters: string[];
}

export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface Question {
  id: string;
  subjectId: string;
  subjectName: string;
  chapter: string;
  medium: 'Marathi' | 'English' | 'Both';
  type: QuestionType;
  question: string;
  questionImage?: string;
  options: QuestionOption[];
  correctAnswer: string; // 'A', 'B', 'C', 'D', 'True', 'False', or text
  marks: number;
  negativeMarks: number;
  difficulty: QuestionDifficulty;
  explanation?: string;
}

export interface Exam {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  medium: 'Marathi' | 'English' | 'Both';
  description: string;
  numberOfQuestions: number;
  totalMarks: number;
  durationMinutes: number;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endDate: string; // YYYY-MM-DD
  endTime: string; // HH:MM
  passingMarks: number;
  negativeMarking: boolean;
  negativeMarkValue: number;
  maxAttempts: number; // 1 or multiple
  isPublished: boolean;
  showResultImmediately: boolean;
  showResultAfterExamEnds: boolean;
  showCorrectAnswers: boolean;
  fullscreenRequired: boolean;
  tabSwitchDetection: boolean;
  questionIds: string[];
  createdAt: string;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  startedAt: string;
  submittedAt?: string;
  status: 'In-Progress' | 'Completed' | 'Expired';
  answers: Record<string, string>; // questionId -> answer
  markedForReview: string[]; // array of questionIds
  timeRemainingSeconds: number;
  tabSwitchCount: number;
  score?: ExamScore;
}

export interface ExamScore {
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  totalMarks: number;
  marksObtained: number;
  percentage: number;
  isPass: boolean;
  submittedAt: string;
  timeTakenMinutes: number;
}

// Re-export all Bharat Health Connect Healthcare types
export * from './types/index';


export interface ExamResultRecord {
  id: string;
  attemptId: string;
  examId: string;
  examTitle: string;
  subjectName: string;
  studentId: string;
  studentName: string;
  schoolName: string;
  medium: StudentMedium;
  district: string;
  date: string;
  timeTaken: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  totalMarks: number;
  marksObtained: number;
  percentage: number;
  result: 'PASS' | 'FAIL';
  answers: Record<string, string>;
  questionDetails?: Array<{
    questionId: string;
    question: string;
    studentAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    marksAwarded: number;
    explanation?: string;
  }>;
}

export interface DashboardStats {
  totalStudents: number;
  totalExams: number;
  totalQuestions: number;
  todayAttempts: number;
  overallPassRate: number;
}
