import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../lib/state/AppContext';
import { AadharCopilotModal } from '../../components/common/AadharCopilotModal';
import { LiveAgentAutomationModal } from '../../components/common/LiveAgentAutomationModal';
import { DocumentPreviewPanel } from '../../components/common/DocumentPreviewPanel';
import { HANDBOOK_PASSAGES } from '../../lib/copilot/handbookData';
import {
  ListChecks,
  AlertCircle,
  HelpCircle,
  Sparkles,
  BookMarked,
  GitPullRequest,
  Bot,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  FileText,
  Clock,
  ShieldAlert,
  Send,
  Eye,
  Play,
  Cpu,
} from 'lucide-react';

export const ReviewerWorkspace: React.FC = () => {
  const {
    appCase,
    currentUser,
    evaluateChecklistItem,
    createClarificationRequest,
    resolveClarification,
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  // Active subview
  const path = location.pathname;
  let activeTab = 'dashboard';
  if (path.includes('/clarifications')) activeTab = 'clarifications';
  else if (path.includes('/copilot')) activeTab = 'copilot';
  else if (path.includes('/agent-demo')) activeTab = 'agent-demo';

  const [showCopilotModal, setShowCopilotModal] = useState(false);
  const [showLiveAutomation, setShowLiveAutomation] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Clarification form state
  const [clrTitle, setClrTitle] = useState('Clarification: departmental computer laboratory evidence');
  const [clrCategory, setClrCategory] = useState('Computer Laboratory Evidence');
  const [clrQuestion, setClrQuestion] = useState(
    'This simulated case cites AICTE Approval Process Handbook 2024–25 to 2026–27, Annexure 4, Section 4.1, pages 92–93. The synthetic inventory lists 16 department computers. Please provide updated inventory, installation records, availability evidence, and the programme-category basis for human verification. This is not a finding about the real institution.'
  );
  const [clrDays, setClrDays] = useState(7);

  const handleCreateClarification = (e: React.FormEvent) => {
    e.preventDefault();
    const res = createClarificationRequest(clrTitle, clrCategory, clrQuestion, clrDays);
    setFeedbackMsg({
      type: res.success ? 'success' : 'error',
      text: res.message,
    });
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const handleResolveClarification = (id: string) => {
    const res = resolveClarification(
      id,
      'Document Verifier compared the submitted records. Updated inventory, installation, and availability evidence are available for human review; no automated conclusion is recorded.'
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
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-700">
            <span>Bureau of Approval & Technical Evaluation</span>
            <span>·</span>
            <span>Computer Science Scrutiny Panel</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Technical Scrutiny & Evaluation Workspace
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Senior Reviewer: {currentUser?.name} · Case ID: {appCase.id} ({appCase.institutionName})
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
          <button
            onClick={() => setShowCopilotModal(true)}
            className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Copilot (RAG)</span>
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

      {/* Case Status Summary Banner */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm">
            AI/ML
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">{appCase.programme}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                {appCase.id}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {appCase.institutionName} · Proposed Intake: {appCase.intakeProposed} Seats · AY {appCase.academicYear}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Review Status</span>
            <span className="font-bold text-slate-900">{appCase.status.replace(/_/g, ' ')}</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Gating Gates</span>
            <span className="font-bold text-slate-900">
              {Object.values(appCase.decisionDetails.gatesPassed).filter(Boolean).length} of 4 Cleared
            </span>
          </div>
        </div>
      </div>

      {/* 1. Scrutiny Checklist Subview */}
      {(activeTab === 'dashboard' || activeTab === 'checklist' || activeTab === 'cases') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Regulatory Scrutiny Checklist (APH 2026–27 Norms)
              </h2>
              <p className="text-xs text-slate-500">
                Evaluate infrastructure heads and compare declared figures against OCR-verified evidence
              </p>
            </div>
            <button
              onClick={() => navigate('/reviewer/clarifications')}
              className="px-3 py-1.5 bg-[#0F294A] hover:bg-[#0A1D36] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Clarifications Queue ({appCase.clarifications.length})</span>
            </button>
          </div>

          {(() => {
            const computerEvidence = appCase.documents.find((doc) => doc.id === 'doc-004') || appCase.documents[0];
            return computerEvidence ? <DocumentPreviewPanel document={computerEvidence} compact /> : null;
          })()}

          <div className="space-y-3">
            {appCase.checklist.map((item) => {
              const isDeficient = item.status === 'DEFICIENT';
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border bg-white shadow-xs space-y-3 ${
                    isDeficient ? 'border-amber-300 ring-1 ring-amber-300/40' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-indigo-700">
                          {item.clauseRef}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs font-semibold text-slate-800">{item.category}</span>
                      </div>
                      <h3 className="font-bold text-sm text-slate-900">{item.requirement}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded text-xs font-bold border ${
                          item.status === 'SATISFIED'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : item.status === 'DEFICIENT'
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-slate-100 text-slate-700 border-slate-300'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div>
                      <span className="text-slate-400 font-medium block">Applicant Declared:</span>
                      <span className="text-slate-800 font-medium">{item.declaredDetail}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium block">Reviewer Findings:</span>
                      <span className="text-slate-800 font-medium">{item.reviewerNotes || 'Under technical evaluation.'}</span>
                    </div>
                  </div>

                  {/* AI Scrutiny Agent Assessment */}
                  {item.agentAssessment && (
                    <div className="p-2.5 rounded-lg bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-950 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <Bot className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-indigo-900">
                            Agent Suggestion ({Math.round(item.agentAssessment.confidence * 100)}% Confidence):{' '}
                          </span>
                          <span className="text-indigo-900">{item.agentAssessment.reasoning}</span>
                        </div>
                      </div>

                      {isDeficient && (
                        <button
                          onClick={() => navigate('/reviewer/clarifications')}
                          className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 text-[11px] font-bold rounded shrink-0 transition-colors"
                        >
                          Draft Clarification
                        </button>
                      )}
                    </div>
                  )}

                  {/* Manual reviewer toggle */}
                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
                    <span className="text-[11px] text-slate-400 mr-2">Override Status:</span>
                    <button
                      onClick={() => evaluateChecklistItem(item.id, 'SATISFIED', 'Manual reviewer override: Satisfied based on supplementary evidence.')}
                      className="px-2 py-1 text-[11px] font-medium bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded border border-emerald-200 transition-colors"
                    >
                      Mark Satisfied
                    </button>
                    <button
                      onClick={() => evaluateChecklistItem(item.id, 'DEFICIENT', 'Manual reviewer override: Flagged deficient.')}
                      className="px-2 py-1 text-[11px] font-medium bg-rose-50 text-rose-800 hover:bg-rose-100 rounded border border-rose-200 transition-colors"
                    >
                      Mark Deficient
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Clarifications Subview */}
      {activeTab === 'clarifications' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Active Clarification Requests */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              Clarification Requests & Institution Responses
            </h2>

            {appCase.clarifications.map((clr) => {
              const isResolved = clr.status === 'RESOLVED';
              const hasResponse = clr.status === 'RESPONSE_SUBMITTED';

              return (
                <div
                  key={clr.id}
                  className={`p-5 rounded-xl border bg-white shadow-xs space-y-4 ${
                    isResolved ? 'border-emerald-200' : 'border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-700">
                      {clr.queryNumber} · {clr.category}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded border ${
                        isResolved
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : hasResponse
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}
                    >
                      {clr.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{clr.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                      "{clr.question}"
                    </p>
                  </div>

                  {/* Response section */}
                  {clr.response ? (
                    <div className="p-3.5 rounded-lg bg-blue-50/80 border border-blue-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between font-semibold text-blue-900">
                        <span>Institution Response Submitted:</span>
                        <span className="font-mono text-[10px] text-blue-700">
                          {new Date(clr.response.submittedAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-blue-950">{clr.response.responseText}</p>
                      {clr.response.supportingDocumentTitle && (
                        <div className="pt-1 flex items-center gap-2 text-blue-800 font-medium">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span>Attached Proof: {clr.response.supportingDocumentTitle}</span>
                        </div>
                      )}

                      {!isResolved && (
                        <div className="pt-2 flex items-center justify-end">
                          <button
                            onClick={() => handleResolveClarification(clr.id)}
                            className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Sign Off & Resolve Clarification</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-amber-50 text-xs text-amber-900 border border-amber-200 flex items-center justify-between">
                      <span>Awaiting response from Institution Representative Prof. Sunita Patil.</span>
                      <span className="font-mono text-[10px] text-amber-700">
                        Deadline: {new Date(clr.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Draft New Clarification Request */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <h3 className="font-bold text-sm text-slate-900">
              Draft Statutory Clarification Notice
            </h3>
            <p className="text-xs text-slate-500">
              Dispatches formal inquiry to applicant under APH regulations.
            </p>

            <form onSubmit={handleCreateClarification} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notice Title</label>
                <input
                  type="text"
                  value={clrTitle}
                  onChange={(e) => setClrTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Regulatory Category</label>
                <input
                  type="text"
                  value={clrCategory}
                  onChange={(e) => setClrCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Regulatory Query / Evidence Deficiency Specifics
                </label>
                <textarea
                  rows={4}
                  value={clrQuestion}
                  onChange={(e) => setClrQuestion(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Statutory Response Window</label>
                <select
                  value={clrDays}
                  onChange={(e) => setClrDays(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                >
                  <option value={7}>7 Calendar Days (Standard Scrutiny Window)</option>
                  <option value={3}>3 Calendar Days (Urgent Docket)</option>
                  <option value={14}>14 Calendar Days (Extended Legal Documents)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0F294A] hover:bg-[#0A1D36] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Issue Clarification Request & Notify Institution</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Regulatory Handbook Subview */}
      {(activeTab === 'handbook' || activeTab === 'copilot') && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                AICTE Approval Process Handbook (APH 2026–27) Reference Library
              </h2>
              <p className="text-xs text-slate-500">
                Indexed norms for land, instructional built-up area, computing labs, and cadre ratios
              </p>
            </div>
            <button
              onClick={() => setShowCopilotModal(true)}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{activeTab === 'copilot' ? 'Ask Copilot about this case' : 'Query Copilot RAG'}</span>
            </button>
          </div>

          <div className="space-y-4 pt-2">
            {HANDBOOK_PASSAGES.map((passage) => (
              <div key={passage.id} className="p-4 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-indigo-700">{passage.clause}</span>
                  <span className="text-slate-500 font-mono">Page {passage.page} · {passage.sourceDoc}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900">{passage.title}</h3>
                <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                  {passage.content}
                </p>
                <div className="text-[11px] text-slate-500">
                  <span className="font-medium text-slate-700">Applicability:</span> {passage.applicability}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Application Dossier View */}
      {activeTab === 'dossier' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Comprehensive Application Dossier: {appCase.id}
            </h2>
            <p className="text-xs text-slate-500">
              Verified legal, physical, and academic parameters for {appCase.institutionName}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 uppercase font-semibold text-[10px]">Land Parcel</span>
              <div className="font-bold text-slate-900 text-sm">7.5 Acres (Continuous)</div>
              <p className="text-slate-600">Sub-Registrar Reg #10492/2021 · Survey 42/1-B</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 uppercase font-semibold text-[10px]">Built-up Carpet Area</span>
              <div className="font-bold text-slate-900 text-sm">4,250 sq.m Instructional</div>
              <p className="text-slate-600">PMRDA Occupancy Certificate PMRDA/BP/2023/OC-0914</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 uppercase font-semibold text-[10px]">Fire Safety NOC</span>
              <div className="font-bold text-slate-900 text-sm">Valid until 31-12-2026</div>
              <p className="text-slate-600">MFS Final NOC MFS/WZ/PUN/2025/1108</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xs text-slate-700 uppercase tracking-wider mb-2">
              Attached Statutory Evidence Documents ({appCase.documents.length})
            </h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-2.5">Document Title</th>
                    <th className="px-4 py-2.5">Category</th>
                    <th className="px-4 py-2.5">File Details</th>
                    <th className="px-4 py-2.5">Verification Sign-off</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appCase.documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-900">{doc.title}</td>
                      <td className="px-4 py-3 text-slate-600">{doc.category}</td>
                      <td className="px-4 py-3 font-mono text-slate-500">{doc.fileName} ({doc.fileSize})</td>
                      <td className="px-4 py-3">
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
        </div>
      )}

      {/* Agent Demo Tab View */}
      {activeTab === 'agent-demo' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                Agentic Automation Engine
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                Autonomous Scrutiny Agent Execution Demo
              </h2>
              <p className="text-xs text-slate-500">
                Watch the Scrutiny Review Agent autonomously query APH norms, parse OCR extractions, detect deficiencies, and prepare clarification drafts with human-in-the-loop sign-off.
              </p>
            </div>
            <button
              onClick={() => setShowLiveAutomation(true)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Fullscreen Execution Console</span>
            </button>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-1">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Automated Trigger</span>
                <span className="font-bold text-slate-900">APH Annexure 4, Section 4.1 Evaluation</span>
                <p className="text-slate-500 text-[11px]">Checking computer-lab evidence for a simulated 60-seat intake</p>
              </div>
              <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-1">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Deficit Detected</span>
                <span className="font-bold text-rose-700">Potential evidence gap</span>
                <p className="text-slate-500 text-[11px]">16 listed; updated inventory and applicability require human verification</p>
              </div>
              <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-1">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Human-in-the-Loop</span>
                <span className="font-bold text-indigo-900">Reviewer Endorsement Required</span>
                <p className="text-slate-500 text-[11px]">AI drafts query; Dr. Arvind Joshi authorizes dispatch</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowLiveAutomation(true)}
                className="px-4 py-2 bg-[#0F294A] hover:bg-[#0A1D36] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Run Interactive Stepper Demo</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Copilot Modal */}
      <AadharCopilotModal
        isOpen={showCopilotModal}
        onClose={() => setShowCopilotModal(false)}
        onApplyRecommendation={(action) => {
          setFeedbackMsg({
            type: 'success',
            text: `Adopted handbook recommendation: "${action}"`,
          });
          setTimeout(() => setFeedbackMsg(null), 4000);
        }}
      />

      {/* Live Interactive Agent Automation Modal */}
      <LiveAgentAutomationModal
        isOpen={showLiveAutomation}
        onClose={() => setShowLiveAutomation(false)}
        defaultAgentId="agent-scrutiny"
        onActionAdopted={(action) => {
          createClarificationRequest(clrTitle, clrCategory, clrQuestion, clrDays);
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
