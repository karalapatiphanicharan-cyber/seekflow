import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { SimulationResult, Direction } from '../algorithms/types';

interface ExportData {
  head: number;
  diskSize: number;
  direction: Direction;
  requestString: string;
  results: SimulationResult[];
}

// Extend jsPDF type to include lastAutoTable from jspdf-autotable
interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable: {
    finalY: number;
  };
}

export const exportToPDF = (data: ExportData) => {
  const doc = new jsPDF() as jsPDFWithAutoTable;
  const timestamp = new Date().toLocaleString();

  // Header
  doc.setFontSize(22);
  doc.setTextColor(217, 119, 6); // SeekFlow Primary (#D97706)
  doc.text('SeekFlow', 14, 20);

  doc.setFontSize(14);
  doc.setTextColor(40, 40, 40);
  doc.text('Disk Scheduling Algorithm Comparison Report', 14, 30);

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${timestamp}`, 14, 38);

  // Simulation Inputs
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Simulation Inputs', 14, 50);

  autoTable(doc, {
    startY: 55,
    head: [['Parameter', 'Value']],
    body: [
      ['Initial Head Position', data.head.toString()],
      ['Disk Size', data.diskSize.toString()],
      ['Initial Direction', data.direction.toUpperCase()],
      ['Request Sequence', data.requestString]
    ],
    theme: 'grid',
    headStyles: { fillColor: [31, 41, 55] }
  });

  // Summary Section
  const minSeek = Math.min(...data.results.map(r => r.totalSeek));
  const winners = data.results.filter(r => r.totalSeek === minSeek).map(r => r.algorithm);
  const bestAvg = Math.min(...data.results.map(r => r.averageSeek)).toFixed(2);

  const finalYAfterInputs = doc.lastAutoTable.finalY;

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Performance Summary', 14, finalYAfterInputs + 15);

  autoTable(doc, {
    startY: finalYAfterInputs + 20,
    body: [
      ['Best Performer(s)', winners.join(', ')],
      ['Lowest Total Seek', `${minSeek} tracks`],
      ['Best Average Seek', `${bestAvg} tracks`],
      ['Algorithms Compared', data.results.length.toString()],
      ['Total Requests', data.results[0]?.completedRequests.toString() || '0']
    ],
    theme: 'plain',
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } }
  });

  const finalYAfterSummary = doc.lastAutoTable.finalY;

  // Detailed Results Table
  doc.setFontSize(12);
  doc.text('Detailed Analysis', 14, finalYAfterSummary + 15);

  autoTable(doc, {
    startY: finalYAfterSummary + 20,
    head: [['Algorithm', 'Total Seek Distance', 'Average Seek']],
    body: data.results.map(r => [
      r.algorithm,
      r.totalSeek.toString(),
      r.averageSeek.toFixed(2)
    ]),
    theme: 'striped',
    headStyles: { fillColor: [217, 119, 6] }
  });

  // Execution Order
  doc.addPage();
  doc.setFontSize(14);
  doc.text('Execution Sequences', 14, 20);

  let currentY = 30;
  data.results.forEach(res => {
    doc.setFontSize(11);
    doc.setTextColor(217, 119, 6);
    doc.text(res.algorithm, 14, currentY);

    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    const sequenceText = res.sequence.join(' -> ');
    const splitText = doc.splitTextToSize(sequenceText, 180) as string[];
    doc.text(splitText, 14, currentY + 7);

    currentY += (splitText.length * 5) + 15;

    if (currentY > 270) {
        doc.addPage();
        currentY = 20;
    }
  });

  // Footer
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('SeekFlow - OS Disk Scheduling Visualizer', 14, 285);
    doc.text('GitHub: https://github.com/karalapatiphanicharan-cyber/seekflow', 14, 290);
    doc.text(`Page ${i} of ${totalPages}`, 180, 290);
  }

  doc.save(`SeekFlow_Report_${new Date().getTime()}.pdf`);
};
