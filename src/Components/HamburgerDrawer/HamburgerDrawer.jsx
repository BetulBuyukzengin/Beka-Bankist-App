/* eslint-disable react/prop-types */
import { Sling } from "hamburger-react"; // icon animation
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import styled from "styled-components";
import { media48em } from "../../Constants/constants";

const StyledSpan = styled.span`
  display: none;
  ${media48em} {
    background-color: var(--color-background-3);
    position: fixed;
    z-index: 5000;
    width: 100%;
    display: block;
  }
`;

function HamburgerDrawer({ children, setOpen, open, toggleDrawer }) {
  return (
    <StyledSpan>
      <Sling
        label="appSidebar"
        rounded
        size={18}
        color="var(--color-text)"
        toggle={setOpen}
        toggled={open}
      />
      <Drawer
        style={{
          width: "10rem",
          backgroundColor: "var(--color-background-5)",
        }}
        lockBackgroundScroll
        open={open}
        onClose={toggleDrawer}
        direction="left"
      >
        <span style={{ display: "flex", justifyContent: "end" }}>
          <Sling
            label="appSidebar"
            rounded
            size={18}
            color="var(--color-text)"
            toggle={setOpen}
            toggled={open}
          />
        </span>
        {children}
      </Drawer>
    </StyledSpan>
  );
}

export default HamburgerDrawer;
