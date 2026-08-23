import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, IconButton } from "@mui/material";
import { Add, Close, Search } from "@mui/icons-material";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/TableSideNavigation";
import { useState, useEffect, useRef } from "react";
import { DatasetFileUploadDrawer } from "../components/datasets/DatasetFileUploadDrawer";

const drawerWidth = 240;

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const [isSearchOpen, SetIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isAddFileOpen , setIsAddFileOpen] = useState<boolean>(false);

  // Determine if we are inside a dataset and if the tables panel should be open
  const match = location.pathname.match(/^\/datasets\/([^/]+)/);
  const datasetId = match ? match[1] : null;
  const isTablesPanelOpen = !!datasetId && (
    location.pathname.endsWith("/tables") ||
    location.pathname.includes("/tables/")
  );

  // Close the Tables panel by returning to the dataset root
  const handleClose = () => {
    if (datasetId) {
      navigate(`/datasets/${datasetId}`);
    }
  };

  // Click outside layout handler to dismiss the panel
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isTablesPanelOpen &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        (!drawerRef.current || !drawerRef.current.contains(event.target as Node)) &&
        !(event.target as Element).closest(".sidebar-drawer-root") &&
        !(event.target as Element).closest(".MuiAppBar-root")
      ) {
        handleClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTablesPanelOpen, datasetId]);

  // Reset search bar state when navigating away
  useEffect(() => {
    if (!isTablesPanelOpen) {
      SetIsSearchOpen(false);
      setSearchQuery("");
    }
  }, [isTablesPanelOpen]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} />

      {/* Tables Side Panel - Positioned directly beside the left Sidebar */}
      <div 
        ref={panelRef} 
        className={`tables-secondary-panel ${isTablesPanelOpen ? "open" : ""}`}
      >
        <div className="panel-header">
          {!isSearchOpen ? (
            <>
              <h2 className="panel-title">Tables</h2>
              <IconButton onClick={() => SetIsSearchOpen(true)} size="small" className="search-toggle-btn">
                <Search fontSize="small" />
              </IconButton>
            </>
          ) : (
            <div className="search-bar-container">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tables..."
                className="search-input"
                autoFocus
              />
              <IconButton 
                onClick={() => {
                  SetIsSearchOpen(false);
                  setSearchQuery("");
                }} 
                size="small" 
                className="search-close-btn"
              >
                <Close fontSize="small" />
              </IconButton>
            </div>
          )}
        </div>
        <Button 
          variant="outlined" 
          startIcon={<Add />} 
          className="add-file-btn"
          onClick={() => setIsAddFileOpen(true)}
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

      {/* Refactored Add File Drawer component */}
      <DatasetFileUploadDrawer
        ref={drawerRef}
        isOpen={isAddFileOpen}
        onClose={() => setIsAddFileOpen(false)}
      />
    </Box>
  );
}

export default MainLayout;
