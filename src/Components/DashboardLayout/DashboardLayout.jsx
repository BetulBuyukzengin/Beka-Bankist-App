/* eslint-disable react-refresh/only-export-components */
import { CurrencyExchange } from "@mui/icons-material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import TimelineIcon from "@mui/icons-material/Timeline";
import {
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { styled as muiStyled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { styled } from "styled-components";
import Protected from "../../Components/Protected/Protected";
import {
  dailyDepositLimit,
  dailyTransferLimit,
  dailyWithdrawLimit,
  drawerWidth,
  drawerWidth2,
  drawerWidth3,
  media31_25em,
  media48em,
} from "../../Constants/constants";
import { useDarkMode } from "../../Contexts/DarkModeContext";
import { useIsUserInformation } from "../../Hooks/useIsUserInformation";
import AppLayout from "../../Pages/App/AppLayout";
import {
  useDailyRemainingLimit,
  useGetAccounts,
} from "../../services/accountServices";
import { useUser } from "../../services/userServices";
import {
  calcRemainingLimitResetTime,
  generatePrimarySidebarTexts,
  generateTooltipTitles,
} from "../../utils/utils";
import CustomAvatar from "../Avatar/Avatar";
import AppListComponent from "../HamburgerDrawer/AppListComponent";
import HamburgerDrawer from "../HamburgerDrawer/HamburgerDrawer";
import ListIconButton from "./ListIconButton";
import { useCurrentUser } from "../../Hooks/useCurrentUser";
import AutoLogout from "../AutoLogout/AutoLogout";

export const IconStyle = {
  color: "var(--color-text)",
  "@media (max-width: 48em)": {
    fontSize: "1.2rem",
  },
  "@media (max-width: 31.25em)": {
    fontSize: "1rem",
  },
};
const StyledImg = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  margin-bottom: 0.5rem;
`;
export const StyledListItemText = styled(ListItemText)`
  & > span {
    ${media48em} {
      font-size: 0.8rem;
    }

    ${media31_25em} {
      font-size: 0.7rem;
    }
  }
`;

export const StyledListItemIcon = styled(ListItemIcon)`
  ${media48em} {
    min-width: 44px !important;
  }
  ${media31_25em} {
    min-width: 35px !important;
  }
`;
const openedMixin = () => ({
  width: drawerWidth,
  backgroundColor: "var(--color-background-2)",
  color: "var(--color-text)",
  overflowX: "hidden",
  "@media (max-width: 48em)": {
    width: drawerWidth2,
  },
  "@media (max-width: 31.25em)": {
    width: drawerWidth3,
  },
});

const closedMixin = (theme) => ({
  backgroundColor: "var(--color-background-2)",
  color: "var(--color-text)",
  overflowX: "hidden",
  width: `calc(${theme.spacing(6)} + 1px)`, //! width: calc(48px + 1px);
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
    "@media (max-width: 48em)": {
      width: `calc(100% - ${drawerWidth2}px)`,
    },
    "@media (max-width: 31.25em)": {
      width: `calc(100% - ${drawerWidth3}px)`,
    },
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
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { mutateAsync: updateDailyLimits } = useDailyRemainingLimit();
  const [endTime, setEndTime] = React.useState(false);
  const { accounts } = useGetAccounts();
  const { isInformationsCompleted } = useIsUserInformation();
  const { user } = useUser();
  const { currentUser } = useCurrentUser();

  // Drawer state
  const [openHamburgerDrawer, setOpenHamburgerDrawer] = React.useState(false);
  const toggleHamburgerDrawer = () => setOpenHamburgerDrawer((open) => !open);
  const toggleDrawer = () => setOpen(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const isMax48em = useMediaQuery("(max-width: 48em)");

  const sidebarContent = [
    {
      field: "Accounts",
      path: "/applayout/account",
      icon: <AccountBalanceWalletIcon sx={IconStyle} />,
    },
    {
      field: "Movements",
      path: "/applayout/movements",
      icon: <TimelineIcon sx={IconStyle} />,
    },
    {
      field: "Transactions",
      path: "/applayout/transactions",
      icon: <CurrencyExchange sx={IconStyle} />,
    },
    {
      field: "Settings",
      path: "/applayout/settings",
      icon: <SettingsSuggestIcon sx={IconStyle} />,
    },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    let intervalId;

    const updateLimits = () => {
      const remainingResetTime = calcRemainingLimitResetTime();
      if (remainingResetTime === "0 hours 00 minutes 00 seconds") {
        setEndTime(true);
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
          overflow: "hidden",
          backgroundColor: "var(--color-background)",
        }}
      >
        <AutoLogout />
        <CssBaseline />
        {/* Header */}
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
              [media48em]: {
                gap: ".5rem",
                paddingLeft: 0,
                paddingRight: 0,
              },
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                ...IconStyle,
                "@media (max-width: 48em)": {
                  display: "none",
                },
                marginRight: "auto",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon sx={IconStyle} />
            </IconButton>
            <HamburgerDrawer
              setOpen={setOpenHamburgerDrawer}
              open={openHamburgerDrawer}
              toggleDrawer={toggleHamburgerDrawer}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <StyledImg
                  src={
                    isDarkMode
                      ? "../../img/logo-dark.png"
                      : "../../img/logo-light.png"
                  }
                />
              </div>
              <AppListComponent
                toggleDrawer={toggleHamburgerDrawer}
                isInformationsCompleted={isInformationsCompleted}
                accounts={accounts}
                setUrlParams={setUrlParams}
              />
            </HamburgerDrawer>
            <CustomAvatar user={user} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                color: "var(--color-text)",
                "@media (max-width: 48em)": {
                  fontSize: ".9rem",
                  paddingRight: "1rem",
                },
                "@media (max-width: 31.25em)": {
                  fontSize: ".7rem",
                },
              }}
            >
              {currentUser?.fullName}
            </Typography>

            {/* <ListIconButton> */}
            {!isMax48em && (
              <>
                <ListItemIcon
                  onClick={toggleDarkMode}
                  sx={{ minWidth: "40px" }}
                >
                  {isDarkMode ? (
                    <DarkModeIcon
                      sx={{ fontSize: "1.2rem", cursor: "pointer" }}
                    />
                  ) : (
                    <LightModeIcon
                      sx={{ fontSize: "1.2rem", cursor: "pointer" }}
                    />
                  )}
                </ListItemIcon>

                <Link to="/signIn">
                  <LoginIcon sx={{ fontSize: "1.2rem" }} />
                </Link>
              </>
            )}
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            "@media (max-width:48em)": {
              display: "none",
            },
          }}
        >
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
          <div
            style={{
              width: "100%",
              display: !open ? "none" : "flex",
              justifyContent: "center",
            }}
          >
            <StyledImg
              src={
                isDarkMode
                  ? "../../img/logo-dark.png"
                  : "../../img/logo-light.png"
              }
            />
          </div>
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
              {sidebarContent.map((cont) => (
                <>
                  <Tooltip
                    key={cont.field}
                    placement="right"
                    arrow
                    title={generateTooltipTitles(
                      isInformationsCompleted,
                      accounts?.length,
                      cont.field
                    )}
                  >
                    <span>
                      <ListIconButton
                        onClick={() => {
                          toggleDrawer();
                          if (cont.field === "Transactions") setUrlParams();
                        }}
                        disabled={
                          !isInformationsCompleted ||
                          (cont.field === "Transactions" &&
                            accounts?.length === 0)
                        }
                        path={cont.path}
                      >
                        <StyledListItemIcon>{cont.icon}</StyledListItemIcon>
                        <StyledListItemText
                          primary={generatePrimarySidebarTexts(
                            accounts?.length,
                            cont.field
                          )}
                        />
                      </ListIconButton>
                    </span>
                  </Tooltip>
                </>
              ))}
            </ListItem>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: "1rem",
            backgroundColor: "var(--color-background)",
            color: "var(--color-text)",
            width: `calc(100% - ${drawerWidth}px)`,
            minHeight: "100dvh",
            "@media (max-width: 48em)": {
              width: `calc(100% - ${drawerWidth2}px)`,
              padding: "0.5rem",
            },
            "@media (max-width: 31.25em)": {
              width: `calc(100% - ${drawerWidth3}px)`,
            },
          }}
        >
          <DrawerHeader />
          <AppLayout />
        </Box>
      </Box>
    </Protected>
  );
}
