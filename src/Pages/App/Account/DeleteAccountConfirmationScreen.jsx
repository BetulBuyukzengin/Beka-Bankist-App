/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import Loader from "../../../Components/Loader/Loader";
import { useDeleteAccount } from "../../../services/accountServices";
import { formatIBAN } from "../../../utils/utils";
import styled from "styled-components";
import { media31_25em, media48em } from "../../../Constants/constants";

const StyledConfirmationContent = styled.p`
  /* width: 70% */
  font-size: 1.2rem;
  text-align: start;

  ${media48em} {
    font-size: 0.9rem;
  }
  ${media31_25em} {
    font-size: 0.8rem;
  }
`;
function DeleteAccountConfirmationScreen({
  setOpen,
  clearParamsCallBack,
  onSubmit,
}) {
  const { handleSubmit } = useForm();
  const [searchParams] = useSearchParams();
  const accountToDelete = JSON.parse(searchParams.get("selectedAccount"));
  const { isPending } = useDeleteAccount();

  if (isPending) return <Loader />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        sx={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <StyledConfirmationContent>
            <strong>{formatIBAN(accountToDelete.accountNumber)}</strong> hesap
            numaralı
            <strong> {formatIBAN(accountToDelete.iban)}</strong> iban nolu
            hesabınızı kapatmak istediğinizden emin misiniz?
          </StyledConfirmationContent>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <CustomButton
            buttonText="Cancel"
            onClick={() => {
              setOpen(false);
              clearParamsCallBack();
            }}
            style={{
              [media48em]: {
                fontSize: ".7rem",
              },
              [media31_25em]: {
                fontSize: ".6rem",
              },
            }}
          />
          <CustomButton
            buttonText="Delete"
            type="submit"
            style={{
              [media48em]: {
                fontSize: ".7rem",
              },
              [media31_25em]: {
                fontSize: ".6rem",
              },
            }}
          />
        </Grid>
      </Grid>
    </form>
  );
}

export default DeleteAccountConfirmationScreen;
