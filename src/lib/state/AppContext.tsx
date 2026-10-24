import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AgentExecutionTrace,
  ApplicationCase,
  ApplicationStatus,
  AuditEvent,
  DemoUser,
  DocumentItem,
  NotificationItem,
  WorkflowRevision,
  ProcessingRoute,
} from '../../types';
import { executeAgentSimulation } from '../agents/simulationEngine';
import { DEMO_USERS, getDemoUserById } from '../demo-users';
import { canPerformAction } from '../permissions';
import {
  INITIAL_APPLICATION,
  INITIAL_NOTIFICATIONS,
  INITIAL_WORKFLOW_REVISIONS,
} from '../../data/seedData';

interface AppContextType {
  currentUser: DemoUser | null;
  loginAs: (userId: string) => void;
  logout: () => void;
  appCase: ApplicationCase;
  notifications: NotificationItem[];
  workflowRevisions: WorkflowRevision[];
  guidedStep: number;
  setGuidedStep: (step: number) => void;
  lastAgentTrace: AgentExecutionTrace | null;
  runAgent: (agentId: string) => AgentExecutionTrace;
  assignReviewer: (reviewerId: string, reviewerName: string) => { success: boolean; message: string };
  runOCR: (docId: string) => void;
  verifyDocument: (
    docId: string,
    outcome: 'VERIFIED' | 'REJECTED' | 'REQUIRES_REVERIFICATION',
    notes: string
  ) => { success: boolean; message: string };
  uploadSupplementaryDocument: (
    title: string,
    fileName: string,
    fileSize: string,
    category: 'Land & Building' | 'Statutory Approvals' | 'Academic Infrastructure' | 'Financial & Society'
  ) => void;
  evaluateChecklistItem: (
    itemId: string,
    status: 'SATISFIED' | 'DEFICIENT' | 'EXEMPTED',
    notes: string
  ) => { success: boolean; message: string };
  createClarificationRequest: (
    title: string,
    category: string,
    question: string,
    deadlineDays: number
  ) => { success: boolean; message: string };
  submitClarificationResponse: (
    clarificationId: string,
    responseText: string,
    attachedDocTitle?: string
  ) => { success: boolean; message: string };
  resolveClarification: (clarificationId: string, feedback: string) => { success: boolean; message: string };
  toggleEVCRequired: (required: boolean, reason: string) => void;
  scheduleEVC: (
    scheduledDate: string,
    teamMembers: string[],
    mode: 'Physical' | 'Hybrid / Digital'
  ) => { success: boolean; message: string };
  submitEVCReport: (
    recommendation: 'RECOMMENDED_APPROVAL' | 'CONDITIONAL_APPROVAL' | 'NOT_RECOMMENDED',
    observations: string[]
  ) => { success: boolean; message: string };
  recordDecision: (
    verdict: 'APPROVED' | 'REJECTED' | 'REFERRED_TO_SHC',
    resolutionNumber: string,
    rationale: string,
    conditions?: string[]
  ) => { success: boolean; message: string };
  proposeWorkflowRevision: (version: string, summary: string, rulesCount: number) => { success: boolean; message: string };
  publishWorkflowRevision: (version: string) => { success: boolean; message: string };
  resetDemoState: () => void;
  markNotificationRead: (id: string) => void;
  setProcessingRoute: (route: ProcessingRoute) => { success: boolean; message: string };
  submitCompliance: (recordId: string, evidenceDocumentId?: string) => { success: boolean; message: string };
  verifyCompliance: (recordId: string) => { success: boolean; message: string };
  submitUndertaking: (undertakingId: string, evidenceDocumentId?: string) => { success: boolean; message: string };
  acknowledgeEscalation: (escalationId: string) => { success: boolean; message: string };
  renewDocument: (documentId: string, expiresAt: string) => { success: boolean; message: string };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'aadhar_portal_user_id';
const CASE_STORAGE_KEY = 'aadhar_portal_case_v3_bsiet';
const NOTIF_STORAGE_KEY = 'aadhar_portal_notifs_v2_bsiet';
const WORKFLOW_STORAGE_KEY = 'aadhar_portal_workflows_v2_bsiet';
const STEP_STORAGE_KEY = 'aadhar_portal_step_v2_bsiet';

function simpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(16, '0') + 'd92a4f61';
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<DemoUser | null>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        return getDemoUserById(stored) || DEMO_USERS[0];
      }
    } catch (e) {
      console.warn('Storage read failed', e);
    }
    return DEMO_USERS[0]; // Default to Regional Officer
  });

  const [appCase, setAppCase] = useState<ApplicationCase>(() => {
    try {
      const stored = localStorage.getItem(CASE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const restoredCase: ApplicationCase = {
          ...INITIAL_APPLICATION,
          ...parsed,
          deadlines: parsed.deadlines || INITIAL_APPLICATION.deadlines,
          undertakings: parsed.undertakings || INITIAL_APPLICATION.undertakings,
          complianceRecords: parsed.complianceRecords || INITIAL_APPLICATION.complianceRecords,
          escalations: parsed.escalations || INITIAL_APPLICATION.escalations,
          processingRoute: parsed.processingRoute || INITIAL_APPLICATION.processingRoute,
        };
        const allClarificationsResolved = restoredCase.clarifications.length > 0 &&
          restoredCase.clarifications.every((clarification) => clarification.status === 'RESOLVED');
        const allDocumentsVerified = restoredCase.documents.length > 0 &&
          restoredCase.documents.every((document) => document.status === 'VERIFIED');
        return {
          ...restoredCase,
          decisionDetails: {
            ...restoredCase.decisionDetails,
            gatesPassed: {
              ...restoredCase.decisionDetails.gatesPassed,
              clarificationsResolved: allClarificationsResolved,
              documentVerification: allDocumentsVerified,
            },
          },
        };
      }
    } catch (e) {
      console.warn('Failed to parse stored case', e);
    }
    return INITIAL_APPLICATION;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const stored = localStorage.getItem(NOTIF_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse notifications', e);
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [workflowRevisions, setWorkflowRevisions] = useState<WorkflowRevision[]>(() => {
    try {
      const stored = localStorage.getItem(WORKFLOW_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse workflows', e);
    }
    return INITIAL_WORKFLOW_REVISIONS;
  });

  const [guidedStep, setGuidedStepState] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(STEP_STORAGE_KEY);
      if (stored) return parseInt(stored, 10);
    } catch (e) {
      // ignore
    }
    return 1;
  });

  const [lastAgentTrace, setLastAgentTrace] = useState<AgentExecutionTrace | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(USER_STORAGE_KEY, currentUser.id);
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Sync failed', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(CASE_STORAGE_KEY, JSON.stringify(appCase));
    } catch (e) {
      console.warn('Case sync failed', e);
    }
  }, [appCase]);

  useEffect(() => {
    try {
      localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(notifications));
    } catch (e) {
      console.warn('Notif sync failed', e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem(WORKFLOW_STORAGE_KEY, JSON.stringify(workflowRevisions));
    } catch (e) {
      console.warn('Workflow sync failed', e);
    }
  }, [workflowRevisions]);

  const setGuidedStep = (step: number) => {
    setGuidedStepState(step);
    try {
      localStorage.setItem(STEP_STORAGE_KEY, step.toString());
    } catch (e) {
      // ignore
    }
  };

  const loginAs = (userId: string) => {
    const user = getDemoUserById(userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Helper to record audit event
  const createAuditEvent = (
    action: string,
    summary: string,
    details?: Record<string, any>,
    prevStatus?: ApplicationStatus,
    newStatus?: ApplicationStatus
  ): AuditEvent => {
    const lastHash = appCase.auditLog[appCase.auditLog.length - 1]?.hashSignature || '0000000000000000';
    const timestamp = new Date().toISOString();
    const hashSignature = simpleHash(`${lastHash}:${timestamp}:${action}:${currentUser?.id || 'anon'}`);

    return {
      id: `aud-${Date.now()}`,
      timestamp,
      actorName: currentUser?.name || 'Authorized System User',
      actorRole: currentUser?.role || 'system_admin',
      action,
      summary,
      details,
      previousStatus: prevStatus,
      newStatus: newStatus || appCase.status,
      hashSignature,
      simulatedTamperProof: true,
    };
  };

  const notify = (recipientRole: any, title: string, message: string, priority: 'HIGH' | 'NORMAL' | 'URGENT' = 'NORMAL', linkRoute?: string) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      recipientRole,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      priority,
      linkRoute,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const runAgent = (agentId: string): AgentExecutionTrace => {
    if (!currentUser) throw new Error('User not authenticated');
    const trace = executeAgentSimulation(agentId, appCase, currentUser);
    setLastAgentTrace(trace);
    return trace;
  };

  const assignReviewer = (reviewerId: string, reviewerName: string) => {
    const check = canPerformAction(currentUser, 'assign_reviewer');
    if (!check.allowed) return { success: false, message: check.reason || 'Action denied.' };

    const prev = appCase.status;
    const next: ApplicationStatus = 'UNDER_SCRUTINY';
    const audit = createAuditEvent(
      'REVIEWER_ASSIGNED',
      `Assigned scrutiny reviewer ${reviewerName} to case ${appCase.id}.`,
      { reviewerId, reviewerName },
      prev,
      next
    );

    setAppCase((c) => ({
      ...c,
      assignedReviewer: reviewerName,
      assignedReviewerId: reviewerId,
      status: next,
      lastUpdated: new Date().toISOString(),
      auditLog: [...c.auditLog, audit],
    }));

    notify('scrutiny_reviewer', 'New Case Dossier Assigned', `You have been designated as Scrutiny Reviewer for ${appCase.institutionName} (${appCase.programme}).`, 'HIGH', '/reviewer/cases');
    setGuidedStep(2);
    return { success: true, message: `Case successfully assigned to ${reviewerName}. State advanced to UNDER_SCRUTINY.` };
  };

  const runOCR = (docId: string) => {
    setAppCase((c) => {
      const docs = c.documents.map((d) => {
        if (d.id === docId) {
          return {
            ...d,
            status: 'OCR_COMPLETED' as const,
          };
        }
        return d;
      });
      return { ...c, documents: docs, lastUpdated: new Date().toISOString() };
    });
  };

  const verifyDocument = (
    docId: string,
    outcome: 'VERIFIED' | 'REJECTED' | 'REQUIRES_REVERIFICATION',
    notes: string
  ) => {
    const check = canPerformAction(currentUser, 'verify_document');
    if (!check.allowed) return { success: false, message: check.reason || 'Action denied.' };

    const targetDoc = appCase.documents.find((d) => d.id === docId);
    const audit = createAuditEvent(
      'DOCUMENT_VERIFICATION_DECISION',
      `Document "${targetDoc?.title || docId}" marked as ${outcome} by ${currentUser?.name}. Notes: ${notes}`,
      { docId, outcome, notes }
    );

    setAppCase((c) => {
      const updatedDocs = c.documents.map((d) => {
        if (d.id === docId) {
          // If verified, adjust any mismatch fields to true for demonstration
          const updatedFields = d.ocrExtractedFields.map((f) => {
            if (outcome === 'VERIFIED') {
              return { ...f, match: true, notes: 'Verified compliant with supplementary proof.' };
            }
            return f;
          });

          return {
            ...d,
            status: outcome,
            verifiedBy: currentUser?.name,
            verifiedAt: new Date().toISOString(),
            verificationNotes: notes,
            ocrExtractedFields: updatedFields,
          };
        }
        return d;
      });

      // Update gate passed status if all verified
      const allVerified = updatedDocs.every((d) => d.status === 'VERIFIED');
      const updatedDecision = {
        ...c.decisionDetails,
        gatesPassed: {
          ...c.decisionDetails.gatesPassed,
          documentVerification: allVerified,
        },
      };

      return {
        ...c,
        documents: updatedDocs,
        decisionDetails: updatedDecision,
        lastUpdated: new Date().toISOString(),
        auditLog: [...c.auditLog, audit],
      };
    });

    notify('scrutiny_reviewer', 'Document Verification Completed', `Document "${targetDoc?.title}" has been signed off as ${outcome}.`, 'NORMAL', '/reviewer/checklist');
    return { success: true, message: `Document statutory verification recorded as ${outcome}.` };
  };

  const uploadSupplementaryDocument = (
    title: string,
    fileName: string,
    fileSize: string,
    category: 'Land & Building' | 'Statutory Approvals' | 'Academic Infrastructure' | 'Financial & Society'
  ) => {
    const newDocId = `doc-suppl-${Date.now()}`;
    const newDoc: DocumentItem = {
      id: newDocId,
      title,
      documentType: 'Supplementary Verification Evidence',
      fileName,
      fileSize,
      uploadedAt: new Date().toISOString(),
      uploadedBy: currentUser?.name || 'Prof. Sunita Patil',
      status: 'REQUIRES_REVERIFICATION',
      verificationNotes: 'Synthetic evidence submitted by the institution. Document Verifier must compare inventory, installation, and availability evidence before sign-off.',
      category,
      ocrExtractedFields: [
        { label: 'Computer inventory evidence', extractedValue: 'Updated inventory submitted for review', declaredValue: 'Inventory and installation evidence', confidence: 0.86, match: false },
        { label: 'Supplier GSTIN', extractedValue: '27AAACT9910F1Z4 (Active)', declaredValue: 'Verified', confidence: 0.99, match: true },
        { label: 'Department laboratory total', extractedValue: 'Requires human reconciliation', declaredValue: 'Applicable Annexure 4, Section 4.1 requirement', confidence: 0.82, match: false },
      ],
      rawOcrText: `SYNTHETIC SUPPORTING RECORD: Submitted for Dr. Bapuji Salunkhe Institute of Engineering and Technology. Updated computer inventory, installation, and availability evidence require human verification.`,
    };

    const audit = createAuditEvent(
      'DOCUMENT_UPLOADED',
      `Institution representative uploaded supplementary document "${title}" (${fileName}).`,
      { docId: newDocId, title, fileName }
    );

    setAppCase((c) => ({
      ...c,
      documents: c.documents.some((document) => document.id === 'doc-004')
        ? c.documents.map((document) => (document.id === 'doc-004' ? { ...newDoc, id: 'doc-004' } : document))
        : [...c.documents, newDoc],
      lastUpdated: new Date().toISOString(),
      auditLog: [...c.auditLog, audit],
    }));

    notify('document_verifier', 'Supplementary Evidence Submitted', `New document "${title}" uploaded by institution. Verification queue updated.`, 'HIGH', '/verifier/queue');
  };

  const evaluateChecklistItem = (
    itemId: string,
    status: 'SATISFIED' | 'DEFICIENT' | 'EXEMPTED',
    notes: string
  ) => {
    const check = canPerformAction(currentUser, 'evaluate_checklist');
    if (!check.allowed) return { success: false, message: check.reason || 'Action denied.' };

    const targetItem = appCase.checklist.find((i) => i.id === itemId);
    const audit = createAuditEvent(
      'CHECKLIST_EVALUATED',
      `Checklist item "${targetItem?.requirement?.slice(0, 40)}..." evaluated as ${status} by ${currentUser?.name}.`,
      { itemId, status, notes }
    );

    setAppCase((c) => {
      const updatedList = c.checklist.map((i) => {
        if (i.id === itemId) {
          return {
            ...i,
            status,
            reviewerNotes: notes,
            evaluatedAt: new Date().toISOString(),
            evaluatedBy: currentUser?.name,
          };
        }
        return i;
      });

      const allSatisfied = updatedList.every((i) => i.status === 'SATISFIED' || i.status === 'EXEMPTED');
      const updatedDecision = {
        ...c.decisionDetails,
        gatesPassed: {
          ...c.decisionDetails.gatesPassed,
          scrutinyChecklist: allSatisfied,
        },
      };

      return {
        ...c,
        checklist: updatedList,
        decisionDetails: updatedDecision,
        lastUpdated: new Date().toISOString(),
        auditLog: [...c.auditLog, audit],
      };
    });

    return { success: true, message: `Checklist requirement updated to ${status}.` };
  };

  const createClarificationRequest = (
    title: string,
    category: string,
    question: string,
    deadlineDays: number
  ) => {
    const check = canPerformAction(currentUser, 'create_clarification');
    if (!check.allowed) return { success: false, message: check.reason || 'Action denied.' };

    const newId = `clr-${Date.now()}`;
    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + deadlineDays);

    const newItem = {
      id: newId,
      queryNumber: `CLR/2026/0${appCase.clarifications.length + 1}`,
      title,
      category,
      question,
      requestedBy: `${currentUser?.name} (Scrutiny Reviewer)`,
      requestedAt: new Date().toISOString(),
      deadline: deadlineDate.toISOString(),
      status: 'PENDING_INSTITUTION' as const,
    };

    const prev = appCase.status;
    const next: ApplicationStatus = 'CLARIFICATION_REQUIRED';
    const audit = createAuditEvent(
      'CLARIFICATION_ISSUED',
      `Issued formal clarification query "${title}" with deadline ${deadlineDays} days.`,
      { clarificationId: newId, title, deadlineDays },
      prev,
      next
    );

    setAppCase((c) => ({
      ...c,
      status: next,
      clarifications: [...c.clarifications, newItem],
      lastUpdated: new Date().toISOString(),
      decisionDetails: {
        ...c.decisionDetails,
        gatesPassed: {
          ...c.decisionDetails.gatesPassed,
          clarificationsResolved: false,
        },
      },
      auditLog: [...c.auditLog, audit],
    }));

    notify('institution_rep', 'Formal Clarification Notice Issued', `Regulatory scrutiny reviewer has requested clarification regarding "${title}". Action required.`, 'URGENT', '/institution/clarifications');
    setGuidedStep(4);
    return { success: true, message: `Clarification request dispatched to institution. Application state set to CLARIFICATION_REQUIRED.` };
  };

  const submitClarificationResponse = (
    clarificationId: string,
    responseText: string,
    attachedDocTitle?: string
  ) => {
    const check = canPerformAction(currentUser, 'submit_clarification_response');
    if (!check.allowed) return { success: false, message: check.reason || 'Action denied.' };

    const prev = appCase.status;
    const next: ApplicationStatus = 'CLARIFICATION_SUBMITTED';
    const audit = createAuditEvent(
      'CLARIFICATION_RESPONSE_SUBMITTED',
      `Institution representative submitted response to clarification ${clarificationId}. Attached: ${attachedDocTitle || 'Supplementary Invoice'}`,
      { clarificationId, responseText, attachedDocTitle },
      prev,
      next
    );

    // Also automatically create/update the supplementary document doc-004 so Document Verifier can verify
    uploadSupplementaryDocument(
      'Updated Computer Inventory & Installation Evidence (synthetic)',
      'BSIET_CSE_AIML_Updated_Inventory_Synthetic.pdf',
      '3.4 MB',
      'Academic Infrastructure'
    );

    setAppCase((c) => {
      const updatedClrs = c.clarifications.map((cl) => {
        if (cl.id === clarificationId) {
          return {
            ...cl,
            status: 'RESPONSE_SUBMITTED' as const,
            response: {
              submittedAt: new Date().toISOString(),
              submittedBy: currentUser?.name || 'Prof. Sunita Patil',
              responseText,
              supportingDocumentTitle: attachedDocTitle || 'Supplementary Invoice BSIET-COMP-INV-16',
            },
          };
        }
        return cl;
      });

      return {
        ...c,
        status: next,
        clarifications: updatedClrs,
        lastUpdated: new Date().toISOString(),
        auditLog: [...c.auditLog, audit],
      };
    });

    notify('document_verifier', 'Clarification Evidence Ready for Verification', `Institution has provided response & supplementary proof for ${clarificationId}.`, 'HIGH', '/verifier/queue');
    notify('scrutiny_reviewer', 'Clarification Response Received', `Institution has submitted formal response to ${clarificationId}. Evidence forwarded for verification.`, 'NORMAL', '/reviewer/clarifications');
    setGuidedStep(5);
    return { success: true, message: `Response and supplementary document submitted. Awaiting document verifier sign-off.` };
  };

  const resolveClarification = (clarificationId: string, feedback: string) => {
    const check = canPerformAction(currentUser, 'create_clarification');
    if (!check.allowed) return { success: false, message: check.reason || 'Action denied.' };

    const evidenceDocument = appCase.documents.find((document) => document.id === 'doc-004');
    if (evidenceDocument?.status !== 'VERIFIED') {
      return {
        success: false,
        message: 'Resolve the clarification only after the Document Verifier signs off the computer-laboratory evidence.',
      };
    }

    const audit = createAuditEvent(
      'CLARIFICATION_RESOLVED',
      `Scrutiny Reviewer marked clarification ${clarificationId} as RESOLVED. Feedback: ${feedback}`,
      { clarificationId, feedback }
    );

    setAppCase((c) => {
      const updatedClrs = c.clarifications.map((cl) => {
        if (cl.id === clarificationId) {
          return {
            ...cl,
            status: 'RESOLVED' as const,
            reviewerFeedback: feedback,
          };
        }
        return cl;
      });

      // Update deficient checklist item chk-004 to SATISFIED as well
      const updatedChecklist = c.checklist.map((item) => {
        if (item.id === 'chk-004') {
          return {
            ...item,
            status: 'SATISFIED' as const,
            reviewerNotes: 'Synthetic evidence package compared. Updated inventory and installation/availability records remain subject to authorised human verification.',
            evaluatedAt: new Date().toISOString(),
            evaluatedBy: currentUser?.name,
          };
        }
        return item;
      });

      // Also mark finding fnd-001 as resolved
      const updatedFindings = c.findings.map((f) => {
        if (f.id === 'fnd-001') {
          return { ...f, resolved: true };
        }
        return f;
      });

      const allResolved = updatedClrs.length > 0 && updatedClrs.every((cl) => cl.status === 'RESOLVED');
      const allChecklistSatisfied = updatedChecklist.every((i) => i.status === 'SATISFIED' || i.status === 'EXEMPTED');

      return {
        ...c,
        status: allResolved && allChecklistSatisfied ? 'SCRUTINY_COMPLETED' : c.status,
        clarifications: updatedClrs,
        checklist: updatedChecklist,
        findings: updatedFindings,
        decisionDetails: {
          ...c.decisionDetails,
          gatesPassed: {
            ...c.decisionDetails.gatesPassed,
            clarificationsResolved: allResolved,
            scrutinyChecklist: allChecklistSatisfied,
            documentVerification: c.decisionDetails.gatesPassed.documentVerification,
          },
        },
        lastUpdated: new Date().toISOString(),
        auditLog: [...c.auditLog, audit],
      };
    });

    notify('decision_authority', 'Case Ready for Apex Decision Docket', `Scrutiny for case ${appCase.id} is complete. All gates cleared for Committee decision.`, 'HIGH', '/decision/queue');
    setGuidedStep(7);
    return { success: true, message: `Clarification resolved. Scrutiny checklist marked 100% SATISFIED. State advanced to SCRUTINY_COMPLETED.` };
  };

  const toggleEVCRequired = (required: boolean, reason: string) => {
    setAppCase((c) => ({
      ...c,
      evcDetails: {
        ...c.evcDetails,
        required,
        reason,
        status: required ? 'PENDING_SCHEDULE' : 'NOT_REQUIRED',
      },
      status: required ? 'EVC_PENDING' : c.status,
      lastUpdated: new Date().toISOString(),
    }));
  };

  const scheduleEVC = (
    scheduledDate: string,
    teamMembers: string[],
    mode: 'Physical' | 'Hybrid / Digital'
  ) => {
    const check = canPerformAction(currentUser, 'schedule_evc');
    if (!check.allowed) return { success: false, message: check.reason || 'Action denied.' };

    const audit = createAuditEvent(
      'EVC_INSPECTION_SCHEDULED',
      `Expert Visit Committee inspection scheduled for ${scheduledDate} (${mode}). Team: ${teamMembers.join(', ')}`,
      { scheduledDate, teamMembers, mode }
    );

    setAppCase((c) => ({
      ...c,
      evcDetails: {
        ...c.evcDetails,
        required: true,
        scheduledDate,
        teamMembers,
        inspectionMode: mode,
        status: 'SCHEDULED',
      },
      status: 'EVC_PENDING',
      lastUpdated: new Date().toISOString(),
      auditLog: [...c.auditLog, audit],
    }));

    notify('institution_rep', 'EVC Inspection Date Notified', `An Expert Visit Committee inspection has been scheduled on ${scheduledDate}.`, 'HIGH', '/institution/status');
    return { success: true, message: `EVC inspection successfully scheduled for ${scheduledDate}.` };
  };

  const submitEVCReport = (
    recommendation: 'RECOMMENDED_APPROVAL' | 'CONDITIONAL_APPROVAL' | 'NOT_RECOMMENDED',
    observations: string[]
  ) => {
    const check = canPerformAction(currentUser, 'submit_evc_report');
    if (!check.allowed) return { success: false, message: check.reason || 'Action denied.' };

    const audit = createAuditEvent(
      'EVC_REPORT_SUBMITTED',
      `EVC Report submitted with recommendation: ${recommendation}. Observations: ${observations.length} items logged.`,
      { recommendation, observations }
    );

    setAppCase((c) => ({
      ...c,
      evcDetails: {
        ...c.evcDetails,
        status: 'REPORT_SUBMITTED',
        recommendation,
        observations,
        reportSubmittedAt: new Date().toISOString(),
        reportSignOffBy: currentUser?.name,
      },
      status: 'EVC_COMPLETED',
      decisionDetails: {
        ...c.decisionDetails,
        gatesPassed: {
          ...c.decisionDetails.gatesPassed,
          evcCompleted: true,
        },
      },
      lastUpdated: new Date().toISOString(),
      auditLog: [...c.auditLog, audit],
    }));

    notify('decision_authority', 'EVC Inspection Report Submitted', `EVC report sign-off completed by ${currentUser?.name}. Case ready for committee docket.`, 'HIGH', '/decision/summary');
    setGuidedStep(8);
    return { success: true, message: `EVC inspection report submitted and endorsed. State advanced to EVC_COMPLETED.` };
  };

  const recordDecision = (
    verdict: 'APPROVED' | 'REJECTED' | 'REFERRED_TO_SHC',
    resolutionNumber: string,
    rationale: string,
    conditions: string[] = []
  ) => {
    const check = canPerformAction(currentUser, 'record_decision');
    if (!check.allowed) return { success: false, message: check.reason || 'Action denied.' };

    // Gate check
    const gates = {
      ...appCase.decisionDetails.gatesPassed,
      documentVerification:
        appCase.documents.length > 0 && appCase.documents.every((document) => document.status === 'VERIFIED'),
      scrutinyChecklist:
        appCase.checklist.length > 0 &&
        appCase.checklist.every((item) => item.status === 'SATISFIED' || item.status === 'EXEMPTED'),
      clarificationsResolved:
        appCase.clarifications.length > 0 &&
        appCase.clarifications.every((clarification) => clarification.status === 'RESOLVED'),
      evcCompleted:
        !appCase.evcDetails.required ||
        appCase.evcDetails.status === 'INSPECTION_COMPLETED' ||
        appCase.evcDetails.status === 'REPORT_SUBMITTED' ||
        appCase.evcDetails.status === 'NOT_REQUIRED',
    };
    if (verdict === 'APPROVED' && (!gates.documentVerification || !gates.scrutinyChecklist || !gates.clarificationsResolved)) {
      return {
        success: false,
        message: 'Gate check violation: Cannot approve while prerequisite gates (Documents Verified, Checklist Satisfied, Clarifications Resolved) remain unfulfilled.',
      };
    }

    const prev = appCase.status;
    const next: ApplicationStatus = verdict === 'APPROVED' ? 'APPROVED' : verdict === 'REJECTED' ? 'REJECTED' : 'UNDER_SCRUTINY';
    const audit = createAuditEvent(
      'REGULATORY_DECISION_RECORDED',
      `Apex Decision Authority recorded final verdict: ${verdict}. Resolution No: ${resolutionNumber}`,
      { verdict, resolutionNumber, rationale, conditions },
      prev,
      next
    );

    setAppCase((c) => ({
      ...c,
      status: next,
      decisionDetails: {
        ...c.decisionDetails,
        status: verdict,
        resolutionNumber,
        decidedAt: new Date().toISOString(),
        decidedBy: currentUser?.name,
        verdictRationale: rationale,
        conditionsApplicable: conditions,
      },
      lastUpdated: new Date().toISOString(),
      auditLog: [...c.auditLog, audit],
    }));

    notify('institution_rep', 'Final Regulatory Decision Notice', `Formal regulatory decision issued for ${appCase.programme}: ${verdict}. Resolution ${resolutionNumber}.`, 'URGENT', '/institution/status');
    notify('regional_officer', 'Apex Regulatory Decision Logged', `Decision ${verdict} recorded for case ${appCase.id}.`, 'NORMAL', '/regional/cases');
    setGuidedStep(9);
    return { success: true, message: `Formal regulatory decision recorded: ${verdict} under Resolution #${resolutionNumber}.` };
  };

  const proposeWorkflowRevision = (version: string, summary: string, rulesCount: number) => {
    const check = canPerformAction(currentUser, 'publish_workflow');
    if (!check.allowed) return { success: false, message: check.reason || 'Action denied.' };

    const newRev: WorkflowRevision = {
      version,
      status: 'DRAFT',
      author: currentUser?.name || 'Ananya Roy',
      date: new Date().toISOString().split('T')[0],
      changesSummary: summary,
      rulesModified: rulesCount,
    };

    setWorkflowRevisions((prev) => [newRev, ...prev]);
    return { success: true, message: `Draft revision ${version} staged for validation.` };
  };

  const publishWorkflowRevision = (version: string) => {
    const check = canPerformAction(currentUser, 'publish_workflow');
    if (!check.allowed) return { success: false, message: check.reason || 'Action denied.' };

    setWorkflowRevisions((prev) =>
      prev.map((r) => {
        if (r.version === version) {
          return { ...r, status: 'ACTIVE' };
        }
        if (r.status === 'ACTIVE') {
          return { ...r, status: 'SUPERSEDED' };
        }
        return r;
      })
    );

    const audit = createAuditEvent(
      'WORKFLOW_RULES_PUBLISHED',
      `Workflow Administrator published new state machine revision: ${version}.`,
      { version }
    );

    setAppCase((c) => ({
      ...c,
      lastUpdated: new Date().toISOString(),
      auditLog: [...c.auditLog, audit],
    }));

    return { success: true, message: `Workflow revision ${version} is now active.` };
  };

  const resetDemoState = () => {
    try {
      localStorage.removeItem(CASE_STORAGE_KEY);
      localStorage.removeItem(NOTIF_STORAGE_KEY);
      localStorage.removeItem(WORKFLOW_STORAGE_KEY);
      localStorage.removeItem(STEP_STORAGE_KEY);
    } catch (e) {
      // ignore
    }
    setAppCase(INITIAL_APPLICATION);
    setNotifications(INITIAL_NOTIFICATIONS);
    setWorkflowRevisions(INITIAL_WORKFLOW_REVISIONS);
    setGuidedStep(1);
    setLastAgentTrace(null);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const setProcessingRoute = (route: ProcessingRoute) => {
    const audit = createAuditEvent('PROCESSING_ROUTE_CONFIGURED', `Processing route set to ${route}.`, { route });
    setAppCase((c) => ({ ...c, processingRoute: route, lastUpdated: new Date().toISOString(), auditLog: [...c.auditLog, audit] }));
    return { success: true, message: `Processing route configured: ${route.replace(/_/g, ' ')}.` };
  };

  const submitCompliance = (recordId: string, evidenceDocumentId?: string) => {
    const record = appCase.complianceRecords.find((item) => item.id === recordId);
    if (!record) return { success: false, message: 'Compliance record not found.' };
    const audit = createAuditEvent('COMPLIANCE_SUBMITTED', `${record.title} submitted by ${currentUser?.name}.`, { recordId, evidenceDocumentId });
    setAppCase((c) => ({
      ...c,
      complianceRecords: c.complianceRecords.map((item) => item.id === recordId
        ? { ...item, status: 'SUBMITTED' as const, submittedAt: new Date().toISOString(), evidenceDocumentId }
        : item),
      lastUpdated: new Date().toISOString(),
      auditLog: [...c.auditLog, audit],
    }));
    notify('document_verifier', 'Compliance submission received', `${record.title} is ready for verification.`, 'HIGH', '/verifier/comparison');
    return { success: true, message: `${record.title} submitted for verification.` };
  };

  const verifyCompliance = (recordId: string) => {
    const record = appCase.complianceRecords.find((item) => item.id === recordId);
    if (!record) return { success: false, message: 'Compliance record not found.' };
    const audit = createAuditEvent('COMPLIANCE_VERIFIED', `${record.title} verified by ${currentUser?.name}.`, { recordId });
    setAppCase((c) => ({
      ...c,
      complianceRecords: c.complianceRecords.map((item) => item.id === recordId
        ? { ...item, status: 'VERIFIED' as const, verifiedAt: new Date().toISOString() }
        : item),
      lastUpdated: new Date().toISOString(),
      auditLog: [...c.auditLog, audit],
    }));
    return { success: true, message: `${record.title} verified and closed.` };
  };

  const submitUndertaking = (undertakingId: string, evidenceDocumentId?: string) => {
    const undertaking = appCase.undertakings.find((item) => item.id === undertakingId);
    if (!undertaking) return { success: false, message: 'Undertaking not found.' };
    const audit = createAuditEvent('UNDERTAKING_SUBMITTED', `${undertaking.title} submitted by ${currentUser?.name}.`, { undertakingId, evidenceDocumentId });
    setAppCase((c) => ({
      ...c,
      undertakings: c.undertakings.map((item) => item.id === undertakingId
        ? { ...item, status: 'SUBMITTED' as const, evidenceDocumentId }
        : item),
      lastUpdated: new Date().toISOString(),
      auditLog: [...c.auditLog, audit],
    }));
    notify('document_verifier', 'Undertaking submitted', `${undertaking.title} is ready for verification.`, 'NORMAL', '/verifier/inventory');
    return { success: true, message: `${undertaking.title} submitted.` };
  };

  const acknowledgeEscalation = (escalationId: string) => {
    const escalation = appCase.escalations.find((item) => item.id === escalationId);
    if (!escalation) return { success: false, message: 'Escalation not found.' };
    const audit = createAuditEvent('ESCALATION_ACKNOWLEDGED', `${escalation.title} acknowledged by ${currentUser?.name}.`, { escalationId });
    setAppCase((c) => ({
      ...c,
      escalations: c.escalations.map((item) => item.id === escalationId ? { ...item, status: 'ACKNOWLEDGED' as const } : item),
      lastUpdated: new Date().toISOString(),
      auditLog: [...c.auditLog, audit],
    }));
    return { success: true, message: 'Escalation acknowledged and assigned action is now visible.' };
  };

  const renewDocument = (documentId: string, expiresAt: string) => {
    const document = appCase.documents.find((item) => item.id === documentId);
    if (!document) return { success: false, message: 'Document not found.' };
    const audit = createAuditEvent('DOCUMENT_RENEWAL_RECORDED', `${document.title} renewal recorded through ${expiresAt}.`, { documentId, expiresAt });
    setAppCase((c) => ({
      ...c,
      documents: c.documents.map((item) => item.id === documentId ? { ...item, expiresAt, renewalStatus: 'RENEWED' as const } : item),
      lastUpdated: new Date().toISOString(),
      auditLog: [...c.auditLog, audit],
    }));
    return { success: true, message: `${document.title} renewal recorded.` };
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        loginAs,
        logout,
        appCase,
        notifications,
        workflowRevisions,
        guidedStep,
        setGuidedStep,
        lastAgentTrace,
        runAgent,
        assignReviewer,
        runOCR,
        verifyDocument,
        uploadSupplementaryDocument,
        evaluateChecklistItem,
        createClarificationRequest,
        submitClarificationResponse,
        resolveClarification,
        toggleEVCRequired,
        scheduleEVC,
        submitEVCReport,
        recordDecision,
        proposeWorkflowRevision,
        publishWorkflowRevision,
        resetDemoState,
        markNotificationRead,
        setProcessingRoute,
        submitCompliance,
        verifyCompliance,
        submitUndertaking,
        acknowledgeEscalation,
        renewDocument,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
