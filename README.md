<div align="center">

# Aman Gupta &mdash; Portfolio V3
### *Editorial Craft &bull; 3D Kinetic Core &bull; Archon Autonomous Agent*

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.187-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-C8E63A?style=for-the-badge&logo=open-source-initiative&logoColor=black)](LICENSE)

[**Live Experience &rarr;**](https://amanguptag.netlify.app) &bull; [**Report an Issue**](https://github.com/amanpahariya/portfolio/issues)

</div>

---

## ✦ Overview

**Portfolio V3** is an editorial, high-craft personal engineering dossier built for **Aman Gupta**, Associate Software Engineer at BlackRock. Departing from generic developer templates, it blends tactile typography, a procedural **Three.js kinetic sculpture**, native **Web Audio API haptics**, and **Archon**&mdash;an autonomous, grounded AI digital twin that converses with recruiters and engineering leaders in real time.

---

## 🏛️ Architectural Highlights

### 1. 🔮 Procedural Three.js Kinetic Sculpture
- **Real-Time Physics & Interaction**: Custom wireframe dodecahedron and nested geodesic rings rendered with pure Three.js.
- **Pointer Drag & Gyro Tilt**: Smooth inertia damping on desktop mouse drag with automatic mobile gyroscope (`DeviceOrientationEvent`) tilt.
- **Accessibility & Battery Pacing**: Respects `prefers-reduced-motion` and pauses requestAnimationFrame when the viewport is hidden or scrolled out of view.

### 2. ⚡ Archon &mdash; Autonomous AI Engineering Agent
- **Server-Sent Events (SSE) Streaming**: Delivers token-by-token output with ultra-low time-to-first-byte (TTFB).
- **Closed-World Capability Grounding**: Strictly calibrated against verified career deliverables (Adobe Experience Manager at BlackRock, 35% latency speedups at Invock). The agent strictly refuses to fabricate unverified tech stacks (e.g. Java, Go, Kubernetes, production Python microservices) and directs visitors to connect directly.
- **24-Hour In-Memory Semantic Cache**: Normalizes variations (*"What stack do you use?"* vs *"Tell me your tech stack"*) using stopword filtering to serve repeated recruiter queries in **under 20ms with 0 API cost**.
- **Memory-Safe Rate Limiting**: In-memory IP-based rate limiting with automatic pruning table ceilings to eliminate memory exhaustion under bot scrapes.
- **Vendor & Model Anonymity**: Strictly neutral persona that never exposes internal model identifiers or third-party infrastructure.

```
Visitor Query
      │
      ▼
Normalize & Filter Stopwords
      │
      ├────► [Cache HIT] ──► Immediate SSE Token Stream (<20ms / $0 API cost)
      │
      └────► [Cache MISS] ──► Closed-World Guardrail Evaluation
                                      │
                                      ▼
                               Server-Side Streaming API
                                      │
                         Populate Semantic Cache Map ──► Client SSE Stream
```

### 3. 🔊 Analog Web Audio API Haptics
- Synthesizes low-latency mechanical sound feedback (`tick`, `snap`, `success`, `hover`) natively in the browser via `AudioContext` and dynamic gain ramps.
- **Zero Audio Assets**: 0 bytes of external MP3/WAV assets downloaded.
- Persisted user mute toggle in navigation header.

### 4. 📐 Blueprint Modal & Latency Simulator
- Interactive project inspector featuring an interactive before/after latency optimizer demonstration.
- Visualizes the 35% invoice generation speedup achieved by migrating batch processing to AWS Lambda and optimizing MongoDB compound indexing.

### 5. 🎯 Machine-Readable Specification & SEO
- Dynamic `sitemap.xml` and `robots.txt` generated directly via Next.js App Router metadata routes.
- Schema.org **Person** and **Occupation** JSON-LD metadata for search engine indexing.
- Standalone `/llms.txt` route providing structured markdown documentation for LLMs and crawler agents.

---

## 🎨 Design System & Palette

| Variable | Hex Code | Visual Application |
| :--- | :--- | :--- |
| **Warm Ivory** | `#F7F4EE` | Primary page canvas & breathable background |
| **Warm Paper** | `#F0ECE3` | Secondary editorial containers & dossier panels |
| **Deep Charcoal** | `#1E1C1A` | Typographic contrast & terminal shells |
| **Muted Sage** | `#5B7B6B` | Technical badges, metadata labels & indices |
| **Vivid Chartreuse** | `#C8E63A` | High-visibility interactive accents, cursor focus & buttons |

---

## 🛠️ Tech Stack & Dependencies

| Area | Technologies |
| :--- | :--- |
| **Framework** | Next.js 14.2 (App Router, SSG & Dynamic Route Handlers) |
| **Runtime & Language** | React 18, JavaScript (ES2024), Node.js |
| **3D Engine** | Three.js (`three@0.187.0`) |
| **Styling & System** | Tailwind CSS 3.4, Sass Structural Utilities, CSS Variables |
| **Motion** | Framer Motion 11 |
| **Icons** | Heroicons v2 (`@heroicons/react`) |
| **Typography** | Google Fonts `Outfit` via `next/font` |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.18+ or 20.x
- **npm**, **pnpm**, or **yarn**

### 1. Clone Repository

```bash
git clone ...
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy the example configuration:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# AI Agent API Key (OpenAI / Groq)
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4o-mini

# Optional: Real-time Telemetry Webhook (Discord / Slack)
TELEMETRY_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

> **Note**: Even if no API key is supplied, Archon automatically operates in verified zero-cost fallback mode, answering core questions regarding BlackRock, Invock, and tech stack instantly.

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the portfolio.

### 5. Build for Production

```bash
npm run build
npm run start
```

---

## 📁 Repository Structure

```
portfolio/
├── public/                     # Images, portraits & static assets
│   └── images/
│       ├── hero.jpeg           # Main portrait
│       └── hero3.jpeg          # Biographical dossier portrait
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/           # Archon streaming, cache & rate limiter
│   │   │   └── telemetry/      # Anonymous visitor telemetry
│   │   ├── globals.css         # Palette variables, grain & technical borders
│   │   ├── layout.js           # Root layout & Schema.org JSON-LD
│   │   ├── llms.txt/           # Machine-readable profile for AI crawlers
│   │   ├── not-found.js        # Editorial 404 page
│   │   ├── page.js             # V3 single-page dossier assembly
│   │   ├── robots.js           # Dynamic robots.txt
│   │   └── sitemap.js          # Dynamic sitemap.xml
│   ├── components/             # Active V3 editorial components
│   │   ├── about.jsx           # Biographical dossier & values
│   │   ├── ai-copilot.jsx      # Archon autonomous drawer & SSE client
│   │   ├── contact.jsx         # Contact terminal & direct routing
│   │   ├── experience.jsx      # Interactive career timeline (BlackRock, TCS, Invock)
│   │   ├── footer.jsx          # Colophon, reactions & AI transparency note
│   │   ├── header.jsx          # Nav, IST clock & audio mute toggle
│   │   ├── hero-info-context.jsx # Reactive profile data provider
│   │   ├── hero-sculpture.jsx  # Three.js kinetic 3D core
│   │   ├── hero.jsx            # Hero editorial dossier & CTAs
│   │   ├── project.jsx         # Project catalogue & latency optimizer
│   │   └── skills.jsx          # Interactive capability matrix
│   └── utility/
│       ├── hero.json           # Single source of truth for portfolio data
│       ├── site-config.js      # Canonical URL config
│       └── sound.js            # Web Audio API tactile feedback synthesizer
├── .env.example                # Safe environment variable template
├── LICENSE                     # MIT License
└── package.json
```

---

## 🔒 Security & Privacy Practices

- **Zero Secret Leakage**: No `.env` files or API secrets have ever been committed. All environment variables are resolved strictly server-side.
- **Privacy-First Telemetry**: Telemetry captures only anonymous route events and standard edge geographic headers (`Country`). No cookies, fingerprinting, or tracking pixels are utilized.
- **DoS & Scraping Safeguards**: Dual-layer IP rate limiting on chat and telemetry endpoints protects backend resources.

---

## 📄 License

This project is open-source and distributed under the [MIT License](LICENSE).  
Copyright &copy; 2026 **Aman Gupta**.
