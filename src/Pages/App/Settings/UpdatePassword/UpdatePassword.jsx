import { Paper } from "@mui/material";
import CustomButton from "../../../../Components/CustomButton/CustomButton";
import CustomModal from "../../../../Components/CustomModal/CustomModal";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { useState } from "react";

function UpdatePassword() {
  const [openUpdatePasswordModal, setOpenUpdatePasswordModal] = useState(false);
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
        <p>Update your password</p>
        <CustomButton
          style={{ alignSelf: "center" }}
          buttonText="Update Password"
          onClick={() => setOpenUpdatePasswordModal(true)}
        />
      </Paper>
      <CustomModal
        open={openUpdatePasswordModal}
        setOpen={setOpenUpdatePasswordModal}
      >
        <UpdatePasswordForm />
      </CustomModal>
    </>
  );
}

export default UpdatePassword;
