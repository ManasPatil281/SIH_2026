import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../lib/state/AppContext';
import { LiveAgentAutomationModal } from '../../components/common/LiveAgentAutomationModal';
import {
  ListFilter,
  FileSpreadsheet,
  ShieldCheck,
  Network,
  Cpu,
  CheckCircle2,
  Archive,
  History,
  AlertTriangle,
  Scale,
  Stamp,
  FileText,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const DecisionWorkspace: React.FC = () => {
  const {
    appCase,
    currentUser,
    recordDecision,
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  // Active subview
  const path = location.pathname;
  let activeTab = 'dashboard';
  if (path.includes('/approval-inbox')) activeTab = 'approval-inbox';
  else if (path.includes('/history')) activeTab = 'history';

  const [showLiveAutomation, setShowLiveAutomation] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Decision form
  const [verdict, setVerdict] = useState<'APPROVED' | 'REJECTED' | 'REFERRED_TO_SHC'>('APPROVED');
  const [resolutionNo, setResolutionNo] = useState('SHC-WR-2026-BSIET-0492');
  const [rationale, setRationale] = useState(
    'Simulated committee brief for Dr. Bapuji Salunkhe Institute and a simulated 2026–27 EoA application. Public historical reports are reference context only. The synthetic computer inventory and supporting evidence require authorised human verification against AICTE Approval Process Handbook 2024–25 to 2026–27, Annexure 4, Section 4.1.'
  );
  const [conditionText, setConditionText] = useState(
    '1. Completion of tactile paving in external courtyard prior to academic session.\n2. Compliance with mandatory biometric faculty attendance portal.'
  );

  React.useEffect(() => {
    if (appCase.id === 'NIVARAN-VESIT-2026-27') {
      setResolutionNo('SAC-WR-2026-VESIT-0118');
      setRationale(
        "Standing Appellate Committee (SAC) brief for Vivekanand Education Society's Institute of Technology (VESIT), Chembur. Application for Setting up New Technical Institution. 30-year registered lease deed, ₹1 Crore FDR joint endowment pledge, and AICTE emerging curricula alignment verified under APH Chapter I Clause 1.8."
      );
      setConditionText(
        '1. Completion of Sub-Registrar lease annual rent endorsement receipt filing before 30-Nov-2026.\n2. Final compliance submission of Phase-2 IoT hardware laboratory procurement invoice.'
      );
    } else {
      setResolutionNo('SHC-WR-2026-BSIET-0492');
      setRationale(
        'Simulated committee brief for Dr. Bapuji Salunkhe Institute and a simulated 2026–27 EoA application. Public historical reports are reference context only. The synthetic computer inventory and supporting evidence require authorised human verification against AICTE Approval Process Handbook 2024–25 to 2026–27, Annexure 4, Section 4.1.'
      );
      setConditionText(
        '1. Completion of tactile paving in external courtyard prior to academic session.\n2. Compliance with mandatory biometric faculty attendance portal.'
      );
    }
  }, [appCase.id]);

  const gates = {
    ...appCase.decisionDetails.gatesPassed,
    documentVerification:
      appCase.documents.length > 0 && appCase.documents.every((document) => document.status === 'VERIFIED'),
    scrutinyChecklist:
      appCase.checklist.length > 0 &&
      appCase.checklist.every((item) => item.status === 'SATISFIED' || item.status === 'EXEMPTED'),
    clarificationsResolved:
      appCase.clarifications.length > 0 &&
      appCase.clarifications.every((clarification) => clarification.status === 'RESOLVED'),
    evcCompleted: !appCase.evcDetails.required || appCase.evcDetails.status === 'INSPECTION_COMPLETED' || appCase.evcDetails.status === 'REPORT_SUBMITTED' || appCase.evcDetails.status === 'NOT_REQUIRED',
  };
  const allGatesPassed =
    gates.documentVerification &&
    gates.scrutinyChecklist &&
    gates.clarificationsResolved &&
    gates.evcCompleted;

  const handleRecordDecision = (e: React.FormEvent) => {
    e.preventDefault();
    const conditions = conditionText.split('\n').filter((s) => s.trim().length > 0);
    const res = recordDecision(verdict, resolutionNo, rationale, conditions);
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
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700">
            <span>Apex Approval & Statutory Regulatory Board</span>
            <span>·</span>
            <span>Standing Hearing Committee (SHC)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Committee Decision & Final Resolution Docket
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Presiding Authority: {currentUser?.name} · Case ID: {appCase.id} ({appCase.institutionName})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLiveAutomation(true)}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
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

      {/* Statutory Gating Conditions Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Prerequisite Approval Gating Verification
            </h2>
            <p className="text-xs text-slate-500">
              AI agents cannot approve applications. Consequential approval requires all statutory prerequisite gates to be certified.
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${
              allGatesPassed
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-amber-100 text-amber-800 border-amber-300'
            }`}
          >
            {allGatesPassed ? 'ALL PREREQUISITE GATES PASSED' : 'PREREQUISITES OUTSTANDING'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className={`p-3.5 rounded-lg border flex items-start gap-2.5 ${
            gates.documentVerification ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}>
            {gates.documentVerification ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-bold block">1. Document Verification</span>
              <span className="text-[11px] text-slate-600">
                {gates.documentVerification ? 'All documents signed off' : 'Pending doc verification sign-off'}
              </span>
            </div>
          </div>

          <div className={`p-3.5 rounded-lg border flex items-start gap-2.5 ${
            gates.scrutinyChecklist ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}>
            {gates.scrutinyChecklist ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-bold block">2. Scrutiny Checklist</span>
              <span className="text-[11px] text-slate-600">
                {gates.scrutinyChecklist ? '5 of 5 norms satisfied' : 'Checklist items flagged deficient'}
              </span>
            </div>
          </div>

          <div className={`p-3.5 rounded-lg border flex items-start gap-2.5 ${
            gates.clarificationsResolved ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}>
            {gates.clarificationsResolved ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-bold block">3. Clarifications Resolved</span>
              <span className="text-[11px] text-slate-600">
                {gates.clarificationsResolved ? 'All queries closed' : 'Clarification CLR/2026/01 outstanding'}
              </span>
            </div>
          </div>

          <div className={`p-3.5 rounded-lg border flex items-start gap-2.5 ${
            gates.evcCompleted ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}>
            {gates.evcCompleted ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-bold block">4. EVC Inspection</span>
              <span className="text-[11px] text-slate-600">
                {gates.evcCompleted ? 'Inspection completed / Not required' : 'Pending inspection report'}
              </span>
            </div>
          </div>

          {!allGatesPassed && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-950">
                How to complete the outstanding gate
              </h3>
              <p className="text-xs text-amber-900 mt-1">
                The committee cannot record an approval until every prerequisite is completed by the responsible role.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {!gates.clarificationsResolved && (
                  <button
                    type="button"
                    onClick={() => navigate('/reviewer/clarifications')}
                    className="px-3 py-2 rounded-lg bg-white border border-amber-300 text-amber-950 text-xs font-semibold hover:bg-amber-100 transition-colors"
                  >
                    1. Open reviewer clarification
                  </button>
                )}
                {!gates.documentVerification && (
                  <button
                    type="button"
                    onClick={() => navigate('/verifier/comparison')}
                    className="px-3 py-2 rounded-lg bg-white border border-amber-300 text-amber-950 text-xs font-semibold hover:bg-amber-100 transition-colors"
                  >
                    2. Complete document verification
                  </button>
                )}
                {!gates.evcCompleted && (
                  <button
                    type="button"
                    onClick={() => navigate('/evc/readiness')}
                    className="px-3 py-2 rounded-lg bg-white border border-amber-300 text-amber-950 text-xs font-semibold hover:bg-amber-100 transition-colors"
                  >
                    3. Complete EVC report
                  </button>
                )}
              </div>
              {!gates.clarificationsResolved && (
                <p className="text-[11px] text-amber-800 mt-3">
                  {appCase.id === 'NIVARAN-VESIT-2026-27'
                    ? 'For CLR/2026/02: VESIT has submitted lease endorsement details; Reviewer must sign off and resolve the clarification.'
                    : 'For CLR/2026/01: the institution must submit its response, the Document Verifier must sign off the updated evidence, and Dr. Arvind Joshi must select Sign Off & Resolve Clarification.'}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 1. Case Summary & Executive Brief */}
      {(activeTab === 'dashboard' || activeTab === 'summary' || activeTab === 'queue') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 space-y-5">
            <div>
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
                Executive Case Summary
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                Docket {appCase.id} — {appCase.institutionName}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                New Undergraduate Programme Proposal: {appCase.programme}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Institution & Trust</span>
                <span className="font-bold text-slate-900">{appCase.institutionName}</span>
                <p className="text-slate-500 mt-0.5">Sponsored by Shri Saraswati Technical Education Trust (Reg E-1849)</p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Campus Location</span>
                <span className="font-bold text-slate-900">Kolhapur, Maharashtra (Western Region)</span>
                <p className="text-slate-500 mt-0.5">7.5 Acres Contiguous Parcel · Survey 42/1-B</p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Proposed Intake</span>
                <span className="font-bold text-slate-900">60 Undergraduate Seats</span>
                <p className="text-slate-500 mt-0.5">B.E./B.Tech Computer Science & Engineering (AI & ML)</p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Current State</span>
                <span className="font-mono text-blue-900 font-bold">{appCase.status}</span>
                <p className="text-slate-500 mt-0.5">Assigned Reviewer: {appCase.assignedReviewer}</p>
              </div>
            </div>

            {/* Findings summary */}
            <div>
              <h3 className="font-bold text-xs text-slate-700 uppercase tracking-wider mb-2">
                Scrutiny Findings Summary
              </h3>
              <div className="space-y-2">
                {appCase.findings.map((f) => (
                  <div key={f.id} className="p-3 rounded-lg border border-slate-200 bg-white text-xs flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          f.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {f.severity}
                        </span>
                        <span className="font-semibold text-slate-900">{f.title}</span>
                      </div>
                      <p className="text-slate-600">{f.description}</p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 shrink-0">
                      {f.resolved ? 'RESOLVED' : 'ACTIVE'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Record simulated decision */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <div>
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
                Step 8 of Guided Hackathon Demo
              </span>
              <h3 className="font-bold text-sm text-slate-900 mt-0.5">
                Record Statutory Decision
              </h3>
            </div>

            <form onSubmit={handleRecordDecision} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Decision Verdict</label>
                <select
                  value={verdict}
                  onChange={(e) => setVerdict(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-bold"
                >
                  <option value="APPROVED">APPROVED (Grant of Approval for 60 Seats)</option>
                  <option value="REJECTED">REJECTED (Statutory Requirements Not Met)</option>
                  <option value="REFERRED_TO_SHC">REFERRED TO STANDING HEARING COMMITTEE (SHC)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Resolution Number</label>
                <input
                  type="text"
                  value={resolutionNo}
                  onChange={(e) => setResolutionNo(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Verdict Rationale</label>
                <textarea
                  rows={4}
                  value={rationale}
                  onChange={(e) => setRationale(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Conditions of Approval</label>
                <textarea
                  rows={2}
                  value={conditionText}
                  onChange={(e) => setConditionText(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono text-[11px]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!allGatesPassed && verdict === 'APPROVED'}
                  className={`w-full py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors ${
                    !allGatesPassed && verdict === 'APPROVED'
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  }`}
                >
                  <Stamp className="w-4 h-4" />
                  <span>Sign & Record Regulatory Decision</span>
                </button>
                {!allGatesPassed && verdict === 'APPROVED' && (
                  <p className="text-[11px] text-rose-600 mt-1.5 leading-tight">
                    * Blocked: Prerequisite gates must be satisfied before recording approval.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Committee Workflows (SHC, SAC, SCSC) */}
      {activeTab === 'workflows' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Statutory Committee Hierarchy (AICTE Governance Framework)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-2">
              <span className="font-bold text-slate-900 text-sm block">1. Scrutiny Committee (SCSC)</span>
              <p className="text-slate-600 leading-relaxed">
                First line of digital technical and legal scrutiny. Evaluates APH land, civil, computing, and faculty norms.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-2">
              <span className="font-bold text-slate-900 text-sm block">2. Standing Hearing Committee (SHC)</span>
              <p className="text-slate-600 leading-relaxed">
                Appellate forum where institutions present physical or documentary compliance against deficiency notices.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-2">
              <span className="font-bold text-slate-900 text-sm block">3. Standing Appellate Committee (SAC)</span>
              <p className="text-slate-600 leading-relaxed">
                Apex appellate bench headed by retired High Court Judge for final constitutional compliance reviews.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'approval-inbox' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Approval inbox</span>
            <h2 className="text-base font-bold text-slate-900 mt-1">Cases ready for committee action</h2>
            <p className="text-xs text-slate-500 mt-1">Review prerequisite gates and record an authorised decision for each docket.</p>
          </div>
          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <p className="text-xs font-bold text-indigo-900">{appCase.id} · {appCase.institutionName}</p>
                <p className="text-[11px] text-indigo-800 mt-1">{appCase.programme} · {appCase.status}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                allGatesPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {allGatesPassed ? 'READY FOR DECISION' : 'GATES NEED ATTENTION'}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-[11px]">
              {[
                ['Documents', gates.documentVerification],
                ['Scrutiny', gates.scrutinyChecklist],
                ['Clarifications', gates.clarificationsResolved],
                ['EVC', gates.evcCompleted],
              ].map(([label, passed]) => (
                <div key={String(label)} className="p-2 rounded bg-white border border-indigo-100">
                  <span className="text-slate-500">{label}</span>
                  <span className={`block font-bold mt-1 ${passed ? 'text-emerald-700' : 'text-rose-700'}`}>{passed ? 'Passed' : 'Pending'}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-600">Use the dashboard or Executive Case Summary below to enter the resolution, rationale, and conditions.</p>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Decision history</span>
            <h2 className="text-base font-bold text-slate-900 mt-1">Recorded decisions and resolutions</h2>
            <p className="text-xs text-slate-500 mt-1">A read-through of decision-related events for this application.</p>
          </div>
          <div className="space-y-3">
            {appCase.auditLog.filter((event) => /decision|approval|rejection|resolution/i.test(`${event.action} ${event.summary}`)).map((event) => (
              <div key={event.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50 flex items-start justify-between gap-4 text-xs">
                <div>
                  <p className="font-bold text-slate-900">{event.action}</p>
                  <p className="text-slate-600 mt-1">{event.summary}</p>
                  <p className="text-[11px] text-slate-400 mt-2">Recorded by {event.actorName}</p>
                </div>
                <span className="text-[11px] text-slate-500 whitespace-nowrap">{new Date(event.timestamp).toLocaleString()}</span>
              </div>
            ))}
            {appCase.auditLog.filter((event) => /decision|approval|rejection|resolution/i.test(`${event.action} ${event.summary}`)).length === 0 && (
              <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
                No decision has been recorded for this docket yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Live Interactive Agent Automation Modal */}
      <LiveAgentAutomationModal
        isOpen={showLiveAutomation}
        onClose={() => setShowLiveAutomation(false)}
        defaultAgentId="agent-decision"
        onActionAdopted={(action) => {
          setFeedbackMsg({
            type: 'success',
            text: `Agent automation completed: ${action}`,
          });
          setTimeout(() => setFeedbackMsg(null), 4000);
        }}
      />
    </div>
  );
};
