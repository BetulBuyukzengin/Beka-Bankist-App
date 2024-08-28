import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import Loader from "../../../Components/Loader/Loader";
import { useDeleteAccount } from "../../../services/accountServices";
import { formatIBAN } from "../../../utils/utils";

function DeleteAccountConfirmationScreen({
  setOpen,
  clearParamsCallBack,
  onSubmit,
}) {
  const { handleSubmit } = useForm();
  const [searchParams] = useSearchParams();
  const accountToDelete = JSON.parse(searchParams.get("selectedAccount"));
  const { mutateAsync: deleteAccount, isPending } = useDeleteAccount();

  // const onSubmit = async () => {
  //   await deleteAccount(accountToDelete.id, {
  //     onSuccess: () => {
  //       setOpen(false);
  //       clearParamsCallBack();
  //     },
  //   });
  // };
  if (isPending) return <Loader />;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        sx={{
          display: "flex",
          textAlign: "center",
        }}
      >
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <p style={{ width: "70%" }}>
            <strong>{formatIBAN(accountToDelete.accountNumber)}</strong> hesap
            numaralı
            <strong> {formatIBAN(accountToDelete.iban)}</strong> iban nolu
            hesabınızı kapatmak istediğinizden emin misiniz?
          </p>
        </Grid>
        <Grid item xs={12}>
          <CustomButton
            buttonText="Cancel"
            onClick={() => {
              setOpen(false);
              clearParamsCallBack();
            }}
          />
          <CustomButton buttonText="Delete" type="submit" />
        </Grid>
      </Grid>
    </form>
  );
}

export default DeleteAccountConfirmationScreen;
