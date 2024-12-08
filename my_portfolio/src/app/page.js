import React from "react";
import Header from "./components/header";
import Bio from "./components/bio";
import AboutMe from "./components/aboutMe";
import Experience from "./components/experiences";
import Projects from "./components/projects";
import ContactMe from "./components/contactMe";
import Footer from "./components/footer";
import { SpeedInsights } from "@vercel/speed-insights/next"



export default function Home() {
  return (
    <main className="mb-[10%]">
    <Header/>
    <Bio/>
    <AboutMe />
    <Experience />
    <Projects />
    <ContactMe/>
    <Footer/>
    </main>
  );
}
