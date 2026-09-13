/**
 * A one-line channel between components that have no parent/child relationship.
 *
 * The nav needs to open a palette it does not own, and anything can raise a
 * toast without the page growing another React provider. Both are fire-and-
 * forget UI signals, not application state, so a DOM event is the smallest
 * thing that does the job.
 */

export const COMMAND_PALETTE_EVENT = "portfolio:command-palette";
export const TOAST_EVENT = "portfolio:toast";

export function openCommandPalette() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(COMMAND_PALETTE_EVENT));
}

export function toast(message: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<string>(TOAST_EVENT, { detail: message }));
}

/**
 * Writes text to the clipboard, confirms it, and reports whether it worked.
 *
 * The async clipboard API is unavailable outside a secure context, which
 * includes any build of this site served over plain HTTP on a LAN address — the
 * exact case for a Docker setup. So a hidden textarea and the legacy copy
 * command are kept as the fallback, and the caller is told the truth either way.
 */
export async function copyText(text: string, label = "Copied"): Promise<boolean> {
  const copied = await writeToClipboard(text);
  toast(copied ? `${label} — ${text}` : "Couldn’t copy automatically — the address is above");
  return copied;
}

async function writeToClipboard(text: string): Promise<boolean> {
  if (window.isSecureContext && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through — a denied permission is not the same as a broken page.
    }
  }

  try {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.top = "0";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(field);
    return ok;
  } catch {
    return false;
  }
}
