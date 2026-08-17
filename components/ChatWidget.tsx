"use client";


import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@/context/ChatContext";
import { Button } from "@/components/ui";

function formatTime(dateStr: string | undefined) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatWidget() {

  const { isOpen, setIsOpen, messages, send, clear, isSending } = useChat();
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  const autoGrow = () => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
  };

  const resetInput = () => {
    setText("");
    if (taRef.current) taRef.current.style.height = "auto";
  };


  useEffect(() => {
    if (!isOpen) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [isOpen, messages.length, isSending]);

  const suggested = useMemo(
    () => [
      "What tech stack do you use most?",
      "Summarize your recent experience.",
      "How can I contact you?"
    ],
    []
  );


  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-gradient-to-br from-neutral-900 to-neutral-700 text-white px-6 py-4 shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
        >
          <span className="inline-block w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-lg font-bold">🤖</span>
          <span>Chat</span>
        </button>
      </div>
    );
  }


  return (
    <div className="fixed bottom-6 right-6 w-[380px] max-w-[98vw] rounded-3xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-2xl overflow-hidden z-50 flex flex-col">
      {/* Header with avatar and title */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 bg-gradient-to-r from-neutral-900 to-neutral-700">
        <div className="flex items-center gap-3">
          <span className="inline-block w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-2xl">🤖</span>
          <div>
            <p className="text-base font-bold text-white">Portfolio Assistant</p>
            <p className="text-xs text-neutral-200">Ask about experience, stack, contact</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={clear} className="text-xs text-neutral-200 hover:text-white">Clear</button>
          <button
            onClick={() => {
              clear();
              setIsOpen(false);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-800/30 transition"
            aria-label="Close chat"
            title="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-neutral-200 hover:text-white">
              <path fillRule="evenodd" d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10l-4.95-4.95A1 1 0 115.05 3.636L10 8.586z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chat area */}
      <div ref={listRef} className="flex-1 px-4 py-4 space-y-3 bg-neutral-50 dark:bg-neutral-950">
        {messages.length === 0 ? (
          <div className="space-y-2 text-center">
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Hi! I can answer questions about Reyvand’s portfolio.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggested.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs rounded-full border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 px-3 py-1 hover:bg-neutral-100 shadow-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`relative max-w-[90%] px-4 py-2 rounded-2xl shadow-sm text-sm whitespace-pre-line ${
                m.role === "user"
                  ? "bg-gradient-to-br from-neutral-900 to-neutral-700 text-white"
                : "bg-white text-neutral-900 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700"
              }`}
            >
              {m.text}
              <span className="absolute -bottom-5 right-2 text-[10px] text-neutral-400">
                {formatTime(
                  typeof m.createdAt === "number"
                    ? new Date(m.createdAt).toISOString()
                    : m.createdAt
                )}
              </span>
            </div>
          </div>
        ))}

        {isSending ? (
          <div className="flex items-center gap-2 animate-pulse">
            <span className="inline-block w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-lg">🤖</span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">Assistant is typing…</span>
          </div>
        ) : null}

      </div>

      {/* Input area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const v = text.trim();
          if (!v) return;
          send(v);
          resetInput();
        }}
        className="flex gap-2 px-4 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
      >
        <textarea
          ref={taRef}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            autoGrow();
          }}
          placeholder="Type your question and press Enter…"
          className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200 resize-none overflow-hidden min-h-[38px] max-h-32"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              const v = text.trim();
              if (!v) return;
              send(v);
              resetInput();
            }
          }}
        />
        <Button type="submit" className="h-10 px-5">{isSending ? <span className="animate-pulse">…</span> : "Send"}</Button>
      </form>
    </div>
  );
}
