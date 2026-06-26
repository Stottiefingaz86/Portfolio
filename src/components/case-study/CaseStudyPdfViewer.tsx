interface CaseStudyPdfViewerProps {
  src: string;
  title: string;
  inline?: boolean;
}

export function CaseStudyPdfViewer({ src, title, inline = false }: CaseStudyPdfViewerProps) {
  const pdfSrc = encodeURI(src);

  return (
    <div className={inline ? 'case-pdf-viewer case-pdf-viewer--inline' : 'case-pdf-viewer'}>
      <iframe
        src={`${pdfSrc}#view=FitH&toolbar=1&navpanes=0`}
        title={title}
        className="case-pdf-viewer-frame"
      />
      <a href={pdfSrc} target="_blank" rel="noopener noreferrer" className="case-pdf-viewer-link">
        Open full PDF
      </a>
    </div>
  );
}
