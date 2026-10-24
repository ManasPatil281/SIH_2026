export type UserRole =
  | 'regional_officer'
  | 'scrutiny_reviewer'
  | 'institution_rep'
  | 'document_verifier'
  | 'evc_coordinator'
  | 'decision_authority'
  | 'workflow_admin'
  | 'auditor'
  | 'system_admin';

export type Permission =
  | 'case.read.assigned'
  | 'case.read.regional'
  | 'case.read.own'
  | 'case.create'
  | 'case.assign'
  | 'review.findings.write'
  | 'review.checklist.evaluate'
  | 'clarification.create'
  | 'clarification.respond'
  | 'clarification.review'
  | 'document.verify'
  | 'document.ocr.run'
  | 'document.upload'
  | 'evc.schedule'
  | 'evc.report.write'
  | 'evc.signoff'
  | 'decision.record'
  | 'decision.review'
  | 'workflow.configure'
  | 'workflow.publish'
  | 'audit.read'
  | 'audit.export'
  | 'system.configure'
  | 'demo.reset';

export interface DemoUser {
  id: string;
  name: string;
  role: UserRole;
  roleLabel: string;
  designation: string;
  department: string;
  jurisdiction: string;
  email: string;
  demoPin: string;
  permissions: Permission[];
  avatarInitial: string;
  badgeColor: string;
  dashboardRoute: string;
}

export type ApplicationStatus =
  | 'SUBMITTED'
  | 'UNDER_SCRUTINY'
  | 'CLARIFICATION_REQUIRED'
  | 'CLARIFICATION_SUBMITTED'
  | 'DOCUMENT_VERIFICATION_PENDING'
  | 'SCRUTINY_COMPLETED'
  | 'EVC_PENDING'
  | 'EVC_COMPLETED'
  | 'DECISION_PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'RETURNED_FOR_ACTION';

export type ProcessingRoute = 'ONLY_SCRUTINY' | 'SCRUTINY_PLUS_EVC' | 'EVC_PLUS_SHC' | 'ONLY_EVC';

export interface CaseDeadline {
  id: string;
  title: string;
  dueDate: string;
  ownerRole: UserRole;
  status: 'UPCOMING' | 'DUE_SOON' | 'OVERDUE' | 'COMPLETED';
  escalationLevel: number;
}

export interface UndertakingRecord {
  id: string;
  title: string;
  condition: string;
  dueDate: string;
  status: 'PENDING' | 'SUBMITTED' | 'VERIFIED' | 'OVERDUE';
  evidenceDocumentId?: string;
  owner: string;
}

export interface ComplianceRecord {
  id: string;
  title: string;
  requirement: string;
  dueDate: string;
  status: 'PENDING' | 'SUBMITTED' | 'VERIFIED' | 'OVERDUE';
  submittedAt?: string;
  verifiedAt?: string;
  evidenceDocumentId?: string;
}

export interface EscalationRecord {
  id: string;
  title: string;
  reason: string;
  createdAt: string;
  assignedTo: string;
  severity: 'HIGH' | 'URGENT';
  status: 'OPEN' | 'ACKNOWLEDGED' | 'CLOSED';
}

export interface ExtractedField {
  label: string;
  extractedValue: string;
  declaredValue: string;
  confidence: number;
  match: boolean;
  notes?: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  documentType: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  uploadedBy: string;
  status: 'PENDING_OCR' | 'OCR_COMPLETED' | 'VERIFIED' | 'REJECTED' | 'REQUIRES_REVERIFICATION';
  verifiedBy?: string;
  verifiedAt?: string;
  verificationNotes?: string;
  expiresAt?: string;
  renewalStatus?: 'NOT_REQUIRED' | 'DUE_SOON' | 'EXPIRED' | 'RENEWED';
  ocrExtractedFields: ExtractedField[];
  rawOcrText: string;
  category: 'Land & Building' | 'Statutory Approvals' | 'Academic Infrastructure' | 'Financial & Society';
}

export interface ChecklistItem {
  id: string;
  category: string;
  clauseRef: string;
  requirement: string;
  declaredDetail: string;
  status: 'PENDING' | 'SATISFIED' | 'DEFICIENT' | 'EXEMPTED';
  agentAssessment?: {
    suggestedStatus: 'SATISFIED' | 'DEFICIENT';
    confidence: number;
    reasoning: string;
    relevantDocuments: string[];
  };
  reviewerNotes?: string;
  evaluatedAt?: string;
  evaluatedBy?: string;
}

export interface ClarificationItem {
  id: string;
  queryNumber: string;
  title: string;
  category: string;
  question: string;
  requestedBy: string;
  requestedAt: string;
  deadline: string;
  status: 'PENDING_INSTITUTION' | 'RESPONSE_SUBMITTED' | 'RESOLVED' | 'ESCALATED';
  response?: {
    submittedAt: string;
    submittedBy: string;
    responseText: string;
    supportingDocumentTitle?: string;
    supportingDocId?: string;
  };
  reviewerFeedback?: string;
}

export interface EVCDetails {
  required: boolean;
  reason?: string;
  scheduledDate?: string;
  inspectionMode?: 'Physical' | 'Hybrid / Digital';
  leadInspector?: string;
  teamMembers?: string[];
  status: 'NOT_REQUIRED' | 'PENDING_SCHEDULE' | 'SCHEDULED' | 'INSPECTION_COMPLETED' | 'REPORT_SUBMITTED';
  observations?: string[];
  recommendation?: 'RECOMMENDED_APPROVAL' | 'CONDITIONAL_APPROVAL' | 'NOT_RECOMMENDED';
  reportSubmittedAt?: string;
  reportSignOffBy?: string;
  readinessScore?: number;
}

export interface DecisionDetails {
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'REFERRED_TO_SHC';
  committeeName: string;
  resolutionNumber?: string;
  decidedAt?: string;
  decidedBy?: string;
  verdictRationale?: string;
  conditionsApplicable?: string[];
  dissentingRemarks?: string;
  gatesPassed: {
    documentVerification: boolean;
    scrutinyChecklist: boolean;
    clarificationsResolved: boolean;
    evcCompleted: boolean;
  };
}

export interface FindingItem {
  id: string;
  severity: 'CRITICAL' | 'OBSERVATION' | 'COMPLIANT' | 'INFO';
  title: string;
  description: string;
  clauseRef: string;
  category: string;
  isPublicApplicantVisible: boolean;
  proposedAction: string;
  createdAt: string;
  resolved: boolean;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  summary: string;
  details?: Record<string, any>;
  previousStatus?: ApplicationStatus;
  newStatus?: ApplicationStatus;
  hashSignature: string; // Simulated SHA-256 block hash
  simulatedTamperProof: boolean;
}

export interface NotificationItem {
  id: string;
  recipientRole: UserRole;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  linkRoute?: string;
  priority: 'HIGH' | 'NORMAL' | 'URGENT';
}

export interface WorkflowRevision {
  version: string;
  status: 'ACTIVE' | 'DRAFT' | 'SUPERSEDED';
  author: string;
  date: string;
  changesSummary: string;
  rulesModified: number;
}

export interface ApplicationCase {
  id: string;
  institutionName: string;
  institutionCode: string;
  region: string;
  address: string;
  programme: string;
  academicYear: string;
  category: string;
  intakeProposed: number;
  status: ApplicationStatus;
  assignedReviewer: string;
  assignedReviewerId: string;
  regionalOfficer: string;
  submissionDate: string;
  lastUpdated: string;
  documents: DocumentItem[];
  checklist: ChecklistItem[];
  clarifications: ClarificationItem[];
  evcDetails: EVCDetails;
  decisionDetails: DecisionDetails;
  findings: FindingItem[];
  auditLog: AuditEvent[];
  processingRoute: ProcessingRoute;
  deadlines: CaseDeadline[];
  undertakings: UndertakingRecord[];
  complianceRecords: ComplianceRecord[];
  escalations: EscalationRecord[];
}

export interface AgentExecutionStep {
  stepName: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'WARN';
  timestamp: string;
  detail: string;
}

export interface AgentExecutionTrace {
  agentId: string;
  agentName: string;
  roleContext: string;
  caseId: string;
  executedAt: string;
  executionSteps: AgentExecutionStep[];
  rulesEvaluated: {
    ruleCode: string;
    description: string;
    outcome: 'PASS' | 'FLAG' | 'FAIL';
  }[];
  proposedAction: string;
  requiresHumanApproval: boolean;
  explanation: string;
}
