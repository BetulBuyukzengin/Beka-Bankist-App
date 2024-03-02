import styled from "styled-components";
import Heading from "../../Components/Heading/Heading";
import ContactForm from "./ContactForm";

const StyledContactUs = styled.div`
  width: 100%;
  /* height: 100dvh; */
  background-color: var(--color-background);
`;

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 10rem;
  gap: 2rem;
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
`;

const StyledImg = styled.img`
  width: 2rem;
  height: 2rem;
`;

function Contact() {
  return (
    <StyledContactUs id="contact">
      <Heading head="Contact" />
      <StyledGridContainer>
        <StyledGridItem>
          <StyledImg src="../../../img/icons8-location-80.png" alt="" />
          <span>
            203 Fake St. Mountain View, San Francisco, California, USA
          </span>
        </StyledGridItem>
        <StyledGridItem>
          <StyledImg src="../../../img/icons8-phone-80.png" alt="" />
          <span>+1 232 3235 324</span>
        </StyledGridItem>
        <StyledGridItem>
          <StyledImg src="../../../img/icons8-mail-96.png" alt="" />
          <span>youremail@domain.com</span>
        </StyledGridItem>
      </StyledGridContainer>
      <ContactForm />
    </StyledContactUs>
  );
}

export default Contact;
