/* eslint-disable react/prop-types */
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { differenceInDays, format, isBefore } from "date-fns";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { styled as styledComponents } from "styled-components";
import { hourInterval, interestAmountConst } from "../../Constants/constants";
import { useLoanPaymentModal } from "../../Contexts/ModalContext";
import PaymentContent from "../../Pages/App/Transactions/Tabs/Loan/PaymentContentTab/PaymentContent";
import {
  useGetLoan,
  useUpdateLoanMonthlyPayment,
} from "../../services/loanServices";
import { formatCurrency } from "../../utils/utils";
import CustomButton from "../CustomButton/CustomButton";
import CustomModal from "../CustomModal/CustomModal";

const StyledTableCell = styled(TableCell)(() => ({
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
const StyledP = styledComponents.p`
  @media (max-width: 48em) {
    font-size: 0.8rem;
  }
  @media (max-width: 31.25em) {
    font-size: 0.7rem;
  }
`;
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableFooter = styledComponents.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`;

//? date,amount to pay , interest amount bunlar bi yerden gelsın kı table custom olsun
export default function CustomTable() {
  const { data: loanData } = useGetLoan();
  const loan = loanData.find((loan) => !loan.isCreditPaid).applicantPaymentPlan;
  const parsedData = loan && JSON.parse(loan);
  const [searchParams, setSearchParams] = useSearchParams();
  const { open, setOpen } = useLoanPaymentModal();
  const loanId = loanData.find((loan) => !loan.isCreditPaid).id;

  const { mutateAsync: updateMonthlyPaymentInterests } =
    useUpdateLoanMonthlyPayment();
  const totalDept = parsedData
    ?.filter((monthlyPayment) => monthlyPayment?.isInstallmentPaid === false)
    .reduce((acc, obj) => acc + obj?.totalAmountToPay, 0);

  const today = useMemo(() => {
    //for test
    // return calcNextMonth(new Date(), 1);
    return new Date();
  }, []);

  const isEveryMonthPaid = JSON.parse(
    loanData.find((loan) => loan?.isCreditPaid === false)?.applicantPaymentPlan
  ).every((monthlyPayment) => monthlyPayment.isInstallmentPaid === true);

  //! re create updatedData when parsedData or today changes to fix calculate total amount to pay
  const updatedData = useMemo(() => {
    return parsedData.map((obj) => {
      if (!obj.isInstallmentPaid && isBefore(obj.date, today)) {
        const differentDays = differenceInDays(today, new Date(obj.date));
        const newInterestAmount = interestAmountConst * differentDays;
        const newTotalAmountToPay = obj.amountToPay + newInterestAmount;
        return {
          ...obj,
          interestAmount: newInterestAmount,
          totalAmountToPay: newTotalAmountToPay,
        };
      }
      return obj;
    });
  }, [parsedData, today]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await updateMonthlyPaymentInterests({
        monthlyPayment: updatedData,
        id: loanId,
      });
    }, hourInterval);

    return () => clearInterval(intervalId);
  }, [updatedData, updateMonthlyPaymentInterests, loanId]);

  useEffect(() => {
    async function everyMonthPaid() {
      if (isEveryMonthPaid) {
        await updateMonthlyPaymentInterests({
          monthlyPayment: true,
          id: loanId,
          updateColumn: "isCreditPaid",
        });
      }
    }
    everyMonthPaid();
  }, [isEveryMonthPaid, loanId, updateMonthlyPaymentInterests]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700, backgroundColor: "var(--color-background-2)" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="right">Amount To Pay</StyledTableCell>
              <StyledTableCell align="right">Interest Amount</StyledTableCell>
              <StyledTableCell align="right">
                Total Amount To Pay
              </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parsedData?.map((row, i) => {
              //! Controls payment button disabled/enabled situation based on dates.
              const isDateBefore = !isBefore(
                new Date(row?.date),
                new Date()
                //! for test
                // addMonths(new Date(), 13)
              );
              return (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    {format(row?.date, "dd/MM/yyyy")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {formatCurrency(row.amountToPay)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {formatCurrency(row.interestAmount)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {formatCurrency(row.totalAmountToPay)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <CustomButton
                      buttonText={row.isInstallmentPaid ? "PAID" : "PAY NOW"}
                      color={row.isInstallmentPaid ? "success" : ""}
                      variant="contained"
                      //! Need to spesify more dynamic value to disable and display text in button
                      disabled={isDateBefore}
                      style={
                        row.isInstallmentPaid
                          ? {
                              pointerEvents: "none",
                            }
                          : {
                              "&:hover": {
                                backgroundColor: "var(--color-success)",
                              },
                            }
                      }
                      onClick={() => {
                        setOpen(true);
                        searchParams.set("paymentId", row.id);
                        setSearchParams(searchParams);
                      }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>{" "}
      </TableContainer>
      <StyledTableFooter>
        <StyledP>Kalan borç: {formatCurrency(totalDept)}</StyledP>
      </StyledTableFooter>
      <CustomModal
        open={open}
        setOpen={setOpen}
        modalBoxStyles={{
          maxHeight: "80dvh",
          "@media (max-width:48em)": {
            maxHeight: "50dvh",
          },
        }}
      >
        <PaymentContent data={parsedData} />
      </CustomModal>
    </>
  );
}
