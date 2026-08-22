// file:///c:/Users/ansuj/OpenLens/frontend/src/components/Sidebar/Sidebar.tsx

import { useState } from "react";
import { Drawer, List, ListItem, Tooltip, Divider, IconButton } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  TableChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  ArrowBack,
  BarChart,
  Description,
  Visibility,
  Schema,
  History,
} from "@mui/icons-material";
import { datasets } from "../../data/mockDatasets";

// === ADD: Import contextual sidebar SCSS file ===
import "./Sidebar.scss";

function Sidebar({ drawerWidth = 240 }: { drawerWidth?: number }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [collapsed, setCollapsed] = useState(false);

  // Route matching rules
  const match = location.pathname.match(/^\/datasets\/([^/]+)(?:\/tables\/([^/]+))?/);
  const datasetId = match ? match[1] : null;
  const tableId = match ? match[2] : null;

  const isTableLevel = !!(datasetId && tableId);
  const isDatasetLevel = !!(datasetId && !tableId);
  const isGlobalLevel = !datasetId;

  const dataset = datasets.find((d) => d.id === Number(datasetId));
  const datasetName = dataset ? dataset.name : `Dataset ${datasetId}`;
  
  const table = dataset?.tables?.find((t) => t.id === tableId);
  const tableName = table ? table.name : tableId;

  const currentTab = searchParams.get("tab") || "preview";

  const mainMenuItems = [
    { text: 'Datasets', icon: <TableChart />, path: '/datasets' },
  ];

  const bottomMenuItems = [
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  const datasetMenuItems = [
    { text: 'Tables', icon: <TableChart />, path: `/datasets/${datasetId}/tables` },
    { text: 'Analysis Library', icon: <BarChart />, path: `/datasets/${datasetId}/analysis` },
    { text: 'Documents', icon: <Description />, path: `/datasets/${datasetId}/agents` },
  ];

  const tableMenuItems = [
    { text: 'Data Preview', icon: <Visibility />, tab: 'preview' },
    { text: 'Schema & Columns', icon: <Schema />, tab: 'schema' },
    { text: 'Activity Log', icon: <History />, tab: 'activity' },
  ];

  const handleTableTabClick = (tabValue: string) => {
    setSearchParams({ tab: tabValue });
  };

  const renderListItemButton = (
    text: string,
    icon: React.ReactNode,
    isSelected: boolean,
    onClick: () => void
  ) => {
    return (
      <ListItem key={text} disablePadding className="menu-list-item">
        {collapsed ? (
          <Tooltip title={text} placement="right">
            <button
              onClick={onClick}
              className={`menu-item-button ${isSelected ? "selected" : ""}`}
            >
              <span className="menu-icon">{icon}</span>
            </button>
          </Tooltip>
        ) : (
          <button
            onClick={onClick}
            className={`menu-item-button ${isSelected ? "selected" : ""}`}
          >
            <span className="menu-icon">{icon}</span>
            <span className="menu-text">{text}</span>
          </button>
        )}
      </ListItem>
    );
  };

  const renderGlobalLevel = () => (
    <div className="sidebar-container">
      <div>
        <div className="sidebar-header">
          {!collapsed && <span className="logo-text">OPENLENS</span>}
          <IconButton onClick={() => setCollapsed(!collapsed)} size="small" className="toggle-btn">
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <div className="menu-list">
          {mainMenuItems.map((item) => {
            const isSelected = location.pathname.startsWith('/datasets') || location.pathname === '/';
            return renderListItemButton(item.text, item.icon, isSelected, () => navigate(item.path));
          })}
        </div>
      </div>
      <div>
        <Divider />
        <div className="menu-list">
          {bottomMenuItems.map((item) => {
            const isSelected = location.pathname === item.path;
            return renderListItemButton(item.text, item.icon, isSelected, () => navigate(item.path));
          })}
        </div>
      </div>
    </div>
  );

  const renderDatasetLevel = () => (
    <div className="sidebar-container">
      <div>
        <div className="sidebar-header">
          <div className="back-btn-container">
            <IconButton onClick={() => navigate('/datasets')} className="back-btn" size="small">
              <ArrowBack fontSize="small" />
            </IconButton>
            {!collapsed && (
              <div className="header-meta">
                <span className="meta-label">Dataset</span>
                <span className="meta-title">{datasetName}</span>
              </div>
            )}
          </div>
        </div>
        <div className="menu-list">
          {datasetMenuItems.map((item) => {
            const isSelected = 
              location.pathname === item.path || 
              (item.text === "Tables" && location.pathname === `/datasets/${datasetId}`);
            return renderListItemButton(item.text, item.icon, isSelected, () => navigate(item.path));
          })}
        </div>
      </div>
    </div>
  );

  const renderTableLevel = () => (
    <div className="sidebar-container">
      <div>
        <div className="sidebar-header">
          <div className="back-btn-container">
            <IconButton onClick={() => navigate(`/datasets/${datasetId}/tables`)} className="back-btn" size="small">
              <ArrowBack fontSize="small" />
            </IconButton>
            {!collapsed && (
              <div className="header-meta">
                <span className="meta-label">Table</span>
                <span className="meta-title">{tableName}</span>
              </div>
            )}
          </div>
        </div>
        <div className="menu-list">
          {tableMenuItems.map((item) => {
            const isSelected = currentTab === item.tab;
            return renderListItemButton(item.text, item.icon, isSelected, () => handleTableTabClick(item.tab));
          })}
        </div>
      </div>
    </div>
  );

  return (
    <Drawer
      variant="permanent"
      className={`sidebar-drawer-root ${collapsed ? "collapsed" : ""}`}
      slotProps={{
        paper: {
          className: `sidebar-drawer ${collapsed ? "collapsed" : ""}`,
          style: { width: collapsed ? 64 : drawerWidth }
        }
      }}
      sx={{
        width: collapsed ? 64 : drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? 64 : drawerWidth,
          transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }
      }}
    >
      {isTableLevel && renderTableLevel()}
      {isDatasetLevel && renderDatasetLevel()}
      {isGlobalLevel && renderGlobalLevel()}
    </Drawer>
  );
}

export default Sidebar;
