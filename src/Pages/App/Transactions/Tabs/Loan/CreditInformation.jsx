import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { calculateAndFormatLoan } from "../../../../../utils/utils";
import CustomSelect from "../../../../../Components/CustomSelect/CustomSelect";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

export default function CreditInformation() {
  const [paymentPlan, setPaymentPlan] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const { register, formState, watch } = useFormContext();
  const { errors } = formState;
  const [searchParams, setSearchParams] = useSearchParams();
  const watchApplicantPaymentPlan = watch("applicantPaymentPlan");
  console.log(watchApplicantPaymentPlan);
  useEffect(
    function () {
      if (
        watchApplicantPaymentPlan !== "" &&
        watchApplicantPaymentPlan !== undefined
      ) {
        searchParams.set("applicantPaymentPlan", watchApplicantPaymentPlan);
        setSearchParams(searchParams);
      }
    },
    [searchParams, setSearchParams, watchApplicantPaymentPlan]
  );
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
    if (!e.target.value) setPaymentPlan("");
  }
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
        <CustomTextField
          type="number"
          value={loanAmount}
          onChange={handleLoanAmountChange}
          id="loanAmount"
          label="Loan Amount"
          register={{
            ...register("applicantLoanAmount", {
              required: "This field is required!",
            }),
          }}
          helperText={errors?.applicantLoanAmount?.message}
          error={errors?.applicantLoanAmount}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField
          id="loanPurpose"
          label="Loan Purpose"
          register={{
            ...register("applicantLoanPurpose", {
              required: "This field is required!",
            }),
          }}
          helperText={errors?.applicantLoanPurpose?.message}
          error={errors?.applicantLoanPurpose}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomSelect
          data={loanPaymentPlan}
          handleChange={handlePlanChange}
          value={searchParams.get("applicantPaymentPlan") || paymentPlan}
          disabled={!loanAmount}
          register={{
            ...register("applicantPaymentPlan"),
          }}
        />
      </Grid>
    </Grid>
  );
}
