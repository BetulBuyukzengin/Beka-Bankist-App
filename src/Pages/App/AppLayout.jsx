import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    // <main style={{ height: "max-content" }}>
    <Outlet />
    // </main>
  );
}

export default AppLayout;
