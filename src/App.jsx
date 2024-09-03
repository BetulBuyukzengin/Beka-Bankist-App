import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DashboardLayout from "./Components/DashboardLayout/DashboardLayout.jsx";
import { DarkModeProvider } from "./Contexts/DarkModeContext.jsx";
import { LoanPaymentModalProvider } from "./Contexts/ModalContext.jsx";
import Account from "./Pages/App/Account/Account.jsx";
import AccountRecovery from "./Pages/App/AccountRecovery/AccountRecovery.jsx";
import Movements from "./Pages/App/Movements/Movements.jsx";
import Settings from "./Pages/App/Settings/Settings.jsx";
import SignIn from "./Pages/App/SignIn/SignIn.jsx";
import SignUp from "./Pages/App/SignUp/SignUp.jsx";
import Transactions from "./Pages/App/Transactions/Transactions.jsx";
import Presentational from "./Pages/Presentational/Presentational.jsx";
import GlobalStyles from "./styles/GlobalStyles";
import ForgotPassword from "./Pages/App/ForgotPassword/ForgotPassword.jsx";
import CreatePassword from "./Pages/App/ForgotPassword/CreatePassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Presentational,
  },
  {
    path: "/signIn",
    Component: SignIn,
  },
  {
    path: "/forgotPassword",
    Component: ForgotPassword,
  },
  {
    path: "/recreatePassword",
    Component: CreatePassword,
  },
  {
    path: "/accountRecovery",
    Component: AccountRecovery,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/applayout",
    Component: DashboardLayout,
    children: [
      {
        path: "/applayout/account",
        Component: Account,
      },
      {
        path: "/applayout/movements",
        Component: Movements,
      },
      {
        path: "/applayout/transactions",
        Component: Transactions,
      },
      {
        path: "/applayout/settings",
        Component: Settings,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

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
          <LoanPaymentModalProvider>
            <GlobalStyles />
            <RouterProvider router={router} />
          </LoanPaymentModalProvider>
        </DarkModeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
