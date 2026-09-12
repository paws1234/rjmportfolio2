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
  },
  {
    id: "quiz-maker",
    name: "Quiz Maker",
    tagline: "Build a quiz, share a link, see how people did — Next.js, a GraphQL API and MongoDB.",
    year: "2026",
    role: "Sole engineer: the GraphQL schema and resolvers, the builder and the player, the MongoDB model, the validation layer, the Docker setup, and the deployment.",
    status: "Live and in use. The published quizzes are open to anyone, but the builder is locked to me behind an admin token — the demo quizzes are there to take rather than to edit.",
    liveUrl: "https://quizmaker-teal.vercel.app/",
    repoUrl: "https://github.com/paws1234/quizmaker",
    summary:
      "Quiz Maker is a headless quiz app: a builder where a quiz is written, a public player where it is taken, and light analytics that show how it went. The interesting constraint is that a quiz has to be fully readable by the person taking it and must not leak its answers — so the public shape of the data is deliberately different from the private one. The public quiz type has no correct-answer field at all, and scoring happens on the server, which means the player can be embedded on anyone's website without the answers travelling with it.",
    metrics: [
      { label: "GraphQL operations", value: "8" },
      { label: "Answer keys in the payload", value: "0" },
      { label: "Quiz storage", value: "1 document" },
      { label: "Public quiz ids", value: "7 chars" }
    ],
    brief: [
      "A quiz is a small app with an unusual requirement: the person taking it must be able to read the whole thing and must not be able to read the answers. That one constraint decides most of the architecture. It is why scoring cannot happen in the browser, why the answer key cannot simply be hidden in the markup, and why the public shape of the data has to be a different type from the one the builder edits.",
      "The other half of the brief was operational. Quizzes should outlive deploys, so nothing about them may be baked into a build. And the whole thing had to come up on someone else's machine with one command — which is what put the application and the database into Docker together, with the same source also deployable to a platform as a plain Next.js app."
    ],
    built: [
      "A builder that creates questions, marks one option correct, attaches an optional explanation and reorders the list, then sets the rules: brand colour, logo, a consent step with its own wording, whether correct answers are shown afterwards, whether retakes are allowed, and an optional expiry date.",
      "A public player at /q/<id>, or a friendly /q/<slug>, which shows the consent step when the quiz asks for one, then asks the questions with the author's own branding applied. It is embeddable in an iframe on any site by design.",
      "Server-side scoring: submitting an attempt returns the score, the percentage and a per-question result with the correct option and the explanation — but only once the attempt is over, so nothing is revealed a question early.",
      "Light analytics per quiz — starts, completions, average score and the questions people miss most — computed from per-question counters kept on the quiz rather than by replaying every submission.",
      "A share panel that hands out the link, an iframe snippet for embedding the quiz elsewhere, and social shortcuts.",
      "A health endpoint that answers 200 only when the app and its database connection are both working, which is also what the container healthcheck watches, so 'healthy' means the database is genuinely reachable.",
      "A Docker setup that runs the app and the database together, with a production overlay serving a compiled standalone build and a third overlay for pointing the app at a hosted MongoDB instead of the local container.",
      "An end-to-end smoke script that exercises the API and a seed script for demo content, both runnable against either a local stack or a live deployment."
    ],
    architecture: [
      {
        layer: "Public player",
        detail: "/q/[id] reads the quiz on the server and then hydrates. It is rendered per request rather than prerendered, so a quiz edited in the builder appears at its link immediately instead of at the next build."
      },
      {
        layer: "Builder",
        detail: "The quiz list and editor, reachable only with an admin token that is exchanged for an httpOnly, SameSite=strict cookie — so no token is ever kept in page script."
      },
      {
        layer: "API",
        detail: "One GraphQL Yoga endpoint is the entire API surface: three queries and five mutations. The builder is only one client of it — a shell script can drive the same endpoint, which is what the smoke test does."
      },
      {
        layer: "Data",
        detail: "MongoDB through Mongoose, one document per quiz with its questions embedded, because a quiz is always read and written as a whole. The connection is cached on globalThis so serverless invocations do not open a new one per request."
      },
      {
        layer: "Validation",
        detail: "A normalise layer sits in front of every write: it caps sizes, requires each question to have a correct option that actually exists, validates the brand colour and logo URL, and rejects duplicate slugs. Bad input comes back as a typed input error, not a 500."
      },
      {
        layer: "Environment",
        detail: "Docker in development — the dev server plus a MongoDB container bound to loopback only — and Vercel in front of MongoDB Atlas in production, with the same source doing both."
      }
    ],
    decisions: [
      {
        title: "The answer key is absent from the public schema, not hidden in the UI.",
        detail: "The public quiz type has no correct-answer field at all, so asking for one is a schema error rather than a response that has to be filtered. Scoring lives on the server. That removes an entire class of bug: there is no code path that could accidentally render an answer, because the field does not exist on the type the player receives, and reading the page's HTML or calling the API directly shows nothing."
      },
      {
        title: "Every write is normalised before it is trusted.",
        detail: "Validation is not left to the builder's form. Sizes are capped, each question must have a correct option that genuinely exists, the brand colour and logo URL are checked, and duplicate slugs are rejected — all of it before the document is touched, and all of it reported as a typed input error so a bad request never looks like a server fault."
      },
      {
        title: "The builder fails closed.",
        detail: "The admin token is compared in constant time and exchanged for an httpOnly, SameSite=strict cookie, so the browser cannot read it and another site cannot replay it. Unset the variable and the builder does not quietly open up — it stops working. There is one deliberate switch that removes the check for a showcase deployment, it is off unless set, and the documentation says to take a database dump before turning it on."
      },
      {
        title: "A type-check is not enough to ship this.",
        detail: "Type-checking alone does not catch route-handler signature problems that only appear in a production build, so the production build is the gate, not the type-check. A build run through the development image also needs the production environment set explicitly, or it fails while prerendering the not-found page with a misleading error about importing HTML outside the pages directory."
      },
      {
        title: "Development and production build different image tags, on purpose.",
        detail: "With one shared tag, the last build wins: starting the development stack quietly serves the production image as the dev service, which then fails because it runs as a different user than the dependency volume it is handed. Distinct tags make that impossible rather than merely unlikely."
      },
      {
        title: "A backup is scoped to one database, because the unscoped version is destructive.",
        detail: "A plain dump also captures the cluster's own user accounts, and restoring that archive into a hosted cluster replaces its accounts with your local ones — locking you out mid-restore. The failure does not present as a backup problem: it surfaces as an authentication error partway through the restore. The dump names its database, and the check is that the archive must not mention the admin user collection."
      },
      {
        title: "Ids are random, and the database is not reachable.",
        detail: "Quizzes are addressed by a random seven-character id rather than a sequential number, so the space is not enumerable, and the MongoDB container is published on loopback only with authentication on. The player is embeddable by design, which is a deliberate exception rather than an oversight."
      }
    ],
    stack: [
      "Next.js 15 (App Router)",
      "React",
      "TypeScript",
      "GraphQL Yoga",
      "GraphQL",
      "Mongoose",
      "MongoDB 7",
      "MongoDB Atlas",
      "Docker",
      "Docker Compose",
      "Node.js",
      "Vercel"
    ],
    outcome: [
      "It is live and in use. Quizzes are written in the builder, taken through a share link or embedded on another site, and scored on the server; the analytics are real counters rather than a mock. A quiz edited in the builder appears at its link immediately, because the player is rendered per request instead of frozen into a build.",
      "What I took from it: the hard part was not the quiz interface, it was deciding what a client is allowed to know. Splitting the public type from the admin type deleted a whole category of risk, because the safest field is the one that does not exist. What is genuinely missing is documented rather than glossed over — there are no per-user accounts, no rate limiting, and no password-protected quizzes yet."
    ]
  }
];
