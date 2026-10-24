import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../lib/state/AppContext';
import { REGISTERED_AGENTS, AgentDescriptor } from '../../lib/agents/simulationEngine';
import {
  Bot,
  BookOpen,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Terminal,
  ShieldCheck,
  X,
  FastForward,
  Cpu,
  Layers,
  Sparkles,
  FileSearch,
  FileText,
  Scan,
  Database,
  Search,
  Check,
  ChevronDown,
  ChevronRight,
  MapPin,
  Stamp,
  Activity,
  FileCheck,
  Lock,
  Server,
  Zap,
} from 'lucide-react';

export interface LiveAgentAutomationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAgentId?: string;
  initialAgentId?: string;
  onActionAdopted?: (action: string) => void;
}

interface ToolExecution {
  toolName: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
}

interface AutomationStep {
  title: string;
  subtext: string;
  thoughtProcess: string;
  toolCall?: ToolExecution;
  logDetail: string;
  durationMs: number;
}

interface AgentWorkflowDefinition {
  agentId: string;
  roleTitle: string;
  domainFocus: string;
  proposedAction: string;
  targetActionType?: string;
  steps: AutomationStep[];
}

const friendlyToolName = (toolName: string) =>
  toolName
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const getActionPreview = (step: AutomationStep) => {
  const text = `${step.title} ${step.subtext}`.toLowerCase();
  if (text.includes('handbook') || text.includes('rule') || text.includes('norm')) {
    return { label: 'Looking through the approval handbook', icon: <BookOpen className="w-4 h-4" />, tone: 'indigo' };
  }
  if (text.includes('ocr') || text.includes('scan') || text.includes('document')) {
    return { label: 'Opening and reading the submitted document', icon: <FileSearch className="w-4 h-4" />, tone: 'cyan' };
  }
  if (text.includes('extract') || text.includes('parse') || text.includes('entity')) {
    return { label: 'Finding important details in the file', icon: <Scan className="w-4 h-4" />, tone: 'violet' };
  }
  if (text.includes('verify') || text.includes('check') || text.includes('match')) {
    return { label: 'Checking the information against records', icon: <FileCheck className="w-4 h-4" />, tone: 'emerald' };
  }
  if (text.includes('draft') || text.includes('stage') || text.includes('order')) {
    return { label: 'Preparing the next action for the officer', icon: <FileText className="w-4 h-4" />, tone: 'amber' };
  }
  return { label: 'Working on the case information', icon: <Database className="w-4 h-4" />, tone: 'blue' };
};

const getFinalReason = (workflow: AgentWorkflowDefinition) =>
  workflow.steps
    .slice(0, 3)
    .map((step) => step.subtext.replace(/[.!?].*$/, ''))
    .join('. ') + '.';

const getSimpleStepTitle = (step: AutomationStep) =>
  step.title
    .replace(/Vector Embedding of Application Parameters/i, 'Read the application')
    .replace(/RAG Knowledge Retrieval from APH 2026-27/i, 'Look up the approval rule')
    .replace(/Automated Deficiency Detection & Gap Analysis/i, 'Compare the evidence')
    .replace(/Auto-Drafting Statutory Clarification Notice/i, 'Prepare a clarification')
    .replace(/Reviewer Authorization Gatekeeper/i, 'Prepare it for reviewer approval')
    .replace(/Document Ingestion & Pre-flight Scan/i, 'Open the submitted document')
    .replace(/Tabular Line-Item Extraction \(computer-lab Hardware\)/i, 'Read the inventory list')
    .replace(/GSTN Gateway & Bharatkosh Re-Verification/i, 'Check the supporting records')
    .replace(/Inventory Aggregation & Norm Compliance/i, 'Compare the computer count')
    .replace(/Staging Statutory Verification Order/i, 'Send it for human verification')
    .replace(/Ingesting Application Docket & Payment Token/i, 'Open the application')
    .replace(/Jurisdictional GIS Boundary Match/i, 'Check the regional office')
    .replace(/Reviewer Expertise & Workload Matcher/i, 'Find the right reviewer')
    .replace(/Stage Assignment for Human Authorization/i, 'Prepare the assignment')
    .replace(/Institution Portal Response Ingestion/i, 'Open the institution response')
    .replace(/Supplementary Evidence OCR & Parsing/i, 'Read the uploaded evidence')
    .replace(/Response Completeness Evaluation/i, 'Check what was provided')
    .replace(/Route to Document Verification Queue/i, 'Send it for document checking')
    .replace(/Evaluate Statutory Decision Gates/i, 'Check the decision requirements')
    .replace(/Generate Committee Decision Brief/i, 'Prepare the committee brief')
    .replace(/Stage Decision for Competent Authority/i, 'Prepare it for the authority')
    .replace(/EVC Readiness & Queue Eligibility/i, 'Check inspection readiness')
    .replace(/EVC Roster & Conflict-of-Interest Check/i, 'Check the inspection team')
    .replace(/Propose EVC Calendar Slot/i, 'Suggest an inspection date')
    .replace(/Stage EVC Schedule for Convener/i, 'Prepare the schedule for approval')
    .replace(/Workflow State Machine Validation/i, 'Check the workflow rules')
    .replace(/Workflow Transition Integrity Check/i, 'Check the allowed handoffs')
    .replace(/Stage Workflow Revision for Publication/i, 'Prepare the rules for approval')
    .replace(/Audit Ledger Integrity Scan/i, 'Check the audit history')
    .replace(/Generate Audit Evidence Package/i, 'Prepare the audit report')
    .replace(/Stage Audit Findings for Oversight/i, 'Prepare findings for review')
    .replace(/RBAC Policy & Permission Drift Scan/i, 'Check user permissions')
    .replace(/Integration Health & Credential Check/i, 'Check connected services')
    .replace(/Notification Outbox & Scheduler Audit/i, 'Check pending notifications')
    .replace(/Stage System Health Report/i, 'Prepare the system report');

const getSimpleStepText = (step: AutomationStep) => {
  const text = `${step.title} ${step.subtext}`.toLowerCase();
  if (text.includes('clarification')) return 'Writing a clear request for the missing information.';
  if (text.includes('reviewer') || text.includes('authorization')) return 'Preparing the work for an authorised officer to review.';
  if (text.includes('rule') || text.includes('handbook') || text.includes('aph')) return 'Finding the rule that applies to this application.';
  if (text.includes('ocr') || text.includes('document') || text.includes('evidence') || text.includes('inventory')) return 'Reading the file and checking the important details.';
  if (text.includes('evc') || text.includes('inspection')) return 'Preparing the inspection details and next steps.';
  if (text.includes('audit')) return 'Checking the recorded actions and preparing a clear report.';
  if (text.includes('permission') || text.includes('integration') || text.includes('notification')) return 'Checking that the platform service is ready and working.';
  if (text.includes('decision') || text.includes('committee')) return 'Putting the important information together for the authority.';
  if (text.includes('workflow') || text.includes('transition')) return 'Checking that the next handoff follows the configured rules.';
  return 'Working through the case information.';
};

const getSimpleStepResult = (step: AutomationStep) => {
  const text = `${step.title} ${step.logDetail}`.toLowerCase();
  if (text.includes('16') && text.includes('20')) return '16 computers are listed; more evidence is needed before a conclusion.';
  if (text.includes('clarification')) return 'A clarification draft is ready for the reviewer.';
  if (text.includes('reviewer')) return 'The work is ready for an authorised reviewer.';
  if (text.includes('verified') || text.includes('check')) return 'The information has been checked and recorded.';
  if (text.includes('schedule') || text.includes('inspection')) return 'The inspection details are ready for approval.';
  if (text.includes('decision') || text.includes('brief')) return 'The decision brief is ready for the competent authority.';
  if (text.includes('audit')) return 'The recorded actions are ready for oversight.';
  return 'This step is complete.';
};

const getSimpleSummary = (workflow: AgentWorkflowDefinition) => {
  if (workflow.agentId === 'agent-scrutiny') {
    return {
      result: 'A possible evidence gap was found in the computer-lab records.',
      next: 'Review and send the clarification asking for updated inventory, installation, and availability proof.',
      why: 'The synthetic file lists 16 computers. The cited rule requires checking the minimum of 20 computers and the separate departmental lab evidence.',
    };
  }
  return {
    result: 'The agent finished preparing the case information.',
    next: workflow.proposedAction,
    why: 'The agent reviewed the available records and prepared the next step without making the final statutory decision.',
  };
};

interface WorkflowCanvasProps {
  activeAgent: AgentDescriptor;
  appCase: { id: string };
  workflow: AgentWorkflowDefinition;
  currentStepIndex: number;
  currentStep: AutomationStep;
  isRunning: boolean;
  hasCompleted: boolean;
  onClose: () => void;
  onStart: () => void;
  onNext: () => void;
  onReset: () => void;
  onApply: () => void;
}

const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  activeAgent,
  appCase,
  workflow,
  currentStepIndex,
  currentStep,
  isRunning,
  hasCompleted,
  onClose,
  onStart,
  onNext,
  onReset,
  onApply,
}) => (
  <div className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-xs flex items-center justify-center p-2 sm:p-5">
    <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-5xl h-[80vh] min-h-[560px] flex flex-col overflow-hidden">
      <header className="px-5 py-3 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center">
            <Bot className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-slate-900">{activeAgent.name}</h2>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                {isRunning ? 'Working' : hasCompleted ? 'Ready for review' : 'Ready to start'}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {workflow.roleTitle} · Docket {appCase.id}
            </p>
          </div>
        </div>
        <button onClick={onClose} aria-label="Close workflow" className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100">
          <X className="w-5 h-5" />
        </button>
      </header>

      <div className="flex-1 overflow-auto bg-[#fbfcfe] relative">
        <div
          className="min-h-full p-5 sm:p-8"
          style={{
            backgroundImage: 'radial-gradient(#d7dee9 0.8px, transparent 0.8px)',
            backgroundSize: '18px 18px',
          }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div>
                <p className="text-xs font-semibold text-slate-500">Workflow</p>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">The agent is working through the case</h3>
                <p className="text-xs text-slate-500 mt-1">Each card shows one thing the agent is doing.</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={onReset} className="px-3 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
                  Start over
                </button>
                {!hasCompleted && (
                  <button onClick={isRunning ? onNext : onStart} className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg">
                    {isRunning ? 'Continue' : 'Run workflow'}
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
              {workflow.steps.slice(0, hasCompleted ? workflow.steps.length : currentStepIndex + 1).map((step, index) => {
                const completed = hasCompleted || index < currentStepIndex;
                const current = !hasCompleted && index === currentStepIndex;
                return (
                  <React.Fragment key={step.title}>
                    <div className={`relative bg-white rounded-lg border shadow-sm p-3.5 min-h-[138px] transition-all ${
                      current ? 'border-indigo-400 ring-2 ring-indigo-100 animate-in fade-in slide-in-from-bottom-3 duration-500' : completed ? 'border-emerald-300 animate-in fade-in duration-500' : 'border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Step {index + 1}</span>
                        {completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : current ? (
                          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-indigo-600">
                            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                            Working
                          </span>
                        ) : (
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{getSimpleStepTitle(step)}</h4>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">{getSimpleStepText(step)}</p>
                      {current && (
                        <div className="mt-3 flex items-center gap-2 rounded-md bg-indigo-50 border border-indigo-100 px-2.5 py-2 text-[11px] text-indigo-700 animate-pulse">
                          {getActionPreview(step).icon}
                          <span>{getActionPreview(step).label}</span>
                          <span className="ml-auto flex gap-0.5">
                            <span className="w-1 h-1 rounded-full bg-indigo-500" />
                            <span className="w-1 h-1 rounded-full bg-indigo-500 animation-delay-150" />
                            <span className="w-1 h-1 rounded-full bg-indigo-500 animation-delay-300" />
                          </span>
                        </div>
                      )}
                      {(completed || current) && (
                        <div className={`mt-3 pt-2 border-t text-[11px] ${completed ? 'border-emerald-100 text-emerald-700' : 'border-indigo-100 text-indigo-700'}`}>
                          {completed ? 'Done: ' : 'Now: '}{getSimpleStepResult(step)}
                        </div>
                      )}
                      {index < workflow.steps.length - 1 && (
                        <div className="hidden md:block absolute top-1/2 -right-12 w-10 border-t-2 border-dashed border-slate-300" />
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            {!hasCompleted && currentStepIndex < workflow.steps.length - 1 && (
              <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <span className={`w-1.5 h-1.5 rounded-full bg-indigo-500 ${isRunning ? 'animate-ping' : ''}`} />
                {isRunning
                  ? 'Finishing this check before moving to the next step...'
                  : 'Start the workflow to see the agent work.'}
              </div>
            )}

            {hasCompleted && (
              <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 sm:p-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-white border border-emerald-200 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Final summary</p>
                    <h4 className="text-sm font-bold text-emerald-950 mt-1">Here is what the agent found</h4>
                    <p className="text-xs font-semibold text-emerald-900 mt-2">{getSimpleSummary(workflow).result}</p>
                    <div className="mt-3 pt-3 border-t border-emerald-200">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Why</p>
                      <p className="text-xs text-emerald-900/80 mt-1 leading-relaxed">{getSimpleSummary(workflow).why}</p>
                    </div>
                    <div className="mt-3 rounded-lg border border-emerald-200 bg-white/70 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Recommended next step</p>
                      <p className="text-xs font-semibold text-emerald-950 mt-1 leading-relaxed">{getSimpleSummary(workflow).next}</p>
                    </div>
                    <p className="text-[11px] text-emerald-800/75 mt-3">
                      This is a recommendation. An authorised officer must review and approve the action.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 max-w-2xl mx-auto bg-white rounded-lg border border-indigo-200 shadow-sm p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-900">What the agent is doing now</p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{getSimpleStepText(currentStep)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="px-5 py-3 border-t border-slate-200 bg-white flex items-center justify-between gap-3 shrink-0">
        <p className="text-xs text-slate-500">The agent prepares the work. An authorised officer makes the final decision.</p>
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900">Close</button>
          {hasCompleted && (
            <button onClick={onApply} className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> Review and apply
            </button>
          )}
        </div>
      </footer>
    </div>
  </div>
);

const ALL_AGENT_WORKFLOWS: Record<string, AgentWorkflowDefinition> = {
  'agent-verifier': {
    agentId: 'agent-verifier',
    roleTitle: 'Document Verifier',
    domainFocus: 'OCR, evidence comparison and source-aware verification',
    proposedAction: 'Compare the synthetic computer-laboratory evidence and stage it for Document Verifier sign-off.',
    targetActionType: 'verify_doc',
    steps: [
      {
        title: 'Document Ingestion & Pre-flight Scan',
        subtext: 'Loading the synthetic computer-laboratory evidence package',
        thoughtProcess: 'Received the simulated inventory, installation, and availability records. The package is prepared for OCR and source-aware comparison.',
        toolCall: {
          toolName: 'ocr_ingest_document',
          inputs: { documentId: 'doc-004', fileName: 'BSIET_CSE_AIML_Updated_Inventory_Synthetic.pdf', engine: 'Tesseract_v5_Optimized' },
          outputs: { pages: 1, textDensity: 'Synthetic evidence', ocrQualityScore: 0.92, state: 'INGESTED' },
        },
        logDetail: 'INGEST /storage/dockets/AADHAR-BSIET-2026-27/doc-004.pdf [SIMULATED] evidence parsed',
        durationMs: 900,
      },
      {
        title: 'Bounding Box Binarization & Entity Parsing',
        subtext: 'Extracting institution, inventory, and evidence fields',
        thoughtProcess: 'Parsing the synthetic evidence header and identifying institution, department, inventory count, installation record, and availability fields.',
        toolCall: {
          toolName: 'extract_named_entities',
          inputs: { zones: ['header_vendor', 'header_consignee', 'invoice_meta'] },
          outputs: { institutionId: 'BSIET-KOLHAPUR', inventoryCount: 16, installationEvidence: false, availabilityEvidence: false },
        },
        logDetail: 'EXTRACT: institution and inventory fields identified; corroboration still required',
        durationMs: 1100,
      },
      {
        title: 'Tabular Line-Item Extraction (computer-lab Hardware)',
        subtext: 'Scanning equipment specifications, quantities, and unit values',
        thoughtProcess: 'Scanning the inventory table and matching listed computers with installation and availability records.',
        toolCall: {
          toolName: 'parse_table_line_items',
          inputs: { tableIndex: 0, targetKeywords: ['inventory', 'installation', 'availability'] },
          outputs: { itemsCount: 1, totalUnits: 16, evidenceRows: 16, corroborationRows: 0 },
        },
        logDetail: 'PARSED INVENTORY: 16 listed computers; corroborating records not attached',
        durationMs: 1100,
      },
      {
        title: 'GSTN Gateway & Bharatkosh Re-Verification',
        subtext: 'Checking whether supporting records can be corroborated',
        thoughtProcess: 'Comparing the inventory against installation and availability evidence. The package does not support an automated compliance conclusion.',
        toolCall: {
          toolName: 'gstn_portal_verify',
          inputs: { evidenceTypes: ['inventory', 'installation', 'availability'] },
          outputs: { inventoryPresent: true, installationPresent: false, availabilityPresent: false, requiresHumanReview: true },
        },
        logDetail: 'EVIDENCE CHECK: inventory present; installation and availability corroboration pending',
        durationMs: 950,
      },
      {
        title: 'Inventory Aggregation & Norm Compliance',
        subtext: '16 listed computers; updated inventory and corroboration requested',
        thoughtProcess: 'Comparing the 16 listed computers with the cited 1:10 ratio, minimum 20 PCs, and separate departmental laboratory requirement. Applicability and completeness remain for the officer to decide.',
        toolCall: {
          toolName: 'aggregate_inventory_audit',
          inputs: { listedCount: 16, intake: 60, minimumPcCount: 20, source: 'APH-2024-27-ANN4-4.1-ENG-UG-PC' },
          outputs: { status: 'REQUIRES_HUMAN_REVIEW', finalDeficiency: false },
        },
        logDetail: 'CALCULATION: 16 listed; completeness and applicability require human review',
        durationMs: 900,
      },
      {
        title: 'Staging Statutory Verification Order',
        subtext: 'Awaiting Document Verifier (Meera Deshmukh) human sign-off',
        thoughtProcess: 'Staging the evidence comparison for Document Verifier Meera Deshmukh. The final outcome remains a human decision.',
        toolCall: {
          toolName: 'stage_verification_order',
          inputs: { officer: 'Meera Deshmukh', docId: 'doc-004', outcome: 'VERIFIED' },
          outputs: { stagingId: 'STG-VER-2026-901', requiresHumanSignoff: true },
        },
        logDetail: 'STAGED for Verifier Meera Deshmukh: Endorse verification into Docket AADHAR-BSIET-2026-27',
        durationMs: 700,
      },
    ],
  },

  'agent-scrutiny': {
    agentId: 'agent-scrutiny',
    roleTitle: 'Scrutiny Reviewer',
    domainFocus: 'APH Regulatory RAG, Vector Search & Deficiency Synthesis',
    proposedAction: 'Issue Formal Clarification Notice CLR/2026/01 citing AICTE APH 2024–25 to 2026–27 Annexure 4, Section 4.1 for potential computer-lab evidence gap.',
    targetActionType: 'create_clarification',
    steps: [
      {
        title: 'Vector Embedding of Application Parameters',
        subtext: 'Generating semantic vectors for declared programs and lab inventory',
        thoughtProcess: 'Examining the simulated EoA proposal for B.E./B.Tech CSE (AI & ML), intake 60. Indexing the synthetic land, building, and computer-laboratory evidence.',
        toolCall: {
          toolName: 'embed_academic_proposal',
          inputs: { program: 'B.E./B.Tech CSE (AI & ML)', intake: 60, declaredComputerCount: 16 },
          outputs: { embeddingDims: 1536, category: 'Emerging Computing Program' },
        },
        logDetail: 'EMBEDDING: Vectorized [B.Tech AI&ML, 60 Intake] -> 1536-dim vector generated',
        durationMs: 850,
      },
      {
        title: 'RAG Knowledge Retrieval from APH 2026-27',
        subtext: 'Matching semantic vector against AICTE Approval Process Handbook',
        thoughtProcess: 'Querying vector knowledge base. Top cosine similarity match (0.94): AICTE APH 2024–25 to 2026–27 Annexure 4, Section 4.1: "Engineering and Technology programmes require evidence against the 1:10 ratio, minimum 20 PCs, and separate departmental laboratory; no GPU requirement is inferred".',
        toolCall: {
          toolName: 'aph_rag_retrieval',
          inputs: { query: 'computer-lab lab norms for UG AI ML 60 intake', handbookEdition: '2026-27' },
          outputs: { clauseId: 'APH-2024-27-ANN4-4.1-ENG-UG-PC', exactRequirement: '1:10 ratio, minimum 20 PCs; no GPU requirement inferred', similarityScore: 0.941 },
        },
        logDetail: 'RAG RETRIEVAL: Annexure 4, Section 4.1 [Cosine 0.941] -> source passage loaded',
        durationMs: 1100,
      },
      {
        title: 'Automated Deficiency Detection & Gap Analysis',
        subtext: 'Comparing the cited requirement with the synthetic inventory',
        thoughtProcess: 'Analyzing gap: Applicable requirement: 1:10 ratio, minimum 20 PCs. Synthetic inventory lists 16 computers. Potential evidence gap detected; no final deficiency is asserted. Land and built-up areas pass all thresholds.',
        toolCall: {
          toolName: 'compute_deficiency_gap',
          inputs: { minimumPcCount: 20, declaredComputerCount: 16, installationEvidence: false, availabilityEvidence: false },
          outputs: { status: 'POTENTIAL_SHORTFALL', finalDeficiency: false, noticeCategory: 'Evidence clarification' },
        },
        logDetail: 'DEFICIENCY IDENTIFIED: Potential evidence gap under APH Annexure 4, Section 4.1',
        durationMs: 950,
      },
      {
        title: 'Auto-Drafting Statutory Clarification Notice',
        subtext: 'Generating a clarification for missing corroborating evidence',
        thoughtProcess: 'Drafting simulated query CLR/2026/01 requesting updated inventory, installation records, availability evidence, and the applicable programme-category basis.',
        toolCall: {
          toolName: 'synthesize_clarification_notice',
          inputs: { queryId: 'CLR/2026/01', clause: 'APH-2024-27-ANN4-4.1-ENG-UG-PC', deadlineDays: 7 },
          outputs: { noticeTextLength: 284, noticeState: 'DRAFT_FORMULATED' },
        },
        logDetail: 'DRAFTED CLARIFICATION: Query CLR/2026/01 prepared citing statutory 7-day cure window',
        durationMs: 900,
      },
      {
        title: 'Reviewer Authorization Gatekeeper',
        subtext: 'Staging notice for Senior Reviewer Dr. Arvind Joshi endorsement',
        thoughtProcess: 'AI cannot issue a binding deficiency notice to an institution without human review. Staging notice CLR/2026/01 for Dr. Arvind Joshi to review and dispatch.',
        toolCall: {
          toolName: 'stage_for_reviewer_signoff',
          inputs: { reviewerId: 'user-reviewer', noticeId: 'CLR/2026/01' },
          outputs: { readyForDispatch: true },
        },
        logDetail: 'STAGED for Dr. Arvind Joshi: Endorse and dispatch Clarification Notice CLR/2026/01',
        durationMs: 700,
      },
    ],
  },

  'agent-regional': {
    agentId: 'agent-regional',
    roleTitle: 'Regional Officer',
    domainFocus: 'Jurisdiction GIS Matching, Bharatkosh Tokens & Panel Allocation',
    proposedAction: 'Designate Senior Reviewer Dr. Arvind Joshi to Docket BSIET-KOLHAPUR and transition to UNDER_SCRUTINY.',
    targetActionType: 'assign_reviewer',
    steps: [
      {
        title: 'Ingesting Application Docket & Payment Token',
        subtext: 'Verifying Bharatkosh gateway receipt TXN-AICTE-99214 for ₹1,50,000',
        thoughtProcess: 'Parsing intake dossier for BSIET-KOLHAPUR. Bharatkosh payment receipt verified: ₹1,50,000 deposited under Account Head 0070.01.800.01. Transaction status: SETTLED.',
        toolCall: {
          toolName: 'verify_bharatkosh_receipt',
          inputs: { txnId: 'TXN-AICTE-99214', expectedAmount: 150000 },
          outputs: { status: 'SETTLED', bankRef: 'RBI-EP-2026-8812', timestamp: '2026-02-14T10:14:22Z' },
        },
        logDetail: 'BHARATKOSH GATEWAY: TXN-AICTE-99214 ₹1,50,000 [SETTLED] Account Head Verified',
        durationMs: 850,
      },
      {
        title: 'GIS Polygon & Jurisdiction Boundary Check',
        subtext: 'Matching Kolhapur, Maharashtra coordinates with Western Regional Office (WR)',
        thoughtProcess: 'Executing spatial containment check. Coordinates 18.5912° N, 73.7389° E (Kolhapur, Maharashtra, Maharashtra) intersect Western Regional Office polygon boundary. Regional jurisdiction confirmed.',
        toolCall: {
          toolName: 'gis_boundary_containment',
          inputs: { region: 'Maharashtra West', district: 'Kolhapur' },
          outputs: { assignedRegion: 'Western Regional Office (WRO Mumbai)', zone: 'Kolhapur Region' },
        },
        logDetail: 'GIS MATCH: [18.5912° N, 73.7389° E] -> Western Regional Office Boundary [CONFIRMED]',
        durationMs: 1000,
      },
      {
        title: 'Panelist Roster Matching & Expertise Affinity',
        subtext: 'Calculating cosine similarity across active CSE/AI professor panelists',
        thoughtProcess: 'Matching proposed B.E./B.Tech CSE (AI & ML) curriculum with panelist roster. Candidate Dr. Arvind Joshi (Senior Professor, Computer Science & AI, IIT Bombay alumnus) achieves 0.96 affinity score. Zero institutional conflict of interest.',
        toolCall: {
          toolName: 'match_panelist_affinity',
          inputs: { programDiscipline: 'Computer Science & AI', exclusionInstitutes: ['BSIET Kolhapur'] },
          outputs: { topMatch: 'Dr. Arvind Joshi', affinityScore: 0.962, activeCases: 2 },
        },
        logDetail: 'ROSTER MATCHER: Dr. Arvind Joshi affinity score 0.962 -> Recommended Reviewer',
        durationMs: 1000,
      },
      {
        title: 'Staging Assignment Order for Regional Officer',
        subtext: 'Awaiting Rajesh Sharma human authorization',
        thoughtProcess: 'Intake pre-requisites satisfied. Staging administrative assignment order for Regional Officer Rajesh Sharma.',
        toolCall: {
          toolName: 'stage_intake_assignment',
          inputs: { docketId: 'AADHAR-BSIET-2026-27', designatedReviewer: 'Dr. Arvind Joshi' },
          outputs: { staged: true },
        },
        logDetail: 'STAGED for Regional Officer Rajesh Sharma: Confirm assignment and transition to UNDER_SCRUTINY',
        durationMs: 700,
      },
    ],
  },

  'agent-institution': {
    agentId: 'agent-institution',
    roleTitle: 'Institution Representative',
    domainFocus: 'Response assembly, provenance and authorised submission',
    proposedAction: 'Submit the updated synthetic inventory, installation, availability, and corroborating evidence package for human review.',
    targetActionType: 'submit_response',
    steps: [
      {
        title: 'Parsing Clarification Notice Parameters',
        subtext: 'Extracting the evidence requested by the simulated clarification',
        thoughtProcess: 'Analyzing CLR/2026/01. The request is for updated inventory, installation, availability, and programme-category evidence; it does not assert a GPU requirement.',
        toolCall: {
          toolName: 'parse_clarification_query',
          inputs: { clarificationId: 'CLR/2026/01' },
          outputs: { requiredItems: ['updated inventory', 'installation record', 'availability evidence', 'programme-category basis'] },
        },
        logDetail: 'PARSED QUERY: Evidence package requested; final compliance outcome remains with officer',
        durationMs: 800,
      },
      {
        title: 'Asset Ledger Matching & PO Verification',
        subtext: 'Locating inventory, installation, and availability records',
        thoughtProcess: 'Scanning institutional enterprise ledger. Found synthetic inventory and supporting records for human reconciliation.',
        toolCall: {
          toolName: 'match_procurement_records',
          inputs: { recordTypes: ['inventory', 'installation', 'availability'] },
          outputs: { inventoryFound: true, installationFound: false, availabilityFound: false },
        },
        logDetail: 'LEDGER MATCH: Synthetic inventory located; corroborating records requested',
        durationMs: 950,
      },
      {
        title: 'Class-3 DSC Signature Cryptographic Check',
        subtext: 'Verifying digital certificate for Prof. Sunita Patil (Dean Academic Affairs)',
        thoughtProcess: 'Verifying Class-3 Digital Signature Certificate. Cert DN: "CN=Sunita Patil, OU=Academic, O=BSIET Kolhapur, C=IN". Issued by e-Mudhra NIC CA. Validity: Active through Dec 2027.',
        toolCall: {
          toolName: 'verify_class3_dsc',
          inputs: { signatory: 'Prof. Sunita Patil', certIssuer: 'e-Mudhra CA' },
          outputs: { certValid: true, expiryDate: '2027-12-31', revocationCheck: 'CLEAR' },
        },
        logDetail: 'DSC VERIFICATION: Prof. Sunita Patil Class-3 Certificate [VALID & ACTIVE]',
        durationMs: 900,
      },
      {
        title: 'Staging Compliance Package for Dispatch',
        subtext: 'Awaiting Dean Academic Affairs authorization',
        thoughtProcess: 'Supplementary package compiled and certified. Staging for Dean Academic Affairs to dispatch response to AICTE scrutiny portal.',
        toolCall: {
          toolName: 'stage_institutional_response',
          inputs: { docketId: 'AADHAR-BSIET-2026-27', attachedDocs: ['BSIET_CSE_AIML_Updated_Inventory_Synthetic.pdf'] },
          outputs: { ready: true },
        },
        logDetail: 'STAGED for Dean Sunita Patil: Submit compliance response with supplementary evidence',
        durationMs: 700,
      },
    ],
  },

  'agent-evc': {
    agentId: 'agent-evc',
    roleTitle: 'EVC Coordinator',
    domainFocus: 'Geolocation Site Telemetry & Hybrid Video Verification Readiness',
    proposedAction: 'Confirm Digital-First Inspection Readiness Index (94/100) or dispatch physical panel.',
    targetActionType: 'schedule_evc',
    steps: [
      {
        title: 'Regulatory Inspection Exemption Scoring',
        subtext: 'Evaluating APH 2026-27 Clause 2.14 digital-first approval threshold',
        thoughtProcess: 'Under APH 2026-27 Clause 2.14, existing accredited technical institutes submitting 100% digitally verified records are eligible for physical visit exemption unless sampled in surprise cohort.',
        toolCall: {
          toolName: 'eval_evc_necessity',
          inputs: { accreditation: 'NAAC A++', digitalRecordsVerified: true },
          outputs: { exemptionEligible: true, surpriseCohortDrawn: false, readinessScore: 94 },
        },
        logDetail: 'EVALUATION: APH Cl. 2.14 Digital-First Eligible (Readiness Index: 94/100)',
        durationMs: 900,
      },
      {
        title: 'Geo-fencing Coordinates & Boundary Verification',
        subtext: 'Validating continuous 7.5-acre boundary coordinates via satellite GIS',
        thoughtProcess: 'Inspecting satellite polygon coordinates. 7.5 contiguous acres verified with 4 geo-fenced boundary pillars. Fire engine turning radius and static water reservoir confirmed.',
        toolCall: {
          toolName: 'verify_geofence_perimeter',
          inputs: { areaAcres: 7.5, perimeterMeters: 840 },
          outputs: { contiguous: true, roadAccessWidthMeters: 18, fireClearance: true },
        },
        logDetail: 'GEOFENCE VERIFIED: 7.5 Contiguous Acres · 18m approach road clearance verified',
        durationMs: 1000,
      },
      {
        title: 'Staging Inspection Endorsement for Convener',
        subtext: 'Awaiting Sanjeev Rao endorsement into Decision Docket',
        thoughtProcess: 'Physical inspection readiness confirmed. Staging EVC endorsement for Convener Sanjeev Rao.',
        toolCall: {
          toolName: 'stage_evc_verdict',
          inputs: { convener: 'Sanjeev Rao', recommendation: 'RECOMMENDED_APPROVAL' },
          outputs: { ready: true },
        },
        logDetail: 'STAGED for Convener Sanjeev Rao: Endorse EVC readiness into Decision Docket',
        durationMs: 700,
      },
    ],
  },

  'agent-decision': {
    agentId: 'agent-decision',
    roleTitle: 'Decision Authority',
    domainFocus: '4-Point Statutory Gate Evaluation & Gazette Resolution Formulation',
    proposedAction: 'Formulate and execute formal Grant of Approval Resolution #SHC-WR-2026-BSIET-0492.',
    targetActionType: 'record_decision',
    steps: [
      {
        title: 'Evaluating 4 Statutory Pre-Requisite Gates',
        subtext: 'Auditing Land, Built-up, Lab computing, and Clarifications clearance',
        thoughtProcess: 'Evaluating mandatory statutory gates before the simulated committee review: land and building evidence, computer-laboratory evidence, clarification status, and statutory approvals. Any unresolved evidence remains visible for human decision.',
        toolCall: {
          toolName: 'audit_statutory_gates',
          inputs: { docketId: 'AADHAR-BSIET-2026-27' },
          outputs: { gate1_land: 'PASS', gate2_lab: 'PASS', gate3_deficiencies: 'CLEARED', gate4_approvals: 'VERIFIED', allPassed: true },
        },
        logDetail: 'STATUTORY GATES: [Gate 1: PASS] [Gate 2: PASS] [Gate 3: CLEARED] [Gate 4: VERIFIED]',
        durationMs: 950,
      },
      {
        title: 'National Vigilance Ledger & Integrity Check',
        subtext: 'Scanning Central Repository for adverse judicial orders or complaints',
        thoughtProcess: 'Querying national repository for adverse vigilance flags. Zero pending CBI/CVC/State vigilance inquiries. Institutional compliance history: EXEMPLARY.',
        toolCall: {
          toolName: 'query_vigilance_ledger',
          inputs: { instituteId: 'BSIET-KOLHAPUR' },
          outputs: { adverseFlags: 0, pendingInquiries: 0, status: 'CLEAR' },
        },
        logDetail: 'VIGILANCE AUDIT: Zero adverse flags recorded in Central Regulatory Ledger',
        durationMs: 900,
      },
      {
        title: 'Generating Gazette Resolution Order #SHC-WR-2026-BSIET-0492',
        subtext: 'Formulating legal approval decree with standard regulatory covenants',
        thoughtProcess: 'Drafting regulatory approval resolution: "Approval granted to Dr. Bapuji Salunkhe Institute of Engineering and Technology for Introduction of B.Tech in Artificial Intelligence & Machine Learning (60 Seats) for Academic Year 2026-27."',
        toolCall: {
          toolName: 'generate_resolution_order',
          inputs: { resolutionNo: 'SHC-WR-2026-BSIET-0492', year: '2026-27', seats: 60 },
          outputs: { resolutionId: 'SHC-WR-2026-BSIET-0492', generatedDoc: 'Resolution_Order.pdf' },
        },
        logDetail: 'ORDER GENERATED: Resolution #SHC-WR-2026-BSIET-0492 prepared with compliance covenants',
        durationMs: 950,
      },
      {
        title: 'Staging for Apex Committee Chair Signature',
        subtext: 'Awaiting Standing Hearing Committee Chair digital authorization',
        thoughtProcess: 'All statutory criteria cleared. Staging formal resolution for Committee Chair to execute with digital authority seal.',
        toolCall: {
          toolName: 'stage_apex_decision',
          inputs: { chair: 'Committee Chair', resolutionNo: 'SHC-WR-2026-BSIET-0492' },
          outputs: { readyForExecution: true },
        },
        logDetail: 'STAGED for Committee Chair: Authorize Grant of Approval Resolution #SHC-WR-2026-BSIET-0492',
        durationMs: 700,
      },
    ],
  },

  'agent-workflow': {
    agentId: 'agent-workflow',
    roleTitle: 'Workflow Administrator',
    domainFocus: 'State Machine Invariants, DAG Liveness & Deadlock Detection',
    proposedAction: 'Validate 12-state directed acyclic regulatory graph and confirm deadlock-free status.',
    targetActionType: 'validate_workflow',
    steps: [
      {
        title: 'Traversing 12-State Regulatory Finite State Machine',
        subtext: 'Scanning directed transitions: SUBMITTED -> UNDER_SCRUTINY -> ... -> APPROVED',
        thoughtProcess: 'Traversing 12 discrete states and 18 permitted directional transitions in workflow definition v2026.1-RELEASE. Validating topological sort order and reachability.',
        toolCall: {
          toolName: 'traverse_fsm_graph',
          inputs: { version: 'v2026.1-RELEASE', statesCount: 12 },
          outputs: { directedEdges: 18, cyclesDetected: 0, terminalStates: ['APPROVED', 'REJECTED'] },
        },
        logDetail: 'FSM GRAPH: 12 States, 18 Directed Transitions · Acyclic reachability verified',
        durationMs: 900,
      },
      {
        title: 'Deadlock-Free Mathematical Proof & Guard Verification',
        subtext: 'Confirming every intermediate state has at least one valid outbound transition',
        thoughtProcess: 'Evaluating pre-condition guard predicates. Every state from DRAFT to DECISION_PENDING possesses deterministic progression or remediation pathways. Zero orphan deadlocks.',
        toolCall: {
          toolName: 'prove_deadlock_freedom',
          inputs: { states: 12, guards: 18 },
          outputs: { deadlockFree: true, formalInvariant: 'INVARIANT_PRESERVED' },
        },
        logDetail: 'FORMAL PROOF: Graph invariant satisfied. Deadlock freedom proven mathematically',
        durationMs: 1000,
      },
      {
        title: 'Staging Workflow Integrity Certificate',
        subtext: 'Awaiting Workflow Admin (Ananya Roy) endorsement',
        thoughtProcess: 'Workflow structure verified. Staging formal verification certificate for Workflow Administrator Ananya Roy.',
        toolCall: {
          toolName: 'stage_workflow_certificate',
          inputs: { admin: 'Ananya Roy', activeVersion: 'v2026.1-RELEASE' },
          outputs: { ready: true },
        },
        logDetail: 'STAGED for Ananya Roy: Endorse Workflow Integrity Certificate into System Log',
        durationMs: 700,
      },
    ],
  },

  'agent-auditor': {
    agentId: 'agent-auditor',
    roleTitle: 'Independent Auditor',
    domainFocus: 'SHA-256 Merkle Chain Integrity, Non-Repudiation & Zero-Mutation Guard',
    proposedAction: 'Run cryptographic verification across all ledger blocks and export verified audit package.',
    targetActionType: 'run_hash_verification',
    steps: [
      {
        title: 'Sequential Merkle Hash-Chain Traversal',
        subtext: 'Recomputing H(n) = SHA256(H(n-1) + Event_Payload) across all ledger events',
        thoughtProcess: 'Walking chronological ledger block-by-block. Recomputing SHA-256 cryptographic digest at each block height. H0 (Genesis) -> H1 (Submission) -> H2 (Assignment) -> H3 (Clarification) -> H4 (Verification).',
        toolCall: {
          toolName: 'verify_hash_chain',
          inputs: { startBlock: 0, algorithm: 'SHA-256' },
          outputs: { blocksEvaluated: 8, brokenLinks: 0, chainIntegrity: '100% VALID' },
        },
        logDetail: 'HASH CHAIN: 8 Chronological Blocks verified · Zero hash mismatches detected',
        durationMs: 1000,
      },
      {
        title: 'Enforcing Strict Read-Only Boundary Policy',
        subtext: 'Asserting zero mutation privileges for auditor persona',
        thoughtProcess: 'Verifying vigilance sandbox constraints. Auditor role possesses read-only access to ledger and evidence packages. State mutation API endpoints returned 403 Forbidden as required by law.',
        toolCall: {
          toolName: 'assert_read_only_policy',
          inputs: { role: 'auditor', attemptedMutations: ['updateDocket', 'alterHash'] },
          outputs: { blockedAttempts: 2, policyEnforced: true },
        },
        logDetail: 'POLICY ASSERTION: Auditor read-only boundary enforced. Zero mutation privileges active',
        durationMs: 950,
      },
      {
        title: 'Packaging Forensic Audit Ledger',
        subtext: 'Awaiting Independent Auditor sign-off for package export',
        thoughtProcess: 'Cryptographic ledger verified authentic. Staging verified audit package for Chief Vigilance Officer download.',
        toolCall: {
          toolName: 'stage_audit_export',
          inputs: { auditor: 'Chief Vigilance Officer', ledgerHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
          outputs: { ready: true },
        },
        logDetail: 'STAGED for Auditor: Export tamper-evident forensic package in JSON format',
        durationMs: 700,
      },
    ],
  },

  'agent-sysadmin': {
    agentId: 'agent-sysadmin',
    roleTitle: 'System Administrator',
    domainFocus: 'National Registry Gateways, Microservice Health & Latency Telemetry',
    proposedAction: 'Execute ping health probes across 4 statutory national integrations.',
    targetActionType: 'ping_gateways',
    steps: [
      {
        title: 'Probing DigiLocker Academic Gateway',
        subtext: 'Measuring OAuth2 token latency and verification throughput',
        thoughtProcess: 'Sending synthetic verification probe to DigiLocker National Gateway. Response: HTTP 200 OK. Latency: 18ms. OAuth2 token exchange operational.',
        toolCall: {
          toolName: 'probe_gateway',
          inputs: { service: 'DigiLocker Academic Verification', protocol: 'REST / OAuth2' },
          outputs: { latencyMs: 18, httpStatus: 200, status: 'OPERATIONAL' },
        },
        logDetail: 'PROBE DigiLocker: 18ms [HTTP 200 OK] OAuth2 Gateway Operational',
        durationMs: 850,
      },
      {
        title: 'Probing Maharashtra IGR Land Registry (Mahabhulekh)',
        subtext: 'Testing state land title verification webhook endpoint',
        thoughtProcess: 'Sending probe to Maharashtra Inspector General of Registration (IGR Mahabhulekh) server. Webhook handshake verified: 26ms latency.',
        toolCall: {
          toolName: 'probe_gateway',
          inputs: { service: 'Maharashtra IGR Mahabhulekh', protocol: 'State Webhook' },
          outputs: { latencyMs: 26, httpStatus: 200, status: 'OPERATIONAL' },
        },
        logDetail: 'PROBE Mahabhulekh IGR: 26ms [HTTP 200 OK] Land Title Registry Operational',
        durationMs: 900,
      },
      {
        title: 'Probing SPPU University Affiliation API & AICTE Backbone',
        subtext: 'Verifying university syllabus validation & central national repository',
        thoughtProcess: 'Probing the mock authorised university registry and central AICTE connector (14ms). All demonstration integration bridges are operational.',
        toolCall: {
          toolName: 'probe_gateway',
          inputs: { services: ['SPPU API', 'Central AICTE Repository'] },
          outputs: { sppuLatency: 31, aicteLatency: 14, systemHealth: '100% HEALTHY' },
        },
        logDetail: 'PROBE university registry & Central AICTE connector [ALL MOCK GATEWAYS OPERATIONAL]',
        durationMs: 950,
      },
      {
        title: 'Staging System Telemetry Report',
        subtext: 'Awaiting System Administrator (Vikram Sen) sign-off',
        thoughtProcess: 'All infrastructure bridges verified. Staging operational telemetry report for Systems Architect Vikram Sen.',
        toolCall: {
          toolName: 'stage_systems_report',
          inputs: { admin: 'Vikram Sen', healthyNodes: 4 },
          outputs: { ready: true },
        },
        logDetail: 'STAGED for Vikram Sen: System infrastructure certified 100% operational',
        durationMs: 700,
      },
    ],
  },
};

export const LiveAgentAutomationModal: React.FC<LiveAgentAutomationModalProps> = ({
  isOpen,
  onClose,
  defaultAgentId,
  initialAgentId,
  onActionAdopted,
}) => {
  const {
    appCase,
    currentUser,
    assignReviewer,
    createClarificationRequest,
    submitClarificationResponse,
    verifyDocument,
    scheduleEVC,
    recordDecision,
    publishWorkflowRevision,
  } = useApp();

  const effectiveAgentId = initialAgentId || defaultAgentId || 'agent-verifier';
  const [selectedAgentId, setSelectedAgentId] = useState<string>(effectiveAgentId);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [thoughtExpanded, setThoughtExpanded] = useState(true);
  const [laserYPercent, setLaserYPercent] = useState(15);
  const logsContainerRef = useRef<HTMLDivElement>(null);

  const workflow = ALL_AGENT_WORKFLOWS[selectedAgentId] || ALL_AGENT_WORKFLOWS['agent-verifier'];
  const activeAgent = REGISTERED_AGENTS.find((a) => a.id === selectedAgentId) || REGISTERED_AGENTS[3];

  // Auto-scroll logs
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Reset when agent or modal changes
  useEffect(() => {
    setSelectedAgentId(effectiveAgentId);
    setCurrentStepIndex(0);
    setIsRunning(false);
    setHasCompleted(false);
    setLaserYPercent(15);
    setLogs([
      `[SYS_INIT] Agent Engine initialized: ${effectiveAgentId}`,
      `[DOCKET_BIND] Operating on Docket ${appCase.id} (Dr. Bapuji Salunkhe Institute of Engineering and Technology)`,
      `[READY] Click "Start Autonomous Workflow" or "Step" to begin agentic execution.`,
    ]);
  }, [effectiveAgentId, isOpen, appCase.id]);

  // Laser scanner movement for OCR agent
  useEffect(() => {
    if (selectedAgentId === 'agent-verifier' && isRunning) {
      const stepPct = Math.min(90, 15 + currentStepIndex * 15);
      setLaserYPercent(stepPct);
    }
  }, [selectedAgentId, currentStepIndex, isRunning]);

  // Automated step progression
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && currentStepIndex < workflow.steps.length) {
      const step = workflow.steps[currentStepIndex];
      timer = setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          `[STEP_${currentStepIndex + 1}] ${step.logDetail}`,
          step.toolCall ? `[TOOL_RETURN] ${step.toolCall.toolName} -> OK` : '',
        ].filter(Boolean));

        if (currentStepIndex + 1 < workflow.steps.length) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsRunning(false);
          setHasCompleted(true);
          setLogs((prev) => [
            ...prev,
            `[EXECUTION_COMPLETE] All ${workflow.steps.length} autonomous stages completed.`,
            `[HUMAN_HANDSHAKE_READY] Action Staged: "${workflow.proposedAction}"`,
          ]);
        }
      }, step.durationMs);
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentStepIndex, workflow]);

  if (!isOpen) return null;

  const handleStartAutoRun = () => {
    setCurrentStepIndex(0);
    setHasCompleted(false);
    setLogs([
      `[START] Launching autonomous simulation for ${activeAgent.name}...`,
      `[AGENT_ACTIVE] Model executing chain-of-thought and tool invocations...`,
    ]);
    setIsRunning(true);
  };

  const handleStepForward = () => {
    if (currentStepIndex < workflow.steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      const step = workflow.steps[nextIdx];
      setLogs((prev) => [
        ...prev,
        `[MANUAL_STEP_${nextIdx + 1}] ${step.logDetail}`,
      ]);
      if (nextIdx === workflow.steps.length - 1) {
        setHasCompleted(true);
        setLogs((prev) => [
          ...prev,
          `[HUMAN_HANDSHAKE_READY] Action Staged: "${workflow.proposedAction}"`,
        ]);
      }
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStepIndex(0);
    setHasCompleted(false);
    setLaserYPercent(15);
    setLogs([`[RESET] State reset to initial step 1.`]);
  };

  const handleExecuteProposedAction = () => {
    if (workflow.targetActionType === 'verify_doc') {
      const targetDoc = appCase.documents.find((d) => d.id === 'doc-004') || appCase.documents[0];
      verifyDocument(targetDoc.id, 'VERIFIED', 'Supplementary invoice BSIET-COMP-INV-16 verified compliant. 40 total computer-lab nodes.');
    } else if (workflow.targetActionType === 'create_clarification') {
      createClarificationRequest(
        'Shortfall of 10 Department Computers in Computer Science & Engineering (AI & ML) Lab',
        'Laboratory Computing Infrastructure',
        'As per APH 2026-27 Annexure 4, Section 4.1, pages 92–93, an undergraduate program in AI & ML with 60 intake requires a minimum of 20 computers. Submitted invoice accounts for only 16 computers. Please furnish supplementary invoice within 7 days.',
        7
      );
    } else if (workflow.targetActionType === 'assign_reviewer') {
      assignReviewer('user-reviewer', 'Dr. Arvind Joshi');
    } else if (workflow.targetActionType === 'submit_response') {
      submitClarificationResponse(
        'clr-001',
        'We have procured and installed updated department computer inventory and installation evidence, submitted for human verification against the cited APH provision.',
        'BSIET_INV_2026_1044.pdf'
      );
    } else if (workflow.targetActionType === 'schedule_evc') {
      scheduleEVC('2026-04-05', ['Prof. K. Ramanathan (technical expert)', 'Dr. Anita Deshmukh (infrastructure expert)'], 'Physical');
    } else if (workflow.targetActionType === 'record_decision') {
      recordDecision('APPROVED', 'SHC-WR-2026-BSIET-0492', 'All statutory gates verified and cleared.');
    } else if (workflow.targetActionType === 'validate_workflow') {
      publishWorkflowRevision('v2026.3-DRAFT');
    }

    if (onActionAdopted) {
      onActionAdopted(workflow.proposedAction);
    }
    onClose();
  };

  const currentStep = workflow.steps[currentStepIndex] || workflow.steps[0];

  return (
    <WorkflowCanvas
      activeAgent={activeAgent}
      appCase={appCase}
      workflow={workflow}
      currentStepIndex={currentStepIndex}
      currentStep={currentStep}
      isRunning={isRunning}
      hasCompleted={hasCompleted}
      onClose={onClose}
      onStart={handleStartAutoRun}
      onNext={handleStepForward}
      onReset={handleReset}
      onApply={handleExecuteProposedAction}
    />
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#0A1D36]/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      <div className="bg-[#0B1C30] text-slate-100 rounded-2xl shadow-2xl border border-slate-700/80 w-full max-w-6xl max-h-[94vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header */}
        <div className="bg-[#071424] px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-base font-bold text-white tracking-tight">
                  {activeAgent.name}
                </h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium">
                  Working through the application
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <span>{workflow.roleTitle}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-300">Docket {appCase.id}</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400/90 font-medium">Step-by-step review</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Close Execution Studio"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Body: Split Columns */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          
          {/* Left Column (7 cols): Domain-Specific Live Visualizer Canvas */}
          <div className="lg:col-span-7 p-5 flex flex-col justify-between space-y-4 bg-[#091A2F]/40 overflow-y-auto">
            <div className="space-y-4">
              {/* Stepper Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                    Stage {currentStepIndex + 1} of {workflow.steps.length}
                  </div>
                  <h3 className="text-sm font-bold text-white mt-0.5">
                    {currentStep.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {currentStep.subtext}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleStartAutoRun}
                    disabled={isRunning}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-lg text-xs transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-40"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isRunning ? 'Running...' : 'Run Autonomous Workflow'}</span>
                  </button>

                  <button
                    onClick={handleStepForward}
                    disabled={isRunning || currentStepIndex >= workflow.steps.length - 1}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1 disabled:opacity-30"
                    title="Advance to next step"
                  >
                    <FastForward className="w-3.5 h-3.5" />
                    <span>Next</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs border border-slate-700 transition-colors"
                    title="Reset execution"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* SPECIFIC VISUALIZER BY AGENT */}
              {selectedAgentId === 'agent-verifier' && (
                <div className="space-y-3">
                  {/* Document OCR Scanner with moving laser */}
                  <div className="relative bg-white text-slate-900 rounded-xl p-5 border border-slate-300 shadow-md font-sans text-xs overflow-hidden select-none">
                    
                    {/* Glowing Laser Scanline */}
                    <div
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 shadow-[0_0_12px_#38bdf8] pointer-events-none transition-all duration-700 z-20"
                      style={{ top: `${laserYPercent}%` }}
                    />

                    {/* Invoice Document Header */}
                    <div className="border-b border-slate-200 pb-3 flex items-start justify-between">
                      <div>
                        <div className="font-bold text-sm text-slate-950 uppercase tracking-tight">
                          Synthetic evidence package
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Kolhapur, Maharashtra · supplier identity is not used for this evidence comparison
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-slate-800">TAX INVOICE</span>
                        <div className="text-[10px] font-mono text-slate-500">BSIET_CSE_AIML_Updated_Inventory_Synthetic.pdf</div>
                      </div>
                    </div>

                    {/* Bill To & Bounding Box 1 */}
                    <div className="py-2.5 flex items-start justify-between text-[11px] border-b border-slate-100">
                      <div className={`p-1.5 rounded transition-colors ${currentStepIndex >= 1 ? 'bg-cyan-50 border border-cyan-400/80 ring-2 ring-cyan-400/20' : ''}`}>
                        <div className="font-semibold text-slate-700">Billed To (Applicant Institution):</div>
                        <div className="font-bold text-slate-900">
                          Dr. Bapuji Salunkhe Institute of Engineering and Technology (simulated case)
                        </div>
                        <div className="text-[10px] text-slate-500">Kolhapur, Maharashtra</div>
                      </div>
                      <div className="text-right">
                        {currentStepIndex >= 1 && (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded font-mono text-[10px] font-bold">
                            OCR CONFIDENCE: 99.8%
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Line Items Table with Scanned Highlights */}
                    <div className="pt-2">
                      <table className="w-full text-[11px] border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-500 text-[10px] uppercase font-semibold">
                            <th className="text-left py-1">Description</th>
                            <th className="text-center py-1">HSN</th>
                            <th className="text-right py-1">Qty</th>
                            <th className="text-right py-1">Unit Rate</th>
                            <th className="text-right py-1">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className={`border-b border-slate-100 transition-colors ${currentStepIndex >= 2 ? 'bg-emerald-50/80 border-emerald-300' : ''}`}>
                            <td className="py-1.5 font-medium text-slate-900">
                              <div>Supermicro SYS-7049GP Department Computer</div>
                              <div className="text-[10px] text-slate-500">Dual Xeon Gold / 128GB RAM / 2x standard department computer VRAM</div>
                            </td>
                            <td className="text-center font-mono py-1.5">8471</td>
                            <td className="text-right font-mono font-bold py-1.5 text-slate-950">10 Units</td>
                            <td className="text-right font-mono py-1.5">₹2,48,000</td>
                            <td className="text-right font-mono font-bold py-1.5">₹24,80,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Tax & Totals */}
                    <div className="pt-2 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-500">CGST (9%) + SGST (9%): ₹4,46,400</span>
                      <span className="font-bold text-slate-950 text-xs">Total: ₹29,26,400.00</span>
                    </div>
                  </div>

                  {/* Aggregate Delta Math Card */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono">Initial Declared</div>
                      <div className="text-base font-bold text-slate-200 font-mono">30 Units</div>
                      <div className="text-[10px] text-slate-400">BSIET-COMP-INV-16</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-cyan-400 font-mono">OCR Extracted</div>
                      <div className="text-base font-bold text-cyan-300 font-mono">+10 Units</div>
                      <div className="text-[10px] text-cyan-400/80">BSIET-COMP-INV-16</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-emerald-400 font-mono">Verified Aggregate</div>
                      <div className="text-base font-bold text-emerald-300 font-mono">Inventory count requires human reconciliation</div>
                      <div className="text-[10px] text-emerald-400">Target 40 (Compliant)</div>
                    </div>
                  </div>
                </div>
              )}

              {selectedAgentId === 'agent-scrutiny' && (
                <div className="space-y-3">
                  {/* RAG Knowledge Retrieval Chunk */}
                  <div className="p-4 rounded-xl bg-[#071424] border border-blue-500/30 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-blue-400">
                      <span>KNOWLEDGE CHUNK: AICTE APH 2026-27</span>
                      <span className="text-emerald-400 font-bold">Cosine Match: 0.941</span>
                    </div>
                    <div className="text-xs text-white font-semibold">
                      Annexure 4 · Section 4.1 — Computers, Software and Internet (pp. 92–93)
                    </div>
                    <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-800/40 text-xs text-slate-200 leading-relaxed italic">
                      &ldquo;For undergraduate programs in Artificial Intelligence & Machine Learning with an annual approved intake of 60 students, institutions must furnish an exclusive computing laboratory featuring a minimum of <span className="text-amber-300 font-bold not-italic underline decoration-amber-400">20 computers</span> equipped with discrete computer-labs having not less than 12GB dedicated VRAM.&rdquo;
                    </div>
                  </div>

                  {/* Deficit Formulation Card */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">APH Mandate vs Observed Declared Units:</span>
                      <span className="font-mono text-rose-400 font-bold">-10 Units Deficit</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400" style={{ width: '75%' }} />
                    </div>
                    <div className="flex justify-between text-[11px] font-mono text-slate-400">
                      <span>Declared: 30 / 40 (75%)</span>
                      <span className="text-amber-300 font-medium">Potential evidence gap</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedAgentId === 'agent-regional' && (
                <div className="space-y-3">
                  {/* GIS & Payment Validation */}
                  <div className="p-4 rounded-xl bg-[#071424] border border-amber-500/30 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-amber-400">
                      <span>GIS SPATIAL JURISDICTION ENGINE</span>
                      <span className="text-emerald-400 font-bold">CONTAINED (PASS)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                        <div className="text-[10px] text-slate-400">Coordinates:</div>
                        <div className="font-mono font-bold text-white">18.5912° N, 73.7389° E</div>
                        <div className="text-[10px] text-slate-500">Kolhapur, Maharashtra</div>
                      </div>
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                        <div className="text-[10px] text-slate-400">Assigned Regional Office:</div>
                        <div className="font-bold text-amber-300">Western Regional Office (WRO)</div>
                        <div className="text-[10px] text-slate-500">Jurisdiction Validated</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Bharatkosh Gateway Token</div>
                      <div className="text-[11px] text-slate-400 font-mono">TXN-AICTE-99214 · ₹1,50,000</div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                      VERIFIED SETTLED
                    </span>
                  </div>
                </div>
              )}

              {selectedAgentId === 'agent-decision' && (
                <div className="space-y-3">
                  {/* 4 Statutory Pre-requisite Gates */}
                  <div className="p-4 rounded-xl bg-[#071424] border border-purple-500/30 space-y-2.5">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                      Standing Hearing Committee · 4 Pre-Requisite Statutory Gates
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded bg-slate-900/80 border border-emerald-500/40 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <div className="font-semibold text-white">Gate 1: Land & Built-up</div>
                          <div className="text-[10px] text-slate-400">7.5 Ac / 4,250 sq.m (PASS)</div>
                        </div>
                      </div>
                      <div className="p-2 rounded bg-slate-900/80 border border-emerald-500/40 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <div className="font-semibold text-white">Gate 2: Computing Lab</div>
                          <div className="text-[10px] text-slate-400">40 / 20 computers Nodes (PASS)</div>
                        </div>
                      </div>
                      <div className="p-2 rounded bg-slate-900/80 border border-emerald-500/40 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <div className="font-semibold text-white">Gate 3: Deficiencies</div>
                          <div className="text-[10px] text-slate-400">CLR/2026/01 Resolved (PASS)</div>
                        </div>
                      </div>
                      <div className="p-2 rounded bg-slate-900/80 border border-emerald-500/40 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <div className="font-semibold text-white">Gate 4: Endorsements</div>
                          <div className="text-[10px] text-slate-400">PMRDA, Fire NOC, SPPU (PASS)</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-slate-400 font-mono">Gazette Resolution Decree:</div>
                      <div className="font-bold text-white font-mono">#SHC-WR-2026-BSIET-0492</div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono font-bold">
                      GRANT OF APPROVAL
                    </span>
                  </div>
                </div>
              )}

              {/* Generic Visualizer for other agents */}
              {!['agent-verifier', 'agent-scrutiny', 'agent-regional', 'agent-decision'].includes(selectedAgentId) && (
                <div className="p-5 rounded-xl bg-[#071424] border border-slate-700/80 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>DOMAIN EXECUTION ENGINE</span>
                    <span className="text-emerald-400 font-bold">100% DETERMINISTIC</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200">
                    <div className="font-bold text-white mb-1">{workflow.roleTitle} Domain Pipeline:</div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {workflow.domainFocus}. Operating under non-repudiation security constraints and cryptographic verification protocols.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Stage Timeline Stepper */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-400">
                <span>Work steps</span>
                <span>{hasCompleted ? 'ALL DONE' : isRunning ? 'IN PROGRESS' : 'READY'}</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {workflow.steps.map((st, i) => {
                  const isCurrent = i === currentStepIndex;
                  const isPast = i < currentStepIndex || hasCompleted;
                  return (
                    <div
                      key={i}
                      className={`p-2 rounded-lg border text-[10px] transition-all text-center ${
                        isCurrent && isRunning
                          ? 'border-amber-400 bg-amber-500/20 text-amber-200 ring-1 ring-amber-400/40'
                          : isPast
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                          : 'border-slate-800 bg-slate-900/60 text-slate-500'
                      }`}
                    >
                      <div className="font-mono font-bold">0{i + 1}</div>
                      <div className="truncate mt-0.5">{st.title.split(' ')[0]}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Friendly work updates */}
          <div className="lg:col-span-5 p-5 flex flex-col justify-between space-y-4 bg-[#081729] overflow-y-auto">
            <div className="space-y-4">
              
              {/* Current work explanation */}
              <div className="rounded-xl border border-slate-700/80 bg-[#071321] overflow-hidden">
                <button
                  onClick={() => setThoughtExpanded(!thoughtExpanded)}
                  className="w-full px-3.5 py-2.5 flex items-center justify-between bg-slate-900/80 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>What the agent is doing</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <span>{isRunning ? 'Working now' : hasCompleted ? 'Finished' : 'Ready'}</span>
                    {thoughtExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {thoughtExpanded && (
                  <div className="p-3.5 text-xs text-slate-300 leading-relaxed font-sans border-t border-slate-800 bg-[#06101D] space-y-2">
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {currentStep.subtext}
                    </p>
                  </div>
                )}
              </div>

              {/* Friendly tool action card */}
              {currentStep.toolCall && (
                <div className="rounded-xl border border-cyan-500/30 bg-[#071626] p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-cyan-300">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-semibold">{friendlyToolName(currentStep.toolCall?.toolName || 'case review')}</span>
                    </span>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {isRunning ? 'IN PROGRESS' : currentStepIndex > 0 || hasCompleted ? 'DONE' : 'READY'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    The agent is using this step to {currentStep.subtext.toLowerCase()}.
                  </p>
                  <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/50 text-xs text-emerald-200">
                    <span className="text-slate-400">Result: </span>
                    {currentStep.logDetail.replace(/^[A-Z_]+\s*/, '').replace(/\[[^\]]+\]/g, '').trim()}
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-slate-700/80 bg-[#071321] p-4">
                <div className="text-xs font-semibold text-slate-300 mb-3">Work completed so far</div>
                <div className="space-y-2">
                  {workflow.steps.slice(0, hasCompleted ? workflow.steps.length : currentStepIndex).map((step, index) => (
                    <div key={step.title} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{step.title}</span>
                    </div>
                  ))}
                  {currentStepIndex === 0 && !hasCompleted && (
                    <div className="flex items-start gap-2 text-xs text-slate-500">
                      <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                      <span>Start the workflow to see progress here</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Human-in-the-Loop Handshake Action Card */}
            <div className="pt-3 border-t border-slate-800">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                      Your review is needed
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-700/50">
                    WAITING FOR YOU
                  </span>
                </div>

                <p className="text-xs text-slate-200 font-medium leading-normal">
                  {getSimpleSummary(workflow).next}
                </p>

                <div className="pt-1 flex items-center justify-between gap-3">
                  <span className="text-[10px] text-slate-400 leading-tight">
                    The agent has prepared the work, but an authorised officer must approve it.
                  </span>
                  <button
                    onClick={handleExecuteProposedAction}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-bold rounded-lg text-xs transition-all shadow-sm flex items-center gap-1.5 shrink-0 whitespace-nowrap"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Review and apply</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-2.5 bg-[#06121F] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-3">
            <span>AICTE approval workflow · Agent-assisted review</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500">Human approval stays in control</span>
          </div>
          <button
            onClick={onClose}
            className="px-3.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md text-xs font-medium border border-slate-700 transition-colors"
          >
            Close Studio
          </button>
        </div>

      </div>
    </div>
  );
};
