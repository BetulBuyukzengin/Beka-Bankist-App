import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import styled from "styled-components";
import { media31_25em } from "../../Constants/constants";
import { useDarkMode } from "../../Contexts/DarkModeContext";

const StyledLi = styled.li`
  width: 100%;
  font-size: 1rem;
  justify-content: center;
  display: flex;
  ${media31_25em} {
    font-size: 0.8rem;
  }
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
const StyledH6 = styled.h6`
  margin-top: 0.5rem;
  ${media31_25em} {
    font-size: 0.8rem;
  }
`;
//! For small devices navbar
function PresentationalListComponent({ toggleDrawer }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  // const [open,setOpen]=useState(false);
  // const toggleDrawer = () => setOpen((open) => !open);
  const listContent = [
    {
      to: "home",
      text: "Beka-Bankist",
    },

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
  return (
    <StyledUl>
      {listContent.map((cont, index) =>
        cont.text === "Beka-Bankist" ? (
          <StyledLi
            key={index}
            style={{
              borderBottom: "1px solid var(--color-border-2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <StyledImg
              src={
                isDarkMode
                  ? "../../img/logo-dark.png"
                  : "../../img/logo-light.png"
              }
            />
            <StyledLink smooth to={`#${cont.to}`} onClick={toggleDrawer}>
              {cont.text}
            </StyledLink>
          </StyledLi>
        ) : (
          <StyledLi key={index}>
            <StyledLink smooth to={`#${cont.to}`} onClick={toggleDrawer}>
              {cont.text}
            </StyledLink>
          </StyledLi>
        )
      )}

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
