import Header from "@/components/Header";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
// import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import ChatWidget from "@/components/ChatWidget";

export default function Page() {
  return (
    <div className="space-y-6">
      <Header />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px] items-start">
        <div className="space-y-6">
          <About />
          <TechStack />
          {/* <Projects /> */}
          <Contact />
        </div>
        <div className="space-y-6">
          <Experience />
          <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-5">
            <p className="text-sm font-semibold">Beyond Coding</p>
            <p className="text-sm text-neutral-700 mt-2 leading-relaxed">
             When I’m not actively coding, I focus on deepening my understanding of system design, software architecture, and performance optimization. I spend time evaluating emerging technologies, frameworks, and tooling, with an emphasis on how they impact scalability, reliability, and developer experience in real-world production systems. I regularly refine my engineering practices by studying clean architecture, testing strategies, and DevOps workflows, and I enjoy sharing knowledge through clear documentation, thoughtful code reviews, and building developer-friendly abstractions that reduce complexity and improve long-term maintainability.
            </p>
          </div>
        </div>
      </div>

      <footer className="py-10 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Reyvand Jasper Medrano. All rights reserved.
      </footer>

      <ChatWidget />
    </div>
  );
}
