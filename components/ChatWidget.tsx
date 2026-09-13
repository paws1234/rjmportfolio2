"use client";


import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@/context/ChatContext";
import { Button } from "@/components/ui";

function formatTime(dateStr: string | undefined) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/** Same mark in the launcher, the header and the pending row, so the assistant
 *  is one thing rather than three different avatars. */
function SparkMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-white shadow-lg shadow-indigo-500/30 ${className}`}
    >
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-[55%] w-[55%]">
        <path d="M10 1.8l1.55 4.6 4.6 1.55-4.6 1.55L10 14.1l-1.55-4.6L3.85 7.95l4.6-1.55L10 1.8zM15.6 12.4l.8 2.35 2.35.8-2.35.8-.8 2.35-.8-2.35-2.35-.8 2.35-.8.8-2.35z" />
      </svg>
    </span>
  );
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

  // Focus the field on open, but only where there is a keyboard on screen —
  // pulling up the soft keyboard over a phone's viewport is not a favour.
  useEffect(() => {
    if (!isOpen) return;
    if (window.matchMedia("(min-width: 640px)").matches) taRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, setIsOpen]);

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
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open the portfolio assistant"
          className="group relative inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 py-3 pl-3 pr-5 text-sm font-medium text-white shadow-2xl shadow-indigo-500/30 transition duration-300 ease-spring hover:-translate-y-0.5 hover:brightness-110 active:scale-95"
        >
          <SparkMark className="absolute inset-0 -z-10 h-full w-full animate-halo opacity-60" />
          <SparkMark className="h-8 w-8" />
          <span>Ask me anything</span>
        </button>
      </div>
    );
  }


  return (
    <div className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[384px]">
      <div className="animate-pop-in flex origin-bottom-right flex-col overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/95 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-neutral-900/95">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-4 py-3.5">
          <div className="flex min-w-0 items-center gap-3">
            <SparkMark className="h-9 w-9" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">Portfolio Assistant</p>
              <p className="truncate text-[11px] text-white/70">
                Ask about experience, stack or contact
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={clear}
              className="rounded-lg px-2 py-1 text-[11px] font-medium text-white/80 transition hover:bg-white/15 hover:text-white"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/15 hover:text-white"
              aria-label="Close chat"
              title="Close"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path fillRule="evenodd" d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10l-4.95-4.95A1 1 0 115.05 3.636L10 8.586z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

      {/* Chat area */}
        <div
          ref={listRef}
          aria-live="polite"
          className="h-[min(50vh,340px)] space-y-3 overflow-y-auto bg-neutral-50/60 px-4 py-4 dark:bg-neutral-950/40"
        >
        {messages.length === 0 ? (
            <div className="space-y-3 py-2 text-center">
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Hi — I can answer questions about Reyvand’s work, stack and availability.
            </p>
              <div className="flex flex-wrap justify-center gap-2">
              {suggested.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-neutral-200 bg-white/80 px-3 py-1.5 text-xs text-neutral-700 shadow-sm transition duration-300 ease-swift hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-neutral-200 dark:hover:border-indigo-400/40 dark:hover:text-indigo-200"
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
              className={`max-w-[88%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm shadow-sm ${
                m.role === "user"
                ? "rounded-br-md bg-gradient-to-br from-indigo-500 to-violet-600 text-white"
                : "rounded-bl-md border border-neutral-200 bg-white text-neutral-900 dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-100"
              }`}
            >
              {m.text}
            </div>
            <span className="mt-1 px-1 font-mono text-[9px] text-neutral-400 dark:text-neutral-500">
              {formatTime(
                typeof m.createdAt === "number"
                  ? new Date(m.createdAt).toISOString()
                  : m.createdAt
              )}
            </span>
          </div>
        ))}

        {isSending ? (
            <div className="flex items-center gap-2">
              <SparkMark className="h-7 w-7" />
              <span className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-neutral-200 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.06]">
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="h-1.5 w-1.5 animate-bounce-dot rounded-full bg-indigo-400"
                    style={{ animationDelay: `${dot * 160}ms` }}
                  />
                ))}
                <span className="sr-only">The assistant is typing</span>
              </span>
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
          className="flex items-end gap-2 border-t border-neutral-200/80 bg-white/80 px-3 py-3 dark:border-white/10 dark:bg-transparent"
      >
          <label htmlFor="chat-input" className="sr-only">
            Ask a question
          </label>
        <textarea
            id="chat-input"
          ref={taRef}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            autoGrow();
          }}
            placeholder="Ask a question…"
            className="min-h-[40px] max-h-32 flex-1 resize-none overflow-hidden rounded-xl border border-neutral-200 bg-white/70 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-400 dark:border-white/10 dark:bg-white/[0.05] dark:text-neutral-100 dark:focus:border-indigo-400/60"
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
          <Button type="submit" size="sm" className="h-10 px-4" disabled={isSending}>
            {isSending ? "…" : "Send"}
          </Button>
      </form>
      </div>
    </div>
  );
}
