# Nivaran Controlled Case Study 2: New Technical Campus Establishment (VESIT Chembur)

## Purpose

This second controlled case study demonstrates **end-to-end coverage of every deliverable and outcome specified in AICTE Problem Statement 26262**. While Case Study 1 (BSIET Kolhapur) focuses on Scrutiny-level computer inventory clarification for an existing institution, **Case Study 2 (VESIT Chembur, Mumbai)** models the complete, multi-stage approval workflow for **Setting up a New Technical Institution / Campus**.

It spotlights:
1. **Mandatory EVC Scheduling & Alerts for New Institutions** (APH Chapter I).
2. **Lease Document Validity & Expiry Engine** (30-year registered lease, advance expiry alerts, renewal submission & OCR reverification).
3. **Time-Bound Undertakings & Compliance Tracking** (Joint FDR / Endowment Fund pledge, 180-day Municipal Occupancy completion, and barrier-free access).
4. **Configurable Stage Routing & Authorised Revert/Return** (`Scrutiny + EVC` and conditional referral to `Standing Hearing Committee (SHC)`).
5. **Multi-Region Pendency & Ageing Monitoring** (Western Region Mumbai Metro desk vs. Rest of Maharashtra).
6. **Multi-Tier Automated Escalation & Cryptographic Audit Trail**.

---

## Case Provenance & Real-World Alignment

| Layer | Demo Value | How to Describe It |
|---|---|---|
| **Public Institutional Reference** | **Vivekanand Education Society's Institute of Technology (VESIT), Chembur, Mumbai**; promoted by Vivekanand Education Society (VES) | Real public trust & renowned educational campus context in Chembur, Mumbai Metro, used for realistic regional and legal structure |
| **Society / Trust** | Vivekanand Education Society (VES), Hashu Advani Memorial Complex, Chembur, Mumbai | Real public charitable trust (Regd. No. F-1023 (Bom)) |
| **Affiliating University** | University of Mumbai (MU), Fort Campus, Mumbai | Real affiliating body providing in-principle consent for technical programmes |
| **Application Type** | **Setting up New Technical Institution / Campus** for simulated Academic Year 2026–27 | Synthetic prototype scenario modeled strictly on APH Chapter I procedures |
| **Programmes & Intake** | B.Tech Artificial Intelligence & Data Science (120) + B.Tech Cyber Security & IoT (60) — Total Intake: 180 Seats | Emerging area programmes subject to mandatory preliminary scrutiny and physical EVC |
| **Evidence Package** | 30-year registered lease deed from Collector of Mumbai Suburban District, joint FDR deposit receipt, municipal construction sanction (MCGM), and lab procurement orders | Synthetic test evidence package; not an actual regulatory finding about VES Trust |

> **Presentation Safeguard:**  
> Introduce this scenario as a **controlled demonstration of the AICTE New Institution Approval Journey**. All applicant submissions, inspection reports, committee resolutions, and deficiency notes are synthetic test cases.

---

## Defensible Scrutiny & Regulatory Rules (APH 2024–27 Alignment)

### 1. Mandatory Physical EVC for New Technical Institutions
* **Source:** *AICTE Approval Process Handbook 2024–25 to 2026–27, Chapter I, Clause 1.8 (Grant of Approval for Establishment of New Technical Institution).*
* **Rule:** All applications for new technical institutions must be physically inspected by an Expert Visit Committee (EVC) following successful preliminary document scrutiny before any Letter of Approval (LoA) can be issued.
* **System Behaviour:** System automatically identifies the application category, prohibits the `ONLY_SCRUTINY` shortcut, enforces `SCRUTINY_PLUS_EVC`, and places the application in the **High-Priority EVC Queue** with a 15-day statutory SLA.

### 2. Land Lease Document Validity & Expiry Monitoring
* **Source:** *AICTE Approval Process Handbook, Chapter I, Clause 1.4 & Clause 1.5 (Land and Document Norms for Metro/Urban areas).*
* **Rule:** In Mega/Metro cities (Mumbai Municipal Corporation / MMR jurisdiction), a minimum of 2.5 acres (or 5.0 acres for multi-discipline) of continuous land on a registered lease deed of **not less than 30 years** is mandatory. The lease deed must have up-to-date periodic ground-rent renewals and clear title without encumbrance.
* **System Behaviour:**
  * System extracts the lease term (Lease start: 2001, expiry: 2031 — 30 years).
  * Detects that the **Annual Collector Office / Sub-Registrar Lease Endorsement & Rent Renewal is expiring in 32 days** (`renewalStatus: DUE_SOON`).
  * Triggers an **Automated Advance Expiry Alert** to the applicant institution.
  * Allows online submission of renewed registration receipt, runs OCR cross-verification, and escalates to Regional Officer if unfulfilled.

### 3. Time-Bound Undertakings & Compliance Milestones
* **Source:** *AICTE Approval Process Handbook, Chapter I, Clause 1.12 & Chapter IV.*
* **Rule:** Approvals for new institutions are granted subject to:
  1. **Joint Fixed Deposit Receipt (FDR) / Endowment Fund:** ₹1.00 Crore pledged jointly in the name of Vivekanand Education Society (VES) and Regional Officer, AICTE for a maturity of 10 years.
  2. **Municipal Occupancy / Completion Certificate:** Submission of final Building Occupancy Certificate from Municipal Corporation of Greater Mumbai (MCGM) within 180 days of provisional approval.
  3. **Barrier-Free Environment:** Completion of tactile pavers and dedicated elevator access prior to start of academic session.
* **System Behaviour:** Digitally tracks each undertaking with hard deadlines, automated countdowns, evidence upload portals, and escalation triggers if unfulfilled.

---

## Complete End-to-End Persona Journey (All 9 Roles)

```
[1. Regional Officer (Intake & Routing)]
            │  (Validates intake, selects SCRUTINY_PLUS_EVC, assigns Senior Reviewer)
            ▼
[2. Scrutiny Reviewer (Regulatory Checklist)]
            │  (Validates 4.2 Ac lease in Chembur, 7,850 sq.m area, flags EVC requirement & lease renewal)
            ▼
[3. Document Verifier (OCR & Lease Expiry Engine)]
            │  (Verifies 30-Yr Lease Deed; issues advance renewal alert for lease rent endorsement)
            ▼
[4. Institution Representative (Response & Undertakings)]
            │  (Submits renewed Sub-Registrar lease receipt; pledges ₹1.00 Cr Joint FDR Undertaking)
            ▼
[5. EVC Coordinator (New Institution Inspection Queue)]
            │  (Places docket in Priority EVC Queue; schedules physical inspection team; submits report)
            ▼
[6. Scrutiny & Apex Reviewer (Gating & Authorised Movement)]
            │  (Checks all 4 gates cleared: Land, Lease, EVC Report, FDR Undertaking)
            ▼
[7. Decision Authority (SAC / SHC Apex Resolution)]
            │  (Issues formal Letter of Approval (LoA) with conditional compliance clauses)
            ▼
[8. Independent Auditor (Tamper-Evident Ledger)]
            │  (Inspects append-only SHA-256 hash chain and exports case compliance dossier)
            ▼
[9. Workflow & System Administrators (SLA & Operations)]
               (Monitors regional pendency, workload distribution, and multi-tier escalation matrix)
```

---

## Step-by-Step Presenter Script for Case Study 2

### Step 1: Regional Officer — Rajesh Sharma (`1001`)
* Switch docket to `NIVARAN-VESIT-2026-27` in the Western Region Mumbai Desk.
* **Action:** Highlight that the application is for **Setting up a New Technical Institution** with 180 seats in Chembur, Mumbai Metro.
* **System Behaviour:** The intake validation engine automatically locks the processing route to `SCRUTINY_PLUS_EVC` (as per APH Chapter I regulations). Assign Senior Reviewer Dr. Arvind Joshi.

### Step 2: Scrutiny Reviewer — Dr. Arvind Joshi (`1002`)
* Open the **Scrutiny Checklist**.
* **Action:** Review Land Leased area (4.2 Acres in Collector's Colony, Chembur against 2.5 Acre Metro norm), Instructional Area (7,850 sq.m against 6,000 sq.m norm), and University Affiliation consent from Mumbai University.
* **System Behaviour:** The Copilot cites *APH 2024–27 Chapter I, Clause 1.8*, confirming that all prerequisite documentary gates are satisfied, but statutory progression requires an on-site physical EVC inspection.

### Step 3: Document Verifier — Meera Deshmukh (`1004`)
* Open **Document Verification & OCR Workspace**.
* **Action:** Inspect `doc-vesit-001` (30-Year Registered Collector/Government Land Lease Deed).
* **System Behaviour:**
  * OCR extracts Lease Duration (30 Years), Sub-Registrar Registration No. (`KRL-3/7124/2001`), and Annual Rent Renewal due date (`2026-11-30`).
  * System flags status as **`DUE_SOON` (32 Days Remaining)** and auto-generates a proactive alert in the institution's portal.

### Step 4: Institution Representative — Vivekanand Education Society (`1003`)
* Sign in to Applicant Portal.
* **Action:** 
  1. View the **Proactive Lease Expiry Alert** and upload the renewed Stamp Duty & Sub-Registrar Rent Endorsement.
  2. View **Time-Bound Undertakings** and submit the **₹1.00 Crore Joint FDR pledge receipt** with SBI Chembur Branch.
* **System Behaviour:** Items immediately shift to `SUBMITTED` state with timestamped receipt proofs.

### Step 5: EVC Coordinator — Sanjeev Rao (`1005`)
* Sign in to **EVC Coordination Workspace**.
* **Action:**
  1. Open **EVC Priority Queue**: Docket `NIVARAN-VESIT-2026-27` is pinned with an urgent SLA badge: *"New Technical Institution - Mandatory Physical Inspection Required"*.
  2. Propose expert inspection committee (e.g., Prof. S. N. Merchant, IIT Bombay & Prof. P. K. Khapre, VJTI Mumbai).
  3. Schedule physical visit date, enter site verification remarks (Continuous 4.2-acre campus demarcated, 14 smart classrooms ready, computing centre operational with 180 terminals, barrier-free ramps and elevators functional).
  4. Submit verified EVC Report with **`RECOMMENDED_APPROVAL`**.

### Step 6: Decision Authority — Apex Committee (`1006`)
* Sign in to **Decision Workspace**.
* **Action:**
  * Open the **Statutory Gating Dashboard**:
    * Gate 1: Land Title & 30-Yr Lease Verification — **PASSED**
    * Gate 2: Technical Scrutiny Checklist — **PASSED**
    * Gate 3: Physical EVC Inspection & Report Sign-Off — **PASSED**
    * Gate 4: Time-Bound Undertakings Pledged — **PASSED**
  * Record formal resolution: **`APPROVED_WITH_UNDERTAKINGS`** (Resolution No: `AICTE/WR/NEW-INST/2026/0481`).

### Step 7: Independent Auditor & Operations (`1008` / `1007`)
* Sign in as **Independent Auditor**.
* **Action:** Demonstrate that the entire sequence—intake, lease OCR verification, EVC queue assignment, site inspection report, and committee approval—forms an immutable, append-only SHA-256 hash chain with 0 integrity violations.
* Open the **Multi-Region Operations Dashboard** to display live ageing, pendency comparison (Western Region vs Northern Region), and closed escalations.

---

## Problem Statement 26262 Complete Verification Matrix

| Section | Mandatory PS Deliverable | Demonstrated in Case 2 (`VESIT`) |
|---|---|---|
| **A** | Dynamic Route Selection (`Scrutiny + EVC`, `EVC + SHC`) | Enforced `SCRUTINY_PLUS_EVC` for new campus |
| **A** | Authorised Revert / Return with recorded reasons | Return flow with deficiency memo preserved |
| **B** | Real-time consolidated dashboard across regions | Multi-docket view comparing Western & Northern dockets |
| **B** | Application ageing and processing bottlenecks | Displays 19 days in scrutiny, SLA alerts, and workload |
| **C** | Mandatory EVC for New Institutions | Pinned in Priority EVC queue with 15-day SLA |
| **C** | EVC reminders, roster allocation, and sign-offs | Expert selection, on-site checklist, and report upload |
| **D** | Digital records of time-bound undertakings | ₹1.00 Cr Joint FDR, 180-day Occupancy, Barrier-free ramps |
| **D** | Tracking submission & verification of undertakings | Online submission by Trust, verification by AICTE officer |
| **E** | Track validity & expiry of lease documents | 30-Year registered lease deed tracked to 2031 |
| **E** | Advance alerts for documents approaching expiry | Proactive alert triggered for periodic lease rent renewal |
| **E** | Online submission & OCR verification of renewed deed | Upload renewed stamp receipt, OCR verify, update validity |
| **F** | Configurable notifications & multi-tier escalations | Level 1 Reviewer $\rightarrow$ Level 2 RO $\rightarrow$ Level 3 Bureau Director |
| **F** | Complete digital audit trail of movement & decisions | SHA-256 hash-chain ledger exportable as JSON package |
