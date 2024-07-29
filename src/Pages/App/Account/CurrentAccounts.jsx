import { useState } from "react";
import AppSlider from "../../../Components/AppSlider/AppSlider";
import CustomModal from "../../../Components/CustomModal/CustomModal";
import AccountCreate from "./AccountCreate";
import { Box } from "@mui/material";
import CustomMenuIcon from "../../../Components/CustomMenuIcon/CustomMenuIcon";
import AccountDelete from "./AccountDelete";

function CurrentAccounts() {
  const [open, setOpen] = useState(false);
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);
  return (
    <>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <h3
          style={{
            backgroundColor: "var(--color-background)",
            color: "var(--color-text)",
            marginRight: "auto",
            marginLeft: "auto",
            marginBottom: 0,
          }}
        >
          MY ACCOUNTS
        </h3>
        <CustomMenuIcon
          setOpen={setOpen}
          setOpenDeleteAccount={setOpenDeleteAccount}
        />
      </Box>
      <AppSlider />
      <CustomModal open={open} setOpen={setOpen}>
        <AccountCreate setOpenCreateModal={setOpen} />
      </CustomModal>
      <CustomModal open={openDeleteAccount} setOpen={setOpenDeleteAccount}>
        <AccountDelete />
      </CustomModal>
    </>
  );
}

export default CurrentAccounts;
