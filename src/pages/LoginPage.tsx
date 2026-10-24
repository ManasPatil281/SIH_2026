import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../lib/state/AppContext';
import { DEMO_USERS, getDemoUserById } from '../lib/demo-users';
import { NivaranBrand } from '../components/common/NivaranBrand';
import {
  Lock,
  UserCheck,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  KeyRound,
  Mail,
  Building,
  CheckCircle2,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginAs, currentUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedUserId, setSelectedUserId] = useState<string>('user-regional');
  const [pinInput, setPinInput] = useState<string>('1001');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const selectedUser = getDemoUserById(selectedUserId) || DEMO_USERS[0];

  const handleSelectUser = (id: string) => {
    setSelectedUserId(id);
    const u = getDemoUserById(id);
    if (u) {
      setPinInput(u.demoPin);
    }
    setErrorMsg('');
  };

  const handleDirectQuickLogin = (id: string, targetPath: string) => {
    loginAs(id);
    navigate(targetPath);
  };

  const handleFormLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) {
      setErrorMsg('Please select an authorised role.');
      return;
    }
    if (pinInput.trim() !== selectedUser.demoPin) {
      setErrorMsg(`Invalid access code. Use '${selectedUser.demoPin}' for ${selectedUser.name}.`);
      return;
    }

    loginAs(selectedUser.id);
    const from = (location.state as any)?.from?.pathname || selectedUser.dashboardRoute;
    navigate(from);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between font-sans">
      {/* Tricolor institutional strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#D97706] via-white to-[#4DBB99] shrink-0" />

      {/* Top Header */}
      <header className="bg-[#0F294A] text-white py-3 px-6 border-b border-slate-700/80 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <NivaranBrand compact />
        </Link>
        <Link
          to="/"
          className="text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1"
        >
          <span>Return to Public Portal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* Main Login Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-900">
            <Lock className="w-3.5 h-3.5 text-blue-700" />
            <span>Authorized role access</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500 font-normal">Approval workflow operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Secure platform sign in
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Select your authorised role to access the workflows, permissions and information assigned to your office.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Quick Login Persona Grid */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Choose authorised role</h3>
                <p className="text-xs text-slate-500">Each role has distinct navigation and permissions</p>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                RBAC enabled
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
              {DEMO_USERS.map((user) => {
                const isSelected = user.id === selectedUserId;
                return (
                  <div
                    key={user.id}
                    onClick={() => handleSelectUser(user.id)}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/10'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${user.badgeColor}`}>
                          {user.roleLabel.split('/')[0]}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Access code: {user.demoPin}</span>
                      </div>
                      <div className="font-bold text-slate-900 text-xs">{user.name}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{user.designation}</div>
                      <div className="text-[10px] text-slate-400 mt-1 truncate">{user.jurisdiction}</div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-blue-700 font-semibold">
                        {isSelected ? 'Selected' : 'Select'}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDirectQuickLogin(user.id, user.dashboardRoute);
                        }}
                        className="px-2 py-1 bg-[#0F294A] hover:bg-[#0A1D36] text-white text-[10px] font-semibold rounded flex items-center gap-1 transition-colors"
                      >
                        <span>Quick Login</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Formal Sign-In Card */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-md p-6 space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">Selected Identity Sign In</h3>
              <p className="text-xs text-slate-500">Use the access code assigned to this environment</p>
            </div>

            {/* Selected User Summary Badge */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${selectedUser.badgeColor} border`}>
                {selectedUser.avatarInitial}
              </div>
              <div className="truncate flex-1">
                <div className="font-bold text-slate-900 text-xs sm:text-sm">{selectedUser.name}</div>
                <div className="text-xs text-slate-600 truncate">{selectedUser.roleLabel}</div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">{selectedUser.email}</div>
              </div>
            </div>

            <form onSubmit={handleFormLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  User identity
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={selectedUser.email}
                    disabled
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-lg text-slate-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Access code
                  </label>
                  <span className="text-[10px] font-mono text-slate-500">
                    Default: {selectedUser.demoPin}
                  </span>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0F294A]"
                    placeholder="Enter access code"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0F294A] hover:bg-[#0A1D36] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <UserCheck className="w-4 h-4" />
                <span>Sign in and open dashboard</span>
              </button>
            </form>

            <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
              <span className="font-semibold text-slate-700">Local Sandbox Architecture:</span>
              <p>
                Session persists in browser storage across refreshes. Logging in activates strictly that role's navigation and access permissions.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Disclaimer */}
      <footer className="bg-white border-t border-slate-200 py-3 px-4 text-center text-xs text-slate-500 shrink-0">
        “Independent implementation prototype. Not an official AICTE or Government of India service. Records and automated outputs are provided for evaluation.”
      </footer>
    </div>
  );
};
