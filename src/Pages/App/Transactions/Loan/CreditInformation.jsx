import { Grid, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import {
  calculateAndFormatLoan,
  formatCurrency,
} from "../../../../utils/utils";

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
  const [paymentPlan, setPaymentPlan] = useState(1);
  const [loanAmount, setLoanAmount] = useState();

  const handlePlanChange = (event) => {
    setPaymentPlan(event.target.value);
  };

  function handleLoanAmountChange(e) {
    setLoanAmount(e.target.value);
  }
  return (
    <Grid
      xs={12}
      container
      spacing={3}
      sx={{
        display: "flex",
        paddingBottom: "1rem",
        paddingRight: "1rem",
      }}
    >
      <Grid item xs={6}>
        <StyledTextField
          value={loanAmount}
          onChange={handleLoanAmountChange}
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
            "&>fieldset": {
              borderColor: "var(--color-text)",
            },
          }}
          id="demo-customized-select-native"
          value={paymentPlan}
          onChange={handlePlanChange}
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
          <MenuItem value="">Loan payment plan</MenuItem>
          <MenuItem value={1}>
            {calculateAndFormatLoan(loanAmount, 0.02, 1 * 12)}
          </MenuItem>
          <MenuItem value={2}>
            {calculateAndFormatLoan(loanAmount, 0.02, 2 * 12)}
          </MenuItem>
          <MenuItem value={3}>
            {calculateAndFormatLoan(loanAmount, 0.02, 3 * 12)}
          </MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
}
