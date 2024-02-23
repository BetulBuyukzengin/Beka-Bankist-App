import styled from "styled-components";
import Heading from "../Heading";
import GridItem from "./GridItem";

const StyledServices = styled.div`
    width: 100%;
    height: 100dvh;
    background-color: var(--color-background);
`;

const StyledGridContainer = styled.div`
    display: grid;
    padding: 0 10rem;
    gap: 2rem;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
`;

const StyledImg = styled.img`
    width: 80px;
    height: 80px;
    filter: drop-shadow(var(--shadow-md));
`;

function OurServices() {
    return (
        <StyledServices>
            <Heading head="Our Services" />
            <StyledGridContainer>
                <GridItem
                    icon={
                        <StyledImg src="../../../img/wallet.png" alt="money" />
                    }
                    button="Learn More"
                    text="With our expert team by your side, we are here to turn your financial goals into reality!"
                    head="Business Consulting"
                />
                <GridItem
                    icon={
                        <StyledImg
                            src="../../../img/debit-card.png"
                            alt="credit card"
                        />
                    }
                    button="Learn More"
                    text="Unlock financial flexibility with our feature-rich credit card solutions."
                    head="Credit Card"
                />
                <GridItem
                    icon={
                        <StyledImg
                            src="../../../img/money-bag.png"
                            alt="money bag"
                        />
                    }
                    button="Learn More"
                    text="Empower your financial journey with our comprehensive income monitoring services."
                    head="Income Monitoring"
                />
                <GridItem
                    icon={
                        <StyledImg src="../../../img/money.png" alt="money" />
                    }
                    button="Learn More"
                    text="Navigate the complex world of insurance with our expert consulting services."
                    head="Insurance Consulting"
                />
                <GridItem
                    icon={
                        <StyledImg src="../../../img/checkout.png" alt="cart" />
                    }
                    button="Learn More"
                    text="Maximize your wealth potential with our strategic financial investment solutions."
                    head="Financial Investment"
                />
                <GridItem
                    icon={
                        <StyledImg
                            src="../../../img/megaphone.png"
                            alt="megaphone"
                        />
                    }
                    button="Learn More"
                    text="Empower your financial well-being through effective financial management."
                    head="Financial Management"
                />
            </StyledGridContainer>
        </StyledServices>
    );
}

export default OurServices;
