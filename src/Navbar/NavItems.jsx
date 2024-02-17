import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDarkMode } from "../Contexts/DarkModeContext";

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

    &:nth-child(6) {
        margin-left: 8rem;
    }
`;

const StyledLink = styled.button`
    border: none;
    color: var(--color-text);
    background-color: transparent;
    padding: 1rem 1.5rem;

    &:hover {
        color: var(--color-primary);
        transform: translateY(-2px);
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

function NavItem() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    return (
        <>
            <StyledLi>
                <StyledImg src="../../public/img/money.jpg" />
            </StyledLi>
            <StyledLi>
                <StyledLink>Beka-Bank</StyledLink>
            </StyledLi>
            <StyledLi>
                <StyledLink>Home</StyledLink>
            </StyledLi>
            <StyledLi>
                <StyledLink>About Us</StyledLink>
            </StyledLi>
            <StyledLi>
                <StyledLink>Contact</StyledLink>
            </StyledLi>
            <StyledLi>
                <StyledLink onClick={toggleDarkMode}>
                    {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
                </StyledLink>
            </StyledLi>
            <StyledLi>
                <StyledLink>
                    <LoginIcon />
                </StyledLink>
            </StyledLi>
        </>
    );
}

export default NavItem;
