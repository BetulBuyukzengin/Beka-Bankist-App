import { TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import MenuIcon from "../../../../Components/MenuIcon/MenuIcon";
import CustomSelect from "../../../../Components/CustomSelect/CustomSelect";
import { useSearchParams } from "react-router-dom";

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
        <TableCell
          sx={{
            color: "var(--color-text)",
          }}
        >
          Status
        </TableCell>
        <TableCell
          sx={{
            color: "var(--color-text)",
          }}
        >
          Date
        </TableCell>
        <TableCell
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
