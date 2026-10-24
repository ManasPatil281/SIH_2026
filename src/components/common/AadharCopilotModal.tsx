import React, { useState } from 'react';
import { queryAadharCopilot, CopilotQueryResult, HANDBOOK_PASSAGES } from '../../lib/copilot/handbookData';
import {
  Sparkles,
  Search,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  X,
  FileText,
  Clock,
  Layers,
} from 'lucide-react';

interface AadharCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyRecommendation?: (action: string) => void;
}

export const AadharCopilotModal: React.FC<AadharCopilotModalProps> = ({
  isOpen,
  onClose,
  onApplyRecommendation,
}) => {
  const [queryInput, setQueryInput] = useState('');
  const [activeResult, setActiveResult] = useState<CopilotQueryResult | null>(() =>
    queryAadharCopilot('What is the mandatory department computer requirement for AI/ML?')
  );
  const [isSearching, setIsSearching] = useState(false);

  if (!isOpen) return null;

  const sampleQueries = [
    'What is the mandatory department computer requirement for AI/ML?',
    'What land evidence should be checked for the simulated Kolhapur case?',
    'What are the statutory triggers mandating an EVC physical inspection?',
    'Is provisional SPPU affiliation sufficient for technical approval?',
  ];

  const handleRunQuery = (q: string) => {
    setQueryInput(q);
    setIsSearching(true);
    setTimeout(() => {
      const res = queryAadharCopilot(q);
      setActiveResult(res);
      setIsSearching(false);
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#0F294A] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-base text-white">Nivaran Copilot · Agentic RAG</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-200 border border-blue-400/30">
                  APH 2026–27 Indexed
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Grounding regulatory findings against Approval Process Handbook norms
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Query Input & Sample Prompts */}
        <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50/70 shrink-0 space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (queryInput.trim()) handleRunQuery(queryInput);
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Ask handbook question (e.g., department computer norms, land contiguous acres, EVC triggers)..."
                className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0F294A] focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-4 py-2.5 bg-[#0F294A] hover:bg-[#0A1D36] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
            >
              {isSearching ? 'Retrieving...' : 'Query Copilot'}
            </button>
          </form>

          {/* Suggested Prompts */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-500 font-medium">Case-Aware Queries:</span>
            {sampleQueries.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleRunQuery(q)}
                className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11px] transition-colors truncate max-w-[280px]"
                title={q}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-sm text-slate-700">
          {activeResult && (
            <>
              {/* Plain English synthesis answer */}
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-blue-900 text-xs sm:text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Regulatory Answer & Normative Interpretation</span>
                  </h4>
                  <span className="text-[11px] font-mono text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    APH Grounded
                  </span>
                </div>
                <p className="text-blue-950 text-xs sm:text-sm leading-relaxed">
                  {activeResult.plainEnglishAnswer}
                </p>
                <div className="pt-2 border-t border-blue-200/60 flex items-center gap-2 text-xs text-blue-800">
                  <span className="font-semibold">Recommended Action:</span>
                  <span>{activeResult.recommendedAction}</span>
                </div>
              </div>

              {/* RAG Retrieval Trace */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Agentic RAG Retrieval Trace</span>
                </h4>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2 font-mono text-xs">
                  {activeResult.retrievalTrace.map((t, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-3 text-[11px]">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-semibold text-slate-800">{t.step}:</span>
                        <span className="text-slate-600">{t.detail}</span>
                      </div>
                      <span className="text-slate-400 shrink-0 tabular-nums">+{t.latencyMs}ms</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evidence Comparison Table */}
              {activeResult.caseEvidenceComparison.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Case Evidence vs Handbook Requirement Comparison
                  </h4>
                  <div className="border border-slate-200 rounded-lg overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="px-3 py-2">Parameter</th>
                          <th className="px-3 py-2">APH 2026–27 Norm</th>
                          <th className="px-3 py-2">Application Declared</th>
                          <th className="px-3 py-2">Extracted / Verified Evidence</th>
                          <th className="px-3 py-2 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {activeResult.caseEvidenceComparison.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="px-3 py-2 font-medium text-slate-900">{row.parameter}</td>
                            <td className="px-3 py-2 text-slate-600">{row.aphRequirement}</td>
                            <td className="px-3 py-2 text-slate-600">{row.applicationDeclared}</td>
                            <td className="px-3 py-2 font-mono text-slate-800">{row.extractedOrVerified}</td>
                            <td className="px-3 py-2 text-right">
                              <span
                                className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                                  row.complianceStatus === 'COMPLIANT' || row.complianceStatus === 'VERIFIED'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {row.complianceStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Retrieved Source Passages */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>Retrieved Handbook Clauses & Normative Passages</span>
                </h4>
                <div className="space-y-3">
                  {activeResult.retrievedPassages.map((p) => (
                    <div key={p.id} className="p-3.5 rounded-lg border border-slate-200 bg-white shadow-xs space-y-1.5">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-slate-900">{p.clause}</span>
                          <span className="text-[11px] text-slate-500">· {p.chapter}</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          Page {p.page} · {p.sourceDoc}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-slate-800">{p.title}</div>
                      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100">
                        "{p.content}"
                      </p>
                      {p.normThresholds && (
                        <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500">
                          <span className="font-medium text-slate-700">Prescribed Norms:</span>
                          {Object.entries(p.normThresholds).map(([k, v]) => (
                            <span key={k} className="bg-slate-100 px-2 py-0.5 rounded font-mono text-slate-700">
                              {k}: {v}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="font-semibold text-amber-950">Statutory Demonstration Notice:</div>
                  <p className="text-[11px] leading-relaxed text-amber-800">
                    {activeResult.disclaimer}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Human reviewer retains exclusive authority over regulatory decisions
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
            {onApplyRecommendation && activeResult && (
              <button
                onClick={() => {
                  onApplyRecommendation(activeResult.recommendedAction);
                  onClose();
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0F294A] hover:bg-[#0A1D36] rounded-md transition-colors flex items-center gap-1.5"
              >
                <span>Adopt Recommendation in Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
