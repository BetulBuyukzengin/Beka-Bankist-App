import { Outlet } from "react-router-dom";
import Time from "../../Components/Time/Time";

function AppLayout() {
  return (
    <>
      <Outlet />
      <Time />
    </>
  );
}

export default AppLayout;
