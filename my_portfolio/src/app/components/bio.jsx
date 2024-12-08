"use client"
import React from "react";
import Image from "next/image";
const Bio = () => {
    
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/Zakaria Goumri.pdf"; 
        link.download = "/zakariaGoumri.pdf"; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
   
   
    return (
        <main className="flex justify-center mt-[8.403vw]">
         <div className="flex flex-col items-center">
         <Image src="/assets/me.svg" alt="Hero image"  className="border rounded-full border-transparent  w-[150px] md:w-[231px] " height={231} width={231} />         
         <h1 className="text-[4.404vw] font-extrabold">zakaria Goumri!</h1>
         <h2 className="md:text-[1.813vw]  text-zinc-500 font-semibold mb-[1.458vw] ">  I do code & <span className="bg-gradient-to-r from-violet-400 to-orange-400  text-transparent bg-clip-text ">chill</span>🍿</h2>
         <p className="text-neutral-200 sm:w-[37vw] text-center mb-[1.458vw]">Passionate Software Engineer with a focus on React development,
         dedicated to crafting elegant and user-friendly web applications</p>
         <button onClick={handleDownload} className="bg-black border border-white px-[3.056vw] py-[1.111vw] rounded-[5.208vw] mb-[1.458vw]">Download cv</button>
         </div>
        </main>
    );
}
export default Bio;