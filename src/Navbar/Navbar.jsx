import styled from "styled-components";
import NavList from "./NavList";

const StyledNavbar = styled.nav`
    width: 100%;
    position: absolute;
    z-index: 111;
    top: 0;
`;

function Navbar() {
    return (
        <StyledNavbar>
            <NavList />
        </StyledNavbar>
    );
}

export default Navbar;
