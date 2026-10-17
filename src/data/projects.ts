export type ProjectCategory = 'web-ecommerce' | 'desktop-cloud' | 'ai-interactive';

export interface ArchitectureTier {
  label: string;
  details: string;
}

export interface ArchitectureBlueprint {
  tier1: ArchitectureTier; // Presentation / Frontend / Client
  tier2: ArchitectureTier; // Backend / Sync / Business Logic
  tier3: ArchitectureTier; // Storage / Database / Performance
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  tagline: string;
  impactMetric: string;
  stack: string[];
  architectureBlueprint: ArchitectureBlueprint;
  featured?: boolean;
  year?: string;
  role?: string;
  image?: string;
  liveUrl?: string;
}

export const CATEGORIES: { id: ProjectCategory; label: string; index: string }[] = [
  { id: 'web-ecommerce', label: 'Web Apps & E-Commerce', index: '01' },
  { id: 'desktop-cloud', label: 'Desktop ERP & Hybrid Cloud', index: '02' },
  { id: 'ai-interactive', label: 'AI & Interactive Systems', index: '03' },
];

export const PROJECTS: Project[] = [
  // Category A: web-ecommerce
  {
    id: 'centr-edtech',
    title: 'CENTR — EdTech & Voucher Redemption Platform',
    category: 'web-ecommerce',
    categoryLabel: 'EdTech & Digital Commerce',
    tagline: 'Full-stack educational platform with interactive scratch-card voucher redemption, live class schedules, and center directories.',
    impactMetric: 'Zero-latency voucher verification & seamless student onboarding',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'REST API'],
    architectureBlueprint: {
      tier1: {
        label: 'Frontend & Interactive UI',
        details: 'Next.js App Router + Interactive HTML5 Canvas Scratch-Card UI + Real-time Location Filtering Engine.',
      },
      tier2: {
        label: 'Backend & Logic Pipeline',
        details: 'Secure Cryptographic Voucher Validation Pipeline + Anti-Brute-Force Rate Limiting + Class Schedule Aggregator.',
      },
      tier3: {
        label: 'Data & Access Layer',
        details: 'Normalized Relational Schema for Centers, Instructors, Schedules, and Single-Use Salted Voucher Hashes.',
      },
    },
    featured: true,
    year: '2024',
    role: 'Lead Full-Stack Engineer',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    liveUrl: 'https://centr-edu.vercel.app',
  },
  {
    id: 'xpower-nutrition',
    title: 'XPower Nutrition — 3D Sports Supplement Storefront',
    category: 'web-ecommerce',
    categoryLabel: 'High-Conversion E-Commerce',
    tagline: 'High-conversion e-commerce experience featuring custom photorealistic 3D product renders and ultra-fast checkout flows.',
    impactMetric: 'Engineered for maximum conversion rate & visual authority',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', '3D Product Rendering'],
    architectureBlueprint: {
      tier1: {
        label: 'Frontend & Visual Showcase',
        details: 'SSR Product Catalog + GSAP Scroll Storytelling + Dynamic Supplement Facts Drawer & Interactive 3D Turntables.',
      },
      tier2: {
        label: 'State & Cart Architecture',
        details: 'Optimistic Cart State Engine + Persistent Local/Session Sync + Dynamic Bundle Discount Calculator.',
      },
      tier3: {
        label: 'Performance & Assets',
        details: 'Next/Image WebP/AVIF Pipeline with Preloaded Textures achieving 99/100 Lighthouse Performance.',
      },
    },
    featured: true,
    year: '2024',
    role: 'Creative Web Engineer',
    image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=1200&auto=format&fit=crop',
    liveUrl: 'https://xpower-nutrition.vercel.app',
  },
  {
    id: 'nyx-clothing',
    title: 'NYX Clothing — Streetwear & Fashion E-Commerce',
    category: 'web-ecommerce',
    categoryLabel: 'Editorial Brand Experience',
    tagline: 'Editorial fashion storefront with fluid page transitions, lookbook galleries, and instant size/variant filtering.',
    impactMetric: 'Sub-second page transitions & editorial brand elevation',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lenis'],
    architectureBlueprint: {
      tier1: {
        label: 'Editorial Presentation',
        details: 'High-Fashion Editorial Lookbook Grid + Shared Layout Transitions (layoutId) + Quick-Add Slideout Drawer.',
      },
      tier2: {
        label: 'Catalog Engine',
        details: 'Multi-attribute Variant Matrix (Size/Color/Inventory) + URL-synced Search Params for Instant Deep-Linking.',
      },
      tier3: {
        label: 'Runtime & Delivery',
        details: 'Sub-second Edge Hydration with Responsive Picture Sets and Client-Side Variant Cache.',
      },
    },
    featured: false,
    year: '2023',
    role: 'Frontend Architect',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
    liveUrl: 'https://nyx-clothing.vercel.app',
  },
  {
    id: 'custom-rig-artisan',
    title: 'Custom Rig & Tech Store + Artisan Furniture Store',
    category: 'web-ecommerce',
    categoryLabel: 'Configurator & High-Ticket Retail',
    tagline: 'Specialized high-ticket retail platforms featuring custom PC compatibility builders and spatial furniture showcases.',
    impactMetric: 'Built to handle complex product configurations effortlessly',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    architectureBlueprint: {
      tier1: {
        label: 'Client Configurator',
        details: 'Interactive Component Selector with Real-Time Wattage, Socket, and Form Factor Compatibility Warnings.',
      },
      tier2: {
        label: 'Dynamic Pricing Engine',
        details: 'Real-time BOM (Bill of Materials) Calculator with Tiered Warranty and Assembly Add-On Pricing.',
      },
      tier3: {
        label: 'Inventory & Specification DB',
        details: 'Hierarchical Component Spec Graph linking CPUs, Motherboards, GPUs, Coolers, and Dimension Constraints.',
      },
    },
    featured: false,
    year: '2023',
    role: 'Full-Stack Developer',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1200&auto=format&fit=crop',
  },

  // Category B: desktop-cloud
  {
    id: 'pos-cloud-saas',
    title: 'SyncPOS — Hybrid Cloud & SaaS Ecosystem',
    category: 'desktop-cloud',
    categoryLabel: 'Hybrid Cloud SaaS & Offline Desktop',
    tagline: 'Hybrid desktop point-of-sale application synchronized in real-time with a cloud Next.js SaaS executive dashboard.',
    impactMetric: 'Offline-first desktop reliability meets real-time cloud analytics',
    stack: ['Next.js', 'Python', 'PySide6', 'SQLite', 'Cloud REST Sync', 'Tailwind CSS'],
    architectureBlueprint: {
      tier1: {
        label: 'Local Desktop Node (Cashier)',
        details: 'Python + PySide6 High-Frequency GUI + Local SQLite WAL Database for 100% offline cashier speed & thermal printing.',
      },
      tier2: {
        label: 'Bi-Directional Sync Engine',
        details: 'Delta Sync Manager with automated conflict resolution, transactional retry queues, and batch payload compression.',
      },
      tier3: {
        label: 'Cloud SaaS Dashboard',
        details: 'Next.js Admin Portal displaying real-time multi-branch revenue analytics, expense tracking, and inventory alerts.',
      },
    },
    featured: true,
    year: '2024',
    role: 'System Architect & Lead Engineer',
    image: 'https://images.unsplash.com/photo-1556742049-0a67e557224d?q=80&w=1200&auto=format&fit=crop',
    liveUrl: 'https://pos-saas.vercel.app',
  },
  {
    id: 'mizan-legal-erp',
    title: 'Mizan (ميزان) — Legal Practice & Law Firm ERP',
    category: 'desktop-cloud',
    categoryLabel: 'Enterprise Desktop Software',
    tagline: 'Enterprise-grade desktop management system for law firms to track clients, court sessions, case timelines, and legal archives.',
    impactMetric: 'Automated legal workflow & instant document retrieval',
    stack: ['C# WPF', 'Python PySide6', 'SQLite', 'Relational DB Design'],
    architectureBlueprint: {
      tier1: {
        label: 'Desktop Presentation Layer',
        details: 'Modern MVVM Desktop Interface with high-contrast Arabic/English legal typography and document quick-preview.',
      },
      tier2: {
        label: 'Core Legal Business Logic',
        details: 'Automated Court Session Reminder Engine + Case Procedural Status State Machine + Role-Based Access Control.',
      },
      tier3: {
        label: 'Encrypted Storage Layer',
        details: 'Local AES-Encrypted SQLite Database with automated daily backup snapshots and full-text Arabic case indexing.',
      },
    },
    featured: true,
    year: '2023',
    role: 'Desktop Software Engineer',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop',
  },

  // Category C: ai-interactive
  {
    id: 'neurologic-prolog',
    title: 'NeuroLogic — Web-Based Prolog Inference & Rule Engine',
    category: 'ai-interactive',
    categoryLabel: 'Symbolic AI & Logic Engine',
    tagline: 'Full-stack symbolic AI application bridging a SWI-Prolog HTTP backend with a modern interactive web interface.',
    impactMetric: 'Real-time constraint solving & adversarial game trees over REST',
    stack: ['SWI-Prolog', 'REST API', 'JavaScript', 'HTML5/CSS3', 'Logic Programming'],
    architectureBlueprint: {
      tier1: {
        label: 'Web Visualizer Client',
        details: 'Interactive Puzzle & Game Board UI + Real-time Decision Tree State Visualizer and proof-step tracer.',
      },
      tier2: {
        label: 'Prolog HTTP Bridge',
        details: 'Stateless JSON-over-HTTP Prolog Server handling first-order predicate queries and backtracking management.',
      },
      tier3: {
        label: 'Symbolic Inference Core',
        details: 'Minimax Game Tree Solver with Alpha-Beta pruning + Seating Constraint Satisfaction Engine + Deductive Knowledge Base.',
      },
    },
    featured: true,
    year: '2023',
    role: 'AI Logic & Systems Developer',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'revpulse-analytics',
    title: 'RevPulse — Sales Intelligence & Predictive Analytics Suite',
    category: 'ai-interactive',
    categoryLabel: 'Data Science & Predictive ML',
    tagline: 'Data science pipeline and interactive visual analytics turning raw retail data into actionable revenue forecasts.',
    impactMetric: 'Actionable KPI anomaly detection & automated reporting',
    stack: ['Python', 'Pandas', 'Scikit-Learn', 'Data Visualization'],
    architectureBlueprint: {
      tier1: {
        label: 'Executive Analytics View',
        details: 'High-density statistical chart dashboards highlighting demand fluctuations, customer cohort retention, and margin shifts.',
      },
      tier2: {
        label: 'ETL & Transformation Pipeline',
        details: 'Automated Pandas pipeline cleaning, normalizing, and structuring multi-source CSV/SQL point-of-sale logs.',
      },
      tier3: {
        label: 'Machine Learning Engine',
        details: 'Scikit-Learn regression models + seasonal decomposition for demand forecasting and outlier revenue detection.',
      },
    },
    featured: false,
    year: '2023',
    role: 'Data & Analytics Developer',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
  },
];
