import * as React from "react";
import { styled as muiStyled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CustomAvatar from "../Avatar/Avatar";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDarkMode } from "../../../src/Contexts/DarkModeContext";
import { styled } from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLogout, useUser } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../Pages/App/AppLayout";
import Protected from "../../Components/Protected/Protected";

const drawerWidth = 240;

const StyledLink = styled.a`
  border: none;
  color: var(--color-text);
  background-color: transparent;

  &:hover {
    color: var(--color-primary);
    transform: translateY(-2px);
    cursor: pointer;
  }

  &:active {
    transform: translateY(0);
  }
`;
const StyledButton = styled.button`
  border: none;
  color: var(--color-text);
  background-color: transparent;

  &:hover {
    color: var(--color-primary);
    transform: translateY(-2px);
    cursor: pointer;
  }

  &:active {
    transform: translateY(0);
  }
`;

const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: "var(--color-background-2)",
  color: "var(--color-text)",
  // transition: theme.create("width", {
  //   easing: theme.transitions.easing.sharp,
  //   duration: theme.transitions.duration.enteringScreen,
  // }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  backgroundColor: "var(--color-background-2)",
  color: "var(--color-text)",
  // transition: theme.transitions.create("width", {
  //   easing: theme.transitions.easing.sharp,
  //   duration: theme.transitions.duration.leavingScreen,
  // }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = muiStyled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = muiStyled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions?.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    // display: "block",
    transition: theme.transitions?.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = muiStyled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: "var(--color-background)",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const { toggleDarkMode, isDarkMode } = useDarkMode();
  const { isLoading, mutateAsync: logout } = useLogout();
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // const heightTitle = "32.5px";
  // const heightMain = `calc(100vh - ${heightTitle})`;

  const { user } = useUser();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Protected>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "var(--color-background)",
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{
            backgroundColor: "var(--color-background)",
            color: "var(--color-text)",
          }}
        >
          <Toolbar
            sx={{
              gap: "1.5rem",
              display: "flex",
              backgroundColor: "var(--color-background)",
              color: "var(--color-text)",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: "auto",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <CustomAvatar />
            <Typography variant="h6" noWrap component="div">
              {user?.user_metadata?.fullName}
            </Typography>

            <StyledLink onClick={toggleDarkMode}>
              {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
            </StyledLink>
            <StyledButton onClick={logout}>
              <LogoutIcon />
            </StyledButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton
              onClick={handleDrawerClose}
              sx={{
                color: "var(--color-text)",
              }}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider
            variant="fullWidth "
            sx={{ borderColor: "var(--color-text)" }}
          />
          <List>
            <ListItem
              disablePadding
              sx={{
                display: "block",
                // backgroundColor: "var(--color-background)",
                // color: "var(--color-text)",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate("/applayout/account")}
              >
                <ListItemIcon sx={{ justifyContent: "center" }}>
                  <AccountBalanceWalletIcon
                    sx={{
                      color: "var(--color-text)",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Accounts"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          {/* <Divider /> */}
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "var(--color-background)",
            color: "var(--color-text)",
            height: "100dvh",
          }}
        >
          <DrawerHeader />
          <AppLayout />
        </Box>
      </Box>
    </Protected>
  );
}
