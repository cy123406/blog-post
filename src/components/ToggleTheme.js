import { createTheme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

const THEME = "theme";

export const GetTheme = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');
    const [themeMode, setThemeMode] = useState(prefersDarkMode ? 'light' : 'dark')
    useEffect(() => {
        const prefersThemeMode = window.localStorage.getItem(THEME);
        if (prefersThemeMode !== themeMode) {
            if (prefersThemeMode) {
                setThemeMode(prefersThemeMode)
            } else {
                setThemeMode(prefersDarkMode ? 'dark' : 'light');
            }
        }
    }, []);
    const toggleTheme = () => {
        const newTheme = themeMode === 'light' ? 'dark' : 'light';
        setThemeMode(newTheme);
        window.localStorage.setItem(THEME, newTheme);
    };
    const theme = createTheme({
        palette: {
            mode: themeMode,
        },
        customMethods: {
            toggleTheme,
        }
    });

    return theme
}
