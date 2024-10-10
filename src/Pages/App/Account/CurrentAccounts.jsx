import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AppSlider from "../../../Components/AppSlider/AppSlider";
import CustomMenuIcon from "../../../Components/CustomMenuIcon/CustomMenuIcon";
import CustomModal from "../../../Components/CustomModal/CustomModal";
import { media31_25em, media48em } from "../../../Constants/constants";
import AccountDelete from "./AccountDelete";
import BankAccountCreate from "./BankAccountCreate";

function CurrentAccounts() {
  const [openCreateAccount, setOpenCreateAccount] = useState(false);
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);

  const handleOpenCreateAccountModal = () => {
    setOpenCreateAccount(true);
  };
  const handleOpenDeleteAccountModal = () => {
    setOpenDeleteAccount(true);
  };
  const menuIconContents = [
    {
      openModal: handleOpenCreateAccountModal,
      label: "New Account",
    },
    {
      openModal: handleOpenDeleteAccountModal,
      label: "Delete Account",
    },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const clearSearchParams = () => {
    if (searchParams.has("selectedAccount")) {
      searchParams.delete("selectedAccount");
      setSearchParams(searchParams);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          paddingTop: "1rem",
        }}
      >
        <Typography
          component="h3"
          sx={{
            // backgroundColor: "var(--color-background)",
            backgroundColor: "transparent",
            color: "var(--color-text)",
            marginRight: "auto",
            marginLeft: "auto",
            marginBottom: 0,
            fontSize: "1.5rem",
            fontWeight: "bold",

            [media48em]: {
              fontSize: "1.2rem",
            },
            [media31_25em]: {
              fontSize: "1rem",
            },
          }}
        >
          MY ACCOUNTS
        </Typography>
        <CustomMenuIcon contents={menuIconContents} isAccountsPage />
      </Box>
      <AppSlider />
      <CustomModal
        open={openCreateAccount}
        setOpen={setOpenCreateAccount}
        modalBoxStyles={{
          [media48em]: {
            width: "100%",
            maxHeight: "100dvh",
            padding: "1.5rem .8rem",
            border: "none",
          },
        }}
      >
        <BankAccountCreate setOpenCreateModal={setOpenCreateAccount} />
      </CustomModal>
      <CustomModal
        open={openDeleteAccount}
        setOpen={setOpenDeleteAccount}
        shouldClearParamsOnClose
        clearParamsCallBack={clearSearchParams}
        modalBoxStyles={{
          maxHeight: "90dvh",
          maxWidth: "43rem",
          height: "auto",
        }}
        title="Your Accounts"
      >
        <AccountDelete />
      </CustomModal>
    </>
  );
}

export default CurrentAccounts;
