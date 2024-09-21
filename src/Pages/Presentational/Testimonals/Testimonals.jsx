import styled from "styled-components";
import Slider from "../../../Components/Slider/Slider";
import Heading from "../../../Components/Heading/Heading";
import {
  media31_25em,
  media48em,
  media62_5em,
  media84_37em,
} from "../../../Constants/constants";

const StyledContainer = styled.div`
  width: 100%;
  height: 100dvh;
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
    height: auto;
  }
  ${media31_25em} {
    padding: 0.6rem;
  }
`;

const data = [
  {
    desc: "Discover premium financial solutions. Managing your accounts, saving, and investing has never been this easy. Get one step closer to your financial goals with a secure, fast, and user-friendly experience.",
    avatar: "../../../img/user1.jpg",
    name: "Alice",
  },
  {
    desc: "Explore cutting-edge financial solutions tailored just for you. From efficient account management to smart saving and strategic investing, we're here to empower your financial journey. Unlock a seamless, secure, and user-friendly experience.",
    avatar: "../../../img/user2.jpg",
    name: "Belma",
  },
  {
    desc: "Open the door to smart saving with our range of Savings Accounts. Secure your financial future with flexible options designed to suit your goals. Enjoy competitive interest rates and user-friendly features, making your savings journey effortless and rewarding.",
    avatar: "../../../img/user3.jpg",
    name: "Han Lue",
  },
];

function Testimonals() {
  return (
    <StyledContainer>
      <Heading head="Happy Customers" />
      <Slider data={data} isAvatar />
    </StyledContainer>
  );
}

export default Testimonals;
