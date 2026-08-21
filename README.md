# saver.bot

**Send me something you paid for. I'll try to save you money.**

## What it is

A consumer AI agent. Upload a receipt, bill, invoice, renewal notice, or
quotation. Saver reads it and tells you — in plain language — whether you
could have paid less, and what to do about it (price match, unused coupon,
duplicate subscription, cheaper plan, refund/return window).

No dashboards. No accounting terms. No bank connection in v0.

## Why it can work

Adjacent products (ReceiptNudge, Scanomy) manage receipts. None of them
actively chase "how do I get money back." That gap is the product.

## Status

`v0 — pre-build`. See [ROADMAP.md](./ROADMAP.md) for phases and
[CHECKLIST.md](./CHECKLIST.md) for the current build checklist.

## Stack (locked decision — see docs/DECISIONS.md)

- **Hosting:** Cloudflare Workers/Pages
- **AI:** Claude API (multimodal — receipt/bill image or PDF in, structured
  savings analysis out)
- **Input:** Web upload only for v0 (photo or PDF). No email forwarding, no
  Telegram, no bank sync.
- **Domain:** saver.bot (owned)

## Monetization sequence

Free scans → premium monitoring → affiliate revenue where relevant →
possibly success-based savings fee. Do not build billing before free-tier
value is proven with real users.

## Non-goals for v0

- No bank/card account integration
- No stored payment credentials
- No automated price-tracking crawlers
- No accounts/login required to try it once
