/* eslint-disable react/prop-types */
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "styled-components";

const ITEM_HEIGHT = 48;
const StyledMenu = styled.div`
  display: flex;
  justify-content: end;
`;
export default function MenuIcon({ isMovementsTable, sortAndFilterOptions }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledMenu>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <MoreVertIcon
          sx={{
            "@media (max-width: 31.25em)": {
              fontSize: "1rem",
            },
            "@media (max-width: 48em)": {
              fontSize: "1.2rem",
            },
          }}
        />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: "var(--color-background-2)",

            maxHeight: ITEM_HEIGHT * 4.5,
            width: isMovementsTable ? "30ch" : "20ch",
          },
        }}
      >
        {sortAndFilterOptions?.map((option) => (
          <MenuItem
            key={option.label}
            selected={option}
            // sx={{ backgroundColor: "transparent!important" }}
            onClick={() => {
              handleClose();
            }}
          >
            {option.component}
          </MenuItem>
        ))}
      </Menu>
    </StyledMenu>
  );
}
