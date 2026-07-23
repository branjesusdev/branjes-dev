import type { APIRoute } from "astro";
import { GROQ_API_KEY } from "astro:env/server";
import { buildSystemPrompt } from "@shared/lib/chat-prompt";

// This is the one dynamic route in an otherwise fully static site (see
// `output: "server"` + per-page `prerender = true` in astro.config.mjs) —
// it exists solely to keep the Groq API key server-side, never exposed to
// the browser.
export const prerender = false;

const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 800;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const isValidMessage = (value: unknown): value is ChatMessage =>
  typeof value === "object" &&
  value !== null &&
  ((value as ChatMessage).role === "user" || (value as ChatMessage).role === "assistant") &&
  typeof (value as ChatMessage).content === "string" &&
  (value as ChatMessage).content.trim().length > 0 &&
  (value as ChatMessage).content.length <= MAX_MESSAGE_LENGTH;

// Best-effort abuse mitigation for a low-traffic personal site: reject
// requests that don't look like they came from this site's own front end.
// Not a substitute for real rate limiting (that would need external state —
// Vercel KV/Upstash — which felt like overkill for a portfolio's traffic
// volume), but it stops the most casual drive-by abuse of the API key.
// Compared against the request's own host rather than a fixed production
// URL, so this works unchanged in local dev, Vercel previews, and prod —
// all of which the front end can only ever call itself from.
const isSameOrigin = (request: Request) => {
  const origin = request.headers.get("origin") ?? request.headers.get("referer");
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
};

export const POST: APIRoute = async ({ request }) => {
  if (!GROQ_API_KEY) {
    return new Response(
      JSON.stringify({ error: "El chat no está configurado (falta GROQ_API_KEY)." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  if (!isSameOrigin(request)) {
    return new Response(JSON.stringify({ error: "Origen no permitido." }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "JSON inválido." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const messages = (body as { messages?: unknown })?.messages;

  if (!Array.isArray(messages) || messages.length === 0 || !messages.every(isValidMessage)) {
    return new Response(
      JSON.stringify({ error: "Formato de mensajes inválido." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const lastMessage = messages[messages.length - 1] as ChatMessage;
  if (lastMessage.role !== "user") {
    return new Response(
      JSON.stringify({ error: "El último mensaje debe ser del usuario." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // Only the most recent turns are sent to the model — plenty for a
  // profile-Q&A chat, and keeps token usage (and cost) bounded regardless
  // of how long a conversation runs.
  const trimmedMessages = messages.slice(-MAX_MESSAGES) as ChatMessage[];

  try {
    const groqResponse = await fetch(GROQ_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...trimmedMessages,
        ],
        temperature: 0.4,
        max_tokens: 500,
      }),
    });

    if (!groqResponse.ok) {
      const status = groqResponse.status === 429 ? 429 : 502;
      return new Response(
        JSON.stringify({
          error:
            status === 429
              ? "Demasiadas consultas por ahora, probá de nuevo en un momento."
              : "No se pudo contactar al asistente. Intentá de nuevo más tarde.",
        }),
        { status, headers: { "Content-Type": "application/json" } },
      );
    }

    const data = await groqResponse.json();
    const reply: string | undefined = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return new Response(
        JSON.stringify({ error: "El asistente no devolvió una respuesta." }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "No se pudo contactar al asistente. Intentá de nuevo más tarde." }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  }
};
