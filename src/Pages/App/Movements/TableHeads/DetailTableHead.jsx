/* eslint-disable react/prop-types */
import { Receipt } from "@mui/icons-material";
import { TableCell, TableHead, TableRow } from "@mui/material";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import ReceiptContent from "../ReceiptContent";
import { useState } from "react";

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
`;
const StyledTableCell = styled(TableCell)`
  color: var(--color-text) !important;

  @media (max-width: 48em) {
    text-align: center !important;
    font-size: 0.8rem !important;
    padding: 4px 0px !important;
  }
`;
function DetailTableHead({ row }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell>Current Balance</StyledTableCell>
        {row?.status === "Deposit" || row?.status === "Withdraw" ? (
          <>
            <StyledTableCell>Account Holder</StyledTableCell>
            <StyledTableCell>Account Number</StyledTableCell>
            <StyledTableCell>Account IBAN</StyledTableCell>
          </>
        ) : (
          <>
            <StyledTableCell>Sender Name</StyledTableCell>
            <StyledTableCell>Sender Account Number</StyledTableCell>
            <StyledTableCell>Recipient Name</StyledTableCell>
            <StyledTableCell>
              {row?.recipientFullNameWithAccount
                ? "Recipient Account Number"
                : "Recipient Iban"}
            </StyledTableCell>
          </>
        )}
        <TableCell sx={{ color: "var(--color-text)", borderBottom: "none" }}>
          <StyledButton onClick={handleOpen}>
            <Receipt
              sx={{
                "@media (max-width:48em)": {
                  fontSize: "1.2rem ",
                },
                "@media (max-width:31.28em)": {
                  fontSize: "1rem ",
                },
              }}
            />
          </StyledButton>
        </TableCell>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ReceiptContent row={row} />
        </Modal>
      </TableRow>
    </TableHead>
  );
}

export default DetailTableHead;
