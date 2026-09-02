import { jsPDF } from "jspdf";
import type { CaseStudy } from "@/data/caseStudies";

/**
 * Generates and downloads a clean, professional, executive-ready PDF document
 * for any given technical Case Study.
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
  let cursorY = margin;

  // Color Palette Definitions
  const colorPrimary = [15, 23, 42]; // Slate 900
  const colorSecondary = [71, 85, 105]; // Slate 600
  const colorMuted = [148, 163, 184]; // Slate 400
  const colorAccent = [22, 163, 74]; // Emerald 600
  const colorAccentLight = [240, 253, 244]; // Emerald 50
  const colorDarkBg = [15, 23, 42]; // Slate 900 for dark blocks
  const colorBorder = [226, 232, 240]; // Slate 200
  const colorCardBg = [248, 250, 252]; // Slate 50

  function addHeaderFooter(pageNumber: number, totalPages: number) {
    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(colorSecondary[0], colorSecondary[1], colorSecondary[2]);
    doc.text("JN LABS // TECHNICAL ARCHITECTURE CASE STUDY", margin, 10);

    doc.setFont("helvetica", "normal");
    doc.text(cs.badge, pageWidth - margin, 10, { align: "right" });

    doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, 12, pageWidth - margin, 12);

    // Footer
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
    doc.setFontSize(8);
    doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
    doc.text(
      "CONFIDENTIAL & SANITIZED TECHNICAL CASE STUDY • ARCHITECTED BY JAMAL NADEEM",
      margin,
      pageHeight - 7
    );
    doc.text(
      `Page ${pageNumber} of ${totalPages}`,
      pageWidth - margin,
      pageHeight - 7,
      { align: "right" }
    );
  }

  function ensureSpace(requiredSpaceMm: number) {
    if (cursorY + requiredSpaceMm > pageHeight - 18) {
      doc.addPage();
      cursorY = 20;
    }
  }

  // --- PAGE 1: TITLE & EXECUTIVE SUMMARY ---
  cursorY = 20;

  // Badge pill
  doc.setFillColor(colorAccentLight[0], colorAccentLight[1], colorAccentLight[2]);
  doc.setDrawColor(colorAccent[0], colorAccent[1], colorAccent[2]);
  doc.setLineWidth(0.2);
  doc.roundedRect(margin, cursorY, 80, 6, 1.5, 1.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(colorAccent[0], colorAccent[1], colorAccent[2]);
  doc.text(`[ ${cs.badge} ]`, margin + 3, cursorY + 4.2);
  cursorY += 10;

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  const splitTitle = doc.splitTextToSize(cs.title.toUpperCase(), contentWidth);
  doc.text(splitTitle, margin, cursorY);
  cursorY += splitTitle.length * 8 + 2;

  // Synopsis
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(colorSecondary[0], colorSecondary[1], colorSecondary[2]);
  const splitSynopsis = doc.splitTextToSize(cs.synopsis, contentWidth);
  doc.text(splitSynopsis, margin, cursorY);
  cursorY += splitSynopsis.length * 5 + 6;

  // Context Metadata Box
  doc.setFillColor(colorCardBg[0], colorCardBg[1], colorCardBg[2]);
  doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
  doc.roundedRect(margin, cursorY, contentWidth, 18, 2, 2, "FD");

  const colWidth = contentWidth / 4;
  const metaCols = [
    { label: "CLIENT DOMAIN", val: cs.clientContext.industry },
    { label: "ORGANIZATION", val: cs.clientContext.organizationType },
    { label: "TIMELINE", val: cs.clientContext.timeline },
    { label: "SCALE", val: cs.clientContext.scale },
  ];

  metaCols.forEach((col, idx) => {
    const colX = margin + idx * colWidth + 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
    doc.text(col.label, colX, cursorY + 6);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
    const valText = doc.splitTextToSize(col.val, colWidth - 8);
    doc.text(valText[0] || "", colX, cursorY + 12);
  });
  cursorY += 24;

  // --- KEY ROI METRICS GRID ---
  ensureSpace(32);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  doc.text("EXECUTIVE IMPACT & VERIFIED METRICS", margin, cursorY);
  cursorY += 6;

  const metricBoxWidth = (contentWidth - 9) / 4;
  const metricBoxHeight = 22;

  cs.metrics.forEach((m, idx) => {
    const boxX = margin + idx * (metricBoxWidth + 3);
    doc.setFillColor(colorDarkBg[0], colorDarkBg[1], colorDarkBg[2]);
    doc.roundedRect(boxX, cursorY, metricBoxWidth, metricBoxHeight, 2, 2, "F");

    // Value (Hero number)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(colorAccent[0], colorAccent[1], colorAccent[2]);
    doc.text(m.value, boxX + 4, cursorY + 7);

    // Label
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text(m.label, boxX + 4, cursorY + 12);

    // Subtext
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
    const splitSub = doc.splitTextToSize(m.subtext, metricBoxWidth - 8);
    doc.text(splitSub[0] || "", boxX + 4, cursorY + 17);
  });
  cursorY += metricBoxHeight + 8;

  // --- SECTION 1: THE OPERATIONAL BOTTLENECKS ---
  ensureSpace(45);
  doc.setFillColor(239, 68, 68, 20); // light red tint
  doc.setDrawColor(239, 68, 68);
  doc.line(margin, cursorY, margin + contentWidth, cursorY);
  cursorY += 5;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  doc.text("1. THE OPERATIONAL BOTTLENECKS (PROBLEM SPACE)", margin, cursorY);
  cursorY += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(colorSecondary[0], colorSecondary[1], colorSecondary[2]);
  const chalOverview = doc.splitTextToSize(cs.challenge.overview, contentWidth);
  doc.text(chalOverview, margin, cursorY);
  cursorY += chalOverview.length * 4.5 + 4;

  cs.challenge.painPoints.forEach((pain, pIdx) => {
    ensureSpace(16);
    doc.setFillColor(colorCardBg[0], colorCardBg[1], colorCardBg[2]);
    doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
    doc.roundedRect(margin, cursorY, contentWidth, 14, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(220, 38, 38); // Red 600
    doc.text(`• ${pain.title}`, margin + 4, cursorY + 5.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(colorSecondary[0], colorSecondary[1], colorSecondary[2]);
    const painDesc = doc.splitTextToSize(pain.description, contentWidth - 8);
    doc.text(painDesc, margin + 4, cursorY + 10);
    cursorY += 16;
  });

  cursorY += 4;

  // --- SECTION 2: 5-LAYER AUTONOMOUS ARCHITECTURE ---
  ensureSpace(40);
  doc.setDrawColor(colorAccent[0], colorAccent[1], colorAccent[2]);
  doc.line(margin, cursorY, margin + contentWidth, cursorY);
  cursorY += 5;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  doc.text("2. THE 5-LAYER AUTONOMOUS ARCHITECTURE", margin, cursorY);
  cursorY += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(colorSecondary[0], colorSecondary[1], colorSecondary[2]);
  const archOverview = doc.splitTextToSize(cs.architecture.overview, contentWidth);
  doc.text(archOverview, margin, cursorY);
  cursorY += archOverview.length * 4.5 + 4;

  cs.architecture.layers.forEach((layer) => {
    ensureSpace(24);
    doc.setFillColor(colorCardBg[0], colorCardBg[1], colorCardBg[2]);
    doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
    doc.roundedRect(margin, cursorY, contentWidth, 22, 2, 2, "FD");

    // Step badge
    doc.setFillColor(colorAccentLight[0], colorAccentLight[1], colorAccentLight[2]);
    doc.setDrawColor(colorAccent[0], colorAccent[1], colorAccent[2]);
    doc.roundedRect(margin + 4, cursorY + 3.5, 18, 5, 1, 1, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(colorAccent[0], colorAccent[1], colorAccent[2]);
    doc.text(layer.step, margin + 6, cursorY + 7);

    // Title & Platform
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
    doc.text(layer.title, margin + 25, cursorY + 7.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
    doc.text(`[ ${layer.platform} ]`, pageWidth - margin - 4, cursorY + 7.5, {
      align: "right",
    });

    // Description
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(colorSecondary[0], colorSecondary[1], colorSecondary[2]);
    const layerDesc = doc.splitTextToSize(layer.description, contentWidth - 8);
    doc.text(layerDesc, margin + 4, cursorY + 13);

    // Key Features bullet line
    doc.setFont("helvetica", "italic");
    doc.setFontSize(6.5);
    doc.setTextColor(colorAccent[0], colorAccent[1], colorAccent[2]);
    doc.text(
      `Features: ${layer.keyFeatures.join("  |  ")}`,
      margin + 4,
      cursorY + 19
    );

    cursorY += 24;
  });

  cursorY += 4;

  // --- SECTION 3: KEY ALGORITHMIC BREAKTHROUGHS ---
  ensureSpace(40);
  doc.setDrawColor(colorAccent[0], colorAccent[1], colorAccent[2]);
  doc.line(margin, cursorY, margin + contentWidth, cursorY);
  cursorY += 5;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  doc.text("3. KEY ALGORITHMIC BREAKTHROUGHS", margin, cursorY);
  cursorY += 7;

  cs.deepDive.forEach((dive) => {
    ensureSpace(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
    doc.text(`• ${dive.title}`, margin, cursorY);
    cursorY += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(colorSecondary[0], colorSecondary[1], colorSecondary[2]);
    const diveDesc = doc.splitTextToSize(dive.description, contentWidth);
    doc.text(diveDesc, margin, cursorY);
    cursorY += diveDesc.length * 4.5 + 3;

    if (dive.codeSnippet) {
      ensureSpace(35);
      const codeLines = dive.codeSnippet.split("\n");
      const codeBoxHeight = codeLines.length * 3.5 + 8;

      doc.setFillColor(colorDarkBg[0], colorDarkBg[1], colorDarkBg[2]);
      doc.roundedRect(margin, cursorY, contentWidth, codeBoxHeight, 2, 2, "F");

      if (dive.codeSnippetTitle) {
        doc.setFont("courier", "bold");
        doc.setFontSize(6.5);
        doc.setTextColor(colorAccent[0], colorAccent[1], colorAccent[2]);
        doc.text(`// ${dive.codeSnippetTitle}`, margin + 4, cursorY + 5);
      }

      doc.setFont("courier", "normal");
      doc.setFontSize(6);
      doc.setTextColor(241, 245, 249);
      let codeY = cursorY + 9;
      codeLines.forEach((line) => {
        doc.text(line, margin + 4, codeY);
        codeY += 3.5;
      });

      cursorY += codeBoxHeight + 4;
    }

    dive.keyTakeaways.forEach((takeaway) => {
      ensureSpace(8);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(colorAccent[0], colorAccent[1], colorAccent[2]);
      doc.text(">", margin + 4, cursorY);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(colorSecondary[0], colorSecondary[1], colorSecondary[2]);
      const takeText = doc.splitTextToSize(takeaway, contentWidth - 10);
      doc.text(takeText, margin + 8, cursorY);
      cursorY += takeText.length * 4 + 1.5;
    });

    cursorY += 4;
  });

  // --- SECTION 4: INTEGRATED TECH STACK ---
  ensureSpace(30);
  doc.setDrawColor(colorAccent[0], colorAccent[1], colorAccent[2]);
  doc.line(margin, cursorY, margin + contentWidth, cursorY);
  cursorY += 5;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  doc.text("4. INTEGRATED TECHNOLOGY STACK", margin, cursorY);
  cursorY += 6;

  cs.techStack.forEach((stack) => {
    ensureSpace(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
    doc.text(`${stack.category}: `, margin, cursorY);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(colorSecondary[0], colorSecondary[1], colorSecondary[2]);
    const techStr = stack.technologies.join("  •  ");
    const techSplit = doc.splitTextToSize(techStr, contentWidth - 40);
    doc.text(techSplit, margin + 45, cursorY);
    cursorY += Math.max(techSplit.length * 4, 5) + 2;
  });

  cursorY += 4;

  // --- SECTION 5: BUSINESS ROI & VERIFICATION ---
  ensureSpace(35);
  doc.setDrawColor(colorAccent[0], colorAccent[1], colorAccent[2]);
  doc.line(margin, cursorY, margin + contentWidth, cursorY);
  cursorY += 5;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  doc.text("5. BUSINESS ROI & OPERATIONAL VERIFICATION", margin, cursorY);
  cursorY += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(colorSecondary[0], colorSecondary[1], colorSecondary[2]);
  const impOverview = doc.splitTextToSize(cs.impact.overview, contentWidth);
  doc.text(impOverview, margin, cursorY);
  cursorY += impOverview.length * 4 + 4;

  cs.impact.results.forEach((res) => {
    ensureSpace(14);
    doc.setFillColor(colorCardBg[0], colorCardBg[1], colorCardBg[2]);
    doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
    doc.roundedRect(margin, cursorY, contentWidth, 12, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(colorAccent[0], colorAccent[1], colorAccent[2]);
    doc.text(`[✓] ${res.metric}:`, margin + 4, cursorY + 5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(colorSecondary[0], colorSecondary[1], colorSecondary[2]);
    const resDesc = doc.splitTextToSize(res.description, contentWidth - 55);
    doc.text(resDesc, margin + 50, cursorY + 5);

    cursorY += 14;
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
