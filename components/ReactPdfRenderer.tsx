"use client";
import dynamic from "next/dynamic";

interface PdfViewerProps {
  onExit: () => void;
}

const Sample = dynamic(() => import("./Sample"), {
  ssr: false,
});

const ReactPdfRenderer: React.FC<PdfViewerProps> = ({ onExit }) => {
  return (
    // 2. Main Container: Should fill the entire parent space (w-full h-full)
    // and use 'relative' positioning so the absolute Close button works correctly.
    <div className="w-full h-full relative">
      {/* 3. The Core PDF Viewer */}
      {/* Sample will fill this container and apply its own internal layout/controls */}
      <Sample />

      {/* 4. The Close Button (Absolute Overlay) */}
      {/* This button is outside of Sample, but inside ReactPdfRenderer */}
      <button
        onClick={onExit} // Uses the prop lifted from HomePage.tsx
        // Tailwind classes for styling and positioning
        className="absolute top-4 right-4 z-50 px-2 py-1  bg-red-800 hover:bg-red-600 text-white font-bold text-sm tracking-widest rounded shadow-lg  hover:scale-105 transition-all"
      >
        ✕
      </button>
    </div>
  );
};

export default ReactPdfRenderer;
