"use client"
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ToggleTheme } from "@/components/ToggleTheme";
import Toolbar from '@mui/material/Toolbar';
import AppBar from "./home/appBar";

export default function Template({ children }) {
    const theme = ToggleTheme()
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div>
                <AppBar toggleTheme={theme.customMethods.toggleTheme} />
            </div>
            <Toolbar />
            {children}
        </ThemeProvider>
    )
}