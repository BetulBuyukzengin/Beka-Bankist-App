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

function DetailTableHead({ row }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ color: "var(--color-text)" }}>
          Current Balance
        </TableCell>
        {row?.status === "Deposit" || row?.status === "Withdraw" ? (
          <>
            <TableCell sx={{ color: "var(--color-text)" }}>
              Account Holder
            </TableCell>
            <TableCell sx={{ color: "var(--color-text)" }}>
              Account Number
            </TableCell>
            <TableCell sx={{ color: "var(--color-text)" }}>
              Account IBAN
            </TableCell>
          </>
        ) : (
          <>
            <TableCell sx={{ color: "var(--color-text)" }}>
              Sender Name
            </TableCell>
            <TableCell sx={{ color: "var(--color-text)" }}>
              Sender Account Number
            </TableCell>
            <TableCell sx={{ color: "var(--color-text)" }}>
              Recipient Name
            </TableCell>
            <TableCell sx={{ color: "var(--color-text)" }}>
              {row?.recipientFullNameWithAccount
                ? "Recipient Account Number"
                : "Recipient Iban"}
            </TableCell>
          </>
        )}
        <TableCell sx={{ color: "var(--color-text)", borderBottom: "none" }}>
          <StyledButton onClick={handleOpen}>
            <Receipt />
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
