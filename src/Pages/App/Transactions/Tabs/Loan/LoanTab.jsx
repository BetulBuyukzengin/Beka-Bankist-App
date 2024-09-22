import { matchIsValidTel } from "mui-tel-input";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import CustomMenuIcon from "../../../../../Components/CustomMenuIcon/CustomMenuIcon";
import Loader from "../../../../../Components/Loader/Loader";
import StepperComponent from "../../../../../Components/StepperComponent/StepperComponent";
import {
  identificationNumberCharacter,
  interestAmountConst,
} from "../../../../../Constants/constants";
import {
  useCreateLoan,
  useGetLoan,
} from "../../../../../services/loanServices";
import { useUser } from "../../../../../services/userServices";
import { calcNextMonth } from "../../../../../utils/utils";
import SelectAccount from "../Transfer/SelectAccount";
import BusinessInformation from "./BusinessInformation";
import LoanInformation from "./LoanInformation";
import PaymentLoan from "./PaymentLoan";
import PersonalInformation from "./PersonalInformation";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomModal from "../../../../../Components/CustomModal/CustomModal";
import PaidLoans from "./PaidLoans";
import { useUpdateAccount } from "../../../../../services/accountServices";

const transactionSteps = [
  {
    label: "Applicant Account",
    component: <SelectAccount />,
  },
  {
    label: "Personal Information",
    component: <PersonalInformation />,
  },
  {
    label: "Business Information",
    component: <BusinessInformation />,
  },
  {
    label: "Loan Information",
    component: <LoanInformation />,
  },
];
const StyleDiv = styled.div`
  display: flex;
  justify-content: end;
`;

function LoanTab() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutateAsync: createLoan } = useCreateLoan();
  const { data: loanData, isLoading } = useGetLoan();
  const [phoneNumber, setPhoneNumber] = useState("");
  const selectedAccount = JSON.parse(searchParams.get("selectedAccount"));
  const { mutateAsync: updateBalance } = useUpdateAccount();
  const currentBalance = +selectedAccount?.balance;

  const validationSchema = [
    yup.object({
      selectedAccount: yup.string().required("This field is required!"),
    }),
    //validation for step 1
    yup.object({
      // prettier-ignore
      applicantFullName: yup.string(),
      applicantIdentificationNumber: yup
        .string()
        .length(
          identificationNumberCharacter,
          "Identification number must be exactly 11 characters!"
        ),
      applicantAdress: yup.string().required("This field is required!"),
      applicantPhoneNumber: yup
        .string()
        .required("Phone number is required")
        .test("is-valid-phone", "Phone number is invalid", (value) =>
          matchIsValidTel(value)
        ),
    }),

    //validation for step 2
    yup.object({
      applicantBusinessName: yup.string().required("This field is required!"),
      applicantSectorOfWork: yup.string().required("This field is required!"),
      applicantJob: yup.string().required("This field is required!"),
    }),

    //validation for step 3
    yup.object({
      applicantTotalIncome: yup.string().required("This field is required!"),
      applicantTotalExpense: yup.string().required("This field is required!"),
      applicantLoanPurpose: yup.string().required("This field is required!"),
      selectedPaymentPeriod: yup.number().required("This field is required!"),
      applicantLoanAmount: yup
        .number()
        .required("This field is required!")
        .min(
          (+searchParams.get("max-loan-amount") * 20) / 100,
          `Loan amount can't be less than ${
            (+searchParams.get("max-loan-amount") * 20) / 100
          }!`
        )
        .max(
          +searchParams.get("max-loan-amount"),
          "Loan amount can't be greater than maximum loan amount!"
        ),
    }),
    yup.object({}),
  ];
  const [activeStep, setActiveStep] = React.useState(0);
  const currentValidationSchema = validationSchema[activeStep];

  const methods = useForm({
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
  });

  const currentStatus = searchParams.get("status");

  const prevStatus = React.useRef(null);
  const { reset } = methods;
  const { user } = useUser();

  //! Reset all fields and redirect to first step based on status change
  useEffect(() => {
    if (currentStatus !== prevStatus.current) {
      reset();
      setPhoneNumber("");
      setActiveStep(0);
    }
    prevStatus.current = currentStatus;
  }, [reset, currentStatus]);

  let interestAmount = 0;
  const todayDate = new Date();

  function isInterestAmount(data) {
    if (todayDate > data?.date && !data?.isPaid) {
      return (interestAmount = interestAmount + interestAmountConst);
    } else {
      return (interestAmount = 0);
    }
  }
  const onSubmit = async (data) => {
    const calcAmountToPay =
      data?.applicantLoanAmount / (data?.selectedPaymentPeriod * 12);
    const dateObject = new Date();
    let length = data?.selectedPaymentPeriod * 12;
    const paymentData = new Array(length).fill(null).map((_, i) => ({
      id: i,
      date: calcNextMonth(dateObject, i + 1),
      // paymentPeriod: formattedLoanData?.selectedPaymentPeriod,
      interestAmount: 0,
      amountToPay: calcAmountToPay,
      totalAmountToPay: calcAmountToPay + interestAmount,
      isInstallmentPaid: false,
    }));
    const formDatas = {
      ...data,
      applicantFullName: user.user_metadata.fullName,
      applicantIdentificationNumber: selectedAccount?.identificationNumber,
      applicantBirthday: selectedAccount?.birthday,
      isCreditPaid: false,
      user_id: JSON.parse(data.selectedAccount).user_id,
      applicantPaymentPlan: paymentData?.map((data) => {
        return {
          ...data,
          interestAmount: isInterestAmount(data),
          totalAmountToPay: calcAmountToPay + interestAmount,
        };
      }),
    };
    const updatedAccount = {
      ...selectedAccount,
      balance: currentBalance + Number(data?.applicantLoanAmount),
    };
    await createLoan(formDatas);
    await updateBalance({
      id: selectedAccount.id,
      account: updatedAccount,
    });
    //? navigate to loan tab
    navigate("/applayout/account");
  };
  const notPaidLoan = loanData?.find((data) => data?.isCreditPaid === false);
  const [openPaidLoansModal, setOpenPaidLoansModal] = useState(false);

  const handleOpenPaidLoansModal = () => setOpenPaidLoansModal(true);

  const menuIconContents = [
    {
      openModal: handleOpenPaidLoansModal,
      label: "Display Paid Loans",
    },
  ];

  if (isLoading) return <Loader />;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <StyleDiv>
          <CustomMenuIcon contents={menuIconContents} />
        </StyleDiv>
        {notPaidLoan ? (
          <PaymentLoan />
        ) : (
          <>
            {/* <StyleDiv>
              <CustomMenuIcon contents={menuIconContents} />
            </StyleDiv>
            <CustomModal
              open={openPaidLoansModal}
              setOpen={setOpenPaidLoansModal}
            >
              <PaidLoans />
            </CustomModal> */}
            <StepperComponent
              transactionSteps={transactionSteps.map((step) =>
                step.label === "Personal Information"
                  ? {
                      ...step,
                      component: (
                        <PersonalInformation
                          phoneNumber={phoneNumber}
                          setPhoneNumber={setPhoneNumber}
                        />
                      ),
                    }
                  : step.label === "Sender Account"
                  ? {
                      ...step,
                      component: <SelectAccount border="standard" />,
                    }
                  : step
              )}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </>
        )}
        {/* <StyleDiv>
          <CustomMenuIcon contents={menuIconContents} />
        </StyleDiv> */}
        <CustomModal open={openPaidLoansModal} setOpen={setOpenPaidLoansModal}>
          <PaidLoans />
        </CustomModal>
      </form>
    </FormProvider>
  );
}

export default LoanTab;
