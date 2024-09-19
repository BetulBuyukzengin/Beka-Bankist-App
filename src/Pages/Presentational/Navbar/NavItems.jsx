import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDarkMode } from "../../../Contexts/DarkModeContext";
import { Link } from "react-router-dom";
import { media84_37em } from "../../../Constants/constants";

const StyledLi = styled.li`
  font-size: 1.7rem;

  &:not(:first-child),
  &:not(:nth-child(2)) {
    margin-left: 0.5rem;
  }

  &:nth-child(3),
  &:nth-child(4),
  &:nth-child(5) {
    margin-left: 1.8rem;
  }

  &:nth-child(2) {
    margin-right: auto;
  }

  &:nth-child(7) {
    margin-left: 8rem;
  }
  ${media84_37em} {
    font-size: 1.1rem;
    margin-left: 0 !important;
    &:nth-child(1) {
      margin-right: 1rem;
    }
    &:nth-child(2) {
      margin-right: 0;
    }
  }
`;

const StyledLink = styled.a`
  border: none;
  color: var(--color-text);
  background-color: transparent;
  padding: 1rem 1.5rem;

  &:hover {
    color: var(--color-primary);
    transform: translateY(-2px);
    cursor: pointer;
  }

  &:active {
    transform: translateY(0);
  }
  ${media84_37em} {
    padding: 0;
  }
`;

const StyledLinkTo = styled(Link)`
  border: none;
  color: var(--color-text);
  background-color: transparent;
  padding: 1rem 1.5rem;

  &:hover {
    color: var(--color-primary);
    transform: translateY(-2px);
    cursor: pointer;
  }

  &:active {
    transform: translateY(0);
  }
`;

const StyledImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
`;
const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  ${media84_37em} {
    justify-content: space-around;
  }
`;

function NavItem() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <>
      <StyledSpan>
        <StyledLi>
          <StyledImg
            src={
              isDarkMode
                ? "../../img/logo-dark.png"
                : "../../img/logo-light.png"
            }
          />
        </StyledLi>
        <StyledLi>
          <StyledLink href="#home">Beka-Bank</StyledLink>
        </StyledLi>
      </StyledSpan>
      <span
        style={{
          display: "flex",
          width: "50%0",
          justifyContent: "space-evenly",
        }}
      >
        <StyledLi>
          <StyledLink href="#home">Home</StyledLink>
        </StyledLi>
        <StyledLi>
          <StyledLink href="#aboutUs">About Us</StyledLink>
        </StyledLi>
        <StyledLi>
          <StyledLink href="#ourServices">Our Services</StyledLink>
        </StyledLi>
        <StyledLi>
          <StyledLink href="#contact">Contact</StyledLink>
        </StyledLi>
      </span>

      <StyledSpan>
        <StyledLi>
          <StyledLink onClick={toggleDarkMode}>
            {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
          </StyledLink>
        </StyledLi>
        <StyledLi>
          <StyledLinkTo to="/signIn">
            <LoginIcon />
          </StyledLinkTo>
        </StyledLi>
      </StyledSpan>
    </>
  );
}

export default NavItem;
