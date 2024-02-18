import styled from "styled-components";
import Slider from "../Slider/Slider";
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

// const StyledOpacity = styled.div`
//     background: var(--color-background);
//     opacity: 0.85;
//     position: absolute;
//     height: 100dvh;
//     width: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// `;

const StyledIcon = styled(KeyboardDoubleArrowDownIcon)`
    font-size: 2rem;
    color: var(--color-text);
    position: absolute;
    left: 50%;
    bottom: 5%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transition: all 0.3s;
        /* transition: color 0.3s ease-in-out, transform 0.3s ease-in-out, */
        color: var(--color-primary);
        transform: translateY(7px) translate(-50%, -50%);
    }
`;
export default function Home() {
    return (
        <StyledHome>
            <Slider />
            <StyledIcon />
        </StyledHome>
    );
}
