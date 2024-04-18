import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MainTableRow from "./MainTableRow";
import DetailTableRow from "./DetailTableRow";
import Rows from "./Rows";
import MainTableHead from "./TableHeads/MainTableHead";

// function createData(status, date, movements, price) {
//   return {
//     status,
//     date,
//     movements,
//     // price,
//     details: [
//       {
//         date: "2020-01-05",
//         time: "12.15",
//         transferTo: "Betül",
//       },
//     ],
//   };
// }

// const rows = [
//   createData("Deposit", "11.02.2023", +300),
//   createData("Withdraw", "01.04.2023", -100),
//   createData("Withdraw", "15.01.2024", -159),
//   createData("Deposit", "10.04.2024", +259),
// ];

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
];
// ana
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
