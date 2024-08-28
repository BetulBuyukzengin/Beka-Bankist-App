/* eslint-disable react/prop-types */
import { Divider, ListItemButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function ListIconButton({
  children,
  path,
  callback,
  isTransactionButton = false,
  disabled,
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
        disabled={disabled}
        onClick={() => {
          if (path === pathname) return;
          navigate(path);
          if (isTransactionButton) callback();
        }}
      >
        {children}
      </ListItemButton>
      <Divider variant="fullWidth" sx={{ borderColor: "var(--color-text)" }} />
    </>
  );
}

export default ListIconButton;
