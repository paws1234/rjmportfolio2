"use client";

import { useEffect, useState } from "react";
import { TOAST_EVENT } from "@/lib/events";

type Note = { id: number; message: string };

let nextId = 1;

/** A single confirmation, bottom-centre, out of the way of everything else.
 *  Announced politely so a copy is confirmed to screen readers too. */
export default function Toaster() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const onToast = (event: Event) => {
      const message = (event as CustomEvent<string>).detail;
      if (!message) return;
      const note: Note = { id: nextId++, message };
      setNotes((current) => [...current, note]);
      window.setTimeout(() => {
        setNotes((current) => current.filter((n) => n.id !== note.id));
      }, 2600);
    };

    window.addEventListener(TOAST_EVENT, onToast);
    return () => window.removeEventListener(TOAST_EVENT, onToast);
  }, []);

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex flex-col items-center gap-2 px-4"
    >
      {notes.map((note) => (
        <div
          key={note.id}
          className="animate-pop-in max-w-[92vw] truncate rounded-full border border-neutral-200/80 bg-white/90 px-4 py-2 text-xs font-medium text-neutral-800 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-neutral-800/90 dark:text-neutral-100"
        >
          {note.message}
        </div>
      ))}
    </div>
  );
}
