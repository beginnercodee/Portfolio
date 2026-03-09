import NavigationBar from "@/components/NavigationBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import LiveGitHubActivity from "@/components/LiveGitHubActivity";
import Projects from "@/components/Projects";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import AILab from "@/components/AILab";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import SystemStatusFooter from "@/components/SystemStatusFooter";

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
