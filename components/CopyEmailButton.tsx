"use client";

import { useEffect, useState } from "react";
import { resume } from "@/data/resume";
import { Button } from "@/components/ui";
import { copyText } from "@/lib/events";

/** Copies the address and confirms it on the button itself, so the feedback is
 *  where the click happened rather than only in the toast. */
export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <Button
      variant="ghost"
      onClick={async () => {
        // Only claim success once the clipboard has actually taken the text.
        setCopied(await copyText(resume.email, "Email copied"));
      }}
    >
      {copied ? "Copied ✓" : "Copy address"}
    </Button>
  );
}
