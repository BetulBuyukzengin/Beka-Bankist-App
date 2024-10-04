import { CurrencyExchange } from "@mui/icons-material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ListItemIcon, Tooltip } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useDarkMode } from "../../Contexts/DarkModeContext";
import { useLogout } from "../../services/userServices";
import { generatePrimarySidebarTexts } from "../../utils/utils";
import {
  IconStyle,
  StyledListItemIcon,
  StyledListItemText,
} from "../DashboardLayout/DashboardLayout";
import ListIconButton from "../DashboardLayout/ListIconButton";

function AppListComponent({
  isInformationsCompleted,
  accounts,
  setUrlParams,
  toggleDrawer,
}) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { mutateAsync: logout } = useLogout();

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
  return (
    <List>
      <ListItem
        disablePadding
        sx={{
          display: "block",
        }}
      >
        {sidebarContent.map((cont) => (
          <Tooltip
            key={cont.field}
            placement="right"
            arrow
            title={(isInformationsCompleted, accounts?.length, cont.field)}
            // title={
            //   !isInformationsCompleted
            //     ? "Complete your personal information before starting"
            //     : !accounts?.length
            //     ? "Create Account"
            //     : "Accounts"
            // }
          >
            <span>
              <ListIconButton
                onClick={() => {
                  toggleDrawer();
                  if (cont.field === "Transactions") setUrlParams();
                }}
                disabled={
                  !isInformationsCompleted ||
                  (cont.field === "Transactions" && accounts?.length === 0)
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
        ))}

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
          <ListItemIcon onClick={toggleDarkMode} sx={{ minWidth: "40px" }}>
            {isDarkMode ? (
              <DarkModeIcon sx={{ fontSize: "1.2rem", cursor: "pointer" }} />
            ) : (
              <LightModeIcon sx={{ fontSize: "1.2rem", cursor: "pointer" }} />
            )}
          </ListItemIcon>

          <button
            onClick={logout}
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            <LogoutIcon sx={{ fontSize: "1.2rem" }} />
          </button>
        </span>
      </ListItem>
    </List>
  );
}

export default AppListComponent;
