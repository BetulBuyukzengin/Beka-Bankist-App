import { Grid } from "@mui/material";
import { useState } from "react";
import { calculateAndFormatLoan } from "../../../../../utils/utils";
import CustomSelect from "../../../../../Components/CustomSelect/CustomSelect";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";

export default function CreditInformation() {
  const [paymentPlan, setPaymentPlan] = useState("");
  const [loanAmount, setLoanAmount] = useState();

  const loanPaymentPlan = [
    {
      content: "Loan Payment Plan",
      value: "",
    },
    {
      content: calculateAndFormatLoan(loanAmount, 0.02, 1 * 12),
      value: "1",
    },
    {
      content: calculateAndFormatLoan(loanAmount, 0.02, 2 * 12),
      value: "2",
    },
    {
      content: calculateAndFormatLoan(loanAmount, 0.02, 3 * 12),
      value: "3",
    },
  ];

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
        <CustomTextField
          type="number"
          value={loanAmount}
          onChange={handleLoanAmountChange}
          id="loanAmount"
          label="Loan Amount"
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField id="loanPurpose" label="Loan Purpose" />
      </Grid>
      <Grid item xs={6}>
        <CustomSelect
          data={loanPaymentPlan}
          handleChange={handlePlanChange}
          value={paymentPlan}
          disabled={!loanAmount}
        />
      </Grid>
    </Grid>
  );
}
