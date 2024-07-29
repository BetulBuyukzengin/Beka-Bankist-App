import { Box, Grid } from "@mui/material";
import CustomTextField from "../../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { formatCurrency, formatDate } from "../../../../../../utils/utils";

const StyledBox = styled(Box)`
  width: 100%;
  padding: 0.5rem 2rem;
  border: 1px solid var(--color-border-2);
  display: inline-block;
`;

function PaymentTransaction({ data }) {
  const { register, formState } = useFormContext();
  const { errors } = formState;
  const [searchParams] = useSearchParams();
  const { totalAmountToPay, date, id, interestAmount } = data.find(
    (obj) => obj.id === +searchParams.get("paymentId")
  );
  const [loanPaymentAmount, setLoanPaymentAmount] = useState(0);
  const handleLoanPaymentChange = (e) => setLoanPaymentAmount(+e.target.value);
  return (
    <Grid container sx={{ width: "100%" }}>
      <Grid
        item
        xs={12}
        sx={{
          marginBottom: ".5rem",
          fontSize: ".9rem",
          color: "var(--color-text)",
        }}
      >
        Kredinizin {formatDate(date)} tarihli {id + 1}. ayın{" "}
        {interestAmount > 0 && "gecikmeli"} ödemesi olan toplam tutarı:
      </Grid>
      <Grid item xs={6}>
        <StyledBox>{formatCurrency(totalAmountToPay)}</StyledBox>
        {/* <CustomTextField
          defaultValue={selectedPaymentTotalAmountToPay}
          // value={selectedPaymentTotalAmountToPay || loanPaymentAmount}
          // onChange={handleLoanPaymentChange}
          // disabled={true}
          id="paymentAmount"
          label="Loan amount to be paid"
          type="number"
          register={{ ...register("loanPaymentAmount") }}
          helperText={errors?.loanPaymentAmount?.message}
          error={errors?.loanPaymentAmount}
        /> */}
      </Grid>
    </Grid>
  );
}

export default PaymentTransaction;
