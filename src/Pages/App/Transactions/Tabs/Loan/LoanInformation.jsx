import { Grid } from "@mui/material";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";
import CustomSelect from "../../../../../Components/CustomSelect/CustomSelect";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  calculateAndFormatLoan,
  calculateAvailableMonthlyPayment,
  calculateLoanAmount,
} from "../../../../../utils/utils";

const paymentPeriods = [
  {
    value: 1,
    interest: 0.3,
    content: "12 months",
  },
  {
    value: 2,
    interest: 0.4,
    content: "24 months",
  },
  {
    value: 3,
    interest: 0.5,
    content: "36 months",
  },

  {
    value: 4,
    interest: 0.6,
    content: "48 months",
  },
  {
    value: 5,
    interest: 0.7,
    content: "60 months",
  },
];

export default function LoanInformation() {
  const { register, formState, watch } = useFormContext();
  const [paymentPlan, setPaymentPlan] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const watchApplicantPaymentPlan = watch("applicantPaymentPlan");

  const { errors } = formState;
  const [searchParams, setSearchParams] = useSearchParams();
  const watchSelectedPaymentPeriod = watch("selectedPaymentPeriod");
  const [totalIncome, setTotalIncome] = useState();
  const [totalExpense, setTotalExpense] = useState();

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

  //! current debs e default olarak değer gelsin databaseden varsa eger
  function handleChangeExpense(e) {
    setTotalExpense(+e);
  }
  function handleChangeIncome(e) {
    setTotalIncome(+e);
  }
  useEffect(
    function () {
      if (
        watchSelectedPaymentPeriod !== undefined &&
        watchSelectedPaymentPeriod !== ""
      ) {
        searchParams.set("selectedPaymentPeriod", watchSelectedPaymentPeriod);
        setSearchParams(searchParams);
      }
    },
    [searchParams, setSearchParams, watchSelectedPaymentPeriod]
  );
  const monthlyPayment = calculateAvailableMonthlyPayment(
    totalIncome,
    totalExpense
  );
  const selectedPeriod = paymentPeriods.find(
    (period) => period.value === watchSelectedPaymentPeriod
  );

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
          id="totalIncome"
          label="Total Income"
          onChange={(e) => handleChangeIncome(e.target.value)}
          register={{
            ...register("applicantTotalIncome", {
              required: "This field is required!",
            }),
          }}
          helperText={errors?.applicantTotalIncome?.message}
          error={errors?.applicantTotalIncome}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField
          type="text"
          id="totalExpense"
          onChange={(e) => handleChangeExpense(e.target.value)}
          label="Total Expense"
          register={{
            ...register("applicantTotalExpense", {
              required: "This field is required!",
            }),
          }}
          helperText={errors?.applicantTotalExpense?.message}
          error={errors?.applicantTotalExpense}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField
          type="text"
          id="-basic"
          label="Current Debts"
          register={{
            ...register("applicantCurrentDepts", {
              required: "This field is required",
            }),
          }}
          helperText={errors?.applicantCurrentDepts?.message}
          error={errors?.applicantCurrentDepts}
        />
      </Grid>

      <Grid item xs={3}>
        <CustomSelect
          data={paymentPeriods}
          value={searchParams.get("selectedPaymentPeriod") || 1}
          defaultValue=""
          register={{
            ...register("selectedPaymentPeriod"),
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <CustomTextField
          id="-basic"
          label="Loan Amount"
          value={calculateLoanAmount(monthlyPayment, selectedPeriod)}
          // disabled={}
          // register={{
          //   ...register("applicantCurrentDepts", {
          //     required: "This field is required",
          //   }),
          // }}
          // helperText={errors?.applicantCurrentDepts?.message}
          // error={errors?.applicantCurrentDepts}
        />
      </Grid>
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
