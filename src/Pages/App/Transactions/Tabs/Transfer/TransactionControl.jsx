import { styled as styledMui } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import { formatCurrency } from "../../../../../utils/utils";
import CustomDatePicker from "../../../../../Components/CustomDatePicker/CustomDatePicker";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
const Item = styledMui(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const StyledBox = styled(Box)`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0.8rem;
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
`;
const StyledLabel = styled.label`
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;
const StyledItem = styled(Item)`
  width: 100%;
`;
// const dateStyle = {
//   width: width ? "100%" : "40%",
//   "&:hover > div > fieldset": {
//     borderColor: "var(--color-text)!important",
//   },
//   "&>label": {
//     color: "var(--color-text)",
//   },
//   "& > div": {
//     color: "var(--color-text)",

//     "& > fieldset": {
//       borderColor: "var(--color-border-2)!important",
//     },
//   },
// };
export default function TransactionControl() {
  const [date, setDate] = useState(new Date());

  const { getValues, setValue } = useFormContext();
  const {
    accountNumber,
    amountToSend,
    bankBranch,
    bankName,
    transactionDate,
    fullNameWithAccount,
    fullNameWithIban,
    iban,
    paymentMethod,
    saveAsRegisteredWithAccount,
    saveAsRegisteredWithIban,
    selectedAccount,
    showUsernameDescription,
    transferDescription,
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
            <h6>{fullNameWithAccount || fullNameWithIban}</h6>
            <div>{bankName}</div>
            <div>{accountNumber || iban}</div>
          </StyledBox>
        </StyledGrid>
        <StyledGrid item xs={8}>
          <StyledItem>Sender Account</StyledItem>
          <StyledBox>
            <h6>{bankBranch}</h6>
            <div>
              <label>Balance:</label>
              <label>125</label>
            </div>
          </StyledBox>
        </StyledGrid>
        <StyledGrid item xs={8}>
          <StyledItem>Amount: </StyledItem>
          <StyledLabel>{formatCurrency(amountToSend)}</StyledLabel>
        </StyledGrid>
        <StyledGrid item xs={8}>
          <StyledItem>Payment Method: </StyledItem>
          <StyledLabel>{paymentMethod}</StyledLabel>
        </StyledGrid>
        <StyledGrid item xs={8}>
          <StyledItem>Description: </StyledItem>
          <StyledLabel>{transferDescription}</StyledLabel>
        </StyledGrid>
        <StyledGrid item xs={8}>
          <StyledItem>Transfer Price</StyledItem>
          <StyledLabel>2,00TL</StyledLabel>
        </StyledGrid>
        <StyledGrid item xs={8}>
          <StyledItem>Transaction Date:</StyledItem>
          <CustomDatePicker
            width
            margin="small"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
              setValue("transactionDate", newValue);
            }}
            // register={register("transactionDate")}
          />
        </StyledGrid>
      </Grid>
    </Box>
  );
}
