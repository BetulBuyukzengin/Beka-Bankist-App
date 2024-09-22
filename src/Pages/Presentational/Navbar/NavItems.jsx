import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDarkMode } from "../../../Contexts/DarkModeContext";
import { Link } from "react-router-dom";
import { media62_5em, media84_37em } from "../../../Constants/constants";
import { HashLink } from "react-router-hash-link";

const StyledLi = styled.li`
  font-size: 1.7rem;
  ${media84_37em} {
    font-size: 1.1rem;
  }
`;

const StyledMenuItems = styled.span`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;
const StyledLink = styled(HashLink)`
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
  width: 30%;
  ${media84_37em} {
    justify-content: space-evenly;
  }
  ${media62_5em} {
    justify-content: space-evenly;
    width: 40%;
  }
`;

const listContent = [
  {
    to: "home",
    text: "Home",
  },
  {
    to: "aboutUs",
    text: "About Us",
  },
  {
    to: "ourServices",
    text: "Our Services",
  },
  {
    to: "contact",
    text: "Contact",
  },
];

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
          <StyledLink smooth to="#home">
            Beka-Bank
          </StyledLink>
        </StyledLi>
      </StyledSpan>
      <StyledMenuItems>
        {listContent.map((cont, index) => (
          <StyledLi key={index}>
            <StyledLink smooth to={`#${cont.to}`}>
              {cont.text}
            </StyledLink>
          </StyledLi>
        ))}

        {/* <StyledLi>
          <StyledLink href="#aboutUs">About Us</StyledLink>
        </StyledLi>
        <StyledLi>
          <StyledLink href="#ourServices">Our Services</StyledLink>
        </StyledLi>
        <StyledLi>
          <StyledLink href="#contact">Contact</StyledLink>
        </StyledLi> */}
      </StyledMenuItems>

      <span
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "12%",
        }}
      >
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
      </span>
    </>
  );
}

export default NavItem;
