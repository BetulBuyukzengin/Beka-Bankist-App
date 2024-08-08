/* eslint-disable react/prop-types */
import { Divider, ListItemButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAccounts } from "../../services/accountServices.js";

function ListIconButton({ children, path, callback }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { accounts } = useGetAccounts();
  const isAccounts = accounts?.length > 0 ? false : true;
  return (
    <>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
        disabled={isAccounts}
        onClick={() => {
          if (path === pathname) return;
          navigate(path);
          callback();
        }}
      >
        {children}
      </ListItemButton>
      <Divider variant="fullWidth" sx={{ borderColor: "var(--color-text)" }} />
    </>
  );
}

export default ListIconButton;
