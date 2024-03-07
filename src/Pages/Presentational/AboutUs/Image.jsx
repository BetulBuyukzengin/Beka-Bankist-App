import styled from "styled-components";

const StyledImage = styled.img`
    opacity: 1;
    display: block;
    width: 90%;
    height: auto;
    transition: 0.5s ease;
    backface-visibility: hidden;
    border-radius: var(--border-radius-md);
`;

const StyledTextContainer = styled.div`
    transition: 0.5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
`;

const StyledContainer = styled.div`
    position: relative;
    width: 40%;

    &:hover {
        ${StyledImage} {
            opacity: 0.3;
        }

        ${StyledTextContainer} {
            opacity: 1;
        }
    }
`;

const StyledText = styled.div`
    background-color: var(--color-background);
    color: var(--color-text);
    font-size: 16px;
    padding: 16px 32px;
    border-radius: var(--border-radius-sm);
`;

function Image() {
    return (
        <StyledContainer>
            <StyledImage src="../../../img/money.jpg" alt="Png" />
            <StyledTextContainer>
                <StyledText>Beka-Bank</StyledText>
            </StyledTextContainer>
        </StyledContainer>
    );
}

export default Image;
