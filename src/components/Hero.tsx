import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, FileDown } from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { PROFILE, TYPING_PHRASES } from "@/utils/constants";
import SystemDiagram from "./SystemDiagram";
import ContributionPanel from "./TerminalPanel";

type Visual = "diagram" | "terminal";

const Hero = () => {
  const text = useTypewriter(TYPING_PHRASES);
  const [visual, setVisual] = useState<Visual>("diagram");

  return (
    <section className="relative overflow-hidden">
      <div className="container pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-7 animate-fade-up">
            <p className="kicker mb-6">
              // available for opportunities
            </p>
            <h1 className="text-[2.75rem] sm:text-6xl md:text-7xl font-semibold tracking-tight gradient-text text-balance leading-[1.04]">
              {PROFILE.name}
            </h1>
            <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl leading-snug">
              {PROFILE.tagline}
            </p>

            <div className="mt-7 h-8 text-sm md:text-base font-mono text-foreground/80">
              <span>{text}</span>
              <span className="cursor-blink ml-0.5 text-primary">▋</span>
            </div>

            <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
              I build backend services, CLIs, and cloud-native tooling in Go.
              Reliable systems with clean APIs, from the application layer down
              to the Kubernetes machinery underneath.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link to="/projects" className="btn-primary group">
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link to="/contact" className="btn-secondary">
                <Mail className="h-4 w-4" />
                Contact
              </Link>
              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="btn-ghost"
              >
                <FileDown className="h-4 w-4" />
                Resume
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 animate-fade-up [animation-delay:120ms]">
            <div className="mb-4 flex justify-center lg:justify-end">
              <div
                role="tablist"
                aria-label="Hero visual"
                className="inline-flex items-center gap-1 p-1 rounded-full border border-border bg-card/60 backdrop-blur-sm"
              >
                <button
                  role="tab"
                  aria-selected={visual === "diagram"}
                  onClick={() => setVisual("diagram")}
                  className={`px-3.5 h-7 rounded-full font-mono text-[11px] tracking-tight transition-colors ${
                    visual === "diagram"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  system
                </button>
                <button
                  role="tab"
                  aria-selected={visual === "terminal"}
                  onClick={() => setVisual("terminal")}
                  className={`px-3.5 h-7 rounded-full font-mono text-[11px] tracking-tight transition-colors ${
                    visual === "terminal"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                git log
                </button>
              </div>
            </div>
            <div key={visual} className="animate-fade-in">
              {visual === "diagram" ? <SystemDiagram /> : <ContributionPanel />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
