import { Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
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

export default function PersonalInformation() {
  const [value, setValue] = useState(new Date());

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
          label="Full Name"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6}>
        <StyledTextField
          id="outlined-basic"
          label="Identification number"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <StyledTextField
          id="outlined-basic"
          label="Adress"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <StyledTextField
          id="outlined-basic"
          label="Phone number"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <DatePicker
          label="Birthday"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          sx={{
            width: "65%",
            "&:hover > div > fieldset": {
              borderColor: "var(--color-text)!important",
            },
            "&>label": {
              color: "var(--color-text)",
            },
            "&>div": {
              // backgroundColor: "pink",
              color: "var(--color-text)",
              // "&>button": {
              //   color: "var(--color-text)",
              // },
              "&>fieldset": {
                borderColor: "var(--color-text)",
              },
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
