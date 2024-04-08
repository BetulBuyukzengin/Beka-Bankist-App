import { DarkModeProvider } from "./Contexts/DarkModeContext.jsx";
import GlobalStyles from "./styles/GlobalStyles";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Pages/App/Login/Login.jsx";
import Presentational from "./Pages/Presentational/Presentational.jsx";
import CreateAccount from "./Pages/App/CreateAccount/CreateAccount.jsx";
import AppLayout from "./Pages/App/AppLayout.jsx";
import Account from "./Pages/App/Account/Account.jsx";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import Protected from "./Components/Protected/Protected.jsx";

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
        index: true,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
