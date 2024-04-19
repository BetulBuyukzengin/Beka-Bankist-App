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
import { formatCurrency, formatIBAN } from "../../../utils/utils";

function DetailTableRow({ row, open }) {
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
              <DetailTableHead />
              <TableBody>
                <TableRow key={row.date}>
                  <TableCell
                    sx={{ color: "var(--color-text)", borderBottom: "none" }}
                  >
                    {row.time}
                  </TableCell>
                  <TableCell
                    sx={{ color: "var(--color-text)", borderBottom: "none" }}
                  >
                    {row.transferTo}
                  </TableCell>
                  <TableCell
                    sx={{ color: "var(--color-text)", borderBottom: "none" }}
                  >
                    {formatCurrency(row.currentBalance)}
                  </TableCell>
                  <TableCell
                    sx={{ color: "var(--color-text)", borderBottom: "none" }}
                  >
                    {formatIBAN(row.iban)}
                  </TableCell>
                  <TableCell
                    sx={{ color: "var(--color-text)", borderBottom: "none" }}
                  >
                    {row.branch}
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
