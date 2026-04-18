import { useState } from "react";
import { ArrowRight, Mail, FileDown } from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { PROFILE, TYPING_PHRASES } from "@/utils/constants";
import SystemDiagram from "./SystemDiagram";
import TerminalPanel from "./TerminalPanel";

type Visual = "diagram" | "terminal";

const Hero = () => {
  const text = useTypewriter(TYPING_PHRASES);
  const [visual, setVisual] = useState<Visual>("diagram");

  return (
    <section className="relative overflow-hidden">

      <div className="container pt-24 pb-32 md:pt-36 md:pb-44">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-7 animate-fade-up">
          <p className="text-sm font-mono text-muted-foreground mb-6">
            // available for opportunities
          </p>
          <h1 className="text-5xl pb-2 md:text-7xl font-semibold tracking-tight gradient-text text-balance leading-[1.05]">
            {PROFILE.name}
          </h1>
          <p className="mt-5 text-xl md:text-2xl text-muted-foreground max-w-2xl leading-snug">
            {PROFILE.tagline}
          </p>

          <div className="mt-10 h-8 text-base md:text-lg font-mono text-foreground/80">
            <span>{text}</span>
            <span className="cursor-blink ml-0.5 text-foreground">▋</span>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 h-12 px-6 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-sm"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-border text-sm font-medium hover:bg-accent transition-colors"
            >
              <Mail className="h-4 w-4" />
              Contact
            </a>
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <FileDown className="h-4 w-4" />
              Resume
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 animate-fade-up [animation-delay:120ms]">
          <div className="mb-3 flex justify-center lg:justify-end">
            <div
              role="tablist"
              aria-label="Hero visual"
              className="inline-flex items-center gap-1 p-1 rounded-full border border-border bg-background/40 backdrop-blur-sm"
            >
              <button
                role="tab"
                aria-selected={visual === "diagram"}
                onClick={() => setVisual("diagram")}
                className={`px-3 h-7 rounded-full font-mono text-[11px] tracking-tight transition-colors ${
                  visual === "diagram"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                system
              </button>
              <button
                role="tab"
                aria-selected={visual === "terminal"}
                onClick={() => setVisual("terminal")}
                className={`px-3 h-7 rounded-full font-mono text-[11px] tracking-tight transition-colors ${
                  visual === "terminal"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                terminal
              </button>
            </div>
          </div>
          <div key={visual} className="animate-fade-in">
            {visual === "diagram" ? <SystemDiagram /> : <TerminalPanel />}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
