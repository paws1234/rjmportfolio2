/**
 * The page's sections.
 *
 * `sections` is everything that can be jumped to, in the order a reader moves
 * through the page — the command palette offers all of it.
 *
 * `navSections` is the subset the sticky bar links to. The page is two columns,
 * and Experience and Education sit beside About and Tech Stack rather than
 * after them, so they have no position in a top-to-bottom reading of the page:
 * a scroll spy that included them could never agree with itself about which one
 * is "current" while both are on screen. They stay one keystroke away in the
 * palette instead, and the bar highlights only sections that are genuinely
 * in sequence.
 */

export type Section = { id: string; label: string; group?: string };

export const sections: Section[] = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "case-studies", label: "Case Studies" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" }
];

/** The left column, which is the only part of the page in reading order. */
export const navSectionIds = ["about", "stack", "projects", "case-studies", "contact"];

export const navSections: Section[] = sections.filter((section) =>
  navSectionIds.includes(section.id)
);

/** Anchors are resolved against the DOM, so a section that chose not to render
 *  (Case Studies hides itself while it is empty) is not offered as a link. */
export function presentSections(from: Section[] = sections): Section[] {
  if (typeof document === "undefined") return [];
  return from.filter((section) => document.getElementById(section.id) !== null);
}
