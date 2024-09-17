import { Grid } from "@mui/material";
import Table from "../../../../../Components/Table/Table";
import { useGetLoan } from "../../../../../services/loanServices";
import {
  formatArrayWord,
  formatCurrency,
  formatWord,
} from "../../../../../utils/utils";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLoanPaymentModal } from "../../../../../Contexts/ModalContext";
import styled from "styled-components";

const StyledH6 = styled.h6`
  @media (max-width: 48em) {
    font-size: 0.9rem;
  }
  @media (max-width: 31.25em) {
    font-size: 0.8rem;
  }
`;
const StyledP = styled.p`
  @media (max-width: 48em) {
    font-size: 0.8rem;
  }
  @media (max-width: 31.25em) {
    font-size: 0.7rem;
  }
`;
function PaymentLoan() {
  const { data: loanData, isLoading } = useGetLoan();
  const notPaidLoan = loanData?.find((data) => data?.isCreditPaid === false);
  const { bankName, bankBranch, fullName } = JSON.parse(
    notPaidLoan?.selectedAccount
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const { open } = useLoanPaymentModal();

  const status = searchParams.get("status");
  useEffect(() => {
    if (status === "Take out a loan" && !open) {
      searchParams.delete("selectedAccount");
      setSearchParams(searchParams);
    }
  }, [status, searchParams, open, setSearchParams]);

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
        // marginBottom: "12rem",

        "@media (max-width:48em)": {
          marginBottom: "2rem",
        },
      }}
    >
      <Grid item xs={12}>
        <StyledH6>Kredi Ödeme</StyledH6>
      </Grid>
      <Grid item xs={12}>
        <StyledP>
          Sayın {formatArrayWord(fullName)}. {formatWord(bankName)}-
          {formatWord(bankBranch)} bankasından{" "}
          {/* {loanData?.at(0)?.applicantPaymentPlan?.date} tarihinde çektiğiniz{" "} */}
          {formatCurrency(notPaidLoan.applicantLoanAmount)} tutarlık kredinin{" "}
          {notPaidLoan.selectedPaymentPeriod * 12} aylık ödeme planı aşağıda
          belirtilmiştir.
        </StyledP>
      </Grid>

      <Grid item xs={12}>
        {/* <CustomTable data={paymentData} /> */}
        <Table />
      </Grid>
    </Grid>
  );
}

export default PaymentLoan;
