import RecipientAccount from "./RecipientAccount";
import DetailDetermination from "./DetailDetermination";
import AmountDetermination from "./AmountDetermination";
import SenderAccount from "./SenderAccount";
import StepperComponent from "../../../../../Components/StepperComponent/StepperComponent";
import TransactionControl from "./TransactionControl";

import { useForm, FormProvider } from "react-hook-form";
import React from "react";
import { useCreateMovements } from "../../../../../services/movementsServices";
import { useUser } from "../../../../../services/userServices";

const transactionSteps = [
  {
    label: "Recipient Account",
    component: <RecipientAccount />,
  },
  {
    label: "Sender Account",
    component: <SenderAccount />,
  },
  {
    label: "Amount Determination",
    component: <AmountDetermination />,
  },
  {
    label: "Detail Determination",
    component: <DetailDetermination />,
  },
  {
    label: "Transaction Control",
    component: <TransactionControl />,
  },
];
export default function TransferMoneyTab() {
  const [activeStep, setActiveStep] = React.useState(0);

  const { createMovement, isCreating } = useCreateMovements();
  const { user } = useUser();
  const methods = useForm();
  const senderFullName = user.user_metadata.fullName;

  const onSubmit = async (data) => {
    await createMovement({ ...data, senderFullName });
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <StepperComponent
          transactionSteps={transactionSteps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
        {activeStep === transactionSteps.length && (
          <div style={{ margin: "3rem", textAlign: "center" }}>
            {isCreating
              ? "Transfer transaction is in progress"
              : "Transfer was successfully completed ..."}
          </div>
        )}
        <button type="submit">add</button>
      </form>
    </FormProvider>
  );
}
