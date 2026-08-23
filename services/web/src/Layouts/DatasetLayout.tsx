// file:///c:/Users/ansuj/OpenLens/frontend/src/Layouts/DatasetLayout.tsx

import { Outlet } from "react-router-dom";
import "./DatasetLayout.scss";

export default function DatasetLayout() {
  return (
    <div className="dataset-workspace">
      {/* Child Sub-Workspace Content Area */}
      <main className="dataset-workspace-content">
        <Outlet />
      </main>
    </div>
  );
}
