import React from "react";
import StepperComponent from "../../../../../Components/StepperComponent/StepperComponent";
import BusinessInformation from "./BusinessInformation";
import CreditInformation from "./CreditInformation";
import FinancialInformation from "./FinancialInformation";
import PersonalInformation from "./PersonalInformation";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateLoan } from "../../../../../services/loanServices";
import Loader from "../../../../../Components/Loader/Loader";

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
    label: "Financial Information",
    component: <FinancialInformation />,
  },
  {
    label: "Credit Information",
    component: <CreditInformation />,
  },
];
function LoanTab() {
  const methods = useForm();
  const [activeStep, setActiveStep] = React.useState(0);
  const { mutateAsync, isLoading } = useCreateLoan();

  const onSubmit = async (data) => {
    await mutateAsync(data);
  };
  if (isLoading) return <Loader />;
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <StepperComponent
          transactionSteps={transactionSteps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
        <button type="submit">add</button>
      </form>
    </FormProvider>
  );
}

export default LoanTab;
