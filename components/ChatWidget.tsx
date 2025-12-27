"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@/context/ChatContext";
import { Button } from "@/components/ui";

export default function ChatWidget() {
  const { isOpen, setIsOpen, messages, send, clear, isSending } = useChat();
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [isOpen, messages.length]);

  const suggested = useMemo(
    () => [
      "What tech stack do you use most?",
      "Summarize your recent experience.",
      "What projects should I look at first?",
      "How can I contact you?"
    ],
    []
  );

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-2xl bg-neutral-900 text-white px-4 py-3 shadow-lg hover:bg-neutral-800 transition"
        >
          Chat with Reyvand
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[360px] max-w-[92vw] rounded-2xl border border-neutral-200 bg-white shadow-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
        <div>
          <p className="text-sm font-semibold">Chat</p>
          <p className="text-xs text-neutral-500">Ask about experience, stack, projects</p>
        </div>
        <div className="flex gap-2">
          <button onClick={clear} className="text-xs text-neutral-500 hover:text-neutral-800">Clear</button>
          <button onClick={() => setIsOpen(false)} className="text-xs text-neutral-500 hover:text-neutral-800">Close</button>
        </div>
      </div>

      <div ref={listRef} className="h-72 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 ? (
          <div className="space-y-2">
            <p className="text-sm text-neutral-700">
              Hi! I can answer questions about Reyvand’s portfolio.
            </p>
            <div className="flex flex-wrap gap-2">
              {suggested.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 hover:bg-neutral-100"
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
            className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm ${
              m.role === "user"
                ? "ml-auto bg-neutral-900 text-white"
                : "mr-auto bg-neutral-50 text-neutral-800 border border-neutral-200"
            }`}
          >
            {m.text}
          </div>
        ))}

        {isSending ? (
          <div className="mr-auto max-w-[90%] rounded-2xl px-3 py-2 text-sm bg-neutral-50 text-neutral-800 border border-neutral-200">
            Typing…
          </div>
        ) : null}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const v = text.trim();
          if (!v) return;
          send(v);
          setText("");
        }}
        className="flex gap-2 px-4 py-3 border-t border-neutral-100"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask something…"
          className="flex-1 rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
        />
        <Button type="submit">{isSending ? "…" : "Send"}</Button>
      </form>
    </div>
  );
}
