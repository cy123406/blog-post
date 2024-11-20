"use client";
import AppBar from "./home/appBar";
import ThreeDScene from "./components/ThreeDScene";
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from "next/link";
import { Button, createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeMode, setThemeMode] = useState(prefersDarkMode ? 'dark' : 'light')
  useEffect(() => {
    setThemeMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <AppBar toggleTheme={toggleTheme}/>
        </div>
        <Toolbar />
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-col">
            <div >
              <ThreeDScene path={'/dog.glb'} />
            </div>
            <div >
              <Typography variant="h5" sx={{
                display: 'grid',
                placeItems: 'center',
                textAlign: 'center'
              }}>
                <div>
                  <span>欢迎来到我的知识库</span>
                  <span className="footer-text-icon antialiased animate-myFace inline-block text-sm mx-2">
                    ღゝ◡╹)ノ♡
                  </span>
                </div>
              </Typography>
            </div>
          </main>
          <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
            <div >
              <div className="font-longCang text-center">
                <Link href="https://github.com/cy123406"><GitHubIcon /></Link><span className="mx-2"></span>
                [ 不畏艰险
                <span>
                  <span className="icon-key footer-text-icon antialiased animate-heartAnimate inline-block text-[16px] mx-[15px] text-red-500">
                  </span>
                </span>
                乘风破浪 ]
              </div>
              <div className="font-[family-name:var(--font-geist-mono)] truncate my-3">
                Copyright © 2024 Cheney Powered by next.js 14.2.18
              </div>
            </div>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}
