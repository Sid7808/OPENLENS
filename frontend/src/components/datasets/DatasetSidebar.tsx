import { useParams, useNavigate, useLocation } from "react-router-dom";
import { TableChart, BarChart, SmartToy } from "@mui/icons-material";
import "./DatasetSidebar.scss";

export default function DatasetSidebar() {
  const { datasetId } = useParams<{ datasetId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { text: "Tables", icon: <TableChart />, path: `/datasets/${datasetId}/tables` },
    { text: "Analysis", icon: <BarChart />, path: `/datasets/${datasetId}/analysis` },
    { text: "Agents", icon: <SmartToy />, path: `/datasets/${datasetId}/agents` }
  ];

  return (
    <aside className="dataset-sidebar-panel">
      <ul className="dataset-sidebar-menu">
        {sidebarItems.map((item) => {
          // Highlight item if current route matches exactly, 
          // or default highlight Tables if on /datasets/:datasetId (index route)
          const isSelected = 
            location.pathname === item.path || 
            (item.text === "Tables" && location.pathname === `/datasets/${datasetId}`);

          return (
            <li key={item.text} className="dataset-sidebar-item">
              <button
                onClick={() => navigate(item.path)}
                className={`dataset-sidebar-btn ${isSelected ? "active" : ""}`}
              >
                <span className="dataset-sidebar-icon">{item.icon}</span>
                <span className="dataset-sidebar-text">{item.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
