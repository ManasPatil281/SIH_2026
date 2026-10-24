# AADHAR presentation script

## Purpose

Use this script to present the complete controlled BSIET case study without relying
on an in-product walkthrough bar or agent trace panel. The presenter changes role
using the authorised sign-in page and explains each handoff in the workspace.

This is an independent implementation prototype. It is not an official AICTE or
Government of India service. The 2026–27 application, current status, and evidence
package are simulated. Public BSIET facts and historical reports are reference
context only.

## Case in one sentence

Dr. Bapuji Salunkhe Institute of Engineering and Technology, Kolhapur, is used as
the real-institution context for a simulated 2026–27 Extension of Approval
application for B.E./B.Tech Computer Science & Engineering (AI & ML), intake 60.

## Before the presentation

1. Open the landing page and select **Authorized sign in**.
2. Use the role access codes shown on the sign-in page.
3. If a previous run changed the state, sign in as System Administrator and use
   **Reset state to initial seed**.
4. Explain that automated recommendations assist authorised officials; they do not
   issue a deficiency, verify evidence, approve an application, or replace an EVC.

## Seven-minute presentation route

### 1. Regional Officer — intake and assignment

Sign in as **Regional Officer — Rajesh Sharma**.

Say:

> The Western Regional Office receives the BSIET application, confirms the
> jurisdiction and intake package, and assigns the case to a technical reviewer.
> The queue shows the institution, programme, intake, academic year, current state,
> and responsible reviewer in one place.

Open **Reviewer Assignment** and assign **Dr. Arvind Joshi** if the assignment
button is available. Point out that the assignment is recorded in the audit trail.

### 2. Scrutiny Reviewer — handbook-grounded review

Sign in as **Scrutiny Reviewer — Dr. Arvind Joshi**.

Say:

> The reviewer sees only the scrutiny workspace. The system compares the submitted
> evidence with the cited AICTE Approval Process Handbook source and presents a
> potential evidence gap for human action.

Open the checklist and highlight:

- AICTE Approval Process Handbook 2024–25 to 2026–27.
- Annexure 4, Section 4.1.
- PDF pages 92–93.
- Undergraduate Engineering and Technology computer ratio of 1:10.
- Minimum 20 computers and a separate departmental computer laboratory.
- Synthetic inventory showing 16 computers.

Emphasise:

> This is not an automatic violation finding and it is not a claim about BSIET.
> The correct action is to request corroborating inventory, installation,
> availability, and programme-category evidence.

Create the clarification request. Do not describe the old unsupported GPU rule.

### 3. Institution Representative — response and submission

Sign in as **Institution Representative — Prof. Sunita Patil**.

Open **Clarifications** or **Submit Response**.

Say:

> The institution receives a structured request rather than an informal email.
> It can provide a response and upload supplementary evidence against the exact
> clarification.

Submit the prefilled synthetic response and the updated inventory attachment.
Point out that the submitted document moves to a pending verification state. The
institution cannot mark its own evidence as verified.

### 4. Document Verifier — evidence sign-off

Sign in as **Document Verifier — Meera Deshmukh**.

Open the comparison queue and select the updated inventory.

Say:

> The verifier compares the uploaded record, OCR fields, inventory count, and
> supporting records. The agent may prepare an extraction or comparison, but the
> verifier owns the sign-off.

Run OCR if needed, review the extracted fields, and choose the appropriate
verification outcome. Use **Verified** only when demonstrating the successful
handoff. Explain that a rejected or re-verification outcome remains visible and
auditable.

### 5. Scrutiny Reviewer — close the clarification

Return to the Scrutiny Reviewer account.

Open **Clarifications** and resolve the clarification only after verifier sign-off.

Say:

> The reviewer can now close the clarification because the evidence has passed the
> independent verification gate. The application records the reviewer note and
> preserves the evidence history.

Show that the workflow advances only when its prerequisites are met.

### 6. EVC Coordinator — inspection readiness

Sign in as **EVC Coordinator — Sanjeev Rao**.

Open **EVC Queue**, **Schedule**, and **Readiness**.

Say:

> Cases requiring an Expert Visit Committee are placed in a dedicated queue.
> The coordinator schedules the visit, records the panel and inspection mode, and
> submits observations and a report.

Schedule the visit, review the synthetic readiness items, and submit the report.
Make clear that the EVC report is a committee record, not an automated approval.

### 7. Decision Authority — controlled resolution

Sign in as **Decision Authority — Committee Representative**.

Open the approval inbox and decision gates.

Say:

> The decision authority receives a consolidated brief only after document
> verification, scrutiny closure, and EVC completion. The final resolution remains
> a human action with a recorded rationale and resolution number.

Review the gates and record the simulated decision. Explain that the prototype
supports approval, referral, and rejection paths, subject to the configured gates.

## Oversight roles to show briefly

### Independent Auditor

Sign in as **Independent Auditor** and show the application audit trail, hash-linked
ledger, integrity check, export package, and operations reports.

Say:

> The auditor has read-only visibility into who acted, what changed, when it
> changed, and whether the audit chain remains intact.

### Workflow Administrator

Show the route configuration, state transitions, rule mapping, version history,
and validation screens.

Say:

> Workflow rules and stage combinations are configurable and versioned. This
> allows the organisation to align the process with the applicable handbook and
> authorised administrative procedure.

### System Administrator

Show RBAC, integration status, notification outbox, health, and reset controls.

Say:

> Platform administration is separated from regulatory decision-making. Role
> boundaries, integration health, notifications, and reset controls are managed
> here without exposing other roles' workspaces.

## Requirement coverage to state explicitly

Covered in the prototype:

- Role-isolated dashboards and permissions.
- Application intake, assignment, clarification, response, verification, EVC,
  decision, and audit handoffs.
- Human-controlled rule evaluation and decision gates.
- Handbook source, clause, page, applicability, evidence, and reasoning fields.
- Pending, approaching, overdue, compliance, undertaking, and document-validity
  operations surfaces.
- Notifications, escalation records, reporting, and append-only audit events.

Prototype-simulated:

- Current BSIET application status and all 2026–27 evidence.
- External gateways and integrations.
- Automated notifications and scheduled escalation execution.
- Secure production document storage and deployment security controls.

Not claimed:

- The prototype does not claim that BSIET has a real deficiency.
- The prototype does not claim that the historical 2022–23 reports are a
  2026–27 application.
- The prototype does not claim a 40-GPU-workstation requirement.
- AI recommendations do not replace statutory scrutiny, inspection, verification,
  or competent-authority decisions.

## Closing statement

> AADHAR demonstrates one connected, role-controlled operating model for approval
> processing and institutional compliance. It reduces manual follow-up while
> preserving source citations, evidence review, authorised human action, escalation
> visibility, and a complete audit trail.
