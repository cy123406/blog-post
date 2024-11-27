"use client";
import * as React from 'react';
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, useTheme } from '@mui/material';
import { Typography, Button, Toolbar, ListItemText, ListItemButton } from '@mui/material';
import { DarkMode, LightMode, Menu } from '@mui/icons-material';
import Link from 'next/link';

const drawerWidth = 240;
const navItems = [
  { href: '/', name: '主页' },
  { href: '/', name: '随笔' },
  { href: '/', name: '作品' }
];

function DrawerAppBar(props) {
  const theme = useTheme();
  const { window, toggleTheme } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'left' }}>
      <Box sx={{ my: 1.5 }}>
        <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 1.5, mr: 3.5 }}>
          {theme.palette.mode === 'light' ? <LightMode /> : <DarkMode />}
        </IconButton>
        <Typography component={'span'} variant="h6"
          sx={{ position: 'relative', top: '8px' }}>
          Cheney
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <Link key={`link-${item.name}`} href={item.href}>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Cheney
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Link key={`link-${item.name}`} href={item.href}>
              <Button key={item.name} sx={{ color: '#fff' }}>
                {item.name}
              </Button>
              </Link>
            ))}
            <IconButton onClick={toggleTheme} color="inherit">
              {theme.palette.mode === 'light' ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Toolbar />
    </Box>
  );
}

export default DrawerAppBar;