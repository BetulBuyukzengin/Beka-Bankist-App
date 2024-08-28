import { Grid } from "@mui/material";
import SelectAccount from "../Transfer/SelectAccount";
function MyAccounts() {
  return (
    <Grid
      container
      sx={{
        width: "100%",
      }}
    >
      <Grid item xs={12}>
        <SelectAccount />
      </Grid>
    </Grid>
  );
}

export default MyAccounts;
