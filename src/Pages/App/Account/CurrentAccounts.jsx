import { useState } from "react";
import AppSlider from "../../../Components/AppSlider/AppSlider";
import CustomModal from "../../../Components/CustomModal/CustomModal";
import AccountCreate from "./AccountCreate";
import { Box } from "@mui/material";
import CustomMenuIcon from "../../../Components/CustomMenuIcon/CustomMenuIcon";

function CurrentAccounts() {
  const [open, setOpen] = useState(false);
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
        <CustomMenuIcon setOpen={setOpen} />
      </Box>
      <AppSlider />
      <CustomModal open={open} setOpen={setOpen}>
        <AccountCreate />
      </CustomModal>
    </>
  );
}

export default CurrentAccounts;
