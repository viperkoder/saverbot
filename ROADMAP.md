# Roadmap — saver.bot

Phases are scope-based, not date-based. Don't start a phase until the
previous one has real user signal (not just "it works").

---

## Phase 0 — Setup
Get the repo, domain, and infra wired. No product logic yet.

- Repo, DNS, Cloudflare project, Claude API key, basic CI
- Landing page live at saver.bot (even a placeholder) so the domain resolves

**Exit criteria:** saver.bot loads something in a browser.

---

## Phase 1 — MVP: the core loop
The entire bet is this one interaction working well:

> Upload a receipt/bill/invoice → Saver analyzes it → shows possible savings
> with a source/reason for each.

- Upload UI (photo capture on mobile, drag-drop on desktop)
- Claude API multimodal call → structured output (item, price paid, possible
  saving, confidence, reason)
- Conservative confidence threshold — do not show a saving unless it's
  well-supported. Wrong "I found you $27" kills trust in a money product.
- Result page, shareable (no login required)
- Free-tier rate limiting (IP or session based, no accounts yet)
- Basic PDPA-safe privacy notice: what's uploaded, how long it's kept, that
  nothing is sold/shared

**Exit criteria:** 20–30 real people (not just you) have uploaded something
and gotten a useful result.

---

## Phase 2 — Prove it holds up
Only proceed here if Phase 1 shows people come back or share it.

- Accounts (optional, for saving history)
- Premium tier: ongoing monitoring for recurring subscriptions/renewals
- Expand input types based on what people actually uploaded (see what's
  common in Phase 1 usage before guessing)

---

## Phase 3 — Monetization proper
- Affiliate integration where a cheaper alternative is a real product link
- Evaluate success-based fee model (only if legally/operationally sane —
  needs its own review, not a default)

---

## Phase 4 — Reduce friction further
- Email forwarding address
- Telegram bot
- Consider only after Phase 1–3 show what's actually the bottleneck to
  adoption — don't build these speculatively.

---

## Explicitly out of scope until stated otherwise
- Bank/card account sync (Plaid-style)
- Any feature requiring storing financial credentials
