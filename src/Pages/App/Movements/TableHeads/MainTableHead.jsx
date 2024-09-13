import { TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import MenuIcon from "../../../../Components/MenuIcon/MenuIcon";
import CustomSelect from "../../../../Components/CustomSelect/CustomSelect";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const sortMethods = [
  {
    content: "Sort by",
    value: "",
  },
  {
    content: "Fiyata göre artan",
    value: "ascending",
  },
  {
    content: "Fiyata göre azalan",
    value: "descending",
  },
  {
    content: "Tarihe göre artan",
    value: "dateAscending",
  },
  {
    content: "Tarihe göre azalan",
    value: "dateDescending",
  },
];
const filterMethods = [
  {
    content: "Filter by status",
    value: "",
  },
  {
    content: "Clear Filter",
    value: "clearFilter",
  },
  {
    content: "Transfer",
    value: "Transfer",
  },
  {
    content: "Deposit",
    value: "Deposit",
  },
  {
    content: "Withdraw",
    value: "Withdraw",
  },
];

const StyledTableCell = styled(TableCell)`
  color: var(--color-text) !important;

  @media (max-width: 48em) {
    font-size: 0.9rem !important;
  }
  @media (max-width: 31.25em) {
    padding: 0 !important;
    font-size: 0.8rem !important;
  }
`;
function MainTableHead() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter");

  const options = [
    {
      label: "SORT",
      component: (
        <CustomSelect
          defaultValue=""
          width="100%"
          data={sortMethods}
          handleChange={(e) => {
            const value = e.target.value;
            if (value === "clearSort") {
              searchParams.delete("sort");
              setSearchParams(searchParams);
            }
            if (
              value === "ascending" ||
              value === "descending" ||
              value === "dateAscending" ||
              value === "dateDescending"
            ) {
              searchParams.set("sort", value);
              setSearchParams(searchParams);
            }
          }}
        />
      ),
    },
    {
      label: "FILTER",
      component: (
        <CustomSelect
          defaultValue=""
          width="100%"
          data={filterMethods}
          disabledMenuItem={!filter}
          handleChange={(e) => {
            const value = e.target.value;
            if (value === "clearFilter") {
              searchParams.delete("filter");
              setSearchParams(searchParams);
            }

            if (
              value === "Transfer" ||
              value === "Withdraw" ||
              value === "Deposit"
            ) {
              searchParams.set("filter", value);
              setSearchParams(searchParams);
            }
          }}
        />
      ),
    },
  ];
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ justifyContent: "start", display: "flex" }}>
          <Tooltip title="SORT & FILTER" arrow placement="top">
            <span>
              <MenuIcon isMovementsTable sortAndFilterOptions={options} />
            </span>
          </Tooltip>
        </TableCell>
        <StyledTableCell>Status</StyledTableCell>
        <StyledTableCell>Date</StyledTableCell>
        <StyledTableCell>Movements</StyledTableCell>
      </TableRow>
    </TableHead>
  );
}

export default MainTableHead;
