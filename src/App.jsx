import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";

import { DarkModeProvider } from "./Contexts/DarkModeContext.jsx";
import GlobalStyles from "./styles/GlobalStyles";
import Login from "./Pages/App/Login/Login.jsx";
import Presentational from "./Pages/Presentational/Presentational.jsx";
import CreateAccount from "./Pages/App/CreateAccount/CreateAccount.jsx";
import DashboardLayout from "./Components/DashboardLayout/DashboardLayout.jsx";
import Accounts from "./Pages/App/Account/Accounts.jsx";
import Movements from "./Pages/App/Movements/Movements.jsx";
import Transactions from "./Pages/App/Transactions/Transactions.jsx";

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
    Component: DashboardLayout,
    children: [
      {
        path: "/applayout/accounts",
        Component: Accounts,
        index: true,
      },
      {
        path: "/applayout/movements",
        Component: Movements,
      },
      {
        path: "/applayout/transactions",
        Component: Transactions,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
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
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
