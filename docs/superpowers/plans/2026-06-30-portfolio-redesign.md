# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. For each visual task, also consult the **design-taste-frontend** and **high-end-visual-design** skills before writing JSX/CSS.

**Goal:** Rebuild the Next.js portfolio from its generic AI-default purple/pink look into an Awwwards-caliber dark-editorial, kinetic-type site ("by day / by night", acid-lime accent) that surfaces the owner's real backend achievements.

**Architecture:** Single-page App Router site (`app/page.tsx` composes section components). Each section is a focused client component. A shared design-token layer (fonts via `next/font/google`, CSS variables in `globals.css`) enforces the new system. Motion stays on the existing GSAP + ScrollTrigger + Lenis + Framer stack, repurposed; all scroll/kinetic motion gates on `prefers-reduced-motion`.

**Tech Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · `@studio-freight/lenis` · Framer Motion · `next/font/google`.

## Global Constraints

- **Accent color:** acid lime `#C8FF00`, used sparingly only. Never a large fill.
- **Canvas:** `#0A0A0A` (top) deepening to `#000000` (bottom). **Text:** `#EDEDED` primary, `#888888` muted.
- **Banned (anti-slop):** gradient text (`bg-clip-text` on text), `blur-3xl` orbs, particle/star fields, glow `textShadow`/`box-shadow`, skill-% bars, fabricated metrics, hype copy ("Chaos", "Arsenal", "Whisperer", "Welcome to the experience").
- **Every metric on the site must be real** (owner-supplied) — see spec.
- **Motion:** must honor `prefers-reduced-motion: reduce` — disable scrubbed/pinned/looping motion, content stays fully readable and static.
- **Fonts:** display = Bricolage Grotesque, body = Inter, mono = JetBrains Mono — all via `next/font/google`, exposed as `--font-display` / `--font-body` / `--font-mono`.
- **No new runtime dependencies** beyond what's installed (fonts come from `next/font`, already part of Next).
- **Verification is visual:** there is no test runner in this repo. Each task is verified with `npx tsc --noEmit` (typecheck), `npm run lint`, `npm run build`, and a browser screenshot via the **browse** skill at desktop (1440px) and mobile (390px) widths. "Expected" = builds clean + screenshot matches the section's intent + no banned patterns present.

**Reference (full content & real copy):** `docs/superpowers/specs/2026-06-30-portfolio-redesign-design.md`.

---

### Task 0: Branch + baseline

**Files:** none (git only)

- [ ] **Step 1: Create a working branch**

```bash
git checkout -b redesign/day-night-editorial
```

- [ ] **Step 2: Capture "before" screenshots for comparison**

Start the dev server (`npm run dev`) and use the **browse** skill to screenshot `http://localhost:3000` full-page at 1440px and 390px. Save as `before-desktop.png` / `before-mobile.png` in the scratchpad. These are the baseline we diff against.

- [ ] **Step 3: Commit the branch point** (no-op commit not needed; proceed).

---

### Task 1: Design foundation — fonts, tokens, metadata

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: CSS variables on `<html>`: `--font-display`, `--font-body`, `--font-mono`; theme tokens `--canvas-top`, `--canvas-bottom`, `--fg`, `--fg-muted`, `--accent` (= `#C8FF00`). All later tasks read these via Tailwind arbitrary values (e.g. `text-[--fg]`) or the `font-*` utilities wired below.

- [ ] **Step 1: Wire fonts in `layout.tsx`**

```tsx
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
```

Apply to `<html>`: `className={`lenis ${display.variable} ${body.variable} ${mono.variable}`}`. Set `<body className="bg-[#0A0A0A] text-[#EDEDED] antialiased font-[family-name:var(--font-body)]">`.

- [ ] **Step 2: Replace the metadata** in `layout.tsx` — remove all "Engineer of Chaos" / "Code Whisperer" / "engineered chaos" strings. New:

```ts
title: "Niyaz Ahamad Herkal — Backend Engineer",
description: "Backend Engineer building scalable APIs and event-driven microservices with Node.js, NestJS, and AWS. Architected a B2C platform scaled to 10,000+ daily transactions.",
```
Update `openGraph` + `twitter` titles/descriptions to match (no hype copy). Keep `metadataBase`, image, plausible script.

- [ ] **Step 3: Rewrite `globals.css` tokens.** Replace the `:root` block, scrollbar, glow utilities, scan-line `body::before`, and selection/focus colors:
  - `:root`: define `--canvas-top:#0A0A0A; --canvas-bottom:#000; --fg:#EDEDED; --fg-muted:#888; --accent:#C8FF00;`. Delete `--purple-glow`/`--pink-glow`.
  - Scrollbar thumb → solid `#222`, hover `#333` (no gradient).
  - Delete `.drop-shadow-glow`, `.text-glow`, `.box-glow`, `.bg-glow`, `.card-hover` glow, `pulse-glow`/`gradient-shift` keyframes, and the `body::before` scan-line block.
  - `::selection` → `background:#C8FF00; color:#000;`. `*:focus-visible` outline → `#C8FF00`.
  - Set `body` font-family to `var(--font-body)`.
  - Keep the `@media (prefers-reduced-motion: reduce)` block.
  - Add helper: `.font-display{font-family:var(--font-display);} .font-mono-token{font-family:var(--font-mono);}`.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: builds clean. Then browse-screenshot the homepage — fonts visibly changed, background near-black, no scan lines. (Sections still old-styled; that's fine.)

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "feat(foundation): editorial fonts + lime/near-black tokens, drop glow system"
```

---

### Task 2: Hero — Day→Night name reveal

**Files:**
- Modify: `app/components/Hero.tsx` (full rewrite)

**Interfaces:**
- Consumes: tokens from Task 1.
- Produces: default-exported `Hero` section with `id`-less root (wrapper `#home` lives in `page.tsx`).

**Design intent (consult design-taste-frontend + high-end-visual-design first):**
- Massive name set in `--font-display`, near-viewport-width, tight tracking, `#EDEDED`.
- **Signature motion:** a GSAP ScrollTrigger timeline pinned to the hero that (a) scrubs the section background from `--canvas-top` toward `--canvas-bottom`, (b) splits/offsets the two name lines outward slightly, and (c) transitions one key word (e.g. "Herkal" or a lime underline) to `--accent` as you scroll. Reuse the existing parallax pattern but drop orbs/grid/particles entirely.
- Roles rendered as a static stacked line (no typing cursor): `Backend Engineer · Microservices & Event-Driven Systems · AWS Cloud` in `--font-mono`, `--fg-muted`, lime middots.
- Tagline: "Full-time developer by day, freelancer & explorer by night."
- Keep the 5 real social links (Instagram, LinkedIn, X, Email, GitHub) as a minimal mono row; hover → lime.
- CTA "View my work" → smooth-scroll to `#projects`.
- **Remove:** `roles` typing effect, `bgLayer*` orbs, grid, `[...Array(15)]` particles, all gradient text & glow `textShadow`.
- Wrap all GSAP in a `prefers-reduced-motion` guard (if reduced: set final state immediately, no ScrollTrigger).

- [ ] **Step 1: Rewrite `Hero.tsx`** per the intent above. Keep `useRef`/`useEffect` + `ScrollTrigger.getAll().kill()` cleanup pattern already in the file. Gate motion:

```tsx
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduced) { /* set elements to final state, skip ScrollTrigger */ return; }
```

- [ ] **Step 2: Verify** — `npx tsc --noEmit && npm run build`; browse-screenshot `#home` at 1440px and 390px and scroll mid-hero to confirm the day→night scrub + lime ignite read well and the name doesn't clip on mobile. No banned patterns.

- [ ] **Step 3: Commit**

```bash
git add app/components/Hero.tsx
git commit -m "feat(hero): day-night name reveal, drop typing/orbs/particles"
```

---

### Task 3: About — editorial bio

**Files:**
- Modify: `app/about/page.tsx` (rewrite; remove skill bars + stats strip — stats move to the new Impact section in Task 4)

**Design intent:**
- Two-zone editorial layout: a short mono kicker ("About"), then the real bio as large, confident prose (`--font-body`, generous leading, max ~60ch), with 3–4 key phrases ("event-driven microservices", "10,000+ daily transactions", "AWS") set in lime or `#EDEDED` weight-bold (NOT gradient).
- Bio copy verbatim from spec §4.2.
- Keep the dual-theme **Download CV** control (dark/light PDFs in `/assets`) but restyle: a simple lime-outline button + minimal dropdown (no purple glow).
- **Remove:** the `skills` array + percentage bars, the `Core Competencies` block, the `3+/10+/98%` stats grid, all gradient text.

- [ ] **Step 1: Rewrite `app/about/page.tsx`.** Keep the GSAP title/text reveal (reuse `power3.out` fromTo) but delete the skills-bar animation. Gate motion on reduced-motion.
- [ ] **Step 2: Verify** — typecheck + build + screenshot `#about`. Confirm no skill bars / no fake stats / no gradient text.
- [ ] **Step 3: Commit** `git commit -m "feat(about): editorial bio, remove skill bars and fake stats"`

---

### Task 4: Impact — real metrics

**Files:**
- Create: `app/components/Impact.tsx`

**Interfaces:**
- Produces: default-exported `Impact` client component. Imported by `page.tsx` (Task 10).

**Design intent:**
- A row/grid of large kinetic numerals (`--font-display`, oversized) with a one-line mono caption under each. Real values ONLY:
  - `3` — years coding
  - `7` — projects shipped
  - `10,000+` — daily booking transactions
  - `60%` — fewer redundant auth transactions
  - `20%` — lower inter-service latency
- Animate numerals counting up (or a simple mask-reveal) on enter via GSAP/ScrollTrigger `once:true`; lime accent on the unit/symbol only. Reduced-motion → show final numbers immediately.
- No cards-in-cards; thin `#1a1a1a` dividers, lots of negative space.

- [ ] **Step 1: Create `Impact.tsx`** with a `const metrics = [{ value, suffix, label }...]` array (exact values above) and the reveal animation, reduced-motion gated.
- [ ] **Step 2: Verify** — typecheck + build (component renders once wired in Task 10; for now add a temporary import in `page.tsx` is unnecessary — instead verify via build only).
- [ ] **Step 3: Commit** `git commit -m "feat(impact): real metrics section"`

---

### Task 5: Experience — editorial timeline

**Files:**
- Modify: `app/experience/page.tsx` (rewrite)

**Design intent:**
- Replace the purple year-circles + connector lines + floating particles with a clean editorial vertical list: each role is a row with a mono year on the left, role + company in `--font-display`/bold, and a `--fg-muted` description. Current role marked with a small lime dot/label (no `animate-ping`, no glow).
- Real roles verbatim from spec §4b (CodeHaste 2024–present, Zluri 2023, BTrees 2022).
- Remove the embedded `<style>` block keyframes (glow-soft/float) and the IntersectionObserver particle logic; use one GSAP stagger reveal (reduced-motion gated) or Framer `whileInView`.

- [ ] **Step 1: Rewrite `app/experience/page.tsx`** with the three real roles and editorial layout.
- [ ] **Step 2: Verify** — typecheck + build + screenshot `#experience` desktop/mobile. No purple, no particles.
- [ ] **Step 3: Commit** `git commit -m "feat(experience): editorial timeline with real roles"`

---

### Task 6: Work — featured case study + projects

**Files:**
- Modify: `app/projects/page.tsx` (rewrite)

**Design intent:**
- Lead with a **featured case study** block (the CodeHaste B2C platform): big headline, then 3 bullet achievements verbatim from spec §4.4 (booking module 10k+/day; Cognito auth −60%; Kafka/SQS −20% latency), with the numbers in lime/bold.
- Below it, the 3 real OSS projects (Serpico, URL Shortener, Self-Driving Car) as **large editorial rows** (project name in `--font-display`, mono tag list, description, GitHub/live links) — NOT the current glowing gradient cards with `perspective` rotateX and bottom-glow.
- Keep real links + `react-icons`/`lucide` icons; hover → lime. Keep the "View all on GitHub" link.
- Reuse the GSAP card stagger but remove `rotateX`/glow; reduced-motion gated.

- [ ] **Step 1: Rewrite `app/projects/page.tsx`** with the featured case study + editorial project rows. Keep the `projects` array (real data already present); add the featured case-study content as static JSX above the list.
- [ ] **Step 2: Verify** — typecheck + build + screenshot `#projects`. Featured metrics visible; no gradient/glow cards.
- [ ] **Step 3: Commit** `git commit -m "feat(work): featured case study + editorial project rows"`

---

### Task 7: Stack — typographic index

**Files:**
- Modify: `app/techstack/page.tsx` (rewrite)

**Design intent:**
- Replace the `StarsBackground`, glowing hover cards, and `Tech Arsenal` gradient title with a quiet typographic index: grouped by Languages / Frameworks / Infrastructure, each item as plain text (optionally a small monochrome `react-icons/si` glyph that tints lime on hover). Generous spacing, thin dividers.
- Keep the real tech list (add Kafka + AWS SQS to Infrastructure to match Impact/Work). Title becomes plain editorial "Stack" (no gradient).
- Remove `StarsBackground` entirely. Reduced-motion gated stagger.

- [ ] **Step 1: Rewrite `app/techstack/page.tsx`** — delete `StarsBackground`, restyle to typographic index, add Kafka + AWS SQS.
- [ ] **Step 2: Verify** — typecheck + build + screenshot `#techstack`. No stars, no glow, no gradient title.
- [ ] **Step 3: Commit** `git commit -m "feat(stack): typographic index, drop stars/glow cards"`

---

### Task 8: Contact — editorial closer

**Files:**
- Modify: `app/contacts/page.tsx` (rewrite)

**Design intent:**
- Big closing statement in `--font-display` ("Let's build something."), then the real contact details (email niyaz47nhh@gmail.com, phone +91 88848 01005, Bangalore) and socials as a clean mono list; lime hovers.
- Keep the working `formsubmit.co` form and `cal.com/niyazherkal` "Book a call", restyled (lime focus rings, no purple, no `blur-3xl` orbs background).
- **Batman easter-egg payoff:** end with a small line "…and by night, I'm Batman." (subtle, `--fg-muted`, lime on hover/reveal).
- Remove the two `blur-3xl` background orbs, `// 07. Contact` gradient, and purple gradient button (button → lime).

- [ ] **Step 1: Rewrite `app/contacts/page.tsx`** keeping the real form action/hidden fields and contact data; restyle + add Batman line.
- [ ] **Step 2: Verify** — typecheck + build + screenshot `#contacts`. Form still posts to formsubmit; no orbs/gradient.
- [ ] **Step 3: Commit** `git commit -m "feat(contact): editorial closer, batman easter egg, lime form"`

---

### Task 9: Chrome — Navbar, Footer, loader, cursor, progress

**Files:**
- Modify: `app/components/Navbar.tsx`
- Modify: `app/components/Footer.tsx`
- Modify: `app/components/StoryLoader.tsx`
- Modify: `app/components/cursorTrail.tsx`
- Modify: `app/components/ScrollProgress.tsx`

**Design intent:**
- **Navbar:** logo "Niyaz · LuC1f3-r" in `--font-mono` (no gradient); links → lime active/hover; remove the Services link from `navLinks`; keep the hide-on-scroll behavior. Mobile menu border → `#1a1a1a`, accents → lime.
- **Footer:** drop gradient logo + "Engineering Chaos Since 2022" → "Backend Engineer · Bangalore". Remove the two `blur-3xl` orbs. Remove Services from `footerLinks`. Lime hovers. Keep real socials + copyright.
- **StoryLoader:** keep cinematic intro but re-skin to near-black + a single lime element (e.g. name/percentage in mono); honor reduced-motion (skip/short-circuit to `onComplete` quickly). Read the file first and preserve its `onComplete` contract.
- **cursorTrail:** reduce to a minimal lime dot/ring; disable on touch devices and when reduced-motion; remove purple.
- **ScrollProgress:** bar/indicator color → lime (read file first).

- [ ] **Step 1: Read each file, then restyle** per intent (one commit, but verify each renders).
- [ ] **Step 2: Verify** — typecheck + build + screenshot top of page (navbar + loader) and bottom (footer); confirm Services link gone, no gradient logo, lime accents.
- [ ] **Step 3: Commit** `git commit -m "feat(chrome): restyle nav/footer/loader/cursor/progress to new system"`

---

### Task 10: Compose page, remove Services, reorder

**Files:**
- Modify: `app/page.tsx`
- Delete: `app/services/page.tsx`
- Modify: `app/globals.css` (only if any now-unused keyframes remain)

**Design intent:**
- New section order in `page.tsx`: Hero (`#home`) → About (`#about`) → Impact (`#impact`) → Experience (`#experience`) → Projects/"Work" (`#projects`) → TechStack (`#techstack`) → Contact (`#contacts`).
- Import and insert `Impact` (Task 4). Remove the `Services` import and its `<SectionTransition>`.
- Tune `SectionTransition` `transitionType` per section for a cohesive feel (e.g. `slideUp`/`maskReveal`/`fade`) — avoid heavy `diagonalWipe` if it fights the editorial tone.
- Delete `app/services/page.tsx`. Confirm nothing else imports it (`grep -rn "services/page" app`).

- [ ] **Step 1: Update `page.tsx`** imports/order, add Impact, remove Services.
- [ ] **Step 2: Delete the Services route** and grep to confirm no dangling imports.

```bash
grep -rn "Services\|services/page" app/ || echo "clean"
```
Expected: only matches are removed; `clean` or no Services references remain.

- [ ] **Step 3: Verify** — `npx tsc --noEmit && npm run lint && npm run build`; full-page browse-screenshot, scroll through every section.
- [ ] **Step 4: Commit** `git commit -m "feat(page): compose new order, add impact, remove services"`

---

### Task 11: Final polish + accessibility + verification

**Files:** any touched above (polish only)

- [ ] **Step 1: Reduced-motion audit.** With the **browse** skill, emulate `prefers-reduced-motion: reduce` and reload. Confirm every section renders fully readable with no pinned/scrub/looping motion. Fix any section whose content is hidden when motion is off (content must never depend on an animation that doesn't run).
- [ ] **Step 2: Responsive audit.** Screenshot every section at 390px and 1440px. Fix overflow, clipped display type, and tap-target spacing.
- [ ] **Step 3: Anti-slop grep.** Confirm none of the banned patterns remain:

```bash
grep -rn "bg-clip-text\|blur-3xl\|text-glow\|Engineer of Chaos\|Code Whisperer\|Tech Arsenal\|98%\|10+ \|Engineering Chaos" app/ || echo "clean"
```
Expected: `clean` (or only legitimate matches you can justify, e.g. a real "10,000+").

- [ ] **Step 4: Build + final screenshots.** `npm run build` clean; capture `after-desktop.png` / `after-mobile.png` and diff against Task 0 baselines to confirm the transformation.
- [ ] **Step 5: Commit** `git commit -m "polish: reduced-motion + responsive + anti-slop sweep"`

---

## Self-Review

**Spec coverage:** Hero (T2), About (T3), Impact/real stats (T4), Experience (T5), Work/case study (T6), Stack (T7), Contact + Batman (T8), tokens/fonts/metadata (T1), removed Services + chrome restyle (T9–T10), reduced-motion + anti-slop (T1, T11). All spec sections map to a task.

**Placeholders:** none — each task names exact files, exact real copy/metrics (sourced from spec), and exact verification commands. Visual tasks reference the design skills for the open-ended styling, which is appropriate since this is a taste-driven redesign, not algorithmic code.

**Type consistency:** new component is `Impact` (default export) imported in `page.tsx`; section ids consistent (`#home/#about/#impact/#experience/#projects/#techstack/#contacts`) across `page.tsx`, `Navbar.navLinks`, `Footer.footerLinks`. Services removed from all three.
