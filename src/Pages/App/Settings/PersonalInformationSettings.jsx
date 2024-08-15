import { Paper } from "@mui/material";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import CustomModal from "../../../Components/CustomModal/CustomModal";
import UpdatePersonalInformationForm from "./UpdatePersonalInformation/UpdatePersonalInformationForm";
import { useState } from "react";

function PersonalInformationSettings() {
  const [
    openUpdatePersonalInformationModal,
    setOpenUpdatePersonalInformationModal,
  ] = useState();
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
        <p>Update personal information to use Beka Bankist</p>
        <CustomButton
          style={{ alignSelf: "center" }}
          buttonText="Update User"
          onClick={() => setOpenUpdatePersonalInformationModal(true)}
        />
      </Paper>
      <CustomModal
        paddingSize="1rem 1.5rem"
        open={openUpdatePersonalInformationModal}
        setOpen={setOpenUpdatePersonalInformationModal}
      >
        <UpdatePersonalInformationForm
          setOpen={setOpenUpdatePersonalInformationModal}
        />
      </CustomModal>
    </>
  );
}

export default PersonalInformationSettings;
