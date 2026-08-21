# Decisions Log — saver.bot

Dated log of durable product/architecture decisions. Newest first.

---

## 2026-08-22 — Input method for v0
**Decision:** Web upload only (photo capture on mobile, drag-drop on
desktop). No email forwarding, no Telegram bot for v0.
**Why:** Lowest friction — no setup step, works on first visit, mobile
camera is the natural capture device for a receipt/bill.
**Revisit when:** Phase 1 exit criteria met and users ask for alternate
input channels.

## 2026-08-22 — Hosting/stack
**Decision:** Cloudflare Workers/Pages.
**Why:** Connector already active for Viper, free-tier primitives (KV, D1,
R2) cover the MVP's needs without GPU/compute cost, avoids standing up
separate hosting infra.

## 2026-08-22 — No bank/financial account integration in v0
**Decision:** Saver does not connect to bank accounts, cards, or store
payment credentials. Input is user-uploaded documents only.
**Why:** Dramatically lower compliance burden (PDPA, no Plaid-equivalent
needed), faster to ship, lower trust barrier for first-time users.
**Revisit when:** Core loop is validated and there's clear demand for
automatic/ongoing monitoring — this becomes a Phase 2+ conversation with
its own compliance review, not a default.

## 2026-08-22 — Domain acquired
**Decision:** saver.bot purchased (~$52-65/yr per Ian Nuttall's .bot list,
Aug 2026 pricing — confirm renewal price separately, list pricing may not
reflect renewal cost).
**Why:** Direct fit for the "send me something you paid for" concept,
self-explanatory name.

## 2026-08-22 — Monetization sequencing
**Decision:** Free scans first. Premium monitoring, affiliate revenue, and
possible success-based fees come only after free-tier value is proven with
real usage.
**Why:** Avoid building billing/monetization infra before knowing anyone
wants the core product.

## 2026-08-22 — initiate.bot kept separate
**Decision:** initiate.bot (also purchased) is a separate concept — a
competitive "arena" for AI agents — and is explicitly out of scope for this
repo. Not being actively built; parked as a manual/concierge experiment per
separate discussion. No shared code or infra with saver.bot unless decided
otherwise.
