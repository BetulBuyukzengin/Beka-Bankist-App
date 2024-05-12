import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import {
  formatCurrency,
  generatePaymentMethod,
} from "../../../../../utils/utils";
import CustomDatePicker from "../../../../../Components/CustomDatePicker/CustomDatePicker";
import { useState } from "react";
import { useCreateMovements } from "../../../../../services/movementsServices";

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

  const { getValues, setValue, handleSubmit } = useFormContext();

  const { createMovement } = useCreateMovements();
  function onSubmit(data) {
    createMovement(data);
  }

  const {
    accountNumber,
    iban,
    fullNameWithAccount,
    fullNameWithIban,
    bankBranch,
    bankName,
    paymentMethod,
    selectedAccount,
    transferDescription,
    amountToSend,
  } = getValues();

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
              Full Name: {fullNameWithAccount || fullNameWithIban}
            </div>
            {bankName && (
              <div style={styleMarginRight}>Bank Name: {bankName}</div>
            )}
            {bankBranch && (
              <div style={styleMarginRight}>Bank Branch: {bankBranch}</div>
            )}
            <div>
              {accountNumber ? "Account Number" : "Iban"}:{" "}
              {accountNumber || iban}
            </div>
          </StyledBox>
        </StyledGrid>

        <StyledGrid item xs={8}>
          <StyledItem>Sender Account</StyledItem>
          <StyledBox>
            <div>Selected Account: {selectedAccount}</div>
            <div>Balance: 125</div>
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
            <StyledLabel>{transferDescription}</StyledLabel>
          </StyledBox>
        </StyledGrid>
        <StyledGrid item xs={8}>
          <StyledItem>Transfer Price</StyledItem>
          <StyledBox>
            <StyledLabel>2,00TL</StyledLabel>
          </StyledBox>
        </StyledGrid>
        <StyledGrid item xs={8}>
          <StyledItem>Transaction Date</StyledItem>
          <CustomDatePicker
            width="small"
            margin="small"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
              setValue("transactionDate", newValue);
            }}
          />
        </StyledGrid>
        <StyledGrid item xs={8}>
          <button onSubmit={handleSubmit(onSubmit)}>CONFIRM</button>
        </StyledGrid>
      </Grid>
    </Box>
  );
}
