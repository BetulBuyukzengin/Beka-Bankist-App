import { Grid } from "@mui/material";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

function Deposit() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [searchParams] = useSearchParams();
  const selectedAccount = JSON.parse(searchParams.get("selectedAccount"));
  console.log(selectedAccount);
  return (
    <Grid container sx={{ padding: "1rem" }}>
      <Grid item xs={12}>
        <CustomTextField
          width="short"
          id="depositMoney"
          label="Amount to be deposit"
          type="number"
          register={{
            ...register("amountToBeDepositMyAccount"),
          }}
          helperText={errors?.amountToBeDepositMyAccount?.message}
          error={errors?.amountToBeDepositMyAccount}
        />
      </Grid>
    </Grid>
  );
}

export default Deposit;
