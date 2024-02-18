import { DarkModeProvider } from "./Contexts/DarkModeContext.jsx";
import Navbar from "./Navbar/Navbar";
import GlobalStyles from "./styles/GlobalStyles";

import Home from "./Components/Home/Home";
import AboutUs from "./Components/AboutUs/AboutUs.jsx";
function App() {
    return (
        <DarkModeProvider>
            <GlobalStyles />
            <Navbar />
            <Home />
            <AboutUs />
        </DarkModeProvider>
    );
}

export default App;
