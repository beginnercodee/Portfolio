export interface CaseStudyMetric {
  label: string;
  value: string;
  subtext: string;
}

export interface ArchitectureLayer {
  step: string;
  title: string;
  platform: string;
  description: string;
  keyFeatures: string[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  badge: string;
  heroMetric: string;
  heroMetricLabel: string;
  synopsis: string;
  clientContext: {
    industry: string;
    organizationType: string;
    timeline: string;
    scale: string;
  };
  metrics: CaseStudyMetric[];
  techStack: {
    category: string;
    technologies: string[];
  }[];
  challenge: {
    overview: string;
    painPoints: {
      title: string;
      description: string;
    }[];
  };
  architecture: {
    overview: string;
    layers: ArchitectureLayer[];
  };
  deepDive: {
    title: string;
    description: string;
    codeSnippetTitle?: string;
    codeSnippet?: string;
    keyTakeaways: string[];
  }[];
  impact: {
    overview: string;
    results: {
      metric: string;
      description: string;
    }[];
  };
}

export const caseStudiesData: CaseStudy[] = [
  {
    slug: "agency-outreach-automation",
    title: "Autonomous Bid & Quoting Engine",
    badge: "ENTERPRISE AUTOMATION & AI PIPELINE",
    heroMetric: "+400%",
    heroMetricLabel: "Proposal Turnaround Velocity",
    synopsis:
      "Engineered an end-to-end autonomous RFQ intake, AI-driven extraction, CRM pipeline synchronization, and dynamic A3 proposal generation engine for an enterprise market research agency—slashing quote delivery from 6 hours to under 3 minutes.",
    clientContext: {
      industry: "Enterprise B2B Market Research & Strategy",
      organizationType: "High-Volume Global Research Agency",
      timeline: "4 Weeks from Architecture to Production",
      scale: "Hundreds of Multi-Option RFQs Processed Monthly",
    },
    metrics: [
      {
        label: "Turnaround Latency",
        value: "< 3 Mins",
        subtext: "Down from 4-6 hours of manual spreadsheet work",
      },
      {
        label: "Attribution Accuracy",
        value: "100%",
        subtext: "Zero forwarded-sender misattributions in CRM",
      },
      {
        label: "Duplicate Pipeline Noise",
        value: "0 Errors",
        subtext: "Idempotent deduplication across message & thread IDs",
      },
      {
        label: "Manual Time Saved",
        value: "30+ Hrs/Wk",
        subtext: "Reallocated from admin triage to high-value closing",
      },
    ],
    techStack: [
      {
        category: "Orchestration & Ingestion",
        technologies: ["n8n Cloud", "Microsoft Graph API", "Outlook 365 Webhooks"],
      },
      {
        category: "AI & Data Extraction",
        technologies: ["OpenAI GPT-4", "Strict JSON Schema Contracts", "Custom Regex Parsers"],
      },
      {
        category: "CRM & Pipeline Automation",
        technologies: ["GoHighLevel (GHL) CRM", "Two-Way Email Sync", "Automated Stage Triggers"],
      },
      {
        category: "Data Layer & Persistence",
        technologies: ["Supabase PostgreSQL", "Atomic RPC Versioning", "Cloud Storage Buckets"],
      },
      {
        category: "Custom Quoting Engine",
        technologies: ["Custom Single-Page App (Vanilla JS/HTML5)", "jsPDF & html2canvas", "Vector DOM Normalization"],
      },
    ],
    challenge: {
      overview:
        "The client received high volumes of complex Requests for Quotation (RFQs) in unstructured email formats. Each inbound inquiry contained disparate specifications—varying sample sizes, quotas, target demographics (B2B, Healthcare, Consumer), multi-phase methodologies, and attachments (.xlsx, .pdf). The existing manual intake was fraught with operational bottlenecks:",
      painPoints: [
        {
          title: "The Forwarded-Email Misattribution Trap",
          description:
            "Sales executives frequently forwarded inbound client RFQs to a centralized inbox. Legacy automated workflows mistakenly extracted the internal employee's email as the prospective client, polluting the CRM with circular communication loops.",
        },
        {
          title: "Pipeline Clutter & Thread Replies Treated as New Deals",
          description:
            "Thread replies, automated read receipts, and subsequent follow-ups repeatedly spawned duplicate deals in the CRM pipeline, inflating pipeline metrics and causing reps to prepare competing duplicate proposals.",
        },
        {
          title: "Complex Multi-Option Quoting & Calculation Errors",
          description:
            "Quoting required evaluating multiple methodology options (online, in-person, hybrid), session lengths (LOI), and add-on pricing. Calculating these in ad-hoc spreadsheets caused math inconsistencies and unversioned pricing drift.",
        },
        {
          title: "Unversioned Proposal Drift & Inconsistent Formatting",
          description:
            "When clients requested scope adjustments, reps overwrote existing documents. There was no immutable audit trail of past quotes, and manual PDF exports suffered from inconsistent styling and broken page breaks.",
        },
      ],
    },
    architecture: {
      overview:
        "We architected a resilient, 5-layer autonomous pipeline connecting Microsoft 365, n8n orchestration, OpenAI structured extraction, GoHighLevel CRM, and a custom Supabase-backed quoting application.",
      layers: [
        {
          step: "LAYER 01",
          title: "Intelligent Inbound Ingestion & Identity Resolution",
          platform: "Microsoft 365 + n8n Cloud",
          description:
            "Polls shared mailboxes every 60s, ingests attachments, and runs a multi-stage identity resolution algorithm to reliably isolate external client emails from internal forwarders.",
          keyFeatures: [
            "HTML entity sanitization preserving valid email tags",
            "Internal domain rejection filtering",
            "Message ID and Conversation ID dual-key idempotency",
          ],
        },
        {
          step: "LAYER 02",
          title: "Deterministic AI Extraction Contract",
          platform: "OpenAI GPT-4 JSON Engine",
          description:
            "Enforces a strict zero-shot JSON schema parsing raw inquiries into structured parameters: sample size (N), methodology options, locations, incidence rates (IR%), LOI, and phishing/spam confidence scoring.",
          keyFeatures: [
            "Strict JSON schema with no Markdown/prose fences",
            "Automated fishing & vendor-pricing grab detection",
            "Multi-phase option array normalization",
          ],
        },
        {
          step: "LAYER 03",
          title: "CRM Pipeline Orchestration & Two-Way Sync",
          platform: "GoHighLevel (GHL) CRM",
          description:
            "Creates or updates CRM contacts, provisions deals in the 'Bid Pipeline' at 'New Bid', and initiates native Outlook Two-Way synchronization for complete conversation history without duplicate webhook loops.",
          keyFeatures: [
            "Dynamic ?bid_id shortlink hydration in opportunity notes",
            "Automated 5-day and 15-day proposal follow-up sequences",
            "Native bi-directional conversation thread binding",
          ],
        },
        {
          step: "LAYER 04",
          title: "Headless Interactive Quoting App & Immutable Versioning",
          platform: "Custom App + Supabase PostgreSQL",
          description:
            "Reps open the Quote App with instant pre-filled AI bid parameters. As quotes are adjusted, atomic RPC functions store immutable revision snapshots (`Original Bid`, `Revision 1`, `Revision 2`) while skipping redundant 'no-change' saves.",
          keyFeatures: [
            "Sub-second draft hydration via UUID tokens",
            "Dynamic multi-option pricing matrix calculations",
            "Atomic RPC functions guaranteeing revision audit trails",
          ],
        },
        {
          step: "LAYER 05",
          title: "Vector A3 PDF Proposal Generator & Threaded Dispatch",
          platform: "jsPDF Engine + Microsoft Graph",
          description:
            "Clones and normalizes the DOM to generate pixel-perfect A3 vector PDF proposals, uploads them to secure storage buckets, and triggers automated Outlook email dispatch preserving the original RFQ subject for 100% thread continuity.",
          keyFeatures: [
            "Page-break avoidance & DOM styling normalization",
            "Direct authenticated Cloud Storage upload",
            "Outbound email relay with original conversation threading",
          ],
        },
      ],
    },
    deepDive: [
      {
        title: "1. The Forwarder-Safe Client Identity Algorithm",
        description:
          "To solve the critical flaw where forwarded emails attributed the internal sales rep as the client, we built a deterministic candidate evaluation pipeline in n8n JavaScript code:",
        codeSnippetTitle: "Client Identity Resolution Logic (Sanitized)",
        codeSnippet: `// 1. Inspect headers and body for forwarding markers
const isForwarded = /from:|subject:.*fwd:/i.test(emailBody);

// 2. Extract potential email candidates from text & HTML
const candidates = extractAllEmailAddresses(emailBody);

// 3. Filter out all internal company domains and system addresses
const validExternalClients = candidates.filter(email => {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain && !INTERNAL_DOMAINS.includes(domain) && email !== SYSTEM_MAILBOX;
});

// 4. Validate confidence or fallback to manual triage gate
if (validExternalClients.length > 0) {
  finalClientEmail = validExternalClients[0];
  needsManualReview = false;
} else {
  needsManualReview = true; // Safe human-in-the-loop fallback
}`,
        keyTakeaways: [
          "Prevents internal employee emails from corrupting CRM contact databases.",
          "Routes low-confidence or ambiguous identity edge-cases into a dedicated manual review queue.",
        ],
      },
      {
        title: "2. Idempotent Deduplication & Thread State Architecture",
        description:
          "Inbound emails are evaluated against an active deduplication store using both `messageId` (unique email identifier) and `conversationId` (Outlook thread identifier):",
        keyTakeaways: [
          "Exact messageId match -> Skipped as duplicate (prevents polling loops).",
          "Existing conversationId with new messageId -> Handled as a thread update or revision, avoiding duplicate CRM deal creation.",
          "New conversationId + new messageId -> Provisioned as a clean New Bid opportunity.",
        ],
      },
      {
        title: "3. Immutable Version Control & The 'No-Change' Guard",
        description:
          "In the quoting layer, quotes are persisted into Supabase (`fi_quotes` header table and `fi_quote_versions` detail table). We implemented deep payload equality checks before executing RPC version increments to prevent volatile metadata (such as timestamps) from creating false revisions.",
        keyTakeaways: [
          "Every legitimate edit increments version monotonically (Original Bid -> Rev 1 -> Rev 2).",
          "Complete historical pricing matrices can be inspected or restored at any time.",
        ],
      },
    ],
    impact: {
      overview:
        "The automated bid and quote architecture transformed the agency's sales operations from a slow, manual spreadsheet workflow into a streamlined, automated quotation machine.",
      results: [
        {
          metric: "+400% Response Velocity",
          description:
            "Proposals that previously took 4 to 6 hours of manual analysis and drafting are now generated and delivered in under 3 minutes.",
        },
        {
          metric: "Zero CRM Attribution Errors",
          description:
            "100% of forwarded client RFQs correctly identify the true external stakeholder, eliminating communication mix-ups.",
        },
        {
          metric: "100% Audit Fidelity",
          description:
            "Every price adjustment and scope change is permanently recorded in PostgreSQL immutable version tables.",
        },
        {
          metric: "30+ Hours Saved Weekly",
          description:
            "The sales engineering team reclaimed significant weekly hours, shifting focus entirely from data entry to client relationships.",
        },
      ],
    },
  },
  {
    slug: "real-time-data-sync-pipeline",
    title: "Real-Time Enterprise Data Sync Pipeline",
    badge: "EVENT-DRIVEN ARCHITECTURE & DATA INTEGRITY",
    heroMetric: "< 2s",
    heroMetricLabel: "End-to-End Replication Latency",
    synopsis:
      "Bridged legacy internal systems and modern cloud CRMs through a resilient event-driven synchronization engine with automated retry queues, delta tracking, and cryptographic signature validation.",
    clientContext: {
      industry: "Enterprise SaaS & Professional Services",
      organizationType: "Multi-Department Operations Team",
      timeline: "3 Weeks Implementation",
      scale: "100,000+ Synchronized Records Daily",
    },
    metrics: [
      {
        label: "Sync Latency",
        value: "< 2.0s",
        subtext: "Instant bidirectional data availability across sales & ops",
      },
      {
        label: "Data Entry Errors",
        value: "0.00%",
        subtext: "Completely eliminated manual dual-entry discrepancies",
      },
      {
        label: "Uptime Reliability",
        value: "99.98%",
        subtext: "Fault-tolerant dead letter queues & auto-reconnect backoff",
      },
      {
        label: "Daily Throughput",
        value: "100k+ Events",
        subtext: "High-concurrency webhook ingestion without rate limits",
      },
    ],
    techStack: [
      {
        category: "Backend & Microservices",
        technologies: ["Node.js / TypeScript", "Python FastAPIs", "Docker"],
      },
      {
        category: "Queues & Event Streams",
        technologies: ["Redis BullMQ", "Webhooks", "SSE (Server-Sent Events)"],
      },
      {
        category: "Database & Caching",
        technologies: ["PostgreSQL", "Redis Cache", "Prisma ORM"],
      },
      {
        category: "Security & Monitoring",
        technologies: ["HMAC-SHA256 Signatures", "Prometheus", "Winston Logger"],
      },
    ],
    challenge: {
      overview:
        "The organization maintained separate tools for customer acquisition, billing, and operational execution. Because these systems lacked native integration, employees spent hours daily copying deal updates across tools, leading to frequent data drift, delayed invoicing, and broken customer handoffs.",
      painPoints: [
        {
          title: "Manual Dual-Entry Bottlenecks",
          description:
            "Every closed deal required manual data transcription across three disparate software platforms, resulting in up to 15% rate of typographical and calculation errors.",
        },
        {
          title: "Silent Rate-Limit Failures",
          description:
            "Earlier naive API scripts frequently hit 429 Too Many Requests errors and dropped data silently without alerting administrators.",
        },
        {
          title: "Uncontrolled Concurrent Race Conditions",
          description:
            "Simultaneous updates from multiple account managers resulted in outdated states overwriting newer changes in downstream databases.",
        },
      ],
    },
    architecture: {
      overview:
        "We engineered an asynchronous event-driven replication engine utilizing webhook event publishers, Redis-backed priority queues, transactional database idempotency keys, and automated exponential retry handlers.",
      layers: [
        {
          step: "STAGE 01",
          title: "Cryptographic Ingestion & Signature Verification",
          platform: "API Gateway",
          description:
            "Receives outbound webhooks, verifies HMAC-SHA256 signatures to prevent spoofing, and immediately returns a 202 Accepted response within 15ms.",
          keyFeatures: [
            "HMAC-SHA256 request authentication",
            "Rapid acknowledgment to prevent sender timeouts",
            "Payload schema validation",
          ],
        },
        {
          step: "STAGE 02",
          title: "Priority Queueing & Concurrency Throttle",
          platform: "Redis + BullMQ",
          description:
            "Enqueues synchronization jobs with priority tags, distributing work evenly across background worker threads while respecting downstream API quotas.",
          keyFeatures: [
            "Token-bucket rate limit protection",
            "Exponential backoff retry policy (5 retries with jitter)",
            "Dead Letter Queue (DLQ) for malformed payloads",
          ],
        },
        {
          step: "STAGE 03",
          title: "Transactional Replication & Conflict Resolution",
          platform: "PostgreSQL Engine",
          description:
            "Executes atomic database transactions with monotonic timestamp version checks (Optimistic Concurrency Control) to resolve simultaneous writes.",
          keyFeatures: [
            "Optimistic Concurrency Control (OCC)",
            "Strict idempotency keys preventing duplicate inserts",
            "Comprehensive audit telemetry logging",
          ],
        },
      ],
    },
    deepDive: [
      {
        title: "1. Resilient Rate-Limiting & Backoff Circuit Breakers",
        description:
          "To ensure zero data loss during high-volume spikes or third-party CRM downtime, all ingestion is decoupled via distributed Redis worker pools:",
        codeSnippetTitle: "Queue Worker Retry Policy (Simplified)",
        codeSnippet: `const queue = new Queue('sync-events', {
  defaultJobOptions: {
    attempts: 5,
    backoff: {
      type: 'exponential',
      delay: 2000, // 2s -> 4s -> 8s -> 16s -> 32s
    },
    removeOnComplete: 1000,
    removeOnFail: false, // Preserved in DLQ for analysis
  },
});`,
        keyTakeaways: [
          "Downstream CRM outages no longer cause lost customer records.",
          "Alerts trigger only if all 5 retry attempts are exhausted.",
        ],
      },
    ],
    impact: {
      overview:
        "The automated sync pipeline provided real-time visibility across teams, eliminating manual data entry completely.",
      results: [
        {
          metric: "100% Data Fidelity",
          description: "Zero manual entry discrepancies recorded since deployment.",
        },
        {
          metric: "< 2s End-to-End Latency",
          description: "CRM updates immediately propagate across all operational tools.",
        },
        {
          metric: "99.98% High Availability",
          description: "Fault-tolerant architecture with automated self-healing queues.",
        },
      ],
    },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudiesData.find((cs) => cs.slug === slug);
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudiesData;
}
