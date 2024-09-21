import styled from "styled-components";
import ContactForm from "./ContactForm";
import Heading from "../../../Components/Heading/Heading";
import {
  media31_25em,
  media48em,
  media62_5em,
  media84_37em,
} from "../../../Constants/constants";

const StyledContactUs = styled.div`
  width: 100%;
  background-color: var(--color-background);
  padding: 4rem;

  ${media84_37em} {
    padding: 2rem;
  }
  ${media62_5em} {
    padding: 1.5rem;
  }
  ${media48em} {
    padding: 1rem;
  }
  ${media31_25em} {
    padding: 0.6rem;
  }
`;

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 10rem;
  gap: 2rem;
  ${media84_37em} {
    padding: 0 2rem;
  }
  ${media48em} {
    grid-template-columns: repeat(1, 1fr);
    padding: 0.5rem 2rem;
    gap: 1rem;
  }
  ${media31_25em} {
    gap: 0.8rem;
  }
`;

const StyledGridItem = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--color-text);
  font-size: 1rem;
  gap: 1rem;
  ${media48em} {
    gap: 0.8rem;
  }
  ${media31_25em} {
    gap: 0.5rem;
  }
`;

const StyledImg = styled.img`
  width: 2rem;
  height: 2rem;
  /* ${media84_37em} {
    width: 1.5rem;
    height: 1.5rem;
  } */
  ${media62_5em} {
    width: 1.9rem;
    height: 1.9rem;
  }
  ${media48em} {
    width: 1.8rem;
    height: 1.8rem;
  }
  /* ${media31_25em} {
    width: 1.8rem;
    height: 1.8rem;
  } */
`;
const StyledSpan = styled.span`
  font-size: 1.2rem;

  /* ${media84_37em} {
    font-size: 1.2rem;
  } */
  ${media48em} {
    font-size: 1rem;
  }
  ${media31_25em} {
    font-size: 0.9rem;
  }
`;
function Contact() {
  return (
    <StyledContactUs id="contact">
      <Heading head="Contact" />
      <StyledGridContainer>
        <StyledGridItem>
          <StyledImg src="../../../img/icons8-location-80.png" alt="" />
          <StyledSpan>
            203 Fake St. Mountain View, San Francisco, California, USA
          </StyledSpan>
        </StyledGridItem>
        <StyledGridItem>
          <StyledImg src="../../../img/icons8-phone-80.png" alt="" />
          <StyledSpan>+1 232 3235 324</StyledSpan>
        </StyledGridItem>
        <StyledGridItem>
          <StyledImg src="../../../img/icons8-mail-96.png" alt="" />
          <StyledSpan>youremail@domain.com</StyledSpan>
        </StyledGridItem>
      </StyledGridContainer>
      <ContactForm />
    </StyledContactUs>
  );
}

export default Contact;
