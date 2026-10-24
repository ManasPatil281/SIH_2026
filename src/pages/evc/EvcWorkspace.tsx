import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../lib/state/AppContext';
import { LiveAgentAutomationModal } from '../../components/common/LiveAgentAutomationModal';
import {
  Clock,
  Calendar,
  ShieldAlert,
  Eye,
  FileText,
  Stamp,
  Bell,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MapPin,
  Users,
  Sparkles,
} from 'lucide-react';

export const EvcWorkspace: React.FC = () => {
  const {
    appCase,
    currentUser,
    toggleEVCRequired,
    scheduleEVC,
    submitEVCReport,
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  // Active subview
  const path = location.pathname;
  let activeTab = 'dashboard';
  if (path.includes('/queue')) activeTab = 'queue';
  else if (path.includes('/schedule')) activeTab = 'schedule';
  else if (path.includes('/readiness')) activeTab = 'readiness';
  else if (path.includes('/observations')) activeTab = 'observations';
  else if (path.includes('/report')) activeTab = 'report';
  else if (path.includes('/sign-off')) activeTab = 'sign-off';

  const [showLiveDemo, setShowLiveDemo] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form states
  const [scheduledDate, setScheduledDate] = useState('2026-04-05');
  const [inspectionMode, setInspectionMode] = useState<'Physical' | 'Hybrid / Digital'>('Physical');
  const [teamMembers, setTeamMembers] = useState('Prof. K. Ramanathan (IIT Bombay), Dr. Anita Deshmukh (COEP Pune)');
  const [reportVerdict, setReportVerdict] = useState<'RECOMMENDED_APPROVAL' | 'CONDITIONAL_APPROVAL' | 'NOT_RECOMMENDED'>('RECOMMENDED_APPROVAL');
  const [obs1, setObs1] = useState('Continuous 7.5-acre boundary verified with geo-coordinates.');
  const [obs2, setObs2] = useState('Synthetic CSE department computer-lab evidence queued for physical or documentary verification.');

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const members = teamMembers.split(',').map((s) => s.trim());
    const res = scheduleEVC(scheduledDate, members, inspectionMode);
    setFeedbackMsg({
      type: res.success ? 'success' : 'error',
      text: res.message,
    });
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    const res = submitEVCReport(reportVerdict, [obs1, obs2]);
    setFeedbackMsg({
      type: res.success ? 'success' : 'error',
      text: res.message,
    });
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
            <span>Directorate of Inspection & Physical Infrastructure</span>
            <span>·</span>
            <span>EVC Coordination</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Expert Visit Committee (EVC) Operations
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Convener: {currentUser?.name} · Jurisdiction: Western Zone Inspection Panels
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowLiveDemo(true)}
            className="px-3 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-all flex items-center gap-1.5"
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

      {/* Scenario Condition Notice */}
      <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Statutory Inspection Condition:
            </span>
            <span
              className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
                appCase.evcDetails.required
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}
            >
              {appCase.evcDetails.required ? 'PHYSICAL EVC TRIGGERED' : 'STANDARD DIGITAL FLOW (EVC NOT REQUIRED)'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                toggleEVCRequired(
                  !appCase.evcDetails.required,
                  appCase.evcDetails.required
                    ? 'Returned to standard digital scrutiny flow'
                    : 'Scenario condition: Simulating surprise vigilance audit drawn in 5% automated cohort.'
                )
              }
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded border border-slate-300 transition-colors"
            >
              Toggle EVC Scenario Condition
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          As per APH 2026-27 Chapter II Clause 2.14, EVC is not mandatory for existing technical institutions unless specific physical ambiguities or random vigilance sampling occurs.
        </p>
      </div>

      {/* 1. Inspection Schedule View */}
      {(activeTab === 'dashboard' || activeTab === 'schedule' || activeTab === 'queue') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              Schedule Expert Visit Committee (EVC) Inspection
            </h2>
            <form onSubmit={handleSchedule} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Inspection Date</label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Inspection Mode</label>
                <select
                  value={inspectionMode}
                  onChange={(e) => setInspectionMode(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                >
                  <option value="Physical">Physical On-Site Verification (Standard EVC)</option>
                  <option value="Hybrid / Digital">Hybrid / Geo-Tagged Live Video Protocol</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Designated Expert Panel Members
                </label>
                <input
                  type="text"
                  value={teamMembers}
                  onChange={(e) => setTeamMembers(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0F294A] hover:bg-[#0A1D36] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm Inspection Schedule & Notify Institution</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Inspection Readiness Index</h3>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Readiness Score:</span>
                <span className="font-bold text-emerald-800 text-sm">94 / 100</span>
              </div>
              <div className="space-y-1.5 pt-1 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Land boundary geo-fencing complete</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Fire hydrants & static water tank operational</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>AI/ML Computing Lab 101 hardware installed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. EVC Report & Sign-off Subview */}
      {(activeTab === 'report' || activeTab === 'sign-off') && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-3xl space-y-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Submit Expert Visit Committee Report & Recommendations
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Formal inspection findings for submission to the Apex Decision Authority.
            </p>
          </div>

          <form onSubmit={handleSubmitReport} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                EVC Recommendation Verdict
              </label>
              <select
                value={reportVerdict}
                onChange={(e) => setReportVerdict(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-semibold"
              >
                <option value="RECOMMENDED_APPROVAL">RECOMMENDED FOR APPROVAL (All physical norms compliant)</option>
                <option value="CONDITIONAL_APPROVAL">CONDITIONAL APPROVAL (Minor courtyard rectification required)</option>
                <option value="NOT_RECOMMENDED">NOT RECOMMENDED (Critical physical deficiencies noted)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Observation 1 (Land & Civil)</label>
              <input
                type="text"
                value={obs1}
                onChange={(e) => setObs1(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Observation 2 (Academic Labs)</label>
              <input
                type="text"
                value={obs2}
                onChange={(e) => setObs2(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#0F294A] hover:bg-[#0A1D36] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Stamp className="w-4 h-4" />
                <span>Submit Endorsed EVC Report to Decision Docket</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Live Agent Automation Step Demo Modal */}
      <LiveAgentAutomationModal
        isOpen={showLiveDemo}
        onClose={() => setShowLiveDemo(false)}
        initialAgentId="agent-evc"
      />
    </div>
  );
};
