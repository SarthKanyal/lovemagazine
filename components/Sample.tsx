// // "use client";
// // import { useCallback, useId, useState } from "react";
// // import { useResizeObserver } from "@wojtekmaj/react-hooks";
// // import { Document, Page, pdfjs } from "react-pdf";
// // import "react-pdf/dist/Page/AnnotationLayer.css";
// // import "react-pdf/dist/Page/TextLayer.css";

// // import "./Sample.css";
// // import { error } from "console";

// // // pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
// // import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

// // pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// // const options = {
// //   cMapUrl: "/cmaps/",
// //   standardFontDataUrl: "/standard_fonts/",
// //   wasmUrl: "/wasm/",
// // };

// // const resizeObserverOptions = {};

// // const maxWidth = 800;

// // type PDFFile = string | File | null;

// // export default function Sample() {
// //   const fileId = useId();
// //   const [file, setFile] = useState<PDFFile>("./Love.pdf");
// //   const [numPages, setNumPages] = useState<number>(0);
// //   const [pageNumber, setPageNumber] = useState(1);

// //   const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
// //   const [containerWidth, setContainerWidth] = useState<number>();

// //   const onResize = useCallback<ResizeObserverCallback>((entries) => {
// //     const [entry] = entries;

// //     if (entry) {
// //       setContainerWidth(entry.contentRect.width);
// //     }
// //   }, []);

// //   useResizeObserver(containerRef, resizeObserverOptions, onResize);

// //   function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
// //     const { files } = event.target;

// //     const nextFile = files?.[0];

// //     if (nextFile) {
// //       setFile(nextFile);
// //     }
// //   }

// //   function onDocumentLoadSuccess({
// //     numPages: nextNumPages,
// //   }: {
// //     numPages: number;
// //   }): void {
// //     setNumPages(nextNumPages);
// //     setPageNumber(1);
// //   }

// //   function changePage(offset: number) {
// //     setPageNumber((prevPageNumber) => prevPageNumber + offset);
// //   }

// //   function previousPage() {
// //     changePage(-1);
// //   }

// //   function nextPage() {
// //     changePage(1);
// //   }

// //   return (
// //     <div className="Example">
// //       <div className="Example__container">
// //         <div className="Example__container__document" ref={setContainerRef}>
// //           <Document
// //             file={file}
// //             onLoadSuccess={onDocumentLoadSuccess}
// //             onError={(err) => console.log(err)}
// //             options={options}
// //           >
// //             {/* {Array.from(new Array(numPages), (_el, index) => (
// //               <Page
// //                 key={`page_${index + 1}`}
// //                 pageNumber={index + 1}
// //                 width={
// //                   containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
// //                 }
// //               />
// //             ))} */}
// //             <Page pageNumber={pageNumber} />
// //           </Document>
// //           <div>
// //             <p>
// //               Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
// //             </p>
// //             <button
// //               type="button"
// //               disabled={pageNumber <= 1}
// //               onClick={previousPage}
// //             >
// //               Previous
// //             </button>
// //             <button
// //               type="button"
// //               disabled={pageNumber >= numPages}
// //               onClick={nextPage}
// //             >
// //               Next
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // src/components/PdfViewer.tsx

// import React, { useCallback, useState, useEffect } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import { useResizeObserver } from "@wojtekmaj/react-hooks";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";

// // Worker Setup
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// interface PdfViewerProps {
//   onExit: () => void;
// }

// const Sample = () => {
//   const [file] = useState("./Love.pdf");
//   const [numPages, setNumPages] = useState<number>(0);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
//   const [containerHeight, setContainerHeight] = useState<number>(800);

//   // 1. RESIZE OBSERVER: Track HEIGHT, not width.
//   // We want the magazine to fit vertically within the screen.
//   const onResize = useCallback<ResizeObserverCallback>((entries) => {
//     const [entry] = entries;
//     if (entry) {
//       // Subtract a buffer (e.g., 120px) for the navbar/padding so it doesn't overflow
//       setContainerHeight(entry.contentRect.height - 100);
//     }
//   }, []);

//   useResizeObserver(containerRef, {}, onResize);

//   function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
//     setNumPages(numPages);
//     setPageNumber(1);
//   }

//   // Navigation Logic
//   const changePage = (offset: number) => {
//     setPageNumber((prev) => {
//       // If on cover (1) and going forward, jump 1. Otherwise jump 2.
//       const jump = prev === 1 && offset > 0 ? 1 : 2;
//       // Ensure we don't go below 1 or above max
//       const newPage = prev + (offset > 0 ? jump : -jump);
//       return Math.max(1, Math.min(newPage, numPages));
//     });
//   };

//   const isCover = pageNumber === 1;
//   const page1 = pageNumber;
//   const page2 = isCover ? null : pageNumber + 1;

//   return (
//     // MAIN CONTAINER: Full screen, grey background
//     <div className="fixed inset-0 z-50 bg-gray-900 flex flex-col">
//       {/* HEADER: Close Button & Controls */}

//       {/* PDF AREA: Flex center to hold the document */}
//       <div
//         className="flex-1 w-full flex items-center justify-center overflow-hidden p-4"
//         ref={setContainerRef}
//       >
//         <Document
//           file={file}
//           onLoadSuccess={onDocumentLoadSuccess}
//           // CRITICAL FIX 1: This makes the pages sit side-by-side (Horizontal Layout)
//           className="flex flex-row gap-2 shadow-2xl"
//           loading={<div className="text-white">Loading PDF...</div>}
//         >
//           {/* Page 1 */}
//           <div className="bg-white">
//             <Page
//               pageNumber={page1}
//               // CRITICAL FIX 2: Size by Height.
//               // This ensures the page always fits the vertical screen space.
//               height={containerHeight}
//               renderTextLayer={false} // Improves performance
//               renderAnnotationLayer={false}
//               className="border-r border-gray-200"
//             />
//           </div>

//           {/* Page 2 (Only if not cover and exists) */}
//           {page2 && page2 <= numPages && (
//             <div className="bg-white">
//               <Page
//                 pageNumber={page2}
//                 height={containerHeight}
//                 renderTextLayer={false}
//                 renderAnnotationLayer={false}
//               />
//             </div>
//           )}
//         </Document>
//       </div>
//     </div>
//   );
// };

// export default Sample;

// src/components/Sample.tsx
// import React, { useCallback, useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import { useResizeObserver } from "@wojtekmaj/react-hooks";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";

// // Ensure worker is set up
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// export default function Sample() {
//   const [file] = useState("./Love.pdf");
//   const [numPages, setNumPages] = useState<number>(0);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
//   const [containerHeight, setContainerHeight] = useState<number>(800);

//   // Resize Observer: Adjusts page height to fit container
//   const onResize = useCallback<ResizeObserverCallback>((entries) => {
//     const [entry] = entries;
//     if (entry) {
//       // Subtract header height (approx 60px) + padding so it fits without scrolling
//       setContainerHeight(entry.contentRect.height - 60);
//     }
//   }, []);

//   useResizeObserver(containerRef, {}, onResize);

//   function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
//     setNumPages(numPages);
//     setPageNumber(1);
//   }

//   const changePage = (offset: number) => {
//     setPageNumber((prev) => {
//       const jump = prev === 1 && offset > 0 ? 1 : 2;
//       const newPage = prev + (offset > 0 ? jump : -jump);
//       return Math.max(1, Math.min(newPage, numPages));
//     });
//   };

//   const isCover = pageNumber === 1;
//   const page1 = pageNumber;
//   const page2 = isCover ? null : pageNumber + 1;

//   return (
//     <div className="w-full h-full flex flex-col bg-gray-900">
//       {/* NAVIGATION BAR (Internal to PDF Viewer) */}
//       <div className="h-14 bg-gray-800 flex items-center justify-center space-x-6 shadow-md z-10 text-white shrink-0">
//         <button
//           onClick={() => changePage(-1)}
//           disabled={pageNumber <= 1}
//           className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-30 text-sm font-medium transition"
//         >
//           &larr; Prev
//         </button>

//         <span className="text-sm font-mono tracking-wide">
//           {page1} {page2 ? `- ${page2}` : ""} / {numPages}
//         </span>

//         <button
//           onClick={() => changePage(1)}
//           disabled={pageNumber >= numPages}
//           className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-30 text-sm font-medium transition"
//         >
//           Next &rarr;
//         </button>
//       </div>

//       {/* PDF DOCUMENT AREA */}
//       <div
//         className="flex-1 w-full flex items-center justify-center overflow-hidden p-4 relative"
//         ref={setContainerRef}
//       >
//         <Document
//           file={file}
//           onLoadSuccess={onDocumentLoadSuccess}
//           className="flex flex-row gap-0 shadow-2xl" // Gap-0 for seamless magazine look
//           loading={
//             <div className="text-white animate-pulse">Loading Magazine...</div>
//           }
//         >
//           {/* Page 1 */}
//           <div className="bg-white">
//             <Page
//               pageNumber={page1}
//               height={containerHeight}
//               renderTextLayer={false}
//               renderAnnotationLayer={false}
//               className={!isCover ? "border-r border-gray-300" : ""}
//               scale={1}
//             />
//           </div>

//           {/* Page 2 */}
//           {page2 && page2 <= numPages && (
//             <div className="bg-white">
//               <Page
//                 pageNumber={page2}
//                 height={containerHeight}
//                 renderTextLayer={false}
//                 renderAnnotationLayer={false}
//                 scale={1}
//               />
//             </div>
//           )}
//         </Document>
//       </div>
//     </div>
//   );
// }
// src/components/Sample.tsx (Refactored for High Resolution)

// import React, { useCallback, useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import { useResizeObserver } from "@wojtekmaj/react-hooks";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// // CRITICAL FIX: Define a high scale factor for rendering.
// // A scale of 2.0 to 3.0 often provides crisp text on high-density displays (Retina/4K).
// const RENDER_SCALE = 2.0;

// export default function Sample() {
//   const [file] = useState("./Love.pdf");
//   const [numPages, setNumPages] = useState<number>(0);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
//   // Renamed to targetHeight as it represents the available space for one page
//   const [targetHeight, setTargetHeight] = useState<number>(800);

//   // Resize Observer: Track height of the viewing area
//   const onResize = useCallback<ResizeObserverCallback>((entries) => {
//     const [entry] = entries;
//     if (entry) {
//       // Subtract buffer for the navigation bar and padding (approx 80px)
//       setTargetHeight(entry.contentRect.height - 120);
//     }
//   }, []);

//   useResizeObserver(containerRef, {}, onResize);

//   function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
//     setNumPages(numPages);
//     setPageNumber(1);
//   }

//   const changePage = (offset: number) => {
//     setPageNumber((prev) => {
//       const jump = prev === 1 && offset > 0 ? 1 : 2;
//       const newPage = prev + (offset > 0 ? jump : -jump);
//       return Math.max(1, Math.min(newPage, numPages));
//     });
//   };

//   const isCover = pageNumber === 1;
//   const page1 = pageNumber;
//   const page2 = isCover ? null : pageNumber + 1;

//   return (
//     <div className="w-full h-full flex flex-col bg-gray-900">
//       {/* NAVIGATION BAR (H-14) */}
//       {/* <div className=" h-14 bg-gray-800 flex items-center justify-center space-x-6 shadow-md z-10 text-white shrink-0">
//         <button
//           onClick={() => changePage(-1)}
//           disabled={pageNumber <= 1}
//           className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-30 text-sm font-medium transition"
//         >
//           &larr; Prev
//         </button>

//         <span className="text-sm font-mono tracking-wide">
//           {page1} {page2 ? `- ${page2}` : ""} / {numPages}
//         </span>

//         <button
//           onClick={() => changePage(1)}
//           disabled={pageNumber >= numPages}
//           className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-30 text-sm font-medium transition"
//         >
//           Next &rarr;
//         </button>
//       </div> */}

//       {/* PDF DOCUMENT AREA */}
//       <div
//         className="flex-1 w-full flex items-center justify-center overflow-auto p-4 relative"
//         ref={setContainerRef}
//       >
//         <Document
//           file={file}
//           onLoadSuccess={onDocumentLoadSuccess}
//           className="flex flex-row gap-0 shadow-2xl"
//           loading={
//             <div className="text-white animate-pulse">Loading Magazine...</div>
//           }
//         >
//           {/* Page 1 */}
//           <div className="bg-white">
//             <Page
//               pageNumber={page1}
//               // Set the physical height on screen
//               height={targetHeight}
//               // CRITICAL FIX: Set the render scale for high resolution
//               scale={RENDER_SCALE}
//               renderTextLayer={false}
//               renderAnnotationLayer={false}
//               className={!isCover ? "border-r border-gray-300" : ""}
//             />
//           </div>

//           {/* Page 2 */}
//           {page2 && page2 <= numPages && (
//             <div className="bg-white">
//               <Page
//                 pageNumber={page2}
//                 height={targetHeight}
//                 // CRITICAL FIX: Set the render scale for high resolution
//                 scale={RENDER_SCALE}
//                 renderTextLayer={false}
//                 renderAnnotationLayer={false}
//               />
//             </div>
//           )}
//         </Document>
//       </div>
//     </div>
//   );
// }

// src/components/Sample.tsx

import React, { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const RENDER_SCALE = 2.0;

export default function Sample() {
  const [file] = useState(
    "https://love-magazine.s3.us-east-1.amazonaws.com/Love.pdf",
  );
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [targetHeight, setTargetHeight] = useState<number>(800); // Resize Observer: Track height of the viewing area

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;
    if (entry) {
      // 🐛 FIX 1: Recalculate buffer.
      // Navigation bar (h-14) is gone. We only need to account for the PADDING (p-4 = 16px top/bottom).
      // We'll use a slightly safer buffer of 40px (16px * 2 + a margin of safety).
      setTargetHeight(entry.contentRect.height - 40);
    }
  }, []);

  useResizeObserver(containerRef, {}, onResize);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const changePage = (offset: number) => {
    setPageNumber((prev) => {
      const jump = prev === 1 && offset > 0 ? 1 : 2;
      const newPage = prev + (offset > 0 ? jump : -jump);
      return Math.max(1, Math.min(newPage, numPages));
    });
  };

  const isCover = pageNumber === 1;
  const page1 = pageNumber;
  const page2 = isCover ? null : pageNumber + 1;

  return (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className=" h-14 bg-gray-900 flex items-center justify-center space-x-6 shadow-md z-10 text-white shrink-0">
        <button
          onClick={() => changePage(-1)}
          disabled={pageNumber <= 1}
          className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-30 text-sm font-medium transition"
        >
          &larr; Prev
        </button>

        <span className="text-sm font-mono tracking-wide">
          {page1} {page2 ? `- ${page2}` : ""} / {numPages}
        </span>

        <button
          onClick={() => changePage(1)}
          disabled={pageNumber >= numPages}
          className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-30 text-sm font-medium transition"
        >
          Next &rarr;
        </button>
      </div>
                  {/* PDF DOCUMENT AREA */}     {" "}
      <div
        // 🐛 FIX 2: Removed items-center. Use items-start to ensure content aligns to the top.
        // The overflow-auto will handle any remaining vertical overflow correctly.
        className="flex-1 w-full flex items-start justify-center overflow-auto p-4 relative"
        ref={setContainerRef}
      >
               {" "}
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex flex-row gap-0 shadow-2xl bg-gray-900"
          loading={
            <div className="text-white animate-pulse">Loading Magazine...</div>
          }
        >
                    {/* Page 1 */}         {" "}
          <div className="bg-gray-900">
                       {" "}
            <Page
              pageNumber={page1}
              height={targetHeight} // Uses the new, smaller buffer
              scale={RENDER_SCALE}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className={!isCover ? "border-r border-gray-300" : ""}
            />
                     {" "}
          </div>
                    {/* Page 2 */}         {" "}
          {page2 && page2 <= numPages && (
            <div className="bg-gray-900">
                           {" "}
              <Page
                pageNumber={page2}
                height={targetHeight}
                scale={RENDER_SCALE}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
                         {" "}
            </div>
          )}
                 {" "}
        </Document>
             {" "}
      </div>
         {" "}
    </div>
  );
}
