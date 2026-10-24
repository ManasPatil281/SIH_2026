# Nivaran controlled case-study demo

## Purpose

Nivaran demonstrates role-isolated workflow automation for AICTE approval processing. Agents read records, compare evidence with configured rules, prepare drafts, and explain their reasoning. Authorised officers remain responsible for verification, clarification, EVC, and approval decisions.

## Case provenance

| Layer | Demo value | How to describe it |
|---|---|---|
| Public institutional reference | Dr. Bapuji Salunkhe Institute of Engineering and Technology, Kolhapur; published programme information and public AICTE archive | Real public reference material, used only for structure and context |
| Historical reports | Application Report Part 2, Deficiency Report, and approval records for 2022–23 | Historical documents; do not treat them as a 2026–27 application |
| Current application | EoA for simulated academic year 2026–27, CSE (AI & ML), intake 60 | Synthetic prototype scenario |
| Evidence package | 16-computer inventory, invoice, installation and availability records | Synthetic test evidence, not a finding about BSIET |

The case must always be introduced as a **controlled scrutiny exercise**. It does not claim that BSIET has violated an AICTE requirement.

## Defensible scrutiny rule

The prototype cites **AICTE Approval Process Handbook 2024–25 to 2026–27, Annexure 4, Section 4.1 — Computers, Software and Internet, PDF pages 92–93**:

- PC/laptop-to-student ratio: 1:10, subject to a minimum of 20 PCs.
- Each department must have a separate computer laboratory with at least 20 computers.

For a 60-seat simulated application, the agent observes that the synthetic inventory lists 16 computers and that installation/availability corroboration is missing. It therefore reports **potential shortfall / evidence requires verification**. It must not claim a GPU requirement, cite Chapter V Clause 5.4 for this issue, or issue a final legal deficiency.

Every generated finding shows the source, section, pages, applicability, evidence examined, reasoning, confidence, uncertainty, and responsible human reviewer.

## Guided presenter flow

1. **Regional Officer — Rajesh Sharma (`1001`)**: open intake and run the regional agent. Show jurisdiction, completeness, route selection, and assignment to the scrutiny reviewer.
2. **Scrutiny Reviewer — Dr. Arvind Joshi (`1002`)**: run the scrutiny agent. Show it opening the synthetic inventory, retrieving Annexure 4 Section 4.1, and drafting a clarification for corroborating evidence.
3. **Institution Representative — Prof. Sunita Patil (`1003`)**: open the clarification. Submit an updated inventory, installation record, availability evidence, and synthetic supporting invoice.
4. **Document Verifier — Meera Deshmukh (`1004`)**: run OCR/evidence comparison. Show inventory fields, document provenance, missing corroboration, and the human sign-off gate.
5. **Scrutiny Reviewer**: review the verifier result and resolve or continue the clarification. The agent cannot close the issue automatically.
6. **EVC Coordinator — Sanjeev Rao (`1005`)**: show readiness and the configurable EVC route. Schedule or mark not required according to the officer’s recorded reason.
7. **Decision Authority (`1006`)**: show document, scrutiny, clarification, and EVC gates. Record a clearly labelled simulated committee decision only after authorised review.
8. **Independent Auditor**: show the append-only audit chain, source evidence, actions, escalations, and human approvals.
9. **Workflow Administrator / System Administrator**: show route configuration, deadlines, notifications, escalation, reports, RBAC, and reset.

## Problem Statement 26262 coverage

| Requirement | Prototype evidence |
|---|---|
| End-to-end application routing | Role-isolated workspaces, route configuration, assignment, clarification, verification, EVC, and decision gates |
| Stage combinations | Configurable routes including scrutiny-only and scrutiny-plus-EVC; route selection remains officer-controlled |
| Authorised movement and return | AppContext prerequisite checks, return-for-action path, reasons, and audit events |
| Dashboards and pendency | Role dashboards, ageing/deadline records, workload and escalation views |
| EVC scheduling and alerts | EVC readiness, roster, scheduling, report, sign-off, deadlines, and escalation records |
| Undertakings and compliance | Due dates, submissions, verification, reminders, and escalation queue |
| Lease/document validity | Expiry metadata, renewal submission, verification, and overdue alert |
| Notifications and escalation | Configurable priority, deadline records, escalation ownership, and acknowledgement |
| Reporting and audit | Operations reports, filtered role views, export-ready audit ledger, and hash-linked events |
| Secure role access | RBAC, role-specific navigation, document metadata, and human approval gates |
| Integrations | Demonstration connector states; live AICTE/DigiLocker/IGR/GSTN integrations are out of scope |
| Human oversight | Agents recommend and draft; authorised users verify, clarify, schedule, and decide |

## Safe closing statement

Nivaran  does not replace statutory scrutiny. In this controlled BSIET case, the agent makes the source and uncertainty visible, gathers the next evidence, and records a proposed action. The authorised officer decides whether the evidence is sufficient and what the applicable AICTE procedure requires.”
