import { DarkModeProvider } from "./Contexts/DarkModeContext.jsx";
import GlobalStyles from "./styles/GlobalStyles";
import Navbar from "./Pages/Navbar/Navbar.jsx";
import Home from "./Pages/Home/Home.jsx";
import AboutUs from "./Pages/AboutUs/AboutUs.jsx";
import OurServices from "./Pages/OurServices/OurServices.jsx";
import FrequentlyQuestions from "./Pages/Questions/FrequentlyQuestions.jsx";
import Contact from "./Pages/Contact/Contact.jsx";

function App() {
    return (
        <DarkModeProvider>
            <GlobalStyles />
            <Navbar />
            <Home />
            <AboutUs />
            <OurServices />
            <FrequentlyQuestions />
            <Contact />
        </DarkModeProvider>
    );
}

export default App;
