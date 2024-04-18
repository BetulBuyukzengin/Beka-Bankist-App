import { TableCell, TableHead, TableRow } from "@mui/material";

function MainTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell
          sx={{
            color: "var(--color-text)",
          }}
        >
          Status
        </TableCell>
        <TableCell
          align="center"
          sx={{
            color: "var(--color-text)",
          }}
        >
          Date
        </TableCell>
        <TableCell
          align="center"
          sx={{
            color: "var(--color-text)",
          }}
        >
          Movements
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default MainTableHead;
