import React from "react";
import contributors from "@/data/contributors";
import Image from "next/image";

const Contributors = () => {
  return (
    // <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
    //   {contributors.map((contributor, index) => (
    //     //  <div key={index} className="perspective-[1000px]">
    //     //    <Image
    //     //      alt={contributor.text}
    //     //      src={contributor.url}
    //     //      width={500}
    //     //      height={500}
    //     //    ></Image>
    //     //  </div>
    //     <div key={index} className="w-96 h-96 ">
    //       {/* Front face with image */}
    //       <div className=" backface-hidden">
    //         {contributor.url && (
    //           <Image
    //             className="object-cover cursor-pointer object-left h-full w-full rounded-xl"
    //             src={contributor.url}
    //             alt={contributor.name}
    //             width={320}
    //             height={320}
    //           />
    //         )}
    //         <p className=" md:my-6 text-2xl">{contributor.name}</p>
    //       </div>
    //       {/* Back face with text */}
    //       <div className="">
    //         <div className="flex min-h-full flex-col items-center justify-center">
    //           <h2 className="text-2xl font-bold mb-4">{contributor.name}</h2>
    //           <p className="text-lg text-pretty text-center mb-4 ">
    //             {contributor.text}
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>

    <div className=" mx-auto grid gap-1  md:space-y-0 sm:gap-16 lg:grid-cols-3">
      {contributors.map((contributor) => (
        <div
          key={contributor.name}
          className="group h-48 w-48  perspective-[1000px]"
        >
          <div className="relative h-full w-full border-red-200 border-4 shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            {/* Front face with image */}
            <div className="absolute inset-0 h-full w-full  [backface-visibility:hidden]">
              {contributor.url && (
                <Image
                  className="object-cover cursor-pointer object-left h-full w-full "
                  src={contributor.url}
                  alt={contributor.name}
                  width={320}
                  height={320}
                />
              )}
              <p className="  text-2xl text-white mt-2">{contributor.name}</p>
            </div>
            {/* Back face with text */}
            <div className="absolute overflow-y-auto inset-0 h-full w-full  bg-white px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <div className="flex min-h-full flex-col items-center justify-center ">
                {/* <h2 className="text-md font-bold mb-4">{contributor.name}</h2> */}
                <p className="text-md text-pretty  text-red-600 text-center mb-4 ">
                  {contributor.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contributors;
