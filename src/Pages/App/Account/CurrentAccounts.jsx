import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AppSlider from "../../../Components/AppSlider/AppSlider";
import CustomMenuIcon from "../../../Components/CustomMenuIcon/CustomMenuIcon";
import CustomModal from "../../../Components/CustomModal/CustomModal";
import AccountCreate from "./AccountCreate";
import AccountDelete from "./AccountDelete";
import { useSearchParams } from "react-router-dom";
import { media31_25em, media48em } from "../../../Constants/constants";

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
        }}
      >
        <Typography
          component="h3"
          sx={{
            backgroundColor: "var(--color-background)",
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
        <CustomMenuIcon contents={menuIconContents} />
      </Box>
      <AppSlider />
      <CustomModal open={openCreateAccount} setOpen={setOpenCreateAccount}>
        <AccountCreate setOpenCreateModal={setOpenCreateAccount} />
      </CustomModal>
      <CustomModal
        open={openDeleteAccount}
        setOpen={setOpenDeleteAccount}
        shouldClearParamsOnClose
        clearParamsCallBack={clearSearchParams}
      >
        <AccountDelete />
      </CustomModal>
    </>
  );
}

export default CurrentAccounts;
