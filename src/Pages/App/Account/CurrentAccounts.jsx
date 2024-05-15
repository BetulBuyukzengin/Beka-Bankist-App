import { useState } from "react";
import AppSlider from "../../../Components/AppSlider/AppSlider";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import CustomModal from "../../../Components/CustomModal/CustomModal";
import AccountCreate from "./AccountCreate";

function CurrentAccounts() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <h3
        style={{
          backgroundColor: "var(--color-background)",
          color: "var(--color-text)",
          textAlign: "center",
          marginBottom: 0,
          paddingTop: "1rem",
        }}
      >
        MY ACCOUNTS
      </h3>
      <AppSlider />
      <CustomButton onClick={() => setOpen(true)} buttonText="New Account" />
      <CustomModal open={open} setOpen={setOpen}>
        <AccountCreate />
      </CustomModal>
    </>
  );
}

export default CurrentAccounts;
