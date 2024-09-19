/* eslint-disable react/prop-types */
import { Paper } from "@mui/material";
import styled from "styled-components";
import CustomButton from "../CustomButton/CustomButton";
import CustomModal from "../CustomModal/CustomModal";
import { media84_37em } from "../../Constants/constants";

const StyledTitle = styled.p`
  @media (max-width: 48em) {
    font-size: 0.8rem;
  }
  @media (max-width: 31.25em) {
    font-size: 0.7rem;
  }
`;
function CustomSettingsContent({
  title,
  buttonText,
  FormComponent,
  formProps, // FormComponent'e geçilecek ek prop'lar
}) {
  if (!formProps) return;
  const { openModal, setOpenModal } = formProps;
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
          "@media (max-width:48em)": {
            padding: ".8rem",
          },
        }}
      >
        <StyledTitle>{title}</StyledTitle>

        <CustomButton
          style={{
            alignSelf: "center",
            [media84_37em]: {
              width: "100%",
            },
            "@media (max-width:48em)": {
              fontSize: ".7rem",
            },
            "@media (max-width:31.25em)": {
              fontSize: ".6rem",
            },
          }}
          buttonText={buttonText}
          onClick={() => setOpenModal(true)}
        />
      </Paper>
      <CustomModal
        paddingSize="1rem 1.5rem"
        open={openModal}
        setOpen={setOpenModal}
      >
        {FormComponent && (
          <FormComponent setOpenModal={setOpenModal} {...formProps} />
        )}
      </CustomModal>
    </>
  );
}

export default CustomSettingsContent;
