import { DarkModeProvider } from "./Contexts/DarkModeContext.jsx";
import GlobalStyles from "./styles/GlobalStyles";
import Navbar from "./Pages/Navbar/Navbar.jsx";
import Home from "./Pages/Home/Home.jsx";
import AboutUs from "./Pages/AboutUs/AboutUs.jsx";
import OurServices from "./Pages/OurServices/OurServices.jsx";
import FrequentlyQuestions from "./Pages/Questions/FrequentlyQuestions.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import Testimonals from "./Pages/Testimonals/Testimonals.jsx";
import Gallery from "./Components/Gallery/Gallery";

function App() {
  return (
    <DarkModeProvider>
      <GlobalStyles />
      <Navbar />
      <Home />
      <AboutUs />
      <Gallery />
      <OurServices />
      <FrequentlyQuestions />
      <Contact />
      <Testimonals />
    </DarkModeProvider>
  );
}

export default App;
