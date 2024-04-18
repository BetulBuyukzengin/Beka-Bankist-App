/* eslint-disable react/prop-types */
import { Chip, IconButton, TableCell, TableRow } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { formatCurrency } from "../../../utils/utils";

function MainTableRow({ open, setOpen, row }) {
  return (
    <TableRow
      sx={{
        "& > *": { borderBottom: "unset" },
        borderBottom: "none",
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
        <Chip
          label={row.status}
          color={
            row.status === "deposit"
              ? "success"
              : row.status === "transfer"
              ? "warning"
              : "error"
          }
        />
      </TableCell>
      <TableCell
        align="center"
        sx={{ color: "var(--color-text)", borderBottom: "none" }}
      >
        {row.date}
      </TableCell>
      <TableCell
        align="center"
        sx={{ color: "var(--color-text)", borderBottom: "none" }}
      >
        {row.status === "withdraw" || row.status === "transfer" ? "-  " : ""}
        {formatCurrency(row.movements)}
      </TableCell>
    </TableRow>
  );
}

export default MainTableRow;
