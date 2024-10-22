import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Rows from "./Rows";
import MainTableHead from "./TableHeads/MainTableHead";
import {
  useFilterMovements,
  useMovements,
} from "../../../services/movementsServices";
import Loader from "../../../Components/Loader/Loader";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovementsTable() {
  const { isLoading, movements } = useMovements();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");
  const sort = searchParams.get("sort");
  const { data: filteredMovements, isLoading: isLoadingFiltered } =
    useFilterMovements({ filter });
  const [movementsState, setMovementsState] = useState(movements || []);

  useEffect(() => {
    let sortedMovements = movements;

    if (filter) {
      sortedMovements = filteredMovements || [];
    }

    if (sort) {
      sortedMovements = [...sortedMovements].sort((a, b) => {
        if (sort === "ascending") return a.amountToSend - b.amountToSend;
        if (sort === "descending") return b.amountToSend - a.amountToSend;
        if (sort === "dateAscending")
          return new Date(a.createdAt) - new Date(b.createdAt);
        if (sort === "dateDescending")
          return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }

    //! Check that sortedMovements is a valid array (if null or undefined)
    if (Array.isArray(sortedMovements)) {
      setMovementsState(sortedMovements);
    } else {
      setMovementsState([]);
      console.error("sortedMovements is not iterable:", sortedMovements);
    }
  }, [filter, sort, movements, filteredMovements]);

  if (isLoading || isLoadingFiltered) return <Loader />;

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "transparent",
      }}
    >
      <Table
        aria-label="collapsible table"
        sx={{ backgroundColor: "var(--color-background)" }}
      >
        <MainTableHead />
        <TableBody>
          {movementsState?.map((row, id) => (
            <Rows key={id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
