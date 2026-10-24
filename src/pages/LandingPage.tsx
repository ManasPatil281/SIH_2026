import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../lib/state/AppContext';
import { DEMO_USERS } from '../lib/demo-users';
import { NivaranBrand } from '../components/common/NivaranBrand';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Sparkles,
  Bot,
  Lock,
  ArrowRight,
  ChevronRight,
  Database,
  Search,
  Scale,
  Users,
  Building2,
  Activity,
  Layers,
  FileCheck2,
  ExternalLink,
  ChevronDown,
  AlertTriangle,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { loginAs, appCase } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'workflow'>('overview');

  const handleLaunchRole = (userId: string, targetPath: string) => {
    loginAs(userId);
    navigate(targetPath);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      {/* Tricolor accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#D97706] via-white to-[#4DBB99] shrink-0" />

      {/* Institutional Top Bar */}
      <div className="bg-[#0A1D36] text-slate-300 py-1.5 px-4 text-xs border-b border-slate-800 text-center font-medium">
        <span className="text-amber-300 font-semibold mr-1.5">AICTE Approval Workflow Platform</span>
        Secure role-based processing, evidence verification, compliance monitoring and accountable decisions.
      </div>

      {/* Header - Top Bar Contract */}
      <header className="bg-[#0F294A] text-white border-b border-slate-700/80 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <Link to="/" className="flex items-center gap-3 shrink-0 whitespace-nowrap">
            <NivaranBrand compact />
          </Link>

          {/* Zone 2: 4-5 clean single-line text nav links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              About Nivaran
            </a>
            <a href="#solution" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Proposed Solution
            </a>
            <a href="#workflow" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              6-Stage Scrutiny
            </a>
            <a href="#agents" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              AI Agents
            </a>
            <a href="#governance" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Security & RBAC
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors whitespace-nowrap shrink-0 hidden sm:inline-block"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Authorized sign in</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0F294A] to-[#0A1D36] text-white py-16 sm:py-24 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Concept */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-500/10 border border-blue-400/20 text-blue-200 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Integrated approval workflow and compliance operations</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
                Smarter Scrutiny. Transparent Workflows. Accountable Decisions.
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Nivaran brings application routing, handbook-grounded evidence review, EVC coordination, compliance monitoring and audit-ready decisions into one secure operating environment for authorised officers and institutions.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/login"
                  className="px-5 py-3 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-md flex items-center gap-2"
                >
                  <span>Access the platform</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#workflow"
                  className="px-5 py-3 text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600 rounded-lg transition-colors flex items-center gap-2"
                >
                  <span>View the workflow</span>
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>

              {/* Quick Persona Launch Buttons */}
              <div className="pt-4 border-t border-slate-700/60">
                <div className="text-xs text-slate-400 font-medium mb-2.5">
                  Role-based access for authorised users:
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => handleLaunchRole('user-regional', '/regional/dashboard')}
                    className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-medium transition-colors"
                  >
                    Regional Intake
                  </button>
                  <button
                    onClick={() => handleLaunchRole('user-reviewer', '/reviewer/dashboard')}
                    className="px-2.5 py-1.5 rounded bg-blue-900/60 hover:bg-blue-800/70 text-blue-200 border border-blue-500/40 font-medium transition-colors"
                  >
                    Scrutiny Reviewer
                  </button>
                  <button
                    onClick={() => handleLaunchRole('user-institution', '/institution/dashboard')}
                    className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-medium transition-colors"
                  >
                    Institution Rep
                  </button>
                  <button
                    onClick={() => handleLaunchRole('user-verifier', '/verifier/dashboard')}
                    className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-medium transition-colors"
                  >
                    Doc Verifier
                  </button>
                  <button
                    onClick={() => handleLaunchRole('user-decision', '/decision/dashboard')}
                    className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-medium transition-colors"
                  >
                    Decision Authority
                  </button>
                  <button
                    onClick={() => handleLaunchRole('user-auditor', '/auditor/dashboard')}
                    className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-medium transition-colors"
                  >
                    Auditor (Read-Only)
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Reusable Dashboard Preview Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xl p-5 text-slate-800 space-y-4">
                {/* Mini Preview Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono font-bold text-slate-900">
                      DOCKET: {appCase.id}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                    UNDER SCRUTINY
                  </span>
                </div>

                {/* Case Details */}
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {appCase.institutionName}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {appCase.programme} · Intake: {appCase.intakeProposed} Seats · AY 2026–27
                  </p>
                </div>

                {/* Simulated Statutory Gates */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2 text-xs">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Statutory Approval Gates
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Land Norms (7.5 Ac)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Building NOC (4,250 sq.m)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-amber-700 font-medium">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Computer-lab evidence (Human Review)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Affiliation (SPPU Endorsed)</span>
                    </div>
                  </div>
                </div>


                  {/* Launch CTA */}
                <button
                  onClick={() => handleLaunchRole('user-reviewer', '/reviewer/dashboard')}
                  className="w-full py-2.5 bg-[#0F294A] hover:bg-[#0A1D36] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span>Open the active application workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Problems Addressed */}
      <section id="about" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              01. The Problem Space
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-2">
              Overcoming Regulatory Scrutiny Bottlenecks in Higher Education
            </h2>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              Academic regulatory scrutiny across thousands of technical institutions involves massive multi-hundred-page documentation, strict land and infrastructure norms, and high-stakes administrative deadlines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-slate-200 bg-[#F8FAFC]">
              <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="font-semibold text-slate-900 text-base mb-2">
                Manual Evidence Verification Fatigue
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Reviewers manually inspect hundreds of property deeds, municipal occupancy blueprints, and vendor invoices, leading to inadvertent human oversight and prolonged scrutiny turnaround times.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-[#F8FAFC]">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="font-semibold text-slate-900 text-base mb-2">
                Subjective Rule Interpretation
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Ambiguity in Approval Process Handbook (APH) clauses often leads to inconsistent standards between regional panels and avoidable appeals before Standing Hearing Committees.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-[#F8FAFC]">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="font-semibold text-slate-900 text-base mb-2">
                Lack of Tamper-Evident Auditability
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Without a unified state machine and cryptographic event logs, reconstructing which officer verified which document and on what exact legal basis becomes a difficult vigilance challenge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Nivaran solution and architecture */}
      <section id="solution" className="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              02. Proposed System Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-2">
              Role-Isolated Scrutiny with Grounded Agentic AI
            </h2>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              Nivaran combines a deterministic 12-state regulatory workflow engine with role-specialized AI assistants, OCR document extraction, and APH handbook-grounded guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">
                Role-Isolated Workspaces
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                9 distinct administrative dashboards. An applicant sees only their own case; reviewers cannot sign documents; auditors have zero write privileges.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">
                Automated OCR & Cross-Checking
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Simulated optical extraction pulls exact acreage, carpet areas, NOC validity dates, and invoice quantities, highlighting mismatches instantly.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">
                APH Agentic RAG (Copilot)
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Cites exact Chapter, Clause, and Page references from the AICTE Approval Process Handbook (2026–27) with transparent retrieval traces.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">
                Human-in-the-Loop Governance
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                AI agents generate findings and propose drafts, but only designated statutory officers can approve, reject, or issue legal orders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Six-Stage Scrutiny Journey */}
      <section id="workflow" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              03. The Scrutiny Lifecycle
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-2">
              Six-Stage Application Scrutiny Journey
            </h2>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              Every application traverses an explicit, gated state machine where each transition requires verified evidence and authorized human sign-off.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-2">
              <div className="text-xs font-mono font-bold text-blue-700">STAGE 01</div>
              <h3 className="font-semibold text-slate-900 text-sm">Application Intake & Completeness</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Regional Officer validates jurisdiction boundaries, Bharatkosh fee clearance, and assigns a qualified panel reviewer.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-2">
              <div className="text-xs font-mono font-bold text-blue-700">STAGE 02</div>
              <h3 className="font-semibold text-slate-900 text-sm">Technical Scrutiny & Rule Evaluation</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Scrutiny Reviewer inspects land ownership, instructional built-up area, faculty cadre ratio, and computing infrastructure.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-2">
              <div className="text-xs font-mono font-bold text-blue-700">STAGE 03</div>
              <h3 className="font-semibold text-slate-900 text-sm">Clarification & Deficiency Remediation</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Reviewer drafts evidence-grounded queries. Institution Representative uploads supplementary proof within statutory deadlines.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-2">
              <div className="text-xs font-mono font-bold text-blue-700">STAGE 04</div>
              <h3 className="font-semibold text-slate-900 text-sm">Document & Legal Evidence Verification</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Independent Document Verifier confirms authenticity of registered title deeds, PMRDA occupancy drawings, and vendor GST invoices.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-2">
              <div className="text-xs font-mono font-bold text-blue-700">STAGE 05</div>
              <h3 className="font-semibold text-slate-900 text-sm">Conditional Expert Visit Committee (EVC)</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Physical site visits are triggered only when specific discrepancy criteria or surprise vigilance cohorts are selected.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-2">
              <div className="text-xs font-mono font-bold text-blue-700">STAGE 06</div>
              <h3 className="font-semibold text-slate-900 text-sm">Apex Committee Decision & Resolution</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Standing Hearing Committee verifies all statutory prerequisite gates before recording an approval resolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Nine Specialized Agents */}
      <section id="agents" className="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              04. Specialized Agent Ecosystem
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-2">
              Nine Role-Specific AI Scrutiny Agents
            </h2>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              Rather than a single monolithic chatbot, Nivaran provides dedicated assistants tailored to the exact regulatory duties of each administrative actor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Regional Intake Agent', role: 'Regional Officer', desc: 'Validates application completeness, fee receipts, and recommends subject reviewers.' },
              { title: 'Scrutiny Review Agent', role: 'Scrutiny Reviewer', desc: 'Evaluates declared infrastructure against APH handbook norms and drafts clarification notices.' },
              { title: 'Institution Assistance Agent', role: 'Institution Rep', desc: 'Assists colleges with format compliance, deadline alerts, and remediation checklists.' },
              { title: 'Document Verification Agent', role: 'Document Verifier', desc: 'Performs OCR extraction, compares legal title deeds, and flags field discrepancies.' },
              { title: 'EVC Coordination Agent', role: 'EVC Coordinator', desc: 'Assesses site inspection criteria, expert rosters, and drafts inspection schedules.' },
              { title: 'Decision Support Agent', role: 'Decision Authority', desc: 'Compiles executive briefs, verifies gate compliance, and drafts formal approval orders.' },
              { title: 'Workflow Governance Agent', role: 'Workflow Admin', desc: 'Audits state machine transitions, detects graph deadlocks, and tests draft revisions.' },
              { title: 'Audit Assistance Agent', role: 'Independent Auditor', desc: 'Calculates chronological hash continuity and compiles tamper-evident audit packages.' },
              { title: 'System Operations Agent', role: 'System Admin', desc: 'Monitors mock integrations (DigiLocker, IGR), background tasks, and diagnostic logs.' },
            ].map((agent, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                    {agent.role}
                  </span>
                  <Bot className="w-4 h-4 text-blue-700" />
                </div>
                <h4 className="font-semibold text-slate-900 text-sm">{agent.title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Security, RBAC & Governance */}
      <section id="governance" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                05. Regulatory Governance
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Rigorous Simulated RBAC & Tamper-Evident Auditability
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Nivaran enforces role-based access control. Route guards, dynamic sidebar navigation, and action handlers evaluate role scopes at every step.
              </p>
              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Cross-Contamination:</strong> Applicant cannot see internal notes or other institutions' records.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Read-Only Auditor:</strong> Independent Auditor has strictly read-only scope; all mutation attempts are blocked.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Cryptographic Hash Chain:</strong> Every event updates a simulated SHA-256 block ledger with verifiable pointers.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-4 font-mono text-xs">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">
                  Simulated Event Ledger Sample
                </div>
                <div className="space-y-2.5">
                  {appCase.auditLog.slice(-3).map((event) => (
                    <div key={event.id} className="p-3 rounded bg-white border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-800">{event.action}</span>
                        <span>{new Date(event.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] font-sans">{event.summary}</p>
                      <div className="text-[10px] text-slate-400 truncate">
                        Hash: {event.hashSignature}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Platform access CTA */}
      <section className="py-20 bg-[#0F294A] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
            Operate approval processing from one connected platform
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Follow an application from intake and scrutiny through evidence verification, compliance action, committee review and audit closure.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="w-full sm:w-auto px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <span>Open secure sign in</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="bg-[#0A1D36] text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-white font-bold text-sm flex items-center gap-2 justify-center sm:justify-start">
              <span>Nivaran Approval Workflow Platform</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Nivaran is an AI-assisted workflow platform. Automated recommendations support, but do not replace, statutory scrutiny or decisions of competent authorities.
            </p>
          </div>
          <div className="text-[11px] text-slate-500 text-center sm:text-right">
            Nivaran Approval Workflow Platform · Secure role-based operations
          </div>
        </div>
      </footer>
    </div>
  );
};
