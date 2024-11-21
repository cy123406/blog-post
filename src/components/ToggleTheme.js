import { createTheme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

export const ToggleTheme = () => {
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
        customMethods:{
            toggleTheme,
        }
    });

    return theme
}
