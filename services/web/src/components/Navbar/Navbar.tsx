import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box, Menu, MenuItem } from "@mui/material";
import { HelpOutlined, SettingsOutlined } from "@mui/icons-material";
import { useAuth } from "../auth/AuthContext";

function Navbar({ drawerWidth }: { drawerWidth: number }) {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          OpenLens Studio
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit">
            <HelpOutlined />
          </IconButton>
          <IconButton color="inherit">
            <SettingsOutlined />
          </IconButton>
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, cursor: 'pointer' }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem disabled sx={{ opacity: "0.8 !important" }}>{user?.email}</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;