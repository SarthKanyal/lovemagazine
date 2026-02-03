// src/components/MagazineContainer.tsx

import { archivoBlack } from "@/public/fonts";
import React from "react";

// Define props if you ever need to pass data to the embedded component
interface MagazineContainerProps {
  // e.g., pdfUrl: string;
  onReadClick: () => void;
}

const MagazineContainer: React.FC<MagazineContainerProps> = ({
  onReadClick,
}) => {
  return (
    // This div ensures the embedded PDF viewer/Magazine component fills 100% of the RIGHT PANEL.
    <div className="w-full h-full flex flex-col justify-center items-center relative">
      {/* Placeholder for the large "LOVE magazine" text on the right panel */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1
          className={
            "text-9xl font-extrabold text-red-600    text-shadow-lg/100  text-shadow-red-200 " +
            archivoBlack.className
          }
        >
          LOVE
        </h1>
        <h3 className="text-2xl mt-2 tracking-widest  text-red-600 text-center">
          magazine
        </h3>
      </div>

      {/* Action Buttons Placeholder */}
      <div className="flex space-x-4 z-10 p-4">
        {/* <button
          onClick={onReadClick}
          className="px-6 py-2 border-2 hover:shadow-amber-700 border-red-600 text-red-600 font-semibold bg-white hover:bg-red-50 transition duration-150"
        >
          READ
        </button> */}

        <div
          className="relative inline-block px-4 py-2 font-semibold group "
          onClick={onReadClick}
        >
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-red-950 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white border-2 border-red-950 group-hover:bg-red-800"></span>
          <span className="relative text-red-600 group-hover:text-white ">
            READ
          </span>
        </div>
        <a
          href="https://love-magazine.s3.us-east-1.amazonaws.com/Love.pdf"
          download="Love.pdf"
        >
          <div className="relative inline-block px-4 py-2 font-semibold group ">
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-red-950 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-red-950 group-hover:bg-red-800"></span>
            <span className="relative text-red-600 group-hover:text-white ">
              DOWNLOAD
            </span>
          </div>
          {/* <button className="px-6 py-2 border-2 border-red-600 text-white font-semibold bg-red-600 hover:bg-red-700 transition duration-150">
            DOWNLOAD
          </button> */}
        </a>
      </div>

      {/* This is where your PDF component will go, replacing the content above if necessary */}
      <p className="absolute bottom-4 right-4 text-xs text-gray-500 z-10">
        vol #1. isu #1. 12/2025
      </p>
    </div>
  );
};

export default MagazineContainer;
