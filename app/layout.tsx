import "./globals.css";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ChatProvider } from "@/context/ChatContext";
import { ThemeProvider } from "@/context/ThemeContext";
import SiteBackground from "@/components/SiteBackground";
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import CommandPalette from "@/components/CommandPalette";
import BackToTop from "@/components/BackToTop";
import Toaster from "@/components/Toaster";

// Three roles, one family each: Inter carries the prose, Space Grotesk gives
// headings a bit of engineering character, JetBrains Mono marks anything that
// is data rather than language (labels, metrics, the handle).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata = {
  title: "Reyvand Jasper Medrano — Software Engineer",
  description:
    "Full-stack software engineer building production web applications with Laravel, React, Next.js and Docker. Selected work, case studies and experience.",
  keywords: [
    "Reyvand Jasper Medrano",
    "software engineer",
    "full stack developer",
    "Laravel",
    "React",
    "Next.js",
    "portfolio"
  ],
  authors: [{ name: "Reyvand Jasper Medrano" }],
  openGraph: {
    title: "Reyvand Jasper Medrano — Software Engineer",
    description:
      "Full-stack software engineer building production web applications with Laravel, React, Next.js and Docker.",
    type: "website"
  },
  icons: {
    icon: [{ url: "/istockphoto-1324569030-612x612.jpg", type: "image/jpeg" }]
  }
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var dark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${display.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full bg-neutral-50 font-sans text-neutral-900 antialiased selection:bg-indigo-500/20 dark:bg-neutral-950 dark:text-neutral-100">
        <ThemeProvider>
          <ChatProvider>
            <SiteBackground />
            <ScrollProgress />
            <Nav />
            <main className="relative z-10 mx-auto w-full max-w-[1180px] px-5 pt-8 pb-20 sm:px-6 sm:pt-12">
              {children}
            </main>
            <BackToTop />
            <Toaster />
            <CommandPalette />
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

