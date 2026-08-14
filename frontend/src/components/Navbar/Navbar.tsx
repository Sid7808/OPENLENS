import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from "@mui/material";
import { HelpOutlined, SettingsOutlined } from "@mui/icons-material";

function Navbar({ drawerWidth }: { drawerWidth: number }) {
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
          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>U</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;