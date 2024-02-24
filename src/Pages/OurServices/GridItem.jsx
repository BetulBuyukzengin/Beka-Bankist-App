/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledGridItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.5rem;
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

const StyledButton = styled.button`
    outline: none;
    border: none;
    background-color: var(--color-secondary);
    padding: 0.5rem 1rem;
    color: white;
    border-radius: var(--border-radius-sm);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.3s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

function GridItem({ icon, head, text, button }) {
    return (
        <StyledGridItem>
            <StyledIconContainer>{icon}</StyledIconContainer>
            <StyledHead>{head}</StyledHead>
            <StyledText>{text}</StyledText>
            <StyledButton>{button}</StyledButton>
        </StyledGridItem>
    );
}

export default GridItem;
