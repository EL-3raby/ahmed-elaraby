# Project Constitution: Ahmed Elaraby — Full-Stack Creative Engineer Portfolio

## 1. Developer Identity & Conversion Goal
- **Name:** Ahmed Elaraby (Ahmed Mohamed Fathi Elaraby)
- **Role:** Full-Stack Software Engineer & Creative Developer (Web, Cloud SaaS, Desktop ERP, Interactive 3D)
- **Primary Goal:** High-ticket freelance client conversion (Upwork, Nafezly, Khamsat, Direct International Clients).
- **Language:** 100% English.

## 2. Anti-AI "Editorial Clean" Design System
- **Strict Ban:** NEVER use neon purple/blue/cyan gradients, dark-blue (`#0f172a`) backgrounds, generic symmetrical 3-column glassmorphic cards, or default `Inter` typography.
- **ZERO NATIVE EMOJIS:** Never use Unicode emojis (⚡, 🚀, ✅, etc.) anywhere in the UI. Always use crisp geometric SVG vector icons (`strokeWidth={1.5}`) styled with `--fg` and `--accent` (`#FF4D00`) and subtle micro-animations.
- **Dynamic Theme Tokens (CSS Variables on `:root` smoothly interpolated via GSAP ScrollTrigger):**
  - `data-theme="paper"` (Default Light Editorial):
    - `--bg: #F4F3EF`
    - `--fg: #111111`
    - `--muted: #666560`
    - `--card: rgba(17, 17, 17, 0.03)`
    - `--border: rgba(17, 17, 17, 0.12)`
    - `--accent: #FF4D00`
  - `data-theme="obsidian"` (Dark Architectural Showcase):
    - `--bg: #0B0B0C`
    - `--fg: #F4F3EF`
    - `--muted: #8E8D8A`
    - `--card: rgba(244, 243, 239, 0.04)`
    - `--border: rgba(244, 243, 239, 0.12)`
    - `--accent: #FF4D00`
  - `data-theme="stone"` (Warm Mid-Tone Value Section):
    - `--bg: #E6E4DD`
    - `--fg: #111111`
    - `--muted: #575652`
    - `--card: rgba(17, 17, 17, 0.04)`
    - `--border: rgba(17, 17, 17, 0.15)`
    - `--accent: #111111`
- **Typography (`next/font/google`):**
  - `--font-display`: `Syne` (700, 800) for monumental headings, tight tracking (`-0.03em`).
  - `--font-serif`: `Instrument Serif` (400 italic) for editorial emphasis words inside headings.
  - `--font-sans`: `Plus Jakarta Sans` (400, 500, 600) for clean body copy.
  - `--font-mono`: `JetBrains Mono` (400, 500) for technical indices (`[01 // ARCHITECTURE]`), metrics, and tags.
- **Global Texture:** Fixed subtle SVG noise grain overlay (`opacity: 0.035`, `pointer-events: none`, `z-index: 9990`).

## 3. Animation Architecture & Rules
- **Smooth Scroll:** Use `lenis` synced directly with `gsap.ticker`.
- **Library Roles (Never animate the same DOM node with both GSAP and Framer Motion):**
  - `gsap` + `ScrollTrigger` + `@gsap/react`: Handles background color/theme morphing across `[data-theme]` sections, clip-path section reveals, horizontal scroll pinning, and split-text reveals.
  - `framer-motion`: Handles category tab switching (`layoutId`), interactive "System Architecture" blueprint modals/drawers, and magnetic hover states.
  - `21st.dev` components: Must be restyled to strictly consume `--bg`, `--fg`, `--muted`, `--border`, and `--accent`.

## 4. Curated Portfolio Projects Dataset (Real Projects)
Use this structured dataset in `src/data/projects.ts`:

### Category A: `web-ecommerce` (Web Apps & High-Conversion E-Commerce)
1. **CENTR — EdTech & Voucher Redemption Platform**
   - **Tagline:** Full-stack educational platform with interactive scratch-card voucher redemption, live class schedules, and center directories.
   - **Impact Metric:** "Zero-latency voucher verification & seamless student onboarding"
   - **Stack:** `["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "REST API"]`
   - **Architecture Blueprint:**
     - **Frontend:** Next.js App Router + Interactive Canvas Scratch-Card UI + Location Filtering Engine.
     - **Backend / Logic:** Secure Voucher Validation Pipeline + Anti-Brute-Force Rate Limiting + Class Schedule Aggregator.
     - **Data Layer:** Normalized Relational Schema for Centers, Instructors, Schedules, and Single-Use Voucher Hashes.
2. **XPower Nutrition — 3D Sports Supplement Storefront**
   - **Tagline:** High-conversion e-commerce experience featuring custom photorealistic 3D product renders and ultra-fast checkout flows.
   - **Impact Metric:** "Engineered for maximum conversion rate & visual authority"
   - **Stack:** `["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "3D Product Rendering"]`
   - **Architecture Blueprint:**
     - **Frontend:** SSR Product Catalog + GSAP Scroll Storytelling + Dynamic Supplement Facts Drawer.
     - **State & Cart:** Optimistic Cart State Engine + Persistent Local/Session Sync + Bundle Discount Calculator.
     - **Performance:** Next/Image WebP/AVIF Pipeline + 99/100 Lighthouse Performance Score.
3. **NYX Clothing — Streetwear & Fashion E-Commerce**
   - **Tagline:** Editorial fashion storefront with fluid page transitions, lookbook galleries, and instant size/variant filtering.
   - **Impact Metric:** "Sub-second page transitions & editorial brand elevation"
   - **Stack:** `["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis"]`
   - **Architecture Blueprint:**
     - **UI Layer:** Editorial Lookbook Grid + Shared Layout Transitions (`layoutId`) + Quick-Add Drawer.
     - **Catalog Engine:** Multi-attribute Variant Matrix (Size/Color/Stock) + URL-synced Search Params.
4. **Custom Rig & Tech Store + Artisan Furniture Store**
   - **Tagline:** Specialized high-ticket retail platforms featuring custom PC compatibility builders and spatial furniture showcases.
   - **Impact Metric:** "Built to handle complex product configurations effortlessly"
   - **Stack:** `["Next.js", "TypeScript", "Tailwind CSS", "Node.js"]`
   - **Architecture Blueprint:**
     - **Configurator:** Real-time component compatibility validation & dynamic pricing engine.

### Category B: `desktop-cloud` (Hybrid Cloud SaaS & Desktop ERP Systems)
5. **Cloud-Synced POS & SaaS Executive Ecosystem**
   - **Tagline:** Hybrid desktop point-of-sale application synchronized in real-time with a cloud Next.js SaaS executive dashboard.
   - **Impact Metric:** "Offline-first desktop reliability meets real-time cloud analytics"
   - **Stack:** `["Next.js", "Python", "PySide6", "SQLite", "Cloud REST Sync", "Tailwind CSS"]`
   - **Architecture Blueprint:**
     - **Local Desktop Node:** Python + PySide6 GUI + Local SQLite WAL Database for 100% offline cashier speed.
     - **Sync Engine:** Bi-directional Delta Sync Manager with conflict resolution, retry queues, and batch payload compression.
     - **Cloud SaaS Dashboard:** Next.js Admin Portal displaying real-time multi-branch sales, expenses, and inventory alerts.
6. **Mizan (ميزان) — Legal Practice & Law Firm ERP**
   - **Tagline:** Enterprise-grade desktop management system for law firms to track clients, court sessions, case timelines, and legal archives.
   - **Impact Metric:** "Automated legal workflow & instant document retrieval"
   - **Stack:** `["C# WPF", "Python PySide6", "SQLite", "Relational DB Design"]`
   - **Architecture Blueprint:**
     - **Presentation Layer:** Modern MVVM Desktop Interface with high-contrast Arabic/English legal typography.
     - **Core Business Logic:** Automated Court Session Reminder Engine + Case Status State Machine + Role-Based Access.
     - **Storage Layer:** Encrypted Local SQLite Database with automated backup snapshots and fast full-text indexing.

### Category C: `ai-interactive` (AI, Data Intelligence & Logic Systems)
7. **NeuroLogic — Web-Based Prolog Inference & Rule Engine**
   - **Tagline:** Full-stack symbolic AI application bridging a SWI-Prolog HTTP backend with a modern interactive web interface.
   - **Impact Metric:** "Real-time constraint solving & adversarial game trees over REST"
   - **Stack:** `["SWI-Prolog", "REST API", "JavaScript", "HTML5/CSS3", "Logic Programming"]`
   - **Architecture Blueprint:**
     - **Web Client:** Interactive Puzzle & Game Board UI + Real-time State Visualizer.
     - **API Bridge:** JSON-over-HTTP Prolog Server handling stateless predicate queries.
     - **Inference Core:** Minimax Game Tree Solver + Seating Constraint Satisfaction Engine + Library Knowledge Base.
8. **RevPulse — Sales Intelligence & Predictive Analytics Suite**
   - **Tagline:** Data science pipeline and interactive visual analytics turning raw retail data into revenue forecasts.
   - **Impact Metric:** "Actionable KPI anomaly detection & automated reporting"
   - **Stack:** `["Python", "Pandas", "Scikit-Learn", "Data Visualization"]`
   - **Architecture Blueprint:**
     - **Ingestion & Cleaning:** Automated Pandas ETL pipeline for multi-source CSV/SQL sales logs.
     - **ML & Modeling:** Scikit-Learn regression & seasonal trend decomposition for demand forecasting.