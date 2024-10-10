import StepperComponent from "../../../../../Components/StepperComponent/StepperComponent";
import AmountDetermination from "./AmountDetermination";
import DetailDetermination from "./DetailDetermination";
import RecipientAccount from "./RecipientAccount";
import SelectAccount from "./SelectAccount";
import TransactionControl from "./TransactionControl";

import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import Loader from "../../../../../Components/Loader/Loader";
import {
  maxAccountNumberLength,
  maxIbanLength,
  minAmountToSend,
} from "../../../../../Constants/constants";
import {
  useDailyRemainingLimit,
  useUpdateAccount,
} from "../../../../../services/accountServices";
import { useCreateMovements } from "../../../../../services/movementsServices";
import { useCreateRegisteredRecipient } from "../../../../../services/registeredRecipientsServices";
import { useUser } from "../../../../../services/userServices";
import {
  calcRemainingLimitResetTime,
  convertToBoolean,
  formatCurrency,
  showDailyLimitMessage,
} from "../../../../../utils/utils";

const transactionSteps = [
  {
    label: "Recipient Account",
    component: <RecipientAccount />,
  },
  {
    label: "Sender Account",
    component: <SelectAccount />,
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
  const [activeStep, setActiveStep] = useState(0);
  const { createMovement, isCreating } = useCreateMovements();
  const { isLoading, mutateAsync: createRegisteredRecipient } =
    useCreateRegisteredRecipient();
  const { user } = useUser();

  const senderFullName = user?.user_metadata?.fullName;
  const [searchParams] = useSearchParams();
  const selectedAccount = JSON.parse(searchParams.get("selectedAccount"));
  const id = selectedAccount?.id;
  const { mutateAsync: updateBalance } = useUpdateAccount();
  const { mutateAsync: updateDailyRemainingLimit } = useDailyRemainingLimit();

  const recipientTab = searchParams.get("new-recipient-tab");
  const isSaveAsRegisteredWithIban = convertToBoolean(
    searchParams.get("saveAsRegisteredWithIban")
  );
  const isSaveAsRegisteredAccountNumber = convertToBoolean(
    searchParams.get("saveAsRegisteredWithAccount")
  );
  const remainingBalance = selectedAccount?.balance;
  const remainingTransferLimit = selectedAccount?.remainingTransferLimit;
  const [iban, setIban] = useState("TR");
  const currentStatus = searchParams.get("status");
  const navigate = useNavigate();
  const validationSchema = [
    yup.object(
      currentStatus === "Transfer" || currentStatus === "Registered Recipients"
        ? {
            registeredRecipient: yup.string().required(),
          }
        : +recipientTab === 0
        ? {
            recipientIban: yup
              .string()
              .required("This field is required!")
              .test(
                "is-valid-iban",
                "Iban is invalid, should be 26 characters long!",
                (value) => value && value.length === maxIbanLength
              ),

            recipientFullNameWithIban: yup
              .string()
              .required("This field is required!"),
            shortName:
              isSaveAsRegisteredWithIban &&
              yup.string().required("This field is required!"),
          }
        : {
            recipientBankName: yup.string().required("This field is required!"),
            recipientBankBranch: yup
              .string()
              .required("This field is required!"),
            recipientAccountNumber: yup
              .string()
              .required("This field is required!")
              .test(
                "is-valid-account-number",
                "Account number is invalid, should be 16 characters long!",
                (value) => value && value.length === maxAccountNumberLength
              ),
            recipientFullNameWithAccount: yup
              .string()
              .required("This field is required!"),
            shortName:
              isSaveAsRegisteredAccountNumber &&
              yup.string().required("This field is required!"),
          }
    ),
    yup.object({
      selectedAccount: yup
        .string()
        .test("limit-check", function (value) {
          if (JSON.parse(value).balance === 0)
            return this.createError({
              message: toast.error("Account's balance is insufficient"),
            });
          if (JSON.parse(value).remainingTransferLimit === 0)
            return this.createError({
              message: toast.error(
                showDailyLimitMessage("transfer", calcRemainingLimitResetTime())
              ),
            });
          else return true;
        })
        .required("This field is required!"),
    }),
    yup.object({
      amountToSend: yup
        .number()
        .min(
          minAmountToSend,
          `Send amount should be greater than ${minAmountToSend}!`
        )

        .test("max-check", function (value) {
          if (value > remainingTransferLimit) {
            return this.createError({
              message: `Daily transfer limit is ${formatCurrency(
                remainingTransferLimit
              )}`,
            });
          }
          if (value > remainingBalance) {
            return this.createError({
              message: "Bakiyeniz yetersiz",
            });
          }
          return true;
        })
        .required("This field is required!"),
    }),
    yup.object({
      paymentMethod: yup.string().required("This field is required!"),
      transferDescription: yup.string(),
      showUsernameDescription: yup.boolean(),
    }),
    yup.object({
      transactionDate: yup.string(),
    }),
    yup.object({}),
  ];

  const currentValidationSchema = validationSchema[activeStep];

  const methods = useForm({
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
  });
  const { reset } = methods;
  const prevStatus = React.useRef(null);

  //! Reset all fields and redirect to first step based on status change
  useEffect(() => {
    if (currentStatus !== prevStatus.current) {
      reset();
      setIban("TR");
      setActiveStep(0);
    }
    prevStatus.current = currentStatus;
  }, [reset, currentStatus]);

  const onSubmit = async (data) => {
    const registeredRecipients = {
      recipientFullNameWithAccount: data.recipientFullNameWithAccount,
      recipientShortName: data.shortName,
      recipientFullNameWithIban: data.recipientFullNameWithIban,
      recipientIban: data.recipientIban,
      recipientAccountNumber: data.recipientAccountNumber,
      recipientBankName: data.recipientBankName,
      saveAsRegisteredWithAccount: data.saveAsRegisteredWithAccount,
      saveAsRegisteredWithIban: data.saveAsRegisteredWithIban,
      recipientBankBranch: data.recipientBankBranch,
      user_id: JSON.parse(data.selectedAccount)?.user_id,
    };
    const updatedBalance = selectedAccount.balance - +data.amountToSend;
    const updatedRemainingLimit =
      selectedAccount.remainingTransferLimit - +data.amountToSend;
    await createMovement(
      {
        ...data,
        senderFullName,
        user_id: JSON.parse(data.selectedAccount)?.user_id,
      },
      {
        onSuccess: () => toast.success("Transfer was successfully completed"),
        onError: () =>
          toast.error(
            "An error occurred during transfer transaction, please try again later!"
          ),
      }
    );
    const updatedAccount = {
      ...selectedAccount,
      balance: updatedBalance,
      remainingTransferLimit: updatedRemainingLimit,
    };

    if (data.saveAsRegisteredWithIban || data.saveAsRegisteredWithAccount) {
      await createRegisteredRecipient(registeredRecipients);
    }

    await updateBalance({ id, account: updatedAccount });
    navigate("/applayout/account");
    await updateDailyRemainingLimit({
      id,
      account: updatedAccount,
    });
  };
  if (isCreating) return <Loader />;
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        style={{ height: "max-content" }}
      >
        <StepperComponent
          transactionSteps={transactionSteps.map((step) =>
            step.label === "Recipient Account"
              ? {
                  ...step,
                  component: <RecipientAccount iban={iban} setIban={setIban} />,
                }
              : step
          )}
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
      </form>
    </FormProvider>
  );
}
