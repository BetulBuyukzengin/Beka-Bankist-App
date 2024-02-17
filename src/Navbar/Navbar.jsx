import styled from "styled-components";
import NavList from "./NavList";

const StyledNavbar = styled.nav`
    width: 100%;
`;

function Navbar() {
    return (
        <StyledNavbar>
            <NavList />
        </StyledNavbar>
    );
}

export default Navbar;
