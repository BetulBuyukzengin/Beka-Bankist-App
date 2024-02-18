import styled from "styled-components";
import Heading from "../Heading";
import Image from "../AboutUs/Image";

const StyledAbout = styled.div`
    height: 100dvh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    background-color: var(--color-background);
`;

const StyledContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: flex-start;
    padding: 0 5rem;
`;

const StyledAboutText = styled.div`
    width: 50%;
    height: auto;
    font-size: 1.2rem;
    color: var(--color-text);
    font-family: var(--font-texts);
    padding: 2rem;
    text-align: left;
    height: 100%;
    line-height: 1.5rem;
`;

function AboutUs() {
    return (
        <StyledAbout>
            <Heading
                head="About Us"
                text="Welcome to Beka-Bank, where financial excellence meets customer-centricity. Established with a commitment to empowering lives and fostering financial well-being, we take pride in our legacy of trust, innovation, and personalized service."
            />
            <StyledContainer>
                <Image />
                {/* TEXT */}
                <StyledAboutText>
                    At Beka-Bank, we believe in more than banking; we believe in
                    building lasting relationships. Our dedicated team of
                    professionals is driven by a passion for delivering
                    comprehensive financial solutions that cater to the diverse
                    needs of our valued customers. As a forward-thinking
                    institution, we embrace cutting-edge technology to provide
                    secure, convenient, and efficient banking experiences.
                    Whether you&lsquo;re saving for the future, managing your
                    day-to-day transactions, or exploring investment
                    opportunities, we are here to support your journey every
                    step of the way.
                </StyledAboutText>
            </StyledContainer>
        </StyledAbout>
    );
}

export default AboutUs;
