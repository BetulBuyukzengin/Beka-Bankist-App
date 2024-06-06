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
import {
  useDailyRemainingLimit,
  useUpdateBalance,
} from "../../../../../services/accountServices";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../../../../Components/Loader/Loader";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  dailyTransferLimit,
  maxIbanLength,
  minAmountToSend,
} from "../../../../../Constants/constants";
import { convertToBoolean, formatCurrency } from "../../../../../utils/utils";
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
  // const { isLoading, mutateAsync } = useCreateAccount();
  const { user } = useUser();

  const senderFullName = user.user_metadata.fullName;
  const [searchParams] = useSearchParams();
  const selectedAccount = JSON.parse(searchParams.get("selectedAccount"));
  const id = selectedAccount?.id;
  const { isLoading, mutateAsync: updateBalance } = useUpdateBalance();
  const { mutateAsync: updateDailyRemainingLimit } = useDailyRemainingLimit();

  const recipientTab = searchParams.get("new-recipient-tab");
  const isSaveAsRegisteredWithIban = convertToBoolean(
    searchParams.get("saveAsRegisteredWithIban")
  );
  const isSaveAsRegisteredAccountNumber = convertToBoolean(
    searchParams.get("watchSaveAsRegisteredWithAccount")
  );
  const remainingBalance = JSON.parse(
    searchParams.get("selectedAccount")
  )?.balance;

  const navigate = useNavigate();
  const validationSchema = [
    yup.object(
      +recipientTab === 0
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
              .required("This field is required!"),
            recipientFullNameWithAccount: yup
              .string()
              .required("This field is required!"),
            shortName:
              isSaveAsRegisteredAccountNumber &&
              yup.string().required("This field is required!"),
          }
    ),

    yup.object({
      selectedAccount: yup.string().required("This field is required!"),
    }),
    yup.object({
      amountToSend: yup
        .number()
        .min(
          minAmountToSend,
          `Send amount should be greater than ${minAmountToSend}!`
        )

        .test("max-check", function (value) {
          if (value > dailyTransferLimit) {
            return this.createError({
              message: `Günlük para gönderme limitiniz toplam ${formatCurrency(
                dailyTransferLimit
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
  // console.log(saveAsRegisteredWithAccount);
  const onSubmit = async (data) => {
    const updatedBalance = selectedAccount.balance - +data.amountToSend;
    const updatedRemainingLimit =
      selectedAccount.remainingTransferLimit - +data.amountToSend;
    await createMovement({ ...data, senderFullName });
    const updatedAccount = {
      ...selectedAccount,
      balance: updatedBalance,
      remainingTransferLimit: updatedRemainingLimit,
    };
    await updateBalance({ id, account: updatedAccount });
    navigate("/applayout/account");
    await updateDailyRemainingLimit({
      id,
      account: updatedAccount,
    });
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
            {isCreating
              ? "Transfer transaction is in progress"
              : "Transfer was successfully completed ..."}
          </div>
        )}
      </form>
    </FormProvider>
  );
}
