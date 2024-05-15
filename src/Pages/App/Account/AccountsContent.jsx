/* eslint-disable react/prop-types */
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import styled from "styled-components";
import {
  formatBankAccountNumber,
  formatCurrency,
  formatIBAN,
} from "../../../utils/utils";
import { useGetAccounts } from "../../../services/accountServices";
const StyledTitle = styled.h4`
  font-size: 1.3rem;
`;
const StyledValue = styled.p`
  font-size: 1.2rem;
`;
const StyledImg = styled.img`
  width: 10%;
`;
function AccountsContent({ item }) {
  console.log(item);
  return (
    <Grid container gap={5}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h6>
            {item.bankBranch}-{item.bankName}
          </h6>
        </Grid>
        <Grid item xs={12}>
          <h6>{formatBankAccountNumber(item.accountNumber)}</h6>
        </Grid>
        <Grid item xs={12}>
          <StyledImg src="../../../../public/img/card.png" />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{ display: "grid", gridTemplateColumns: "2fr 3fr" }}
        >
          <StyledTitle>Iban</StyledTitle>
          <StyledValue>{formatIBAN(item.iban)}</StyledValue>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: "1rem" }}>
          <Divider
            variant="fullWidth "
            sx={{ borderColor: "var(--color-text)" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "grid", gridTemplateColumns: "2fr 3fr" }}
        >
          <StyledTitle>Balance</StyledTitle>
          <StyledValue>{formatCurrency(item.balance)}</StyledValue>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default AccountsContent;
