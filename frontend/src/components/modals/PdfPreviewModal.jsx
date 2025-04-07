// Komponent: PdfPreviewModal
// Beskrivning: Visar en förhandsvisning av arbetsorder i modal och låter användaren ladda ner den som PDF.

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../../styles/Modal.css";
import PdfButton from "../buttons/PdfButton";
import { FaTimes } from "react-icons/fa";

function PdfPreviewModal({ jobData, onClose, fields = [] }) {
  // Skapar och laddar ner PDF av förhandsvisningen
  const handleDownload = async () => {
    const input = document.getElementById("pdf-content");

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`arbetsorder-${jobData?.regnr || "fil"}.pdf`);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content image-view-modal pdf-modal">
        <button
          className="close-button small"
          onClick={onClose}
          aria-label="Stäng förhandsvisning"
        >
          <FaTimes />
        </button>

        <div id="pdf-content" className="pdf-preview-content">
          <h3>Arbetsorder</h3>
          {fields.map((field, index) => (
            <div key={index} className="pdf-preview-row">
              <span>{field.label}:</span>
              <span>{jobData[field.name] || "-"}</span>
            </div>
          ))}
        </div>

        <div className="pdf-download-wrapper">
          <PdfButton onClick={handleDownload} />
        </div>
      </div>
    </div>
  );
}

export default PdfPreviewModal;
