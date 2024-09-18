import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDarkMode } from "../../Contexts/DarkModeContext";
import { Link } from "react-router-dom";
import { media48em } from "../../Constants/constants";

const StyledLi = styled.li`
  width: 100%;
  font-size: 0.8rem;
  justify-content: center;
  display: flex;
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
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-bottom: 0.5rem;
`;
const StyledUl = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: transparent;
  border-bottom: 1px solid var(--color-border);
  flex-direction: column;
  height: 25rem;
  box-shadow: var(--shadow-md);
  padding-left: 0;
`;

//! For small devices navbar
function PresentationalListComponent() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <StyledUl>
      <StyledLi style={{ borderBottom: "1px solid var(--color-border-2)" }}>
        <StyledImg
          src={
            isDarkMode ? "../../img/logo-dark.png" : "../../img/logo-light.png"
          }
        />
      </StyledLi>

      <StyledLi>
        <StyledLink href="#home">Beka-Bank</StyledLink>
      </StyledLi>
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
      <span style={{ display: "flex" }}>
        <StyledLi>
          <StyledLink onClick={toggleDarkMode}>
            {isDarkMode ? (
              <DarkModeIcon sx={{ fontSize: "1.2rem" }} />
            ) : (
              <LightModeIcon sx={{ fontSize: "1.2rem" }} />
            )}
          </StyledLink>
        </StyledLi>
        <StyledLi>
          <StyledLinkTo to="/signIn">
            <LoginIcon sx={{ fontSize: "1.2rem" }} />
          </StyledLinkTo>
        </StyledLi>
      </span>
    </StyledUl>
  );
}

export default PresentationalListComponent;
