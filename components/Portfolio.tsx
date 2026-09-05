import Hero from "@/components/Hero";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Portfolio() {
  return (
    <div className="relative z-10 mx-auto max-w-4xl">
      <Hero />
      <About />
      <Contact />
    </div>
  );
}
