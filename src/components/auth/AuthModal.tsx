import React, { useState } from 'react';
import { User, StudentMedium } from '../../types';
import { examStore } from '../../services/api';
import {
  GraduationCap,
  Shield,
  User as UserIcon,
  X,
  CheckCircle2,
  AlertCircle,
  School,
  Lock,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  initialTab?: 'student-login' | 'student-register' | 'admin-login';
}

const MAHARASHTRA_DISTRICTS = [
  'Ahmednagar', 'Akola', 'Amravati', 'Chhatrapati Sambhajinagar', 'Beed', 'Bhandara', 'Buldhana',
  'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur',
  'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik',
  'Dharashiv', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara',
  'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialTab = 'student-login'
}) => {
  const [tab, setTab] = useState<'student-login' | 'student-register' | 'admin-login'>(initialTab);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('aarav.patil@example.com');
  const [loginPassword, setLoginPassword] = useState('password');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regSchool, setRegSchool] = useState('');
  const [regClass, setRegClass] = useState('10th Standard');
  const [regDivision, setRegDivision] = useState('A');
  const [regMedium, setRegMedium] = useState<StudentMedium>('Marathi');
  const [regDistrict, setRegDistrict] = useState('Pune');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = examStore.login(loginIdentifier, loginPassword);
    if (res.success && res.user) {
      onLoginSuccess(res.user);
      onClose();
    } else {
      setError(res.error || 'Login failed. Please check your credentials.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!regName.trim() || !regMobile.trim() || !regEmail.trim() || !regPassword.trim() || !regSchool.trim()) {
      setError('Please fill in all required registration fields.');
      return;
    }

    const res = examStore.register({
      name: regName.trim(),
      mobile: regMobile.trim(),
      email: regEmail.trim(),
      password: regPassword.trim(),
      schoolName: regSchool.trim(),
      className: regClass,
      division: regDivision,
      medium: regMedium,
      district: regDistrict
    });

    if (res.success && res.user) {
      setSuccessMsg(`Registration successful! Generated Student ID: ${res.user.id}`);
      setTimeout(() => {
        onLoginSuccess(res.user!);
        onClose();
      }, 1000);
    } else {
      setError(res.error || 'Registration failed.');
    }
  };

  const setFastAccount = (id: string, pass: string, currentTab: 'student-login' | 'admin-login') => {
    setTab(currentTab);
    setLoginIdentifier(id);
    setLoginPassword(pass);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto no-print">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="bg-blue-600 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/15 rounded-xl">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">10वी ONLINE EXAM</h2>
              <p className="text-xs text-blue-100 font-medium">Maharashtra State SSC Examination System</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => { setTab('student-login'); setError(null); }}
            className={`py-3 text-center border-b-2 transition-colors ${
              tab === 'student-login'
                ? 'border-blue-600 text-blue-700 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Student Login
          </button>
          <button
            onClick={() => { setTab('student-register'); setError(null); }}
            className={`py-3 text-center border-b-2 transition-colors ${
              tab === 'student-register'
                ? 'border-blue-600 text-blue-700 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            New Student
          </button>
          <button
            onClick={() => {
              setTab('admin-login');
              setLoginIdentifier('admin@ssc10th.org');
              setLoginPassword('admin');
              setError(null);
            }}
            className={`py-3 text-center border-b-2 transition-colors ${
              tab === 'admin-login'
                ? 'border-amber-600 text-amber-700 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Admin / Headmaster
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* STUDENT / ADMIN LOGIN */}
          {(tab === 'student-login' || tab === 'admin-login') && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {tab === 'admin-login' ? 'Admin Email / ID' : 'Student Email / Mobile / Student ID'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder={tab === 'admin-login' ? 'admin@ssc10th.org' : 'STU-000001 or aarav.patil@example.com'}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-colors shadow-xs ${
                  tab === 'admin-login' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {tab === 'admin-login' ? 'Log in to Admin Portal' : 'Log in as Student'}
              </button>

              {/* Fast Test Acc Fill */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-[11px] font-semibold text-slate-700 mb-2">Fast Demo Logins (Click to test):</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setFastAccount('aarav.patil@example.com', 'password', 'student-login')}
                    className="p-2 border border-slate-200 rounded-lg text-left hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    <div className="font-bold text-slate-800">Aarav Patil (Marathi)</div>
                    <div className="text-[10px] text-slate-700">STU-000001 • Pune</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFastAccount('rohan.k@example.com', 'password', 'student-login')}
                    className="p-2 border border-slate-200 rounded-lg text-left hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    <div className="font-bold text-slate-800">Rohan Kulkarni (English)</div>
                    <div className="text-[10px] text-slate-700">STU-000003 • Mumbai</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFastAccount('admin@ssc10th.org', 'admin', 'admin-login')}
                    className="col-span-2 p-2 border border-amber-200 bg-amber-50/50 rounded-lg text-left hover:bg-amber-100/50 transition-colors"
                  >
                    <div className="font-bold text-amber-900 flex items-center justify-between">
                      <span>Headmaster / Admin (Full Access)</span>
                      <span className="text-[10px] bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded font-bold">ADMIN</span>
                    </div>
                    <div className="text-[10px] text-slate-700">admin@ssc10th.org • pass: admin</div>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* STUDENT REGISTRATION */}
          {tab === 'student-register' && (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name (विद्यार्थ्याचे पूर्ण नाव) *</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Yash Sunil Pawar"
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={regMobile}
                    onChange={(e) => setRegMobile(e.target.value)}
                    placeholder="9822100099"
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password *</label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Create password"
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Medium (माध्यम) *</label>
                  <select
                    value={regMedium}
                    onChange={(e) => setRegMedium(e.target.value as StudentMedium)}
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="Marathi">मराठी (Marathi Medium)</option>
                    <option value="English">इंग्रजी (English Medium)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">School Name (शाळेचे नाव) *</label>
                <input
                  type="text"
                  required
                  value={regSchool}
                  onChange={(e) => setRegSchool(e.target.value)}
                  placeholder="e.g. Balmohan Vidyamandir"
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Class</label>
                  <input
                    type="text"
                    disabled
                    value={regClass}
                    className="w-full px-3 py-1.5 text-sm border border-slate-200 bg-slate-100 rounded-lg text-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Division</label>
                  <select
                    value={regDivision}
                    onChange={(e) => setRegDivision(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="A">Division A</option>
                    <option value="B">Division B</option>
                    <option value="C">Division C</option>
                    <option value="D">Division D</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">District (जिल्हा)</label>
                  <select
                    value={regDistrict}
                    onChange={(e) => setRegDistrict(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {MAHARASHTRA_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-xs"
                >
                  Register & Generate Student ID
                </button>
                <p className="text-center text-[11px] text-slate-700 mt-2">
                  System will automatically assign an official ID format like <span className="font-bold text-blue-900">STU-000021</span>.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
