# Checklist — Phase 0 & Phase 1 (MVP)

## Phase 0 — Setup
- [x] Create GitHub repo under Viperkoder (doc set + scaffold committed)
- [ ] Point saver.bot DNS to Cloudflare
- [ ] Create Cloudflare Pages project, connect to repo
- [ ] Claude API key provisioned, stored as Cloudflare secret (never committed) — `wrangler pages secret put CLAUDE_API_KEY`
- [ ] Deploy scaffold, confirm placeholder page live at saver.bot
- [x] `.gitignore` covers env/secrets
- [x] AGENTS.md and docs/DECISIONS.md committed

## Phase 1 — Core loop
### Upload & intake
- [ ] Upload UI: camera capture on mobile (`<input capture>`), drag-drop on desktop
- [ ] Accept: JPG, PNG, HEIC, PDF
- [ ] Client-side file size/type validation before upload
- [ ] Upload goes to Worker, not stored longer than needed for analysis (state retention policy explicitly)

### Analysis
- [ ] Claude API multimodal call: image/PDF → structured JSON (items, price paid, possible savings, confidence, reasoning, source type)
- [ ] Confidence threshold enforced — low-confidence findings hidden or clearly flagged as speculative, not stated as fact
- [ ] Handle "no savings found" gracefully (this will be the common case — don't force a finding)
- [ ] Error handling: blurry image, unsupported document, non-receipt content

### Result page
- [ ] Clear, mum-readable output — no jargon
- [ ] Each finding shows its reasoning/source
- [ ] Shareable result (no login required for v0)
- [ ] Mobile-first layout (this is a phone-camera product)

### Guardrails
- [ ] Rate limiting (session/IP based) to cap free-tier Claude API spend
- [ ] Privacy notice: what's uploaded, retention period, no data sale — PDPA-aligned
- [ ] No financial account claims anywhere in copy ("we don't connect to your bank")

### Launch readiness
- [ ] Landing page copy: one-liner + example result + upload CTA
- [ ] Track: uploads, findings shown, shares (basic analytics only, no PII beyond what's needed)
- [ ] Soft-launch to a small group before any public post


## VKOS project registration — 12 October 2026

Project ID: `saverbot` · Owner: Viper · Executor/maintainer: Kody and authorised agents.

Objective: Test document-upload savings advice with conservative source-supported findings.

Approved scope and boundary: Web photo/PDF upload only; Claude is the recorded provider; no bank integration, accounts or billing in v0.

Acceptance: Existing Phase 0/1 checklist and 20–30 real-user exit criteria; no invented savings.

Portfolio discovery belongs to the [VKOS register](https://github.com/viperkoder/vk-ops/blob/main/projects/registry.yaml). This file retains its existing authority; registration adds no second roadmap. Follow the [project lifecycle and maintenance standard](https://github.com/viperkoder/vk-knowledge/blob/main/project-management/README.md#project-registration-and-lifecycle).

Documentation reconciliation: Source remains pre-build; deployment and current key availability are unverified. Root DECISIONS.md is the actual decision log.

## VKOS module architecture mapping — 31 October 2026

Owner: Viper; executor: Kody and authorised agents. `ROADMAP.md` retains phase scope; this checklist records current implementation evidence. The repository contains `index.html` and `analyze.js` scaffolding, with no verified production deployment or consumer test.

- **Required for Phase 1:** M01 Research Collector (uploaded document intake); M02 Content Generator (savings explanation); M03 Fact Validator (supported amounts and confidence); M05 Publisher (result response); M10 Integration Adapter (Claude API call); M12 Security & Access (upload validation, retention and rate limit); M13 Test & Verification (synthetic receipt/PDF and error cases); M15 Configuration (secret and deployment settings). `analyze.js` has candidate intake, call and response handling; confidence, schema and source checks are prompt-only and need deterministic validation. All project adoption IDs, including SB-M03, remain **NEEDS RECONCILIATION** until contract and consumer evidence exists.
- **Optional after Phase 1 evidence:** M04 Editorial Reviewer, M06 Workflow & Approval, M07 Job Runner & Recovery, M08 Notification, M09 Data Store & Retrieval, M11 Observability & Audit, M14 Deployment, M16 Migration.
- **Not applicable to the approved Phase 0/1 scope:** M17 Monetisation and M17.01–M17.07. Phase 2 premium and Phase 3 affiliate ideas remain deferred under `ROADMAP.md` and `DECISIONS.md`.
- **Next verification:** add synthetic malformed/unsupported upload, Claude failure, low-confidence, amount/source and privacy/rate-limit cases before claiming any Phase 1 module implemented. Preserve the free-scan sequence and no financial credential storage.
