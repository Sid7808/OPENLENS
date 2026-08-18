import { useParams, Outlet, useNavigate } from "react-router-dom";
import { datasets } from "../data/mockDatasets";
import { ArrowBack } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import "./DatasetLayout.scss";

export default function DatasetLayout() {
    const { datasetId } = useParams<{ datasetId: string }>();
    const navigate = useNavigate();

    //Retrieve the dataset name using the ID from mock data
    const dataset = datasets.find((d) => d.id === Number(datasetId));
    const datasetName = dataset ? dataset.name : `Dataset ${datasetId}`;

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

      {/* Child Sub-Workspace Content Area */}
      <main className="dataset-workspace-content">
        <Outlet />
      </main>
    </div>
  );
}
