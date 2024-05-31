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
import { useUpdateBalance } from "../../../../../services/accountServices";
import { useSearchParams } from "react-router-dom";
import Loader from "../../../../../Components/Loader/Loader";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  maxIbanLength,
  minAmountToSend,
} from "../../../../../Constants/constants";
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
  const recipientTab = searchParams.get("new-recipient-tab");

  console.log(recipientTab);

  const validationSchema = [
    yup.object().shape({
      recipientIban: yup.string().when([], {
        is: () => recipientTab === 0,
        then: yup
          .string()
          .required("This field is required!")
          .test(
            "is-valid-iban",
            "Iban is invalid, should be 26 characters long!",
            (value) => value && value.length === maxIbanLength
          ),
      }),
      recipientFullNameWithIban: yup.string().when([], {
        is: () => recipientTab === 0,
        then: yup.string().required("This field is required!"),
      }),
      // recipientBankName: yup.string().when([], {
      //   is: () => recipientTab === 1,
      //   then: yup.string().required("This field is required!"),
      // }),
      // recipientBankBranch: yup.string().when([], {
      //   is: () => recipientTab === 1,
      //   then: yup.string().required("This field is required!"),
      // }),
      recipientAccountNumber: yup.string().when([], {
        is: () => recipientTab === 1,
        then: yup.string().required("This field is required!"),
      }),
      recipientFullNameWithAccount: yup.string().when([], {
        is: () => recipientTab === 1,
        then: yup.string().required("This field is required!"),
      }),
    }),

    yup.object().shape({
      selectedAccount: yup.string().required("This field is required!"),
    }),
    yup.object().shape({
      amountToSend: yup
        .number()
        .min(
          minAmountToSend,
          `Send amount should be greater than ${minAmountToSend}!`
        )
        .required("This field is required!"),
    }),
    yup.object().shape({
      paymentMethod: yup.string().required("This field is required!"),
      transferDescription: yup.string().required("This field is required!"),
      showUsernameDescription: yup.boolean(),
    }),
    yup.object().shape({
      transactionDate: yup.string().required("This field is required!"),
    }),
    yup.object().shape({}),
  ];

  // const validationSchema = [
  //   //validation for step 1 iban

  //   // //////////////////////
  //   // yup.object({
  //   //   recipientIban: yup
  //   //     .string()
  //   //     .required("This field is required!")
  //   //     .test(
  //   //       "is-valid-iban",
  //   //       "Iban is invalid, should be 26 characters long!",
  //   //       (value) => value.length === maxIbanLength
  //   //     ),
  //   //   // prettier-ignore
  //   //   recipientFullNameWithIban: yup.string().required("This field is required!"),
  //   //   // shortName: yup.string().required("This field is required!"),
  //   //   // saveAsRegisteredWithIban: yup
  //   //   //   .boolean()
  //   //   //   .required("This field is required!"),
  //   // }),

  //   // validation for step 1 account number tab
  //   // yup.object({
  //   //   recipientBankName: yup.string().required("This field is required!"),
  //   //   recipientBankBranch: yup.string().required("This field is required!"),
  //   //   recipientAccountNumber: yup.string().required("This field is required!"),
  //   //   recipientFullNameWithAccount: yup
  //   //     .string()
  //   //     .required("This field is required!"),
  //   //   shortName: yup.string().required("This field is required!"),
  //   //   saveAsRegisteredWithAccount: yup
  //   //     .string()
  //   //     .required("This field is required!"),
  //   // }),

  //   //validation for step 3 sender account
  //   yup.object().shape({
  //     selectedAccount: yup.string().required("This field is required!"),
  //   }),
  //   //validation for step 4 amount determinationda kaldım
  //   yup.object().shape({
  //     amountToSend: yup
  //       .number()
  //       .min(
  //         minAmountToSend,
  //         `Send amount should be grater than ${minAmountToSend}!`
  //       )
  //       .required("This field is required!"),
  //   }),
  //   yup.object().shape({
  //     paymentMethod: yup.string().required("This field is required!"),
  //     transferDescription: yup.string().required("This field is required!"),
  //     showUsernameDescription: yup.boolean(),
  //   }),
  //   yup.object().shape({
  //     transactionDate: yup.string().required("This field is required!"),
  //   }),
  //   yup.object().shape({}),
  // ];
  const currentValidationSchema = validationSchema[activeStep];

  const methods = useForm({
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    const updatedBalance = selectedAccount.balance - +data.amountToSend;
    await createMovement({ ...data, senderFullName });
    const updatedAccount = {
      ...selectedAccount,
      balance: updatedBalance,
    };
    await updateBalance({ id, account: updatedAccount });
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
