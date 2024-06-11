import { Grid } from "@mui/material";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";
function Withdraw() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Grid container sx={{ padding: "1rem" }}>
      <Grid item xs={12}>
        <CustomTextField
          type="number"
          id="loadMoney"
          label="Amount to withdraw"
          register={{ ...register("amountToWithdrawMyAccount") }}
          helperText={errors?.amountToWithdrawMyAccount?.message}
          error={errors?.amountToWithdrawMyAccount}
        />
      </Grid>
    </Grid>
  );
}

export default Withdraw;
