import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Proof from "@/components/Proof";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";

const Index = () => {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar openPalette={() => setPaletteOpen(true)} />
      <main className="flex-1">
        <Hero />
        <Projects />
        <Proof />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </div>
  );
};

export default Index;
