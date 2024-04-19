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

function DetailTableHead() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ color: "var(--color-text)" }}>Time</TableCell>
        <TableCell sx={{ color: "var(--color-text)" }}>Transfer to</TableCell>
        <TableCell sx={{ color: "var(--color-text)" }}>
          Current Balance
        </TableCell>
        <TableCell sx={{ color: "var(--color-text)" }}>Iban</TableCell>
        <TableCell sx={{ color: "var(--color-text)" }}>Branch</TableCell>
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
          <ReceiptContent />
        </Modal>
      </TableRow>
    </TableHead>
  );
}

export default DetailTableHead;
