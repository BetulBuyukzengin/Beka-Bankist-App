/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// import { usePDF } from "react-to-pdf";
import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../Hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  //   const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const isUserUsingDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    isUserUsingDarkMode,
    "isDarkMode"
  );

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

  //   // PDF oluşturma sırasında dark mode seçeneğini gizleme
  //   const toLightPDF = () => {
  //     const originalMode = isDarkMode;
  //     setIsDarkMode(false); // Her zaman light mode kullan
  //     toPDF();
  //     // PDF oluşturma işlemi burada
  //     // PDF oluşturulduktan sonra dark mode seçeneğini geri yükleme
  //     setIsDarkMode(originalMode);
  //   };

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
