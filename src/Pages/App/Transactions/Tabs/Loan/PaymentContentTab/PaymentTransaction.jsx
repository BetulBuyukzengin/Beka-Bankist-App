/* eslint-disable react/prop-types */
import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { formatCurrency, formatDate } from "../../../../../../utils/utils";

const StyledBox = styled(Box)`
  width: 100%;
  padding: 0.5rem 2rem;
  border: 1px solid var(--color-border-2);
  display: inline-block;
  @media (max-width: 48em) {
    font-size: 0.8rem;
  }
  @media (max-width: 31.25em) {
    font-size: 0.7rem;
  }
`;

function PaymentTransaction({ data }) {
  const [searchParams] = useSearchParams();
  const { totalAmountToPay, date, id, interestAmount } = data.find(
    (obj) => obj.id === +searchParams.get("paymentId")
  );
  return (
    <Grid container sx={{ width: "100%" }}>
      <Grid
        item
        xs={12}
        sx={{
          marginBottom: ".5rem",
          fontSize: ".9rem",
          color: "var(--color-text)",
          "@media (max-width:48em)": {
            fontSize: ".8rem",
          },
          "@media (max-width:31.25em)": {
            fontSize: ".7rem",
          },
        }}
      >
        Kredinizin {formatDate(date)} tarihli {id + 1}. ayın{" "}
        {interestAmount > 0 && "gecikmeli"} ödemesi olan toplam tutarı:
      </Grid>
      <Grid item xs={6}>
        <StyledBox>{formatCurrency(totalAmountToPay)}</StyledBox>
      </Grid>
    </Grid>
  );
}

export default PaymentTransaction;
