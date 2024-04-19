import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Rows from "./Rows";
import MainTableHead from "./TableHeads/MainTableHead";

const movData = [
  {
    status: "deposit",
    date: "01.01.2023",
    movements: 100,
    time: "12.15",
    transferTo: "Kadir",
    currentBalance: 200,
    iban: "TR3284238492843",
    branch: "Merkezefendi/Denizli",
  },
  {
    status: "withdraw",
    date: "02.04.2024",
    movements: 50,
    time: "22.15",
    transferTo: "Betül",
    currentBalance: 400,
    iban: "TR3284238492843",
    branch: "Meram/Konya",
  },
  {
    status: "transfer",
    date: "02.03.2024",
    movements: 100,
    time: "21.05",
    transferTo: "Zahide",
    currentBalance: 400,
    iban: "TR7784238192843",
    branch: "Meram/Konya",
  },
];

export default function MovementsTable() {
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
          {movData.map((row, id) => (
            <Rows key={id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
