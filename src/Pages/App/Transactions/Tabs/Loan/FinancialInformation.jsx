import { Grid } from "@mui/material";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";

export default function FinancialInformation() {
  const { register, formState } = useFormContext();
  const { errors } = formState;

  return (
    <Grid
      container
      spacing={3}
      sx={{
        display: "flex",
        paddingBottom: "1rem",
        paddingRight: "1rem",
      }}
    >
      <Grid item xs={6}>
        <CustomTextField
          id="totalIncome"
          label="Total Income"
          register={{
            ...register("applicantTotalIncome", {
              required: "This field is required!",
            }),
          }}
          helperText={errors?.applicantTotalIncome?.message}
          error={errors?.applicantTotalIncome}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField
          type="text"
          id="totalExpense"
          label="Total Expense"
          register={{
            ...register("applicantTotalExpense", {
              required: "This field is required!",
            }),
          }}
          helperText={errors?.applicantTotalExpense?.message}
          error={errors?.applicantTotalExpense}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField
          type="text"
          id="-basic"
          label="Current Debts"
          register={{
            ...register("applicantCurrentDepts", {
              required: "This field is required",
            }),
          }}
          helperText={errors?.applicantCurrentDepts?.message}
          error={errors?.applicantCurrentDepts}
        />
      </Grid>
    </Grid>
  );
}
