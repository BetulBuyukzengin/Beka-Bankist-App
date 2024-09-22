import styled from "styled-components";
import NavItems from "./NavItems";
import { media84_37em } from "../../../Constants/constants";
const StyledUl = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: transparent;
  margin-bottom: 0;
  border-bottom: 1px solid var(--color-border);
  height: 5rem;
  box-shadow: var(--shadow-md);
  ${media84_37em} {
    width: 100%;
    padding-left: 1rem;
  }
`;

function NavList() {
  return (
    <StyledUl>
      <NavItems />
    </StyledUl>
  );
}

export default NavList;
