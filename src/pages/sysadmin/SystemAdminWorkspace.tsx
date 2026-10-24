import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../lib/state/AppContext';
import { DEMO_USERS } from '../../lib/demo-users';
import { LiveAgentAutomationModal } from '../../components/common/LiveAgentAutomationModal';
import {
  Users,
  TableProperties,
  Cable,
  Mail,
  CalendarClock,
  HeartPulse,
  FileCode,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Server,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';

export const SystemAdminWorkspace: React.FC = () => {
  const {
    currentUser,
    notifications,
    resetDemoState,
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  // Active subview
  const path = location.pathname;
  let activeTab = 'dashboard';
  if (path.includes('/users')) activeTab = 'users';
  else if (path.includes('/matrix')) activeTab = 'matrix';
  else if (path.includes('/integrations')) activeTab = 'integrations';
  else if (path.includes('/outbox')) activeTab = 'outbox';
  else if (path.includes('/scheduler')) activeTab = 'scheduler';
  else if (path.includes('/health')) activeTab = 'health';
  else if (path.includes('/logs')) activeTab = 'logs';
  else if (path.includes('/reset')) activeTab = 'reset';

  const [showLiveDemo, setShowLiveDemo] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleReset = () => {
    if (window.confirm('Reset all simulated application, verification, and audit states back to initial seed data?')) {
      resetDemoState();
      setFeedbackMsg({
        type: 'success',
        text: 'System state successfully reset to pristine hackathon baseline.',
      });
      setTimeout(() => setFeedbackMsg(null), 4000);
    }
  };

  const mockGateways = [
    { name: 'DigiLocker Academic Verification Gateway', status: 'OPERATIONAL', latency: '18ms', protocol: 'REST / OAuth2 Client', requests: '1,420 / hr' },
    { name: 'Maharashtra IGR Land Registry (Mahabhulekh)', status: 'OPERATIONAL', latency: '26ms', protocol: 'State Portal Webhook', requests: '890 / hr' },
    { name: 'Authorised university affiliation registry (mock)', status: 'OPERATIONAL', latency: '31ms', protocol: 'REST / JSON-RPC', requests: '340 / hr' },
    { name: 'AICTE Central Approval National Repository', status: 'OPERATIONAL', latency: '14ms', protocol: 'High-Speed Backbone', requests: '3,800 / hr' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700">
            <span>National Portal Infrastructure & Systems Operations</span>
            <span>·</span>
            <span>Platform Administration</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            System Administration & Platform Operations
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Systems Architect: {currentUser?.name} · Active Personas: 9 · Integrations: 4
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowLiveDemo(true)}
            className="px-3 py-2 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Live Agent Automation Demo</span>
          </button>
        </div>
      </div>

      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-lg border text-xs font-medium flex items-center gap-2 ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {feedbackMsg.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          )}
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* 1. Role and Permission Matrix */}
      {(activeTab === 'dashboard' || activeTab === 'matrix') && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Granular Role & Permission Matrix (9 Roles)
              </h2>
              <p className="text-xs text-slate-500">
                Evaluates access controls across case intake, scrutiny, verification, and final decision powers
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-semibold">
              Strict RBAC Model
            </span>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Role / Persona</th>
                  <th className="px-3 py-3 text-center">Case Intake / Assign</th>
                  <th className="px-3 py-3 text-center">Scrutiny / Clarification</th>
                  <th className="px-3 py-3 text-center">Document Sign-Off</th>
                  <th className="px-3 py-3 text-center">EVC Schedule</th>
                  <th className="px-3 py-3 text-center">Apex Decision</th>
                  <th className="px-3 py-3 text-center">Audit (Read-Only)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {DEMO_USERS.map((u) => {
                  const has = (p: string) => u.permissions.some((perm) => perm.includes(p));
                  return (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900">{u.name}</div>
                        <div className="text-[11px] text-slate-500">{u.roleLabel}</div>
                      </td>
                      <td className="px-3 py-3 text-center">
                        {has('case.assign') || has('case.create') ? (
                          <span className="text-emerald-700 font-bold">ALLOWED</span>
                        ) : (
                          <span className="text-slate-300 font-mono">-</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {has('clarification') || has('review') ? (
                          <span className="text-emerald-700 font-bold">ALLOWED</span>
                        ) : (
                          <span className="text-slate-300 font-mono">-</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {has('document.verify') ? (
                          <span className="text-teal-700 font-bold">ALLOWED</span>
                        ) : (
                          <span className="text-slate-300 font-mono">-</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {has('evc') ? (
                          <span className="text-amber-700 font-bold">ALLOWED</span>
                        ) : (
                          <span className="text-slate-300 font-mono">-</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {has('decision') ? (
                          <span className="text-rose-700 font-bold">ALLOWED</span>
                        ) : (
                          <span className="text-slate-300 font-mono">-</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {u.role === 'auditor' ? (
                          <span className="text-purple-700 font-bold">EXCLUSIVE READ</span>
                        ) : (
                          <span className="text-slate-400">READ SCOPE</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. Mock Integrations */}
      {(activeTab === 'integrations' || activeTab === 'health') && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            External Government Integration Connectors (Simulated)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockGateways.map((g, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{g.name}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {g.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-600 pt-1 font-mono text-[11px]">
                  <div>Latency: <span className="text-slate-900 font-semibold">{g.latency}</span></div>
                  <div>Throughput: <span className="text-slate-900 font-semibold">{g.requests}</span></div>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Protocol: {g.protocol}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Demo User Directory */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Demo User Directory (9 Configured Personas)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DEMO_USERS.map((user) => (
              <div key={user.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${user.badgeColor}`}>
                    {user.roleLabel}
                  </span>
                  <span className="font-mono text-slate-400 text-[11px]">PIN: {user.demoPin}</span>
                </div>
                <div className="font-bold text-slate-900 text-sm">{user.name}</div>
                <div className="text-slate-600">{user.designation}</div>
                <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Notification Outbox */}
      {activeTab === 'outbox' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Simulated Notification Queue & Outbox ({notifications.length} Messages)
          </h2>
          <div className="space-y-3 text-xs">
            {notifications.map((n) => (
              <div key={n.id} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{n.title}</span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    To: {n.recipientRole} · {new Date(n.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-slate-600">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Demo Reset View */}
      {activeTab === 'reset' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 max-w-2xl">
          <h2 className="text-base font-bold text-slate-900">
            Reset Demo Prototype State
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Restores initial seeded records for docket AADHAR-BSIET-2026-27, resets all checklist evaluations, notifications, and workflow revisions back to the original baseline.
          </p>
          <div className="pt-2">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset State to Seed Baseline</span>
            </button>
          </div>
        </div>
      )}

      {/* Live Agent Automation Step Demo Modal */}
      <LiveAgentAutomationModal
        isOpen={showLiveDemo}
        onClose={() => setShowLiveDemo(false)}
        initialAgentId="agent-sysadmin"
      />
    </div>
  );
};
