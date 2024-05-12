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
  console.log(row);
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
                    {/* gönderen ve alıcıya göre ısım degısecek 2 taraflı dusun */}
                    {row.fullNameWithIban || row.fullNameWithAccount}
                  </TableCell>
                  <TableCell
                    sx={{ color: "var(--color-text)", borderBottom: "none" }}
                  >
                    {row.bankBranch}
                  </TableCell>
                  <TableCell
                    sx={{ color: "var(--color-text)", borderBottom: "none" }}
                  >
                    {row.bankName}
                  </TableCell>
                  <TableCell
                    sx={{ color: "var(--color-text)", borderBottom: "none" }}
                  >
                    {row.amountToSend}
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
