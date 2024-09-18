import styled from "styled-components";
import { media31_25em, media48em } from "../../../Constants/constants";

const StyledImage = styled.img`
  opacity: 1;
  display: block;
  width: 90%;
  height: auto;
  transition: 0.5s ease;
  backface-visibility: hidden;
  border-radius: var(--border-radius-md);

  ${media48em} {
    width: 100%;
  }
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
  ${media48em} {
    align-self: center;
    /* width: 100%; */
  }
`;
const StyledText = styled.div`
  background-color: var(--color-background);
  color: var(--color-text);
  font-size: 1rem;
  padding: 16px 32px;
  border-radius: var(--border-radius-sm);
  ${media48em} {
    font-size: 0.7rem;
  }
  ${media31_25em} {
    font-size: 0.6rem;
    padding: 16px 40px;
  }
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
