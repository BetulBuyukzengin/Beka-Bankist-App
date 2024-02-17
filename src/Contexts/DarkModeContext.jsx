/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark-mode");
            document.documentElement.classList.remove("light-mode");
        } else {
            document.documentElement.classList.remove("dark-mode");
            document.documentElement.classList.add("light-mode");
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

function useDarkMode() {
    const context = useContext(DarkModeContext);
    if (context === undefined)
        throw new Error("DarkModeContext was used outside of DarkModeProvider");
    return context;
}

export { DarkModeProvider, useDarkMode };
