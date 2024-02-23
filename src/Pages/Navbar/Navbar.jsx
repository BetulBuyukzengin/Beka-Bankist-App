import styled from "styled-components";
import NavList from "./NavList";

const StyledNavbar = styled.nav`
    width: 100%;
    position: fixed;
    z-index: 111;
    backdrop-filter: blur(3px);
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
