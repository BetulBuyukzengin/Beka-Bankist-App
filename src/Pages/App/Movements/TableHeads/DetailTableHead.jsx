import { Receipt } from "@mui/icons-material";
import { TableCell, TableHead, TableRow } from "@mui/material";

function DetailTableHead() {
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
          {/* <IconButton> */}
          <Receipt />
          {/* </IconButtonsssss> */}
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default DetailTableHead;
