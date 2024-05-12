import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";

import { DarkModeProvider } from "./Contexts/DarkModeContext.jsx";
import GlobalStyles from "./styles/GlobalStyles";
import SignIn from "./Pages/App/SignIn/SignIn.jsx";
import Presentational from "./Pages/Presentational/Presentational.jsx";
import SignUp from "./Pages/App/SignUp/SignUp.jsx";
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
    path: "/signIn",
    Component: SignIn,
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
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signup" Component={SignUp} />
          </Routes>
        </BrowserRouter> */}
        </DarkModeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
