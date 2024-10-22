/* eslint-disable react/prop-types */
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { TableBody, TableContainer, TableHead } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled as muiStyled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { format } from "date-fns";
import { useState } from "react";
import { usePDF } from "react-to-pdf";
import CustomButton from "../../../../../Components/CustomButton/CustomButton";
import CustomModal from "../../../../../Components/CustomModal/CustomModal";
import { useGetLoan } from "../../../../../services/loanServices";
import { formatCurrency, formatDate } from "../../../../../utils/utils";
import styled from "styled-components";

const StyledTableCell = muiStyled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "var(--color-background-2)",
    color: "var(--color-text)",
    "@media (max-width:48em )": {
      fontSize: ".9rem",
    },
    "@media (max-width:31.25em )": {
      fontSize: ".8rem",
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "var(--color-text)",
    "@media (max-width:48em )": {
      fontSize: ".8rem",
      padding: ".8rem ",
    },
    "@media (max-width:31.25em )": {
      fontSize: ".7rem",
    },
    "&>button": {
      "@media (max-width:48em )": {
        fontSize: ".8rem",
      },
      "@media (max-width:31.25em )": {
        fontSize: ".7rem",
      },
    },
  },
}));

const StyledTableRow = muiStyled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const StyledDiv = styled.div`
  text-align: center;
  width: 100%;
  font-weight: bolder;
  font-size: 1.5rem;
  @media (max-width: 48em) {
    font-size: 0.9rem;
  }
  @media (max-width: 31.25em) {
    font-size: 0.8rem;
  }
`;
const StyledPaidLoansTitle = styled.p`
  text-align: center;
  font-weight: bold;
  @media (max-width: 48em) {
    font-size: 0.9rem;
  }
  @media (max-width: 31.25em) {
    font-size: 0.8rem;
  }
`;

function PaidLoans() {
  const [openLoanTable, setOpenLoanTable] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const { data: loans } = useGetLoan();
  const paidLoans = loans?.filter((loan) => loan.isCreditPaid);
  if (!paidLoans.length)
    return <StyledDiv>You don&lsquo;t have any paid loans!</StyledDiv>;
  return (
    <div>
      <StyledPaidLoansTitle>Paid Loans</StyledPaidLoansTitle>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 700,
            backgroundColor: "var(--color-background-2)",
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Loan Date</StyledTableCell>
              <StyledTableCell style={{ fontWeight: "bold" }} align="center">
                Loan Amount
              </StyledTableCell>
              <StyledTableCell style={{ fontWeight: "bold" }} align="center">
                Total Paid Interest
              </StyledTableCell>
              <StyledTableCell style={{ fontWeight: "bold" }} align="center">
                Total Paid Loan
              </StyledTableCell>
              <StyledTableCell
                style={{ fontWeight: "bold" }}
                align="center"
              ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paidLoans.map((loan) => {
              const totalInterest = JSON.parse(
                loan.applicantPaymentPlan
              ).reduce((acc, cur) => (cur.interestAmount += acc), 0);

              return (
                <>
                  <StyledTableRow key={loan.id}>
                    <StyledTableCell component="th" scope="row">
                      {format(loan?.created_at, "dd/MM/yyyy")}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {formatCurrency(+loan?.applicantLoanAmount)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {formatCurrency(totalInterest)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {formatCurrency(
                        +totalInterest + +loan.applicantLoanAmount
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <CustomButton
                        isDownloadButton
                        onClick={() => {
                          setOpenLoanTable(true);
                          setSelectedLoan(loan.id);
                        }}
                        buttonText="Display Details"
                        color="primary"
                        variant="contained"
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {openLoanTable && (
        <CustomModal open={openLoanTable} setOpen={setOpenLoanTable}>
          <PaidLoanPaymentTable
            loanId={selectedLoan}
            setOpenLoanTable={setOpenLoanTable}
          />
        </CustomModal>
      )}
    </div>
  );
}

export default PaidLoans;

const StyledPaidLoanPaymentTable = styled.p`
  font-weight: bold;
  @media (max-width: 48em) {
    font-size: 0.8rem;
  }
  @media (max-width: 31.25em) {
    font-size: 0.7rem;
    margin: 0 0.5rem;
  }
`;

const StyledHiddenText = styled.span`
  @media (max-width: 48em) {
    font-size: 0.5rem;
  }
  @media (max-width: 31.25em) {
    display: none;
  }
`;

const PaidLoanPaymentTable = ({ loanId, setOpenLoanTable }) => {
  const { toPDF, targetRef } = usePDF({ filename: "Monthly Payments.pdf" });
  const { data } = useGetLoan();
  const selectedLoan = data?.find((loan) => loan.id === loanId);
  const paymentPlan = JSON.parse(selectedLoan.applicantPaymentPlan);

  return (
    <>
      <span
        style={{
          display: "flex",
          width: "100%",
          marginBottom: "1rem",
          justifyContent: "space-between",
        }}
      >
        <ArrowBackIcon
          onClick={() => setOpenLoanTable(false)}
          sx={{
            cursor: "pointer",
          }}
        />

        {/* <StyledPaidLoanPaymentTable>
          Details of {formatDate(selectedLoan.created_at)} dated loan&apos;s
          payment list.
        </StyledPaidLoanPaymentTable> */}
        <CustomButton
          style={{
            "@media(max-width:48em)": {
              fontSize: ".6rem",
              minWidth: "32px",
              height: "2.6rem",
              padding: ".5rem",
            },
            "@media(max-width:31.25em)": {
              fontSize: ".5rem",
              height: "2rem",
              padding: "0px 0px",
            },
          }}
          onClick={toPDF}
          buttonText={
            <label>
              <FileDownloadIcon
                sx={{
                  cursor: "pointer",
                  color: "white!important",
                  "@media(max-width:48em)": {
                    fontSize: ".9rem",
                  },
                  "@media(max-width:31.25em)": {
                    fontSize: ".8rem",
                  },
                }}
              />
              <StyledHiddenText>Export</StyledHiddenText>
            </label>
          }
          color="success"
          variant="contained"
        />
      </span>
      <StyledPaidLoanPaymentTable>
        Details of {formatDate(selectedLoan.created_at)} dated loan&apos;s
        payment list.
      </StyledPaidLoanPaymentTable>
      <TableContainer component={Paper}>
        <Table
          ref={targetRef}
          sx={{
            width: "100%",
            minWidth: 700,
            backgroundColor: "var(--color-background-2)",
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ fontWeight: "bold" }}>
                Date
              </StyledTableCell>
              <StyledTableCell style={{ fontWeight: "bold" }} align="center">
                Amount To Pay
              </StyledTableCell>
              <StyledTableCell style={{ fontWeight: "bold" }} align="center">
                Interest Amount
              </StyledTableCell>
              <StyledTableCell style={{ fontWeight: "bold" }} align="center">
                Total Amount To Pay
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentPlan.map((plan, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {format(plan?.date, "dd/MM/yyyy")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatCurrency(plan?.amountToPay)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatCurrency(plan?.interestAmount)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatCurrency(plan?.totalAmountToPay)}
                </StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

PaidLoanPaymentTable.displayName = "PaidLoanPaymentTable";
