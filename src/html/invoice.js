const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function createPdfFromHtml(html) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  // Embed the HTML as a font
  const font = await pdfDoc.embedFont('data:text/html;base64,' + Buffer.from(html).toString('base64'));

  // Create a Text content
  const text = page.drawText(html, {
    x: 50,
    y: 500,
    size: 12,
    font: font,
    color: [0, 0, 0],
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  // Write the bytes to a file
  fs.writeFileSync('invoice.pdf', pdfBytes);
}

// Call the function with your HTML
createPdfFromHtml('<h1>Invoice</h1><p></p>');
