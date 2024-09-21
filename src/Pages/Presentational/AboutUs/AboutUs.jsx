import styled from "styled-components";
import Image from "../AboutUs/Image";
import Heading from "../../../Components/Heading/Heading";
import {
  media31_25em,
  media48em,
  media62_5em,
  media84_37em,
} from "../../../Constants/constants";

const StyledAbout = styled.div`
  /* height: 100dvh; */
  height: auto;
  padding: 4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  background-color: var(--color-background);

  ${media84_37em} {
    height: auto;
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

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
  padding: 0 10rem;

  height: auto;
  ${media84_37em} {
    padding: 0 3rem;
    align-items: center;
  }
  ${media48em} {
    padding: 0;
    flex-direction: column;
  }
`;

const StyledAboutText = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  /* height: auto; */
  font-size: 1.2rem;
  color: var(--color-text);
  font-family: var(--font-texts);
  padding: 2rem;
  text-align: left;
  /* height: 100%; */
  line-height: 1.5rem;

  ${media84_37em} {
    width: 100%;
    font-size: 1rem;
  }
  ${media48em} {
    font-size: 0.8rem;
    width: 100%;
    padding: 0.5rem;
  }
  ${media31_25em} {
    font-size: 0.8rem;
  }
`;

function AboutUs() {
  return (
    <StyledAbout id="aboutUs">
      <Heading
        head="About Us"
        text="Welcome to Beka-Bank, where financial excellence meets customer-centricity. Established with a commitment to empowering lives and fostering financial well-being, we take pride in our legacy of trust, innovation, and personalized service."
      />
      <StyledContainer>
        <Image />
        {/* TEXT */}
        <StyledAboutText>
          At Beka-Bank, we believe in more than banking; we believe in building
          lasting relationships. Our dedicated team of professionals is driven
          by a passion for delivering comprehensive financial solutions that
          cater to the diverse needs of our valued customers. As a
          forward-thinking institution, we embrace cutting-edge technology to
          provide secure, convenient, and efficient banking experiences. Whether
          you&lsquo;re saving for the future, managing your day-to-day
          transactions, or exploring investment opportunities, we are here to
          support your journey every step of the way.
        </StyledAboutText>
      </StyledContainer>
    </StyledAbout>
  );
}

export default AboutUs;
