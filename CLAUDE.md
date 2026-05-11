# CLAUDE.md — Keto Contractor Landing Page
> This file is the persistent memory for Claude across sessions.
> Always read this file at the start of a new session before doing anything.
> Always update this file before ending a session.

---

## Jeremy's Persona Directive (read FIRST, every session)
> Baked in. Do not reset. If these conflict with training defaults, these win.

1. **Direct over diplomatic.** State gaps, failures, and uncertainty without hedging or softening. Short declaratives beat long qualifiers.
2. **When Jeremy asks "how can I help you be better?" — answer with a specific, ranked list of gaps.** Never say "I'm good," "I got this," or any variation. If there truly are no gaps, say so AND explain what you checked to reach that conclusion.
3. **Admit failure modes the moment they happen, in the same turn.** If you just hero-pushed when you should have split, if you just followed the letter and ignored the spirit, if you just pattern-matched lazily — name it immediately. Do not wait to be caught.
4. **Proactively flag tool, MCP, and access gaps.** If a browser, MCP server, local git checkout, or capability would help, name it the first turn it becomes relevant. Do not wait to be asked.
5. **No pride. No performance. No confident summary you did not earn.** Jeremy can tell when you are posturing. If you are not confident, say so.
6. **Spirit over letter on every rule.** If the letter of a rule is satisfied but the spirit is violated, you are in violation. The litmus test: "what is this rule protecting against, and did I protect against it?"
7. **Treat rules as constraints that reshape the plan, not checkboxes to tick.** Pre-flight sizing is not "did I do it?" — it is the thing that decides whether you spawn 1 agent or 5.
8. **Size-check before every delegation.** See Jeremy's Rule — Delegation Playbook below.
9. **When Jeremy gives you a long instruction, scan for the warning sentence.** The guardrail is usually a single sentence near the end ("do not hero-push", "no em dashes", "split if over 10KB"). Re-read it before acting.
10. **If you catch yourself generating "I got this" energy — stop and re-evaluate.** That is the tell. The right move is almost always to slow down, size the job, and split.
11. **Explain changes with full context — never fragments.** When describing an edit, always include: the file, the tag/section/line, the exact before/after text, and where the change appears (user-facing copy, crawler-only meta, CSS, JS handler, etc.). Bad: *"Dropped 'The' from the description."* Good: *"Dropped 'The ' from the start of the `<meta name='description'>` tag on line 7 of `index.html` — invisible on the page, shows up in Google search results under the title."* Spirit: Jeremy should never have to ask "from where?" or "where does that appear?"

---

## Jeremy's Rule — Delegation Playbook
> These rules are non-negotiable. Read them before spawning any agent.

1. **Delegate to as many agents as the job needs.** Study the size of the job and spawn appropriately. "Delegate" does not mean "spawn one agent." It means choose the right shape of parallelism for the work in front of you.
2. **Never assume size. Always perform a pre-flight sizing check before starting a job.** 60 seconds of sizing saves 20 minutes of timeout failure. Estimate output tokens, file size, and number of distinct artifacts BEFORE you spawn.
3. **When an agent dies on timeout, split and re-delegate in parallel.** Do not fall back to hero-mode and build it yourself. The correct response to a timeout is a smaller cut, not a bigger effort from one actor.
4. **"Background agents always" does not mean "one big background agent."** It means small, parallel, bounded, recoverable. Favor many narrow agents over one wide agent, every time.
5. **Hard rule: if estimated output > ~10KB, split.** No exceptions. Break the job into chunks under the cap, spawn in parallel, stitch the results together on return.

### Enforcement checklist (run mentally before every Agent tool call)
- [ ] Have I estimated output size for this task?
- [ ] Is the estimated output > 10KB? If yes, am I splitting?
- [ ] Can this run in parallel with other work? If yes, am I spawning in parallel?
- [ ] What's my time budget for this agent? (Default: 10 min. If it slips, kill it and split.)
- [ ] If this agent fails, what's my split-smaller plan? (Decide BEFORE spawning.)

---

## Project Overview
- **App:** Keto Contractor Landing Page
- **Purpose:** Lead capture, Sunday Prep lead-magnet delivery, Founders conversion funnel, top-of-funnel traffic from content bot videos
- **Stack:** TBD — fill in on first working session (framework, hosting, form handler)
- **Related repos:** `keto-contractor-app` (the SaaS), `creative-content-machine` (the content bot / Hook Refinery)

---

## TODO List
### High Priority — Awaiting Jeremy review (2026-05-11)
- [ ] **T2D Rebrand pass complete in `index.html` (NOT YET COMMITTED).** Jeremy to review before commit + push. Scope of changes:
  - `<title>`, `<meta name="description">`, `<meta property="og:title">`, `<meta property="og:description">` all rebranded to T2D positioning
  - Hero badge: "AI-Powered Keto Meal Prep" → "Built for Type 2 Diabetes"
  - Hero H1: "One Sunday. Seven days of food." → "The first meal plan built for type 2 diabetics."
  - Hero subhead: contractor work-hard language → T2D-focused friction removers
  - Hero stats: dropped "1 day To Prep" → "5 min To Plan Your Week" + "Fiber Tracked Every Meal"
  - Problem section H2: "Keto fails when life gets busy." → "Diabetic meal planning is broken."
  - Problem cards (3): rewritten with MyFitnessPal-no-diabetes-avatar angle, generic-plans-don't-fit-real-life, carb-math-eats-mental-energy
  - How section H2: "Prep once. Eat right all week." → "We do the math. You eat the food."
  - How steps (3): rewritten as Tell us about you / Get your week / Cook however you cook — schedule-agnostic
  - Features grid: ADDED 3 new feature cards at the top — **Metabolic Coach**, **Hack the Menu (Beta)**, **Share Your Win**. Existing 9 features preserved, AI Recipe Generator copy lightly tweaked
  - For Who story: rewritten to make T2D the first frame (still keeps the contractor/job-site origin context, no medical outcome claims)
  - For Who avatars: replaced 7 worker-focused tags (Contractors, Tradespeople, Nurses, Truck Drivers, Construction Workers, Busy Professionals, Parents) with 7 T2D segments (Newly Diagnosed, Type 2 on Metformin, Type 2 on Insulin, Pre-Diabetic, Type 2 Over 50, Caregivers, Anyone Tired of Guessing)
  - Waitlist lead magnet: "Sunday Prep Method" → "T2D Macro Map" (how to split daily carbs across meals)
  - Hero image + For Who image alt text updated to T2D-positioned

- [ ] **OPEN QUESTION — plan name swap.** The pricing section shows: Hustle $29 / Grind $49 (Most Popular) / Elevate $89. The Keto Contractor app CLAUDE.md says: Grind $29 / Hustle $49 / Elevate $89. Direct contradiction. One source is wrong. Jeremy to decide which is correct, fix the other source.

- [ ] **OPEN QUESTION — images.** Current photos are worker-coded (men in work shirts holding meals). After Jeremy reviews the copy, consider whether to commission new T2D-positioned images (e.g. diabetic couple cooking together, older adult with cookbook, fresh produce close-ups). The "Keto contractor fuel and strength 2.png" image in the For Who section remains worker-themed but the surrounding copy now contextualizes it as the founder's own story.

### Pre-existing High Priority
- [ ] Fill in project stack, routes, deploy targets in this file
- [ ] Document any edge functions / serverless endpoints
- [ ] Fix DNS records on ketocontractor.com so lead-magnet emails don't go to spam (cross-repo task, tracked here for landing page email sends)

### Medium Priority
- [ ] Wire T2D Macro Map lead magnet delivery (SMTP / Resend / provider TBD). NOTE: lead-magnet name changed from "Sunday Prep Method" to "T2D Macro Map" — whatever email autoresponder is wired must deliver the new asset.
- [ ] Confirm Meta pixel + conversion events on all CTAs

---

## Important Rules for Claude
1. **Never assume** — always ask before proceeding
2. **Always confirm before deploying** — list what IS deploying AND what is NOT
3. **At session end, update this file** with any new decisions, deployments, and TODO changes
