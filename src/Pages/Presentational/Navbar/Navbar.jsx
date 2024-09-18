import styled from "styled-components";
import NavList from "./NavList";
import PresentationalListComponent from "../../../Components/HamburgerDrawer/PresentationalListComponent";
import HamburgerDrawer from "../../../Components/HamburgerDrawer/HamburgerDrawer";
import { media48em } from "../../../Constants/constants";

const StyledNavbar = styled.nav`
  width: 100%;
  position: fixed;
  z-index: 111;
  backdrop-filter: blur(5px);
  top: 0;
  ${media48em} {
    display: none;
  }
`;

// function Navbar() {
//   return (
//     // <StyledNavbar>
//       {/* <NavList /> */}
//       // </StyledNavbar>
//   );
// }
function Navbar() {
  return (
    <>
      <StyledNavbar>
        <NavList />
      </StyledNavbar>
      <HamburgerDrawer>
        <PresentationalListComponent />
      </HamburgerDrawer>
    </>
  );
}
export default Navbar;
