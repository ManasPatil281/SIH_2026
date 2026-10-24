import { DemoUser, Permission, UserRole } from '../types';

export function hasPermission(user: DemoUser | null, permission: Permission): boolean {
  if (!user) return false;
  return user.permissions.includes(permission);
}

export function canAccessRoute(user: DemoUser | null, routePath: string): boolean {
  if (!user) return false;

  // Role namespace check
  if (routePath.startsWith('/regional') && user.role !== 'regional_officer') return false;
  if (routePath.startsWith('/reviewer') && user.role !== 'scrutiny_reviewer') return false;
  if (routePath.startsWith('/institution') && user.role !== 'institution_rep') return false;
  if (routePath.startsWith('/verifier') && user.role !== 'document_verifier') return false;
  if (routePath.startsWith('/evc') && user.role !== 'evc_coordinator') return false;
  if (routePath.startsWith('/decision') && user.role !== 'decision_authority') return false;
  if (routePath.startsWith('/workflow-admin') && user.role !== 'workflow_admin') return false;
  if (routePath.startsWith('/auditor') && user.role !== 'auditor') return false;
  if (routePath.startsWith('/system-admin') && user.role !== 'system_admin') return false;

  return true;
}

export function canPerformAction(
  user: DemoUser | null,
  action:
    | 'assign_reviewer'
    | 'evaluate_checklist'
    | 'create_clarification'
    | 'submit_clarification_response'
    | 'verify_document'
    | 'schedule_evc'
    | 'submit_evc_report'
    | 'record_decision'
    | 'publish_workflow'
    | 'reset_demo'
): { allowed: boolean; reason?: string } {
  if (!user) {
    return { allowed: false, reason: 'Authentication required. No active demo session found.' };
  }

  // Strictly enforce auditor read-only rule
  if (user.role === 'auditor') {
    return {
      allowed: false,
      reason: 'Independent Auditor role is strictly read-only. State mutation actions are forbidden by governance policy.',
    };
  }

  switch (action) {
    case 'assign_reviewer':
      if (user.role !== 'regional_officer') {
        return { allowed: false, reason: 'Only Regional Officers can assign scrutiny reviewers.' };
      }
      return { allowed: true };

    case 'evaluate_checklist':
    case 'create_clarification':
      if (user.role !== 'scrutiny_reviewer') {
        return { allowed: false, reason: 'Only the assigned Scrutiny Reviewer can evaluate checklist rules and issue clarifications.' };
      }
      return { allowed: true };

    case 'submit_clarification_response':
      if (user.role !== 'institution_rep') {
        return { allowed: false, reason: 'Only the authorized Institution Representative can respond to clarifications.' };
      }
      return { allowed: true };

    case 'verify_document':
      if (user.role !== 'document_verifier') {
        return { allowed: false, reason: 'Only Document Verifiers have statutory authority to sign off on legal/infrastructure documents.' };
      }
      return { allowed: true };

    case 'schedule_evc':
    case 'submit_evc_report':
      if (user.role !== 'evc_coordinator') {
        return { allowed: false, reason: 'Only the EVC Coordinator can schedule site visits and sign off on inspection reports.' };
      }
      return { allowed: true };

    case 'record_decision':
      if (user.role !== 'decision_authority') {
        return { allowed: false, reason: 'Only the Apex Decision Authority / Committee can record formal regulatory decisions.' };
      }
      return { allowed: true };

    case 'publish_workflow':
      if (user.role !== 'workflow_admin') {
        return { allowed: false, reason: 'Only Workflow Administrators can publish regulatory state machine revisions.' };
      }
      return { allowed: true };

    case 'reset_demo':
      if (user.role !== 'system_admin') {
        return { allowed: false, reason: 'Only System Administrators can execute a system-wide demo data reset.' };
      }
      return { allowed: true };

    default:
      return { allowed: true };
  }
}
