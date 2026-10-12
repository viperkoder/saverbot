# AGENTS.md — saver.bot

Instructions for any AI agent (Claude Code, Cowork, or otherwise) working in
this repository.

## Source of truth
- This repo is authoritative for saver.bot code, config, docs, and decisions.
- `ROADMAP.md` = current phase and what's in/out of scope.
- `CHECKLIST.md` = what's actually done vs pending for the current phase.
- `DECISIONS.md` = why things are the way they are. Don't relitigate a
  logged decision without flagging it explicitly and stating new evidence.
- Do not create a second roadmap, checklist, or decisions file anywhere else
  in this repo or elsewhere. Update these, don't fork them.

## Locked architecture decisions (do not silently change)
- Hosting: Cloudflare Workers/Pages
- AI: Claude API for multimodal parsing
- v0 input: web upload only (photo/PDF). No bank integration, no stored
  payment credentials, ever, without explicit sign-off logged in
  DECISIONS.md.
- No accounts/login required for a first-time user to get a result.

## Working style
- Small, reversible commits. This is a pre-PMF product — expect rework.
- Don't build Phase 2+ features while Phase 1 exit criteria are unmet (see
  ROADMAP.md). Flag if asked to jump ahead.
- Prefer Cloudflare free-tier primitives (KV, D1, R2) before reaching for
  paid services.
- Any Claude API prompt used for the analysis pipeline should default to
  under-claiming savings rather than over-claiming. False positives are
  worse than false negatives for this product.
- Log new architecture or product decisions in `DECISIONS.md` as you
  make them, dated.

## Explicitly not this repo's job
- General agentic-pattern doctrine (that lives in vk-knowledge, owned by
  Kody — reference it, don't duplicate it here).
- Cross-project task tracking (that's vk-ops).

## Reporting reusable knowledge upward
If something learned while building saver.bot is general engineering
doctrine (not saver.bot-specific), don't add it to vk-knowledge directly —
flag it to Viper as a proposed update for Kody to review.


## VKOS registration maintenance

Follow the [VKOS project lifecycle and maintenance standard](https://github.com/viperkoder/vk-knowledge/blob/main/project-management/README.md#project-registration-and-lifecycle). Keep this repository's existing canonical record updated when scope, decisions, status, blockers or verification change; reconcile affected inventory metadata in the [VKOS register](https://github.com/viperkoder/vk-ops/blob/main/projects/registry.yaml). Do not duplicate its roadmap or turn memory into project authority. If access prevents capture, record the exact outstanding reconciliation and owner before closing.
