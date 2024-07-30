import { Grid } from "@mui/material";
import Table from "../../../../../Components/Table/Table";
import Loader from "../../../../../Components/Loader/Loader";
import {
  useGetLoan,
  useUpdateLoanMonthlyPayment,
} from "../../../../../services/loanServices";
import {
  formatArrayWord,
  formatCurrency,
  formatWord,
} from "../../../../../utils/utils";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLoanPaymentModal } from "../../../../../Contexts/ModalContext";

function PaymentLoan() {
  const { data: loanData, isLoading } = useGetLoan();
  const notPaidLoan = loanData?.find((data) => data?.isCreditPaid === false);
  const { bankName, bankBranch, fullName } = JSON.parse(
    notPaidLoan?.selectedAccount
  );
  const { isPending: isUpdatingLoan } = useUpdateLoanMonthlyPayment();
  const [searchParams, setSearchParams] = useSearchParams();
  const { open } = useLoanPaymentModal();
  //! Status take out a loan ise yapsın.
  const status = searchParams.get("status");
  useEffect(() => {
    if (status === "Take out a loan" && !open) {
      searchParams.delete("selectedAccount");
      searchParams.delete("paymentId");
      setSearchParams(searchParams);
    }
  }, [status, searchParams, open, setSearchParams]);

  if (isLoading || isUpdatingLoan) return <Loader />;
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <Grid item xs={12}>
        <h6>Kredi Ödeme</h6>
      </Grid>
      <Grid item xs={12}>
        <p>
          Sayın {formatArrayWord(fullName)}. {formatWord(bankName)}-
          {formatWord(bankBranch)} bankasından{" "}
          {/* {loanData?.at(0)?.applicantPaymentPlan?.date} tarihinde çektiğiniz{" "} */}
          {formatCurrency(notPaidLoan.applicantLoanAmount)} tutarlık kredinin{" "}
          {notPaidLoan.selectedPaymentPeriod * 12} aylık ödeme planı aşağıda
          belirtilmiştir.
        </p>
      </Grid>
      <Grid item xs={12}>
        {/* <CustomTable data={paymentData} /> */}
        <Table data={loanData?.at(0)?.applicantPaymentPlan} />
      </Grid>
    </Grid>
  );
}

export default PaymentLoan;
