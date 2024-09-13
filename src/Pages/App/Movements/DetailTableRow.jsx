/* eslint-disable react/prop-types */
import {
  Box,
  Collapse,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import DetailTableHead from "./TableHeads/DetailTableHead";
import { formatCurrency } from "../../../utils/utils";
import styled from "styled-components";

const StyledTableCell = styled(TableCell)`
  color: var(--color-text);
  border-bottom: none !important;
  @media (max-width: 48em) {
    font-size: 0.8rem !important;
  }

  @media (max-width: 31.25em) {
    font-size: 0.7rem !important;
  }
`;

function DetailTableRow({ row, open }) {
  const selectedAccount = JSON.parse(row.selectedAccount);
  return (
    <TableRow>
      <TableCell
        style={{
          paddingBottom: 0,
          paddingTop: 0,
          color: "var(--color-text)",
          padding: "2px!important",
        }}
        colSpan={6}
      >
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box
            sx={{
              margin: 1,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{
                "@media (max-width:48em)": {
                  fontSize: ".9rem",
                },
                "@media (max-width:31.25em)": {
                  fontSize: ".8rem",
                },
              }}
            >
              Details
            </Typography>
            <Table size="small" aria-label="purchases">
              <DetailTableHead row={row} />
              <TableBody>
                <TableRow
                // sx={{
                //   "@media (max-width:48em)": {
                //     display: "flex",
                //     flexDirection: "column",
                //   },
                // }}
                >
                  <StyledTableCell
                  // sx={{ color: "var(--color-text)", borderBottom: "none" }}
                  >
                    {formatCurrency(selectedAccount.balance)}
                  </StyledTableCell>
                  {row.status === "Deposit" || row.status === "Withdraw" ? (
                    <>
                      {selectedAccount?.fullName && (
                        <StyledTableCell>
                          {selectedAccount?.fullName}
                        </StyledTableCell>
                      )}
                      {selectedAccount?.accountNumber && (
                        <StyledTableCell>
                          {selectedAccount?.accountNumber}
                        </StyledTableCell>
                      )}
                      {selectedAccount?.iban && (
                        <StyledTableCell>
                          {selectedAccount?.iban}
                        </StyledTableCell>
                      )}
                    </>
                  ) : (
                    <>
                      {row?.senderFullName && (
                        <StyledTableCell>{row?.senderFullName}</StyledTableCell>
                      )}
                      {selectedAccount?.accountNumber && (
                        <StyledTableCell>
                          {selectedAccount?.accountNumber}
                        </StyledTableCell>
                      )}
                      {row?.recipientFullNameWithIban && (
                        <StyledTableCell>
                          {row?.recipientFullNameWithIban}
                        </StyledTableCell>
                      )}
                      {row?.recipientFullNameWithAccount && (
                        <StyledTableCell>
                          {row?.recipientFullNameWithAccount}
                        </StyledTableCell>
                      )}

                      {row?.recipientAccountNumber && (
                        <StyledTableCell>
                          {row?.recipientAccountNumber}
                        </StyledTableCell>
                      )}
                      {row?.recipientIban && (
                        <StyledTableCell>{row?.recipientIban}</StyledTableCell>
                      )}
                    </>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}

export default DetailTableRow;
