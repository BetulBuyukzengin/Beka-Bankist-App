import { FormHelperText, Grid } from "@mui/material";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";
import CustomSelect from "../../../../../Components/CustomSelect/CustomSelect";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  calculateAvailableMonthlyPayment,
  calculateLoanAmount,
} from "../../../../../utils/utils";

const paymentPeriods = [
  {
    value: "",
    interest: 0,
    content: "Select payment period",
  },
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
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  console.log(errors);
  const [loanAmount, setLoanAmount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const watchSelectedPaymentPeriod = watch("selectedPaymentPeriod");
  const [totalIncome, setTotalIncome] = useState();
  const [totalExpense, setTotalExpense] = useState();
  const isTotalIncomeExpense = totalExpense && totalIncome;

  function handleLoanAmountChange(e) {
    setLoanAmount(+e.target.value);
  }

  const monthlyPayment = useMemo(
    () => calculateAvailableMonthlyPayment(totalIncome, totalExpense),
    [totalIncome, totalExpense]
  );

  const selectedPeriod = useMemo(
    () =>
      paymentPeriods.find(
        (period) => period.value == watchSelectedPaymentPeriod
      ),
    [watchSelectedPaymentPeriod]
  );

  const maxLoanAmount = useMemo(
    () => calculateLoanAmount(monthlyPayment, selectedPeriod),
    [monthlyPayment, selectedPeriod]
  );

  //! current debs e default olarak değer gelsin databaseden varsa eger
  function handleChangeExpense(e) {
    setTotalExpense(+e);
  }
  function handleChangeIncome(e) {
    setTotalIncome(+e);
  }

  useEffect(
    function () {
      if (watchSelectedPaymentPeriod !== undefined) {
        searchParams.set("selectedPaymentPeriod", watchSelectedPaymentPeriod);
        setSearchParams(searchParams);
        setValue("applicantLoanAmount", loanAmount);
      }
    },
    [
      searchParams,
      setSearchParams,
      watchSelectedPaymentPeriod,
      setValue,
      loanAmount,
    ]
  );

  useEffect(
    function () {
      searchParams.set("max-loan-amount", maxLoanAmount || 0);
      setLoanAmount(maxLoanAmount || 0);
      setSearchParams(searchParams);
    },
    [maxLoanAmount, searchParams, setSearchParams, watchSelectedPaymentPeriod]
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
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          "&>div": {
            width: "100%!important",
            "&>p": {
              "@media (max-width:48em)": {
                fontSize: ".7rem",
              },
              "@media (max-width:31.25em)": {
                fontSize: ".6rem",
              },
            },
          },
        }}
      >
        <CustomTextField
          id="totalIncome"
          label="Total Income"
          onChange={(e) => handleChangeIncome(e.target.value)}
          register={{
            ...register("applicantTotalIncome", {}),
          }}
          helperText={errors?.applicantTotalIncome?.message}
          error={errors?.applicantTotalIncome}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          "&>div": {
            width: "100%!important",
            "&>p": {
              "@media (max-width:48em)": {
                fontSize: ".7rem",
              },
              "@media (max-width:31.25em)": {
                fontSize: ".6rem",
              },
            },
          },
        }}
      >
        <CustomTextField
          type="text"
          id="totalExpense"
          onChange={(e) => handleChangeExpense(e.target.value)}
          label="Total Expense"
          register={{
            ...register("applicantTotalExpense", {}),
          }}
          helperText={errors?.applicantTotalExpense?.message}
          error={errors?.applicantTotalExpense}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          "&>div": {
            width: "100%!important",
            "&>p": {
              "@media (max-width:48em)": {
                fontSize: ".7rem",
              },
              "@media (max-width:31.25em)": {
                fontSize: ".6rem",
              },
            },
          },
        }}
      >
        <CustomTextField
          id="loanPurpose"
          label="Loan Purpose"
          register={{
            ...register("applicantLoanPurpose", {}),
          }}
          helperText={errors?.applicantLoanPurpose?.message}
          error={errors?.applicantLoanPurpose}
        />
      </Grid>

      <Grid
        item
        xs={6}
        sm={3}
        sx={{
          "&>div": {
            width: "100%!important",
          },
          "&>p": {
            "@media (max-width:48em)": {
              fontSize: ".7rem",
            },
            "@media (max-width:31.25em)": {
              fontSize: ".6rem",
            },
          },
        }}
      >
        <CustomSelect
          width="100%"
          data={paymentPeriods}
          value={searchParams.get("selectedPaymentPeriod") || ""}
          defaultValue=""
          register={{
            ...register("selectedPaymentPeriod"),
          }}
        />
        {errors?.selectedPaymentPeriod && (
          <FormHelperText error sx={{ marginLeft: ".8rem" }}>
            {/* {errors?.selectedPaymentPeriod?.message} */}
            Lütfen aylık ödeme planını seçiniz!
          </FormHelperText>
        )}
      </Grid>
      <Grid item xs={6} sm={3}>
        <CustomTextField
          id="-basic"
          label="Maximum Loan Amount"
          disabled
          value={isTotalIncomeExpense ? maxLoanAmount.toFixed(2) : 0}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          // placeholder={isTotalIncomeExpense ? maxLoanAmount : 0}
          type="number"
          defaultValue={loanAmount.toFixed(2)}
          onChange={handleLoanAmountChange}
          id="loanAmount"
          label="Loan Amount"
          register={{
            ...register("applicantLoanAmount"),
          }}
          helperText={errors?.applicantLoanAmount?.message}
          error={errors?.applicantLoanAmount}
        />
      </Grid>
    </Grid>
  );
}
