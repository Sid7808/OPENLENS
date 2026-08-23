# OpenLens Studio

OpenLens Studio is a modern AI-powered web platform designed for dataset management, analytical tools, and intelligent agent workflows. This workspace serves as a repository for the project, organized as a microservice-based architecture within a single Git repository (monorepo).

---

## 📁 Repository Structure & Services

The repository is organized into independent services under the `services/` directory:

```
OpenLens (Root)
├── services/
│   ├── web/            # OpenLens Frontend (React + Vite + TypeScript)
│   ├── orchestrator/   # Session & Lifecycle Coordinator (Node.js + TS + Express + WS)
│   ├── core/           # Main API Boundary / Gateway (Node.js + TS + Express)
│   └── studio/         # Analytical & DuckDB Engine (Python + FastAPI)
└── README.md
```

### Services & Responsibilities

1. **`web`** (Port: `5173`)
   * **Technology**: React, Vite, TypeScript, SASS, Material UI (MUI).
   * **Responsibility**: Responsible ONLY for the OpenLens frontend UI. It contains UI components, layouts, pages, and client state. No backend logic is placed here.
   
2. **`orchestrator`** (Port: `8001`)
   * **Technology**: Node.js, TypeScript, Express, WebSockets (`ws`).
   * **Responsibility**: Handles user sessions, WebSocket/session coordination, workspace/session lifecycle, and analysis container orchestration.

3. **`core`** (Port: `8000`)
   * **Technology**: Node.js, TypeScript, Express.
   * **Responsibility**: Acts as the main API boundary and gateway. Handles gateway tasks (authentication, routing, authorization) and shields the frontend from internal services.

4. **`studio`** (Port: `8002`)
   * **Technology**: Python, FastAPI, DuckDB, Pandas.
   * **Responsibility**: OpenLens analysis backend. Performs dataset/table imports, DuckDB query execution, and intelligent data analysis.

---

## 📜 Development Timeline & Milestones

This log chronicles the evolution of OpenLens Studio from inception to the current layout:

### Phase 1: Initial Setup & Workspace Structure
*   Created root directory and structural folders: `frontend/`, `backend/`, `infra/`, and `docs/`.
*   Bootstrapped frontend SPA using **Vite**, **React**, and **TypeScript**.
*   Configured configuration setups including ESLint and typescript compilation options.

### Phase 2: Core React Events & Custom Components
*   Set up state-driven dataset list rendering.
*   Created core reusable custom UI components: [`Button.tsx`](file:///c:/Users/ansuj/OpenLens/frontend/src/components/UI/Button.tsx), [`Badge.tsx`](file:///c:/Users/ansuj/OpenLens/frontend/src/components/UI/Badge.tsx), and [`SearchInput.tsx`](file:///c:/Users/ansuj/OpenLens/frontend/src/components/UI/SearchInput.tsx).
*   Configured simulated interactions for dataset state manipulation (Archive, Delete, Add Dataset) using React `useState` hooks.

### Phase 3: Login Panel & Brand Identity
*   Integrated brand assets including `openlens-logo.svg` and `openlens-mark.svg`.
*   Designed a dual-panel split screen for `LoginPage.tsx` containing:
    *   **LoginForm**: Left-hand controlled component supporting validations, toggling password visibility, and simulated navigation.
    *   **LoginBrandPanel**: Right-hand marketing banner showcasing abstract statistics (designed with CSS charts) and key product features (Unify data, AI insights, Scale).

### Phase 4: App Shell, Collapsible Navigation & Themes
*   Engineered `MainLayout` layout container combining fixed navbar, collapsible sidebar, and scrollable content viewport.
*   Developed a state-driven collapsible `Sidebar` component supporting:
    *   Icon-only mini mode transitions.
    *   MUI Tooltips on icon hover when collapsed.
    *   Dynamic path checking using `useLocation` to apply custom active/selected styles.
*   Centralized styling with Material-UI's `ThemeProvider` under a unified configuration (`theme.ts`) supporting font family integrations (Inter, Roboto) and default theme palettes.
*   Wired up routes for placeholder shells: `Dashboard`, `Agents`, `Analysis`, and `Settings`.

### Phase 5: Modern UI Redesign & Operations Polish
*   Refactored dataset cards and listing layouts using dedicated SCSS modules for clean component styling separation.
*   Enhanced `DatasetToolbar` actions:
    *   Created status tab filters (All, Active, Archived).
    *   Added sorting select options (Name A-Z, Name Z-A, Size, Last Updated).
*   Implemented file size unit converter algorithm (`parseSizeToBytes`) to handle multi-unit numerical sorting (KB, MB, GB, TB).
*   Wrapped secondary dataset operations with `event.stopPropagation()` to enable clean page navigation via card clicks without triggering action events.

### Phase 6: Secondary Sidebar Layout for Tables & Navigation Polish
*   Engineered a sliding secondary side panel (`.tables-secondary-panel`) in `MainLayouts` that slides out from behind the left sidebar when inside a dataset context.
*   Updated `Sidebar` navigation logic to dynamically match location paths and preserve the selected dataset context.
*   Polished component dimensions, margins, and transition offsets across stylesheets to allow fluid, responsive layout adjustments when side panels slide open.
*   Cleaned up unused components and redundant styles in tables sub-pages.

---

## 💻 Frontend Feature Implementation Details

The frontend app (`/frontend`) is built with **React 19**, **TypeScript 6**, **Vite 8**, **Material UI (MUI) 9**, and **SASS (SCSS)**.

### 1. User Authentication (Login)
*   **Login Flow (`LoginPage`, `LoginForm`, `LoginBrandPanel`)**: A dual-panel interface with a customizable brand statement on the right and an interactive form on the left.
*   **Form Logic**:
    *   Controlled inputs for tracking user email and password.
    *   Conditional toggling of password visibility (Show/Hide button).
    *   Basic validation displaying helpful error messages if inputs are missing.
    *   Redirection to the main datasets workspace upon successful simulated login.

### 2. Dataset Management Workspace
*   **State-Driven Grid (`DatasetPage`)**: Fully dynamic list rendering dataset metadata (Name, Description, Status, Size, Last Updated timestamp, Author).
*   **Status Filters & Searching (`DatasetToolbar`)**:
    *   **Text Search**: Case-insensitive instant filtering against names and descriptions.
    *   **Status Tabs**: Filter datasets between **All**, **Active**, and **Archived** status.
*   **Dynamic Sorting**: Sort datasets by multiple options including:
    *   Name (A-Z / Z-A)
    *   Last Updated (Latest / Oldest)
    *   File Size (Largest / Smallest)
*   **Actions & Operations (`DatasetCard`)**:
    *   **Add Dataset**: Dropdown menu option allowing user to "Create new dataset" (generates mock items dynamically) or select "Upload existing dataset".
    *   **Archive/Restore**: Instant status toggling between "Active" and "Archived".
    *   **Delete**: Permanent deletion of items from client state.
    *   **Event Handling**: Action buttons inside the card prevent event bubbling (`event.stopPropagation()`), allowing clicks on card backgrounds to trigger navigation without conflicting with individual actions.

### 3. Layout, Theming & Navigation
*   **Shell Architecture (`MainLayout`)**: Layout structure combining a fixed top navbar (`Navbar`), a permanent collapsable left drawer (`Sidebar`), and a main content viewport wrapper.
*   **Responsive Sidebar**: Smoothly collapses to a mini-icon drawer using React state, maintaining readable Tooltips on hover for icon actions.
*   **Tables Secondary Side Panel**: Positioned directly adjacent to the main sidebar, providing context-aware table listings, upload prompts, and actions dynamically when navigating dataset contents. Incorporates slide transitions and responsive main content viewport resizing.
*   **Theme Integration (`theme.ts`)**: Tailored styling using Material UI's `ThemeProvider` and CSS custom properties (variables), supporting system dark and light modes (`prefers-color-scheme`).

### 4. Page Shells
Placeholders and layout bindings are configured for the following functional routes:
*   **Dashboard (`Dashboard.tsx`)**
*   **Agents Workspace (`Agents.tsx`)**
*   **Analysis Page (`Analysis.tsx`)**
*   **Dataset Details Page (`DatasetsDetails.tsx`)**: Displays specific dataset configurations based on the URL path.
*   **Platform Settings (`Settings.tsx`)**

---

## 🧠 Technical & Programming Concepts Covered

We have applied several key architectural patterns and React concepts throughout this implementation:

### React Concepts
1.  **Declarative UI**: Syncing the UI with internal component states (`useState`) for updates without direct DOM manipulation.
2.  **Controlled Components**: Form elements (`<input>`) bound directly to React state values and updated via `onChange` handlers.
3.  **Conditional Rendering**: Using ternary operators and logical `&&` to render components dynamically (e.g., toggling password view, applying badge classes, displaying loaders).
4.  **Component Reusability**: Extracting standard UI elements into custom wrappers:
    *   [`Button.tsx`](file:///c:/Users/ansuj/OpenLens/frontend/src/components/UI/Button.tsx) - Custom wrapper supporting standard button attributes.
    *   [`Badge.tsx`](file:///c:/Users/ansuj/OpenLens/frontend/src/components/UI/Badge.tsx) - Specialized badge displaying dataset status ("Active" vs "Archived").
    *   [`SearchInput.tsx`](file:///c:/Users/ansuj/OpenLens/frontend/src/components/UI/SearchInput.tsx) - Pre-styled search field.
5.  **Event Bubbling & Propagation**: Utilizing `event.stopPropagation()` on nested button controls to avoid parent click listeners (such as card page navigation) from firing unexpectedly.

### Routing Concepts (`react-router-dom`)
1.  **Nested Routing & Layouts**: Nesting sub-routes under `/` using `MainLayout` and `<Outlet />` for consistent headers and sidebar templates.
2.  **Path Parameters**: Fetching dynamic parameters (e.g., `datasetId` in `datasets/:datasetId`) using the `useParams` hook.
3.  **Programmatic Navigation**: Moving between screens automatically with the `useNavigate` hook.

### Styling & CSS Architecture
1.  **CSS Custom Properties (Variables)**: Declaring design tokens (colors, borders, typography, shadow models) dynamically adapting to light/dark preferences.
2.  **SASS (SCSS) Modules**: Writing clean modular nested stylesheets (`.scss`) for component isolation (avoiding style bleeding).
3.  **MUI Component Overrides**: Customizing structural material styling (AppBar, Drawer, colors) inside a unified centralized theme config (`theme.ts`).

### Algorithms & Utilities
*   **File Size String Parsing**: To sort human-readable file sizes (e.g., "1.2 MB", "100MB", "3 GB") numerically, a custom parsing utility converts unit strings to numerical byte values:
    ```typescript
    function parseSizeToBytes(sizeStr: string): number {
      const match = sizeStr.match(/^([\d.]+)\s*(KB|MB|GB|TB)?$/i);
      if (!match) return 0;
      const value = parseFloat(match[1]);
      const unit = match[2]?.toUpperCase();
      switch (unit) {
        case "KB": return value * 1024;
        case "MB": return value * 1024 * 1024;
        case "GB": return value * 1024 * 1024 * 1024;
        case "TB": return value * 1024 * 1024 * 1024 * 1024;
        default: return value;
      }
    }
    ```

---

## 🛠️ Technology Stack & Dependencies

The frontend application utilizes modern packages to ensure performance and typing safety:

| Category | Technology | Version |
| :--- | :--- | :--- |
| **Core Framework** | React / React DOM | `v19.2.7` |
| **Routing** | React Router Dom | `v7.18.0` |
| **Component Library**| Material UI (MUI) | `v9.3.1` |
| **Bundler & Build** | Vite | `v8.1.0` |
| **Language** | TypeScript | `v6.0.2` |
| **CSS Preprocessor** | SASS / SCSS | `v1.102.0` |
| **Linting & Rules** | ESLint | `v10.5.0` |

---

## 🚀 Getting Started & Local Development

Every microservice in OpenLens can be run and developed independently.

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (v3.10+)

### Service Ports

| Service | Port | Protocol | Entrypoint Command |
| :--- | :--- | :--- | :--- |
| **web** | `5173` | HTTP | `npm run dev` |
| **core** | `8000` | HTTP | `npm run dev` |
| **orchestrator** | `8001` | HTTP / WS | `npm run dev` |
| **studio** | `8002` | HTTP | `python main.py` |

### Running the Services

#### 1. Web Service (Frontend)
```bash
cd services/web
npm install
npm run dev
```

#### 2. Orchestrator Service
```bash
cd services/orchestrator
npm install
# Set up .env based on .env.example
npm run dev
```

#### 3. Core Service
```bash
cd services/core
npm install
# Set up .env based on .env.example
npm run dev
```

#### 4. Studio Service
```bash
cd services/studio
# Set up .env based on .env.example

# Create and activate virtual environment
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate

pip install -r requirements.txt
python main.py
```