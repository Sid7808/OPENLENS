import { useParams, useNavigate, useLocation } from "react-router-dom";
import { 
  TableChart, 
  BarChart, 
  SmartToy, 
  ArrowBack, 
  ViewSidebarOutlined, 
  ChevronRight, 
  Add 
} from "@mui/icons-material";
import "./DatasetSidebar.scss";
// ADD: useEffect to reset menu visibility when changing datasets
import { useState, useEffect } from "react";
import { datasets } from "../../data/mockDatasets";

export default function DatasetSidebar() {
  const { datasetId } = useParams<{ datasetId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // MODIFY: Changed state from isSecondPanelOpen to showMenu (defaults to false to show actions immediately)
  const [showMenu, setShowMenu] = useState(false);

  // Find current dataset name matching the URL parameter ID
  const dataset = datasets.find((d) => d.id === Number(datasetId));
  const datasetName = dataset ? dataset.name : `Dataset ${datasetId}`;

  // ADD: Reset showMenu state when datasetId changes
  useEffect(() => {
    setShowMenu(false);
  }, [datasetId]);

  // ADD: Helper check for the tables route
  const isTablesRoute = 
    location.pathname === `/datasets/${datasetId}/tables` || 
    location.pathname === `/datasets/${datasetId}`;

  const sidebarItems = [
    { text: "Tables", icon: <TableChart />, path: `/datasets/${datasetId}/tables` },
    { text: "Analysis library", icon: <BarChart />, path: `/datasets/${datasetId}/analysis` },
    { text: "Agents", icon: <SmartToy />, path: `/datasets/${datasetId}/agents` }
  ];

  // ADD: If we are on the Tables route and menu is not toggled open, render the Actions view directly in the panel
  if (!showMenu && isTablesRoute) {
    return (
      <aside className="dataset-sidebar-panel">
        {/* Header with back button to return to the category menu */}
        <div className="dataset-sidebar-header">
          <button className="back-arrow-btn" onClick={() => setShowMenu(true)}>
            <ArrowBack className="back-arrow-icon" />
          </button>
          <div className="header-text">
            <span className="app-title">Tables Actions</span>
            <span className="dataset-subtitle">{datasetName}</span>
          </div>
          <button className="sidebar-toggle-btn">
            <ViewSidebarOutlined className="toggle-icon" />
          </button>
        </div>

        <div className="second-panel-content">
          <button className="add-file-pill-btn" onClick={() => alert("Add File Clicked!")}>
            <Add className="add-icon" />
            <span>Add file</span>
          </button>
        </div>
      </aside>
    );
  }

  // MODIFY: Render the main navigation menu in the sidebar (back button goes back to datasets index)
  return (
    <aside className="dataset-sidebar-panel">
      {/* Dataset Name Header above menu options */}
      <div className="dataset-sidebar-header">
        <button className="back-arrow-btn" onClick={() => navigate("/datasets")}>
          <ArrowBack className="back-arrow-icon" />
        </button>
        <div className="header-text">
          <span className="app-title">OpenLens</span>
          <span className="dataset-subtitle">{datasetName}</span>
        </div>
        <button className="sidebar-toggle-btn">
          <ViewSidebarOutlined className="toggle-icon" />
        </button>
      </div>

      <ul className="dataset-sidebar-menu">
        {sidebarItems.map((item) => {
          const isSelected = 
            location.pathname === item.path || 
            (item.text === "Tables" && location.pathname === `/datasets/${datasetId}`);

          return (
            <li key={item.text} className="dataset-sidebar-item">
              <button
                onClick={() => {
                  navigate(item.path);
                  // MODIFY: Hide menu and switch to the action panel on click
                  setShowMenu(false);
                }}
                className={`dataset-sidebar-btn ${isSelected ? "active" : ""}`}
              >
                <div className="btn-left-content">
                  <span className="dataset-sidebar-icon">{item.icon}</span>
                  <span className="dataset-sidebar-text">{item.text}</span>
                </div>
                <ChevronRight className="chevron-icon" />
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
