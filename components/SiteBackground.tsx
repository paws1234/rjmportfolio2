/**
 * The page's atmosphere: three slow-moving colour fields, a faint grid and a
 * film grain. Purely decorative, so it is hidden from assistive tech and takes
 * no pointer events, and every layer is a transform/opacity animation so it can
 * be composited on the GPU rather than repainting.
 */

const glow =
  "absolute rounded-full blur-[110px] will-change-transform motion-reduce:animate-none";

export default function SiteBackground() {
  const gridMask =
    "radial-gradient(ellipse 78% 58% at 50% 0%, #000 22%, transparent 76%)";

  return (
    <div
      aria-hidden="true"
      className="grain pointer-events-none fixed inset-0 z-0 overflow-hidden bg-neutral-50 dark:bg-neutral-950"
    >
      <div
        className={`${glow} -left-[14%] -top-[26rem] h-[46rem] w-[46rem] animate-aurora bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.34),transparent_65%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.42),transparent_65%)]`}
      />
      <div
        className={`${glow} -right-[12%] -top-[18rem] h-[38rem] w-[38rem] animate-aurora bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.24),transparent_65%)] [animation-delay:-7s] dark:bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.3),transparent_65%)]`}
      />
      <div
        className={`${glow} left-[24%] top-[38rem] h-[34rem] w-[34rem] animate-aurora bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.2),transparent_65%)] [animation-delay:-14s] dark:bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.24),transparent_65%)]`}
      />

      <div
        className="absolute inset-0 bg-grid-fade bg-[length:48px_48px] dark:bg-grid-fade-dark"
        style={{ maskImage: gridMask, WebkitMaskImage: gridMask }}
      />

      {/* Keeps the top of the viewport the lightest part of the page so the
          sticky header always has something legible to sit on. */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/70 to-transparent dark:from-neutral-950/80" />
    </div>
  );
}
