import { FormProvider, useForm } from "react-hook-form";
import StepperComponent from "../../../../../Components/StepperComponent/StepperComponent";
import MyAccounts from "../Deposit/MyAccounts";
import React, { useEffect, useRef } from "react";
import { useUpdateAccount } from "../../../../../services/accountServices";
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
import { toast } from "react-toastify";

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
  const { isLoading, mutateAsync: withdrawMoney } = useUpdateAccount();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [searchParams] = useSearchParams();
  const selectedAccount = JSON.parse(searchParams.get("selectedAccount"));
  const currentWithdrawLimit = +selectedAccount?.remainingWithdrawLimit;
  const id = selectedAccount?.id;
  const currentBalance = +selectedAccount?.balance;
  const { createMovement } = useCreateMovements();
  const getStatus = searchParams.get("status");
  const prevStatus = useRef(null);
  const currentStatus = searchParams.get("status");

  const validationSchema = [
    yup.object({
      selectedAccount: yup
        .string()
        .test("limit-check", function (value) {
          if (JSON.parse(value).balance === 0)
            return this.createError({
              message: toast.error("Account's balance is insufficient"),
            });
          if (JSON.parse(value).remainingWithdrawLimit === 0)
            return this.createError({
              message: toast.error(
                showDailyLimitMessage("withdraw", calcRemainingLimitResetTime())
              ),
            });
          else return true;
        })
        .required("This field is required!"),
    }),
    yup.object({
      amountToSend: yup
        .string()
        .test("max-check", function (value) {
          if (+value > currentWithdrawLimit && 0 !== currentWithdrawLimit) {
            return this.createError({
              message: `Daily withdraw limit is ${formatCurrency(
                currentWithdrawLimit
              )}`,
            });
          }
          if (
            +value > selectedAccount.balance &&
            +value < currentWithdrawLimit &&
            currentWithdrawLimit !== 0
          ) {
            return this.createError({
              message: `The amount of money you want to withdraw is higher than your current balance.Your account balance is ${formatCurrency(
                selectedAccount.balance
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

  const { reset } = methods;

  //! Reset all fields and redirect to first step based on status change
  useEffect(
    function () {
      if (currentStatus !== prevStatus.current) {
        reset();
        setActiveStep(0);
      }
    },
    [reset, currentStatus]
  );

  const onSubmit = async (data) => {
    const { amountToSend } = data;

    const updatedAccount = {
      ...selectedAccount,
      remainingWithdrawLimit: currentWithdrawLimit - Number(amountToSend),
      balance: currentBalance - Number(amountToSend),
    };
    await withdrawMoney({ id, account: updatedAccount });
    await createMovement({
      selectedAccount: updatedAccount,
      status: getStatus,
      amountToSend,

      user_id: JSON.parse(data.selectedAccount).user_id,
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
