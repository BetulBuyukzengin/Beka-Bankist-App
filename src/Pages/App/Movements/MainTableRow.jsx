/* eslint-disable react/prop-types */
import { Chip, IconButton, TableCell, TableRow } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { formatCurrency, formatDate } from "../../../utils/utils";
import styled from "styled-components";

const StyledTableCell = styled(TableCell)`
  color: var(--color-text);

  @media (max-width: 48em) {
    padding: 0 !important;
    font-size: 0.8rem !important;
  }

  @media (max-width: 31.25em) {
    padding: 0 !important;
    font-size: 0.7rem !important;
  }
`;

const KeyboardArrowStyle = {
  color: "var(--color-text)",
  "@media (max-width: 48em)": {
    fontSize: "1.2rem !important",
  },
  "@media (max-width: 31.2em)": {
    fontSize: "1rem !important",
  },
};

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
            <KeyboardArrowUpIcon sx={KeyboardArrowStyle} />
          ) : (
            <KeyboardArrowDownIcon sx={KeyboardArrowStyle} />
          )}
        </IconButton>
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        sx={{
          "@media (max-width:48em)": {
            padding: "12px",
          },
          "@media (max-width:31.25em)": {
            padding: "8px",
          },
        }}
      >
        <Chip
          sx={{
            "@media (max-width:48em)": {
              fontSize: ".8rem!important",
            },
            "@media (max-width:31.25em)": {
              fontSize: ".7rem!important",
            },
          }}
          label={row.status}
          color={
            row.status === "Deposit"
              ? "success"
              : row.status === "Transfer"
              ? "warning"
              : "error"
          }
        />
      </TableCell>
      <StyledTableCell>{formatDate(row.createdAt)}</StyledTableCell>
      <StyledTableCell>
        {/* {row.status === "Withdraw" || row.status === "Transfer" ? "-  " : ""} */}
        {/* {formatCurrency(
          row.amountToSend ||
            row.amountToBeDepositMyAccount ||
            row.amountToWithdrawMyAccount
        )} */}
        {formatCurrency(row.amountToSend)}
      </StyledTableCell>
    </TableRow>
  );
}

export default MainTableRow;
