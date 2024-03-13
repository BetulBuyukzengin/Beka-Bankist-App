import { DarkModeProvider } from "./Contexts/DarkModeContext.jsx";
import GlobalStyles from "./styles/GlobalStyles";
import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./Pages/App/Login/Login.jsx";
import Presentational from "./Pages/Presentational/Presentational.jsx";
import CreateAccount from "./Pages/App/CreateAccount/CreateAccount.jsx";
import AppLayout from "./Pages/App/AppLayout.jsx";
import Account from "./Pages/App/Account/Account.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Presentational,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/createaccount",
    Component: CreateAccount,
  },
  {
    path: "/applayout",
    Component: AppLayout,
    children: [
      {
        path: "/applayout/account",
        Component: Account,
      },
    ],
  },
]);

function App() {
  return (
    <DarkModeProvider>
      <GlobalStyles />

      <RouterProvider router={router} />
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Presentational />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createaccount" Component={CreateAccount} />
        </Routes>
      </BrowserRouter> */}
    </DarkModeProvider>
  );
}

export default App;
