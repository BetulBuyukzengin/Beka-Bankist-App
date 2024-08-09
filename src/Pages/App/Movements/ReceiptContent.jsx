/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import MenuIcon from "../../../Components/MenuIcon/MenuIcon";
import { usePDF } from "react-to-pdf";
import { useUser } from "../../../services/userServices";
import {
  formatArrayWord,
  formatCurrency,
  formatDate,
  formatIBAN,
  formatWord,
} from "../../../utils/utils";

const StyledLabelTitle = styled.label`
  width: 40%;
`;
const StyledLabelDesc = styled.label`
  width: 60%;
`;
const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 55%;
  background-color: var(--color-background-2);
  color: var(--color-text);
  padding: 2rem 1rem;
  border-radius: 5px;
`;
const StyledDescription = styled.p`
  font-size: 14px;
`;

export default function ReceiptContent({ row }) {
  const { user } = useUser();
  const fullName = user.user_metadata.fullName;
  const { toPDF, targetRef } = usePDF({ filename: "Receipt.pdf" });
  const selectedMyAccount = JSON.parse(row.selectedAccount);

  return (
    <StyledBox
      sx={{
        flexGrow: 1,
        border: "1px solid var(--color-gray)",
        width:
          row.status === "Deposit" || row.status === "Withdraw" ? "60%" : "90%",
      }}
      ref={targetRef}
    >
      <MenuIcon toPDF={toPDF} />
      <Box mb={4}>
        <h5>{formatArrayWord("beka bankist")}</h5>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
        }}
      >
        {row.status === "Deposit" || row.status === "Withdraw" ? (
          <Grid
            container
            spacing={2}
            sx={{
              marginBottom: "2rem",
              border: "1px solid var(--color-text)",
              padding: "1rem",
              borderRadius: "5px",
              marginLeft: "0!important",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                paddingLeft: "0!important",
                display: "flex",
              }}
            >
              <StyledLabelTitle>Account Holder: </StyledLabelTitle>
              <StyledLabelDesc>{selectedMyAccount?.fullName}</StyledLabelDesc>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                paddingLeft: "0!important",
                display: "flex",
              }}
            >
              <StyledLabelTitle>Account Iban: </StyledLabelTitle>
              <StyledLabelDesc>{selectedMyAccount?.iban}</StyledLabelDesc>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                paddingLeft: "0!important",
                display: "flex",
              }}
            >
              <StyledLabelTitle>Account Number: </StyledLabelTitle>
              <StyledLabelDesc>
                {selectedMyAccount?.accountNumber}
              </StyledLabelDesc>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                paddingLeft: "0!important",
                display: "flex",
              }}
            >
              <StyledLabelTitle>Amount: </StyledLabelTitle>
              <StyledLabelDesc>
                {formatCurrency(row?.amountToBeDepositMyAccount) ||
                  formatCurrency(row?.amountToWithdrawMyAccount)}
              </StyledLabelDesc>
            </Grid>
          </Grid>
        ) : (
          <>
            <Grid
              container
              spacing={2}
              sx={{
                marginBottom: "2rem",
                border: "1px solid var(--color-text)",
                padding: "1rem",
                borderRadius: "5px",
                marginLeft: "0!important",
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  paddingLeft: "0!important",
                  display: "flex",
                }}
              >
                <StyledLabelTitle>RECIPIENT: </StyledLabelTitle>
                <StyledLabelDesc>
                  {formatWord(row?.recipientFullNameWithIban) ||
                    formatWord(row?.recipientFullNameWithAccount)}
                </StyledLabelDesc>
              </Grid>
              {row.recipientBankBranch && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    paddingLeft: "0!important",
                    display: "flex",
                  }}
                >
                  <StyledLabelTitle>RECIPIENT BRANCH: </StyledLabelTitle>
                  <StyledLabelDesc>
                    {formatWord(row?.recipientBankBranch)}
                  </StyledLabelDesc>
                </Grid>
              )}
              <Grid
                item
                xs={12}
                sx={{
                  paddingLeft: "0!important",
                  display: "flex",
                }}
              >
                {row.recipientIban && (
                  <>
                    <StyledLabelTitle> REIPIENT IBAN: </StyledLabelTitle>
                    <StyledLabelDesc>
                      {formatIBAN(row?.recipientIban)}
                    </StyledLabelDesc>
                  </>
                )}
                {row.recipientAccountNumber && (
                  <>
                    <StyledLabelTitle> RECIPIENT ACCOUNT NO: </StyledLabelTitle>
                    <StyledLabelDesc>
                      {formatIBAN(row?.recipientAccountNumber)}
                    </StyledLabelDesc>
                  </>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  paddingLeft: "0!important",
                  display: "flex",
                }}
              >
                <StyledLabelTitle>OPERATION DATE: </StyledLabelTitle>
                <StyledLabelDesc>{formatDate(row?.createdAt)}</StyledLabelDesc>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  paddingLeft: "0!important",
                  display: "flex",
                }}
              >
                <StyledLabelTitle>Amount: </StyledLabelTitle>
                <StyledLabelDesc>
                  {formatCurrency(row?.amountToSend)}
                </StyledLabelDesc>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              sx={{
                marginBottom: "2rem",
                border: "1px solid var(--color-text)",
                padding: "1rem",
                borderRadius: "5px",
                marginLeft: "0!important",
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  paddingLeft: "0!important",
                  display: "flex",
                }}
              >
                <StyledLabelTitle>SENDER: </StyledLabelTitle>
                <StyledLabelDesc>{row?.senderFullName}</StyledLabelDesc>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  paddingLeft: "0!important",
                  display: "flex",
                }}
              >
                <StyledLabelTitle>SENDER BRANCH: </StyledLabelTitle>
                <StyledLabelDesc>
                  {formatWord(selectedMyAccount?.bankBranch)}
                </StyledLabelDesc>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  paddingLeft: "0!important",
                  display: "flex",
                }}
              >
                <StyledLabelTitle>SENDER IBAN: </StyledLabelTitle>
                <StyledLabelDesc>
                  {formatIBAN(selectedMyAccount?.iban)}
                </StyledLabelDesc>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
      <Grid container>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginLeft: "1rem",
          }}
        >
          DEAR {fullName.toUpperCase()}
          <StyledDescription>
            {row.status === "withdraw" &&
              `Withdrawn ${row.movements} from your account`}
            {row.status === "deposit" &&
              `${row.movements} deposited into your account from ${row.sender}`}
            {row.status === "transfer" &&
              `${row.movements} has been transferred from your account to ${row.recipient}.`}
          </StyledDescription>
          <StyledDescription>
            Invoice creation date: {formatDate(new Date())}
          </StyledDescription>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{
            marginLeft: "2rem",
            display: "flex",
            alignItems: "end",
            justifyContent: "end",
          }}
        >
          <StyledDescription>
            REGARDS BEKA BANKIST ETHERNET BRANCH
          </StyledDescription>
        </Grid>
      </Grid>
    </StyledBox>
  );
}
