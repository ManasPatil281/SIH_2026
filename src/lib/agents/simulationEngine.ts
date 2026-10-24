import { AgentExecutionTrace, ApplicationCase, DemoUser } from '../../types';

export interface AgentDescriptor {
  id: string;
  name: string;
  roleContext: string;
  description: string;
  badge: string;
}

export const REGISTERED_AGENTS: AgentDescriptor[] = [
  {
    id: 'agent-regional',
    name: 'Regional Intake Agent',
    roleContext: 'regional_officer',
    description: 'Validates application completeness, jurisdiction boundaries, fee tokens, and recommends qualified subject experts.',
    badge: 'Intake Engine',
  },
  {
    id: 'agent-scrutiny',
    name: 'Scrutiny Review Agent',
    roleContext: 'scrutiny_reviewer',
    description: 'Cross-checks declared figures against APH norms, flags deficiencies, drafts evidence-grounded clarification requests.',
    badge: 'Scrutiny Core',
  },
  {
    id: 'agent-institution',
    name: 'Institution Assistance Agent',
    roleContext: 'institution_rep',
    description: 'Guides applicants on mandatory document formats, deadlines, clarification response readiness, and compliance tips.',
    badge: 'Applicant Guidance',
  },
  {
    id: 'agent-verifier',
    name: 'Document Verification Agent',
    roleContext: 'document_verifier',
    description: 'Performs OCR extraction, table parsing, entity alignment, and discrepancy scoring across submitted deeds & NOCs.',
    badge: 'OCR & Cross-Check',
  },
  {
    id: 'agent-evc',
    name: 'EVC Coordination Agent',
    roleContext: 'evc_coordinator',
    description: 'Evaluates inspection necessity triggers, proposes expert rosters, assesses readiness metrics, drafts visit schedules.',
    badge: 'Inspection Logistics',
  },
  {
    id: 'agent-decision',
    name: 'Committee & Decision Support Agent',
    roleContext: 'decision_authority',
    description: 'Synthesizes multi-stage findings, verifies gating conditions, generates executive case briefs and draft resolutions.',
    badge: 'Apex Decision Support',
  },
  {
    id: 'agent-workflow',
    name: 'Workflow Governance Agent',
    roleContext: 'workflow_admin',
    description: 'Validates state-transition invariants, tests rule modifications for deadlocks, and generates draft revision diffs.',
    badge: 'State Machine Gov',
  },
  {
    id: 'agent-auditor',
    name: 'Audit Assistance Agent',
    roleContext: 'auditor',
    description: 'Performs chronological log integrity checks, calculates simulated SHA-256 block chains, and compiles audit packages.',
    badge: 'Integrity & Verification',
  },
  {
    id: 'agent-sysadmin',
    name: 'System Operations Agent',
    roleContext: 'system_admin',
    description: 'Simulates government registry mock syncs (DigiLocker, Land IGR), monitors worker latencies, and prepares diagnostic dumps.',
    badge: 'Systems & Integrations',
  },
];

export function executeAgentSimulation(
  agentId: string,
  appCase: ApplicationCase,
  currentUser: DemoUser
): AgentExecutionTrace {
  const timestamp = new Date().toISOString();

  switch (agentId) {
    case 'agent-regional':
      return {
        agentId,
        agentName: 'Regional Intake Agent',
        roleContext: 'Regional Officer / Intake (Rajesh Sharma)',
        caseId: appCase.id,
        executedAt: timestamp,
        executionSteps: [
          { stepName: '1. Request Received', status: 'COMPLETED', timestamp, detail: 'Intake validation trigger received for case ' + appCase.id },
          { stepName: '2. Case Context Retrieved', status: 'COMPLETED', timestamp, detail: 'Loaded metadata: BSIET-KOLHAPUR | B.E./B.Tech CSE (AI & ML) | 60 Intake' },
          { stepName: '3. Relevant Records Retrieved', status: 'COMPLETED', timestamp, detail: 'Validated payment token #TXN-AICTE-99214 and trust registration certificate.' },
          { stepName: '4. Configured Rules Evaluated', status: 'COMPLETED', timestamp, detail: 'Rule REG-01 (Jurisdiction Western Region: PASS), REG-02 (Fee Clearance: PASS)' },
          { stepName: '5. Findings Generated', status: 'COMPLETED', timestamp, detail: 'Application dossier complete. Suitable reviewer panel identified: Dr. Arvind Joshi (CS/AI).' },
          { stepName: '6. Proposed Action Prepared', status: 'COMPLETED', timestamp, detail: 'Assign case to Senior Reviewer Dr. Arvind Joshi.' },
          { stepName: '7. Permission Check', status: 'COMPLETED', timestamp, detail: `User ${currentUser.name} has permission 'case.assign': VALIDATED.` },
          { stepName: '8. Human Approval Check', status: 'COMPLETED', timestamp, detail: 'Human sign-off by Regional Officer confirmed in session.' },
          { stepName: '9. State Update', status: 'COMPLETED', timestamp, detail: 'Workflow state updated to UNDER_SCRUTINY.' },
          { stepName: '10. Audit Event', status: 'COMPLETED', timestamp, detail: 'Logged cryptographically sealed audit event to ledger.' },
        ],
        rulesEvaluated: [
          { ruleCode: 'REG-JURISDICTION-01', description: 'Institution falls within Maharashtra/Goa Western Regional Jurisdiction', outcome: 'PASS' },
          { ruleCode: 'REG-FEES-02', description: 'Statutory processing fee of ₹1,50,000 cleared via Bharatkosh gateway', outcome: 'PASS' },
          { ruleCode: 'REG-ELIGIBILITY-03', description: 'Existing institution in good standing (>5 years operation)', outcome: 'PASS' },
        ],
        proposedAction: 'Confirm case assignment to Dr. Arvind Joshi and transition case status to UNDER_SCRUTINY.',
        requiresHumanApproval: true,
        explanation: 'All intake statutory prerequisites are verified. The application is ready for deep technical and legal scrutiny.',
      };

    case 'agent-scrutiny':
      return {
        agentId,
        agentName: 'Scrutiny Review Agent',
        roleContext: 'Scrutiny Reviewer (Dr. Arvind Joshi)',
        caseId: appCase.id,
        executedAt: timestamp,
        executionSteps: [
          { stepName: '1. Request Received', status: 'COMPLETED', timestamp, detail: 'Invoked automated scrutiny checklist evaluation across APH 2026-27 rules.' },
          { stepName: '2. Case Context Retrieved', status: 'COMPLETED', timestamp, detail: 'Loaded 5 submitted evidence documents and 5 regulatory checklist heads.' },
          { stepName: '3. Relevant Records Retrieved', status: 'COMPLETED', timestamp, detail: 'Cross-referenced OCR extractions for Land, Building, Fire NOC, and Lab Invoices.' },
          { stepName: '4. Configured Rules Evaluated', status: 'COMPLETED', timestamp, detail: 'Evaluated the applicable programme route and Annexure 4, Section 4.1 evidence requirements.' },
          { stepName: '5. Findings Generated', status: 'WARN', timestamp, detail: 'Flagged a potential evidence gap: the synthetic inventory lists 16 computers and lacks installation and availability corroboration.' },
          { stepName: '6. Proposed Action Prepared', status: 'COMPLETED', timestamp, detail: 'Drafted Clarification Request CLR/2026/01 with statutory deadline of 7 days.' },
          { stepName: '7. Permission Check', status: 'COMPLETED', timestamp, detail: `User ${currentUser.name} has permission 'clarification.create': VALIDATED.` },
          { stepName: '8. Human Approval Check', status: 'WARN', timestamp, detail: 'Awaiting human reviewer approval before dispatching clarification to institution.' },
          { stepName: '9. State Update', status: 'COMPLETED', timestamp, detail: 'Pending state transition to CLARIFICATION_REQUIRED.' },
          { stepName: '10. Audit Event', status: 'COMPLETED', timestamp, detail: 'Simulated audit event staged for review log.' },
        ],
        rulesEvaluated: [
          { ruleCode: 'APH-LAND-4.1', description: 'Continuous Land >= 7.5 Acres for Industrial/Rural zone', outcome: 'PASS' },
          { ruleCode: 'APH-BLDG-4.3', description: 'Instructional built-up area >= 4,000 sq.m carpet', outcome: 'PASS' },
          { ruleCode: 'APH-FIRE-2.8', description: 'Valid State Fire NOC with >= 1 year operational validity', outcome: 'PASS' },
          { ruleCode: 'APH-2024-27-ANN4-4.1-ENG-UG-PC', description: '1:10 PC/laptop ratio subject to a minimum of 20 PCs; separate departmental laboratory with at least 20 computers', outcome: 'FLAG' },
          { ruleCode: 'APH-CADRE-3.2', description: 'Faculty to student ratio 1:20 with approved cadre distribution', outcome: 'PASS' },
        ],
        proposedAction: 'Issue formal Clarification Request CLR/2026/01 and set case status to CLARIFICATION_REQUIRED.',
        requiresHumanApproval: true,
        explanation: 'The synthetic records do not establish the complete department inventory. The agent recommends a clarification for updated inventory, installation, and availability evidence; a human officer must determine applicability and outcome.',
      };

    case 'agent-institution':
      return {
        agentId,
        agentName: 'Institution Assistance Agent',
        roleContext: 'Institution Representative (Prof. Sunita Patil)',
        caseId: appCase.id,
        executedAt: timestamp,
        executionSteps: [
          { stepName: '1. Request Received', status: 'COMPLETED', timestamp, detail: 'Assistance query received for Clarification CLR/2026/01 response preparation.' },
          { stepName: '2. Case Context Retrieved', status: 'COMPLETED', timestamp, detail: 'Loaded the simulated clarification and the outstanding inventory, installation, and availability evidence.' },
          { stepName: '3. Relevant Records Retrieved', status: 'COMPLETED', timestamp, detail: 'Retrieved Annexure 4, Section 4.1 and the synthetic 16-computer inventory.' },
          { stepName: '4. Configured Rules Evaluated', status: 'COMPLETED', timestamp, detail: 'Checked response checklist: updated inventory + installation record + availability evidence.' },
          { stepName: '5. Findings Generated', status: 'COMPLETED', timestamp, detail: 'Prepared a response package checklist without asserting that the real institution is deficient.' },
          { stepName: '6. Proposed Action Prepared', status: 'COMPLETED', timestamp, detail: 'Prepared a draft response package for human sign-off.' },
          { stepName: '7. Permission Check', status: 'COMPLETED', timestamp, detail: `User ${currentUser.name} has permission 'clarification.respond': VALIDATED.` },
          { stepName: '8. Human Approval Check', status: 'COMPLETED', timestamp, detail: 'Authorized Signatory (Prof. Sunita Patil) verification required before submission.' },
          { stepName: '9. State Update', status: 'COMPLETED', timestamp, detail: 'Will transition to CLARIFICATION_SUBMITTED upon dispatch.' },
          { stepName: '10. Audit Event', status: 'COMPLETED', timestamp, detail: 'Institutional submission timestamp will be recorded.' },
        ],
        rulesEvaluated: [
          { ruleCode: 'INST-FORMAT-01', description: 'Supporting document format is searchable PDF with certified digital signature', outcome: 'PASS' },
          { ruleCode: 'INST-DEADLINE-02', description: 'Response submitted within 7-calendar-day statutory window', outcome: 'PASS' },
        ],
        proposedAction: 'Submit updated inventory, installation record, availability evidence, and any corroborating invoice.',
        requiresHumanApproval: true,
        explanation: 'The applicant assistant helps assemble evidence requested by the officer. It does not claim that the public institution failed a rule and cannot decide whether the evidence is sufficient.',
      };

    case 'agent-verifier':
      return {
        agentId,
        agentName: 'Document Verification Agent',
        roleContext: 'Document Verifier (Meera Deshmukh)',
        caseId: appCase.id,
        executedAt: timestamp,
        executionSteps: [
          { stepName: '1. Request Received', status: 'COMPLETED', timestamp, detail: 'Evidence verification request triggered on supplementary submission.' },
          { stepName: '2. Case Context Retrieved', status: 'COMPLETED', timestamp, detail: 'Loaded the synthetic inventory and the applicant response package.' },
          { stepName: '3. Relevant Records Retrieved', status: 'COMPLETED', timestamp, detail: 'Executed simulated OCR extraction on invoice, serial tables, and GSTIN.' },
          { stepName: '4. Configured Rules Evaluated', status: 'COMPLETED', timestamp, detail: 'Compared inventory, installation records, serials, and availability evidence against the cited source.' },
          { stepName: '5. Findings Generated', status: 'WARN', timestamp, detail: 'Evidence is ready for officer review; the agent does not certify a final compliance result.' },
          { stepName: '6. Proposed Action Prepared', status: 'COMPLETED', timestamp, detail: 'Mark Document doc-004 as VERIFIED with verification note.' },
          { stepName: '7. Permission Check', status: 'COMPLETED', timestamp, detail: `User ${currentUser.name} has permission 'document.verify': VALIDATED.` },
          { stepName: '8. Human Approval Check', status: 'COMPLETED', timestamp, detail: 'Document Verifier Meera Deshmukh must affirm the statutory sign-off.' },
          { stepName: '9. State Update', status: 'COMPLETED', timestamp, detail: 'Document verification gate will be marked SATISFIED.' },
          { stepName: '10. Audit Event', status: 'COMPLETED', timestamp, detail: 'Recorded document verification hash into audit trail.' },
        ],
        rulesEvaluated: [
          { ruleCode: 'VER-OCR-ACCURACY-01', description: 'OCR text confidence score >= 0.90 for financial invoice fields', outcome: 'PASS' },
          { ruleCode: 'VER-GSTIN-02', description: 'Vendor GSTIN 27AAACT9910F1Z4 validated as active in Maharashtra jurisdiction', outcome: 'PASS' },
          { ruleCode: 'VER-AGGREGATE-03', description: 'Inventory and availability evidence supports the applicable computer-lab requirement', outcome: 'FLAG' },
        ],
        proposedAction: 'Record the evidence comparison and request human verification before changing the checklist outcome.',
        requiresHumanApproval: true,
        explanation: 'The verifier prepares an evidence comparison and preserves uncertainty. Only the authorised reviewer can mark the checklist satisfied or issue a further request.',
      };

    case 'agent-evc':
      return {
        agentId,
        agentName: 'EVC Coordination Agent',
        roleContext: 'EVC Coordinator (Sanjeev Rao)',
        caseId: appCase.id,
        executedAt: timestamp,
        executionSteps: [
          { stepName: '1. Request Received', status: 'COMPLETED', timestamp, detail: 'Evaluated necessity of on-site Expert Visit Committee inspection.' },
          { stepName: '2. Case Context Retrieved', status: 'COMPLETED', timestamp, detail: 'Case AADHAR-BSIET-2026-27 | B.E./B.Tech CSE (AI & ML) | Kolhapur, Maharashtra.' },
          { stepName: '3. Relevant Records Retrieved', status: 'COMPLETED', timestamp, detail: 'Assessed physical infrastructure risk indicators and complaint registers.' },
          { stepName: '4. Configured Rules Evaluated', status: 'COMPLETED', timestamp, detail: 'Rule EVC-COND-01 (Complaints: None), EVC-COND-02 (Random 5% cohort: Not drawn).' },
          { stepName: '5. Findings Generated', status: 'COMPLETED', timestamp, detail: 'All documents verified digitally; no physical site visit is mandated under baseline flow.' },
          { stepName: '6. Proposed Action Prepared', status: 'COMPLETED', timestamp, detail: 'Confirm EVC status as NOT_REQUIRED (or provide manual override schedule if demo requires).' },
          { stepName: '7. Permission Check', status: 'COMPLETED', timestamp, detail: `User ${currentUser.name} has permission 'evc.schedule': VALIDATED.` },
          { stepName: '8. Human Approval Check', status: 'COMPLETED', timestamp, detail: 'EVC Coordinator oversight logged.' },
          { stepName: '9. State Update', status: 'COMPLETED', timestamp, detail: 'EVC readiness score set to 94/100.' },
          { stepName: '10. Audit Event', status: 'COMPLETED', timestamp, detail: 'Inspection readiness assessment recorded.' },
        ],
        rulesEvaluated: [
          { ruleCode: 'EVC-TRIGGER-LAND', description: 'Ambiguity in land boundary or continuous parcel', outcome: 'PASS' },
          { ruleCode: 'EVC-TRIGGER-COMPLAINT', description: 'Verified complaints on physical infrastructure', outcome: 'PASS' },
          { ruleCode: 'EVC-COHORT-SELECT', description: 'Selected in 5% automated surprise inspection pool', outcome: 'PASS' },
        ],
        proposedAction: 'Keep EVC status as NOT_REQUIRED and advance case to Committee Decision Docket.',
        requiresHumanApproval: true,
        explanation: 'No statutory triggers necessitate an on-site inspection. Case qualifies for paperless digital approval.',
      };

    case 'agent-decision':
      return {
        agentId,
        agentName: 'Committee & Decision Support Agent',
        roleContext: 'Decision Authority (Demo Committee Representative)',
        caseId: appCase.id,
        executedAt: timestamp,
        executionSteps: [
          { stepName: '1. Request Received', status: 'COMPLETED', timestamp, detail: 'Decision readiness validation triggered for case ' + appCase.id },
          { stepName: '2. Case Context Retrieved', status: 'COMPLETED', timestamp, detail: 'Compiled executive brief for Standing Hearing & Scrutiny Apex Committee.' },
          { stepName: '3. Relevant Records Retrieved', status: 'COMPLETED', timestamp, detail: 'Checked gating statuses: Document Verification, Checklist, Clarifications, EVC.' },
          { stepName: '4. Configured Rules Evaluated', status: 'COMPLETED', timestamp, detail: 'Verified 4 of 4 statutory approval gates (All gates passed).' },
          { stepName: '5. Findings Generated', status: 'COMPLETED', timestamp, detail: 'Application satisfies 100% of APH 2026-27 requirements for 60 seats in B.E./B.Tech CSE (AI & ML).' },
          { stepName: '6. Proposed Action Prepared', status: 'COMPLETED', timestamp, detail: 'Drafted formal Resolution #SHC-WR-2026-0492 recommending Grant of Approval.' },
          { stepName: '7. Permission Check', status: 'COMPLETED', timestamp, detail: `User ${currentUser.name} has permission 'decision.record': VALIDATED.` },
          { stepName: '8. Human Approval Check', status: 'COMPLETED', timestamp, detail: 'Mandatory human committee sign-off required. AI cannot approve unilaterally.' },
          { stepName: '9. State Update', status: 'COMPLETED', timestamp, detail: 'Application will transition to APPROVED upon authorized signature.' },
          { stepName: '10. Audit Event', status: 'COMPLETED', timestamp, detail: 'Formal regulatory order hash will be inscribed into ledger.' },
        ],
        rulesEvaluated: [
          { ruleCode: 'DEC-GATE-DOCS', description: 'All statutory documents verified without outstanding rejections', outcome: 'PASS' },
          { ruleCode: 'DEC-GATE-CHECKLIST', description: 'Zero unaddressed deficient items on scrutiny checklist', outcome: 'PASS' },
          { ruleCode: 'DEC-GATE-CLARIFICATIONS', description: 'All issued clarifications formally resolved and closed', outcome: 'PASS' },
          { ruleCode: 'DEC-HUMAN-IN-LOOP', description: 'Human committee chair signature present', outcome: 'PASS' },
        ],
        proposedAction: 'Record formal simulated regulatory decision: APPROVED with 60 intake for AY 2026–2027.',
        requiresHumanApproval: true,
        explanation: 'All prerequisite statutory gates are cleared. Decision authority may proceed to record the official approval resolution.',
      };

    case 'agent-workflow':
      return {
        agentId,
        agentName: 'Workflow Governance Agent',
        roleContext: 'Workflow Administrator (Ananya Roy)',
        caseId: appCase.id,
        executedAt: timestamp,
        executionSteps: [
          { stepName: '1. Request Received', status: 'COMPLETED', timestamp, detail: 'Evaluated active workflow state machine invariants and transition graph.' },
          { stepName: '2. Case Context Retrieved', status: 'COMPLETED', timestamp, detail: '12 discrete states, 24 permitted directed transitions, 6 gating conditions.' },
          { stepName: '3. Relevant Records Retrieved', status: 'COMPLETED', timestamp, detail: 'Compared active ruleset v2026.1-RELEASE against proposed draft v2026.2-DRAFT.' },
          { stepName: '4. Configured Rules Evaluated', status: 'COMPLETED', timestamp, detail: 'Checked for cyclic deadlocks, unhandled terminal states, and permission leaks: ZERO ERRORS.' },
          { stepName: '5. Findings Generated', status: 'COMPLETED', timestamp, detail: 'State transition engine verified robust and deterministic.' },
          { stepName: '6. Proposed Action Prepared', status: 'COMPLETED', timestamp, detail: 'Ready to stage or publish workflow updates.' },
          { stepName: '7. Permission Check', status: 'COMPLETED', timestamp, detail: `User ${currentUser.name} has permission 'workflow.configure': VALIDATED.` },
          { stepName: '8. Human Approval Check', status: 'COMPLETED', timestamp, detail: 'Workflow Administrator authorization verified.' },
          { stepName: '9. State Update', status: 'COMPLETED', timestamp, detail: 'Engine state invariant check recorded.' },
          { stepName: '10. Audit Event', status: 'COMPLETED', timestamp, detail: 'Workflow governance validation event written to audit log.' },
        ],
        rulesEvaluated: [
          { ruleCode: 'WF-DETERMINISM', description: 'State machine contains no ambiguous branching without explicit guard predicates', outcome: 'PASS' },
          { ruleCode: 'WF-GATE-INTEGRITY', description: 'Every consequential terminal transition requires multi-role gating check', outcome: 'PASS' },
          { ruleCode: 'WF-AUDIT-IMMUTABLE', description: 'Historical event log is append-only and tamper-evident', outcome: 'PASS' },
        ],
        proposedAction: 'Maintain current active ruleset v2026.1-RELEASE. All state transitions validated.',
        requiresHumanApproval: true,
        explanation: 'State engine is operating deterministically. No unauthorized bypass or deadlock paths detected.',
      };

    case 'agent-auditor':
      return {
        agentId,
        agentName: 'Audit Assistance Agent',
        roleContext: 'Independent Auditor (Independent Demo Auditor)',
        caseId: appCase.id,
        executedAt: timestamp,
        executionSteps: [
          { stepName: '1. Request Received', status: 'COMPLETED', timestamp, detail: 'Simulated blockchain-style ledger integrity check initiated.' },
          { stepName: '2. Case Context Retrieved', status: 'COMPLETED', timestamp, detail: 'Scanned 4 chronological events for case AADHAR-BSIET-2026-27.' },
          { stepName: '3. Relevant Records Retrieved', status: 'COMPLETED', timestamp, detail: 'Retrieved block hashes, actor roles, timestamps, and payload snapshots.' },
          { stepName: '4. Configured Rules Evaluated', status: 'COMPLETED', timestamp, detail: 'Recalculated cryptographic SHA-256 digests across event chain: 100% MATCH.' },
          { stepName: '5. Findings Generated', status: 'COMPLETED', timestamp, detail: 'No evidence tampering, deleted entries, or retrospective modifications detected.' },
          { stepName: '6. Proposed Action Prepared', status: 'COMPLETED', timestamp, detail: 'Generate signed Audit Package (JSON/PDF) for regulatory vigilance archive.' },
          { stepName: '7. Permission Check', status: 'COMPLETED', timestamp, detail: `User ${currentUser.name} has permission 'audit.read' and 'audit.export': VALIDATED.` },
          { stepName: '8. Human Approval Check', status: 'COMPLETED', timestamp, detail: 'Read-only access verified. No mutation permits allowed for Auditor.' },
          { stepName: '9. State Update', status: 'COMPLETED', timestamp, detail: 'Audit verification timestamp recorded.' },
          { stepName: '10. Audit Event', status: 'COMPLETED', timestamp, detail: 'Auditor inspection logged with read-only certificate.' },
        ],
        rulesEvaluated: [
          { ruleCode: 'AUD-HASH-CONTINUITY', description: 'Hash pointer links between successive events are mathematically valid', outcome: 'PASS' },
          { ruleCode: 'AUD-ROLE-NON-REPUDIATION', description: 'Every state transition is signed by an authenticated demo identity', outcome: 'PASS' },
          { ruleCode: 'AUD-READONLY-ENFORCEMENT', description: 'Auditor role is denied all write/edit operations', outcome: 'PASS' },
        ],
        proposedAction: 'Export certified audit package for SIH demonstration records.',
        requiresHumanApproval: false,
        explanation: 'Audit trail integrity verified. All 4 historical events are chronologically sequential and cryptographically sound.',
      };

    case 'agent-sysadmin':
    default:
      return {
        agentId,
        agentName: 'System Operations Agent',
        roleContext: 'System Administrator (Vikram Sen)',
        caseId: appCase.id,
        executedAt: timestamp,
        executionSteps: [
          { stepName: '1. Request Received', status: 'COMPLETED', timestamp, detail: 'Platform health scan and mock integration connectivity check.' },
          { stepName: '2. Case Context Retrieved', status: 'COMPLETED', timestamp, detail: 'Inspected 4 mock integration gateways: DigiLocker, IGR Land, SPPU, AICTE Central.' },
          { stepName: '3. Relevant Records Retrieved', status: 'COMPLETED', timestamp, detail: 'Checked latency budgets, mock notification outbox, and background cron schedules.' },
          { stepName: '4. Configured Rules Evaluated', status: 'COMPLETED', timestamp, detail: 'All 4 mock endpoints responding with HTTP 200 (Simulated latency: 22ms).' },
          { stepName: '5. Findings Generated', status: 'COMPLETED', timestamp, detail: 'Platform operating within nominal parameters. 9 demo accounts active.' },
          { stepName: '6. Proposed Action Prepared', status: 'COMPLETED', timestamp, detail: 'System is ready for demonstration. Local storage sync verified.' },
          { stepName: '7. Permission Check', status: 'COMPLETED', timestamp, detail: `User ${currentUser.name} has permission 'system.configure': VALIDATED.` },
          { stepName: '8. Human Approval Check', status: 'COMPLETED', timestamp, detail: 'System Admin privileges authenticated.' },
          { stepName: '9. State Update', status: 'COMPLETED', timestamp, detail: 'Health score logged as 100% nominal.' },
          { stepName: '10. Audit Event', status: 'COMPLETED', timestamp, detail: 'System operations check logged.' },
        ],
        rulesEvaluated: [
          { ruleCode: 'SYS-INTEGRATIONS', description: 'Simulated API connectors (DigiLocker, IGR, Affiliation Gateway) active', outcome: 'PASS' },
          { ruleCode: 'SYS-SESSION-SECURITY', description: 'Simulated RBAC session token boundaries enforced', outcome: 'PASS' },
          { ruleCode: 'SYS-STORAGE-PERSIST', description: 'Browser localStorage synchronization state intact', outcome: 'PASS' },
        ],
        proposedAction: 'Maintain current cluster configuration. Demo reset available if required.',
        requiresHumanApproval: false,
        explanation: 'All portal components, simulated background workers, and role permission policies are healthy.',
      };
  }
}
