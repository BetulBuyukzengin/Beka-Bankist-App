/* eslint-disable react/prop-types */
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { addMonths, format, isBefore } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { styled as styledComponents } from "styled-components";
import { useLoanPaymentModal } from "../../Contexts/ModalContext";
import PaymentContent from "../../Pages/App/Transactions/Tabs/Loan/PaymentContentTab/PaymentContent";
import { calcNextMonth, formatCurrency } from "../../utils/utils";
import CustomButton from "../CustomButton/CustomButton";
import CustomModal from "../CustomModal/CustomModal";
import {
  useGetLoan,
  useUpdateLoanMonthlyPayment,
} from "../../services/loanServices";
import { hourInterval, interestAmountConst } from "../../Constants/constants";
import { useEffect, useMemo } from "react";
import { differenceInDays } from "date-fns";
import Loader from "../Loader/Loader";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

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
export default function CustomTable({ data }) {
  const parsedData = JSON.parse(data);
  const [searchParams, setSearchParams] = useSearchParams();
  const { open, setOpen } = useLoanPaymentModal();
  const { data: loans } = useGetLoan();
  const loanId = loans?.at(0)?.id;
  const { mutateAsync: updateMonthlyPaymentInterests, isPending } =
    useUpdateLoanMonthlyPayment();

  const totalDept = parsedData
    ?.filter((monthlyPayment) => monthlyPayment?.isInstallmentPaid === false)
    .reduce((acc, obj) => acc + obj?.totalAmountToPay, 0);

  const today = useMemo(() => {
    //for test
    return calcNextMonth(new Date(), 1);
    // return new Date();
  }, []);

  const isEveryMonthPaid = JSON.parse(
    loans.find((loan) => loan?.isCreditPaid === false)?.applicantPaymentPlan
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

  if (isPending) return <Loader />;
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
                // new Date()
                //! for test
                addMonths(new Date(), 13)
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
                      disabled={isDateBefore}
                      style={
                        row.isInstallmentPaid && {
                          pointerEvents: "none",
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
        <p>Kalan borç: {formatCurrency(totalDept)}</p>
      </StyledTableFooter>
      <CustomModal open={open} setOpen={setOpen}>
        <PaymentContent data={parsedData} />
      </CustomModal>
    </>
  );
}
