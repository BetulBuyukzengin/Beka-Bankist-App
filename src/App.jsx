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
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login.jsx";
import Footer from "./Pages/Footer/Footer.jsx";

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          {/* <Navbar /> */}
          <Route path="/" element={<Navbar />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <GlobalStyles />
      <Home />
      <AboutUs />
      <Gallery />
      <OurServices />
      <FrequentlyQuestions />
      <Testimonals />
      <Contact />
      <Footer />
    </DarkModeProvider>
  );
}

export default App;
