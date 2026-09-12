/**
 * Project case studies.
 *
 * This is deliberately its own module rather than another key on `resume`. Add a
 * project by appending one object to `projects` — the type below is the checklist
 * of what a complete case study has to provide, so a half-written entry is a
 * compile error rather than a gap in the page.
 *
 * The `Projects` component renders every entry collapsed by default and expands
 * one only when a visitor asks for it, so the section stays a list no matter how
 * many entries are added here.
 */

export type ProjectMetric = { label: string; value: string };

/** One layer of the system, rendered as a two-column row. */
export type ProjectLayer = { layer: string; detail: string };

/** A decision worth calling out, rendered as a numbered item. */
export type ProjectDecision = { title: string; detail: string };

export type Project = {
  /** Stable slug. Used as the React key and for the accordion's aria wiring. */
  id: string;
  name: string;
  year: string;
  /** One line, shown while the entry is collapsed. */
  tagline: string;
  /** What I was responsible for on this project. */
  role: string;
  /** Honest current state, including anything a visitor should know upfront. */
  status: string;
  liveUrl: string;
  repoUrl: string;
  /** The paragraph that opens the case study. */
  summary: string;
  /** Four short numbers. Keep `label` under about 20 characters. */
  metrics: ProjectMetric[];
  /** Context: what problem existed and what constrained it. */
  brief: string[];
  /** What was actually built, as bullets. */
  built: string[];
  /** How the pieces fit together. */
  architecture: ProjectLayer[];
  /** Around five to seven items reads best. */
  decisions: ProjectDecision[];
  stack: string[];
  /** What the result was, and what I took from building it. */
  outcome: string[];
};

export const projects: Project[] = [
  {
    id: "vapestack",
    name: "Vapestack",
    tagline: "A headless commerce storefront — Next.js in front, WooCommerce and WPGraphQL behind.",
    year: "2026",
    role: "Sole engineer: the WooCommerce backend, the Next.js storefront, the payment flow, the deployment, and the UI standards the storefront is held to.",
    status: "Live demo. WordPress runs on my own machine behind a Cloudflare tunnel, so while that tunnel is closed the storefront serves its last cached catalogue, product photographs do not load, and checkout says so instead of pretending.",
    liveUrl: "https://vapestack.vercel.app/",
    repoUrl: "https://github.com/paws1234/vapestack",
    summary:
      "Vapestack is a storefront built the way a real shop is built: WordPress with WooCommerce owns the catalogue, the prices and the orders, and a Next.js app owns everything a visitor touches. Nothing about it is a fixture — the front end reads 290 products over GraphQL and writes genuine orders back over the WooCommerce REST API. The interesting engineering is not the happy path but the contract around it: what the page does when the backend is unreachable, who is allowed to decide a price, and how a demo can take a card without ever seeing one.",
    metrics: [
      { label: "Imported products", value: "290" },
      { label: "Catalogue ranges", value: "9" },
      { label: "API routes", value: "4" },
      { label: "Sitemap URLs", value: "306" }
    ],
    brief: [
      "Most portfolio storefronts stop at a mocked cart. I wanted the opposite: a shop whose catalogue, prices and orders live in a real commerce backend, so every awkward state had to be solved rather than skipped — a slug that does not exist, an empty cart, a declined card, and a WordPress instance that is simply not running.",
      "The constraint that shaped the whole design is that WordPress runs on my own machine behind a Cloudflare quick tunnel, which gets a new random hostname every time it restarts and is closed whenever the machine is off. A deployed demo that throws a 500 the moment that tunnel drops is not a demo. Treating that state as part of the product rather than an exception is what turned this from a storefront into an architecture exercise."
    ],
    built: [
      "A WordPress and WooCommerce 11 backend with WPGraphQL and GraphQL for ECommerce, provisioned in Docker, plus a 290-product catalogue across nine ranges imported by a re-runnable script — names, specifications and photographs read from a public product listing, with prices and stock generated so demo data stays predictable.",
      "A Next.js 16 App Router storefront: home, the catalogue and its per-range listings, a product page with live per-combination stock, a cart that survives a reload, a 21+ age gate, client-side search, checkout with its receipt page, five info and legal pages, and deliberately designed 404 and error states.",
      "A catalogue that paginates and sorts entirely through the URL — nine products a page, a real GET form for sorting and plain links for the pager — so browsing works with JavaScript switched off, and the result count is announced to a screen reader rather than changing silently beneath it.",
      "A two-step checkout that creates a genuine pending WooCommerce order and then pays it through Stripe in test mode, with QR and cash-on-delivery recorded as simulated methods in the order's own fields.",
      "The metadata and legal surface a real shop needs: canonical URLs, an OpenGraph image, robots.txt, five pages that render even with WordPress stopped, and a sitemap generated per request that lists the whole catalogue.",
      "Deployment plumbing: Vercel with its root directory pinned to the storefront, and a tunnel script that reads the new Cloudflare hostname and re-points the Vercel environment in a single command, so a backend origin that changes every day is handled by running one file."
    ],
    architecture: [
      {
        layer: "Storefront",
        detail: "Next.js 16 App Router with React Server Components, Tailwind for the design system, and Zustand for the cart, the mobile navigation and the search dialog."
      },
      {
        layer: "Catalogue read path",
        detail: "WPGraphQL with GraphQL for ECommerce, reached through one server-only GraphQL transport with a five-minute data cache in front of it."
      },
      {
        layer: "Order write path",
        detail: "The WooCommerce REST API, authenticated with a consumer key and secret the browser never receives, used to create and re-read orders."
      },
      {
        layer: "Commerce backend",
        detail: "WordPress, WooCommerce and the two GraphQL plugins running in Docker. The catalogue lives here, and so does the authority over what a product costs."
      },
      {
        layer: "Payments",
        detail: "Stripe test-mode Payment Intents, with card details entered into Stripe's own fields inside Stripe's own iframe."
      },
      {
        layer: "Delivery",
        detail: "Vercel for the storefront, a Cloudflare quick tunnel for WordPress, and a script that reunites the two whenever the backend hostname changes."
      }
    ],
    decisions: [
      {
        title: "Nothing is fetched at build time, deliberately.",
        detail: "Every catalogue route is dynamic, declared once in the root layout, so a production build cannot fail because the WordPress tunnel happens to be closed — the property that lets this deploy from any machine at any time. A five-minute cache keeps that from turning into a read of WordPress on every single view."
      },
      {
        title: "An unreachable backend is a typed state, not an exception.",
        detail: "The upstream layer distinguishes 'WordPress said no' from 'WordPress is not there'. Listing pages render an offline notice instead of a stack trace, a strip at the top of the site says the shop behind it is offline, and checkout answers in demo mode by returning the receipt for exactly what it was about to send."
      },
      {
        title: "WooCommerce decides the price, never the browser.",
        detail: "Checkout is two steps on purpose. The first creates a pending order priced server-side; the second creates a Stripe Payment Intent for that total. The amount a card can ever be charged is the amount the commerce backend calculated, not the subtotal the browser displayed."
      },
      {
        title: "The app cannot leak a card number, because it never sees one.",
        detail: "Card details go into Stripe's own iframe fields, so no request, order, log or local store in this app can contain a digit. An order is marked paid only when Stripe confirms the money moved — through the webhook if it arrives, and through a reconciliation on the next order read if it does not. The setup script refuses a live Stripe key before it writes anything."
      },
      {
        title: "Simulated money says that it is simulated, in the shop's own record.",
        detail: "QR and cash-on-delivery orders are written to WooCommerce with payment method titles containing the word 'simulated', so the shop's own data cannot be mistaken for a real payment. The QR code itself is the real thing — it encodes a scannable address — because a code that points at nothing is the dishonest version of the demo."
      },
      {
        title: "A root loading state was removed because it turns 404s into 200s.",
        detail: "Measured by toggling only that file: with it, an unknown product or range slug answered 200 five times out of five; without it, a genuine 404 five times out of five. A Suspense boundary at the root makes Next commit to a success status before the body can decide otherwise, so skeletons live inside pages here."
      },
      {
        title: "One standards file governs every visual change.",
        detail: "Contrast ratios are measured rather than assumed, the type and spacing rhythm is fixed, every control defines its five states, and motion respects the reduced-motion preference — all recorded in the storefront's UI standards, so the next change starts from evidence instead of taste."
      }
    ],
    stack: [
      "Next.js 16 (App Router)",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "WordPress",
      "WooCommerce",
      "WPGraphQL",
      "GraphQL",
      "REST API",
      "Stripe (test mode)",
      "Docker",
      "Cloudflare Tunnel",
      "Vercel"
    ],
    outcome: [
      "The result is a live demo that stays honest under failure. While the WordPress instance behind it is running, the storefront lists and prices every product from the real catalogue and checkout creates an actual WooCommerce order. When it is not, the site serves its last read, says plainly that the shop is offline, and returns a receipt for what it would have sent rather than an error page.",
      "What I took from building it: the hard part of commerce is not rendering a product grid, it is deciding who owns the truth — the price, the stock, the order status — and then refusing to duplicate that decision anywhere else. Designing the offline path first is what made the online path simple."
    ]
  }
];
