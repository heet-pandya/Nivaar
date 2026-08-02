# Project Synopsis – Cloud Cost Optimizer

## 🚀 Overview
The **Cloud Cost Optimizer** is a modern full‑stack web application that helps enterprises visualize, simulate, and optimize multi‑cloud infrastructure spending. It offers an interactive UI with glass‑morphism styling, dark‑mode support, and real‑time AI‑driven recommendations. The backend exposes REST APIs for data persistence, AI advice, Slack integration, and AWS cost exploration.

---

## 🖥️ Frontend (React)
### Entry Point
- **`frontend/src/App.jsx`** – Sets up routing, dark‑mode toggle, authentication guard, and loads initial company data from the backend.

### Pages
| Page | Path | Key Responsibilities |
|------|------|----------------------|
| `Home` (inside `App.jsx`) | `/` | Hero banner, feature showcase, articles preview. |
| `Login.jsx` | `/login` | Simple login form, stores JWT token in localStorage. |
| `Register.jsx` | `/register` | Registration form, creates new company records. |
| `Questionnaire.jsx` | `/questionnaire` | Captures company basics, infra, goals; stores them via API. |
| `Dashboard.jsx` | `/dashboard` | Displays cost summary, optimization stats, and integrates the **FeaturesShowcase** component. |
| `Articles.jsx` | `/articles` | Lists static articles / documentation. |

### Core Components
| Component | File | Purpose |
|-----------|------|---------|
| **`Navbar.jsx`** | `frontend/src/components/Navbar.jsx` | Navigation bar with mobile hamburger, theme toggle, and protected links. |
| **`FeaturesShowcase.jsx`** | `frontend/src/components/FeaturesShowcase.jsx` | Interactive demo room with three modules:
- **Topology Playground** – Live SVG cloud topology visualizer.
- **AI What‑If Simulator** – Sliders to adjust compute & DB usage, shows projected savings.
- **Slack Alerts Simulator** – Walkthrough of alert detection and resolution flow. |
| **`CloudTopology.jsx`** | `frontend/src/components/CloudTopology.jsx` | Renders an SVG topology map, highlights nodes with anomalies, shows detailed overlay with recommendations. |
| **`Footer.jsx`** | `frontend/src/components/Footer.jsx` | Footer with branding and links (not inspected in detail). |
| **`Navbar.css`** | `frontend/src/components/Navbar.css` | Styling for the navigation bar (glass‑morphism, dark mode). |
| **`App.css`** | `frontend/src/App.css` | Global styles for hero section, background gradients, and responsive layout. |
| **`index.css`** | `frontend/src/index.css` | Basic CSS reset and font imports (Inter, Bebas Neue, Oswald). |

### UI‑State Highlights (excerpt from `FeaturesShowcase.jsx`)
- **Topology State** – `selectedNode` controls which node overlay is shown.
- **AI What‑If State** – `computeSlider`, `databaseSlider` drive dynamic calculations:
  ```js
  const baselineCost = 15000;
  const computeSavings = (computeSlider / 100) * 6500;
  const dbSavings = (databaseSlider / 100) * 3500;
  const totalSavings = Math.round(computeSavings + dbSavings);
  const projectedCost = baselineCost - totalSavings;
  ```
- **Slack Simulation State** – `slackStep` cycles through `alert → optimizing → resolved` with timed transitions.

---

## 🔧 Backend (Node/Express)
### Main Server
- **`backend/server.js`** – Creates Express app, registers route groups (`/api/auth`, `/api/integration`, `/api/ai`, etc.), applies JSON middleware, and starts listening on port 5000.

### Routes (folder `backend/routes`)
| Route File | Endpoints | Description |
|------------|-----------|-------------|
| `authRoutes.js` | `/login`, `/register` | Handles JWT‑based authentication, password hashing, and user creation. |
| `integrationRoutes.js` | `/webhook`, `/test-slack`, `/profile/:id` | Manages Slack webhook storage, dispatches test alerts, and fetches company profile/badges. |
| `awsRoutes.js` | `/cost-explorer`, `/instances` (hypothetical) | Interfaces with AWS Cost Explorer SDK to retrieve cost data. |
| `dataRoutes.js` | `/data/latest/:companyId` | Returns the latest saved company data (basics, infra, goals, optimization). |
| `aiRoutes.js` | `/ai/advise`, `/ai/simulate` | Calls the **AI Advisor** service to generate cost‑saving recommendations. |

### Controllers (`backend/controllers`)
| Controller | File | Core Functions |
|------------|------|----------------|
| **AuthController** | `authController.js` | `login(req, res)`, `register(req, res)`, token generation, password verification. |
| **DataController** | `dataController.js` | `saveCompanyData(req, res)`, `fetchLatestData(req, res)`, performs CRUD on `companies` table via Supabase. |

### Services (`backend/services`)
| Service | File | Responsibility |
|---------|------|----------------|
| **AI Advisor** | `aiAdvisor.js` | Communicates with OpenAI/Gemini APIs, formats prompts, returns actionable recommendations. |
| **AWS Cost Explorer** | `awsCostExplorer.js` | Wraps AWS SDK calls to retrieve usage & cost metrics, aggregates by service. |

### Configuration & DB Layer
- **Supabase client** (`backend/config/supabaseClient.js`) – Initializes Supabase connection (project URL & anon key) used throughout routes.
- **Environment variables** (`backend/.env`) – Stores Supabase credentials, JWT secret, AWS keys, Slack webhook defaults.

---\n
## 🌟 Key Features & Functions
1. **Cost Dashboard** – Shows baseline spend, optimized spend, percentage savings, and AI‑generated suggestions.
2. **Live Topology Visualizer** – SVG‑based, node click reveals health, utilization, and remediation actions.
3. **AI What‑If Simulator** – Real‑time sliders compute projected monthly bill and savings.
4. **Slack Alert Engine** – Stores a webhook per company, can trigger a formatted Slack message with interactive blocks.
5. **Authentication & Multi‑Company Support** – JWT tokens, secure password storage, per‑company data isolation.
6. **Backend Data Persistence via Supabase** – Uses Supabase Postgres for company profiles, cost data, anomalies.
7. **AWS Cost Explorer Integration** – (planned) pulls actual usage data for deeper analysis.
8. **Responsive, Premium UI** – Dark mode, glass‑morphism cards, micro‑animations, gradient backgrounds, custom fonts (Inter, Bebas Neue, Oswald).

---

## 📦 Dependencies
- **Frontend**: `react`, `react-router-dom`, `@vitejs/plugin-react` (if Vite is used), CSS utilities.
- **Backend**: `express`, `dotenv`, `supabase-js`, `jsonwebtoken`, `bcrypt`, `node-fetch` (for Slack calls), AWS SDK (`@aws-sdk/client-cost-explorer`).

---

## 📚 How the Pieces Fit Together
1. **User signs up / logs in** → JWT stored in `localStorage`.
2. **Questionnaire** collects company data → POST to `/api/data` (handled by `dataController`).
3. **Dashboard** fetches latest data via `GET /api/data/latest/:id` → displays cost summary.
4. **FeaturesShowcase** runs entirely client‑side for demos, but also calls backend AI routes for real advice.
5. **Slack Integration** – Admin saves webhook via `/api/integration/webhook`; test alerts sent via `/api/integration/test-slack`.
6. **AI Advisor Service** pulls company data, passes to LLM, returns suggestions displayed on the dashboard.
7. **AWS Cost Explorer Service** can be invoked to replace static baseline numbers with live data.

---

## 📁 Project Structure (high‑level)
```
Cloud Cost Optimizer/
├─ backend/
│  ├─ routes/ (auth, ai, integration, aws, data)
│  ├─ controllers/ (authController, dataController)
│  ├─ services/ (aiAdvisor, awsCostExplorer)
│  ├─ config/ (supabaseClient.js, .env)
│  └─ server.js
├─ frontend/
│  ├─ src/
│  │  ├─ components/ (Navbar, Footer, FeaturesShowcase, CloudTopology)
│  │  ├─ pages/ (Login, Register, Questionnaire, Dashboard, Articles)
│  │  ├─ assets/ (images, icons)
│  │  ├─ App.jsx, App.css, index.css, main.jsx
│  └─ package.json
└─ package.json (workspace root)
```

---

## ✅ Summary
The repository combines a polished React UI with a robust Express API backed by Supabase. Core business logic lives in the **FeaturesShowcase** demo components and the **integrationRoutes** for Slack, while the **AI Advisor** and **AWS Cost Explorer** services provide the engine for automated cost‑saving recommendations.

*All significant files have been examined, and the synopsis reflects the current state of the project.*
