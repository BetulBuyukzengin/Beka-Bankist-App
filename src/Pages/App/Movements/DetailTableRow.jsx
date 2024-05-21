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
  const senderAccountNumber = JSON.parse(row.selectedAccount).accountNumber;

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
                    {formatCurrency(150000)}
                  </TableCell>

                  <TableCell
                    sx={{ color: "var(--color-text)", borderBottom: "none" }}
                  >
                    {row.senderFullName}
                  </TableCell>
                  <TableCell
                    sx={{ color: "var(--color-text)", borderBottom: "none" }}
                  >
                    {senderAccountNumber}
                  </TableCell>
                  <TableCell
                    sx={{ color: "var(--color-text)", borderBottom: "none" }}
                  >
                    {/* gönderen ve alıcıya göre ısım degısecek 2 taraflı dusun */}
                    {row.recipientFullNameWithIban ||
                      row.recipientFullNameWithAccount}
                  </TableCell>
                  <TableCell
                    sx={{ color: "var(--color-text)", borderBottom: "none" }}
                  >
                    {row.recipientIban || row.recipientAccountNumber}
                  </TableCell>
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
