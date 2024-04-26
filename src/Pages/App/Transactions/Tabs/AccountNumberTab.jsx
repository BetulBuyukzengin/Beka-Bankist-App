import { Grid, MenuItem, Select, TextField } from "@mui/material";

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

function AccountNumberTab() {
  const [bank, setBank] = useState("");
  const [branch, setBranch] = useState("");

  const handleBankChange = (event) => {
    setBank(event.target.value);
  };
  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };

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
        <Grid item xs={6}>
          <Select
            sx={{ color: "var(--color-text)" }}
            id="demo-customized-select-native"
            value={bank}
            onChange={handleBankChange}
            fullWidth
            displayEmpty
            MenuProps={{
              anchorOrigin: {
                horizontal: "center",
                vertical: "bottom",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "center",
              },
              getContentAnchorEl: null,
              PaperProps: {
                style: {
                  maxHeight: 200,
                  width: 20,
                  left: "200px",
                  horizontal: "center",
                  backgroundColor: "var(--color-background-2)",
                  color: "var(--color-text)",
                },
              },
            }}
          >
            <MenuItem value="">Select Bank</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <Select
            sx={{
              "&&": {
                width: "40%",
                backgroundColor: "transparent",
                color: "var(--color-text)",
                "&:hover > fieldset ": {
                  borderColor: "var(--color-text) !important",
                },
              },
              // "&:hover &>fieldset": {
              //   borderColor: "var(--color-text)!important",
              // },
              "&>fieldset": {
                borderColor: "var(--color-text)",
              },
            }}
            id="demo-customized-select-native"
            value={branch}
            onChange={handleBranchChange}
            fullWidth
            displayEmpty
            MenuProps={{
              anchorOrigin: {
                horizontal: "center",
                vertical: "bottom",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "center",
              },
              getContentAnchorEl: null,
              PaperProps: {
                style: {
                  maxHeight: 200,
                  width: 20,
                  left: "200px",
                  horizontal: "center",
                  backgroundColor: "var(--color-background-2)",
                  color: "var(--color-text)",
                },
              },
            }}
          >
            <MenuItem value="">Select Branch</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <StyledTextField
            id="outlined-basic"
            label="IBAN"
            variant="outlined"
            defaultValue="TR"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <StyledTextField
            id="outlined-basic"
            label="Full Name"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default AccountNumberTab;
