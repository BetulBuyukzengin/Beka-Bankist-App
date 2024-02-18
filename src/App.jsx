import { DarkModeProvider } from "./Contexts/DarkModeContext.jsx";
import Navbar from "./Navbar/Navbar";
import GlobalStyles from "./styles/GlobalStyles";
import Gallery from "./Components/Gallery/Gallery";

import Home from "./Components/Home/Home";
function App() {
  return (
    <DarkModeProvider>
      <GlobalStyles />
      <Navbar />
      <Home />
      <Gallery />
    </DarkModeProvider>
  );
}

export default App;
