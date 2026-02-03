"use client"; // Required for using useState/client-side functionality

import React, { useState } from "react";
import Contributors from "./Contributors";
import MagazineContainer from "./MagazineComponents";
import ReactPdfRenderer from "./ReactPdfRenderer";
import { geistMono } from "@/public/fonts";

const Skeleton = () => {
  // State to manage the view: 'split' or 'reader'
  const [viewState, setViewState] = useState<"split" | "reader">("split");

  // Tailwind class based on state
  const leftPanelWidth = viewState === "split" ? "w-2/3" : "hidden"; // Hide the left panel
  const rightPanelWidth = viewState === "split" ? "w-1/3" : "w-full"; // Expand right panel

  return (
    <div className={"flex h-screen w-screen " + geistMono.className}>
      {/* LEFT PANEL */}
      {/* Conditionally hidden by setting w-1/2 or hidden */}
      <section
        className={`
          
          flex flex-col justify-start items-center ${leftPanelWidth} bg-red-600 p-5 space-y-3 overflow-y-auto transition-all duration-300 ease-out`}
      >
        {/* ... (Your original left panel content) ... */}
        {/* We can also move the READ button here and pass setViewState */}
        {/*  */}

        <div className="flex flex-col space-y-5 text-2xl text-white font-bold">
          <div className="w-1/2">
            &quot;Love&quot; Magazine is 100% independent.
          </div>
          <div className="flex flex-row justify-center w-full">
            <div className="w-1/2">
              100% of printing costs are funded by your donations. Thank You
            </div>
          </div>
          <div className="flex flex-row justify-end w-full">
            <div className="w-1/2">e-transfer : zachshoy@gmail.com</div>
          </div>
        </div>

        <div className="text-white text-center text-3xl p-3 font-extrabold mb-5 mt-5">
          <h2>Local Lovers</h2>
        </div>
        <Contributors />
      </section>

      {/* RIGHT PANEL */}
      {/* Expands from w-1/2 to w-full */}
      <section
        className={`${rightPanelWidth} h-full overflow-y-auto bg-white flex items-center justify-center transition-all duration-100 ease-out`}
      >
        {viewState === "split" ? (
          // Show the cover/landing view
          <MagazineContainer onReadClick={() => setViewState("reader")} />
        ) : (
          // Show the full-screen PDF viewer
          // <PdfViewer onExit={() => setViewState("split")} />
          <ReactPdfRenderer onExit={() => setViewState("split")} />
        )}
      </section>
    </div>
  );
};

export default Skeleton;
