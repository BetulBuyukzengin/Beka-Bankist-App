import { DarkModeProvider } from "./Contexts/DarkModeContext.jsx";
import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/App/Login/Login.jsx";
import Presentational from "./Pages/Presentational/Presentational.jsx";
import CreateAccount from "./Pages/App/CreateAccount/CreateAccount.jsx";
function App() {
  return (
    <DarkModeProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Presentational />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createaccount" Component={CreateAccount} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
