/* eslint-disable react/prop-types */
import styled from "styled-components";
import {
  media48em,
  media31_25em,
  media84_37em,
} from "../../Constants/constants";

const StyledHeading = styled.h1`
  color: var(--color-secondary);
  font-size: 3.8rem;
  padding-top: 6rem;
  text-align: center;
  filter: drop-shadow(var(--shadow-md));
  ${media84_37em} {
    font-size: 1.7rem;
    padding-top: 0;
  }
  ${media48em} {
    margin-bottom: 1.5rem;
    padding-top: 0;
    font-size: 1.3rem;
  }
  ${media31_25em} {
    font-size: 1rem;
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
  ${media84_37em} {
    font-size: 1rem;
  }
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
