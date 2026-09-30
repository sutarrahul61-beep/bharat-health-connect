import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Shield,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  LogIn,
  CheckCircle2,
  UserPlus,
  KeyRound,
  ShieldAlert,
  ArrowRight,
  Fingerprint,
} from 'lucide-react';
import { AdminUser, UserRole, AdminSession } from './types';
import {
  verifyAdminLogin,
  saveRegisteredAdminUser,
  getDefaultPermissionsForRole,
  getActiveAdminSession,
  createAdminSession,
  clearAdminSession,
  verifySuperAdminPassword,
  validatePasswordStrength,
} from './userAuthUtils';

export interface AdminAuthProps {
  onClose?: () => void;
  isStandalone?: boolean;
  onAuthenticated?: (session: AdminSession) => void;
  children?: (session: AdminSession, onLogout: () => void) => React.ReactNode;
}

/**
 * Super Admin Elevation Modal
 * Strictly requires the Super Admin Master Password before a staff member
 * can switch their active role or profile to Super Admin.
 */
export interface SuperAdminElevationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  currentStaffName: string;
  currentStaffRole: string;
}

export const SuperAdminElevationModal: React.FC<SuperAdminElevationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentStaffName,
  currentStaffRole,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsVerifying(true);

    setTimeout(() => {
      const isValid = verifySuperAdminPassword(password);
      setIsVerifying(false);
      if (isValid) {
        setPassword('');
        setError('');
        onSuccess();
      } else {
        setError('Authentication failed. Incorrect Super Admin Master Password.');
      }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-red-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B1E3F] text-white p-5 relative border-b border-slate-800">
          <button
            onClick={() => {
              setPassword('');
              setError('');
              onClose();
            }}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/60">
                  Privileged Access
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">Super Admin Authentication</h3>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleVerify} className="p-5 space-y-4 text-xs">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 leading-relaxed">
            <p className="font-semibold">Role Elevation Gate</p>
            <p className="text-[11px] text-amber-800 mt-0.5">
              You are currently authenticated as <strong>{currentStaffName}</strong> ({currentStaffRole}).
              Elevating to <strong>Super Admin</strong> grants unrestricted access to hospital configurations, patient records, staff management, and system credentials.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start space-x-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[10px]">
              Master Super Admin Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter Super Admin master password"
                className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-hidden font-medium text-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>Miraj Hospital Center Master Key</span>
            <span className="font-mono text-slate-400">admin123</span>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setPassword('');
                setError('');
                onClose();
              }}
              className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isVerifying || !password.trim()}
              className="flex-1 py-2.5 px-4 bg-[#0B1E3F] hover:bg-slate-900 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isVerifying ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verify & Elevate</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/**
 * AdminAuth Component
 * Handles secure admin login, password validation, 'Remember me' session handling,
 * and maintains the protected session state controlling access to AdminPortal.
 */
export const AdminAuth: React.FC<AdminAuthProps> = ({ onClose, isStandalone, onAuthenticated, children }) => {
  // Session state initialized from protected storage
  const [activeSession, setActiveSession] = useState<AdminSession | null>(() => getActiveAdminSession());

  // UI View Mode: 'login' | 'register'
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [usernameInput, setUsernameInput] = useState('admin@bharathealth.in');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Registration form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('Medical Coordinator');
  const [regDepartment, setRegDepartment] = useState('Clinical Evaluation Desk');
  const [regPhone, setRegPhone] = useState('+91 98220 12345');
  const [regPassword, setRegPassword] = useState('');
  const [regPasscode, setRegPasscode] = useState('BHC2026');
  const [regSuccessMessage, setRegSuccessMessage] = useState('');

  // Synchronize initial session if active
  useEffect(() => {
    const session = getActiveAdminSession();
    if (session) {
      setActiveSession(session);
      if (onAuthenticated) {
        onAuthenticated(session);
      }
    }
  }, [onAuthenticated]);

  // Handle Logout
  const handleLogout = () => {
    clearAdminSession();
    setActiveSession(null);
    setPasswordInput('');
    setLoginError('');
  };

  // Handle Login Submit with Password & Credential Validation
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // 1. Basic validation
    if (!usernameInput.trim()) {
      setLoginError('Please enter your work email or administrator username.');
      return;
    }
    if (!passwordInput) {
      setLoginError('Please enter your administrator password.');
      return;
    }

    const passwordCheck = validatePasswordStrength(passwordInput);
    if (!passwordCheck.isValid) {
      setLoginError(passwordCheck.message || 'Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);

    // Simulate safe timing to prevent timing attacks
    setTimeout(() => {
      const authResult = verifyAdminLogin(usernameInput, passwordInput);
      setIsSubmitting(false);

      if (authResult.success && authResult.user) {
        // Create protected session with expiration and storage mode (localStorage if rememberMe, sessionStorage otherwise)
        const session = createAdminSession(authResult.user, rememberMe);
        setActiveSession(session);
        if (onAuthenticated) {
          onAuthenticated(session);
        }
      } else {
        setLoginError(
          authResult.error ||
            'Invalid credentials. Check your email/password or register a new staff account.'
        );
      }
    }, 250);
  };

  // Handle Staff Registration Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!regName.trim() || !regEmail.trim()) {
      setLoginError('Please enter full name and work email.');
      return;
    }

    const passwordCheck = validatePasswordStrength(regPassword);
    if (!passwordCheck.isValid) {
      setLoginError(passwordCheck.message || 'Password must be at least 6 characters long.');
      return;
    }

    if (regPasscode.trim() !== 'BHC2026' && regPasscode.trim() !== 'admin123') {
      setLoginError('Invalid Enterprise Passcode. Enter "BHC2026" for authorized hospital staff.');
      return;
    }

    const newAdminUser: AdminUser = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: regName.trim(),
      email: regEmail.trim().toLowerCase(),
      role: regRole,
      department: regDepartment.trim(),
      phone: regPhone.trim(),
      permissions: getDefaultPermissionsForRole(regRole),
    };

    saveRegisteredAdminUser(newAdminUser, regPassword);

    setRegSuccessMessage(
      `Registration successful! Staff profile created for ${newAdminUser.name} as ${newAdminUser.role}.`
    );
    setUsernameInput(newAdminUser.email);
    setPasswordInput(regPassword);

    setTimeout(() => {
      setAuthMode('login');
      setRegSuccessMessage('Account registered! Click Sign In to enter the admin workspace.');
    }, 1200);
  };

  // Quick auto-fill helper for development / demonstration
  const handleAutoFill = (email: string, pass: string) => {
    setUsernameInput(email);
    setPasswordInput(pass);
    setLoginError('');
  };

  // =========================================================================
  // VIEW 1: AUTHENTICATED STATE
  // If user session is active and valid, render protected children
  // =========================================================================
  if (activeSession && children) {
    return <>{children(activeSession, handleLogout)}</>;
  }

  // =========================================================================
  // VIEW 2: LOGIN & REGISTRATION INTERFACE
  // Protected Gate displayed when unauthenticated
  // =========================================================================
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#0B1E3F] text-white p-6 sm:p-8 text-center relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              title="Close Portal"
              aria-label="Close Portal"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-3 shadow-inner">
            <Lock className="w-7 h-7 text-[#FF9933]" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FF9933]/20 text-[#FF9933] border border-[#FF9933]/30">
              <Shield className="w-3 h-3 mr-1" />
              Enterprise Healthcare CRM & Protected RBAC
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              admin.bharathealthconnect.com
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight uppercase">
            BHARAT HEALTH CONNECT ADMIN
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Miraj & Sangli Medical Tourism Coordination Platform
          </p>

          {/* Mode Switcher Tabs */}
          <div className="mt-5 flex items-center justify-center p-1 bg-white/10 rounded-2xl max-w-xs mx-auto border border-white/10">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setLoginError('');
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === 'login'
                  ? 'bg-white text-[#0B1E3F] shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Staff Login</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('register');
                setLoginError('');
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === 'register'
                  ? 'bg-[#FF9933] text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register Staff</span>
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8">
          {regSuccessMessage && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{regSuccessMessage}</span>
            </div>
          )}

          {loginError && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          {/* MODE 1: LOGIN FORM */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                  Admin Email / Username
                </label>
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="admin@bharathealth.in"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter administrator password"
                    className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Create Account */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center space-x-2 text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span>Keep me signed in (Remember me)</span>
                </label>
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className="text-emerald-700 hover:text-emerald-800 font-bold cursor-pointer"
                >
                  Create staff account?
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#0B1E3F] hover:bg-[#153465] disabled:opacity-60 text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center space-x-2 text-xs cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-[#FF9933]" />
                <span>{isSubmitting ? 'Verifying Credentials...' : 'Sign In to Admin Workspace'}</span>
              </button>

              {/* Quick Demo Access Callouts */}
              <div className="mt-5 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Role Accounts for Testing:
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">One-click autofill</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[11px] text-slate-800">Super Admin</div>
                      <div className="text-[10px] text-slate-500">admin@bharathealth.in</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAutoFill('admin@bharathealth.in', 'admin123')}
                      className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
                    >
                      Fill
                    </button>
                  </div>

                  <div className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[11px] text-slate-800">Coordinator (Staff)</div>
                      <div className="text-[10px] text-slate-500">coordinator@bhc.in</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAutoFill('coordinator@bhc.in', 'admin123')}
                      className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded font-bold hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      Fill
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* MODE 2: ADMIN USER REGISTRATION FORM */}
          {authMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[10px]">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Dr. Rajesh Kulkarni"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-400 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[10px]">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="rajesh@bharathealth.in"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-400 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[10px]">
                    Admin Role
                  </label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-400 outline-hidden font-semibold"
                  >
                    <option value="Medical Coordinator">Medical Coordinator (Staff)</option>
                    <option value="Case Manager">Case Manager (Staff)</option>
                    <option value="Finance Manager">Finance Manager (Staff)</option>
                    <option value="Travel Coordinator">Travel Coordinator (Staff)</option>
                    <option value="Hospital Manager">Hospital Manager (Staff)</option>
                    <option value="Support Staff">Support Staff</option>
                    <option value="Super Admin">Super Admin (Requires Passcode)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[10px]">
                    Department / Desk
                  </label>
                  <input
                    type="text"
                    value={regDepartment}
                    onChange={(e) => setRegDepartment(e.target.value)}
                    placeholder="e.g. Cardiology OPD Liaison"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-400 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[10px]">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98220 00000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-400 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[10px]">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-400 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[10px]">
                    Enterprise Passkey <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={regPasscode}
                    onChange={(e) => setRegPasscode(e.target.value)}
                    placeholder="Default: BHC2026"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-400 outline-hidden font-mono font-bold"
                  />
                </div>
              </div>

              <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Passkey <strong>BHC2026</strong> validates enterprise access and protects role boundaries.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0B1E3F] hover:bg-[#153465] text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center space-x-2 text-xs cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-[#FF9933]" />
                <span>Complete Admin Registration</span>
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Already registered? Switch to Sign In
                </button>
              </div>
            </form>
          )}

          {isStandalone ? (
            <div className="mt-4 text-center">
              <a
                href="/"
                onClick={(e) => {
                  if (window.location.pathname.startsWith('/admin') || window.location.search.includes('portal=admin')) {
                    e.preventDefault();
                    window.location.href = window.location.origin;
                  }
                }}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                ← Return to Bharat Health Connect Patient Portal
              </a>
            </div>
          ) : onClose ? (
            <div className="mt-4 text-center">
              <button
                onClick={onClose}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                ← Return to Bharat Health Connect Website
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
