/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledHeading = styled.h1`
    color: var(--color-secondary);
    font-size: 3.8rem;
    margin-top: 6rem;
`;

const StyledParagraph = styled.p`
    width: 60%;
    color: var(--color-text);
    font-size: 1.2rem;
    font-family: var(--font-texts);
    line-height: 2rem;
    letter-spacing: 0.00938em;
    margin-bottom: 3rem;
`;

function Heading({ head, text }) {
    return (
        <>
            <StyledHeading>{head}</StyledHeading>
            <StyledParagraph>{text}</StyledParagraph>
        </>
    );
}

export default Heading;
