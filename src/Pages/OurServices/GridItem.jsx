/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledGridItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const StyledIconContainer = styled.div`
    width: 5rem;
    height: 5rem;

    & svg {
        width: 5rem;
        height: 5rem;
        fill: var(--color-primary);
        opacity: 0.9;
        filter: drop-shadow(var(--shadow-lg));
    }
`;

const StyledHead = styled.h3`
    font-size: 2rem;
    color: var(--color-text);
`;

const StyledText = styled.p`
    color: var(--color-text);
    font-size: 1rem;
    width: 80%;
    margin-bottom: 0.5rem;
    opacity: 0.7;
`;

const StyledButtonContainer = styled.button`
    outline: none;
    border: none;
    background-color: var(--color-secondary);
    padding: 0.5rem 1rem;
    color: white;
    border-radius: var(--border-radius-sm);

    &:hover {
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`;

function GridItem({ icon, head, text, button }) {
    return (
        <StyledGridItem>
            <StyledIconContainer>{icon}</StyledIconContainer>
            <StyledHead>{head}</StyledHead>
            <StyledText>{text}</StyledText>
            <StyledButtonContainer>{button}</StyledButtonContainer>
        </StyledGridItem>
    );
}

export default GridItem;
