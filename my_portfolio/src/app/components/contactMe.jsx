import React from "react"
import {contacts} from "../constantes"
import Link from "next/link";
import Image from "next/image";

const ContactMe = () => {
    return (
        <main id="contact" className="mb-6">
            <div className="flex flex-col items-center mt-[7.41vw] ">
         <p className="text-[4.404vw] font-extrabold ">CONTACT ME</p>
         <p className="bg-gradient-to-r from-violet-400 to-orange-400  text-transparent bg-clip-text text-sm font-medium tracking-widest mb-4">EXPLORE NOW</p>
         </div>
         <div className="flex items-center flex-col gap-8">
         <p className="w-[50%] text-center">As a passionate software engineer, I thrive on the intricate dance between logic and creativity.for business and services you'll find my contacts</p>
        <ul className="flex gap-[3vw] ">
         {contacts.map((contact,index)=>{
            return(
              <li key={index}>
              <Link href={contact.link} target="_blank" rel={contact.rel} >
                <Image src={contact.path}  alt="contact" height={20} width={20} />
                </Link>
                </li>
            )
         })}
         </ul>
         </div>
         
         </main>
    )}
    
    export default ContactMe; 