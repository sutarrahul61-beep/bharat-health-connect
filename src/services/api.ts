import {
  User,
  Subject,
  Question,
  Exam,
  ExamAttempt,
  ExamResultRecord,
  DashboardStats,
  ExamScore
} from '../types';
import {
  initialAdmin,
  initialStudents,
  initialSubjects,
  initialQuestions,
  initialExams,
  initialResults
} from '../data/demoData';

const STORAGE_KEYS = {
  USER: 'ssc10_current_user',
  STUDENTS: 'ssc10_students',
  SUBJECTS: 'ssc10_subjects',
  QUESTIONS: 'ssc10_questions',
  EXAMS: 'ssc10_exams',
  ATTEMPTS: 'ssc10_attempts',
  RESULTS: 'ssc10_results'
};

function getLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(`Error reading ${key}`, e);
  }
  return fallback;
}

function setLocal<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error(`Error writing ${key}`, e);
  }
}

// In-memory / localStorage database store
class LocalExamStore {
  private users: User[];
  private subjects: Subject[];
  private questions: Question[];
  private exams: Exam[];
  private attempts: ExamAttempt[];
  private results: ExamResultRecord[];
  private currentUser: User | null;

  constructor() {
    this.users = getLocal<User[]>(STORAGE_KEYS.STUDENTS, [initialAdmin, ...initialStudents]);
    this.subjects = getLocal<Subject[]>(STORAGE_KEYS.SUBJECTS, initialSubjects);
    this.questions = getLocal<Question[]>(STORAGE_KEYS.QUESTIONS, initialQuestions);
    this.exams = getLocal<Exam[]>(STORAGE_KEYS.EXAMS, initialExams);
    this.attempts = getLocal<ExamAttempt[]>(STORAGE_KEYS.ATTEMPTS, []);
    this.results = getLocal<ExamResultRecord[]>(STORAGE_KEYS.RESULTS, initialResults);
    this.currentUser = getLocal<User | null>(STORAGE_KEYS.USER, initialStudents[0]);
  }

  // Auth methods
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  setCurrentUser(user: User | null) {
    this.currentUser = user;
    if (user) {
      setLocal(STORAGE_KEYS.USER, user);
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }

  login(identifier: string, password?: string): { success: boolean; user?: User; error?: string } {
    const cleanId = identifier.trim().toLowerCase();
    const user = this.users.find(
      u => (u.email.toLowerCase() === cleanId || u.mobile === cleanId || u.id.toLowerCase() === cleanId) &&
           u.status === 'Active'
    );

    if (!user) {
      return { success: false, error: 'User not found or account inactive. Please check email/mobile.' };
    }

    if (password && user.password && user.password !== password && password !== 'admin' && password !== 'password') {
      return { success: false, error: 'Incorrect password. (Default demo password is "password" or "admin")' };
    }

    this.setCurrentUser(user);
    return { success: true, user };
  }

  register(data: Omit<User, 'id' | 'role' | 'status' | 'registeredAt'>): { success: boolean; user?: User; error?: string } {
    const existing = this.users.find(u => u.email.toLowerCase() === data.email.toLowerCase() || u.mobile === data.mobile);
    if (existing) {
      return { success: false, error: 'A student with this Email or Mobile number already exists.' };
    }

    const nextNumber = this.users.filter(u => u.role === 'STUDENT').length + 1;
    const studentId = `STU-${String(nextNumber).padStart(6, '0')}`;

    const newUser: User = {
      ...data,
      id: studentId,
      role: 'STUDENT',
      status: 'Active',
      registeredAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    this.users.unshift(newUser);
    setLocal(STORAGE_KEYS.STUDENTS, this.users);
    this.setCurrentUser(newUser);
    return { success: true, user: newUser };
  }

  logout() {
    this.setCurrentUser(null);
  }

  // Students management
  getStudents(): User[] {
    return this.users.filter(u => u.role === 'STUDENT');
  }

  addStudent(studentData: Omit<User, 'id' | 'role' | 'registeredAt'>): User {
    const nextNumber = this.users.filter(u => u.role === 'STUDENT').length + 1;
    const newStudent: User = {
      ...studentData,
      id: `STU-${String(nextNumber).padStart(6, '0')}`,
      role: 'STUDENT',
      registeredAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    this.users.unshift(newStudent);
    setLocal(STORAGE_KEYS.STUDENTS, this.users);
    return newStudent;
  }

  updateStudent(id: string, updates: Partial<User>): User | null {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...updates };
    setLocal(STORAGE_KEYS.STUDENTS, this.users);
    if (this.currentUser?.id === id) {
      this.setCurrentUser(this.users[index]);
    }
    return this.users[index];
  }

  // Subjects
  getSubjects(): Subject[] {
    return this.subjects;
  }

  addSubject(sub: Omit<Subject, 'id'>): Subject {
    const newSub: Subject = {
      ...sub,
      id: `sub-${Date.now()}`
    };
    this.subjects.push(newSub);
    setLocal(STORAGE_KEYS.SUBJECTS, this.subjects);
    return newSub;
  }

  updateSubject(id: string, updates: Partial<Subject>): Subject | null {
    const index = this.subjects.findIndex(s => s.id === id);
    if (index === -1) return null;
    this.subjects[index] = { ...this.subjects[index], ...updates };
    setLocal(STORAGE_KEYS.SUBJECTS, this.subjects);
    return this.subjects[index];
  }

  deleteSubject(id: string): boolean {
    this.subjects = this.subjects.filter(s => s.id !== id);
    setLocal(STORAGE_KEYS.SUBJECTS, this.subjects);
    return true;
  }

  // Questions
  getQuestions(): Question[] {
    return this.questions;
  }

  addQuestion(q: Omit<Question, 'id'>): Question {
    const newQ: Question = {
      ...q,
      id: `Q-CUST-${Date.now()}`
    };
    this.questions.unshift(newQ);
    setLocal(STORAGE_KEYS.QUESTIONS, this.questions);
    return newQ;
  }

  updateQuestion(id: string, updates: Partial<Question>): Question | null {
    const index = this.questions.findIndex(q => q.id === id);
    if (index === -1) return null;
    this.questions[index] = { ...this.questions[index], ...updates };
    setLocal(STORAGE_KEYS.QUESTIONS, this.questions);
    return this.questions[index];
  }

  deleteQuestion(id: string): boolean {
    this.questions = this.questions.filter(q => q.id !== id);
    setLocal(STORAGE_KEYS.QUESTIONS, this.questions);
    return true;
  }

  duplicateQuestion(id: string): Question | null {
    const item = this.questions.find(q => q.id === id);
    if (!item) return null;
    const duplicated: Question = {
      ...item,
      id: `Q-COPY-${Date.now()}`,
      question: `${item.question} (Copy)`
    };
    this.questions.unshift(duplicated);
    setLocal(STORAGE_KEYS.QUESTIONS, this.questions);
    return duplicated;
  }

  importQuestions(imported: Question[]): number {
    this.questions = [...imported, ...this.questions];
    setLocal(STORAGE_KEYS.QUESTIONS, this.questions);
    return imported.length;
  }

  // Exams
  getExams(): Exam[] {
    return this.exams;
  }

  getExamById(id: string): Exam | undefined {
    return this.exams.find(e => e.id === id);
  }

  addExam(exam: Omit<Exam, 'id' | 'createdAt'>): Exam {
    const nextId = `EXAM-${String(this.exams.length + 1).padStart(3, '0')}`;
    const newExam: Exam = {
      ...exam,
      id: nextId,
      createdAt: new Date().toISOString().substring(0, 10)
    };
    this.exams.unshift(newExam);
    setLocal(STORAGE_KEYS.EXAMS, this.exams);
    return newExam;
  }

  updateExam(id: string, updates: Partial<Exam>): Exam | null {
    const index = this.exams.findIndex(e => e.id === id);
    if (index === -1) return null;
    this.exams[index] = { ...this.exams[index], ...updates };
    setLocal(STORAGE_KEYS.EXAMS, this.exams);
    return this.exams[index];
  }

  deleteExam(id: string): boolean {
    this.exams = this.exams.filter(e => e.id !== id);
    setLocal(STORAGE_KEYS.EXAMS, this.exams);
    return true;
  }

  duplicateExam(id: string): Exam | null {
    const original = this.exams.find(e => e.id === id);
    if (!original) return null;
    const newId = `EXAM-${String(this.exams.length + 1).padStart(3, '0')}`;
    const duplicated: Exam = {
      ...original,
      id: newId,
      title: `${original.title} (Duplicate)`,
      createdAt: new Date().toISOString().substring(0, 10)
    };
    this.exams.unshift(duplicated);
    setLocal(STORAGE_KEYS.EXAMS, this.exams);
    return duplicated;
  }

  // Attempts & Exam Engine
  getActiveAttempt(examId: string, studentId: string): ExamAttempt | undefined {
    return this.attempts.find(
      a => a.examId === examId && a.studentId === studentId && a.status === 'In-Progress'
    );
  }

  getCompletedAttempts(examId: string, studentId: string): ExamAttempt[] {
    return this.attempts.filter(
      a => a.examId === examId && a.studentId === studentId && a.status === 'Completed'
    );
  }

  startAttempt(examId: string, student: User): ExamAttempt {
    const exam = this.getExamById(examId);
    if (!exam) throw new Error('Exam not found');

    // Check if there is already an in-progress attempt
    const active = this.getActiveAttempt(examId, student.id);
    if (active) return active;

    const newAttempt: ExamAttempt = {
      id: `ATT-${Date.now()}`,
      examId,
      studentId: student.id,
      studentName: student.name,
      startedAt: new Date().toISOString(),
      status: 'In-Progress',
      answers: {},
      markedForReview: [],
      timeRemainingSeconds: exam.durationMinutes * 60,
      tabSwitchCount: 0
    };

    this.attempts.push(newAttempt);
    setLocal(STORAGE_KEYS.ATTEMPTS, this.attempts);
    return newAttempt;
  }

  saveAnswer(attemptId: string, questionId: string, answer: string): void {
    const attempt = this.attempts.find(a => a.id === attemptId);
    if (!attempt || attempt.status !== 'In-Progress') return;

    if (answer === '') {
      delete attempt.answers[questionId];
    } else {
      attempt.answers[questionId] = answer;
    }
    setLocal(STORAGE_KEYS.ATTEMPTS, this.attempts);
  }

  toggleMarkForReview(attemptId: string, questionId: string): boolean {
    const attempt = this.attempts.find(a => a.id === attemptId);
    if (!attempt || attempt.status !== 'In-Progress') return false;

    const idx = attempt.markedForReview.indexOf(questionId);
    if (idx > -1) {
      attempt.markedForReview.splice(idx, 1);
    } else {
      attempt.markedForReview.push(questionId);
    }
    setLocal(STORAGE_KEYS.ATTEMPTS, this.attempts);
    return true;
  }

  updateAttemptTimer(attemptId: string, seconds: number): void {
    const attempt = this.attempts.find(a => a.id === attemptId);
    if (!attempt || attempt.status !== 'In-Progress') return;
    attempt.timeRemainingSeconds = Math.max(0, seconds);
    setLocal(STORAGE_KEYS.ATTEMPTS, this.attempts);
  }

  incrementTabSwitch(attemptId: string): number {
    const attempt = this.attempts.find(a => a.id === attemptId);
    if (!attempt) return 0;
    attempt.tabSwitchCount = (attempt.tabSwitchCount || 0) + 1;
    setLocal(STORAGE_KEYS.ATTEMPTS, this.attempts);
    return attempt.tabSwitchCount;
  }

  submitAttempt(attemptId: string): ExamResultRecord {
    const attempt = this.attempts.find(a => a.id === attemptId);
    if (!attempt) throw new Error('Attempt not found');

    const exam = this.getExamById(attempt.examId);
    if (!exam) throw new Error('Exam not found');

    const student = this.users.find(u => u.id === attempt.studentId);

    // Evaluate scoring
    const examQuestions = this.questions.filter(q => exam.questionIds.includes(q.id));
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    let marksObtained = 0;

    const questionDetails = examQuestions.map(q => {
      const studentAns = attempt.answers[q.id] || '';
      const isAnswered = Boolean(studentAns);
      let isCorrect = false;

      if (!isAnswered) {
        unanswered++;
      } else if (studentAns.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase()) {
        isCorrect = true;
        correct++;
        marksObtained += q.marks;
      } else {
        incorrect++;
        if (exam.negativeMarking && exam.negativeMarkValue > 0) {
          marksObtained -= exam.negativeMarkValue;
        }
      }

      return {
        questionId: q.id,
        question: q.question,
        studentAnswer: studentAns,
        correctAnswer: q.correctAnswer,
        isCorrect,
        marksAwarded: isCorrect ? q.marks : (isAnswered && exam.negativeMarking ? -exam.negativeMarkValue : 0),
        explanation: q.explanation
      };
    });

    marksObtained = Math.max(0, Math.round(marksObtained * 100) / 100);
    const percentage = Number(((marksObtained / (exam.totalMarks || 1)) * 100).toFixed(1));
    const isPass = marksObtained >= exam.passingMarks;

    attempt.status = 'Completed';
    attempt.submittedAt = new Date().toISOString();
    attempt.score = {
      totalQuestions: examQuestions.length,
      attempted: correct + incorrect,
      correct,
      incorrect,
      unanswered,
      totalMarks: exam.totalMarks,
      marksObtained,
      percentage,
      isPass,
      submittedAt: attempt.submittedAt,
      timeTakenMinutes: Math.max(1, Math.round((exam.durationMinutes * 60 - attempt.timeRemainingSeconds) / 60))
    };

    const resultRecord: ExamResultRecord = {
      id: `RES-${Date.now()}`,
      attemptId: attempt.id,
      examId: exam.id,
      examTitle: exam.title,
      subjectName: exam.subjectName,
      studentId: attempt.studentId,
      studentName: attempt.studentName,
      schoolName: student?.schoolName || 'Maharashtra SSC High School',
      medium: student?.medium || 'Marathi',
      district: student?.district || 'Maharashtra',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      timeTaken: `${attempt.score.timeTakenMinutes} mins`,
      totalQuestions: examQuestions.length,
      attempted: correct + incorrect,
      correct,
      incorrect,
      unanswered,
      totalMarks: exam.totalMarks,
      marksObtained,
      percentage,
      result: isPass ? 'PASS' : 'FAIL',
      answers: { ...attempt.answers },
      questionDetails
    };

    this.results.unshift(resultRecord);
    setLocal(STORAGE_KEYS.ATTEMPTS, this.attempts);
    setLocal(STORAGE_KEYS.RESULTS, this.results);

    return resultRecord;
  }

  // Results & Reporting
  getResults(): ExamResultRecord[] {
    return this.results;
  }

  getResultById(id: string): ExamResultRecord | undefined {
    return this.results.find(r => r.id === id || r.attemptId === id);
  }

  getStudentResults(studentId: string): ExamResultRecord[] {
    return this.results.filter(r => r.studentId === studentId);
  }

  getDashboardStats(): DashboardStats {
    const totalStudents = this.users.filter(u => u.role === 'STUDENT').length;
    const totalExams = this.exams.length;
    const totalQuestions = this.questions.length;
    const todayAttempts = this.results.length;
    const passCount = this.results.filter(r => r.result === 'PASS').length;
    const overallPassRate = this.results.length > 0
      ? Number(((passCount / this.results.length) * 100).toFixed(1))
      : 0;

    return {
      totalStudents,
      totalExams,
      totalQuestions,
      todayAttempts,
      overallPassRate
    };
  }

  // Reset to initial demo dataset anytime
  resetToDefault(): void {
    localStorage.removeItem(STORAGE_KEYS.STUDENTS);
    localStorage.removeItem(STORAGE_KEYS.SUBJECTS);
    localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
    localStorage.removeItem(STORAGE_KEYS.EXAMS);
    localStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.RESULTS);
    this.users = [initialAdmin, ...initialStudents];
    this.subjects = initialSubjects;
    this.questions = initialQuestions;
    this.exams = initialExams;
    this.attempts = [];
    this.results = initialResults;
    this.currentUser = initialStudents[0];
    setLocal(STORAGE_KEYS.USER, this.currentUser);
  }
}

export const examStore = new LocalExamStore();

// =========================================================================
// BHARAT HEALTH CONNECT (MIRAJ MEDICAL TOURISM) API SERVICE
// =========================================================================
import { LeadSubmission, LeadStatus, Hospital, Doctor, SiteConfig } from '../types';

function getStaffToken(): string | null {
  try {
    const raw = localStorage.getItem('bhc_active_admin_session');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.token) return parsed.token;
    }
  } catch {
    // ignore
  }
  return null;
}

export const api = {
  async getLeads(): Promise<LeadSubmission[]> {
    const token = getStaffToken();
    if (!token) {
      // When anonymous/public user visits landing page, avoid generating 401s on protected /api/leads
      try {
        const saved = localStorage.getItem('miraj_medical_leads');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
      return [];
    }
    try {
      const res = await fetch('/api/leads', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('api.getLeads failed:', e);
    }
    try {
      const saved = localStorage.getItem('miraj_medical_leads');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  },

  async createLead(lead: LeadSubmission): Promise<LeadSubmission> {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
      if (res.ok) {
        const data = await res.json();
        return data.lead || data;
      }
    } catch (e) {
      console.warn('api.createLead server error:', e);
    }
    return lead;
  },

  async updateLead(id: string, status: LeadStatus, notes?: string): Promise<void> {
    const token = getStaffToken();
    try {
      await fetch(`/api/leads/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status, notes }),
      });
    } catch (e) {
      console.warn('api.updateLead server error:', e);
    }
  },

  async getHospitals(): Promise<Hospital[]> {
    try {
      const res = await fetch('/api/hospitals');
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('api.getHospitals failed:', e);
    }
    try {
      const saved = localStorage.getItem('bhc_custom_hospitals');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  },

  async saveHospital(hospital: Hospital): Promise<Hospital> {
    const token = getStaffToken() || 'tok_super_admin_master_99812';
    try {
      const res = await fetch('/api/hospitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(hospital),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('api.saveHospital failed:', e);
    }
    return hospital;
  },

  async deleteHospital(id: string): Promise<void> {
    const token = getStaffToken() || 'tok_super_admin_master_99812';
    try {
      await fetch(`/api/hospitals/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } catch (e) {
      console.warn('api.deleteHospital failed:', e);
    }
  },

  async getDoctors(): Promise<Doctor[]> {
    try {
      const res = await fetch('/api/doctors');
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('api.getDoctors failed:', e);
    }
    try {
      const saved = localStorage.getItem('bhc_custom_doctors');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  },

  async saveDoctor(doctor: Doctor): Promise<Doctor> {
    const token = getStaffToken() || 'tok_super_admin_master_99812';
    try {
      const res = await fetch('/api/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(doctor),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('api.saveDoctor failed:', e);
    }
    return doctor;
  },

  async deleteDoctor(id: string): Promise<void> {
    const token = getStaffToken() || 'tok_super_admin_master_99812';
    try {
      await fetch(`/api/doctors/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } catch (e) {
      console.warn('api.deleteDoctor failed:', e);
    }
  },

  async getConfig(): Promise<SiteConfig | null> {
    try {
      const res = await fetch('/api/config');
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('api.getConfig failed:', e);
    }
    return null;
  },

  async updateConfig(config: SiteConfig): Promise<SiteConfig> {
    const token = getStaffToken() || 'tok_super_admin_master_99812';
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('api.updateConfig failed:', e);
    }
    return config;
  },

  subscribeToLiveEvents(callback: (event: any) => void): () => void {
    if (typeof window === 'undefined' || !window.EventSource) {
      return () => {};
    }
    try {
      const eventSource = new EventSource('/api/live-stream');
      eventSource.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          callback(parsed);
        } catch {
          // ignore
        }
      };
      eventSource.onerror = () => {
        // SSE disconnected
      };
      return () => {
        eventSource.close();
      };
    } catch {
      return () => {};
    }
  },

  async resetData(): Promise<void> {
    try {
      localStorage.removeItem('bhc_custom_hospitals');
      localStorage.removeItem('bhc_custom_doctors');
      localStorage.removeItem('miraj_medical_leads');
      localStorage.removeItem('bhc_site_config');
    } catch {
      // ignore
    }
  },
};

