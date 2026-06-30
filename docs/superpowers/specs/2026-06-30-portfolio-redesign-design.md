# Portfolio Redesign — "By Day / By Night" Dark Editorial

**Date:** 2026-06-30
**Owner:** Niyaz Ahamad Herkal (alias LuC1f3-r)
**Status:** Approved — ready for implementation plan

---

## 1. Problem

The current portfolio is technically competent (correct GSAP/ScrollTrigger usage, Lenis
smooth scroll, Framer Motion orchestration) but its **visual language is generic
AI-default**, so it reads as "AI-made, reflects no personal skill." Concretely, every page
repeats the same tells:

- Purple→pink `bg-clip-text` gradient headings everywhere.
- Floating orbs (`blur-3xl`), grid overlay, random particles, twinkling stars.
- Fabricated metrics: skill-percentage bars (Backend 90%, DevOps 80%…) and vague stats
  (3+ years / 10+ projects / 98% uptime).
- Hype copy: "Engineer of Chaos", "Code Whisperer", "Tech Arsenal", "Welcome to the
  experience".

The underlying content (real backend/systems work) is strong. The redesign keeps the
content and replaces the visual language with a single cohesive, high-craft direction.

## 2. Goal

Rebuild the portfolio as an **Awwwards-caliber dark-editorial, kinetic-type site** that
looks deliberately hand-crafted and surfaces the owner's real senior-level backend work.

## 3. Creative Direction

**Concept: "By day / by night."** The owner is a full-time backend engineer by day and a
freelancer/explorer by night (the "I'm Batman" line). The site expresses this as a
**scroll-linked day→night deepening of the canvas** — the page starts at the lightest
near-black and deepens toward true black as the visitor scrolls. Acid lime is the constant
"voltage" running through both states.

### Design tokens

| Token | Value | Usage |
|-------|-------|-------|
| Canvas (top) | `#0A0A0A` | Hero / above the fold |
| Canvas (bottom) | `#000000` | Deepens via scroll scrub |
| Text primary | `#EDEDED` | Body + headings |
| Text muted | `#888888` | Secondary / captions |
| Accent | `#C8FF00` (acid lime) | Sparing: active links, ONE keyword per heading, cursor/underline, hover, motion accents. Never as a large fill. |

- **Type:** an editorial **display** face for headings (oversized, tight tracking) + a clean
  **grotesk** for body + the existing **mono** restricted to numbers, labels, and code.
- **Hard rules (anti-slop):** no gradient text anywhere; no glow `textShadow`; no floating
  orbs/particles/stars; no skill-% bars; no fabricated metrics.
- **Motion:** Lenis smooth scroll + GSAP ScrollTrigger for pinned/kinetic moments + Framer
  Motion for component transitions. **Must honor `prefers-reduced-motion`** (disable
  scrubbed/pinned motion, keep content fully readable and static).

## 4. Structure

Collapse the current multi-route site (`/about`, `/projects`, `/techstack`, `/services`,
`/contacts`) into **one continuous single-page scroll narrative**. Navigation becomes
anchor-scrolling (via Lenis) to in-page sections. Old route files are removed or reduced to
redirects to the relevant anchor.

### Sections (top → bottom)

Final order: Hero → About → Impact → Experience → Work → Stack → Contact.

1. **Hero**
   - Name at massive scale.
   - **Signature kinetic moment: Day→Night name reveal** — the name fills the screen; on
     scroll it splits/shifts while the canvas transitions day→night and the lime accent
     ignites on the key word.
   - Roles: **Backend Engineer · Microservices & Event-Driven Systems · AWS Cloud**.
   - Tagline: "Full-time developer by day, freelancer & explorer by night."
   - Minimal social row (Instagram, LinkedIn, X, Email, GitHub — existing real links).

2. **About** — the real bio prose, set editorially. No skill bars.
   > Results-driven Backend Engineer with 3 years of experience building scalable production
   > APIs and event-driven microservices using Node.js, NestJS, and AWS. Currently leading
   > backend architecture on a B2C platform scaled to 10,000+ daily transactions; specialist
   > in TypeScript, AWS serverless, Kafka-based event flows, and distributed authentication
   > systems.
   - Keep the dual-theme CV download (dark/light PDFs already in `/assets`).

3. **Impact** — real metrics as large kinetic numerals, each with one line of context:
   - **3** years coding
   - **7** projects shipped
   - **10,000+** daily booking transactions
   - **60%** reduction in redundant auth transactions (~10k/day → ~4k/day)
   - **20%** reduction in inter-service processing latency

4. **Work** — large editorial rows (not generic glowing cards).
   - **Featured case study — B2C Services Platform (CodeHaste):**
     - Architected a multi-job booking module (overlapping/standalone appointment
       scheduling, Google-Calendar-style logic) scaling to **10,000+ booking transactions/day**,
       eliminating manual job-entry workflows.
     - Rebuilt authentication on **AWS Cognito** with JWT-backed persistent token refresh —
       **−60%** redundant auth transactions, eliminated unwanted session logouts.
     - Migrated a monolith to **message-based microservices (Kafka + AWS SQS)**, decoupling
       services and cutting inter-service processing latency **−20%**.
   - Then the open-source projects (existing real GitHub links):
     - **Serpico** — data extraction + analytics pipeline (Python).
     - **URL Shortener** — Node.js / Redis / PostgreSQL, built for heavy traffic.
     - **Self-Driving Car** — browser JS neural-network driving simulation.

4b. **Experience** — real career timeline as an editorial vertical list (NOT the current
   purple year-circles with floating particles). Real, owner-confirmed roles:
   - **CodeHaste** — Software Engineer, 2024–present (current). NestJS microservices, AWS
     Cognito auth, end-to-end product dev, CI/CD, Jest testing (~95% coverage).
   - **Zluri** — Software Development Engineer, 2023 (7 months). Backend features for
     high-traffic integrations (Monday.com, JumpCloud, Azure, JFrog, GitBook).
   - **BTrees Technologies** — Backend Developer Intern, 2022 (5 months). Led a 3-dev team
     building a web app for an educational institution.

5. **Stack** — real tech as a quiet typographic index (no glowing hover cards, no star
   background): TypeScript, Python · NestJS, Node.js, Flask, React, Next.js · Docker,
   PostgreSQL, Redis, MongoDB, Kafka, AWS SQS, AWS, Linux, Git.

6. **Contact** — large closing statement + real socials/contact details (email
   niyaz47nhh@gmail.com, phone +91 88848 01005, Bangalore, `formsubmit.co` form,
   `cal.com/niyazherkal` booking). The **Batman line is the easter-egg payoff** here
   ("…and by night, I'm Batman.").

## 5. Voice / content rules

- **Status:** Employed at **CodeHaste**; also freelancing; **open to work**.
- Every number on the site is real and owner-supplied — no fabricated stats, no confidence
  percentages.
- Confident, grounded prose. No hype nouns ("Chaos", "Arsenal", "Whisperer").

## 6. What is kept vs removed

**Kept:** all real content/projects/links; the Next.js App Router; the
GSAP + ScrollTrigger + Lenis + Framer Motion + Tailwind v4 stack (repurposed toward the new
direction); the dual-theme CV download.

**Removed:** purple/pink gradient text; skill-% bars; floating orbs/particles/stars; glow
shadows; "Engineer of Chaos" / "Code Whisperer" / "Tech Arsenal" / "Welcome to the
experience" copy; the fabricated 98% uptime / 10+ projects stats; the entire **Services**
section (`app/services/page.tsx`) as generic filler; the purple scrollbar gradient, glow
utility classes, and `body::before` scan-line overlay in `globals.css`; the page-load
metadata "Engineer of Chaos" / "Code Whisperer" strings in `layout.tsx`.

**Restyled (kept, re-skinned to the new system):** `StoryLoader` (keep the cinematic
loader idea, re-skin to near-black + lime, honor reduced-motion), `cursorTrail` (minimal,
lime, disabled on touch + reduced-motion), `ScrollProgress`, `Navbar`, `Footer`,
`SectionTransition` helpers (`TextReveal`/`StaggerReveal`/`ParallaxLayer` reused).

### Typography (self-hosted via `next/font/google`)

- **Display (headings):** Bricolage Grotesque — editorial, oversized, tight tracking.
- **Body:** Inter (or Geist) — clean grotesk.
- **Mono (numbers/labels/code only):** JetBrains Mono.
- Exposed as CSS variables `--font-display`, `--font-body`, `--font-mono` on `<html>`.

## 7. Non-goals (YAGNI)

- No WebGL/3D/shader hero (chose dark-editorial lane, not experimental).
- No CMS, blog, or backend — static content in the App Router is sufficient.
- No new dependencies unless a chosen display font requires one; prefer
  `next/font` for self-hosted fonts.

## 8. Success criteria

- Side-by-side, the new site is unmistakably distinct from the generic purple/pink template.
- A visitor learns the owner's real, specific impact (10k txns/day, −60% auth, −20% latency)
  within the first two scroll sections.
- Smooth scroll + kinetic moments run at 60fps on a laptop and fully degrade under
  `prefers-reduced-motion`.
- No fabricated metric remains anywhere on the site.
