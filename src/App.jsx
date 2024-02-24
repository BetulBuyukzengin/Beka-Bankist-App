import { DarkModeProvider } from "./Contexts/DarkModeContext.jsx";
// import Navbar from "./Navbar/Navbar";
import Navbar from "./Pages/Navbar/Navbar.jsx";
import GlobalStyles from "./styles/GlobalStyles";
// import Home from "./Components/Home/Home";
// import AboutUs from "./Components/AboutUs/AboutUs.jsx";
// import OurServices from "./Components/OurServices/OurServices.jsx";
import Home from "./Pages/Home/Home.jsx";
import AboutUs from "./Pages/AboutUs/AboutUs.jsx";
import OurServices from "./Pages/OurServices/OurServices.jsx";
import FrequentlyQuestions from "./Pages/Questions/FrequentlyQuestions.jsx";
import ContactUs from "./Pages/Contact/Contact.jsx";

function App() {
    return (
        <DarkModeProvider>
            <GlobalStyles />
            <Navbar />
            <Home />
            <AboutUs />
            <OurServices />
            <ContactUs />
            <FrequentlyQuestions />
        </DarkModeProvider>
    );
}

export default App;
