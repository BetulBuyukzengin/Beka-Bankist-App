import { FormProvider, useForm } from "react-hook-form";
import StepperComponent from "../../../../../Components/StepperComponent/StepperComponent";
import MyAccounts from "../Deposit/MyAccounts";
import React from "react";
import { useUpdateBalance } from "../../../../../services/accountServices";
import Loader from "../../../../../Components/Loader/Loader";
import { useNavigate, useSearchParams } from "react-router-dom";
import Withdraw from "../Withdraw/Withdraw";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  calcRemainingLimitResetTime,
  formatCurrency,
  showDailyLimitMessage,
} from "../../../../../utils/utils";
import { useCreateMovements } from "../../../../../services/movementsServices";

const transactionSteps = [
  {
    label: "My Accounts",
    component: <MyAccounts />,
  },
  {
    label: "Deposit",
    component: <Withdraw />,
  },
];

function WithdrawTab() {
  const { isLoading, mutateAsync: withdrawMoney } = useUpdateBalance();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [searchParams] = useSearchParams();
  const selectedAccount = JSON.parse(searchParams.get("selectedAccount"));
  const currentWithdrawLimit = +selectedAccount?.remainingWithdrawLimit;
  const id = selectedAccount?.id;
  const currentBalance = +selectedAccount?.balance;
  const { createMovement, isCreating } = useCreateMovements();
  const getStatus = searchParams.get("status");

  const validationSchema = [
    yup.object({
      selectedAccount: yup.string().required("This field is required!"),
    }),
    yup.object({
      amountToWithdrawMyAccount: yup
        .string()
        .test("max-check", function (value) {
          console.log(+value);
          if (+value > currentWithdrawLimit && 0 !== currentWithdrawLimit) {
            return this.createError({
              message: `Daily withdraw limit is ${formatCurrency(
                currentWithdrawLimit
              )}`,
            });
          }
          if (0 === currentWithdrawLimit) {
            return this.createError({
              message: showDailyLimitMessage(
                "withdraw",
                calcRemainingLimitResetTime()
              ),
            });
          } else return true;
        })
        .required("This field is required!"),
    }),
    yup.object({}),
  ];
  const currentValidationSchema = validationSchema[activeStep];

  const methods = useForm({
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const { amountToWithdrawMyAccount } = data;
    const updatedAccount = {
      ...selectedAccount,
      balance: currentBalance - Number(amountToWithdrawMyAccount),
    };
    await withdrawMoney({ id, account: updatedAccount });
    await createMovement({
      selectedAccount: updatedAccount,
      status: getStatus,
      amountToWithdrawMyAccount,
    });
    navigate("/applayout/account");
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
        {activeStep === transactionSteps.length && (
          <div style={{ margin: "3rem", textAlign: "center" }}>
            {isLoading
              ? "Transfer transaction is in progress"
              : "Transfer was successfully completed ..."}
          </div>
        )}
      </form>
    </FormProvider>
  );
}

export default WithdrawTab;
