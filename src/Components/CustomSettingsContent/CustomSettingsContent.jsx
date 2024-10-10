/* eslint-disable react/prop-types */
import { Paper } from "@mui/material";
import styled from "styled-components";
import CustomButton from "../CustomButton/CustomButton";
import CustomModal from "../CustomModal/CustomModal";
import { media48em, media84_37em } from "../../Constants/constants";

const StyledTitle = styled.p`
  font-size: 1.2rem;

  @media (max-width: 48em) {
    font-size: 1rem;
  }
  @media (max-width: 31.25em) {
    font-size: 0.8rem;
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
          backgroundColor: "transparent!important",
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
            fontSize: "1.1rem",
            [media84_37em]: {
              width: "100%",
            },
            "@media (max-width:48em)": {
              fontSize: ".8rem",
            },
            "@media (max-width:31.25em)": {
              fontSize: ".7rem",
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
        modalBoxStyles={{
          padding: ".5rem",
          height: "100dvh",
          [media48em]: {
            maxHeight: "100dvh",
            width: "100%",
            border: "none",
          },
        }}
      >
        {FormComponent && (
          <FormComponent setOpenModal={setOpenModal} {...formProps} />
        )}
      </CustomModal>
    </>
  );
}

export default CustomSettingsContent;
