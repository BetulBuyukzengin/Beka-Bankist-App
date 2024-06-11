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

function DetailTableRow({ row, open }) {
  // const { user } = useUser();
  const selectedAccount = JSON.parse(row.selectedAccount);
  console.log(row.status);
  return (
    <TableRow>
      <TableCell
        style={{
          paddingBottom: 0,
          paddingTop: 0,
          color: "var(--color-text)",
        }}
        colSpan={6}
      >
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              Details
            </Typography>
            <Table size="small" aria-label="purchases">
              <DetailTableHead row={row} />
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{ color: "var(--color-text)", borderBottom: "none" }}
                  >
                    {formatCurrency(selectedAccount.balance)}
                  </TableCell>
                  {row.status === "Deposit" || row.status === "Withdraw" ? (
                    <>
                      {selectedAccount?.fullName && (
                        <TableCell
                          sx={{
                            color: "var(--color-text)",
                            borderBottom: "none",
                          }}
                        >
                          {selectedAccount?.fullName}
                        </TableCell>
                      )}
                      {selectedAccount?.accountNumber && (
                        <TableCell
                          sx={{
                            color: "var(--color-text)",
                            borderBottom: "none",
                          }}
                        >
                          {selectedAccount?.accountNumber}
                        </TableCell>
                      )}
                      {selectedAccount?.iban && (
                        <TableCell
                          sx={{
                            color: "var(--color-text)",
                            borderBottom: "none",
                          }}
                        >
                          {selectedAccount?.iban}
                        </TableCell>
                      )}
                    </>
                  ) : (
                    <>
                      {row?.senderFullName && (
                        <TableCell
                          sx={{
                            color: "var(--color-text)",
                            borderBottom: "none",
                          }}
                        >
                          {row?.senderFullName}
                        </TableCell>
                      )}
                      {selectedAccount?.accountNumber && (
                        <TableCell
                          sx={{
                            color: "var(--color-text)",
                            borderBottom: "none",
                          }}
                        >
                          {selectedAccount?.accountNumber}
                        </TableCell>
                      )}
                      {row?.recipientFullNameWithIban && (
                        <TableCell>{row?.recipientFullNameWithIban}</TableCell>
                      )}
                      {row?.recipientFullNameWithAccount && (
                        <TableCell>
                          {row?.recipientFullNameWithAccount}
                        </TableCell>
                      )}

                      {row?.recipientAccountNumber && (
                        <TableCell>{row?.recipientAccountNumber}</TableCell>
                      )}
                      {row?.recipientIban && (
                        <TableCell>{row?.recipientIban}</TableCell>
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
