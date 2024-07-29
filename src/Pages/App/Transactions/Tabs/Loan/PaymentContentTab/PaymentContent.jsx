/* eslint-disable react/prop-types */
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import * as yup from "yup";
import Loader from "../../../../../../Components/Loader/Loader";
import StepperComponent from "../../../../../../Components/StepperComponent/StepperComponent";
import { useLoanPaymentModal } from "../../../../../../Contexts/ModalContext";
import { useUpdateBalance } from "../../../../../../services/accountServices";
import {
  useGetLoan,
  useUpdateLoanMonthlyPayment,
} from "../../../../../../services/loanServices";
import SenderAccount from "../../Transfer/SenderAccount";
import PaymentTransaction from "./PaymentTransaction";
import { toast } from "react-toastify";

function PaymentContent({ data }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const { isLoading, mutateAsync: updateBalance } = useUpdateBalance();
  const [searchParams] = useSearchParams();
  const selectedAccount = JSON.parse(searchParams.get("selectedAccount"));
  const { setOpen } = useLoanPaymentModal();
  const { isLoading: isUpdatingLoan, mutateAsync: updateLoan } =
    useUpdateLoanMonthlyPayment();
  const { data: loans } = useGetLoan();
  const currentBalance = +selectedAccount?.balance;
  const id = selectedAccount?.id;
  const selectedMonthlyPayment = data.find(
    (obj) => obj.id === +searchParams.get("paymentId")
  );

  const validationSchema = [
    yup.object({
      selectedAccount: yup
        .string()
        .test("limit-check", function (value) {
          if (
            JSON.parse(value).balance === 0 ||
            selectedMonthlyPayment?.totalAmountToPay > JSON.parse(value).balance
          )
            return this.createError({
              message: toast.error("Account's balance is insufficient!"),
            });
          else return true;
        })
        .required("This field is required!"),
    }),
    yup.object({}),
    yup.object({}),
  ];
  const currentValidationSchema = validationSchema[activeStep];
  const methods = useForm({
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
  });
  const loanId = loans.at(0)?.id;
  const monthlyPaymentId = selectedMonthlyPayment.id;

  const account = {
    ...selectedAccount,
    balance: currentBalance - selectedMonthlyPayment.totalAmountToPay,
  };
  const updatedPayment = {
    ...selectedMonthlyPayment,
    isInstallmentPaid: true,
  };

  const monthlyPayment = data.map((obj) =>
    obj.id === monthlyPaymentId ? updatedPayment : obj
  );

  const onSubmit = async () => {
    await updateBalance({ id, account });
    await updateLoan(
      {
        monthlyPayment,
        id: loanId,
        updateColumn: "applicantPaymentPlan",
      },
      // when successfull or not successfull waiting result
      { onSettled: () => setOpen(false) }
    );
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <StepperComponent
          transactionSteps={[
            {
              label: "Account",
              component: (
                <SenderAccount monthlyPayment={selectedMonthlyPayment} />
              ),
            },
            {
              label: "Payment Transaction",
              component: <PaymentTransaction data={data} />,
            },
          ].map((step) => step)}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </form>
    </FormProvider>
  );
}

export default PaymentContent;
