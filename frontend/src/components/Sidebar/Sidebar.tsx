import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import { TableChart, Settings, ChevronLeft, ChevronRight } from "@mui/icons-material";

const mainMenuItems = [
  { text: 'Datasets', icon: <TableChart />, path: '/datasets' },
];

const bottomMenuItems = [
  { text: 'Settings', icon: <Settings />, path: '/settings' },
];

function Sidebar({ drawerWidth = 240 }: { drawerWidth?: number }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const currentWidth = collapsed ? 64 : drawerWidth;

  const renderMenuItem = (item: { text: string; icon: React.ReactNode; path: string }) => {
    const isSelected = location.pathname === item.path;

    const button = (
      <ListItemButton
        selected={isSelected}
        onClick={() => navigate(item.path)}
        sx={{
          borderRadius: 2,
          justifyContent: collapsed ? 'center' : 'initial',
          px: collapsed ? 1.5 : 2,
          '&.Mui-selected': {
            backgroundColor: '#e3f2fd',
            color: '#1976d2',
            '& .MuiListItemIcon-root': { color: '#1976d2' },
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: collapsed ? 0 : 40,
            mr: collapsed ? 0 : 1,
            justifyContent: 'center',
          }}
        >
          {item.icon}
        </ListItemIcon>
        {!collapsed && (
          <ListItemText primary={<Typography sx={{ fontWeight: 500 }}>{item.text}</Typography>} />
        )}
      </ListItemButton>
    );

    return (
      <ListItem key={item.text} disablePadding sx={{ mb: 1, px: 1 }}>
        {collapsed ? (
          <Tooltip title={item.text} placement="right">
            {button}
          </Tooltip>
        ) : (
          button
        )}
      </ListItem>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: currentWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transition: (theme) =>
          theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        [`& .MuiDrawer-paper`]: {
          width: currentWidth,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        },
      }}
    >
      <Box>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            px: 1,
          }}
        >
          {!collapsed && (
            <Typography variant="h6" color="primary" sx={{ fontWeight: 800, letterSpacing: 1, ml: 1 }}>
              OPENLENS
            </Typography>
          )}
          <IconButton onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Toolbar>
        <Box sx={{ mt: 2 }}>
          <List>
            {mainMenuItems.map(renderMenuItem)}
          </List>
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Divider sx={{ my: 1 }} />
        <List>
          {bottomMenuItems.map(renderMenuItem)}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
