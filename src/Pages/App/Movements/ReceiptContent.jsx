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
import { useCurrentUser } from "../../../Hooks/useCurrentUser";
import Heading from "../../../Components/Heading/Heading";
const StyledLabelTitle = styled.label`
  width: ${(props) =>
    props.status === "Withdraw" || props.status === "Deposit" ? "30%" : "40%"};
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
    row?.status === "Deposit" || row?.status === "Withdraw" ? "60%" : "90%"};
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

const StyledPDFWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;

  ${media48em} {
    margin-top: 6rem;
  }
  height: 100vh;
`;

export default function ReceiptContent({ row, setOpen }) {
  const { currentUser } = useCurrentUser();
  const fullName = currentUser?.fullName;
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
      <StyledPDFWrapper ref={targetRef}>
        <div>
          <Typography
            component="h3"
            sx={{
              backgroundColor: "var(--color-background-2)",
              color: "var(--color-text)",
              textAlign: "center",
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
            Transaction Receipt
          </Typography>
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
                  <StyledLabelTitle status={row?.status}>
                    Account Holder:
                  </StyledLabelTitle>
                  <StyledLabelDesc>
                    {formatArrayWord(selectedMyAccount?.fullName)}
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
                  <StyledLabelTitle status={row?.status}>
                    Account Iban:{" "}
                  </StyledLabelTitle>
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
                  <StyledLabelTitle status={row?.status}>
                    Account Number:{" "}
                  </StyledLabelTitle>
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
                  <StyledLabelTitle status={row?.status}>
                    Amount:{" "}
                  </StyledLabelTitle>
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
                    <StyledLabelTitle status={row?.status}>
                      {formatWord("recipient")}:{" "}
                    </StyledLabelTitle>
                    <StyledLabelDesc>
                      {formatArrayWord(row?.recipientFullNameWithIban) ||
                        formatArrayWord(row?.recipientFullNameWithAccount)}
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
                      <StyledLabelTitle status={row?.status}>
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
                        <StyledLabelTitle status={row?.status}>
                          {" "}
                          REIPIENT IBAN:{" "}
                        </StyledLabelTitle>
                        <StyledLabelDesc>
                          {formatIBAN(row?.recipientIban)}
                        </StyledLabelDesc>
                      </>
                    )}
                    {row.recipientAccountNumber && (
                      <>
                        <StyledLabelTitle status={row?.status}>
                          {" "}
                          RECIPIENT ACCOUNT NO:{" "}
                        </StyledLabelTitle>
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
                    <StyledLabelTitle status={row?.status}>
                      OPERATION DATE:{" "}
                    </StyledLabelTitle>
                    <StyledLabelDesc>
                      {formatDate(row?.createdAt)}
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
                    <StyledLabelTitle status={row?.status}>
                      Amount:{" "}
                    </StyledLabelTitle>
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
                    <StyledLabelTitle status={row?.status}>
                      SENDER:{" "}
                    </StyledLabelTitle>
                    <StyledLabelDesc>
                      {formatArrayWord(row?.senderFullName)}
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
                    <StyledLabelTitle status={row?.status}>
                      SENDER BRANCH:{" "}
                    </StyledLabelTitle>
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
                    <StyledLabelTitle status={row?.status}>
                      SENDER IBAN:{" "}
                    </StyledLabelTitle>
                    <StyledLabelDesc>
                      {formatIBAN(selectedMyAccount?.iban)}
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
                    <StyledLabelTitle status={row?.status}>
                      DESCRIPTION:
                    </StyledLabelTitle>
                    <StyledLabelDesc>
                      {row?.transferDescription}
                    </StyledLabelDesc>
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
          <Grid
            container
            sx={{
              backgroundColor: "var(--color-background-2)",
              color: "var(--color-text)",
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
              {row?.status === "Withdraw" &&
                `Withdrawn ${formatCurrency(
                  row.amountToSend
                )} from your account`}

              {row?.status === "Deposit" &&
                `${formatCurrency(row.amountToSend)} was deposited to your ${
                  selectedMyAccount?.bankName
                } account with iban ${
                  selectedMyAccount?.iban
                } and account number  ${selectedMyAccount?.accountNumber}`}

              {row?.status === "Transfer" &&
                `${formatCurrency(
                  row?.amountToSend
                )} has been transferred from your account to ${
                  formatArrayWord(row?.recipientFullNameWithIban) ||
                  formatArrayWord(row?.recipientFullNameWithAccount)
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
        </div>
      </StyledPDFWrapper>

      {/*  */}
    </StyledBox>
  );
}
//yenı
// **********************************************
// import React from "react";
// import { Typography, Box, Grid } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import styled from "styled-components";
// import { usePDF } from "react-to-pdf";
// import CustomButton from "../../../Components/CustomButton/CustomButton";
// import {
//   formatArrayWord,
//   formatCurrency,
//   formatDate,
//   formatIBAN,
//   formatWord,
// } from "../../../utils/utils";
// import { useCurrentUser } from "../../../Hooks/useCurrentUser";

// // Styled components (keep your existing styled components)

// const StyledBox = styled(Box)`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: var(--color-background-2);
//   color: var(--color-text);
//   padding: 2rem 1rem;
//   border-radius: 5px;
//   display: flex;
//   flex-direction: column;
//   border: 1px solid var(--color-gray);
//   width: ${({ row }) =>
//     row?.status === "Deposit" || row?.status === "Withdraw" ? "60%" : "90%"};
//   height: 30rem;
//   overflow-y: scroll;
//   @media (max-width: 48em) {
//     width: 100%;
//   }
//   @media (max-width: 31.25em) {
//     padding: 2rem 0.3rem;
//   }
// `;
// const PDFContent = styled.div`
//   background-color: #1c1c1c;
//   color: #ffffff;
//   padding: 2rem;
//   font-family: Arial, sans-serif;
// `;

// const PDFHeader = styled.div`
//   text-align: center;
//   margin-bottom: 2rem;
// `;

// const PDFSection = styled.div`
//   border: 1px solid #444;
//   border-radius: 8px;
//   padding: 1rem;
//   margin-bottom: 1rem;
// `;

// const PDFLabel = styled.span`
//   font-weight: bold;
//   margin-right: 0.5rem;
// `;

// const PDFValue = styled.span`
//   color: #e0e0e0;
// `;

// export default function ReceiptContent({ row, setOpen }) {
//   const { currentUser } = useCurrentUser();
//   const fullName = currentUser?.fullName;
//   const { toPDF, targetRef } = usePDF({
//     filename: "Receipt.pdf",
//   });

//   const selectedMyAccount = JSON.parse(row?.selectedAccount);

//   const renderPDFContent = () => (
//     <PDFContent ref={targetRef}>
//       <PDFHeader>
//         <Typography variant="h4" gutterBottom>
//           {formatArrayWord("beka bankist")}
//         </Typography>
//         <Typography variant="h5" gutterBottom>
//           Transaction Receipt
//         </Typography>
//       </PDFHeader>

//       <PDFSection>
//         <Typography variant="h6" gutterBottom>
//           Transaction Details
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={6}>
//             <PDFLabel>Status:</PDFLabel>
//             <PDFValue>{row?.status}</PDFValue>
//           </Grid>
//           <Grid item xs={6}>
//             <PDFLabel>Amount:</PDFLabel>
//             <PDFValue>{formatCurrency(row?.amountToSend)}</PDFValue>
//           </Grid>
//           <Grid item xs={6}>
//             <PDFLabel>Date:</PDFLabel>
//             <PDFValue>{formatDate(row?.createdAt)}</PDFValue>
//           </Grid>
//         </Grid>
//       </PDFSection>

//       <PDFSection>
//         <Typography variant="h6" gutterBottom>
//           Sender Information
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <PDFLabel>Name:</PDFLabel>
//             <PDFValue>{formatArrayWord(row?.senderFullName)}</PDFValue>
//           </Grid>
//           <Grid item xs={12}>
//             <PDFLabel>IBAN:</PDFLabel>
//             <PDFValue>{formatIBAN(selectedMyAccount?.iban)}</PDFValue>
//           </Grid>
//           <Grid item xs={12}>
//             <PDFLabel>Branch:</PDFLabel>
//             <PDFValue>{formatWord(selectedMyAccount?.bankBranch)}</PDFValue>
//           </Grid>
//         </Grid>
//       </PDFSection>

//       {row?.status === "Transfer" && (
//         <PDFSection>
//           <Typography variant="h6" gutterBottom>
//             Recipient Information
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <PDFLabel>Name:</PDFLabel>
//               <PDFValue>
//                 {formatArrayWord(row?.recipientFullNameWithIban) ||
//                   formatArrayWord(row?.recipientFullNameWithAccount)}
//               </PDFValue>
//             </Grid>
//             <Grid item xs={12}>
//               <PDFLabel>
//                 {row?.recipientIban ? "IBAN:" : "Account No:"}
//               </PDFLabel>
//               <PDFValue>
//                 {formatIBAN(row?.recipientIban || row?.recipientAccountNumber)}
//               </PDFValue>
//             </Grid>
//             {row?.recipientBankBranch && (
//               <Grid item xs={12}>
//                 <PDFLabel>Branch:</PDFLabel>
//                 <PDFValue>{formatWord(row?.recipientBankBranch)}</PDFValue>
//               </Grid>
//             )}
//           </Grid>
//         </PDFSection>
//       )}

//       <PDFSection>
//         <Typography variant="body1" gutterBottom>
//           Dear {fullName?.toUpperCase()},
//         </Typography>
//         <Typography variant="body2">
//           {row?.status === "Withdraw" &&
//             `Withdrawn ${formatCurrency(row.amountToSend)} from your account`}
//           {row?.status === "Deposit" &&
//             `${formatCurrency(row.amountToSend)} was deposited to your ${
//               selectedMyAccount?.bankName
//             } account with IBAN ${selectedMyAccount?.iban} and account number ${
//               selectedMyAccount?.accountNumber
//             }`}
//           {row?.status === "Transfer" &&
//             `${formatCurrency(
//               row?.amountToSend
//             )} has been transferred from your account to ${
//               formatArrayWord(row?.recipientFullNameWithIban) ||
//               formatArrayWord(row?.recipientFullNameWithAccount)
//             }.`}
//         </Typography>
//       </PDFSection>

//       <Typography variant="body2" align="right">
//         REGARDS BEKA BANKIST ETHERNET BRANCH
//       </Typography>
//     </PDFContent>
//   );

//   return (
//     <StyledBox row={row}>
//       <ArrowBackIcon
//         onClick={() => setOpen(false)}
//         sx={{
//           cursor: "pointer",
//           marginLeft: "1rem",
//         }}
//       />
//       <CustomButton
//         style={{
//           display: "flex",
//           alignSelf: "end",
//         }}
//         onClick={toPDF}
//         buttonText={
//           <span>
//             <FileDownloadIcon sx={{ color: "white!important" }} /> Export as PDF
//           </span>
//         }
//         color="success"
//         variant="contained"
//       />
//       {renderPDFContent()}
//     </StyledBox>
//   );
// }
