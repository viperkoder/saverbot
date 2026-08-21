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
