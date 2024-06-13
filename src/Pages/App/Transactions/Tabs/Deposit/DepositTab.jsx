import { FormProvider, useForm } from "react-hook-form";
import Deposit from "./Deposit";
import StepperComponent from "../../../../../Components/StepperComponent/StepperComponent";
import MyAccounts from "./MyAccounts";
import React from "react";
import { useUpdateBalance } from "../../../../../services/accountServices";
import Loader from "../../../../../Components/Loader/Loader";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  calcRemainingLimitResetTime,
  formatCurrency,
  showDailyLimitMessage,
} from "../../../../../utils/utils";
import { useCreateMovements } from "../../../../../services/movementsServices";
import { dailyDepositLimit } from "../../../../../Constants/constants";
import { toast } from "react-toastify";

const transactionSteps = [
  {
    label: "My Accounts",
    component: <MyAccounts />,
  },
  {
    label: "Deposit",
    component: <Deposit />,
  },
];

function DepositTab() {
  const { isLoading, mutateAsync: depositMoney } = useUpdateBalance();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [searchParams] = useSearchParams();
  const selectedAccount = JSON.parse(searchParams.get("selectedAccount"));
  const id = selectedAccount?.id;
  const currentBalance = +selectedAccount?.balance;
  const currentDepositLimit = +selectedAccount?.remainingDepositLimit;
  const { createMovement, isCreating } = useCreateMovements();
  const validationSchema = [
    yup.object({
      selectedAccount: yup
        .string()
        .test("limit-check", function (value) {
          if (
            JSON.parse(value).remainingDepositLimit === 0 &&
            JSON.parse(value).id === id
          )
            return this.createError({
              message: toast.error(
                showDailyLimitMessage("deposit", calcRemainingLimitResetTime())
              ),
            });
          else return true;
        })
        .required("This field is required!"),
    }),
    yup.object({
      amountToBeDepositMyAccount: yup
        .string()
        .test("max-check", function (value) {
          console.log(+value);
          if (+value > currentDepositLimit && 0 !== currentDepositLimit) {
            return this.createError({
              message: `Daily deposit limit is ${formatCurrency(
                currentDepositLimit
              )}`,
            });
          }
          if (0 === currentDepositLimit) {
            return this.createError({
              message: showDailyLimitMessage(
                "deposit",
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

  const getStatus = searchParams.get("status");
  // const isLimitResetTimeOver =
  //   calcRemainingLimitResetTime() === "0 hours 00 minutes 00 seconds";
  console.log(currentDepositLimit);
  // console.log(isLimitResetTimeOver, currentDepositLimit, dailyDepositLimit);
  const onSubmit = async (data) => {
    // let updatedRemainingDepositLimit = currentDepositLimit;

    // if (isLimitResetTimeOver) {
    //   updatedRemainingDepositLimit = dailyDepositLimit;
    // } else {
    //   updatedRemainingDepositLimit -= Number(amountToBeDepositMyAccount);
    // }

    // console.log(updatedRemainingDepositLimit);
    const { amountToBeDepositMyAccount } = data;
    const updatedAccount = {
      ...selectedAccount,
      // remainingDepositLimit: updatedRemainingDepositLimit,
      remainingDepositLimit:
        currentDepositLimit - Number(amountToBeDepositMyAccount),
      balance: currentBalance + Number(amountToBeDepositMyAccount),
    };
    await depositMoney({ id, account: updatedAccount });
    await createMovement({
      selectedAccount: updatedAccount,
      status: getStatus,
      amountToBeDepositMyAccount,
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

export default DepositTab;
