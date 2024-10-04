import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import {
  media31_25em,
  media48em,
  transferPrice,
} from "../../../../../Constants/constants";
import {
  formatArrayWord,
  formatCurrency,
  formatIBAN,
  formatWord,
  generatePaymentMethod,
} from "../../../../../utils/utils";

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
  ${media48em} {
    font-size: 0.8rem;
  }
  ${media31_25em} {
    font-size: 0.7rem;
  }
`;
const StyledItem = styled(Paper)`
  width: 70%;
  background-color: var(--color-background-3) !important;
  color: var(--color-text) important !important;
  padding: 0.5rem 0rem;
  text-align: center;
  ${media48em} {
    font-size: 0.8rem;
  }
  ${media31_25em} {
    font-size: 0.7rem;
  }
`;
const StyledDiv = styled.div`
  margin-right: 1rem;
  ${media48em} {
    font-size: 0.8rem;
    margin-right: 0;
  }
  ${media31_25em} {
    font-size: 0.7rem;
  }
`;
export default function TransactionControl() {
  const [date, setDate] = useState(new Date());

  const { getValues, setValue } = useFormContext();
  const [searchParams] = useSearchParams();

  const getStatus = searchParams.get("status");

  setValue(
    "status",
    (getStatus === "New Recipient" ||
      getStatus === "Registered Recipients" ||
      getStatus === "With Iban" ||
      getStatus === "With Account Numbers" ||
      getStatus === "Transfer") &&
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
    registeredRecipient,
  } = getValues();
  const { accountNumber, balance } =
    selectedAccount && JSON.parse(selectedAccount);

  const registered = registeredRecipient && JSON.parse(registeredRecipient);
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
          "@media (max-width:48em)": {
            width: "100%",
          },
        }}
      >
        <StyledGrid item xs={12}>
          <StyledItem>Recipient Account</StyledItem>
          {!registered ? (
            <StyledBox>
              <StyledDiv>
                Full Name:
                {formatArrayWord(recipientFullNameWithAccount) ||
                  formatArrayWord(recipientFullNameWithIban)}
              </StyledDiv>
              {recipientBankName && (
                <StyledDiv>
                  Bank Name: {formatWord(recipientBankName)}
                </StyledDiv>
              )}
              {recipientBankBranch && (
                <StyledDiv>
                  Bank Branch: {formatWord(recipientBankBranch)}
                </StyledDiv>
              )}
              <StyledDiv>
                {recipientAccountNumber ? "Account Number" : "Iban"}:{" "}
                {formatIBAN(recipientAccountNumber) ||
                  formatIBAN(recipientIban)}
              </StyledDiv>
            </StyledBox>
          ) : (
            <StyledBox>
              <StyledDiv>
                Full Name:
                {formatArrayWord(registered?.recipientFullNameWithAccount) ||
                  formatArrayWord(registered?.recipientFullNameWithIban)}
              </StyledDiv>
              {registered?.recipientBankName && (
                <StyledDiv>
                  Bank Name: {formatWord(registered?.recipientBankName)}
                </StyledDiv>
              )}
              {registered?.recipientBankBranch && (
                <StyledDiv>
                  Bank Branch: {formatWord(registered?.recipientBankBranch)}
                </StyledDiv>
              )}
              <StyledDiv>
                {registered?.recipientAccountNumber ? "Account Number" : "Iban"}
                :
                {formatIBAN(registered?.recipientAccountNumber) ||
                  formatIBAN(registered?.recipientIban)}
              </StyledDiv>
            </StyledBox>
          )}
        </StyledGrid>

        <StyledGrid item xs={12}>
          <StyledItem>Sender Account</StyledItem>
          <StyledBox>
            <StyledDiv>Selected Account: {formatIBAN(accountNumber)}</StyledDiv>
            <StyledDiv>Balance: {formatCurrency(balance)}</StyledDiv>
          </StyledBox>
        </StyledGrid>
        <StyledGrid item xs={12}>
          <StyledItem>Amount: </StyledItem>
          <StyledBox>
            <StyledLabel>{formatCurrency(amountToSend)}</StyledLabel>
          </StyledBox>
        </StyledGrid>
        <StyledGrid item xs={12}>
          <StyledItem>Payment Method </StyledItem>
          <StyledBox>
            <StyledLabel>{generatePaymentMethod(paymentMethod)}</StyledLabel>
          </StyledBox>
        </StyledGrid>
        <StyledGrid item xs={12}>
          <StyledItem>Description </StyledItem>
          <StyledBox>
            <StyledLabel>
              {formatArrayWord(transferDescription) || "Not spesified"}
            </StyledLabel>
          </StyledBox>
        </StyledGrid>
        <StyledGrid item xs={12}>
          <StyledItem>Transfer Price</StyledItem>
          <StyledBox>
            <StyledLabel>{formatCurrency(transferPrice)}</StyledLabel>
          </StyledBox>
        </StyledGrid>
        <StyledGrid item xs={12}>
          <StyledItem>Transaction Date</StyledItem>
          <DatePicker
            value={date}
            format="dd/MM/yyyy"
            onChange={(newValue) => {
              setDate(newValue);
              setValue("transactionDate", newValue);
            }}
            disabled
            // sx={{
            //   marginTop: "1rem",
            //   width: "70%",
            //   "&:hover > div > fieldset": {
            //     borderColor: "var(--color-text)!important",
            //   },
            //   "&>label": {
            //     color: "var(--color-text)!important",
            //   },
            //   "& > div": {
            //     color: "var(--color-text)!importan",

            //     "& > fieldset": {
            //       borderColor: "var(--color-border-2) !important",
            //     },
            //   },
            // }}
            sx={{
              // width: "100%",
              // "&:hover > div > fieldset": {
              //   borderColor: "var(--color-text)!important",
              // },
              // "&>label": {
              //   color: "var(--color-text)!important",
              //   backgroundColor: "transparent!important",
              //   [media48em]: {
              //     fontSize: ".8rem",
              //   },
              //   [media31_25em]: {
              //     fontSize: ".7rem",
              //   },
              // },
              marginTop: "1rem",
              width: "70%",
              "& > .Mui-disabled": {
                borderColor: "var(--color-border-2) !important",
                backgroundColor: "var(--color-background-3)",
              },

              "& > div": {
                color: "var(--color-text)",

                "& > fieldset": {
                  borderColor: "var(--color-border-2) !important",
                },
              },
              "& div > input": {
                [media48em]: {
                  fontSize: ".8rem",
                },
                [media31_25em]: {
                  fontSize: ".7rem",
                },
                "&:disabled": {
                  WebkitTextFillColor: "var(--color-text) !important",
                  color: "var(--color-text) !important",
                },
              },
            }}
          />
        </StyledGrid>
      </Grid>
    </Box>
  );
}
