import { createTheme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

const THEME = "theme";

export const GetTheme = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [themeMode, setThemeMode] = useState(prefersDarkMode ? 'dark' : 'light')
    useEffect(() => {
        const prefersThemeMode = window.localStorage.getItem(THEME);
        if (prefersThemeMode === null) {
            setThemeMode(prefersDarkMode ? 'dark' : 'light');
        }
        else setThemeMode(prefersThemeMode)
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
