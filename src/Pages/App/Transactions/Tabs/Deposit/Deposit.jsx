import { Grid } from "@mui/material";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";

function Deposit() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid container sx={{ padding: "1rem" }}>
      <Grid item xs={12}>
        <CustomTextField
          id="depositMoney"
          label="Amount to be deposit"
          type="number"
          register={{ ...register("amountToBeDepositMyAccount") }}
          helperText={errors?.amountToBeDepositMyAccount?.message}
          error={errors?.amountToBeDepositMyAccount}
        />
      </Grid>
    </Grid>
  );
}

export default Deposit;
