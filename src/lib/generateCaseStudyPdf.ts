import { jsPDF } from "jspdf";
import type { CaseStudy } from "@/data/caseStudies";

/**
 * Generates and downloads a publication-grade, beautifully formatted PDF document
 * with strict top-baseline coordinate alignment, dynamic card heights, and zero text collisions.
 */
export function generateCaseStudyPdf(cs: CaseStudy) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let cursorY = 22;

  // --- Design System Colors ---
  const COLOR_PRIMARY = [15, 23, 42]; // Slate 900
  const COLOR_SECONDARY = [71, 85, 105]; // Slate 600
  const COLOR_MUTED = [148, 163, 184]; // Slate 400
  const COLOR_ACCENT = [22, 163, 74]; // Emerald 600
  const COLOR_ACCENT_LIGHT = [240, 253, 244]; // Emerald 50
  const COLOR_DARK_BG = [15, 23, 42]; // Slate 900
  const COLOR_BORDER = [226, 232, 240]; // Slate 200
  const COLOR_CARD_BG = [248, 250, 252]; // Slate 50
  const COLOR_DANGER = [220, 38, 38]; // Red 600

  // --- Page Break & Space Enforcement ---
  function ensureSpace(requiredSpaceMm: number) {
    if (cursorY + requiredSpaceMm > pageHeight - 20) {
      doc.addPage();
      cursorY = 22;
    }
  }

  // --- Running Header & Footer ---
  function addHeaderFooter(pageNumber: number, totalPages: number) {
    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
    doc.text("JN LABS // TECHNICAL ARCHITECTURE CASE STUDY", margin, 11, { baseline: "top" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text(cs.badge, pageWidth - margin, 11, { align: "right", baseline: "top" });

    doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, 16, pageWidth - margin, 16);

    // Footer
    doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text(
      "CONFIDENTIAL & SANITIZED TECHNICAL CASE STUDY  •  ARCHITECTED BY JAMAL NADEEM",
      margin,
      pageHeight - 10,
      { baseline: "top" }
    );
    doc.text(
      `Page ${pageNumber} of ${totalPages}`,
      pageWidth - margin,
      pageHeight - 10,
      { align: "right", baseline: "top" }
    );
  }

  // ==========================================
  // PAGE 1: HEADER, TITLE & EXECUTIVE CONTEXT
  // ==========================================

  // 1. Classification Badge Pill
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  const badgeText = `[ ${cs.badge} ]`;
  const badgeTextWidth = doc.getTextWidth(badgeText);
  const badgeBoxWidth = badgeTextWidth + 8;
  const badgeBoxHeight = 6.5;

  doc.setFillColor(COLOR_ACCENT_LIGHT[0], COLOR_ACCENT_LIGHT[1], COLOR_ACCENT_LIGHT[2]);
  doc.setDrawColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, cursorY, badgeBoxWidth, badgeBoxHeight, 1.5, 1.5, "FD");

  doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
  doc.text(badgeText, margin + 4, cursorY + 1.8, { baseline: "top" });
  
  // Advance cursor past the badge with generous margin to PREVENT TITLE OVERLAP
  cursorY += badgeBoxHeight + 5;

  // 2. Case Study Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  const splitTitle = doc.splitTextToSize(cs.title.toUpperCase(), contentWidth);
  doc.text(splitTitle, margin, cursorY, { baseline: "top" });
  cursorY += splitTitle.length * 7.5 + 4;

  // 3. Executive Synopsis
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
  const splitSynopsis = doc.splitTextToSize(cs.synopsis, contentWidth);
  doc.text(splitSynopsis, margin, cursorY, { baseline: "top" });
  cursorY += splitSynopsis.length * 4.8 + 6;

  // 4. Metadata Context 2x2 Grid Box
  const metaBoxWidth = contentWidth;
  const metaColWidth = metaBoxWidth / 2;
  const metaBoxHeight = 28;

  doc.setFillColor(COLOR_CARD_BG[0], COLOR_CARD_BG[1], COLOR_CARD_BG[2]);
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, cursorY, metaBoxWidth, metaBoxHeight, 2, 2, "FD");

  // Divider lines inside context box
  doc.line(margin, cursorY + 14, margin + metaBoxWidth, cursorY + 14);
  doc.line(margin + metaColWidth, cursorY, margin + metaColWidth, cursorY + metaBoxHeight);

  const metaRows = [
    [
      { label: "CLIENT DOMAIN", val: cs.clientContext.industry },
      { label: "ORGANIZATION", val: cs.clientContext.organizationType },
    ],
    [
      { label: "DEPLOYMENT TIMELINE", val: cs.clientContext.timeline },
      { label: "OPERATIONAL SCALE", val: cs.clientContext.scale },
    ],
  ];

  metaRows.forEach((row, rIdx) => {
    const rowY = cursorY + rIdx * 14;
    row.forEach((col, cIdx) => {
      const colX = margin + cIdx * metaColWidth + 5;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
      doc.text(col.label, colX, rowY + 2.5, { baseline: "top" });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
      doc.text(col.val, colX, rowY + 7.5, { baseline: "top" });
    });
  });
  cursorY += metaBoxHeight + 8;

  // 5. Key Verified Metrics (4 Dark Hero Cards)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text("EXECUTIVE IMPACT & VERIFIED METRICS", margin, cursorY, { baseline: "top" });
  cursorY += 6;

  const metricBoxWidth = (contentWidth - 9) / 4;
  const metricBoxHeight = 30; // Tall enough to prevent any clipping

  cs.metrics.forEach((m, idx) => {
    const boxX = margin + idx * (metricBoxWidth + 3);
    doc.setFillColor(COLOR_DARK_BG[0], COLOR_DARK_BG[1], COLOR_DARK_BG[2]);
    doc.roundedRect(boxX, cursorY, metricBoxWidth, metricBoxHeight, 2, 2, "F");

    // Hero Metric Number (Emerald Green)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
    doc.text(m.value, boxX + 4, cursorY + 3.5, { baseline: "top" });

    // Metric Label (Bold White)
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text(m.label, boxX + 4, cursorY + 10.5, { baseline: "top" });

    // Subtext (Slate-400 Multi-line)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    const splitSub = doc.splitTextToSize(m.subtext, metricBoxWidth - 8);
    let subY = cursorY + 16;
    splitSub.forEach((line: string) => {
      doc.text(line, boxX + 4, subY, { baseline: "top" });
      subY += 3.4;
    });
  });
  cursorY += metricBoxHeight + 9;

  // ==========================================
  // SECTION 1: THE OPERATIONAL BOTTLENECKS
  // ==========================================
  ensureSpace(40);
  doc.setDrawColor(COLOR_DANGER[0], COLOR_DANGER[1], COLOR_DANGER[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, cursorY, margin + contentWidth, cursorY);
  cursorY += 4.5;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text("1. THE OPERATIONAL BOTTLENECKS (PROBLEM SPACE)", margin, cursorY, { baseline: "top" });
  cursorY += 5.5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
  const chalOverview = doc.splitTextToSize(cs.challenge.overview, contentWidth);
  doc.text(chalOverview, margin, cursorY, { baseline: "top" });
  cursorY += chalOverview.length * 4.2 + 4;

  // Pain Points Dynamic Cards
  cs.challenge.painPoints.forEach((pain, pIdx) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    const painDescLines = doc.splitTextToSize(pain.description, contentWidth - 12);
    const cardHeight = 8 + (painDescLines.length * 3.8) + 3;

    ensureSpace(cardHeight + 3);

    doc.setFillColor(COLOR_CARD_BG[0], COLOR_CARD_BG[1], COLOR_CARD_BG[2]);
    doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, cursorY, contentWidth, cardHeight, 1.5, 1.5, "FD");

    // Red left accent indicator
    doc.setFillColor(COLOR_DANGER[0], COLOR_DANGER[1], COLOR_DANGER[2]);
    doc.rect(margin, cursorY, 2.5, cardHeight, "F");

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(COLOR_DANGER[0], COLOR_DANGER[1], COLOR_DANGER[2]);
    doc.text(`[!] 0${pIdx + 1}. ${pain.title}`, margin + 6, cursorY + 2.5, { baseline: "top" });

    // Description
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
    let textY = cursorY + 7;
    painDescLines.forEach((line: string) => {
      doc.text(line, margin + 6, textY, { baseline: "top" });
      textY += 3.8;
    });

    cursorY += cardHeight + 3;
  });

  cursorY += 4;

  // ==========================================
  // SECTION 2: 5-LAYER AUTONOMOUS ARCHITECTURE
  // ==========================================
  ensureSpace(45);
  doc.setDrawColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, cursorY, margin + contentWidth, cursorY);
  cursorY += 4.5;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text("2. THE 5-LAYER AUTONOMOUS ARCHITECTURE", margin, cursorY, { baseline: "top" });
  cursorY += 5.5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
  const archOverview = doc.splitTextToSize(cs.architecture.overview, contentWidth);
  doc.text(archOverview, margin, cursorY, { baseline: "top" });
  cursorY += archOverview.length * 4.2 + 4;

  // 5-Layer Cards with Dynamic Measurement
  cs.architecture.layers.forEach((layer) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    const descLines = doc.splitTextToSize(layer.description, contentWidth - 12);
    const featuresStr = `Capabilities: ${layer.keyFeatures.join("  •  ")}`;
    const featureLines = doc.splitTextToSize(featuresStr, contentWidth - 12);
    const cardHeight = 8 + (descLines.length * 3.8) + (featureLines.length * 3.5) + 4;

    ensureSpace(cardHeight + 3.5);

    doc.setFillColor(COLOR_CARD_BG[0], COLOR_CARD_BG[1], COLOR_CARD_BG[2]);
    doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, cursorY, contentWidth, cardHeight, 1.5, 1.5, "FD");

    // Emerald left accent indicator
    doc.setFillColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
    doc.rect(margin, cursorY, 2.5, cardHeight, "F");

    // Step Pill Badge
    doc.setFillColor(COLOR_ACCENT_LIGHT[0], COLOR_ACCENT_LIGHT[1], COLOR_ACCENT_LIGHT[2]);
    doc.setDrawColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
    doc.roundedRect(margin + 6, cursorY + 2.5, 16, 4.5, 1, 1, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6);
    doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
    doc.text(layer.step, margin + 7.5, cursorY + 3.7, { baseline: "top" });

    // Layer Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.text(layer.title, margin + 25, cursorY + 3.2, { baseline: "top" });

    // Platform Tag (Right Aligned)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text(`[ ${layer.platform} ]`, pageWidth - margin - 5, cursorY + 3.2, {
      align: "right",
      baseline: "top",
    });

    // Description
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
    let textY = cursorY + 8.5;
    descLines.forEach((line: string) => {
      doc.text(line, margin + 6, textY, { baseline: "top" });
      textY += 3.8;
    });

    // Capabilities line
    doc.setFont("helvetica", "italic");
    doc.setFontSize(6.5);
    doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
    featureLines.forEach((line: string) => {
      doc.text(line, margin + 6, textY + 1, { baseline: "top" });
      textY += 3.5;
    });

    cursorY += cardHeight + 3.5;
  });

  cursorY += 4;

  // ==========================================
  // SECTION 3: KEY ALGORITHMIC BREAKTHROUGHS
  // ==========================================
  ensureSpace(45);
  doc.setDrawColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, cursorY, margin + contentWidth, cursorY);
  cursorY += 4.5;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text("3. KEY ALGORITHMIC BREAKTHROUGHS", margin, cursorY, { baseline: "top" });
  cursorY += 6;

  cs.deepDive.forEach((dive) => {
    ensureSpace(25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.text(`• ${dive.title}`, margin, cursorY, { baseline: "top" });
    cursorY += 4.5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
    const diveDesc = doc.splitTextToSize(dive.description, contentWidth);
    doc.text(diveDesc, margin, cursorY, { baseline: "top" });
    cursorY += diveDesc.length * 4.2 + 3;

    // Code Box with dynamic line measurement
    if (dive.codeSnippet) {
      const codeLines = dive.codeSnippet.split("\n");
      const codeBoxHeight = codeLines.length * 3.6 + 10;
      ensureSpace(codeBoxHeight + 4);

      doc.setFillColor(COLOR_DARK_BG[0], COLOR_DARK_BG[1], COLOR_DARK_BG[2]);
      doc.roundedRect(margin, cursorY, contentWidth, codeBoxHeight, 2, 2, "F");

      if (dive.codeSnippetTitle) {
        doc.setFont("courier", "bold");
        doc.setFontSize(6.5);
        doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
        doc.text(`// ${dive.codeSnippetTitle}`, margin + 5, cursorY + 3.5, { baseline: "top" });
      }

      doc.setFont("courier", "normal");
      doc.setFontSize(6);
      doc.setTextColor(241, 245, 249);
      let codeY = cursorY + 8;
      codeLines.forEach((line) => {
        doc.text(line, margin + 5, codeY, { baseline: "top" });
        codeY += 3.6;
      });

      cursorY += codeBoxHeight + 4;
    }

    // Key Takeaways
    dive.keyTakeaways.forEach((takeaway) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      const takeText = doc.splitTextToSize(takeaway, contentWidth - 10);
      const takeHeight = takeText.length * 3.8 + 1.5;

      ensureSpace(takeHeight + 2);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
      doc.text(">", margin + 3, cursorY, { baseline: "top" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
      let takeY = cursorY;
      takeText.forEach((line: string) => {
        doc.text(line, margin + 7, takeY, { baseline: "top" });
        takeY += 3.8;
      });

      cursorY += takeHeight + 1.5;
    });

    cursorY += 3.5;
  });

  cursorY += 4;

  // ==========================================
  // SECTION 4: INTEGRATED TECH STACK
  // ==========================================
  ensureSpace(40);
  doc.setDrawColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, cursorY, margin + contentWidth, cursorY);
  cursorY += 4.5;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text("4. INTEGRATED TECHNOLOGY STACK", margin, cursorY, { baseline: "top" });
  cursorY += 5.5;

  cs.techStack.forEach((stack) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    const techStr = stack.technologies.join("  •  ");
    const techSplit = doc.splitTextToSize(techStr, contentWidth - 48);
    const rowHeight = Math.max(6.5, techSplit.length * 3.8 + 1.5);

    ensureSpace(rowHeight + 2);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.text(`${stack.category}:`, margin, cursorY + 1, { baseline: "top" });

    doc.setFont("helvetica", "normal");
    doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
    let techY = cursorY + 1;
    techSplit.forEach((line: string) => {
      doc.text(line, margin + 46, techY, { baseline: "top" });
      techY += 3.8;
    });

    cursorY += rowHeight + 1.5;
  });

  cursorY += 5;

  // ==========================================
  // SECTION 5: BUSINESS ROI & OPERATIONAL VERIFICATION
  // ==========================================
  ensureSpace(45);
  doc.setDrawColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, cursorY, margin + contentWidth, cursorY);
  cursorY += 4.5;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text("5. BUSINESS ROI & OPERATIONAL VERIFICATION", margin, cursorY, { baseline: "top" });
  cursorY += 5.5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
  const impOverview = doc.splitTextToSize(cs.impact.overview, contentWidth);
  doc.text(impOverview, margin, cursorY, { baseline: "top" });
  cursorY += impOverview.length * 4.2 + 4;

  // Render Stacked Result Cards (Zero Horizontal Text Collisions!)
  cs.impact.results.forEach((res) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    const resDesc = doc.splitTextToSize(res.description, contentWidth - 12);
    const cardHeight = 7 + (resDesc.length * 3.8) + 3;

    ensureSpace(cardHeight + 3);

    doc.setFillColor(COLOR_CARD_BG[0], COLOR_CARD_BG[1], COLOR_CARD_BG[2]);
    doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, cursorY, contentWidth, cardHeight, 1.5, 1.5, "FD");

    // Left green accent bar
    doc.setFillColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
    doc.rect(margin, cursorY, 2.5, cardHeight, "F");

    // Row 1: Bold Emerald Metric Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
    doc.text(`[VERIFIED]  ${res.metric}`, margin + 6, cursorY + 2.5, { baseline: "top" });

    // Row 2+: Description placed cleanly underneath
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
    let descY = cursorY + 7;
    resDesc.forEach((line: string) => {
      doc.text(line, margin + 6, descY, { baseline: "top" });
      descY += 3.8;
    });

    cursorY += cardHeight + 3;
  });

  // Add Headers & Footers across all generated pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addHeaderFooter(i, totalPages);
  }

  // Trigger browser download
  const filename = `${cs.slug}-technical-case-study.pdf`;
  doc.save(filename);
}
