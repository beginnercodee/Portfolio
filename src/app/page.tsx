import NavigationBar from "@/components/NavigationBar";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

// Defer non-critical Javascript below the fold to massively reduce mobile INP and FCP execution times
const About = dynamic(() => import("@/components/About"), { ssr: true });
const Services = dynamic(() => import("@/components/Services"), { ssr: true });
const Experience = dynamic(() => import("@/components/Experience"), { ssr: true });
const LiveGitHubActivity = dynamic(() => import("@/components/LiveGitHubActivity"), { ssr: false }); // Requires client-side APIs
const Projects = dynamic(() => import("@/components/Projects"), { ssr: true });
const CaseStudies = dynamic(() => import("@/components/CaseStudies"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });
const AILab = dynamic(() => import("@/components/AILab"), { ssr: true });
const Skills = dynamic(() => import("@/components/Skills"), { ssr: true });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true });
const SystemStatusFooter = dynamic(() => import("@/components/SystemStatusFooter"), { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground mb-[32px]">
      <NavigationBar />
      <Hero />
      <About />
      <Services />
      <Experience />
      <LiveGitHubActivity />
      <Projects />
      <CaseStudies />
      <Testimonials />
      <AILab />
      <Skills />
      <Contact />
      <SystemStatusFooter />
    </main>
  );
}
