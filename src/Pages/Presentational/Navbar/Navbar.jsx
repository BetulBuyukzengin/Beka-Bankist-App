import styled from "styled-components";
import NavList from "./NavList";
import PresentationalListComponent from "../../../Components/HamburgerDrawer/PresentationalListComponent";
import HamburgerDrawer from "../../../Components/HamburgerDrawer/HamburgerDrawer";
import { media48em } from "../../../Constants/constants";
import { useState } from "react";

const StyledNavbar = styled.nav`
  width: 100%;
  position: fixed;
  z-index: 111;
  background-color: var(--color-background-5);
  backdrop-filter: blur(5px);
  top: 0;
  ${media48em} {
    display: none;
  }
`;

function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen((open) => !open);
  return (
    <>
      <StyledNavbar>
        <NavList />
      </StyledNavbar>
      <HamburgerDrawer
        open={open}
        setOpen={setOpen}
        toggleDrawer={toggleDrawer}
      >
        <PresentationalListComponent toggleDrawer={toggleDrawer} />
      </HamburgerDrawer>
    </>
  );
}
export default Navbar;
