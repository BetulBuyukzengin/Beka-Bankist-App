import styled from "styled-components";
import NavItems from "./NavItems";

const StyledUl = styled.ul`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: transparent;
    border-bottom: 1px solid var(--color-border);
    height: 5rem;
    box-shadow: var(--shadow-md);
`;

function NavList() {
    return (
        <StyledUl>
            <NavItems />
        </StyledUl>
    );
}

export default NavList;
