import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  Clock3,
  Play,
  RotateCcw,
  ShieldCheck,
  UserCheck,
  X,
} from 'lucide-react';

interface ReviewerAgentWorkflowDemoProps {
  isOpen: boolean;
  onClose: () => void;
  onActionAdopted?: (action: string) => void;
}

const workflowNodes = [
  {
    title: 'Read the application',
    detail: 'Collect the submitted programme, intake, and laboratory details.',
    result: '60 students · 16 computers listed in synthetic inventory',
  },
  {
    title: 'Check the approval rule',
    detail: 'Open Annexure 4, Section 4.1, pages 92–93 and check applicability.',
    result: '1:10 ratio; minimum 20 PCs; departmental lab evidence required',
  },
  {
    title: 'Spot the gap',
    detail: 'Highlight the evidence gap without declaring a legal deficiency.',
    result: 'Potential shortfall · human verification needed',
  },
  {
    title: 'Prepare a clarification',
    detail: 'Draft a plain-language request for the missing evidence.',
    result: 'Clarification draft ready',
  },
  {
    title: 'Reviewer approval',
    detail: 'Keep the final decision with the authorised human reviewer.',
    result: 'Ready to send after approval',
  },
];

export const ReviewerAgentWorkflowDemo: React.FC<ReviewerAgentWorkflowDemoProps> = ({
  isOpen,
  onClose,
  onActionAdopted,
}) => {
  const [activeNode, setActiveNode] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setActiveNode(0);
    setIsRunning(false);
    setHasCompleted(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isRunning) return;
    const timer = setTimeout(() => {
      if (activeNode < workflowNodes.length - 1) {
        setActiveNode((node) => node + 1);
      } else {
        setIsRunning(false);
        setHasCompleted(true);
      }
    }, 850);

    return () => clearTimeout(timer);
  }, [activeNode, isRunning]);

  if (!isOpen) return null;

  const startWorkflow = () => {
    setActiveNode(0);
    setHasCompleted(false);
    setIsRunning(true);
  };

  const stepForward = () => {
    if (activeNode < workflowNodes.length - 1) {
      setActiveNode((node) => node + 1);
      return;
    }
    setHasCompleted(true);
  };

  const resetWorkflow = () => {
    setActiveNode(0);
    setIsRunning(false);
    setHasCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0F294A]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#F8FAFC] w-full max-w-6xl max-h-[94vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <header className="bg-[#0F294A] text-white px-5 py-4 sm:px-7 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-400/15 border border-indigo-300/30 flex items-center justify-center">
              <Bot className="w-5 h-5 text-indigo-200" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-bold text-base">Scrutiny Review Agent</h2>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-200 border border-emerald-300/30">
                  One workflow
                </span>
              </div>
              <p className="text-xs text-blue-100/75 mt-0.5">
                Reviewing BSIET · B.Tech AI &amp; ML · 60 student intake
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close workflow demo"
            className="p-2 rounded-lg text-blue-100 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-700">Workflow execution</p>
              <h3 className="text-xl font-bold text-slate-900 mt-1">From application review to clarification draft</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                Follow the work as simple steps. The agent prepares evidence and a draft; the reviewer remains in control.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetWorkflow}
                className="px-3 py-2 text-xs font-semibold text-slate-600 border border-slate-300 rounded-lg hover:bg-white flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
              {!hasCompleted && (
                <button
                  onClick={isRunning ? stepForward : startWorkflow}
                  className="px-3.5 py-2 text-xs font-bold text-white bg-[#0F294A] hover:bg-[#0A1D36] rounded-lg flex items-center gap-1.5"
                >
                  {isRunning ? <ArrowRight className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {isRunning ? 'Next step' : 'Run workflow'}
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-semibold text-slate-500">
                {hasCompleted ? 'Workflow complete' : `Step ${activeNode + 1} of ${workflowNodes.length}`}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock3 className="w-3.5 h-3.5" /> Human approval always required
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:items-stretch">
              {workflowNodes.map((node, index) => {
                const isDone = hasCompleted || index < activeNode;
                const isCurrent = !hasCompleted && index === activeNode;
                return (
                  <React.Fragment key={node.title}>
                    <div
                      className={`relative rounded-xl border-2 p-4 min-h-[172px] transition-all md:flex-1 ${
                        isCurrent
                          ? 'border-indigo-500 bg-indigo-50 shadow-md'
                          : isDone
                          ? 'border-emerald-300 bg-emerald-50'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {index + 1}
                        </span>
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : isCurrent ? (
                          <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{node.title}</h4>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">{node.detail}</p>
                      {(isDone || isCurrent) && (
                        <p className={`text-[11px] font-semibold mt-3 ${isDone ? 'text-emerald-700' : 'text-indigo-700'}`}>
                          {node.result}
                        </p>
                      )}
                    </div>
                    {index < workflowNodes.length - 1 && (
                      <div className="hidden md:flex items-center justify-center -mx-2">
                        <ArrowRight className={`w-4 h-4 ${index < activeNode || hasCompleted ? 'text-emerald-500' : 'text-slate-300'}`} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 rounded-xl border border-rose-200 bg-rose-50 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-rose-700">Finding prepared</p>
              <p className="text-sm font-bold text-rose-900 mt-1">Potential evidence gap found</p>
              <p className="text-xs text-rose-800/80 mt-1">16 computers are listed; installation and availability require human verification.</p>
            </div>
            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">Next owner</p>
              <p className="text-sm font-bold text-indigo-950 mt-1 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4" /> Senior Reviewer
              </p>
              <p className="text-xs text-indigo-800/80 mt-1">Approve before dispatch.</p>
            </div>
          </div>
        </div>

        <footer className="px-5 py-4 sm:px-7 bg-white border-t border-slate-200 flex items-center justify-between gap-3 flex-wrap">
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> AI prepares; authorised officers decide.
          </p>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900">
              Close
            </button>
            {hasCompleted && (
              <button
                onClick={() => {
                  onActionAdopted?.(
                    'Issue Formal Clarification Notice CLR/2026/01 for the 10 department computer shortfall.'
                  );
                  onClose();
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" /> Adopt draft
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};
