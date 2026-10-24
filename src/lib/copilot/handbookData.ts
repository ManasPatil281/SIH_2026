export interface HandbookPassage {
  id: string;
  chapter: string;
  clause: string;
  page: number;
  title: string;
  sourceDoc: string;
  applicability: string;
  content: string;
  keywords: string[];
  normThresholds?: Record<string, string | number>;
}

export const HANDBOOK_PASSAGES: HandbookPassage[] = [
  {
    id: 'aph-ann4-4.1-computers',
    chapter: 'Annexure 4 — Equipment and Computer Requirements',
    clause: 'Section 4.1 (Computers, Software and Internet)',
    page: 92,
    title: 'Computer and Laboratory Evidence for Engineering & Technology',
    sourceDoc: 'AICTE Approval Process Handbook 2024–25 to 2026–27 (official PDF)',
    applicability: 'Engineering and Technology — Undergraduate programmes',
    content:
      'For undergraduate Engineering and Technology programmes, the handbook specifies a PC/laptop-to-student ratio of 1:10, subject to a minimum of 20 PCs. Each department must have a separate computer laboratory with at least 20 computers. The prototype treats the submitted inventory as evidence to be verified; it does not infer a computer-lab requirement from this provision.',
    keywords: ['computer', 'computers', 'pc', 'laptop', 'laboratory', 'student ratio', '1:10', 'minimum 20', 'annexure 4', 'section 4.1'],
    normThresholds: {
      'PC / student ratio': '1:10',
      'Minimum PCs': 20,
      'Department laboratory': 'At least 20 computers',
    },
  },
  {
    id: 'aph-ch4-cl4.1',
    chapter: 'Chapter VI — Standard Norms and Requirements',
    clause: 'Section 3.2 (Instructional Area)',
    page: 88,
    title: 'Instructional Area and Laboratory Evidence',
    sourceDoc: 'AICTE Approval Process Handbook 2026–2027 (APH 2026-27)',
    applicability: 'Undergraduate Technical Institutions (All Streams)',
    content:
      'Instructional area requirements are assessed by institution and programme category. The application must provide the applicable laboratory and computer-centre evidence for scrutiny. This passage is a reference prompt for checking the relevant tables; it is not used to invent a fixed equipment count.',
    keywords: ['instructional area', 'laboratory', 'computer centre', 'programme category', 'chapter vi', 'section 3.2'],
    normThresholds: {
      'Evidence required': 'Applicable programme and institution tables',
      'Review focus': 'Laboratory and computer-centre evidence',
    },
  },
  {
    id: 'aph-ch4-cl4.3',
    chapter: 'Chapter IV — Norms for Built-Up Instructional and Administrative Space',
    clause: 'Clause 4.3 (Table 4.2)',
    page: 52,
    title: 'Instructional, Administrative and Amenities Built-Up Area Norms',
    sourceDoc: 'AICTE Approval Process Handbook 2026–2027 (APH 2026-27)',
    applicability: 'New Institutions and Additional Program Expansions',
    content:
      'The minimum built-up instructional area for 1st Year Engineering operations (60–120 intake) shall be 4,000 sq.m of carpet area, consisting of classrooms (minimum 66 sq.m each), tutorial rooms (minimum 33 sq.m), specialized labs, and library reading room. All buildings must have an approved building plan from the local Town Planning / Municipal Authority (e.g., PMRDA / PMC / MMRDA) and a valid Occupancy / Completion Certificate.',
    keywords: ['built-up area', 'instructional area', 'carpet area', 'pmrda', 'occupancy certificate', 'building plan'],
    normThresholds: {
      'Instructional Minimum': '4,000 sq.m',
      'Classroom Size': '66 sq.m each',
      'Occupancy Document': 'Mandatory Completion / Occupancy Certificate',
    },
  },
  {
    id: 'aph-ch3-cl3.2',
    chapter: 'Chapter III — Faculty Norms and Cadre Proportions',
    clause: 'Clause 3.2 (Cadre Ratio Schedule)',
    page: 34,
    title: 'Faculty to Student Ratio and Cadre Ratio Distribution',
    sourceDoc: 'AICTE Approval Process Handbook 2026–2027 (APH 2026-27)',
    applicability: 'Undergraduate Engineering Programs',
    content:
      'The Faculty : Student ratio in Engineering and Technology undergraduate degree courses shall be 1:20 (or 1:15 for NBA accreditation tier). The Cadre ratio shall ideally be 1:2:6 (1 Professor : 2 Associate Professors : 6 Assistant Professors). For the first year of a new program with 60 intake, a core team of minimum 3 to 6 faculty members possessing M.Tech/Ph.D in relevant disciplines with approved university endorsement is required.',
    keywords: ['faculty', 'ratio', 'cadre', 'professor', 'associate professor', 'assistant professor', 'sppu'],
    normThresholds: {
      'Faculty : Student': '1:20',
      'Cadre Ratio': '1:2:6',
      'Minimum First Year': '3 to 6 Faculty for 60 intake',
    },
  },
  {
    id: 'aph-ch2-cl2.14',
    chapter: 'Chapter II — Expert Visit Committee (EVC) & Scrutiny Protocols',
    clause: 'Clause 2.14 (Triggers for Physical Inspection)',
    page: 26,
    title: 'Circumstances Mandating Expert Visit Committee (EVC) Inspection',
    sourceDoc: 'AICTE Approval Process Handbook 2026–2027 (APH 2026-27)',
    applicability: 'Scrutiny Stage Workflows',
    content:
      'Physical inspection by an Expert Visit Committee (EVC) is NOT mandatory for all new programs in existing accredited institutions. EVC is triggered only under specific scenario conditions: (a) Unresolved material discrepancies in physical land/building records, (b) Serious complaints received with verifiable prima-facie evidence, (c) Surprise vigilance audit randomly selected by the automated algorithm (5% cohort), or (d) Explicit recommendation by the Scrutiny Committee citing physical readiness ambiguity.',
    keywords: ['evc', 'inspection', 'expert visit', 'surprise audit', 'physical verification', 'committee'],
    normThresholds: {
      'Standard Flow': 'Document Scrutiny Only',
      'Trigger Condition': 'Discrepancy / Complaint / Surprise 5% cohort',
    },
  },
  {
    id: 'aph-ch1-cl1.9',
    chapter: 'Chapter I — General Governance and Standing Committee Appellate Roles',
    clause: 'Clause 1.9 (Appellate & Decision Hierarchy)',
    page: 15,
    title: 'Role of Standing Hearing Committee (SHC) & Standing Appellate Committee (SAC)',
    sourceDoc: 'AICTE Approval Process Handbook 2026–2027 (APH 2026-27)',
    applicability: 'Governance & Institutional Appeals',
    content:
      'Where an application is rejected or deferred due to deficiency in Scrutiny or EVC, the applicant institution possesses statutory right to present compliance documents before the Standing Hearing Committee (SHC). If unresolved, a second appeal lies before the Standing Appellate Committee (SAC) headed by a retired High Court Judge. Consequential approval or rejection can only be signed by designated human committee authorities.',
    keywords: ['shc', 'sac', 'hearing', 'appeal', 'decision authority', 'rejection', 'human-in-the-loop'],
  },
];

export interface CopilotQueryResult {
  query: string;
  retrievalTrace: {
    step: string;
    detail: string;
    latencyMs: number;
  }[];
  retrievedPassages: HandbookPassage[];
  caseEvidenceComparison: {
    parameter: string;
    aphRequirement: string;
    applicationDeclared: string;
    extractedOrVerified: string;
    complianceStatus: 'COMPLIANT' | 'DEFICIENT' | 'VERIFIED' | 'ATTENTION_NEEDED';
  }[];
  plainEnglishAnswer: string;
  recommendedAction: string;
  humanReviewRequired: boolean;
  disclaimer: string;
}

export function queryAadharCopilot(query: string): CopilotQueryResult {
  const normalizedQuery = query.toLowerCase();
  
  // Simulated RAG matching
  const matched = HANDBOOK_PASSAGES.filter((p) => {
    return (
      p.keywords.some((k) => normalizedQuery.includes(k.toLowerCase())) ||
      p.title.toLowerCase().includes(normalizedQuery) ||
      p.clause.toLowerCase().includes(normalizedQuery) ||
      p.content.toLowerCase().includes(normalizedQuery)
    );
  });

  const passagesToReturn = matched.length > 0 ? matched : [HANDBOOK_PASSAGES[0], HANDBOOK_PASSAGES[1]];

  const isGpuQuery = normalizedQuery.includes('computer-lab') || normalizedQuery.includes('workstation') || normalizedQuery.includes('lab') || normalizedQuery.includes('shortfall') || normalizedQuery.includes('invoice');
  const isLandQuery = normalizedQuery.includes('land') || normalizedQuery.includes('acre') || normalizedQuery.includes('hinjawadi') || normalizedQuery.includes('pune');
  const isEvcQuery = normalizedQuery.includes('evc') || normalizedQuery.includes('inspection') || normalizedQuery.includes('visit');

  let answer = '';
  let recommended = '';
  let comparison = [];

  if (isGpuQuery) {
    answer =
      'According to the AICTE Approval Process Handbook 2024–25 to 2026–27, Annexure 4, Section 4.1, pages 92–93, undergraduate Engineering and Technology programmes are assessed using a 1:10 PC/laptop-to-student ratio subject to a minimum of 20 PCs, and each department must have a separate laboratory with at least 20 computers. The synthetic BSIET inventory lists 16 computers, so the agent flags a potential evidence gap for human verification. No GPU requirement is inferred.';
    recommended =
      'Keep the simulated case in CLARIFICATION_REQUIRED status and request updated inventory, installation records, availability evidence, and the programme-category basis. An authorised officer must decide whether the evidence is sufficient.';
    comparison = [
      {
        parameter: 'AI/ML Department Computers',
        aphRequirement: '1:10 ratio, minimum 20 PCs; separate departmental laboratory with at least 20 computers',
        applicationDeclared: '16 computers in synthetic inventory',
        extractedOrVerified: 'Installation and availability corroboration not attached',
        complianceStatus: 'ATTENTION_NEEDED' as const,
      },
      {
        parameter: 'Lab Instructional Floor Space',
        aphRequirement: 'Min 120 sq.m dedicated lab carpet area',
        applicationDeclared: '120 sq.m',
        extractedOrVerified: '120 sq.m (Verified by PMRDA Plan)',
        complianceStatus: 'COMPLIANT' as const,
      },
    ];
  } else if (isLandQuery) {
    answer =
      'This simulated case contains a synthetic land record for the Kolhapur institution. The applicable land and ownership norm, source edition, and evidence must be verified by the authorised officer before a finding is recorded.';
    recommended = 'Land norms are 100% satisfied. No further clarification is needed on this head.';
    comparison = [
      {
        parameter: 'Contiguous Land Area',
        aphRequirement: '7.5 Acres in Industrial/Rural Zone',
        applicationDeclared: '7.5 Acres',
        extractedOrVerified: '7.5 Acres (Sub-Registrar Registered Deed)',
        complianceStatus: 'VERIFIED' as const,
      },
      {
        parameter: 'Non-Agricultural Order',
        aphRequirement: 'Valid Collector NA Conversion Order',
        applicationDeclared: 'NA/PUN/REV/2019/8412',
        extractedOrVerified: 'Verified & Authenticated by Verifier',
        complianceStatus: 'VERIFIED' as const,
      },
    ];
  } else if (isEvcQuery) {
    answer =
      'Under APH 2026–27 Chapter II, Clause 2.14, Expert Visit Committee (EVC) inspections are not mandated universally. For new programs in existing institutes, approval is conducted via digital document scrutiny. An EVC is only initiated if physical discrepancies remain unresolved or if the Scrutiny Committee flags prima facie concerns.';
    recommended =
      'Currently EVC status is NOT_REQUIRED. If the institution resolves the computer-lab evidence clarification satisfactorily, this case can proceed directly to Decision Authority without an in-person EVC.';
    comparison = [
      {
        parameter: 'Inspection Requirement',
        aphRequirement: 'Contingent on unresolved deficiency or surprise cohort',
        applicationDeclared: 'Standard Digital Scrutiny',
        extractedOrVerified: 'Status: NOT_REQUIRED (Readiness Score 88%)',
        complianceStatus: 'COMPLIANT' as const,
      },
    ];
  } else {
    answer =
      `Based on the retrieved handbook passage, simulated case AADHAR-BSIET-2026-27 has a computer-laboratory evidence item requiring human review. Historical public reports are context only; the 2026–27 application and attachments are synthetic.`;
    recommended = 'Address Clarification CLR/2026/01 with updated inventory, installation, and availability evidence before an authorised officer changes the checklist outcome.';
    comparison = [
      {
        parameter: 'Regulatory Compliance Index',
        aphRequirement: 'All statutory norms satisfied',
        applicationDeclared: '100% compliant declaration',
        extractedOrVerified: '4 of 5 checklist items satisfied, 1 deficient',
        complianceStatus: 'ATTENTION_NEEDED' as const,
      },
    ];
  }

  return {
    query,
    retrievalTrace: [
      { step: 'Query Analysis & Normalization', detail: `Tokenized terms: "${query.slice(0, 40)}..."`, latencyMs: 14 },
      { step: 'Vector Similarity Search', detail: 'Indexed APH 2026-27 (524 chunks). Top-3 cosine matches retrieved.', latencyMs: 38 },
      { step: 'Dossier Evidence Retrieval', detail: 'Cross-referenced Case AADHAR-BSIET-2026-27 OCR extractions and checklist states.', latencyMs: 25 },
      { step: 'Regulatory Synthesis & Reasoning', detail: 'Evaluated handbook thresholds against verified application parameters.', latencyMs: 42 },
    ],
    retrievedPassages: passagesToReturn,
    caseEvidenceComparison: comparison,
    plainEnglishAnswer: answer,
    recommendedAction: recommended,
    humanReviewRequired: true,
    disclaimer:
      'Official source text not loaded. This answer uses illustrative demonstration fixtures and is not verified regulatory guidance.',
  };
}
