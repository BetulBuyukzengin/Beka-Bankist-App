import Protected from "../../Components/Protected/Protected";
import { Outlet } from "react-router-dom";
import { styled as styleComp } from "styled-components";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Time from "../../Components/Time/Time";

const StyledTime = styleComp.span`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background-color: var(--color-secondary);
  color: var(--color-text);
  padding: 0.2rem 0.7rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  font-size: 0.8rem;
`;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
function AppLayout() {
  return (
    <Protected>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
        <StyledTime>
          <Time />
        </StyledTime>
      </Box>
    </Protected>
  );
}

export default AppLayout;
