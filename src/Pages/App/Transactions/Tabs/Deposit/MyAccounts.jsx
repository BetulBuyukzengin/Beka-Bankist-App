import { Grid } from "@mui/material";
import SenderAccount from "../Transfer/SenderAccount";
function MyAccounts() {
  return (
    <Grid
      container
      sx={{
        width: "100%",
      }}
    >
      <Grid item xs={12}>
        <SenderAccount />
      </Grid>
    </Grid>
  );
}

export default MyAccounts;
