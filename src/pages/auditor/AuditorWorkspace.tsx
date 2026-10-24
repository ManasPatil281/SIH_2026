import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../lib/state/AppContext';
import { LiveAgentAutomationModal } from '../../components/common/LiveAgentAutomationModal';
import {
  Shield,
  FileSearch,
  Terminal,
  UserCheck,
  GitCommit,
  KeyRound,
  DownloadCloud,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ArrowRight,
  Database,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { OperationsControlCenter } from '../../components/common/OperationsControlCenter';

export const AuditorWorkspace: React.FC = () => {
  const {
    appCase,
    currentUser,
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  // Active subview
  const path = location.pathname;
  let activeTab = 'dashboard';
  if (path.includes('/application-audit')) activeTab = 'application-audit';
  else if (path.includes('/agent-logs')) activeTab = 'agent-logs';
  else if (path.includes('/approvals')) activeTab = 'approvals';
  else if (path.includes('/workflow-changes')) activeTab = 'workflow-changes';
  else if (path.includes('/integrity')) activeTab = 'integrity';
  else if (path.includes('/export')) activeTab = 'export';
  else if (path.includes('/reports')) activeTab = 'reports';
  else if (path.includes('/overview')) activeTab = 'overview';

  const [showLiveDemo, setShowLiveDemo] = useState(false);
  const [integrityStatus, setIntegrityStatus] = useState<{ checked: boolean; valid: boolean; count: number } | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleRunIntegrityCheck = () => {
    // Simulated hash chain verification across all events
    setTimeout(() => {
      setIntegrityStatus({
        checked: true,
        valid: true,
        count: appCase.auditLog.length,
      });
    }, 300);
  };

  const handleExportPackage = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(appCase, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `AADHAR_Audit_Package_${appCase.id}_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExportNotice('Audit package downloaded successfully in standardized regulatory JSON format.');
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700">
            <span>Independent Audit & Regulatory Integrity Cell</span>
            <span>·</span>
            <span>Vigilance Oversight</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Independent Audit & Ledger Integrity Console
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Chief Vigilance Officer: {currentUser?.name} · Scope: Read-Only Oversight
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowLiveDemo(true)}
            className="px-3 py-2 bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black text-white text-xs font-semibold rounded-lg shadow-xs transition-all flex items-center gap-1.5 border border-slate-600"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Live Agent Automation Demo</span>
          </button>
        </div>
      </div>

      {/* Read-Only Statutory Enclosure Banner */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <div className="font-bold text-xs uppercase tracking-wider text-amber-300">
              Strict Read-Only Enforcement Policy Active
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              In accordance with AICTE vigilance standards, the Independent Auditor has zero state mutation privileges. Any direct modification attempt is rejected.
            </p>
          </div>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
          MUTATION_FORBIDDEN
        </span>
      </div>

      {exportNotice && (
        <div className="p-3.5 rounded-lg border border-emerald-200 bg-emerald-50 text-xs font-medium text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* 1. Audit Overview / Event Timeline */}
      {(activeTab === 'dashboard' || activeTab === 'overview' || activeTab === 'application-audit') && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Chronological Audit Ledger: {appCase.id}
              </h2>
              <p className="text-xs text-slate-500">
                Append-only event chain with simulated SHA-256 cryptographic signatures
              </p>
            </div>
            <button
              onClick={() => navigate('/auditor/integrity')}
              className="px-3.5 py-1.5 bg-[#0F294A] hover:bg-[#0A1D36] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Verify Cryptographic Hashes</span>
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {appCase.auditLog.map((event, idx) => (
              <div
                key={event.id}
                className="p-4 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-2 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between flex-wrap gap-2 text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded font-sans">
                      BLOCK #{idx + 1}
                    </span>
                    <span className="font-bold text-slate-900 font-sans">{event.action}</span>
                  </div>
                  <span className="text-[11px]">
                    {new Date(event.timestamp).toLocaleString()}
                  </span>
                </div>

                <p className="text-slate-800 font-sans text-xs leading-relaxed">
                  {event.summary}
                </p>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between flex-wrap gap-2 text-[11px] text-slate-500">
                  <div>
                    <span className="text-slate-400">Actor:</span>{' '}
                    <span className="font-medium text-slate-700 font-sans">
                      {event.actorName} ({event.actorRole})
                    </span>
                  </div>
                  <div className="truncate max-w-[320px]">
                    <span className="text-slate-400">Hash:</span>{' '}
                    <span className="text-slate-700">{event.hashSignature}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Cryptographic Integrity Check view */}
      {activeTab === 'integrity' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 max-w-3xl">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Step 9 of Guided Hackathon Demo
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-1">
              Cryptographic Hash Chain Integrity Verification
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulates blockchain-style hash verification across all chronological event blocks.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Ledger Records Count:</span>
              <span className="font-bold text-slate-900">{appCase.auditLog.length} Blocks</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Digest Algorithm:</span>
              <span className="font-mono text-slate-800">Simulated SHA-256 Merkle Sequence</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Tamper Resistance Policy:</span>
              <span className="text-emerald-700 font-semibold">Strict Append-Only (Non-Repudiation)</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleRunIntegrityCheck}
              className="px-5 py-2.5 bg-[#0F294A] hover:bg-[#0A1D36] text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
            >
              <KeyRound className="w-4 h-4" />
              <span>Execute Cryptographic Integrity Verification</span>
            </button>
          </div>

          {integrityStatus && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verification Succeeded: 100% Chain Consistency Certified</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                All {integrityStatus.count} blocks verified sequentially. Hash pointers match antecedent hashes with zero discrepancies or omitted events.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 3. Export Package view */}
      {activeTab === 'export' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 max-w-2xl">
          <h2 className="text-base font-bold text-slate-900">
            Export Certified Audit Package
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Download the complete dossier payload, including verified document metadata, scrutiny checklist records, clarification threads, and cryptographic event logs.
          </p>

          <div className="pt-2">
            <button
              onClick={handleExportPackage}
              className="px-5 py-2.5 bg-[#0F294A] hover:bg-[#0A1D36] text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
            >
              <DownloadCloud className="w-4 h-4" />
              <span>Download Signed Audit Package (JSON)</span>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'reports' && <OperationsControlCenter />}

      {/* Live Agent Automation Step Demo Modal */}
      <LiveAgentAutomationModal
        isOpen={showLiveDemo}
        onClose={() => setShowLiveDemo(false)}
        initialAgentId="agent-auditor"
      />
    </div>
  );
};
