import { FormProvider, useForm } from "react-hook-form";
import Deposit from "./Deposit";
import StepperComponent from "../../../../../Components/StepperComponent/StepperComponent";
import MyAccounts from "./MyAccounts";
import React, { useEffect, useRef } from "react";
import { useUpdateAccount } from "../../../../../services/accountServices";
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
  const { isLoading, mutateAsync: depositMoney } = useUpdateAccount();
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
          if (JSON.parse(value).remainingDepositLimit === 0)
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
      // amountToBeDepositMyAccount: yup
      amountToSend: yup
        .string()
        .test("max-check", function (value) {
          if (+value > currentDepositLimit && 0 !== currentDepositLimit) {
            return this.createError({
              message: `Daily deposit limit is ${formatCurrency(
                currentDepositLimit
              )}`,
            });
          }
          if (0 === currentDepositLimit) {
            return this.createError({
              message: toast.error(
                showDailyLimitMessage("deposit", calcRemainingLimitResetTime())
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
  const getStatus = searchParams.get("status");
  const prevStatus = useRef(null);
  const currentStatus = searchParams.get("status");

  const onSubmit = async (data) => {
    const { amountToSend } = data;

    const updatedAccount = {
      ...selectedAccount,
      remainingDepositLimit: currentDepositLimit - Number(amountToSend),
      balance: currentBalance + Number(amountToSend),
    };
    await depositMoney({ id, account: updatedAccount });
    await createMovement({
      selectedAccount: updatedAccount,
      status: getStatus,
      amountToSend,
      user_id: JSON.parse(data.selectedAccount).user_id,
    });
    navigate("/applayout/account");
  };

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
