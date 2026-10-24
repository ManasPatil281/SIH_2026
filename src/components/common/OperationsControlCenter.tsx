import React, { useState } from 'react';
import { useApp } from '../../lib/state/AppContext';
import { ProcessingRoute } from '../../types';
import { AlertTriangle, BarChart3, Bell, CalendarClock, CheckCircle2, FileClock, GitBranch, ShieldCheck } from 'lucide-react';

export const OperationsControlCenter: React.FC = () => {
  const {
    appCase,
    currentUser,
    setProcessingRoute,
    submitCompliance,
    verifyCompliance,
    submitUndertaking,
    acknowledgeEscalation,
    renewDocument,
  } = useApp();
  const [message, setMessage] = useState<string | null>(null);
  const showMessage = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(null), 3500);
  };
  const canVerify = currentUser?.role === 'document_verifier';
  const expiringDocuments = appCase.documents.filter((doc) => doc.expiresAt);
  const openEscalations = appCase.escalations.filter((item) => item.status !== 'CLOSED');
  const overdueDeadlines = appCase.deadlines.filter((item) => item.status === 'OVERDUE');

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
            <BarChart3 className="w-4 h-4" /> Integrated operations control
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Pendency, compliance & alert centre</h2>
          <p className="text-xs text-slate-500 mt-1">
            One live view of route, deadlines, EVC readiness, undertakings, document validity, escalations, and audit-backed actions.
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          {appCase.id} · {appCase.status.replace(/_/g, ' ')}
        </span>
      </div>

      {message && <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">{message}</div>}

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          ['Current route', appCase.processingRoute.replace(/_/g, ' ')],
          ['Overdue actions', String(overdueDeadlines.length)],
          ['Open escalations', String(openEscalations.length)],
          ['Undertakings', `${appCase.undertakings.filter((item) => item.status === 'VERIFIED').length}/${appCase.undertakings.length}`],
          ['Compliance records', `${appCase.complianceRecords.filter((item) => item.status === 'VERIFIED').length}/${appCase.complianceRecords.length}`],
        ].map(([label, value]) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-3">
            <p className="text-[10px] uppercase font-semibold text-slate-400">{label}</p>
            <p className="text-sm font-bold text-slate-900 mt-1">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-sm text-slate-900">Applicable processing route</h3>
          </div>
          <p className="text-xs text-slate-500">Configure whether this application follows scrutiny only, EVC, or the committee decision path.</p>
          <select
            value={appCase.processingRoute}
            onChange={(event) => showMessage(setProcessingRoute(event.target.value as ProcessingRoute).message)}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
          >
            <option value="ONLY_SCRUTINY">Only Scrutiny</option>
            <option value="SCRUTINY_PLUS_EVC">Scrutiny + EVC</option>
            <option value="EVC_PLUS_SHC">EVC + SAC/SHC</option>
            <option value="ONLY_EVC">Only EVC</option>
          </select>
          <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100 text-xs text-indigo-900">
            The selected route controls which gates appear in the decision brief. Every route still records the officer action and audit event.
          </div>
        </section>

        <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-600" />
            <h3 className="font-bold text-sm text-slate-900">Pendency & escalation queue</h3>
          </div>
          {appCase.deadlines.map((deadline) => (
            <div key={deadline.id} className="p-3 rounded-lg border border-slate-200 flex items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-semibold text-slate-900">{deadline.title}</p>
                <p className="text-[11px] text-slate-500">Due {new Date(deadline.dueDate).toLocaleDateString()} · Escalation level {deadline.escalationLevel}</p>
              </div>
              <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                deadline.status === 'OVERDUE' ? 'bg-rose-100 text-rose-700' : deadline.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>{deadline.status.replace(/_/g, ' ')}</span>
            </div>
          ))}
          {openEscalations.map((escalation) => (
            <div key={escalation.id} className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs">
              <div className="flex items-center justify-between gap-2">
                <p className="font-bold text-rose-900 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" />{escalation.title}</p>
                <button onClick={() => showMessage(acknowledgeEscalation(escalation.id).message)} className="px-2 py-1 rounded bg-white border border-rose-200 text-rose-700 font-semibold">Acknowledge</button>
              </div>
              <p className="text-rose-800/80 mt-1">{escalation.reason}</p>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">Undertakings & institutional compliance</h3>
          </div>
          {appCase.undertakings.map((item) => (
            <div key={item.id} className="p-3 rounded-lg border border-slate-200 text-xs">
              <div className="flex justify-between gap-2"><p className="font-semibold text-slate-900">{item.title}</p><span className="text-[10px] font-bold text-slate-500">{item.status}</span></div>
              <p className="text-slate-600 mt-1">{item.condition}</p>
              <p className="text-[11px] text-slate-500 mt-1">Due {new Date(item.dueDate).toLocaleDateString()} · Owner {item.owner}</p>
              {item.status === 'PENDING' && <button onClick={() => showMessage(submitUndertaking(item.id, 'doc-004').message)} className="mt-2 px-2.5 py-1.5 bg-indigo-600 text-white rounded text-[11px] font-semibold">Submit evidence</button>}
            </div>
          ))}
          {appCase.complianceRecords.map((item) => (
            <div key={item.id} className="p-3 rounded-lg border border-slate-200 text-xs">
              <div className="flex justify-between gap-2"><p className="font-semibold text-slate-900">{item.title}</p><span className="text-[10px] font-bold text-slate-500">{item.status}</span></div>
              <p className="text-slate-600 mt-1">{item.requirement}</p>
              <div className="flex gap-2 mt-2">
                {item.status === 'PENDING' && <button onClick={() => showMessage(submitCompliance(item.id, 'doc-003').message)} className="px-2.5 py-1.5 bg-indigo-600 text-white rounded text-[11px] font-semibold">Submit compliance</button>}
                {item.status === 'SUBMITTED' && canVerify && <button onClick={() => showMessage(verifyCompliance(item.id).message)} className="px-2.5 py-1.5 bg-emerald-600 text-white rounded text-[11px] font-semibold">Verify submission</button>}
              </div>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-amber-600" />
            <h3 className="font-bold text-sm text-slate-900">Document validity & renewals</h3>
          </div>
          {expiringDocuments.map((doc) => (
            <div key={doc.id} className="p-3 rounded-lg border border-slate-200 flex items-center justify-between gap-3 text-xs">
              <div><p className="font-semibold text-slate-900">{doc.title}</p><p className="text-[11px] text-slate-500">Expires {new Date(doc.expiresAt || '').toLocaleDateString()} · {doc.renewalStatus}</p></div>
              <button onClick={() => showMessage(renewDocument(doc.id, '2027-12-31T23:59:59Z').message)} className="px-2.5 py-1.5 border border-amber-300 bg-amber-50 text-amber-800 rounded text-[11px] font-semibold">Record renewal</button>
            </div>
          ))}
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex gap-2">
            <FileClock className="w-4 h-4 shrink-0" /> Advance alerts are generated from expiry dates and remain in the audit trail when renewed.
          </div>
        </section>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-3"><ShieldCheck className="w-4 h-4 text-indigo-600" /><h3 className="font-bold text-sm text-slate-900">Reporting snapshot</h3></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded border border-slate-200"><span className="text-slate-500">Application age</span><strong className="block text-slate-900 mt-1">{Math.max(1, Math.floor((Date.now() - new Date(appCase.submissionDate).getTime()) / 86400000))} days</strong></div>
          <div className="p-3 bg-slate-50 rounded border border-slate-200"><span className="text-slate-500">Audit events</span><strong className="block text-slate-900 mt-1">{appCase.auditLog.length}</strong></div>
          <div className="p-3 bg-slate-50 rounded border border-slate-200"><span className="text-slate-500">Documents</span><strong className="block text-slate-900 mt-1">{appCase.documents.length}</strong></div>
          <div className="p-3 bg-slate-50 rounded border border-slate-200"><span className="text-slate-500">EVC status</span><strong className="block text-slate-900 mt-1">{appCase.evcDetails.status.replace(/_/g, ' ')}</strong></div>
        </div>
      </div>
    </div>
  );
};
