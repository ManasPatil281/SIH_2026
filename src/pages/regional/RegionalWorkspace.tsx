import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../lib/state/AppContext';
import { LiveAgentAutomationModal } from '../../components/common/LiveAgentAutomationModal';
import {
  FilePlus2,
  FolderKanban,
  UserCheck,
  BarChart3,
  Bell,
  History,
  Bot,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Building,
  Clock,
  Shield,
  Search,
  Filter,
  Sparkles,
} from 'lucide-react';
import { OperationsControlCenter } from '../../components/common/OperationsControlCenter';

export const RegionalWorkspace: React.FC = () => {
  const { appCase, currentUser, assignReviewer, notifications } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  // Active subview based on pathname
  const path = location.pathname;
  let activeTab = 'dashboard';
  if (path.includes('/assignment')) activeTab = 'assignment';
  else if (path.includes('/audit')) activeTab = 'audit';
  else if (path.includes('/operations')) activeTab = 'operations';

  const [selectedReviewer, setSelectedReviewer] = useState('Dr. Arvind Joshi');
  const [selectedReviewerId, setSelectedReviewerId] = useState('user-reviewer');
  const [showLiveAutomation, setShowLiveAutomation] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const reviewers = [
    { id: 'user-reviewer', name: 'Dr. Arvind Joshi', domain: 'Computer Science & AI', rank: 'Senior Professor (AICTE Panelist)' },
    { id: 'user-rev-2', name: 'Dr. Meenakshi Sundaram', domain: 'Data Science & Information Tech', rank: 'Associate Professor' },
    { id: 'user-rev-3', name: 'Dr. Rajesh Deshmukh', domain: 'Electronics & Computer Engineering', rank: 'Professor' },
  ];

  const handleAssign = () => {
    const res = assignReviewer(selectedReviewerId, selectedReviewer);
    setFeedbackMsg({
      type: res.success ? 'success' : 'error',
      text: res.message,
    });
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Page Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span>Maharashtra West Regional Office</span>
            <span>·</span>
            <span>Kolhapur case desk</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Regional Intake & Assignment Workspace
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Regional Officer: {currentUser?.name} · Jurisdiction: {currentUser?.jurisdiction}
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

      {activeTab === 'operations' && <OperationsControlCenter />}

      {/* Overview KPI Cards */}
      {(activeTab === 'dashboard' || activeTab === 'analytics') && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Intake Applications
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">24</div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
              <span>Maharashtra (WR) Region</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Assigned to Review
            </div>
            <div className="text-2xl font-bold text-blue-900 mt-1 tabular-nums">19 / 24</div>
            <div className="text-[11px] text-blue-700 font-medium mt-1">
              {appCase.assignedReviewer ? 'Active Case Assigned' : 'Assignment Pending'}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Fee Receipts Cleared
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">100%</div>
            <div className="text-[11px] text-slate-500 mt-1">Bharatkosh Gateway Token Valid</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Average Intake Latency
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">1.4 Days</div>
            <div className="text-[11px] text-slate-500 mt-1">Well within 3-day target</div>
          </div>
        </div>
      )}

      {/* Subviews */}
      {/* 1. Dashboard & Case Queue */}
      {(activeTab === 'dashboard' || activeTab === 'cases') && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="font-bold text-sm text-slate-900">
                Western Region Applications Queue (2026–27 Session)
              </h2>
              <p className="text-xs text-slate-500">
                Showing cases requiring intake verification and reviewer designation
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500">1 Case Displayed</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Docket ID</th>
                  <th className="px-4 py-3">Institution & Location</th>
                  <th className="px-4 py-3">Proposed Programme</th>
                  <th className="px-4 py-3">Assigned Reviewer</th>
                  <th className="px-4 py-3">Workflow State</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono font-bold text-blue-900">{appCase.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{appCase.institutionName}</div>
                    <div className="text-[11px] text-slate-500">{appCase.address}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-800">{appCase.programme}</div>
                    <div className="text-[11px] text-slate-500">Intake: {appCase.intakeProposed} Seats · {appCase.academicYear}</div>
                  </td>
                  <td className="px-4 py-3">
                    {appCase.assignedReviewer ? (
                      <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-200 inline-block">
                        {appCase.assignedReviewer}
                      </span>
                    ) : (
                      <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-medium border border-amber-200 inline-block">
                        Unassigned
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                      {appCase.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => navigate('/regional/assignment')}
                      className="px-2.5 py-1 bg-[#0F294A] hover:bg-[#0A1D36] text-white rounded text-[11px] font-semibold transition-colors"
                    >
                      Assign Reviewer
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. Reviewer Assignment Panel */}
      {activeTab === 'assignment' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 space-y-5">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                Step 1 of Guided Hackathon Demo
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                Assign Scrutiny Reviewer to Docket {appCase.id}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                The Regional Officer designates an authorized panel expert to evaluate regulatory compliance against APH norms.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Institution:</span>
                <span className="font-bold text-slate-900">{appCase.institutionName} ({appCase.institutionCode})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Programme:</span>
                <span className="font-semibold text-slate-800">{appCase.programme} (Intake: {appCase.intakeProposed})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Jurisdiction:</span>
                <span className="text-slate-700">{appCase.region}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Current Status:</span>
                <span className="font-mono text-blue-800 font-semibold">{appCase.status}</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-800">
                Select Scrutiny Reviewer (AICTE Technical Panel)
              </label>
              <div className="space-y-2">
                {reviewers.map((rev) => {
                  const isSelected = selectedReviewerId === rev.id;
                  return (
                    <div
                      key={rev.id}
                      onClick={() => {
                        setSelectedReviewerId(rev.id);
                        setSelectedReviewer(rev.name);
                      }}
                      className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-600'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs text-slate-900">{rev.name}</div>
                        <div className="text-[11px] text-slate-500">{rev.rank} · {rev.domain}</div>
                      </div>
                      <span className="text-xs font-semibold text-blue-700">
                        {isSelected ? 'Selected' : 'Select'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleAssign}
                className="px-5 py-2.5 bg-[#0F294A] hover:bg-[#0A1D36] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <UserCheck className="w-4 h-4" />
                <span>Confirm Assignment & Advance State to UNDER_SCRUTINY</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-900">
              Regional Intake Agent Guidance
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The Regional Intake Agent cross-referenced the simulated fee token and confirmed that the Kolhapur case package is ready for assignment.
            </p>
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-blue-700" />
                <span>Recommended Expert Panel</span>
              </div>
              <p className="text-[11px] text-blue-800">
                Dr. Arvind Joshi is recommended due to specialization in Emerging AI/ML Infrastructure and Computer Science & Engineering.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Application Intake Checklist view */}
      {activeTab === 'intake' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Intake Completeness Verification Checklist
          </h2>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2.5">Statutory Head</th>
                  <th className="px-4 py-2.5">Verification Detail</th>
                  <th className="px-4 py-2.5">Source Gateway</th>
                  <th className="px-4 py-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-900">Bharatkosh Processing Fee</td>
                  <td className="px-4 py-3 text-slate-600">₹1,50,000 via Gateway Ref #TXN-AICTE-99214</td>
                  <td className="px-4 py-3 font-mono text-slate-500">Gov. Bharatkosh API</td>
                  <td className="px-4 py-3 text-right">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-semibold">VERIFIED</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-900">Trust / Society Registration</td>
                  <td className="px-4 py-3 text-slate-600">Applicant trust registration — synthetic evidence for this demo</td>
                  <td className="px-4 py-3 font-mono text-slate-500">Charity Commissioner Portal</td>
                  <td className="px-4 py-3 text-right">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-semibold">VERIFIED</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-900">Regional Jurisdiction</td>
                  <td className="px-4 py-3 text-slate-600">Kolhapur, Maharashtra falls within Western Regional Office (WR)</td>
                  <td className="px-4 py-3 font-mono text-slate-500">AICTE Jurisdiction Index</td>
                  <td className="px-4 py-3 text-right">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-semibold">VALIDATED</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Audit Trail View */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Regional Regulatory Audit Trail</h2>
            <span className="text-xs font-mono text-slate-500">{appCase.auditLog.length} Events Logged</span>
          </div>
          <div className="space-y-3 font-mono text-xs">
            {appCase.auditLog.map((event) => (
              <div key={event.id} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1">
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span className="font-bold text-slate-900 font-sans">{event.action}</span>
                  <span>{new Date(event.timestamp).toLocaleString()}</span>
                </div>
                <p className="text-slate-700 font-sans text-xs">{event.summary}</p>
                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Actor: {event.actorName} ({event.actorRole})</span>
                  <span className="truncate max-w-[200px]">SHA-256: {event.hashSignature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Interactive Agent Automation Modal */}
      <LiveAgentAutomationModal
        isOpen={showLiveAutomation}
        onClose={() => setShowLiveAutomation(false)}
        defaultAgentId="agent-regional"
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
