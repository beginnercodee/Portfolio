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
    const headerTitle = "JN LABS // TECHNICAL ARCHITECTURE CASE STUDY";
    doc.text(headerTitle, margin, 11, { baseline: "top" });
    const headerTitleW = doc.getTextWidth(headerTitle);
    doc.link(margin, 9.5, headerTitleW, 4.5, { url: "https://github.com/beginnercodee" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    const badgeStr = cs.badge;
    const badgeStrW = doc.getTextWidth(badgeStr);
    doc.text(badgeStr, pageWidth - margin, 11, { align: "right", baseline: "top" });
    doc.link(pageWidth - margin - badgeStrW, 9.5, badgeStrW, 4.5, {
      url: "https://github.com/beginnercodee",
    });

    doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, 16, pageWidth - margin, 16);

    // Footer
    doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    const footerText = "CONFIDENTIAL & SANITIZED TECHNICAL CASE STUDY  •  ARCHITECTED BY JAMAL NADEEM";
    doc.text(footerText, margin, pageHeight - 10, { baseline: "top" });

    // Clickable interactive link over author attribution
    const prefixStr = "CONFIDENTIAL & SANITIZED TECHNICAL CASE STUDY  •  ";
    const prefixW = doc.getTextWidth(prefixStr);
    const authorW = doc.getTextWidth("ARCHITECTED BY JAMAL NADEEM");
    doc.link(margin + prefixW, pageHeight - 10.5, authorW, 4, {
      url: "https://www.linkedin.com/in/jamal-nadeem/",
    });

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
  doc.link(margin, cursorY, badgeBoxWidth, badgeBoxHeight, {
    url: "https://github.com/beginnercodee",
  });
  
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
    const badgeStartX = margin + 48;
    const badgeMaxX = margin + contentWidth;
    const badgeGapX = 2;
    const badgeGapY = 2;
    const pillH = 5.2;

    // Pre-calculate line wrapping and needed height
    doc.setFont("courier", "bold");
    doc.setFontSize(6.8);
    let testX = badgeStartX;
    let linesCount = 1;

    stack.technologies.forEach((tech) => {
      const pillW = doc.getTextWidth(tech) + 5;
      if (testX + pillW > badgeMaxX && testX > badgeStartX) {
        linesCount++;
        testX = badgeStartX;
      }
      testX += pillW + badgeGapX;
    });

    const totalCategoryHeight = Math.max(7, linesCount * (pillH + badgeGapY) + 2);
    ensureSpace(totalCategoryHeight + 2);

    // Render Category Title on Left Column
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.text(`${stack.category}:`, margin, cursorY + 1.2, { baseline: "top" });

    // Render Pill Badges
    let pillX = badgeStartX;
    let pillY = cursorY;

    stack.technologies.forEach((tech) => {
      doc.setFont("courier", "bold");
      doc.setFontSize(6.8);
      const pillW = doc.getTextWidth(tech) + 5;

      if (pillX + pillW > badgeMaxX && pillX > badgeStartX) {
        pillX = badgeStartX;
        pillY += pillH + badgeGapY;
      }

      // Pill Background & Crisp Border
      doc.setFillColor(COLOR_CARD_BG[0], COLOR_CARD_BG[1], COLOR_CARD_BG[2]);
      doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
      doc.setLineWidth(0.25);
      doc.roundedRect(pillX, pillY, pillW, pillH, 1, 1, "FD");

      // Pill Text
      doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
      doc.text(tech, pillX + 2.5, pillY + 1.1, { baseline: "top" });

      pillX += pillW + badgeGapX;
    });

    cursorY += totalCategoryHeight + 1.5;
  });

  cursorY += 4;

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

  // ==========================================
  // SECTION 6: ARCHITECTURAL BRIEFING & CONSULTATION (EXECUTIVE CTA)
  // ==========================================
  cursorY += 4;
  const ctaBoxHeight = 36;
  ensureSpace(ctaBoxHeight + 5);

  doc.setFillColor(COLOR_DARK_BG[0], COLOR_DARK_BG[1], COLOR_DARK_BG[2]);
  doc.setDrawColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, cursorY, contentWidth, ctaBoxHeight, 2, 2, "FD");

  // Emerald left accent indicator
  doc.setFillColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
  doc.rect(margin, cursorY, 2.8, ctaBoxHeight, "F");

  // Header pill & Subhead
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.8);
  doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
  doc.text("[ EXECUTIVE ARCHITECTURAL ENGAGEMENT ]", margin + 6, cursorY + 3.8, { baseline: "top" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(255, 255, 255);
  doc.text("ENGAGE JAMAL NADEEM FOR ENTERPRISE AI ARCHITECTURE", margin + 6, cursorY + 8.2, { baseline: "top" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.2);
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
  doc.text(
    "Specializing in autonomous agent workflows, strict deterministic guardrails, and event-driven data pipelines.",
    margin + 6,
    cursorY + 13.8,
    { baseline: "top" }
  );

  // Row of 3 Interactive Clickable Action Badges
  const btnY = cursorY + 20.5;
  const btnH = 8;

  // Button 1: Direct Email
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  const btn1Text = "EMAIL: jamalnadeem2004@gmail.com";
  const btn1W = doc.getTextWidth(btn1Text) + 8;
  const btn1X = margin + 6;

  doc.setFillColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
  doc.roundedRect(btn1X, btnY, btn1W, btnH, 1.2, 1.2, "F");
  doc.setTextColor(255, 255, 255);
  doc.text(btn1Text, btn1X + 4, btnY + 2.4, { baseline: "top" });
  doc.link(btn1X, btnY, btn1W, btnH, {
    url: "mailto:jamalnadeem2004@gmail.com?subject=Enterprise%20AI%20Architecture%20Inquiry%20-%20Jamal%20Nadeem",
  });

  // Button 2: LinkedIn
  const btn2Text = "LINKEDIN: in/jamal-nadeem";
  const btn2W = doc.getTextWidth(btn2Text) + 8;
  const btn2X = btn1X + btn1W + 3;

  doc.setFillColor(30, 41, 59);
  doc.setDrawColor(71, 85, 105);
  doc.setLineWidth(0.3);
  doc.roundedRect(btn2X, btnY, btn2W, btnH, 1.2, 1.2, "FD");
  doc.setTextColor(241, 245, 249);
  doc.text(btn2Text, btn2X + 4, btnY + 2.4, { baseline: "top" });
  doc.link(btn2X, btnY, btn2W, btnH, {
    url: "https://www.linkedin.com/in/jamal-nadeem/",
  });

  // Button 3: GitHub Portfolio
  const btn3Text = "GITHUB: @beginnercodee";
  const btn3W = doc.getTextWidth(btn3Text) + 8;
  const btn3X = btn2X + btn2W + 3;

  doc.setFillColor(30, 41, 59);
  doc.setDrawColor(71, 85, 105);
  doc.setLineWidth(0.3);
  doc.roundedRect(btn3X, btnY, btn3W, btnH, 1.2, 1.2, "FD");
  doc.setTextColor(241, 245, 249);
  doc.text(btn3Text, btn3X + 4, btnY + 2.4, { baseline: "top" });
  doc.link(btn3X, btnY, btn3W, btnH, {
    url: "https://github.com/beginnercodee",
  });

  cursorY += ctaBoxHeight + 5;

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
