import { useParams, Outlet, useNavigate, useLocation } from "react-router-dom";
import { datasets } from "../data/mockDatasets";
import { TableChart, BarChart, SmartToy, ArrowBack } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import "./DatasetLayout.scss";

export default function DatasetLayout() {
    const { datasetId } = useParams<{ datasetId: string }>();
    const navigate = useNavigate();
    const location = useLocation();


    //Retrieve the dataset name using the ID from mock data

    const dataset = datasets.find((d) => d.id === Number(datasetId));
    const datasetName = dataset ? dataset.name : `Dataset ${datasetId}`;

    const sidebarItems = [
        { text: "Tables", icon: <TableChart />, path: `/datasets/${datasetId}/tables` },
        { text: "Analysis", icon: <BarChart />, path: `/datasets/${datasetId}/analysis` },
        { text: "Agents", icon: <SmartToy />, path: `/datasets/${datasetId}/agents` }
    ];

    return(
        <div className="dataset-workspace">
            {/* top Header Area */}
            <div className="dataset-workspace-header">
                <Button 
                startIcon={<ArrowBack />}
                onClick={() => navigate("/datasets")}
                className="back-btn"
                sx={{mb: 1, textTransform: "none", color: "text.secondary"}}>
                    Back to Datasets
                </Button>
             <Typography variant="h4" className="dataset-title" sx={{ fontWeight: 600 }}>
          {datasetName}
        </Typography>
      </div>
      {/* Workspace Split Layout */}
      <div className="dataset-workspace-body">
        {/* Dataset Workspace Sidebar */}
        <aside className="dataset-sidebar">
          <ul className="dataset-sidebar-menu">
            {sidebarItems.map((item) => {
              // Highlight item if current route matches exactly, 
              // or default highlight Tables if on /datasets/:datasetId
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
        {/* Child Sub-Workspace Content Area */}
        <main className="dataset-workspace-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
