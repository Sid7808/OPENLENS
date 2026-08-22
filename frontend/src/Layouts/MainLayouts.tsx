import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, IconButton } from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const drawerWidth = 240;

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if we are inside a dataset and if the tables panel should be open
  const match = location.pathname.match(/^\/datasets\/([^/]+)/);
  const datasetId = match ? match[1] : null;
  const isTablesPanelOpen = !!datasetId && (
    location.pathname.endsWith("/tables") ||
    location.pathname.includes("/tables/")
  );

  const handleClose = () => {
    if (datasetId) {
      navigate(`/datasets/${datasetId}`);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} />

      {/* Tables Side Panel - Positioned directly beside the left Sidebar */}
      <div className={`tables-secondary-panel ${isTablesPanelOpen ? "open" : ""}`}>
        <div className="panel-header">
          <h2 className="panel-title">Tables</h2>
          <IconButton onClick={handleClose} size="small" className="close-btn">
            <Close fontSize="small" />
          </IconButton>
        </div>
        <Button
          variant="outlined"
          startIcon={<Add />}
          className="add-file-btn"
          fullWidth
        >
          Add file
        </Button>
      </div>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          width: isTablesPanelOpen
            ? `calc(100% - ${drawerWidth}px - 330px)`
            : `calc(100% - ${drawerWidth}px)`,
          marginTop: '64px',
          marginLeft: isTablesPanelOpen ? '330px' : '0px',
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;
