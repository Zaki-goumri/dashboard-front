import React from "react";
import Image from "next/image";

 const Footer = () => {
    return(
    <main className="flex flex-col items-center text-neutral-200">
     <p className="flex font-medium text-xs text-center">Loosely designed in &nbsp; <Image src="/assets/figma.svg" height={11} width={7.33} alt="figma logo"/>&nbsp; Figma and coded in Visual Studio Code by yours truly. </p>
     <p className=" font-medium text-xs text-center">Built with Next.js
     and Tailwind CSS, All text is set in the Inter typeface.</p>
    </main>
)}
export default Footer;