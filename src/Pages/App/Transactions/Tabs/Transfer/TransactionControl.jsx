import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import {
  formatArrayWord,
  formatCurrency,
  formatIBAN,
  formatWord,
  generatePaymentMethod,
} from "../../../../../utils/utils";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { transferPrice } from "../../../../../Constants/constants";

const StyledBox = styled(Box)`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0.8rem 0;
  font-size: 15px;
`;
const StyledGrid = styled(Grid)`
  border: 1px solid var(--color-border);
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: column !important;
  margin: 0.5rem !important;
  padding-left: 0 !important;
  padding-top: 0 !important;
  padding: 1rem !important;
  background-color: var(--color-background-4) !important;
  box-shadow: transparent 1px 4px 5px;
  transition: all 0.3s;

  &:hover {
    box-shadow: var(--color-secondary) 1px 4px 5px;
  }
`;
const StyledLabel = styled.label`
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;
const StyledItem = styled(Paper)`
  width: 70%;
  background-color: var(--color-background-3) !important;
  color: var(--color-text) important !important;
  padding: 0.5rem 0rem;
  text-align: center;
`;
const styleMarginRight = {
  marginRight: "1rem",
};

export default function TransactionControl() {
  const [date, setDate] = useState(new Date());

  const { getValues, setValue } = useFormContext();
  const [searchParams] = useSearchParams();

  const getStatus = searchParams.get("status");

  setValue(
    "status",
    (getStatus === "New Recipient" || getStatus === "Registered Recipients") &&
      "Transfer"
  );

  const {
    recipientAccountNumber,
    recipientIban,
    recipientFullNameWithAccount,
    recipientFullNameWithIban,
    recipientBankBranch,
    recipientBankName,
    paymentMethod,
    selectedAccount,
    transferDescription,
    amountToSend,
  } = getValues();

  const { accountNumber, balance } = JSON.parse(selectedAccount);
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          width: "50%",
          justifyContent: "center",
        }}
      >
        <StyledGrid item xs={8}>
          <StyledItem>Recipient Account</StyledItem>
          <StyledBox>
            <div style={styleMarginRight}>
              Full Name:
              {formatArrayWord(recipientFullNameWithAccount) ||
                formatArrayWord(recipientFullNameWithIban)}
            </div>
            {recipientBankName && (
              <div style={styleMarginRight}>
                Bank Name: {formatWord(recipientBankName)}
              </div>
            )}
            {recipientBankBranch && (
              <div style={styleMarginRight}>
                Bank Branch: {formatWord(recipientBankBranch)}
              </div>
            )}
            <div>
              {recipientAccountNumber ? "Account Number" : "Iban"}:{" "}
              {recipientAccountNumber || recipientIban}
            </div>
          </StyledBox>
        </StyledGrid>

        <StyledGrid item xs={8}>
          <StyledItem>Sender Account</StyledItem>
          <StyledBox>
            <div>Selected Account: {formatIBAN(accountNumber)}</div>
            <div>Balance: {formatCurrency(balance)}</div>
          </StyledBox>
        </StyledGrid>
        <StyledGrid item xs={8}>
          <StyledItem>Amount: </StyledItem>
          <StyledBox>
            <StyledLabel>{formatCurrency(amountToSend)}</StyledLabel>
          </StyledBox>
        </StyledGrid>
        <StyledGrid item xs={8}>
          <StyledItem>Payment Method </StyledItem>
          <StyledBox>
            <StyledLabel>{generatePaymentMethod(paymentMethod)}</StyledLabel>
          </StyledBox>
        </StyledGrid>
        <StyledGrid item xs={8}>
          <StyledItem>Description </StyledItem>
          <StyledBox>
            <StyledLabel>{formatArrayWord(transferDescription)}</StyledLabel>
          </StyledBox>
        </StyledGrid>
        <StyledGrid item xs={8}>
          <StyledItem>Transfer Price</StyledItem>
          <StyledBox>
            <StyledLabel>{formatCurrency(transferPrice)}</StyledLabel>
          </StyledBox>
        </StyledGrid>
        <StyledGrid item xs={8}>
          <StyledItem>Transaction Date</StyledItem>

          <DatePicker
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
              setValue("transactionDate", newValue);
            }}
            sx={{
              marginTop: "1rem",
              width: "70%",
              "&:hover > div > fieldset": {
                borderColor: "var(--color-text)!important",
              },
              "&>label": {
                color: "var(--color-text)",
              },
              "& > div": {
                color: "var(--color-text)",

                "& > fieldset": {
                  borderColor: "var(--color-border-2) !important",
                },
              },
            }}
          />
        </StyledGrid>
      </Grid>
    </Box>
  );
}
