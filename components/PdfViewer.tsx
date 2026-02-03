// src/components/PdfViewer.tsx
"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useCallback, useId, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { Document, Page, pdfjs } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";

import "./Sample.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Sample from "./Sample";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
  wasmUrl: "/wasm/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

type PDFFile = string | File | null;
// NOTE: The actual react-pdf implementation (Document, Page, etc.)
// must be wrapped in a component that is dynamically imported with ssr: false
// due to its reliance on browser APIs.

// Placeholder for the dynamically imported PDF reader
const DynamicPdfReader = dynamic(
  () =>
    // Promise.resolve(() => (
    //   // Replace this internal div with your react-pdf Document/Page components
    //   <div className="w-full h-full bg-red-600 flex flex-col items-center justify-center text-white p-4">
    //     {/* <h2 className="text-3xl mb-4">📖 Full-Screen PDF Viewer</h2>
    //     <p>This is where the two-page **react-pdf** spread will be rendered.</p>
    //     <p className="text-sm mt-2">
    //       (Rendered via **Dynamic Import** to handle SSR.)
    //     </p> */}
    //     <Sample />
    //   </div>
    // )),
    import("./Sample"),
  { ssr: false }
);

interface PdfViewerProps {
  onExit: () => void;
  // pdfUrl: string; // Pass the URL here
}

const PdfViewer = () => {
  const fileId = useId();
  const [file, setFile] = useState<PDFFile>("public/Love.pdf");
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;

    const nextFile = files?.[0];

    if (nextFile) {
      setFile(nextFile);
    }
  }

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }
  return (
    <div className="w-full h-full bg-black">
      <DynamicPdfReader />
    </div>
  );
};

export default PdfViewer;
