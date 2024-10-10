/* eslint-disable react/prop-types */
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { usePDF } from "react-to-pdf";
import styled from "styled-components";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import { media31_25em, media48em } from "../../../Constants/constants";
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
  @media (max-width: 48em) {
    margin-right: 1rem;

    font-size: 0.85rem;
  }
  @media (max-width: 31.25em) {
    font-size: 0.75rem;
  }
`;
const StyledLabelDesc = styled.label`
  width: 60%;
  @media (max-width: 48em) {
    font-size: 0.81rem;
  }
  @media (max-width: 31.25em) {
    font-size: 0.71rem;
  }
`;

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-background-2);
  color: var(--color-text);
  padding: 2rem 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-gray);
  width: ${({ row }) =>
    row.status === "Deposit" || row.status === "Withdraw" ? "60%" : "90%"};
  height: 30rem;
  overflow-y: scroll;
  @media (max-width: 48em) {
    width: 100%;
  }
  @media (max-width: 31.25em) {
    padding: 2rem 0.3rem;
  }
`;

const StyledDescription = styled(Grid)`
  font-size: 14px;

  @media (max-width: 48em) {
    font-size: 0.8rem;
  }
  @media (max-width: 31.25em) {
    font-size: 0.7rem;
  }
`;
const StyledFileDownloadIcon = styled.span`
  ${media48em} {
    font-size: 0.6rem;
  }

  ${media31_25em} {
    font-size: 0.5rem;
  }
`;
export default function ReceiptContent({ row, setOpen }) {
  const { user } = useUser();
  const fullName = user?.user_metadata?.fullName;
  const { toPDF, targetRef } = usePDF({
    filename: "Receipt.pdf",
  });
  const selectedMyAccount = JSON.parse(row?.selectedAccount);
  return (
    <StyledBox row={row}>
      <ArrowBackIcon
        onClick={() => setOpen(false)}
        sx={{
          cursor: "pointer",
          marginLeft: "1rem",
          [media48em]: {
            fontSize: "1.2rem",
          },
          [media31_25em]: {
            fontSize: "1rem",
          },
        }}
      />
      <CustomButton
        style={{
          display: "flex",
          alignSelf: "end",
          "@media (max-width:48em)": {
            fontSize: ".4rem",
            padding: " 6px 10px",
          },
          "@media (max-width:31.25em)": {
            fontSize: ".3rem",
            padding: "3px 5px",
          },
        }}
        onClick={toPDF}
        buttonText={
          <StyledFileDownloadIcon>
            <FileDownloadIcon sx={{ color: "white!important" }} /> Export as PDF
          </StyledFileDownloadIcon>
        }
        color="success"
        variant="contained"
      />
      <Box
        sx={{
          backgroundColor: "var(--color-background-2)",
          color: "var(--color-text)",
          padding: "2rem .5rem",
          display: "flex",
          gap: "1rem",
          [media48em]: {
            gap: ".5rem",
            flexDirection: "column",
          },
        }}
        ref={targetRef}
      >
        {row?.status === "Deposit" || row?.status === "Withdraw" ? (
          <Grid
            container
            spacing={2}
            sx={{
              marginBottom: "2rem",
              border: "1px solid var(--color-text)",
              padding: "1rem",
              borderRadius: "5px",
              marginLeft: "0!important",
              "@media (max-width: 48em)": {
                padding: ".5rem",
                width: "100%",
              },
            }}
          >
            <Grid item xs={12}>
              <Typography
                component="h3"
                sx={{
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                  marginRight: "auto",
                  marginLeft: "auto",
                  marginBottom: "1rem",
                  fontSize: "1.5rem",
                  fontWeight: "bold",

                  [media48em]: {
                    fontSize: "1.2rem",
                  },
                  [media31_25em]: {
                    fontSize: "1rem",
                  },
                }}
              >
                {formatArrayWord("beka bankist")}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                paddingLeft: "0!important",
                display: "flex",
                "@media (max-width: 48em)": {
                  paddingTop: "0px!important",
                },
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
                {formatCurrency(row?.amountToSend)}
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
                width: "100%",
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
                <StyledLabelTitle>{formatWord("recipient")}: </StyledLabelTitle>
                <StyledLabelDesc>
                  {formatWord(row?.recipientFullNameWithIban) ||
                    formatWord(row?.recipientFullNameWithAccount)}
                </StyledLabelDesc>
              </Grid>
              {row?.recipientBankBranch && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    paddingLeft: "0!important",
                    display: "flex",
                  }}
                >
                  <StyledLabelTitle>
                    {formatArrayWord("recipient branch")}:
                  </StyledLabelTitle>
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
                {row?.recipientIban && (
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
                [media48em]: {
                  width: "100%",
                },
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
      <Grid
        container
        sx={{
          [media48em]: {
            paddingLeft: "1rem",
          },
        }}
      >
        <StyledDescription
          item
          xs={12}
          sm={6}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginLeft: "1rem",
            "@media (max-width: 48em) ": {
              fontSize: ".9rem",
            },
            "@media (max-width:31.25em) ": {
              fontSize: ".8rem",
            },
          }}
        >
          DEAR {fullName?.toUpperCase()}
        </StyledDescription>
        <StyledDescription item xs={12}>
          {row.status === "Withdraw" &&
            `Withdrawn ${formatCurrency(row.amountToSend)} from your account`}

          {row.status === "Deposit" &&
            `${formatCurrency(row.amountToSend)} was deposited to your ${
              selectedMyAccount?.bankName
            } account with iban ${
              selectedMyAccount?.iban
            } and account number  ${selectedMyAccount?.accountNumber}`}

          {row?.status === "Transfer" &&
            `${formatCurrency(
              row?.amountToSend
            )} has been transferred from your account to ${
              row?.recipientFullNameWithIban ||
              row?.recipientFullNameWithAccount
            }.`}
        </StyledDescription>
        <StyledDescription item xs={12}>
          Invoice creation date: {formatDate(new Date())}
        </StyledDescription>
        <StyledDescription
          item
          xs={12}
          sx={{
            marginLeft: "2rem",
            display: "flex",
            alignItems: "end",
            justifyContent: "end",
            "@media (max-width:48em) ": {
              marginLeft: "0rem",
              marginTop: "1rem",
            },
          }}
        >
          REGARDS BEKA BANKIST ETHERNET BRANCH
        </StyledDescription>
      </Grid>
    </StyledBox>
  );
}
