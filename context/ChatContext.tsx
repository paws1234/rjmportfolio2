"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  createdAt: number;
};

type ChatContextValue = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  messages: ChatMessage[];
  send: (text: string) => Promise<void>;
  clear: () => void;
  isSending: boolean;
};

const ChatContext = createContext<ChatContextValue | null>(null);

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    const userMsg: ChatMessage = {
      id: uid(),
      role: "user",
      text: trimmed,
      createdAt: Date.now()
    };

    setMessages((m) => [...m, userMsg]);
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed })
      });

      const data = (await res.json()) as { reply?: string };
      const assistantMsg: ChatMessage = {
        id: uid(),
        role: "assistant",
        text: data.reply || "No response",
        createdAt: Date.now()
      };

      setMessages((m) => [...m, assistantMsg]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: uid(),
          role: "assistant",
          text: "Network error. Please try again.",
          createdAt: Date.now()
        }
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function clear() {
    setMessages([]);
  }

  const value = useMemo(
    () => ({ isOpen, setIsOpen, messages, send, clear, isSending }),
    [isOpen, messages, isSending]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
