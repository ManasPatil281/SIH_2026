import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../lib/state/AppContext';
import { LiveAgentAutomationModal } from '../../components/common/LiveAgentAutomationModal';
import {
  FolderArchive,
  Activity,
  Files,
  MessageSquareWarning,
  Send,
  FileClock,
  CheckSquare,
  Compass,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  FileText,
  Clock,
  ShieldCheck,
  Building,
  Sparkles,
} from 'lucide-react';
import { OperationsControlCenter } from '../../components/common/OperationsControlCenter';
import { DocumentPreviewPanel } from '../../components/common/DocumentPreviewPanel';

export const InstitutionWorkspace: React.FC = () => {
  const {
    appCase,
    currentUser,
    submitClarificationResponse,
    uploadSupplementaryDocument,
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  // Active subview
  const path = location.pathname;
  let activeTab = 'dashboard';
  if (path.includes('/documents')) activeTab = 'documents';
  else if (path.includes('/clarifications')) activeTab = 'clarifications';
  else if (path.includes('/submit-response')) activeTab = 'submit-response';
  else if (path.includes('/compliance')) activeTab = 'compliance';

  const [showLiveAutomation, setShowLiveAutomation] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Response form
  const [targetClrId, setTargetClrId] = useState(appCase.clarifications[0]?.id || 'clr-001');
  const [responseText, setResponseText] = useState(
    'This is a simulated response for the Dr. Bapuji Salunkhe Institute and is not a claim about the real institution. We are submitting an updated department inventory, installation record, availability evidence, and corroborating purchase records for human review against AICTE Approval Process Handbook 2024–25 to 2026–27, Annexure 4, Section 4.1.'
  );
  const [attachedFileName, setAttachedFileName] = useState('BSIET_CSE_AIML_Updated_Inventory_Synthetic.pdf');
  const previewDocument = appCase.documents.find((doc) => doc.id === 'doc-004') || appCase.documents[0];

  const handleSubmitResponse = (e: React.FormEvent) => {
    e.preventDefault();
    const res = submitClarificationResponse(
      targetClrId,
      responseText,
      attachedFileName
    );
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
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            <span>Applicant Institution Portal</span>
            <span>·</span>
            <span>Authorized Signatory Desk</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {appCase.institutionName} ({appCase.institutionCode})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Representative: {currentUser?.name} · Campus: Kolhapur, Maharashtra
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

      {activeTab === 'compliance' && <OperationsControlCenter />}

      {/* Security note: Applicant isolation */}
      <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          <span>
            <strong>Applicant Isolation Boundary Enforced:</strong> Internal reviewer deliberations and other institutions' dockets are inaccessible.
          </span>
        </div>
        <span className="font-mono text-[10px] text-blue-800">DIT-MH-0492 Scope</span>
      </div>

      {/* 1. Dashboard & Status View */}
      {(activeTab === 'dashboard' || activeTab === 'status' || activeTab === 'applications') && (
        <div className="space-y-5">
          {/* Status Tracker */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                  Application Docket: {appCase.id}
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  {appCase.programme} (Intake: {appCase.intakeProposed} Seats)
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                {appCase.status.replace(/_/g, ' ')}
              </span>
            </div>

            {/* Stepper */}
            <div className="pt-4 border-t border-slate-100">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                  <span className="font-bold block">1. Submitted</span>
                  <span className="text-[11px] text-emerald-700">15 March 2026</span>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                  <span className="font-bold block">2. Regional Intake</span>
                  <span className="text-[11px] text-emerald-700">Clearance Verified</span>
                </div>
                <div className={`p-3 rounded-lg border ${
                  appCase.status === 'CLARIFICATION_REQUIRED'
                    ? 'bg-amber-50 border-amber-300 text-amber-900 ring-1 ring-amber-300'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                }`}>
                  <span className="font-bold block">3. Scrutiny & Clarification</span>
                  <span className="text-[11px]">
                    {appCase.status === 'CLARIFICATION_REQUIRED' ? 'Action Required' : 'Remediation Underway'}
                  </span>
                </div>
                <div className={`p-3 rounded-lg border ${
                  appCase.status === 'APPROVED'
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}>
                  <span className="font-bold block">4. Final Decision</span>
                  <span className="text-[11px]">
                    {appCase.status === 'APPROVED' ? 'Approved (60 Seats)' : 'Awaiting Completion'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Clarification Banner */}
          {appCase.clarifications.some((c) => c.status === 'PENDING_INSTITUTION') && (
            <div className="p-5 rounded-xl border border-amber-300 bg-amber-50 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquareWarning className="w-5 h-5 text-amber-700" />
                  <h3 className="font-bold text-sm text-amber-950">
                    Statutory Clarification Notice Received
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-200/60 px-2.5 py-0.5 rounded">
                  Response Pending
                </span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                Scrutiny Reviewer Dr. Arvind Joshi has flagged a shortfall of 10 department computers in CSE Department Computer Laboratory. Please provide purchase proof and installation challan before the statutory deadline.
              </p>
              <div className="pt-1 flex items-center gap-3">
                <button
                  onClick={() => navigate('/institution/submit-response')}
                  className="px-4 py-2 bg-[#0F294A] hover:bg-[#0A1D36] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Supplementary Evidence Now</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Clarifications Subview */}
      {activeTab === 'clarifications' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Institutional Clarification Inquiries
          </h2>
          <div className="space-y-4">
            {appCase.clarifications.map((clr) => (
              <div key={clr.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-700">{clr.queryNumber}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                    {clr.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900">{clr.title}</h3>
                <p className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200">
                  "{clr.question}"
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-500">
                    Dispatched by: {clr.requestedBy}
                  </span>
                  {clr.status === 'PENDING_INSTITUTION' && (
                    <button
                      onClick={() => navigate('/institution/submit-response')}
                      className="px-3 py-1.5 bg-[#0F294A] hover:bg-[#0A1D36] text-white rounded text-xs font-semibold transition-colors"
                    >
                      Respond & Upload Proof
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Submit Response View */}
      {activeTab === 'submit-response' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-5xl space-y-5">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Supplementary evidence submission
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Submit Clarification Response & Supplementary Tax Invoice
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Authorized Signatory Prof. Sunita Patil submits the simulated evidence package for human verification.
            </p>
          </div>

          <form onSubmit={handleSubmitResponse} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Select Clarification Notice</label>
              <select
                value={targetClrId}
                onChange={(e) => setTargetClrId(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-medium"
              >
                {appCase.clarifications.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.queryNumber}: {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Formal Compliance Explanation & Remediation Note
              </label>
              <textarea
                rows={4}
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg leading-relaxed"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Supplementary Evidence Attachment (PDF)
              </label>
              <div className="p-4 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 text-center space-y-2">
                <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="font-semibold text-slate-800">{attachedFileName}</div>
                <p className="text-[11px] text-slate-500">
                  Searchable PDF with digital signatory certificate · Size: 3.4 MB
                </p>
                <button
                  type="button"
                  onClick={() => setAttachedFileName('BSIET_CSE_AIML_Updated_Inventory_Synthetic.pdf')}
                  className="px-3 py-1 bg-white border border-slate-300 rounded text-slate-700 font-medium hover:bg-slate-100 transition-colors"
                >
                  Choose Different File
                </button>
              </div>
            </div>

            {previewDocument && (
              <DocumentPreviewPanel
                document={previewDocument}
                uploadedFileName={attachedFileName}
                onFileSelected={setAttachedFileName}
              />
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#0F294A] hover:bg-[#0A1D36] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Submit Response to Document Verification Queue</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. Required Documents Subview */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Statutory Evidence Document Inventory
            </h2>
            <button
              onClick={() => navigate('/institution/submit-response')}
              className="px-3 py-1.5 bg-[#0F294A] hover:bg-[#0A1D36] text-white rounded text-xs font-semibold"
            >
              Upload Additional Evidence
            </button>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2.5">Document Title</th>
                  <th className="px-4 py-2.5">Category</th>
                  <th className="px-4 py-2.5">Upload Timestamp</th>
                  <th className="px-4 py-2.5 text-right">Verification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appCase.documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-900">{doc.title}</td>
                    <td className="px-4 py-3 text-slate-600">{doc.category}</td>
                    <td className="px-4 py-3 text-slate-500 font-mono">
                      {new Date(doc.uploadedAt).toLocaleDateString()}
                    </td>
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

      {/* 5. Help & Guidance Subview */}
      {activeTab === 'guidance' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 max-w-3xl">
          <h2 className="text-base font-bold text-slate-900">
            Institution Regulatory Compliance Tips
          </h2>
          <div className="space-y-3 text-xs text-slate-600">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">Equipment Invoices & Asset Registrars</h3>
              <p>
                Invoices must clearly mention serial numbers, GSTIN of seller, and installation delivery challan signed by the Head of Department.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">Response Timelines</h3>
              <p>
                Standard clarification response window is 7 calendar days. Unresolved deficiencies may trigger an Expert Visit Committee (EVC) or hearing.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Live Interactive Agent Automation Modal */}
      <LiveAgentAutomationModal
        isOpen={showLiveAutomation}
        onClose={() => setShowLiveAutomation(false)}
        defaultAgentId="agent-institution"
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
