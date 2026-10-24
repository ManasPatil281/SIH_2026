import React from 'react';
import { ArrowRight, Bot, CheckCircle2, GitBranch, RotateCcw, ShieldCheck } from 'lucide-react';
import { ApplicationStatus } from '../../types';

interface CommitteeWorkflowMapProps {
  status: ApplicationStatus;
}

interface WorkflowStage {
  title: string;
  owner: string;
  agent: string;
  description: string;
  statuses: ApplicationStatus[];
}

const stages: WorkflowStage[] = [
  {
    title: 'Application submitted',
    owner: 'Institution Representative',
    agent: 'Intake assistance',
    description: 'Application, fee token, and evidence package received.',
    statuses: ['SUBMITTED'],
  },
  {
    title: 'Scrutiny committee',
    owner: 'Scrutiny Reviewer',
    agent: 'Norm and deficiency review',
    description: 'Checks the application against the approval handbook.',
    statuses: ['UNDER_SCRUTINY', 'CLARIFICATION_REQUIRED', 'CLARIFICATION_SUBMITTED', 'SCRUTINY_COMPLETED'],
  },
  {
    title: 'Subject expertise review',
    owner: 'Subject Expert / Reviewer',
    agent: 'Evidence and checklist support',
    description: 'Reviews programme-specific infrastructure and faculty evidence.',
    statuses: ['DOCUMENT_VERIFICATION_PENDING'],
  },
  {
    title: 'Expert visit committee',
    owner: 'EVC Coordinator',
    agent: 'Inspection readiness',
    description: 'Confirms digital readiness or coordinates a physical visit.',
    statuses: ['EVC_PENDING', 'EVC_COMPLETED'],
  },
  {
    title: 'Executive committee',
    owner: 'Decision Authority',
    agent: 'Gate and decision brief',
    description: 'Confirms statutory gates before the final resolution.',
  statuses: ['DECISION_PENDING'],
  },
  {
  title: 'Council / final authority',
  owner: 'Decision Authority',
  agent: 'Resolution preparation',
  description: 'Records the final decision and prepares the LOA or LOR.',
  statuses: ['APPROVED', 'REJECTED'],
  },
];

const statusLabels: Record<ApplicationStatus, string> = {
  SUBMITTED: 'Application submitted',
  UNDER_SCRUTINY: 'Under scrutiny',
  CLARIFICATION_REQUIRED: 'Deficiency noted',
  CLARIFICATION_SUBMITTED: 'Response submitted',
  DOCUMENT_VERIFICATION_PENDING: 'Evidence verification',
  SCRUTINY_COMPLETED: 'Scrutiny completed',
  EVC_PENDING: 'Expert visit pending',
  EVC_COMPLETED: 'Expert visit completed',
  DECISION_PENDING: 'Decision pending',
  APPROVED: 'Letter of approval',
  REJECTED: 'Letter of rejection',
  RETURNED_FOR_ACTION: 'Returned for action',
};

export const CommitteeWorkflowMap: React.FC<CommitteeWorkflowMapProps> = ({ status }) => {
  const activeStage = stages.findIndex((stage) => stage.statuses.includes(status));
  const isDeficiency = status === 'CLARIFICATION_REQUIRED' || status === 'RETURNED_FOR_ACTION';

  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="p-5 border-b border-slate-200 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-700">
            <GitBranch className="w-3.5 h-3.5" />
            <span>Approval journey mapped to your system</span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-1">Committee workflow for this application</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Each committee has a responsible officer and a role-specific agent that prepares evidence, checks, or drafts.
            Human officers retain every consequential approval.
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
          Current: {statusLabels[status]}
        </span>
      </div>

      <div className="p-5 bg-[#fbfcfe]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3">
          {stages.map((stage, index) => {
            const isCurrent = index === activeStage;
            const isComplete = activeStage > index || status === 'APPROVED';
            return (
              <React.Fragment key={stage.title}>
                <div className={`relative rounded-xl border p-4 min-h-[178px] transition-all ${
                  isCurrent
                    ? 'border-indigo-400 bg-indigo-50 ring-2 ring-indigo-100'
                    : isComplete
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-slate-200 bg-white'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Stage {index + 1}</span>
                    {isComplete ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : isCurrent ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{stage.title}</h3>
                  <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">{stage.description}</p>
                  <div className="mt-3 pt-2 border-t border-slate-200/80 space-y-1">
                    <p className="text-[10px] font-semibold text-slate-700">{stage.owner}</p>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Bot className="w-3 h-3 text-indigo-500" /> {stage.agent}
                    </p>
                  </div>
                  {index < stages.length - 1 && (
                    <ArrowRight className="hidden md:block absolute top-1/2 -right-5 w-4 h-4 text-slate-300 z-10" />
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <div className={`mt-4 rounded-lg border px-4 py-3 flex items-start gap-3 ${
          isDeficiency ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-200'
        }`}>
          {isDeficiency ? (
            <RotateCcw className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
          ) : (
            <ShieldCheck className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
          )}
          <div>
            <p className={`text-xs font-bold ${isDeficiency ? 'text-rose-900' : 'text-slate-800'}`}>
              {isDeficiency ? 'Deficiency loop is active' : 'Controlled handoff'}
            </p>
            <p className={`text-[11px] mt-0.5 ${isDeficiency ? 'text-rose-800' : 'text-slate-600'}`}>
              {isDeficiency
                ? 'The agent prepares a clarification, the institution submits evidence, and the verifier checks it before scrutiny resumes.'
                : 'A clean review moves forward to the next committee. If any committee finds a gap, the case returns for clarification rather than being silently approved.'}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-500">
          <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200">No deficiency</span>
          <ArrowRight className="w-3.5 h-3.5" />
          <span className="px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-700">Executive committee</span>
          <ArrowRight className="w-3.5 h-3.5" />
          <span className="px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-amber-700">Council / final authority</span>
          <ArrowRight className="w-3.5 h-3.5" />
          <span className="px-2.5 py-1 rounded bg-yellow-50 border border-yellow-200 text-yellow-800">LOA or LOR</span>
        </div>
      </div>
    </section>
  );
};
