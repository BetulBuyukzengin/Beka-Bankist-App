/* eslint-disable react/prop-types */
import styled from "styled-components";
import { media48em, media31_25em } from "../../Constants/constants";

const StyledHeading = styled.h1`
  color: var(--color-secondary);
  font-size: 3.8rem;
  padding-top: 6rem;
  text-align: center;
  filter: drop-shadow(var(--shadow-md));
  ${media48em} {
    padding-top: 0;
    font-size: 0.9rem;
  }
  ${media31_25em} {
    font-size: 0.8rem;
  }
`;

const StyledParagraph = styled.p`
  width: 60%;
  color: var(--color-text);
  font-size: 1.2rem;
  font-family: var(--font-texts);
  line-height: 2rem;
  letter-spacing: 0.00938em;
  margin-bottom: 3rem;
  ${media48em} {
    font-size: 0.8rem;
    line-height: 0.9rem;
  }
  ${media31_25em} {
    font-size: 0.7rem;
  }
`;

function Heading({ head, text }) {
  return (
    <>
      <StyledHeading>{head}</StyledHeading>
      {text && <StyledParagraph>{text}</StyledParagraph>}
    </>
  );
}

export default Heading;
