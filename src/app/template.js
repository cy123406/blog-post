"use client"
import { ThemeProvider, CssBaseline } from "@mui/material";
import { GetTheme } from "@/components/ToggleTheme";
import AppBar from "../components/appBar"

export default function Template({ children }) {
    const theme = GetTheme()
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar toggleTheme={theme.customMethods.toggleTheme} />
            {children}
        </ThemeProvider>
    )
}