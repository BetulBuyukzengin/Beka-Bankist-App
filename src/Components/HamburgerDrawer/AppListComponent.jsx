import { Divider, Tooltip } from "@mui/material";
import {
  IconStyle,
  StyledListItemIcon,
  StyledListItemText,
} from "../DashboardLayout/DashboardLayout";
import ListIconButton from "../DashboardLayout/ListIconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TimelineIcon from "@mui/icons-material/Timeline";
import { CurrencyExchange } from "@mui/icons-material";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { Link } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LoginIcon from "@mui/icons-material/Login";
import { useDarkMode } from "../../Contexts/DarkModeContext";
import { ListItemIcon } from "@mui/material";

function AppListComponent({
  isInformationsCompleted,
  accounts,
  setUrlParams,
  toggleDrawer,
}) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <List>
      <ListItem
        disablePadding
        sx={{
          display: "block",
        }}
      >
        {/* <ListIconButton path={"/applayout/accounts"}> */}
        <Tooltip
          placement="right"
          arrow
          title={
            !isInformationsCompleted
              ? "Complete your personal information before starting"
              : !accounts?.length
              ? "Create Account"
              : "Accounts"
          }
        >
          <span>
            <ListIconButton
              onClick={toggleDrawer}
              disabled={!isInformationsCompleted}
              path="/applayout/account"
            >
              <StyledListItemIcon>
                <AccountBalanceWalletIcon sx={IconStyle} />
              </StyledListItemIcon>
              <StyledListItemText
                primary={!accounts?.length ? "Create Account" : "Accounts"}
              />
            </ListIconButton>
          </span>
        </Tooltip>
        <Tooltip
          placement="right"
          arrow
          title={
            !isInformationsCompleted
              ? "Complete your personal information before starting"
              : "Movements"
          }
        >
          <span>
            <ListIconButton
              onClick={toggleDrawer}
              disabled={!isInformationsCompleted}
              path={"/applayout/movements"}
            >
              <StyledListItemIcon>
                <TimelineIcon sx={IconStyle} />
              </StyledListItemIcon>
              <StyledListItemText primary="Movements" />
            </ListIconButton>
          </span>
        </Tooltip>
        <Tooltip
          placement="right"
          arrow
          title={
            !isInformationsCompleted
              ? "Complete your personal information before starting"
              : !accounts?.length
              ? "Create a bank account before using transactions"
              : "Transactions"
          }
        >
          <span>
            <ListIconButton
              onClick={toggleDrawer}
              disabled={!isInformationsCompleted || !accounts?.length}
              path={"/applayout/transactions"}
              callback={setUrlParams}
              isTransactionButton
            >
              <StyledListItemIcon>
                <CurrencyExchange sx={IconStyle} />
              </StyledListItemIcon>
              <StyledListItemText primary="Transactions" />
            </ListIconButton>
          </span>
        </Tooltip>
        <Tooltip
          placement="right"
          arrow
          title={
            !isInformationsCompleted
              ? "Complete your personal information before starting"
              : "Settings"
          }
        >
          <span>
            <ListIconButton path={"/applayout/settings"} onClick={toggleDrawer}>
              <StyledListItemIcon>
                <SettingsSuggestIcon sx={IconStyle} />
              </StyledListItemIcon>
              <StyledListItemText primary="Settings" />
            </ListIconButton>
          </span>
        </Tooltip>

        {/* <span>
          <ListIconButton>
            <StyledListItemIcon onClick={toggleDarkMode}>
              {isDarkMode ? (
                <DarkModeIcon sx={{ fontSize: "1.2rem", cursor: "pointer" }} />
              ) : (
                <LightModeIcon sx={{ fontSize: "1.2rem", cursor: "pointer" }} />
              )}
            </StyledListItemIcon>

            <Link to="/signIn">
              <LoginIcon sx={{ fontSize: "1.2rem" }} />
            </Link>
          </ListIconButton>
        </span> */}
        <span
          style={{
            minHeight: "48px",
            px: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "74%",
          }}
        >
          {/* <ListIconButton> */}
          <ListItemIcon onClick={toggleDarkMode} sx={{ minWidth: "40px" }}>
            {isDarkMode ? (
              <DarkModeIcon sx={{ fontSize: "1.2rem", cursor: "pointer" }} />
            ) : (
              <LightModeIcon sx={{ fontSize: "1.2rem", cursor: "pointer" }} />
            )}
          </ListItemIcon>

          <Link to="/signIn">
            <LoginIcon sx={{ fontSize: "1.2rem" }} />
          </Link>
          {/* </ListIconButton> */}
        </span>
      </ListItem>
    </List>
  );
}

export default AppListComponent;
