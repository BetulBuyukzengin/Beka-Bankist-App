/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import {
  formatArrayWord,
  formatBankAccountNumber,
  formatCurrency,
  formatIBAN,
} from "../../../utils/utils";

const StyledTypographyH4 = styled(Typography)`
  font-size: 1.5rem !important;

  @media (max-width: 48em) {
    font-size: 1.2rem !important;
  }
  @media (max-width: 31.25em) {
    font-size: 1rem !important;
  }
`;
const StyledTypographyH6 = styled(Typography)`
  font-size: 1.5rem !important;

  @media (max-width: 48em) {
    font-size: 1.2rem !important;
  }
  @media (max-width: 31.25em) {
    font-size: 1rem !important;
  }
`;
const StyledValue = styled.p`
  font-size: 1.2rem;
  @media (max-width: 48em) {
    font-size: 1rem !important;
  }
  @media (max-width: 31.25em) {
    font-size: 0.8rem !important;
  }
`;
const StyledImg = styled.img`
  width: 10%;
`;
function AccountsContent({ item }) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StyledTypographyH6 component="h6">
            {formatArrayWord(item.bankBranch)}-{formatArrayWord(item.bankName)}
          </StyledTypographyH6>
        </Grid>
        <Grid item xs={12}>
          <StyledTypographyH6 component="h6">
            {formatBankAccountNumber(item.accountNumber)}
          </StyledTypographyH6>
        </Grid>
        <Grid item xs={12}>
          <StyledImg src="../../../../img/card.png" />
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 3fr",
            alignItems: "baseline",
            "@media (max-width: 31.25em)": {
              gridTemplateColumns: "1fr 4fr",
            },
          }}
        >
          <StyledTypographyH4 component="h4">Iban</StyledTypographyH4>
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
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 3fr",
            alignItems: "baseline",
            "@media (max-width: 31.25em)": {
              gridTemplateColumns: "1fr 4fr",
            },
          }}
        >
          <StyledTypographyH4 component="h4">Balance</StyledTypographyH4>
          <StyledValue>{formatCurrency(item.balance)}</StyledValue>
        </Grid>
      </Grid>
    </>
  );
}
export default AccountsContent;
