# OpenLens Studio

OpenLens Studio is a modern AI-powered web platform designed for dataset management, analytical tools, and intelligent agent workflows. This workspace serves as the root repository for the project, organizing the frontend, backend, infrastructure, and documentation layers.

---

## 📁 Repository Structure & Implementation Status

The workspace is organized into a clean, modular structure. Below is the current implementation status of each directory:

*   **`frontend/`** (Implemented & Active): A fully interactive, state-driven React single-page application (SPA) featuring user authentication, dataset workspaces, dynamic sorting/filtering, and responsive layout shells.
*   **`backend/`** (Pending): Reserved for backend API services (e.g., Node.js, Python, or Go endpoints) to connect the front-end interface with databases and backend analysis engines.
*   **`infra/`** (Pending): Reserved for infrastructure-as-code configuration, containerization (Docker, Kubernetes), and CI/CD pipelines.
*   **`docs/`** (Pending): Reserved for system architecture documentation, API reference guides, and design assets.

---

## 💻 Frontend Feature Implementation

The frontend app (`/frontend`) is built with **React 19**, **TypeScript 6**, **Vite 8**, **Material UI (MUI) 9**, and **SASS (SCSS)**. We have successfully implemented the following features:

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

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) installed.

### Installing Dependencies
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the node modules:
   ```bash
   npm install
   ```

### Running Locally
To launch the Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### Production Build
To run static type-checking and bundle the application for production deployment:
```bash
npm run build
```