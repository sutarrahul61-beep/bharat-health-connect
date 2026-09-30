import React, { useState } from 'react';
import {
  Building2,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { HospitalSession, HospitalAccountUser } from '../../types/portalTypes';
import { initialHospitalProfiles, initialHospitalUsers } from '../../data/portalMockData';

interface HospitalAuthProps {
  onLoginSuccess: (session: HospitalSession) => void;
}

export const HospitalAuth: React.FC<HospitalAuthProps> = ({ onLoginSuccess }) => {
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>('HOSP-MIRAJ-001');
  const [email, setEmail] = useState('coordinator@wanlesshospital.org');
  const [password, setPassword] = useState('Hospital@123');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuickLogin = (hospitalId: string) => {
    setLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      const user = initialHospitalUsers.find((u) => u.hospitalId === hospitalId) || initialHospitalUsers[0];
      const session: HospitalSession = {
        token: `hosp_token_${Date.now()}_${user.id}`,
        user: user,
        loginTime: new Date().toISOString(),
      };
      onLoginSuccess(session);
      setLoading(false);
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter your hospital organization credentials.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Find matching user or hospital profile
      const matchedUser = initialHospitalUsers.find(
        (u) => u.hospitalId === selectedHospitalId || u.email.toLowerCase() === email.toLowerCase()
      );

      const targetHospital = initialHospitalProfiles.find((h) => h.id === selectedHospitalId) || initialHospitalProfiles[0];

      const user: HospitalAccountUser = matchedUser || {
        id: `HOSP-USR-${Date.now().toString().slice(-4)}`,
        hospitalId: targetHospital.id,
        hospitalName: targetHospital.name,
        name: email.split('@')[0],
        email: email.trim(),
        role: 'Hospital Coordinator',
        phone: targetHospital.phone,
      };

      const session: HospitalSession = {
        token: `hosp_token_${Date.now()}`,
        user: user,
        loginTime: new Date().toISOString(),
      };

      onLoginSuccess(session);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 shadow-xl shadow-indigo-950 mb-4">
          <Building2 className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Hospital Partner Portal
        </h1>
        <p className="mt-1 text-sm text-indigo-200">
          Bharat Health Connect • Hospital Network Liaison
        </p>
        <p className="mt-2 text-xs text-slate-400 max-w-sm mx-auto">
          Dedicated clinical portal for partnered hospitals. Review assigned patient records, upload treatment estimates, and schedule surgical admissions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-800/90 backdrop-blur-md py-8 px-6 shadow-2xl rounded-2xl border border-slate-700 sm:px-10">
          {errorMessage && (
            <div className="mb-5 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Select Hospital Organization *
              </label>
              <div className="relative">
                <select
                  value={selectedHospitalId}
                  onChange={(e) => {
                    setSelectedHospitalId(e.target.value);
                    const user = initialHospitalUsers.find((u) => u.hospitalId === e.target.value);
                    if (user) {
                      setEmail(user.email);
                    }
                  }}
                  className="block w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  {initialHospitalProfiles.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name} ({h.id})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Hospital Staff Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="coordinator@hospital.org"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Staff Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? 'Authenticating...' : 'Sign In to Hospital Portal'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Hospitals */}
          <div className="mt-8 pt-6 border-t border-slate-700/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                1-Click Hospital Staff Access
              </span>
              <span className="text-[11px] text-indigo-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Partner Hub
              </span>
            </div>

            <div className="space-y-2">
              {initialHospitalProfiles.map((hosp) => (
                <button
                  key={hosp.id}
                  type="button"
                  onClick={() => handleQuickLogin(hosp.id)}
                  className="w-full p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-900 border border-slate-700/60 hover:border-indigo-500/50 text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-semibold text-white group-hover:text-indigo-300 transition-colors truncate">
                      {hosp.name}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      ID: {hosp.id} • {hosp.city}
                    </div>
                  </div>
                  <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all shrink-0">
                    Login
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-5 p-3 rounded-xl bg-slate-900/70 border border-slate-700/40 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200">Strict Hospital Isolation:</strong> You will only see patients explicitly assigned to your hospital institution. Other hospital records and internal Bharat Health Connect margins are completely restricted.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-xs text-slate-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1.5"
          >
            ← Back to Bharat Health Connect Public Website
          </a>
        </div>
      </div>
    </div>
  );
};
