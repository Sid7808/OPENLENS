import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import DatasetSidebar from "../components/datasets/DatasetSidebar";

const drawerWidth = 240;

function MainLayout() {
  const location = useLocation();
  const isDatasetRoute = location.pathname.startsWith('/datasets/');
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} />
      {isDatasetRoute && <DatasetSidebar />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          width: `calc(100% - ${drawerWidth}px)`,
          marginTop: '64px',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;