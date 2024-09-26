/* eslint-disable react/prop-types */
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "styled-components";

const ITEM_HEIGHT = 48;

const ResponsiveMenuPaper = styled.div`
  max-height: ${ITEM_HEIGHT * 4.5}px;
  width: 20ch;
  & > ul {
    @media (max-width: 31.25em) {
      padding: 0 !important;
    }
  }

  @media (max-width: 48em) {
    width: 17ch;
  }
  @media (max-width: 31.25em) {
    width: 14ch;
  }
`;
export default function CustomMenuIcon({ contents, isAccountsPage }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ position: isAccountsPage && "absolute", right: 0 }}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon
          sx={{
            "@media (max-width: 31.25em)": {
              width: ".8em",
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
        sx={{
          "&>div": {
            "&:nth-child(3)": {
              backgroundColor: "var(--color-background)",
              color: "var(--color-text)",
              border: "1px solid var(--color-menu-border)",
              "&>ul": {
                backgroundColor: "var(--color-background)",
              },
            },
          },
        }}
        PaperProps={{
          component: ResponsiveMenuPaper,
        }}
      >
        {contents?.map((content, i) => (
          <MenuItem
            sx={{
              "@media (max-width: 48em)": {
                fontSize: ".9em",
              },
              "@media (max-width: 31.25em)": {
                fontSize: ".7em",
              },
            }}
            key={i}
            onClick={() => {
              content.openModal();
              handleClose();
            }}
          >
            {content.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
