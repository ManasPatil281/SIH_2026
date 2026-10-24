# NIVARAN

### Integrated AICTE Approval Workflow Automation, Compliance Monitoring and Alert Management

> **Smart India Hackathon demonstration prototype**  
> Nivaran is an independent prototype for demonstrating an AICTE approval-workflow concept. It is **not** an official AICTE or Government of India service. The application, identities, evidence, workflow activity, integrations, and agent outputs shown in the demo are simulated unless explicitly identified as public reference material.

Nivaran brings the main actors and handoffs of an approval case into one role-oriented web experience: regional intake, scrutiny, institutional response, document verification, Expert Visit Committee (EVC) coordination, committee decision support, workflow administration, operations monitoring, and audit review. It demonstrates how software can make pending work and evidence gaps easier to see while leaving regulatory verification and decisions with authorised people.

## Contents

- [Problem and goals](#problem-and-goals)
- [What the prototype demonstrates](#what-the-prototype-demonstrates)
- [Problem Statement 26262 coverage](#problem-statement-26262-coverage)
- [Controlled BSIET demonstration case](#controlled-bsiet-demonstration-case)
- [Roles and demo access](#roles-and-demo-access)
- [End-to-end demonstration flow](#end-to-end-demonstration-flow)
- [Application workflow](#application-workflow)
- [Architecture and implementation](#architecture-and-implementation)
- [Project structure](#project-structure)
- [Run locally](#run-locally)
- [Using the demo](#using-the-demo)
- [Prototype boundaries and safeguards](#prototype-boundaries-and-safeguards)
- [Related demo material](#related-demo-material)

## Problem and goals

**Problem Statement 26262** describes the need for a unified, configurable platform to coordinate AICTE approval processing and related institutional compliance. Applications may pass through different combinations of scrutiny, EVC, and SAC/SHC stages. Alongside application movement, officials and institutions need visibility into case ageing, assigned responsibility, time-bound undertakings, compliance submissions, document validity, and overdue actions.

Nivaran demonstrates a single operating view for these activities. Its prototype aims to show how role-specific queues, recorded handoffs, deadline and escalation surfaces, and source-aware evidence review could reduce manual follow-up and improve transparency. It is a **workflow concept demonstration**, not a replacement for existing authorised AICTE systems, applicable Approval Process Handbook (APH) rules, statutory procedures, or competent authorities.

### Intended outcomes

- Make case ownership, workflow stage, and outstanding actions visible to the relevant demo roles.
- Demonstrate configurable processing routes and guarded human handoffs.
- Bring clarifications, evidence review, EVC coordination, and decision gates into one case narrative.
- Surface deadlines, undertakings, compliance records, document expiry, and escalations.
- Preserve a reviewable sequence of simulated actions and decisions.
- Keep recommendations distinct from authorised verification, inspection, and decision-making.

## What the prototype demonstrates

- **Role-oriented workspaces:** separate navigation and dashboard areas for nine roles, with route checks and role-specific action checks in the client application.
- **Application intake and assignment:** a Western Region case queue with an example assignment from the Regional Officer to a scrutiny reviewer.
- **Scrutiny and handbook references:** a reviewer checklist, evidence context, a local handbook-passage matcher, and a clarification drafting flow.
- **Institution response:** a simulated clarification response and supplementary evidence record.
- **Document review:** OCR/evidence comparison screens with extracted-field examples and human verification outcomes.
- **EVC coordination:** readiness and scheduling views, configurable inspection routing, report entry, and sign-off surfaces.
- **Decision gates:** a decision workspace that brings together document verification, scrutiny, clarification, and EVC gate status before a simulated committee decision.
- **Workflow configuration:** route selection, a displayed 12-status workflow, revision proposals, and workflow administration screens.
- **Operations monitoring:** deadline and pendency lists, EVC and compliance context, undertaking tracking, document validity, and escalation acknowledgement.
- **Audit and reporting:** an audit-event timeline, integrity-check demonstration, and JSON export of the case data.
- **Agent interaction traces:** deterministic, local agent simulations that explain proposed actions and show where human review is expected.

The UI includes screens and controls intended to illustrate the wider Problem Statement 26262 scope. Their presence does not mean that the prototype has production schedulers, external services, or automated background processing; see [Prototype boundaries and safeguards](#prototype-boundaries-and-safeguards).

## Problem Statement 26262 coverage

| Problem statement area | Nivaran prototype surface |
|---|---|
| End-to-end approval workflow | Application intake, reviewer assignment, scrutiny checklist, clarification, evidence verification, EVC, decision gates, and workflow status |
| Applicable processing routes | Selectable **Only Scrutiny**, **Scrutiny + EVC**, **EVC + SAC/SHC**, and **Only EVC** route options |
| Authorised movement and return | Role-checked actions, prerequisite checks for selected handoffs, recorded reasons/notes in the case history, and a return-for-action status in the workflow model |
| Dashboard and pendency monitoring | Role-specific queues and an integrated view of deadlines, overdue actions, escalation records, and case status |
| EVC scheduling and alerts | EVC readiness, schedule and report workspaces, EVC status/deadline records, and escalation visibility |
| Undertakings and compliance | Records with due dates and statuses, institution submission actions, verifier review, and operations views |
| Lease and document validity | Document expiry/renewal fields, validity views, renewal actions, and overdue/approaching-expiry demonstration data |
| Notifications and escalation | In-app notification records, priority labels, escalation records, and acknowledgement actions |
| Reporting and audit | Case audit timeline, operations reports, integrity-check screen, and downloadable JSON case package |
| Configurable APH-aligned rules | Workflow route and revision administration surfaces, plus handbook passages used in the controlled scrutiny scenario |
| Secure role access and confidentiality | Client-side role switching, role-specific navigation, route guards, and permission checks as a demonstration of RBAC concepts |
| Integration with authorised systems | Mock integration/connector status surfaces only; live AICTE or other government-system connectivity is not implemented |
| Human oversight | Agents present simulated suggestions; reviewers, verifiers, EVC coordinators, and decision authorities are represented as the owners of their respective actions |

## Controlled BSIET demonstration case

The guided case uses **Dr. Bapuji Salunkhe Institute of Engineering and Technology (BSIET), Kolhapur** as a real-institution reference context for a **synthetic** 2026–27 Extension of Approval (EoA) scenario:

- **Programme:** B.E./B.Tech Computer Science & Engineering (AI & ML)
- **Proposed intake:** 60
- **Case ID in the seed data:** `AADHAR-BSIET-2026-27` (a legacy identifier retained in the demo data; the product name is Nivaran)
- **Example evidence issue:** a synthetic department inventory lists 16 computers and lacks corroborating installation and availability evidence.

### Provenance matters

| Material | How to interpret it |
|---|---|
| Public institutional information and public AICTE material | Reference context only; not proof of a current application outcome |
| Historical application/deficiency/approval reports for 2022–23 | Historical reference documents; they are not the synthetic 2026–27 application |
| 2026–27 BSIET EoA case, status, identities, and evidence | Simulated prototype data |
| Computer inventory, invoice, installation, and availability records | Synthetic test evidence; not a finding about BSIET |

### Handbook-grounded scrutiny example

The controlled scenario refers to **AICTE Approval Process Handbook 2024–25 to 2026–27, Annexure 4, Section 4.1 — Computers, Software and Internet, PDF pages 92–93**. The local handbook passage describes a 1:10 PC/laptop-to-student ratio subject to a minimum of 20 PCs and a separate departmental computer laboratory with at least 20 computers for the applicable undergraduate Engineering and Technology context.

For the synthetic 60-seat case, the example inventory is treated as a **potential evidence gap requiring corroboration and human review**. It is not an automatic violation finding, not a legal deficiency, and not a claim about the real institution. The appropriate demonstration action is to request and independently review inventory, installation, availability, and programme-category evidence.

Generated or displayed agent findings should be interpreted with their source, applicability, evidence, reasoning, uncertainty, and human-review context. Do not use this case to claim a GPU/workstation requirement, or to present historical reports as evidence for the synthetic 2026–27 application.

## Roles and demo access

The sign-in screen provides convenient role switching for the demo. The codes below are public **demo access codes**, not real credentials.

| Role | Demo identity | Code | Workspace |
|---|---|---:|---|
| Regional Officer / Intake | Rajesh Sharma | `1001` | `/regional/dashboard` |
| Scrutiny Reviewer | Dr. Arvind Joshi | `1002` | `/reviewer/dashboard` |
| Institution Representative | Prof. Sunita Patil | `1003` | `/institution/dashboard` |
| Document Verifier | Meera Deshmukh | `1004` | `/verifier/dashboard` |
| EVC Coordinator | Sanjeev Rao | `1005` | `/evc/dashboard` |
| Committee / Decision Authority | Demo Committee Representative | `1006` | `/decision/dashboard` |
| Workflow Administrator | Ananya Roy | `1007` | `/workflow-admin/dashboard` |
| Independent Auditor | Independent Demo Auditor | `1008` | `/auditor/dashboard` |
| System Administrator | Vikram Sen | `1009` | `/system-admin/dashboard` |

The auditor role is intended to be read-only in the prototype. The workflow and system administration roles expose configuration, mock integration, notification, health, and demo-reset surfaces; they do not represent access to a production AICTE environment.

## End-to-end demonstration flow

1. **Regional intake:** review the case context and assign it to the scrutiny reviewer.
2. **Scrutiny:** inspect the checklist and handbook citation; review the synthetic computer inventory and the missing corroboration.
3. **Clarification:** draft and issue a structured request for additional evidence, with a deadline.
4. **Institution response:** submit a simulated response and supplementary evidence record.
5. **Document verification:** inspect extracted fields and comparison details, then record a human verification outcome.
6. **Clarification resolution:** return to scrutiny and resolve or continue the clarification only after the verifier handoff is complete.
7. **EVC coordination:** review readiness, configure whether EVC is required, and demonstrate scheduling/reporting as applicable.
8. **Decision:** inspect the available gate statuses and record a clearly labelled simulated decision, referral, or rejection path.
9. **Audit:** inspect recorded events, run the simulated integrity check, and export the case package as JSON.
10. **Operations and governance:** review routes, workflow revisions, due dates, compliance/undertaking records, document validity, escalations, role permissions, mock integrations, and reset controls.

Not every route requires every stage. The configured route and recorded authorised actions determine the intended handoff for the demonstration; no route should be interpreted as a statement of current AICTE procedure.

## Application workflow

The TypeScript application model defines these 12 application statuses:

`SUBMITTED` → `UNDER_SCRUTINY` → `CLARIFICATION_REQUIRED` → `CLARIFICATION_SUBMITTED` → `DOCUMENT_VERIFICATION_PENDING` → `SCRUTINY_COMPLETED` → `EVC_PENDING` → `EVC_COMPLETED` → `DECISION_PENDING` → `APPROVED`

Additional modeled outcomes include `REJECTED` and `RETURNED_FOR_ACTION`. Actual case progression depends on the user actions and checks implemented in the prototype. The displayed sequence is an illustrative case workflow, not an authoritative statement of all APH routes or statutory process.

The case data model groups:

- Institution, region, programme, academic year, intake, status, and reviewer assignment.
- Documents, OCR-extracted fields, validity/expiry information, and verification status.
- Scrutiny checklist entries, findings, clarification requests, and institutional responses.
- EVC requirement, schedule, team, observations, recommendation, and report state.
- Decision gates, committee resolution details, rationale, and conditions.
- Processing route, deadlines, undertakings, compliance records, and escalations.
- Notifications, workflow revisions, agent execution traces, and audit events.

## Architecture and implementation

Nivaran is a client-side single-page application built with React and TypeScript. React Router maps public pages and role-specific workspaces. Shared case state and demo actions live in a React context, seed records initialize the scenario, and browser `localStorage` preserves demo state between reloads in the same browser.

```text
Browser
└── React + TypeScript SPA
    ├── Public landing page and demo sign-in
    ├── Role-specific workspaces
    ├── Route guards and client-side permission checks
    ├── Shared case state and localStorage persistence
    ├── Seed case, demo users, and handbook passages
    └── Deterministic agent / Copilot demonstrations
```

### Technology

- **Frontend:** React 19, TypeScript
- **Build tool:** Vite 8
- **Styling:** Tailwind CSS 4, custom CSS
- **Routing:** React Router 7
- **UI icons:** Lucide React
- **AI agent frameworks:** LangChain, LangGraph
- **LLM integration:** Google Gemini API
- **Database:** Firebase Firestore
- **Authentication:** Firebase Authentication
- **State management:** React Context API
- **Backend:** Node.js, Express.js
- **Development tools:** npm, TypeScript, Vite
- **AI architecture:** LangChain for agent and tool integration; LangGraph for stateful, multi-step agent workflows.
- **Data layer:** Firebase Firestore for application data storage and Firebase Authentication for user identity management.

The current demonstration still uses seeded in-repository data, browser `localStorage`, and deterministic local agent simulations. Firebase services, LangChain/LangGraph workflows, and production backend integrations are not implemented in this prototype; the stack above describes the target application architecture.

### Important implementation interpretation

- The role model and guards run in the browser and are for demonstration; they are not server-side authentication or an enforceable production security boundary.
- Agent execution and handbook retrieval are local simulations over bundled data. They do not constitute a live AI, authoritative regulatory interpretation, or connection to an external records system.
- OCR/evidence screens demonstrate fields and review steps with seeded or simulated records. They do not establish production-grade OCR or secure document storage.
- Notifications, deadlines, and escalations are represented as application state and UI records. The prototype does not run a production scheduler or guarantee delivery of external alerts.
- The audit history and integrity-check experience are demonstrative. The current event signature is a simple simulated hash, not a cryptographic SHA-256 implementation or tamper-proof ledger.

## Project structure

```text
SIH_2026/
├── src/
│   ├── App.tsx                    Routes and workspace composition
│   ├── main.tsx                  React entry point
│   ├── types/index.ts            Roles, case, workflow, document, and event types
│   ├── data/seedData.ts          Initial synthetic case and demo records
│   ├── lib/
│   │   ├── agents/                Deterministic agent simulation
│   │   ├── copilot/               Bundled handbook passages and local retrieval
│   │   ├── state/                 Shared application state and demo actions
│   │   ├── demo-users.ts          Role identities and demo access codes
│   │   ├── navigation.ts          Role-specific navigation
│   │   └── permissions.ts         Client-side role/action checks
│   ├── components/
│   │   ├── common/                Brand, document, agent, and operations UI
│   │   └── layout/                Application shell and route guard
│   └── pages/
│       ├── LandingPage.tsx        Public prototype overview
│       ├── LoginPage.tsx          Demo role selection
│       ├── regional/              Intake and reviewer assignment
│       ├── reviewer/              Scrutiny, clarifications, Copilot, agent demo
│       ├── institution/           Application, documents, response, compliance
│       ├── verifier/              Document verification and validity
│       ├── evc/                   EVC scheduling and report
│       ├── decision/              Decision gates and history
│       ├── workflow/              Routes, transitions, and workflow governance
│       ├── auditor/               Audit, integrity, export, and reports
│       └── sysadmin/              Role matrix, mock integrations, and reset
├── DEMO_USE_CASE.md               Scenario provenance and guided case flow
├── DEMO_PRESENTATION_SCRIPT.md    Presenter script and talk track
├── package.json                   Dependencies and npm scripts
├── tsconfig.json                  TypeScript configuration
└── vite.config.ts                 Vite, React, and Tailwind configuration
```

## Run locally

### Prerequisites

- Node.js compatible with the installed Vite release.
- npm (or Bun, if you prefer the included `bun.lock`).

### Install and start

From the `SIH_2026` project directory:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (the development server is configured for port `3000`). To create and serve a production build:

```bash
npm run build
npm run preview
```

### Available scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server on port 3000 |
| `npm run build` | Bundle the production frontend with Vite |
| `npm run preview` | Serve the built frontend locally for preview |
| `npm run lint` | Type-check with TypeScript using `tsc --noEmit` |
| `npm run clean` | Remove the build output and `server.js` (uses a Unix-style `rm` command; adapt it if running on native Windows PowerShell) |

There is no test script defined in the current `package.json`.

## Using the demo

1. Open the landing page and choose **Authorized sign in** or a role shortcut.
2. Select a demo role; the access code is shown on the sign-in screen and in the table above.
3. Follow the flow in [End-to-end demonstration flow](#end-to-end-demonstration-flow), switching roles at each authorised handoff.
4. If a previous run has changed the case, sign in as **System Administrator** and use **Reset state to initial seed**.
5. Treat all resulting case updates as local demo state in that browser.

For a presenter-friendly seven-minute path and suggested narration, use [DEMO_PRESENTATION_SCRIPT.md](./DEMO_PRESENTATION_SCRIPT.md). For case provenance, scrutiny framing, detailed role journey, and requirement mapping, see [DEMO_USE_CASE.md](./DEMO_USE_CASE.md).

## Prototype boundaries and safeguards

- **Regulatory safeguard:** the product concept is intended to operate under applicable AICTE regulations, the current APH, and authorised administrative procedures. Automated suggestions and workflow aids must not replace statutory scrutiny, evidence verification, inspection, or decisions reserved for competent authorities.
- **No official affiliation:** this is an independent SIH prototype, not an official AICTE or Government of India portal.
- **Synthetic scenario:** the 2026–27 BSIET case, application status, role identities, current evidence package, and outcomes are simulated. Do not attribute the sample evidence gap or any proposed finding to the real institution.
- **No live integration:** DigiLocker, IGR, GSTN, Bharatkosh, AICTE, email/SMS, and other connector references are mock or illustrative. Integration with authorised systems is not implemented here.
- **No production identity or storage layer:** demo identity switching is client-side; data is stored in browser `localStorage`. Do not enter real personal, institutional, or confidential records.
- **No background automation guarantee:** the UI may show reminders, due dates, or escalations, but there is no production notification delivery or scheduled escalation service.
- **No cryptographic audit guarantee:** the hash-chain and integrity views are simulated and are not evidence of cryptographic integrity, immutability, or legal admissibility.
- **No live AI guarantee:** agent and handbook retrieval behavior is deterministic/local in the current implementation. Any future AI integration would require its own security, privacy, evaluation, and human-review controls.
- **APH verification:** handbook references in the demo should be checked against the applicable official handbook and current rules by the responsible authority before operational use.

## Related demo material

- [DEMO_USE_CASE.md](./DEMO_USE_CASE.md) — case provenance, scrutiny rule, requirement coverage, and guided role sequence.
- [DEMO_PRESENTATION_SCRIPT.md](./DEMO_PRESENTATION_SCRIPT.md) — presenter setup, talk track, and closing statement.
