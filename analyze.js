/**
 * POST /api/analyze
 * Accepts a single uploaded file (image or PDF) as multipart/form-data
 * under the field name "file". Sends it to Claude for a savings analysis
 * and returns structured JSON.
 *
 * Env required: CLAUDE_API_KEY (set via `wrangler secret put CLAUDE_API_KEY`)
 *
 * Deliberately conservative: Claude is instructed to only surface a
 * finding when it is well-supported. A wrong "I found you $27" is worse
 * than no finding at all for a product whose entire pitch is trust.
 */

const SYSTEM_PROMPT = `You are Saver, a plain-language savings analyst.
You will be shown an image or PDF of a receipt, bill, invoice, renewal
notice, or quotation.

Your job: identify concrete, well-supported ways the person might have
paid less, or could pay less next time. Do NOT guess or speculate to fill
space. If you don't have a well-supported finding, say so plainly.

Respond with ONLY valid JSON, no markdown fences, no preamble, matching
exactly this shape:

{
  "document_type": "receipt | bill | invoice | renewal | quotation | unknown",
  "items": [
    {
      "label": "short plain-language description",
      "amount_paid": "e.g. $89.90 or null if not identifiable",
      "possible_saving": "e.g. $12.00, or null if none found",
      "confidence": "high | medium | low",
      "reason": "one or two plain sentences a non-technical person understands"
    }
  ],
  "summary": "one sentence, plain language, e.g. 'No clear savings found on this one.'"
}

Rules:
- Only include an item if confidence is at least "medium". Do not pad the
  items array with low-confidence guesses.
- Never invent a price, discount, or promotion that isn't visible in the
  document or general common knowledge you're confident about.
- If nothing useful is found, return an empty items array and an honest
  summary. That is a valid and expected result.`;

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.CLAUDE_API_KEY) {
    return json({ error: "Server not configured (missing API key)" }, 500);
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "Expected multipart/form-data" }, 400);
  }

  const file = form.get("file");
  if (!file || typeof file === "string") {
    return json({ error: "No file uploaded under field 'file'" }, 400);
  }

  const MAX_BYTES = 10 * 1024 * 1024; // 10MB cap, keep free-tier costs sane
  if (file.size > MAX_BYTES) {
    return json({ error: "File too large (10MB limit)" }, 413);
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/heic", "image/webp", "application/pdf"];
  if (!allowedTypes.includes(file.type)) {
    return json({ error: `Unsupported file type: ${file.type}` }, 415);
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const base64 = btoa(String.fromCharCode(...bytes));

  const isPdf = file.type === "application/pdf";
  const contentBlock = isPdf
    ? { type: "document", source: { type: "base64", media_type: "application/pdf", data: base64 } }
    : { type: "image", source: { type: "base64", media_type: file.type, data: base64 } };

  const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": env.CLAUDE_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [contentBlock, { type: "text", text: "Analyze this for possible savings." }],
        },
      ],
    }),
  });

  if (!anthropicRes.ok) {
    const errText = await anthropicRes.text();
    return json({ error: "Analysis failed", detail: errText }, 502);
  }

  const data = await anthropicRes.json();
  const textBlock = (data.content || []).find((b) => b.type === "text");

  if (!textBlock) {
    return json({ error: "No analysis returned" }, 502);
  }

  let parsed;
  try {
    const cleaned = textBlock.text.replace(/```json|```/g, "").trim();
    parsed = JSON.parse(cleaned);
  } catch {
    return json({ error: "Could not parse analysis result" }, 502);
  }

  return json(parsed, 200);
}

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
