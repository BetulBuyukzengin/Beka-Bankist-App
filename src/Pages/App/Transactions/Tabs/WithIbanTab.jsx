import { FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import styled from "styled-components";

const StyledTextField = styled(TextField)`
  width: 40%;
  &:hover > div > fieldset {
    border-color: var(--color-text) !important;
  }
  & > label {
    color: var(--color-text);
  }
  & > div {
    color: var(--color-text);
    & > fieldset {
      border-color: var(--color-text);
    }
  }
`;

function WithIbanTab() {
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          border: "1px solid var(--color-border-2)  ",
          paddingBottom: "1rem",
          paddingRight: "1rem",
        }}
      >
        <Grid item xs={6} sx={{ display: "flex", gap: "1rem" }}>
          <StyledTextField
            id="outlined-basic"
            label="IBAN"
            variant="outlined"
            fullWidth
            defaultValue="TR"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", gap: "1rem" }}>
          <StyledTextField
            id="outlined-basic"
            label="Full Name"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
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
