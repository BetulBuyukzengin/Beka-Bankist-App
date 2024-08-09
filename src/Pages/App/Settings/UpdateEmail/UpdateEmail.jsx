import { Paper } from "@mui/material";
import CustomButton from "../../../../Components/CustomButton/CustomButton";
import CustomModal from "../../../../Components/CustomModal/CustomModal";
import UpdateEmailAdressForm from "./UpdateEmailAdressForm";
import { useState } from "react";

function UpdateEmail() {
  const [openUpdateEmailModal, setOpenUpdateEmailModal] = useState(false);

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
        <p>Update email address by confirming from existing email</p>
        {/* E-posta adresini mevcut e-postadan onaylayarak güncelle */}
        <CustomButton
          style={{ alignSelf: "center" }}
          buttonText="Update Email"
          onClick={() => setOpenUpdateEmailModal(true)}
        />
      </Paper>
      <CustomModal
        paddingSize="1rem 1.5rem"
        open={openUpdateEmailModal}
        setOpen={setOpenUpdateEmailModal}
      >
        <UpdateEmailAdressForm />
      </CustomModal>
    </>
  );
}

export default UpdateEmail;
