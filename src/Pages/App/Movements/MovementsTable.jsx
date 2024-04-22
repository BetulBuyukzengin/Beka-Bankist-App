import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Rows from "./Rows";
import MainTableHead from "./TableHeads/MainTableHead";
import { useMovements } from "../../../services/movementsServices";

export default function MovementsTable() {
  const { isLoading, movements } = useMovements();
  if (isLoading) return;

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "var(--color-background)",
        maxHeight: "65dvh",
        minHeight: "65dvh",
      }}
    >
      <Table
        aria-label="collapsible table"
        sx={{ backgroundColor: "var(--color-background)" }}
      >
        <MainTableHead />
        <TableBody>
          {movements?.map((row, id) => (
            <Rows key={id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
