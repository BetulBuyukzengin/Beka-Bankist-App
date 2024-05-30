import React from "react";
import StepperComponent from "../../../../../Components/StepperComponent/StepperComponent";
import BusinessInformation from "./BusinessInformation";
import LoanInformation from "./LoanInformation";
import PersonalInformation from "./PersonalInformation";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateLoan } from "../../../../../services/loanServices";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "react-router-dom";
import { matchIsValidTel } from "mui-tel-input";

const transactionSteps = [
  {
    label: "Personal Information",
    component: <PersonalInformation />,
  },
  {
    label: "Business Information",
    component: <BusinessInformation />,
  },
  {
    label: "Loan Information",
    component: <LoanInformation />,
  },
];

function LoanTab() {
  const [searchParams] = useSearchParams();

  const validationSchema = [
    //validation for step 1
    yup.object({
      applicantFullName: yup.string().required("This field is required!"),
      // prettier-ignore
      applicantIdentificationNumber: yup.string().required("This field is required!"),
      applicantAdress: yup.string().required("This field is required!"),
      applicantPhoneNumber: yup
        .string()
        .required("Phone number is required")
        .test("is-valid-phone", "Phone number is invalid", (value) =>
          matchIsValidTel(value)
        ),

      applicantBirthday: yup.date().required("This field is required!"),
    }),

    //validation for step 2
    yup.object({
      applicantBusinessName: yup.string().required("This field is required!"),
      applicantSectorOfWork: yup.string().required("This field is required!"),
      applicantJob: yup.string().required("This field is required!"),
      applicantIncome: yup.string().required("This field is required!"),
    }),

    //validation for step 3
    yup.object({
      applicantTotalIncome: yup.string().required("This field is required!"),
      applicantTotalExpense: yup.string().required("This field is required!"),
      applicantLoanPurpose: yup.string().required("This field is required!"),
      selectedPaymentPeriod: yup.number().required("This field is required!"),
      applicantLoanAmount: yup
        .number()
        .required("This field is required!")
        .min(
          (+searchParams.get("max-loan-amount") * 20) / 100,
          `Loan amount can't be less than ${
            (+searchParams.get("max-loan-amount") * 20) / 100
          }!`
        )
        .max(
          +searchParams.get("max-loan-amount"),
          "Loan amount can't be greater than maximum loan amount!"
        ),
    }),
    yup.object({}),
  ];
  const [activeStep, setActiveStep] = React.useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  console.log("aktif", activeStep);

  const methods = useForm({
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
  });
  const { mutateAsync } = useCreateLoan();

  const onSubmit = async (data) => {
    await mutateAsync(data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <StepperComponent
          transactionSteps={transactionSteps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </form>
    </FormProvider>
  );
}

export default LoanTab;
