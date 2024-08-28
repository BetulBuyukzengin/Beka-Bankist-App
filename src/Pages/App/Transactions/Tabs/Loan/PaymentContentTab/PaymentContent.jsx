/* eslint-disable react/prop-types */
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import StepperComponent from "../../../../../../Components/StepperComponent/StepperComponent";
import { useLoanPaymentModal } from "../../../../../../Contexts/ModalContext";
import { useUpdateAccount } from "../../../../../../services/accountServices";
import {
  useGetLoan,
  useUpdateLoanMonthlyPayment,
} from "../../../../../../services/loanServices";
import SelectAccount from "../../Transfer/SelectAccount";
import PaymentTransaction from "./PaymentTransaction";

function PaymentContent({ data }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const { mutateAsync: updateBalance } = useUpdateAccount();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedAccount = JSON.parse(searchParams.get("selectedAccount"));
  const { setOpen } = useLoanPaymentModal();
  const { mutateAsync: updateLoan } = useUpdateLoanMonthlyPayment();
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
  const loanId = loans.find((loan) => !loan.isCreditPaid).id;
  const monthlyPaymentId = selectedMonthlyPayment.id;

  const account = useMemo(() => {
    return {
      ...selectedAccount,
      balance: currentBalance - selectedMonthlyPayment.totalAmountToPay,
    };
  }, [
    selectedAccount,
    currentBalance,
    selectedMonthlyPayment.totalAmountToPay,
  ]);

  // const account = {
  //   ...selectedAccount,
  //   balance: currentBalance - selectedMonthlyPayment.totalAmountToPay,
  // };
  const updatedPayment = useMemo(() => {
    return {
      ...selectedMonthlyPayment,
      isInstallmentPaid: true,
    };
  }, [selectedMonthlyPayment]);

  const monthlyPayment = useMemo(() => {
    return data.map((obj) =>
      obj.id === monthlyPaymentId ? updatedPayment : obj
    );
  }, [monthlyPaymentId, updatedPayment, data]);
  const onSubmit = async () => {
    await updateBalance({ id, account });
    await updateLoan(
      {
        monthlyPayment,
        id: loanId,
        updateColumn: "applicantPaymentPlan",
      },
      {
        onSettled: () => {
          setOpen(false);
          // searchParams.delete("paymentId");
          // setTimeout(() => {
          //   setSearchParams(searchParams);
          // }, 1500);
        },
      }
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
                <SelectAccount monthlyPayment={selectedMonthlyPayment} />
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
