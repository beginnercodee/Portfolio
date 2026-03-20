import AboutTerminal from "./AboutTerminal";
import { ScrollFade } from "./animations/ScrollFade";

export default function About() {
  return (
    <section id="about" className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 relative z-30">
      <AboutTerminal />
      
      <div className="flex flex-col justify-center font-sans text-body-sm text-secondary space-y-6 leading-relaxed">
        <ScrollFade x={20}>
          <p>
            Currently completing my B.Sc in Computer Science at Sir Syed University of Engineering & Technology (Class of '26). <span className="text-primary font-medium">I don't just write code; I architect solutions.</span>
          </p>
        </ScrollFade>
        
        <ScrollFade x={20} delay={0.2}>
          <p>
            My core philosophy is simple: <span className="text-primary font-medium">if a task can be predicted, it can be automated.</span> I bridge the gap between clean, high-performance web development and agentic AI systems—reducing friction and multiplying efficiency.
          </p>
        </ScrollFade>
        
        <ScrollFade x={20} delay={0.4}>
          <p>
            Whether it's a sleek Next.js frontend or a complex background workflow powered by Python and GoHighLevel, I deliver digital infrastructure that works flawlessly.
          </p>
        </ScrollFade>
      </div>
    </section>
  );
}
