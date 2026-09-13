/**
 * Project case studies.
 *
 * This is deliberately its own module rather than another key on `resume`. Add a
 * project by appending one object to `projects` — the type below is the checklist
 * of what a complete case study has to provide, so a half-written entry is a
 * compile error rather than a gap in the page.
 *
 * The `Projects` and `CaseStudies` components render every entry collapsed by default
 * and expand one only when a visitor asks for it, so each section stays a list no
 * matter how many entries are added here. Which of the two an entry lands in is
 * decided by whether it has a `liveUrl`, so there is nothing to set and nothing to
 * keep in step.
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
  /** One line, shown while the entry is collapsed. */
  tagline: string;
  /** What I was responsible for on this project. */
  role: string;
  /** Honest current state, including anything a visitor should know upfront. */
  status: string;
  /** Live demo, when there is one to open. Leave it off and the entry is filed
   *  under Case Studies rather than Projects. */
  liveUrl?: string;
  /** Source, when it is public. Omitted for closed work. */
  repoUrl?: string;
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
  },
  {
    id: "bookify",
    name: "Bookify",
    tagline: "A self-hosted booking and ticketing site — WordPress and one plugin, a diary that cannot double-book a place, and a Postgres copy that rebuilds the site on a host with no shell.",
    role: "Sole engineer: the booking plugin, the child theme's design layer, the Elementor layouts, the payments and email paths, the Docker image, the deploy, and the PostgreSQL mirror.",
    status: "Live on Render's free plan, which shapes how it behaves. An idle instance is spun down, so the first visit waits while it rebuilds itself — measured at 46 seconds from cold — and the filesystem is wiped on every restart, so the session photographs come back from the database copy as they are asked for. Payments run in Stripe test mode and the business details in the database are a placeholder studio, so this is a demonstration rather than a business.",
    liveUrl: "https://bookify-tgpz.onrender.com/",
    repoUrl: "https://github.com/paws1234/Bokoify",
    summary:
      "Bookify is a booking and ticketing site for a small practice — a therapist, a coach, a studio — built as WordPress plus one plugin and one child theme, with nothing bought: core, the free Elementor, a free parent theme and my own PHP. A visitor reads what the business offers, picks a session, sees the times that are genuinely free, books one, pays a deposit or the full price, and then cancels or moves it from the link in the confirmation email. It also sells places at dated events, priced and limited by ticket tiers. Underneath, it is a concurrency problem wearing the costume of a form: two people can want the same last place in the same second, a payment can be confirmed by a webhook nobody is watching for, and a copy of the data on a second database has to be good enough to rebuild the whole site on a host that gives you no shell, no cron and no disk.",
    metrics: [
      { label: "Sessions published", value: "8" },
      { label: "Plugin-owned tables", value: "0" },
      { label: "Rows restored at boot", value: "713" },
      { label: "Probe assertions", value: "124" }
    ],
    brief: [
      "A small practice loses money to the gaps around its calendar: the call that goes unanswered, the double booking nobody notices until the day itself, the no-show that was never confirmed and never reminded. A booking site is the obvious answer, but the form is the easy half. The half worth building is the handful of decisions that separate a form from a diary — who owns the free times, who gets the last place when two people want it in the same instant, and what a booking's status is allowed to be when the news arrives through something other than the browser.",
      "The brief also insisted on self-hosting: no SaaS scheduler, no paid plugin, no subscription — WordPress core, free Elementor as the design tool, and every booking behaviour written as PHP in one plugin. And it had to deploy cheaply, which turned out to be the constraint that shaped the most. Render's free plan gives you no disk, no cron job and no shell, so there is nowhere to put an uploaded photograph, nothing to run the reminders, and no way to import a database dump. The site had to be able to rebuild itself from a copy of its own data on a host where nothing survives a restart."
    ],
    built: [
      "Four post types and no plugin-owned tables: Sessions and Events are public and queryable, Bookings and Ticket tiers are private, and the entire domain is posts, registered meta, options and the users table. Nothing needed a schema migration, and the WordPress list screens for every one of them came for free.",
      "One booking form — a shortcode, and an Elementor widget in its own Bookify category where every label, price and message is an editable control — that renders as an ordinary POST form carrying a WordPress nonce, so it books with JavaScript switched off. The script upgrades it in place: choosing a day loads that day's real free times without a page reload.",
      "A diary made of rules rather than a hard-coded list: weekdays and hours per day, slot interval, lead time, how far ahead to sell, and blocked dates, all kept in one option. Checked against the live site rather than assumed — a Wednesday offers fifteen 30-minute slots from 09:00, a Saturday seven from 10:00, a Sunday none, and a date in the past none.",
      "Capacity that holds under contention. The places left in a slot are re-checked inside a MySQL advisory lock, so two bookings arriving in the same instant cannot both consume the last place.",
      "The whole email surface: confirmation, the manage link, a cancellation, a reminder before the session, and an operator's summary once an event's bookings close — table-based HTML with inline styles and no web font, sent through Resend's HTTP API when a key and a sender are configured and through WordPress's own mailer when they are not.",
      "Customer self-service on a signed, expiring token compared with hash_equals(), so a booking is cancelled or moved from the link in the email rather than by a post id in a URL.",
      "Payments through Stripe Checkout, called with WordPress's own HTTP function: no card data reaches this server and no payment plugin is installed for it. The booking is marked paid by the signature-verified webhook rather than by the browser returning.",
      "A one-way mirror into PostgreSQL — the booking domain as six typed tables with real dates, prices and foreign keys, the site's own tables as one JSON row per row, and the image bytes themselves, base64 in a jsonb column — because on a host with no disk, that copy is the only thing left after a restart.",
      "The rest of what a real site needs, without a plugin bought for it: Cloudflare Turnstile with per-IP and per-email rate limits, LocalBusiness and Service structured data emitted from the stored options, and a 404 template in the child theme that answers a genuine 404."
    ],
    architecture: [
      {
        layer: "The site",
        detail: "WordPress renders every page, and the pages are Elementor layouts stored in the database rather than committed as files. The look is a child theme whose entire design system — colour, type, space, radius, shadow and motion, in both colour schemes — is one block of tokens."
      },
      {
        layer: "The form",
        detail: "One shortcode, one Elementor widget and one real POST request. The script that turns the form into a live calendar only ever reads; it cannot change what the server will accept."
      },
      {
        layer: "Availability",
        detail: "The diary's rules live in one option, and the free-time queries are cached in front of them. The capacity check deliberately is not cached, because the write path decides with it."
      },
      {
        layer: "The write path",
        detail: "Creating, cancelling and rescheduling a booking, each of them wrapped around a MySQL advisory lock that makes check-then-insert safe rather than merely quick."
      },
      {
        layer: "Payments and email",
        detail: "Stripe Checkout out, a signature-verified webhook in, and one choke point that chooses between Resend and WordPress's mailer for every message the site sends."
      },
      {
        layer: "The mirror",
        detail: "Supabase, reached either through its HTTPS API or over a direct Postgres socket, chosen inside a single function — the same tables, the same rows and the same reconciliation whichever transport is in use."
      },
      {
        layer: "Delivery",
        detail: "A Docker image that pins what git cannot provide, and two deploy blueprints: the free one runs MariaDB beside Apache, because a free instance cannot reach a private database service."
      }
    ],
    decisions: [
      {
        title: "The webhook marks a booking paid. The browser coming back does not.",
        detail: "A return URL is something a visitor can close the tab on, replay or forge, so it is the wrong witness for money. The booking's outcome is written by the one caller that can prove who it is: a Stripe-signed webhook whose signature is verified before anything is read or written, and whose permission check is open only because the caller is Stripe. A payment that arrives late is confirmed by the webhook that eventually lands, not by a page assuming it worked."
      },
      {
        title: "The number that decides the last place is never cached.",
        detail: "Availability is asked for constantly, so it is cached. Capacity is not: the places remaining in a slot and whether that slot is still on offer have to be answers the write path can trust at the moment it writes, so they stay uncached while everything around them is not. A cache cannot fix two requests that both read 'one left', which is why the check and the insert sit inside an advisory lock rather than behind a faster read."
      },
      {
        title: "The mirror is strictly one direction, and it is written at shutdown.",
        detail: "Nothing ever reads PostgreSQL back, so a mirror that is down, paused or misconfigured cannot change a single answer the site gives — a booking is still taken and its place still consumed, and the failure is recorded rather than raised. The rows are also built at shutdown rather than when the write happens, because WordPress fires its save hook before the twenty-odd meta values that make a booking a booking have been written; a transform run there would faithfully publish a row of nulls."
      },
      {
        title: "There are no plugin-owned tables.",
        detail: "The domain is posts, registered meta, options and the users table. That means no schema to migrate, admin list screens that already existed, and no custom table for a core or plugin upgrade to strand. The cost is working within post meta instead of beside it, and it is worth paying for a plugin that has to survive years of WordPress releases."
      },
      {
        title: "Every optional feature is off when its variable is empty.",
        detail: "Resend, Stripe, Turnstile and the mirror are each switched on by configuration and absent without it, and with none of them set the site behaves exactly as it did before that feature existed. It is what lets one codebase be both a demonstration and a live booking business, and it means a missing key reads as a feature that is off rather than a site that is broken."
      },
      {
        title: "The theme is allowed to present, and to do nothing else.",
        detail: "No post types, no shortcodes, no request handling and no queries live in the child theme — behaviour belongs to the plugin, so a theme switch is a visual change rather than the removal of the booking system. The design tokens live in the theme for the same reason: a redesign costs a stylesheet, and it cannot reach the code that takes bookings."
      },
      {
        title: "The images travel inside the database, because a diskless host has nowhere to keep them.",
        detail: "A free instance wipes its filesystem on every restart, so a file that is not on disk is served from the mirrored copy, written back and handed to the browser on the way past. Verified on the live site: a session photograph that was not on disk answered 302 while its already-fetched generated size came back 200 from Apache. A bucket and a CDN would both be smaller and faster, and both would be a second system, a second credential and a second thing to configure."
      }
    ],
    stack: [
      "WordPress",
      "PHP 8.3",
      "MariaDB",
      "PostgreSQL",
      "Elementor",
      "Custom post types",
      "WordPress REST API",
      "MySQL advisory locks",
      "WP-CLI",
      "Docker",
      "Docker Compose",
      "Render",
      "Supabase",
      "Stripe",
      "Resend",
      "Cloudflare Turnstile"
    ],
    outcome: [
      "It is live, and its numbers were taken rather than estimated. A container starting against an empty database and an empty volume rebuilt the whole site from the copy — installing WordPress, restoring 713 rows and serving the real home page with every image fetched from PostgreSQL on first request. Every one of 4,240 restored values was compared against the copy and found identical, 32 image files were decoded and hashed against the originals with none differing, and the mirror alone carries 124 assertions across five re-runnable probes. The gaps are stated as plainly as the results: a free instance has no disk and no cron, so reminders and event summaries only run if a page view happens to arrive; Elementor is pinned to a beta because that is the version the design layer was measured against; and the repository's own pre-launch list — replace the placeholder business details, empty the mail redirect, verify a sending domain, remove the test keys, delete the probe bookings — is still open.",
      "What I took from building it: a booking system is not a form with a database behind it, it is a disagreement about authority. Who owns the free times, who gets the last place, who is allowed to say that money arrived, and what the site may still do once nothing else is reachable — every hard decision here was one of those, and the code is shortest exactly where an answer was settled once and then obeyed everywhere else."
    ]
  },
  {
    id: "ctu-lms",
    name: "CTU LMS",
    tagline: "A school management system delivered as two deployments — a Laravel API on Render and a Vue 3 single-page app on Vercel, talking to each other in ciphertext.",
    role: "A team project across two repositories, and I am one of the contributors listed on both. This case study covers the system as a whole: the Laravel API and its data model, the encrypted transport between the two halves, the role boundaries, and the single-page app that serves all three areas.",
    status: "Live demo, with the hosted API asleep until someone knocks. It runs on Render's free plan, so a first request after a quiet spell waits while it wakes — and the app sets no request timeout, so a cold login spins rather than fails. Registration on the API is open, so a student account can be created from the deployed site; the admin and teacher sides need an account that exists in the database.",
    liveUrl: "https://ctu-lms.vercel.app/",
    repoUrl: "https://github.com/paws1234/lmsfrontend",
    summary:
      "CTU LMS is the school management system for Cebu Technological University: student and teacher records, courses, class schedules, subjects, enrolments, events, announcements, question sheets, and the scores that come back from them. It ships as two applications that are deployed separately and never share a process — a Laravel API on Render that owns every record and every rule, and a Vue 3 single-page app on Vercel that owns the interface for three different roles. What makes it worth reading is not the CRUD, which is ordinary, but that the two halves cannot drift: every response is encrypted, the key is published by one endpoint precisely so both deployments can be checked against each other, and the server is the only place a permission is ever enforced. The repositories document their own rough edges as carefully as their features, which is why the awkward parts below are quoted rather than discovered.",
    metrics: [
      { label: "Migrations", value: "18" },
      { label: "Database tables", value: "15" },
      { label: "Routed screens", value: "32" },
      { label: "Roles", value: "3" }
    ],
    brief: [
      "A school does not need another form, it needs one place where a record is true. The same student appears in a class list, an enrolment, a schedule, a submission and a score, and those five things stop agreeing the moment two of them are allowed to be edited independently. The first version of that problem is the data model: an account, and then a profile row that other tables can point at.",
      "The constraint that shaped the rest is that the two halves are hosted by two different companies and released separately, so nothing may be assumed about the other side at build time. The response to that is a contract instead of a convention: every JSON body is encrypted with a key both halves hold, and since a key that drifts breaks login with a decryption error rather than a credentials error, the API exposes the key it is currently using on a single unencrypted endpoint. Whoever deploys either half can ask the other what it is holding before believing a bug report."
    ],
    built: [
      "A Laravel 10 API on PHP 8.2 with Sanctum bearer tokens and a role middleware in front of every route: public register, login and a key probe; a signed-in user and logout; then four surfaces — admin for students, teachers, courses, schedules and events, teacher for their own subjects, the student and subject pickers, enrolments, announcements, question sheets and dashboard tiles, and student for tasks, submissions, scores, subjects and enrolment counts.",
      "An 18-migration PostgreSQL schema of 15 tables: accounts in users, profiles in students and teachers pointing back at them, then the academic domain — courses, schedules, subjects, enrolments, events, todos, questions, answers, form_map, tasks, submissions and scores.",
      "A question sheet written in exactly one transaction. POST /api/teacher/questions creates the questions, their answers and one form_map row per allowed answer together, so a sheet that is half saved cannot be committed — and form_map is the join that makes the sheet a thing submissions can be posted against.",
      "Scoring decided on the server rather than sent by the browser. A submission posts question-and-answer pairs and the API decides what was correct, then groups a student's submissions per form into a correct-over-total count for the score screen.",
      "The transport between the halves: one middleware turns every JSON response into a base64 envelope of iv, value and mac under AES-256-CBC, and another decodes a non-GET body into request input, accepting it as either plain JSON or exact standard base64 — with GET /api/lms deliberately exempt, so there is one readable endpoint left to check the two deployments against each other.",
      "A Vue 3 single-page app of 32 leaf routes across the three role areas, each under its own layout, sharing one sidebar component that takes a title and a nav array — a persistent sidebar that collapses to an icon rail above 1024px and an off-canvas drawer below it, with the collapse preference kept across roles.",
      "Dashboards composed from three shared pieces — a statistic tile, a panel and an event list — over one page rhythm, with the rest of the screens built from shared classes in a single stylesheet rather than one-off styles, so a table or a modal looks the same wherever it appears.",
      "One theming system rather than three: Tailwind with its class-based dark mode, a token block that maps the everyday light utilities onto dark values so an ordinary page themes itself, and a small inline copy of the theme resolution in the HTML shell so the class is on the document before the first paint.",
      "Two independent Docker stacks, one per repository, each with its own compose file, environment example and command reference. The API one publishes PostgreSQL on 5433 so a developer's own database can keep 5432, and it can be pointed at a hosted Supabase project instead of the bundled database.",
      "Deployment for each half on its own terms: the SPA on Vercel with the build command, the output directory and a catch-all rewrite to the shell for history-mode routes, and the API on Render rebuilt from its Dockerfile and bound to whichever port the host assigns."
    ],
    architecture: [
      {
        layer: "The SPA",
        detail: "Vue 3 with Vue Router 4 and no store library, built by Vue CLI 5 on Node 22. 32 leaf routes, three layouts, one shared sidebar, and a single axios instance as the only way out of the app."
      },
      {
        layer: "The transport",
        detail: "Two middleware, one on the way out and one on the way in: the API encrypts every response body and decodes every non-GET request body, so the API's own JSON is never what actually travels over the wire."
      },
      {
        layer: "Authorisation",
        detail: "Sanctum bearer tokens plus a role middleware per surface, with student and teacher endpoints resolving the profile row from the authenticated user rather than trusting an id in the request."
      },
      {
        layer: "The data model",
        detail: "PostgreSQL, described by 18 migrations. Users is the account; students and teachers are profiles pointing at it; and a user without its profile row is a broken account that answers 404 until it exists."
      },
      {
        layer: "Uploads",
        detail: "Task attachments go straight from the browser to Cloudinary against an unsigned preset, so the API only ever stores the resulting URL and never handles the file."
      },
      {
        layer: "Delivery",
        detail: "The SPA on Vercel behind a catch-all rewrite, the API on Render, and the pair kept in step by the encryption key the API publishes for exactly that purpose."
      }
    ],
    decisions: [
      {
        title: "Every response is ciphertext, and the key is published on purpose.",
        detail: "The API encrypts each JSON response under AES-256-CBC and decrypts each non-GET request body, which means the SPA cannot talk to it at all unless the two sides hold the same key — a mismatch surfaces as a decryption failure, not a credentials error, which is the most confusing possible symptom for a deploy mistake. Publishing the key at GET /api/lms turns that into a one-request diagnosis. It is worth being plain about the trade-off: on a public endpoint this is obfuscation, not confidentiality, and the same endpoint is the one a reader should treat as removable."
      },
      {
        title: "The SPA has no route guard, and that is deliberate.",
        detail: "Only two dashboards check for a token before rendering; the admin area checks nothing at all. That is not a hole, because a route guard is not a security boundary — the guard would be running in the visitor's own browser. Every endpoint is protected server-side by a token check and a role check, so a visitor who types an admin URL gets a rendered shell whose requests all come back refused. The interface is allowed to be optimistic precisely because it decides nothing."
      },
      {
        title: "A question sheet is one transaction or it is nothing.",
        detail: "A sheet is not one row: it is questions, answers, and a join row per allowed answer that submissions are later posted against. Creating those in separate calls would leave a window in which a sheet exists without the rows that make it answerable. They are written together, which is what lets the rest of the system treat a question sheet as an atomic thing rather than a process that mostly works."
      },
      {
        title: "Correctness is decided on the server, never asserted by the client.",
        detail: "A submission carries which answers a student chose, not whether they were right. The API decides, and the score screen is built from what the server recorded — so a modified client cannot award itself marks, and the same result is reproduced on every reader of the data."
      },
      {
        title: "The two halves share nothing but the host's ports.",
        detail: "Each repository carries its own compose file and its own container, and neither one reaches the other from inside the network, because the browser is what calls the API. That is why one can be redeployed without the other, and it is also why the key has to be agreed rather than derived: there is no shared filesystem to read it from."
      },
      {
        title: "One column name means two different ids, and the schema says so.",
        detail: "teacher_id holds a teachers.id — the profile row's own key — in schedules, enrolments and questions, but a teachers.user_id in subjects, which is a users.id. That is the kind of detail that silently produces empty results when it is guessed wrong, so it is written down where the model is described rather than left to be rediscovered, and teachers.user_id is unique specifically so PostgreSQL will accept the second foreign key at all."
      },
      {
        title: "The rough edges are documented as carefully as the features.",
        detail: "The API README lists what is genuinely unfinished: a score model half-wired to columns the table does not have, a controller reading a field that never existed, two different keys for the same error message, a teacher id written one way and read another in the announcement and task paths, a duplicated login route, no rate limiting beyond the framework default, and a key handed to anyone who asks. A portfolio piece that only lists what works is a brochure; naming the parts that do not is what makes the rest of it credible."
      }
    ],
    stack: [
      "Laravel 10",
      "PHP 8.2",
      "Laravel Sanctum",
      "PostgreSQL 16",
      "Eloquent",
      "AES-256-CBC",
      "Vue 3",
      "Vue Router 4",
      "Vue CLI 5",
      "Tailwind CSS",
      "axios",
      "Cloudinary",
      "Docker",
      "Docker Compose",
      "Render",
      "Vercel"
    ],
    outcome: [
      "The pair is deployed and was checked as a pair rather than as two repositories: the SPA answers 200 on Vercel, the API's key endpoint answers 200 with the key it is currently using, and a login with deliberately wrong credentials comes back 401 carrying an encrypted envelope — which is the whole contract working in one request, since that body had to be encryptable and the front end's copy of the key has to match it. The same check turned up something less flattering: an unauthenticated request to a protected route answers 500 with an HTML error page rather than a 401 in the API's own format. A visitor never sees it, because the app catches the failure and shows a message, but it is the kind of thing worth catching before a stranger does.",
      "What the project is really about, in the end, is where a decision is allowed to live. The browser holds a token and a route table and decides nothing else; the API owns the records, the roles and the marking; and the only thing genuinely shared between two deployments hosted by two companies is a key they both have to agree on. Both repositories are in the MIT-licensed open, documentation included — the deploys, the environment variables and the unfinished parts."
    ]
  }
];
