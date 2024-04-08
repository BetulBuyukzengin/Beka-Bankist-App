import Sidebar from "../../Components/DashboardLayout/DashboardLayout";
import Protected from "../../Components/Protected/Protected";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <Protected>
      <Sidebar />
      <Outlet />
    </Protected>
  );
}

export default AppLayout;
