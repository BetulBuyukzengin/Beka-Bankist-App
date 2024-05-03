import { Grid } from "@mui/material";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";

export default function FinancialInformation() {
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
        <CustomTextField id="totalIncome" label="Total Income" />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField type="text" id="totalExpense" label="Total Expense" />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField type="text" id="-basic" label="Current Debts" />
      </Grid>
    </Grid>
  );
}
