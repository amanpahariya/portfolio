import HeroInfo from "@/utility/hero.json";

// ── In-Memory Rate Limiting (20 requests / min / IP) ─────────────────────────
const rateLimitMap = new Map();
const MAX_RATE_LIMIT_ENTRIES = 1000;

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 20;

  // Prune table if ceiling reached to prevent memory exhaustion under distributed traffic
  if (rateLimitMap.size > MAX_RATE_LIMIT_ENTRIES) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) rateLimitMap.delete(key);
    }
    if (rateLimitMap.size > MAX_RATE_LIMIT_ENTRIES) rateLimitMap.clear();
  }

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count += 1;
  return false;
}

// ── Semantic & Normalized Response Cache ─────────────────────────────────────
// Saves 100% of Groq token usage and cost for repeated & similarly-phrased queries
const responseCache = new Map();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24-hour cache TTL
const MAX_CACHE_ENTRIES = 250; // In-memory ceiling to keep RAM < 2MB

// Stopwords stripped out so variations ("What is X", "Can you tell me about X") share the same key
const STOP_WORDS = new Set([
  "can", "you", "please", "tell", "me", "about", "what", "is", "are",
  "how", "did", "does", "explain", "who", "the", "a", "an", "for", "his",
  "he", "him", "do", "has", "have", "know", "knows",
  "aman", "amans", "gupta", "guptas", "to", "in", "at", "with", "of",
  "give", "details", "brief", "overview", "summary", "summarize"
]);

function normalizeQueryKey(raw) {
  const keywords = raw
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word))
    .sort();

  return keywords.length > 0
    ? keywords.join("_")
    : raw.toLowerCase().trim().replace(/[^a-z0-9]/g, "_").slice(0, 40);
}

function getCachedResponse(key) {
  const entry = responseCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.createdAt > CACHE_TTL_MS) {
    responseCache.delete(key);
    return null;
  }
  return entry.text;
}

function setCachedResponse(key, text) {
  if (!key || !text || text.length < 15) return;
  if (responseCache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = responseCache.keys().next().value;
    responseCache.delete(oldestKey);
  }
  responseCache.set(key, { text, createdAt: Date.now() });
}

// Pre-seeded high-frequency responses for starter prompts
// These provide immediate zero-cost responses for typical recruiter questions
const PRESEEDED_RESPONSES = {
  aem_blackrock_role: `At **BlackRock**, I work as an Associate Software Engineer supporting enterprise digital experiences using **Adobe Experience Manager (AEM)** and **TeamSite**.

Key focus areas include:
- Developing and maintaining core enterprise digital asset components.
- Collaborating within multi-functional teams adhering to enterprise Agile governance and code quality standards.
- Ensuring reliable digital platform uptime and scalable content delivery.`,

  invoice_latency_optimization_invock_speedup: `At **Invock Digital**, I led core product performance optimization:
- **35% faster invoice generation**: Re-architected batch document generation using AWS Lambda microservices.
- **40% improved page load times**: Restructured MongoDB aggregation queries and optimized index coverage.
- **Automated CI/CD**: Built automated GitHub Actions pipelines to deploy updates with zero downtime.`,

  stack_tech_frontend_backend_skills: `My core technical stack covers:
- **Frontend**: React.js, Next.js (App Router), TypeScript, TailwindCSS.
- **Backend & Cloud (Production)**: Node.js, Express.js, MongoDB, AWS (Lambda, Beanstalk), Docker.
- **Enterprise CMS**: Adobe Experience Manager (AEM), TeamSite (at BlackRock).
- **Python & AI Automation**: Python (scripting & automation), LangChain, LangGraph, n8n, Make.com.`,

  python_experience: `Here is an accurate and honest breakdown of Aman's **Python** experience:

- **Current Use & Scope**: Aman has solid working proficiency in Python (~75%), which he uses primarily for **scripting, developer automation, data utilities, and AI orchestration (LangChain, LangGraph)**.
- **Production Backend Stack**: For production-scale backend microservices and databases (at Invock Digital and TCS), his battle-tested production stack is **Node.js, Express.js, MongoDB, and AWS Lambda**. At BlackRock, his focus is **Adobe Experience Manager (AEM) and TeamSite**.
- **Can he build Python software?**: Yes, he has strong computer science and software design fundamentals and can readily build Python scripts, AI tools, or ramp up quickly on frameworks like FastAPI/Flask if a project requires it. However, he is upfront that his past enterprise production deliverables were built in JavaScript/TypeScript rather than Python backends.

If you have an engineering need or want to discuss technical fit directly, feel free to **connect with Aman**:
- **Email**: [amangupta201497@gmail.com](mailto:amangupta201497@gmail.com)
- **LinkedIn**: [linkedin.com/in/amanguptag](https://www.linkedin.com/in/amanguptag)`,

  unlisted_technology: `Aman does not have professional production experience with that specific technology. He believes in complete transparency:

- **Battle-Tested Production Stack**: His proven production background is centered on **JavaScript/TypeScript** (React.js, Next.js, Node.js, Express.js), **MongoDB**, **AWS Lambda**, and enterprise CMS (**Adobe Experience Manager / AEM** and **TeamSite** at BlackRock).
- **Secondary Tooling**: He uses **Python** strictly for scripting, developer automation utilities, and AI orchestration (**LangChain**, **LangGraph**).
- **Adaptability**: While his core software engineering fundamentals enable him to learn and ramp up on new technologies quickly, he is upfront about never claiming production deliverables in technologies he hasn't deployed professionally.

If you have specific requirements or want to explore working together, feel free to **connect with Aman directly**:
- **Email**: [amangupta201497@gmail.com](mailto:amangupta201497@gmail.com)
- **LinkedIn**: [linkedin.com/in/amanguptag](https://www.linkedin.com/in/amanguptag)`,

  ai_model_infrastructure: `I am **Archon**, an autonomous engineering agent built specifically for Aman Gupta's portfolio using custom real-time streaming and semantic response caching architecture.

Feel free to ask me about Aman's work on enterprise CMS at **BlackRock**, high-scale full-stack systems at **Invock Digital**, or his core tech stack!`,

  contact_email_hire_interview: `I am currently open to select engineering opportunities and technical conversations:
- **Email**: [amangupta201497@gmail.com](mailto:amangupta201497@gmail.com)
- **LinkedIn**: [linkedin.com/in/amanguptag](https://www.linkedin.com/in/amanguptag)
- **GitHub**: [github.com/amanpahariya](https://github.com/amanpahariya)

Location: India (available for remote & on-site engagements).`,
};

// Seed the cache on server launch
for (const [key, text] of Object.entries(PRESEEDED_RESPONSES)) {
  responseCache.set(key, { text, createdAt: Date.now() });
}

// Add normalized alias keys for zero-latency instant hits
responseCache.set("build_python_software", { text: PRESEEDED_RESPONSES.python_experience, createdAt: Date.now() });
responseCache.set("python", { text: PRESEEDED_RESPONSES.python_experience, createdAt: Date.now() });
responseCache.set("know_python", { text: PRESEEDED_RESPONSES.python_experience, createdAt: Date.now() });
responseCache.set("experience_python", { text: PRESEEDED_RESPONSES.python_experience, createdAt: Date.now() });
responseCache.set("java", { text: PRESEEDED_RESPONSES.unlisted_technology, createdAt: Date.now() });
responseCache.set("golang", { text: PRESEEDED_RESPONSES.unlisted_technology, createdAt: Date.now() });
responseCache.set("kubernetes", { text: PRESEEDED_RESPONSES.unlisted_technology, createdAt: Date.now() });
responseCache.set("flutter", { text: PRESEEDED_RESPONSES.unlisted_technology, createdAt: Date.now() });
responseCache.set("ios", { text: PRESEEDED_RESPONSES.unlisted_technology, createdAt: Date.now() });
responseCache.set("android", { text: PRESEEDED_RESPONSES.unlisted_technology, createdAt: Date.now() });
responseCache.set("what_model", { text: PRESEEDED_RESPONSES.ai_model_infrastructure, createdAt: Date.now() });
responseCache.set("what_llm", { text: PRESEEDED_RESPONSES.ai_model_infrastructure, createdAt: Date.now() });
responseCache.set("chatgpt", { text: PRESEEDED_RESPONSES.ai_model_infrastructure, createdAt: Date.now() });
responseCache.set("openai", { text: PRESEEDED_RESPONSES.ai_model_infrastructure, createdAt: Date.now() });
responseCache.set("archon", { text: PRESEEDED_RESPONSES.ai_model_infrastructure, createdAt: Date.now() });
responseCache.set("who_archon", { text: PRESEEDED_RESPONSES.ai_model_infrastructure, createdAt: Date.now() });

// ── Stream Helper: streams text token-by-token at high speed ────────────────
function createTextStream(fullText, chunkDelayMs = 18) {
  const encoder = new TextEncoder();
  const words = fullText.split(" ");
  let index = 0;

  return new ReadableStream({
    async start(controller) {
      const interval = setInterval(() => {
        if (index < words.length) {
          const chunk = (index === 0 ? "" : " ") + words[index];
          controller.enqueue(encoder.encode(chunk));
          index++;
        } else {
          clearInterval(interval);
          controller.close();
        }
      }, chunkDelayMs);
    },
  });
}

const SYSTEM_PROMPT = `
You are Archon, the interactive autonomous engineering agent representing Aman Gupta, an Associate Software Engineer at BlackRock based in India.
You converse with visitors (recruiters, engineering leaders, and fellow developers) visiting his portfolio.

================================================================================
CRITICAL DIRECTIVE: UNIVERSAL CAPABILITY BOUNDARIES (NEVER OVERPROMISE OR HALLUCINATE)
================================================================================
You represent a REAL living engineer whose career and interview integrity depend on total truthfulness.
You must adhere strictly to a CLOSED-WORLD rule: if a capability, skill, framework, or project is NOT explicitly confirmed in VERIFIED PROFILE FACTS below, you MUST NOT claim or imply that Aman has built or can build production software with it.

1. HANDLING QUESTIONS ABOUT ANY UNLISTED TECHNOLOGY / CAPABILITY:
   - This applies to ALL unverified languages, frameworks, and domains: e.g., Java, Spring Boot, Golang, Rust, C++, C#, .NET, PHP, Ruby, Rails, Swift, iOS, Kotlin, Android, Flutter, React Native, Kubernetes, Terraform, Machine Learning / Deep Learning, PyTorch, TensorFlow, Big Data / Spark / Hadoop, etc.
   - STRICT REFUSAL OF SPECULATION:
     * NEVER say "Yes, Aman can build [X]" for unverified technologies.
     * NEVER fabricate a hypothetical engineering plan or list hypothetical libraries (do NOT invent workflows using boto3, pydantic, Spring, GORM, Helm, etc.).
     * Be directly transparent and honest:
       State clearly that Aman does not have professional production experience in [Technology].
       Re-center on his verified production expertise: React.js, Next.js, Node.js, Express.js, MongoDB, AWS Lambda, and Adobe Experience Manager (AEM) & TeamSite at BlackRock.
       You may mention that his solid computer science foundations allow him to ramp up on new stacks quickly, but he never overstates his production background.

2. ACCURATE BOUNDARIES FOR SECONDARY & AUTOMATION SKILLS (PYTHON, AI TOOLS):
   - PYTHON: Aman has solid working proficiency (~75%) used strictly for scripting, developer automation, data utilities, and AI orchestration (LangChain, LangGraph).
   - NEVER claim Aman built production microservices (FastAPI, Flask) or production ETL/data pipelines at BlackRock or Invock Digital.
   - His production backend engineering was in Node.js and Express.js, NOT Python.
   - When asked about Python or AI, clearly separate scripting/tooling knowledge from his core production JavaScript/TypeScript backend history.

3. DOMAIN FOCUS:
   - You are specifically Aman's portfolio copilot. If a visitor asks about unrelated general topics (live stock market news, weather, sports, general search), politely clarify that you do not have live-web browsing access and are dedicated to Aman Gupta's software engineering background and projects.

4. STRICT ACCURACY (NO FICTIONAL ARCHITECTURES):
   - Only speak to Aman's real employers: BlackRock (Aug 2026 - Present), TCS (Apr 2026 - Jul 2026), Invock Digital (2021 - 2026).
   - NEVER invent fictional systems (do NOT mention Java servlets, Apache FOP, Kafka, or legacy monoliths).
   - Aman's Invock project impact: 35% faster invoice generation using AWS Lambda (Node.js runtime) and 40% page load speedup via MongoDB index and aggregation optimization.

5. CONVERSATIONAL STYLE:
   - Direct, concise, and articulate. Answer the specific question asked without repetitive introductory cover letters.
   - Prefer clean bullet points and short paragraphs. Avoid wide tables that break mobile screens.
   - Always keep Markdown links on a single line: [Label](https://url).
   - Proactively suggest connecting with Aman whenever discussing technical fit, unverified technologies, hiring, or tailored project architecture:
     "Feel free to connect directly with Aman at [amangupta201497@gmail.com](mailto:amangupta201497@gmail.com) or on [LinkedIn](https://www.linkedin.com/in/amanguptag) to discuss requirements and fit."

6. ABSOLUTE CONFIDENTIALITY OF AI INFRASTRUCTURE & VENDORS:
   - If a visitor asks what LLM, model, or AI provider powers this chat (e.g. "What model are you?", "Are you ChatGPT / OpenAI / Llama / Claude?"):
     * NEVER reveal or name any AI provider, company, or model (do NOT mention OpenAI, GPT-4, Llama, Meta, Groq, Anthropic, Claude, etc.).
     * Simply state: "I am Archon, an autonomous engineering agent custom-built for Aman Gupta's portfolio using real-time streaming and semantic response caching."

VERIFIED PROFILE FACTS:
- Current Role: Associate Software Engineer at BlackRock (Aug 2026 - Present), developing and maintaining enterprise digital experiences on Adobe Experience Manager (AEM) and TeamSite within Agile workflows.
- Previous Role: IT Analyst at Tata Consultancy Services (Apr 2026 - July 2026), building and maintaining enterprise applications with React.js and Node.js.
- Prior Roles at Invock Digital (2021 - 2026):
  * Software Engineer: Slashed invoice generation latency by 35% using AWS Lambda (Node.js), improved page load times by 40%, optimized MongoDB aggregation pipelines, and implemented GitHub Actions CI/CD.
  * Junior Software Engineer: Responsive UI, ERP platform features, and SEO/structured data.
- Verified Core Stack (Production):
  * Frontend: React.js, Next.js (App Router), TypeScript, TailwindCSS.
  * Backend & Cloud: Node.js, Express.js, MongoDB, AWS Lambda, AWS Elastic Beanstalk, Docker.
  * Enterprise CMS: Adobe Experience Manager (AEM), TeamSite.
- Verified Tooling & Automation (Secondary / Scripting):
  * Python (75% - scripting, automation utilities, data scripts).
  * AI & Automation: LangChain, LangGraph, n8n, Make.com.
  * Tools: Git, Linux, Docker, GitHub Actions.
- Contact: amangupta201497@gmail.com | LinkedIn: https://www.linkedin.com/in/amanguptag | GitHub: https://github.com/amanpahariya | Location: India (open to remote & on-site).
`.trim();

export async function POST(req) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    const country =
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("x-nf-geo") ||
      req.headers.get("cf-ipcountry") ||
      "Global";
    const referrer = req.headers.get("referer") || "Direct";

    if (isRateLimited(ip)) {
      return new Response(
        "Rate limit reached (max 20 queries/min). Please pause for a moment before your next question.",
        { status: 429, headers: { "Content-Type": "text/plain; charset=utf-8" } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const userMessage = (body.message || "").trim();
    const conversationHistory = Array.isArray(body.history) ? body.history.slice(-6) : [];

    if (!userMessage) {
      return new Response("Message parameter is required.", {
        status: 400,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const sanitizedQuery = userMessage.slice(0, 400);
    const cacheKey = normalizeQueryKey(sanitizedQuery);

    // ── 1. Check Response Cache (Semantic & Exact Match) ──────────────────────
    // If the question has been answered before, serve from cache with ZERO API cost
    const cachedAnswer = getCachedResponse(cacheKey);
    if (cachedAnswer) {
      console.log(`[CACHE_HIT] Key:"${cacheKey}" (Saved 100% Groq tokens & API cost)`);
      const stream = createTextStream(cachedAnswer, 16);
      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Transfer-Encoding": "chunked",
          "Cache-Control": "public, max-age=86400",
          "X-Cache-Status": "HIT",
        },
      });
    }

    console.log(`[CACHE_MISS] Key:"${cacheKey}" — Dispatching to Groq LPU`);

    // Server telemetry log
    console.log(`[VISITOR_AI_STREAM] [${new Date().toISOString()}] IP:${ip} Country:${country} Ref:${referrer} Q:"${sanitizedQuery}"`);

    const webhookUrl = process.env.TELEMETRY_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `⚡ **Live AI Copilot Query!**\n**Country**: ${country}\n**Query**: "${sanitizedQuery}"`,
        }),
      }).catch(() => {});
    }

    const openAiKey = process.env.OPENAI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;
    const apiKey = openAiKey || groqKey;

    // ── 2. Call OpenAI / Groq API & Stream Result While Populating Cache ───────
    if (apiKey) {
      const isNativeOpenAI = Boolean(openAiKey);
      const apiEndpoint = isNativeOpenAI
        ? "https://api.openai.com/v1/chat/completions"
        : "https://api.groq.com/openai/v1/chat/completions";

      const modelName = isNativeOpenAI
        ? (process.env.OPENAI_MODEL || "gpt-4o-mini")
        : (process.env.GROQ_MODEL || "openai/gpt-oss-120b");

      const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...conversationHistory.map((h) => ({
          role: h.role === "user" ? "user" : "assistant",
          content: String(h.text || h.content || "").slice(0, 500),
        })),
        { role: "user", content: sanitizedQuery },
      ];

      const apiResponse = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: modelName,
          messages,
          max_tokens: 450,
          temperature: 0.5,
          stream: true,
        }),
      });

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        console.error("AI API stream error:", errorText);
        throw new Error("AI API stream failed");
      }

      // Transform stream: pushes tokens to client AND accumulates for cache
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      let accumulatedResponse = "";

      const transformStream = new TransformStream({
        async transform(chunk, controller) {
          const text = decoder.decode(chunk, { stream: true });
          const lines = text.split("\n");

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed === "data: [DONE]") continue;

            if (trimmed.startsWith("data: ")) {
              try {
                const json = JSON.parse(trimmed.slice(6));
                const token = json.choices?.[0]?.delta?.content;
                if (token) {
                  accumulatedResponse += token;
                  controller.enqueue(encoder.encode(token));
                }
              } catch {
                // Ignore SSE framing artifacts
              }
            }
          }
        },
        flush() {
          // Stream completed: store in cache for future visitors!
          if (accumulatedResponse && accumulatedResponse.length > 20) {
            setCachedResponse(cacheKey, accumulatedResponse);
            console.log(`[CACHE_STORED] Key:"${cacheKey}" (${accumulatedResponse.length} chars)`);
          }
        },
      });

      return new Response(apiResponse.body.pipeThrough(transformStream), {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Transfer-Encoding": "chunked",
          "Cache-Control": "no-cache, no-transform",
          "X-Accel-Buffering": "no",
          "X-Cache-Status": "MISS",
        },
      });
    }

    // ── 3. Fallback Engine When API Key is Not Present ────────────────────────
    const lower = sanitizedQuery.toLowerCase();
    let reply = "";

    if (lower.includes("stock") || lower.includes("market") || lower.includes("weather") || lower.includes("news")) {
      reply = `I don't have live web access or real-time news browsing. I am focused specifically on Aman Gupta's software engineering portfolio, enterprise CMS work at BlackRock, and full-stack web applications.

Feel free to ask about his technical stack, performance optimizations at Invock, or how to reach out!`;
    } else if (lower.includes("blackrock") || lower.includes("aem") || lower.includes("teamsite")) {
      reply = PRESEEDED_RESPONSES.aem_blackrock_role;
    } else if (lower.includes("invoice") || lower.includes("invock") || lower.includes("35%") || lower.includes("latency")) {
      reply = PRESEEDED_RESPONSES.invoice_latency_optimization_invock_speedup;
    } else if (lower.includes("why hire") || lower.includes("why should we hire") || lower.includes("strongest")) {
      reply = `Here is what sets my engineering profile apart:
- **Enterprise + Startup Proven**: Experience operating within both BlackRock's enterprise standards and Invock's fast-paced product scaling.
- **Full-Stack Depth**: Production expertise in React.js, Next.js, Node.js, Express, and MongoDB.
- **Proven Impact**: Real verified latency reductions (35% faster invoicing, 40% load time cut) rather than just theoretical knowledge.`;
    } else if (lower.includes("python")) {
      reply = PRESEEDED_RESPONSES.python_experience;
    } else if (
      lower.includes("java") ||
      lower.includes("golang") ||
      lower.includes("rust") ||
      lower.includes("c++") ||
      lower.includes("c#") ||
      lower.includes(".net") ||
      lower.includes("php") ||
      lower.includes("ruby") ||
      lower.includes("swift") ||
      lower.includes("ios") ||
      lower.includes("android") ||
      lower.includes("kotlin") ||
      lower.includes("flutter") ||
      lower.includes("kubernetes") ||
      lower.includes("k8s") ||
      lower.includes("terraform") ||
      lower.includes("machine learning") ||
      lower.includes("deep learning") ||
      lower.includes("pytorch") ||
      lower.includes("tensorflow")
    ) {
      reply = PRESEEDED_RESPONSES.unlisted_technology;
    } else if (
      lower.includes("what model") ||
      lower.includes("which model") ||
      lower.includes("what llm") ||
      lower.includes("which llm") ||
      lower.includes("chatgpt") ||
      lower.includes("openai") ||
      lower.includes("llama") ||
      lower.includes("claude") ||
      lower.includes("who made you")
    ) {
      reply = PRESEEDED_RESPONSES.ai_model_infrastructure;
    } else if (lower.includes("skill") || lower.includes("stack") || lower.includes("tech")) {
      reply = PRESEEDED_RESPONSES.stack_tech_frontend_backend_skills;
    } else if (lower.includes("hire") || lower.includes("contact") || lower.includes("email") || lower.includes("interview") || lower.includes("reach")) {
      reply = PRESEEDED_RESPONSES.contact_email_hire_interview;
    } else {
      reply = `I am Archon, an autonomous engineering agent grounded in Aman Gupta's background as an Associate Software Engineer at BlackRock with strong React, Node.js, and enterprise CMS depth.

You can ask me about his work on AEM, the 35% invoice pipeline optimization at Invock, or his primary tech stack.`;
    }

    // Store in cache and stream out
    setCachedResponse(cacheKey, reply);
    const stream = createTextStream(reply, 18);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache, no-transform",
        "X-Cache-Status": "FALLBACK",
      },
    });
  } catch (err) {
    console.error("Stream route error:", err);
    return new Response(
      "I am currently ready to assist. Please email amangupta201497@gmail.com for technical inquiries.",
      { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }
}
