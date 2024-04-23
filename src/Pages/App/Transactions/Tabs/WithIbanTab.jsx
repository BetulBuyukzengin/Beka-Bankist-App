import { FormControlLabel, Grid, Switch, TextField } from "@mui/material";

function WithIbanTab() {
  return (
    <>
      <Grid
        container
        sx={{ display: "flex", flexDirection: "column", alignItems: "end" }}
      >
        <Grid item sx={{ display: "flex", gap: "3rem" }}>
          <TextField
            id="outlined-basic"
            label="IBAN"
            variant="outlined"
            defaultValue="TR"
          />
          <TextField id="outlined-basic" label="Full Name" variant="outlined" />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Switch />}
            label="Add as registered recipient"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default WithIbanTab;
