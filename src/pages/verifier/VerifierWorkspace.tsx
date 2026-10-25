import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../lib/state/AppContext';
import { LiveAgentAutomationModal } from '../../components/common/LiveAgentAutomationModal';
import { DocumentPreviewPanel } from '../../components/common/DocumentPreviewPanel';
import {
  Inbox,
  Files,
  ScanLine,
  SplitSquareVertical,
  CheckCheck,
  RefreshCw,
  History,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Search,
  Eye,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { OperationsControlCenter } from '../../components/common/OperationsControlCenter';

export const VerifierWorkspace: React.FC = () => {
  const {
    appCase,
    currentUser,
    verifyDocument,
    runOCR,
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  // Active subview
  const path = location.pathname;
  let activeTab = 'dashboard';
  if (path.includes('/comparison')) activeTab = 'comparison';
  else if (path.includes('/audit')) activeTab = 'audit';
  else if (path.includes('/validity')) activeTab = 'validity';

  const [selectedDocId, setSelectedDocId] = useState<string>(
    appCase.documents.find((d) => d.status !== 'VERIFIED')?.id || appCase.documents[3]?.id || appCase.documents[0]?.id
  );
  const [decisionNotes, setDecisionNotes] = useState(
    'Synthetic inventory and supporting records compared. The submission lists 16 department computers; installation and availability evidence remain subject to human verification under Annexure 4, Section 4.1.'
  );
  const [uploadedPreviewName, setUploadedPreviewName] = useState<string>();
  const [showLiveAutomation, setShowLiveAutomation] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  React.useEffect(() => {
    const unverified = appCase.documents.find((d) => d.status !== 'VERIFIED');
    setSelectedDocId(unverified?.id || appCase.documents[0]?.id || '');
    if (appCase.id === 'NIVARAN-VESIT-2026-27') {
      setDecisionNotes(
        'Verified 30-year registered lease deed with Sub-Registrar Kurla-4 index II and MCGM building sanction approvals for VESIT Chembur campus. Continuous 3.2 acres instructional area certified compliant with APH Chapter I.'
      );
    } else {
      setDecisionNotes(
        'Synthetic inventory and supporting records compared. The submission lists 16 department computers; installation and availability evidence remain subject to human verification under Annexure 4, Section 4.1.'
      );
    }
  }, [appCase.id]);

  const selectedDoc = appCase.documents.find((d) => d.id === selectedDocId) || appCase.documents[0];

  const handleSignOff = (outcome: 'VERIFIED' | 'REJECTED' | 'REQUIRES_REVERIFICATION') => {
    const res = verifyDocument(selectedDoc.id, outcome, decisionNotes);
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
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700">
            <span>Document Verification & Statutory Records Wing</span>
            <span>·</span>
            <span>Western Region Panel</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Statutory Evidence Verification Workspace
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Document Verifier: {currentUser?.name} · Case ID: {appCase.id} ({appCase.institutionName})
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

      {/* Verification Queue Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Total Dossier Documents
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
            {appCase.documents.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Deeds, Municipal NOCs, Invoices</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Statutorily Verified
          </span>
          <div className="text-2xl font-bold text-emerald-900 mt-1 tabular-nums">
            {appCase.documents.filter((d) => d.status === 'VERIFIED').length} / {appCase.documents.length}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            {appCase.documents.every((d) => d.status === 'VERIFIED') ? '100% Verification Complete' : 'Verification In Progress'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Pending / Reverification
          </span>
          <div className="text-2xl font-bold text-amber-900 mt-1 tabular-nums">
            {appCase.documents.filter((d) => d.status !== 'VERIFIED').length}
          </div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            Actionable items in queue
          </div>
        </div>
      </div>

      {/* 1. OCR Results & Side-by-side Evidence Inspector */}
      {(activeTab === 'dashboard' || activeTab === 'ocr-results' || activeTab === 'queue' || activeTab === 'comparison') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Document list selector */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            <h3 className="font-bold text-xs text-slate-700 uppercase tracking-wider">
              Submitted Document Evidence Queue
            </h3>
            <div className="space-y-2">
              {appCase.documents.map((doc) => {
                const isSelected = doc.id === selectedDocId;
                return (
                  <div
                    key={doc.id}
                    onClick={() => {
                      setSelectedDocId(doc.id);
                      setUploadedPreviewName(undefined);
                    }}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/60 ring-1 ring-teal-600'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-slate-400">{doc.category}</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          doc.status === 'VERIFIED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {doc.status}
                      </span>
                    </div>
                    <div className="font-bold text-xs text-slate-900 line-clamp-1">{doc.title}</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">{doc.fileName}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* OCR Field Inspector & Verification Decision */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 space-y-5">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-teal-700">
                  DOCUMENT: {selectedDoc.id}
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-0.5">{selectedDoc.title}</h2>
                <p className="text-xs text-slate-500">
                  Uploaded by: {selectedDoc.uploadedBy} · File: {selectedDoc.fileName} ({selectedDoc.fileSize})
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  selectedDoc.status === 'VERIFIED'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}
              >
                {selectedDoc.status}
              </span>
            </div>

            <DocumentPreviewPanel
              document={selectedDoc}
              uploadedFileName={uploadedPreviewName}
              onFileSelected={setUploadedPreviewName}
            />

            {/* Extracted Fields Table */}
            <div>
              <h3 className="font-bold text-xs text-slate-700 uppercase tracking-wider mb-2">
                Simulated OCR Extracted Entities vs Declared Parameters
              </h3>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-2">Field Label</th>
                      <th className="px-3 py-2">OCR Extracted Value</th>
                      <th className="px-3 py-2">Declared in Application</th>
                      <th className="px-3 py-2 text-right">Match</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedDoc.ocrExtractedFields.map((f, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-3 py-2.5 font-medium text-slate-900">{f.label}</td>
                        <td className="px-3 py-2.5 font-mono text-slate-800">{f.extractedValue}</td>
                        <td className="px-3 py-2.5 text-slate-600">{f.declaredValue}</td>
                        <td className="px-3 py-2.5 text-right">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              f.match ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {f.match ? 'MATCH' : 'MISMATCH'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Raw OCR Snippet */}
            <div>
              <h3 className="font-bold text-xs text-slate-700 uppercase tracking-wider mb-1">
                Raw Extracted OCR Text Transcript
              </h3>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700 leading-relaxed max-h-32 overflow-y-auto">
                "{selectedDoc.rawOcrText}"
              </div>
            </div>

            {/* Statutory Verification Decision Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                Record Statutory Verification Decision
              </h3>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Verifier Rationale & Statutory Endorsement Notes
                </label>
                <input
                  type="text"
                  value={decisionNotes}
                  onChange={(e) => setDecisionNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
                  placeholder="Enter verification notes..."
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => handleSignOff('VERIFIED')}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <CheckCheck className="w-4 h-4" />
                  <span>Mark Evidence as VERIFIED</span>
                </button>
                <button
                  onClick={() => handleSignOff('REQUIRES_REVERIFICATION')}
                  className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Flag for Reverification</span>
                </button>
                <button
                  onClick={() => handleSignOff('REJECTED')}
                  className="px-3 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Reject Evidence</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Document Inventory subview */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Complete Statutory Records Inventory ({appCase.documents.length} Files)
          </h2>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2.5">Document Title</th>
                  <th className="px-4 py-2.5">Category</th>
                  <th className="px-4 py-2.5">File Metadata</th>
                  <th className="px-4 py-2.5">Sign-Off Endorsement</th>
                  <th className="px-4 py-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appCase.documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-900">{doc.title}</td>
                    <td className="px-4 py-3 text-slate-600">{doc.category}</td>
                    <td className="px-4 py-3 font-mono text-slate-500">{doc.fileName} ({doc.fileSize})</td>
                    <td className="px-4 py-3 text-slate-700">{doc.verificationNotes || 'Pending review'}</td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          doc.status === 'VERIFIED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Verification audit</span>
            <h2 className="text-base font-bold text-slate-900 mt-1">Document verification history</h2>
            <p className="text-xs text-slate-500 mt-1">
              Review every OCR, evidence comparison, and verification action recorded for {appCase.id}.
            </p>
          </div>
          <div className="space-y-3">
            {appCase.auditLog.filter((event) => /document|ocr|verif|invoice/i.test(`${event.action} ${event.summary}`)).map((event) => (
              <div key={event.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50 flex items-start justify-between gap-4 text-xs">
                <div>
                  <p className="font-bold text-slate-900">{event.action}</p>
                  <p className="text-slate-600 mt-1">{event.summary}</p>
                  <p className="text-[11px] text-slate-400 mt-2">By {event.actorName} · {event.actorRole}</p>
                </div>
                <span className="text-[11px] text-slate-500 whitespace-nowrap">{new Date(event.timestamp).toLocaleString()}</span>
              </div>
            ))}
            {appCase.auditLog.filter((event) => /document|ocr|verif|invoice/i.test(`${event.action} ${event.summary}`)).length === 0 && (
              <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
                No document-specific events have been recorded yet. Run OCR or open the verification agent to create the first review event.
              </div>
            )}

          </div>
        </div>
      )}

      {activeTab === 'validity' && <OperationsControlCenter />}

      {/* Live Interactive Agent Automation Modal */}
      <LiveAgentAutomationModal
        isOpen={showLiveAutomation}
        onClose={() => setShowLiveAutomation(false)}
        defaultAgentId="agent-verifier"
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
