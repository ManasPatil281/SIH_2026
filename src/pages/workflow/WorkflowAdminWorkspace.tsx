import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../lib/state/AppContext';
import { LiveAgentAutomationModal } from '../../components/common/LiveAgentAutomationModal';
import { CommitteeWorkflowMap } from './CommitteeWorkflowMap';
import { OperationsControlCenter } from '../../components/common/OperationsControlCenter';
import {
  Workflow,
  GitBranch,
  Sliders,
  Lock,
  Layers,
  FileDiff,
  CheckCircle,
  History,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

export const WorkflowAdminWorkspace: React.FC = () => {
  const {
    workflowRevisions,
    currentUser,
    appCase,
    proposeWorkflowRevision,
    publishWorkflowRevision,
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  // Active subview
  const path = location.pathname;
  let activeTab = 'dashboard';
  if (path.includes('/builder')) activeTab = 'builder';
  else if (path.includes('/transitions')) activeTab = 'transitions';
  else if (path.includes('/rules')) activeTab = 'rules';
  else if (path.includes('/gates')) activeTab = 'gates';
  else if (path.includes('/versions')) activeTab = 'versions';
  else if (path.includes('/proposals')) activeTab = 'proposals';
  else if (path.includes('/validation')) activeTab = 'validation';
  else if (path.includes('/routes')) activeTab = 'routes';

  const [showLiveDemo, setShowLiveDemo] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Proposal form
  const [newVersion, setNewVersion] = useState('v2026.3-DRAFT');
  const [changesSummary, setChangesSummary] = useState(
    'Introduce automated fast-track path for NAAC A++ accredited institutes and relaxation of 10% built-up carpet threshold.'
  );

  const handlePropose = (e: React.FormEvent) => {
    e.preventDefault();
    const res = proposeWorkflowRevision(newVersion, changesSummary, 6);
    setFeedbackMsg({
      type: res.success ? 'success' : 'error',
      text: res.message,
    });
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const handlePublish = (v: string) => {
    const res = publishWorkflowRevision(v);
    setFeedbackMsg({
      type: res.success ? 'success' : 'error',
      text: res.message,
    });
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const states = [
    { name: 'SUBMITTED', description: 'Application registered with Bharatkosh fee token' },
    { name: 'UNDER_SCRUTINY', description: 'Assigned to technical scrutiny panel' },
    { name: 'CLARIFICATION_REQUIRED', description: 'Deficiency notice issued to applicant' },
    { name: 'CLARIFICATION_SUBMITTED', description: 'Supplementary evidence received' },
    { name: 'DOCUMENT_VERIFICATION_PENDING', description: 'Evidence in verifier queue' },
    { name: 'SCRUTINY_COMPLETED', description: 'Checklist and documents satisfied' },
    { name: 'EVC_PENDING', description: 'Physical inspection visit scheduled' },
    { name: 'EVC_COMPLETED', description: 'EVC report endorsed by convener' },
    { name: 'DECISION_PENDING', description: 'Dossier presented before Standing Hearing Committee' },
    { name: 'APPROVED', description: 'Formal grant of approval resolution issued' },
    { name: 'REJECTED', description: 'Application rejected with legal grounds' },
    { name: 'RETURNED_FOR_ACTION', description: 'Remanded back for institutional re-submission' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-700">
            <span>Governance, Norms & Workflow Architecture</span>
            <span>·</span>
            <span>State Machine Configuration</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Workflow Governance & Ruleset Architecture
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Process Architect: {currentUser?.name} · Active Version: v2026.1-RELEASE (APH Baseline)
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowLiveDemo(true)}
            className="px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-all flex items-center gap-1.5"
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

      {activeTab === 'dashboard' && <CommitteeWorkflowMap status={appCase.status} />}
      {activeTab === 'routes' && <OperationsControlCenter />}

      {/* 1. State Machine Visualizer / Transitions */}
      {(activeTab === 'dashboard' || activeTab === 'transitions' || activeTab === 'builder') && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Deterministic State Machine (12 Discrete States)
              </h2>
              <p className="text-xs text-slate-500">
                Verified directed transitions with pre-condition guard predicates and auditable outcomes
              </p>
            </div>
            <span className="text-xs font-mono text-purple-800 bg-purple-50 px-2.5 py-1 rounded border border-purple-200 font-semibold">
              Deadlock-Free · Formally Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {states.map((st, i) => (
              <div key={st.name} className="p-3.5 rounded-lg border border-slate-200 bg-[#F8FAFC] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-slate-900">{st.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">STATE {i + 1}</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-normal">{st.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Workflow Versions & Proposals */}
      {(activeTab === 'versions' || activeTab === 'proposals') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              Workflow Ruleset Versions
            </h2>
            <div className="space-y-3">
              {workflowRevisions.map((rev) => (
                <div key={rev.version} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-slate-900">{rev.version}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        rev.status === 'ACTIVE'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : rev.status === 'DRAFT'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {rev.status}
                    </span>
                  </div>
                  <p className="text-slate-700">{rev.changesSummary}</p>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                    <span>Author: {rev.author} · {rev.date}</span>
                    {rev.status === 'DRAFT' && (
                      <button
                        onClick={() => handlePublish(rev.version)}
                        className="px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded text-xs transition-colors"
                      >
                        Publish Revision
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Propose Workflow Revision</h3>
            <form onSubmit={handlePropose} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Version Identifier</label>
                <input
                  type="text"
                  value={newVersion}
                  onChange={(e) => setNewVersion(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Changes Summary</label>
                <textarea
                  rows={4}
                  value={changesSummary}
                  onChange={(e) => setChangesSummary(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg leading-relaxed"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#0F294A] hover:bg-[#0A1D36] text-white font-semibold rounded-lg transition-colors"
              >
                Stage Draft Revision
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Live Agent Automation Step Demo Modal */}
      <LiveAgentAutomationModal
        isOpen={showLiveDemo}
        onClose={() => setShowLiveDemo(false)}
        initialAgentId="agent-workflow"
      />
    </div>
  );
};
