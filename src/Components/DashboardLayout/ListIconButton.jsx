/* eslint-disable react/prop-types */
import { Divider, ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ListIconButton({ children, path }) {
  const navigate = useNavigate();
  return (
    <>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
        onClick={() => navigate(path)}
      >
        {children}
      </ListItemButton>
      <Divider variant="fullWidth " sx={{ borderColor: "var(--color-text)" }} />
    </>
  );
}

export default ListIconButton;
