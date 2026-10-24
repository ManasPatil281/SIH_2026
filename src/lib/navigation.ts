import { UserRole } from '../types';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  iconName: string;
  badge?: string;
  description?: string;
}

export const ROLE_NAVIGATION: Record<UserRole, NavItem[]> = {
  regional_officer: [
    { id: 'dashboard', label: 'Intake & Cases', path: '/regional/dashboard', iconName: 'LayoutDashboard', badge: 'Active' },
    { id: 'assignment', label: 'Reviewer Assignment', path: '/regional/assignment', iconName: 'UserCheck' },
    { id: 'audit', label: 'Regional Audit Trail', path: '/regional/audit', iconName: 'History' },
    { id: 'operations', label: 'Pendency & Alerts', path: '/regional/operations', iconName: 'Bell' },
  ],
  scrutiny_reviewer: [
    { id: 'dashboard', label: 'Scrutiny Checklist', path: '/reviewer/dashboard', iconName: 'ListChecks', badge: '1 Blocker' },
    { id: 'clarifications', label: 'Clarification Requests', path: '/reviewer/clarifications', iconName: 'HelpCircle' },
    { id: 'copilot', label: 'Nivaran Copilot', path: '/reviewer/copilot', iconName: 'Sparkles', badge: 'RAG' },
    { id: 'agent-demo', label: 'Scrutiny Agent Automation', path: '/reviewer/agent-demo', iconName: 'Bot' },
  ],
  institution_rep: [
    { id: 'dashboard', label: 'Application Status', path: '/institution/dashboard', iconName: 'Activity', badge: 'Track' },
    { id: 'documents', label: 'Evidence Documents', path: '/institution/documents', iconName: 'Files' },
    { id: 'clarifications', label: 'Clarifications & Response', path: '/institution/clarifications', iconName: 'MessageSquareWarning' },
    { id: 'compliance', label: 'Compliance & Undertakings', path: '/institution/compliance', iconName: 'ClipboardCheck' },
  ],
  document_verifier: [
    { id: 'dashboard', label: 'Verification Queue', path: '/verifier/dashboard', iconName: 'Inbox', badge: 'Queue' },
    { id: 'comparison', label: 'OCR & Evidence Match', path: '/verifier/comparison', iconName: 'SplitSquareVertical' },
    { id: 'audit', label: 'Verification Audit', path: '/verifier/audit', iconName: 'History' },
    { id: 'validity', label: 'Document Validity', path: '/verifier/validity', iconName: 'CalendarClock' },
  ],
  evc_coordinator: [
    { id: 'dashboard', label: 'Schedule & Readiness', path: '/evc/dashboard', iconName: 'Calendar' },
    { id: 'report', label: 'Inspection Report & Sign-off', path: '/evc/report', iconName: 'Stamp' },
  ],
  decision_authority: [
    { id: 'dashboard', label: 'Docket & Gate Checks', path: '/decision/dashboard', iconName: 'ShieldCheck', badge: 'Apex' },
    { id: 'approval-inbox', label: 'Record Decision', path: '/decision/approval-inbox', iconName: 'CheckCircle2' },
    { id: 'history', label: 'Decision History', path: '/decision/history', iconName: 'Archive' },
  ],
  workflow_admin: [
    { id: 'dashboard', label: 'State Transitions & Rules', path: '/workflow-admin/dashboard', iconName: 'Workflow' },
    { id: 'versions', label: 'Workflow Versions & Validation', path: '/workflow-admin/versions', iconName: 'Layers' },
    { id: 'routes', label: 'Processing Routes', path: '/workflow-admin/routes', iconName: 'GitBranch' },
  ],
  auditor: [
    { id: 'dashboard', label: 'Audit Ledger (Read-Only)', path: '/auditor/dashboard', iconName: 'FileSearch' },
    { id: 'integrity', label: 'Hash Verification', path: '/auditor/integrity', iconName: 'KeyRound' },
    { id: 'export', label: 'Export Audit Package', path: '/auditor/export', iconName: 'DownloadCloud' },
    { id: 'reports', label: 'Operations Reports', path: '/auditor/reports', iconName: 'BarChart3' },
  ],
  system_admin: [
    { id: 'dashboard', label: 'RBAC Permission Matrix', path: '/system-admin/dashboard', iconName: 'TableProperties' },
    { id: 'integrations', label: 'Mock Integrations & Outbox', path: '/system-admin/integrations', iconName: 'Cable' },
    { id: 'reset', label: 'Health & Demo Reset', path: '/system-admin/reset', iconName: 'RotateCcw' },
  ],
};
