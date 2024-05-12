/* eslint-disable react/prop-types */
import { Chip, IconButton, TableCell, TableRow } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { formatCurrency, formatDate } from "../../../utils/utils";

function MainTableRow({ open, setOpen, row }) {
  return (
    <TableRow
      sx={{
        "& > *": { borderBottom: "unset" },
      }}
    >
      <TableCell>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <KeyboardArrowUpIcon sx={{ color: "var(--color-text)" }} />
          ) : (
            <KeyboardArrowDownIcon sx={{ color: "var(--color-text)" }} />
          )}
        </IconButton>
      </TableCell>
      <TableCell component="th" scope="row" sx={{ color: "var(--color-text)" }}>
        {/* <Chip
          label={
            row.status.slice(0, 1).toUpperCase() +
            row.status.slice(1).toLowerCase()
          }
          color={
            row.status === "deposit"
              ? "success"
              : row.status === "transfer"
              ? "warning"
              : "error"
          }
        /> */}
      </TableCell>
      <TableCell align="center" sx={{ color: "var(--color-text)" }}>
        {/* {formatDate(row.created_at)} */}
      </TableCell>
      <TableCell align="center" sx={{ color: "var(--color-text)" }}>
        {/* {row.status === "withdraw" || row.status === "transfer" ? "-  " : ""} */}
        {/* {formatCurrency(row.movements)} */}
      </TableCell>
    </TableRow>
  );
}

export default MainTableRow;
