import styled, { keyframes } from "styled-components";
import Slider from "../../Components/Slider/Slider";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const StyledHome = styled.div`
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
            var(--color-background),
            var(--color-background)
        ),
        url("../../../img/bank1.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
`;

const bounceAnimation = keyframes`
    0%, 100% {
    transform: translate(-50%, -50%);
     }
    50% {
    transform: translateY(7px) translate(-50%, -50%);
    }
`;

const StyledIcon = styled(KeyboardDoubleArrowDownIcon)`
    color: var(--color-text);
    position: absolute;
    left: 50%;
    bottom: 5%;
    transform: translate(-50%, -50%);
    animation: ${bounceAnimation} infinite 2s
        cubic-bezier(0.84, 0.11, 0.51, 0.78);

    &:hover {
        cursor: pointer;
        transition: all 0.3s;
        color: var(--color-primary);
        transform: translateY(7px) translate(-50%, -50%);
        animation: none;
    }
`;

const StyledLink = styled.a`
    color: var(--color-text);
`;

const data = [
    {
        head: "BANKING SOLUTIONS",
        desc: "Discover premium financial solutions. Managing your accounts, saving, and investing has never been this easy. Get one step closer to your financial goals with a secure, fast, and user-friendly experience.",
    },
    {
        head: "FINANCIAL SOLUTIONS",
        desc: "Explore cutting-edge financial solutions tailored just for you. From efficient account management to smart saving and strategic investing, we're here to empower your financial journey. Unlock a seamless, secure, and user-friendly experience.",
    },
    {
        head: "SAVINGS ACCOUNTS",
        desc: "Open the door to smart saving with our range of Savings Accounts. Secure your financial future with flexible options designed to suit your goals. Enjoy competitive interest rates and user-friendly features, making your savings journey effortless and rewarding.",
    },
];

export default function Home() {
    return (
        <StyledHome id="home">
            <Slider data={data} isHead={true} />
            <StyledLink href="#aboutUs">
                <StyledIcon />
            </StyledLink>
        </StyledHome>
    );
}
