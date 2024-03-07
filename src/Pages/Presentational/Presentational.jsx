import Gallery from "../../Components/Gallery/Gallery";
import AboutUs from "../Presentational/AboutUs/AboutUs";
import Contact from "../Presentational/Contact/Contact";
import Footer from "../Presentational/Footer/Footer";
import Home from "../Presentational/Home/Home";
import OurServices from "../Presentational/OurServices/OurServices";
import FrequentlyQuestions from "../Presentational/Questions/FrequentlyQuestions";
import Testimonals from "../Presentational/Testimonals/Testimonals";
import Navbar from "../Presentational/Navbar/Navbar";
function Presentational() {
  return (
    <>
      <Navbar />
      <Home />
      <AboutUs />
      <Gallery />
      <OurServices />
      <FrequentlyQuestions />
      <Testimonals />
      <Contact />
      <Footer />
    </>
  );
}

export default Presentational;
