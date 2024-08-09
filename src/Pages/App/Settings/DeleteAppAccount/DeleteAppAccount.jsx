import { Paper } from "@mui/material";
import DeleteAppAccountForm from "./DeleteAppAccountForm";
import CustomButton from "../../../../Components/CustomButton/CustomButton";
import { useState } from "react";
import CustomModal from "../../../../Components/CustomModal/CustomModal";

function DeleteAppAccount() {
  const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);
  return (
    <>
      <Paper
        sx={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          backgroundColor: "var(--color-background)",
          border: "1px solid var(--color-gray)",
          color: "var(--color-text)",
        }}
      >
        <p>Delete your account</p>
        <CustomButton
          style={{ alignSelf: "center" }}
          buttonText="Delete Account"
          onClick={() => setOpenDeleteAccountModal(true)}
        />
      </Paper>
      <CustomModal
        open={openDeleteAccountModal}
        setOpen={setOpenDeleteAccountModal}
      >
        <DeleteAppAccountForm />
      </CustomModal>
    </>
  );
}

export default DeleteAppAccount;
