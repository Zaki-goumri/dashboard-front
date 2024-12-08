
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <main className=" flex mt-[3.418vh] w-full justify-between">
        <aside className="flex ml-[8.403vw] mt-[]">
        <Image src="/assets/logo.svg" alt="Logo of zaki" width={23.73} height={26.44} />
        <div className="flex flex-col ml-[1.137vw]">
        <span className="font-bold text-[22.21px]">zakaria</span>
        <span className="font-normal text-[9.18px] tracking-widest ml-[2.353vw]" >GOUMRI</span>
        </div>
        </aside>
        <aside className="flex gap-2 mr-[10vw]">
        <Link href="#aboutme" className="inline-block  font-medium bg-transparent border border-white md:px-[15px] lg:pt-[9px] md:pb-[5px] rounded-[8.8px]  px-[9px] pt-[6px] ">About me</Link>
        <Link href="#contact"  className="inline-block bg-white border border-white text-black md:px-[15px] md:pt-[9px] md:pb-[5px] rounded-[8.8px] px-[9px] pt-[6px] " >Contact</Link>
        </aside>  
    </main>
  );
} 
export default Header;