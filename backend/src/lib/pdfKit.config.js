import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateRoadmapPDF = (roadmapData, jobTitle) => {
  const safeFileName = jobTitle.replace(/\s+/g, "_").toLowerCase();
  const filePath = path.join('public', 'roadmaps', `${safeFileName}_roadmap.pdf`);

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text(`Roadmap for ${jobTitle}`, { underline: true }).moveDown();

 roadmapData.forEach((phase,index) => {
      // Start phase section
      const phaseY = doc.y;
      const startX = doc.page.margins.left;
      const boxWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

      // Draw rectangle for phase
      const boxHeightEstimate = 180; // You can calculate based on content
      doc.roundedRect(startX, phaseY, boxWidth, boxHeightEstimate, 10).stroke();

      doc
        .fontSize(15)
        .font('Helvetica-Bold')
        .text(`${phase.phase}`, startX + 10, phaseY + 10);

      let cursorY = doc.y + 10;

      phase.items.forEach((step, index) => {
        doc
          .fontSize(13)
          .font('Helvetica')
          .text(`• ${step.title}`, startX + 20, cursorY);

        if (step.details) {
          cursorY = doc.y + 2;
          doc
            .fontSize(9)
            .text(step.details, startX + 30, cursorY, { width: boxWidth - 60 });
        }

        cursorY = doc.y + 10;
        doc.y = cursorY;
      });

      doc.moveDown(6);

      if(index == 2) doc.addPage()
    });


  doc.end();
  return `download/${safeFileName}_roadmap.pdf`; // return link path
};
