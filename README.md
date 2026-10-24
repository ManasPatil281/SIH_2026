# AADHAR — AI-Assisted Digital Handling & Automated Regulatory Scrutiny

> **Smart India Hackathon Demonstration Prototype**
> *Independent demonstration prototype. Not an official AICTE or Government of India service. All records and AI outputs are simulated.*

---

## 1. Project Overview

**AADHAR** is an institutional regulatory scrutiny portal prototype inspired by AICTE's public-facing architecture and administrative approval workflows. It demonstrates how AI-assisted document review, handbook-grounded Agentic RAG, and role-isolated workflow automation can organize academic regulatory scrutiny while keeping consequential decisions strictly under human control.

### Core Architectural Features

- **Genuine Simulated RBAC**: 9 distinct administrative personas, each with its own navigation sidebar, permitted actions, and jurisdiction scope.
- **Applicant & Role Isolation**: Applicants cannot access internal reviewer deliberations; Document Verifiers authenticate deeds independently; Independent Auditors hold strictly read-only oversight.
- **Deterministic 12-Stage State Engine**: Case state machine enforcing prerequisite statutory gates before consequential decisions can be recorded.
- **9 Specialized Regulatory Agents**: Step-by-step 10-stage execution traces explaining context, rules evaluated against APH 2026–27 norms, and proposed actions.
- **AADHAR Copilot (Agentic RAG)**: Grounded in indexed AICTE Approval Process Handbook (APH 2026–27) clauses with retrieval traces, evidence comparisons, and plain-English regulatory reasoning.
- **Automated OCR & Evidence Comparison**: Entity extraction for land sale deeds, PMRDA building occupancy plans, Maharashtra Fire NOCs, and lab equipment invoices.
- **Tamper-Evident Audit Ledger**: Append-only event history with simulated SHA-256 cryptographic hash pointers and JSON export for regulatory vigilance.

---

## 2. Nine Demo Roles & Credentials

| # | Role | Demo Identity | Department / Scope | Default PIN | Route |
|---|------|---------------|-------------------|-------------|-------|
| 1 | **Regional Officer / Intake** | Rajesh Sharma | Western Regional Office (Mumbai / Pune) | `1001` | `/regional/dashboard` |
| 2 | **Scrutiny Reviewer** | Dr. Arvind Joshi | Computer Science Scrutiny Panel | `1002` | `/reviewer/dashboard` |
| 3 | **Institution Representative** | Prof. Sunita Patil | Demo Institute of Technology (DIT-MH-0492) | `1003` | `/institution/dashboard` |
| 4 | **Document Verifier** | Meera Deshmukh | Document Verification & Records Wing | `1004` | `/verifier/dashboard` |
| 5 | **EVC Coordinator** | Sanjeev Rao | Directorate of Inspection & Logistics | `1005` | `/evc/dashboard` |
| 6 | **Decision Authority** | Committee Chair | Standing Hearing & Apex Committee (SHC) | `1006` | `/decision/dashboard` |
| 7 | **Workflow Administrator** | Ananya Roy | Governance, Norms & Workflow Architecture | `1007` | `/workflow-admin/dashboard` |
| 8 | **Independent Auditor** | Demo Auditor | Chief Vigilance Oversight (Read-Only) | `1008` | `/auditor/dashboard` |
| 9 | **System Administrator** | Vikram Sen | National Portal Systems & Integrations | `1009` | `/system-admin/dashboard` |

---

## 3. Guided 11-Step Hackathon Demonstration Journey

The built-in **SIH Demo Guide** bar docked at the bottom of the screen guides the presenter through the complete end-to-end regulatory story:

1. **Regional Officer**: Inspect intake completeness for Docket `AADHAR-BSIET-2026-27` (B.E./B.Tech CSE (AI & ML), 60 Seats) and assign Senior Reviewer Dr. Arvind Joshi. State moves to `UNDER_SCRUTINY`.
2. **Scrutiny Reviewer**: Run the Scrutiny Review Agent. Notice that the synthetic inventory lists 16 computers and lacks corroborating installation/availability evidence. The agent cites APH 2024–25 to 2026–27 Annexure 4, Section 4.1, pages 92–93 and flags a potential evidence gap for human review.
3. **Clarification Notice**: Query AADHAR Copilot for normative guidance and issue Clarification `CLR/2026/01`. State moves to `CLARIFICATION_REQUIRED`.
4. **Institution Representative**: Switch to Prof. Sunita Patil. Inspect the simulated clarification and upload updated inventory, installation, availability, and corroborating evidence. State moves to `CLARIFICATION_SUBMITTED`.
5. **Document Verifier**: Switch to Meera Deshmukh. Inspect OCR extracted entities, compare with application declarations, and mark supplementary evidence as `VERIFIED`.
6. **Scrutiny Reviewer**: Review verified evidence, mark Clarification `CLR/2026/01` as `RESOLVED`. Scrutiny checklist reaches 100% satisfied; state advances to `SCRUTINY_COMPLETED`.
7. **EVC Coordinator**: Inspect why physical inspection is `NOT_REQUIRED` for compliant institutions under APH Cl. 2.14, or simulate an inspection trigger.
8. **Decision Authority**: Inspect executive brief. Confirm that all 4 prerequisite gates (Document Verification, Checklist, Clarifications, EVC) have passed. Sign and record formal Approval Resolution `#SHC-WR-2026-0492`. State advances to `APPROVED`.
9. **Independent Auditor**: Verify the append-only audit trail, run cryptographic hash verification across all blocks, test read-only policy enforcement, and export the audit package (JSON).
10. **Workflow Administrator**: Inspect the 12-state transition matrix and validate rule revisions.
11. **System Administrator**: Review the 9-role RBAC permission matrix, test simulated DigiLocker/IGR connectors, inspect the notification queue, or reset the demo state.

---

## 4. Local Execution

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Compile and typecheck
npm run lint
npm run build
```

---

## 5. Committee Workflow Demo

The uploaded committee process is implemented in the Workflow Administrator dashboard as a role-mapped journey with deficiency loops, agent assistance, and LOA/LOR outcomes. The complete presenter script is available in [DEMO_USE_CASE.md](./DEMO_USE_CASE.md).

---

## 6. Prototype Notice

Independent demonstration prototype created for the Smart India Hackathon. It does not represent an official AICTE or Government of India portal. All records, identities, and AI outputs are simulated locally.
