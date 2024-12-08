import React from "react";
import {projects} from "../constantes";
import Image from "next/image";
const Projects = () => {
    return (
        <main>
            <div className="flex flex-col items-center mb-[4.853vh] ">
         <p className="text-[4.404vw] font-extrabold ">PROJECTS</p>
         <p className="bg-gradient-to-r from-violet-400 to-orange-400  text-transparent bg-clip-text text-sm font-medium tracking-widest mb-4">EXPLORE NOW</p>
         </div>
           
            <ul className="grid  lg:grid-cols-2 gap-10 ml-[18.306vw] sm:grid-cols-1 ">
                {projects.map((project,index)=>{
                     return(
                        <li key={index} className="flex ">
                            <Image src={project.path} alt={project.company} width={126} height={70.93} className="rounded-[0.524vw]"/>
                            <div className="ml-[0.972vw]">
                            <p className="font-extrabold text-lg  ">{project.company}</p>
                            <p className="font-medium text-xs w-[80%] text-zinc-500">{project.description}</p>
                            </div>
                        </li>
                    )})}
                </ul>
            
        </main>
    )}
export default Projects;