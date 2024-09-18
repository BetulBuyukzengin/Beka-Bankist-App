import styled from "styled-components";
import GridItem from "./GridItem";
import Heading from "../../../Components/Heading/Heading";
import { media48em } from "../../../Constants/constants";

const StyledServices = styled.div`
  width: 100%;
  /* height: 100dvh; */
  background-color: var(--color-background);
`;

const StyledGridContainer = styled.div`
  display: grid;
  padding: 0 10rem;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  ${media48em} {
    grid-template-columns: repeat(1, 1fr);
    padding: 0 2rem;
  }
`;

const StyledImg = styled.img`
  width: 80px;
  height: 80px;
  filter: drop-shadow(var(--shadow-md));
`;

const items = [
  {
    img: "wallet",
    alt: "money",
    button: "Learn More",
    text: "With our expert team by your side, we are here to turn your financial goals into reality!",
    head: "Business Consulting",
  },
  {
    img: "debit-card",
    alt: "credit card",
    button: "Learn More",
    text: "Unlock financial flexibility with our feature-rich credit card solutions.",
    head: "Credit Card",
  },
  {
    img: "money-bag",
    alt: "money bag",
    button: "Learn More",
    text: "Empower your financial journey with our comprehensive income monitoring services.",
    head: "Income Monitoring",
  },
  {
    img: "money",
    alt: "money",
    button: "Learn More",
    text: "Navigate the complex world of insurance with our expert consulting services.",
    head: "Insurance Consulting",
  },
  {
    img: "checkout",
    alt: "cart",
    button: "Learn More",
    text: "Maximize your wealth potential with our strategic financial investment solutions.",
    head: "Financial Investment",
  },
  {
    img: "megaphone",
    alt: "megaphone",
    button: "Learn More",
    text: "Empower your financial well-being through effective financial management.",
    head: "Financial Management",
  },
];
function OurServices() {
  return (
    <StyledServices id="ourServices">
      <Heading head="Our Services" />
      <StyledGridContainer>
        {items.map((item, i) => (
          <GridItem
            key={i}
            icon={
              <StyledImg src={`../../../img/${item.img}.png`} alt={item.alt} />
            }
            button={item.button}
            text={item.text}
            head={item.head}
          />
        ))}
      </StyledGridContainer>
    </StyledServices>
  );
}

export default OurServices;
