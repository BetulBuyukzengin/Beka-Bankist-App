/* eslint-disable react/prop-types */
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Sling } from "hamburger-react"; // icon animation
import { useState } from "react";
import { Tooltip } from "@mui/material";
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

function HamburgerDrawer({ isInformationsCompleted, accounts, setUrlParams }) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen((open) => !open);
  return (
    <span
      style={{
        "@media (max-width:48em)": {
          display: "block",
        },
      }}
    >
      <Sling
        label="appSidebar"
        rounded
        size={18}
        color="var(--color-text)"
        toggle={setOpen}
        toggled={open}
      />
      <Drawer
        style={{
          width: "10rem",
        }}
        lockBackgroundScroll
        open={open}
        onClose={toggleDrawer}
        direction="left"
      >
        <span style={{ display: "flex", justifyContent: "end" }}>
          <Sling
            label="appSidebar"
            rounded
            size={18}
            color="var(--color-text)"
            toggle={setOpen}
            toggled={open}
          />
        </span>
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
                <ListIconButton path={"/applayout/settings"}>
                  <StyledListItemIcon>
                    <SettingsSuggestIcon sx={IconStyle} />
                  </StyledListItemIcon>
                  <StyledListItemText primary="Settings" />
                </ListIconButton>
              </span>
            </Tooltip>
          </ListItem>
        </List>
      </Drawer>
    </span>
  );
}

export default HamburgerDrawer;
