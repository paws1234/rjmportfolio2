import "./globals.css";
import { ChatProvider } from "@/context/ChatContext";

export const metadata = {
  title: "Reyvand Jasper Medrano — Portfolio",
  description: "Minimal portfolio + AI chat"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900">
        <ChatProvider>
          <main className="max-w-6xl mx-auto px-5 py-10">{children}</main>
        </ChatProvider>
      </body>
    </html>
  );
}
