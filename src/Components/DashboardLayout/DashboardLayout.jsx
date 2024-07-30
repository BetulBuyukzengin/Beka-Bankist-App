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
import ListIconButton from "./ListIconButton";
import TimelineIcon from "@mui/icons-material/Timeline";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CustomAvatar from "../Avatar/Avatar";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDarkMode } from "../../../src/Contexts/DarkModeContext";
import { styled } from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLogout, useUser } from "../../services/userServices";
import AppLayout from "../../Pages/App/AppLayout";
import Protected from "../../Components/Protected/Protected";
import { ListItemIcon, ListItemText } from "@mui/material";
import { CurrencyExchange } from "@mui/icons-material";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { calcRemainingLimitResetTime } from "../../utils/utils";
import {
  useDailyRemainingLimit,
  useGetAccounts,
} from "../../services/accountServices";
import {
  dailyDepositLimit,
  dailyTransferLimit,
  dailyWithdrawLimit,
} from "../../Constants/constants";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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

const openedMixin = () => ({
  width: drawerWidth,
  backgroundColor: "var(--color-background-2)",
  color: "var(--color-text)",
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

export default function DashboardLayout() {
  const { toggleDarkMode, isDarkMode } = useDarkMode();
  const { mutateAsync: logout } = useLogout();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { accounts, isLoading } = useGetAccounts();
  const { mutateAsync: updateDailyLimits } = useDailyRemainingLimit();
  const [endTime, setEndTime] = React.useState(false);
  const { user } = useUser();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     const remainingResetTime = calcRemainingLimitResetTime();

  //     if (remainingResetTime == "0 hours 00 minutes 00 seconds") {
  //       accounts.map((account) => {
  //         const updatedAccount = {
  //           ...account,
  //           remainingDepositLimit: dailyDepositLimit,
  //           remainingTransferLimit: dailyTransferLimit,
  //           remainingWithdrawLimit: dailyWithdrawLimit,
  //         };
  //         const id = account?.id;
  //         updateDailyLimits({ id, account: updatedAccount });
  //       });
  //     }
  //   }, 1000); // Her saniye kontrol et

  //   return () => clearInterval(interval);
  // }, [accounts, updateDailyLimits, isLimitResetTimeOver]);

  // React.useEffect(() => {
  //   let intervalId;

  //   const updateLimits = async () => {
  //     const remainingResetTime = calcRemainingLimitResetTime();
  //     if (remainingResetTime === "0 hours 00 minutes 00 seconds") {
  //       const id = account?.id;
  //       const updatedAccounts = accounts.map((account) => ({
  //         ...account,
  //         remainingDepositLimit: dailyDepositLimit,
  //         remainingTransferLimit: dailyTransferLimit,
  //         remainingWithdrawLimit: dailyWithdrawLimit,
  //       }));
  //       await updateDailyLimits({ id, updatedAccounts });
  //     }
  //   };

  //   const startInterval = () => {
  //     intervalId = setInterval(updateLimits, 1000);
  //   };

  //   startInterval();

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [accounts, updateDailyLimits]);

  React.useEffect(() => {
    let intervalId;

    const updateLimits = () => {
      const remainingResetTime = calcRemainingLimitResetTime();
      if (remainingResetTime === "0 hours 00 minutes 00 seconds") {
        setEndTime(true);
        // for (const account of accounts) {
        //   const updatedAccount = {
        //     ...account,
        //     remainingDepositLimit: dailyDepositLimit,
        //     remainingTransferLimit: dailyTransferLimit,
        //     remainingWithdrawLimit: dailyWithdrawLimit,
        //   };
        //   await updateDailyLimits({ id: account.id, account: updatedAccount });
        // }
      } else setEndTime(false);
    };

    const startInterval = () => {
      intervalId = setInterval(updateLimits, 1000);
    };

    startInterval();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(
    function () {
      async function updateLimits() {
        await Promise.all(
          accounts?.map(async (account) => {
            const updatedAccount = {
              ...account,
              remainingDepositLimit: dailyDepositLimit,
              remainingTransferLimit: dailyTransferLimit,
              remainingWithdrawLimit: dailyWithdrawLimit,
            };
            await updateDailyLimits({
              id: account.id,
              account: updatedAccount,
            });
          })
        );
      }
      if (endTime) updateLimits();
    },
    [endTime, accounts, updateDailyLimits]
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const setUrlParams = () => {
    searchParams.set("transactions-tab", 0);
    searchParams.set("recipient-account-tab", 0);
    searchParams.set("status", "Transfer");
    setSearchParams(searchParams);
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
              justifyContent: "end",
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
            <CustomAvatar user={user} />
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
              }}
            >
              {/* <ListIconButton path={"/applayout/accounts"}> */}
              <ListIconButton path="/applayout/account">
                <ListItemIcon>
                  <AccountBalanceWalletIcon
                    sx={{
                      color: "var(--color-text)",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  // primary="Accounts"
                  primary="Account Create"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListIconButton>
              <ListIconButton path={"/applayout/movements"}>
                <ListItemIcon>
                  <TimelineIcon
                    sx={{
                      color: "var(--color-text)",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Movements"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListIconButton>
              <ListIconButton
                path={"/applayout/transactions"}
                callback={setUrlParams}
              >
                <ListItemIcon>
                  <CurrencyExchange
                    sx={{
                      color: "var(--color-text)",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Transactions"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListIconButton>
              <ListIconButton path={"/applayout/settings"}>
                <ListItemIcon>
                  <SettingsSuggestIcon
                    sx={{
                      color: "var(--color-text)",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Settings"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListIconButton>
            </ListItem>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "var(--color-background)",
            color: "var(--color-text)",
            minHeight: "100dvh",
            width: "100dvh",
          }}
        >
          <DrawerHeader />
          <AppLayout />
        </Box>
      </Box>
    </Protected>
  );
}
