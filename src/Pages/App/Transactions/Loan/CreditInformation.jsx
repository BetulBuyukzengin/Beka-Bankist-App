import { Grid, TextField } from "@mui/material";
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

export default function CreditInformation() {
  return (
    <Grid
      xs={12}
      container
      spacing={3}
      sx={{
        display: "flex",
        // border: "1px solid var(--color-border-2)",
        paddingBottom: "1rem",
        paddingRight: "1rem",
      }}
    >
      <Grid item xs={6}>
        <StyledTextField
          id="outlined-basic"
          label="Loan Amount"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6}>
        <StyledTextField
          type="text"
          id="outlined-basic"
          label="Loan Purpose"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <StyledTextField
          type="text"
          id="outlined-basic"
          label="Kredi ödeme planı"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    </Grid>
  );
}