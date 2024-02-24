import styled from "styled-components";
import Heading from "../../Components/Heading/Heading";
import CustomAccordion from "../../Components/Accordion/Accordion";
import { useState } from "react";

const questions = [
    {
        question: "Can I accept both Paypal and Stripe ?",
        content:
            "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    },
    {
        question: "What available is refund period ?",
        content:
            "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    },
    {
        question: "Where are you from ?",
        content:
            "Voluptatum nobis obcaecati perferendis dolor totam unde dolores quod maxime corporis officia et. Distinctio assumenda minima maiores.",
    },
    {
        question: "What is your opening time ?",
        content:
            "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    },
    {
        question: "What is the meaning of life ?",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        question: "How can I contact customer support ?",
        content:
            "In case of any issues or queries, you can reach our customer support team via email at support@example.com or by phone at +123456789.",
    },
    {
        question: "Do you offer international shipping ?",
        content:
            "Yes, we provide international shipping services to various countries. Shipping rates and delivery times may vary depending on the destination.",
    },
    {
        question: "Are there any ongoing promotions ?",
        content:
            "Check our website or subscribe to our newsletter to stay updated on the latest promotions and discounts available.",
    },
];

const StyledContainer = styled.div`
    height: 100vh;
    width: 100%;
    background-color: var(--color-background);
    padding: 0 10rem;
`;

const StyledGridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
`;

function FrequentlyQuestions() {
    const [expanded, setExpanded] = useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <StyledContainer id="frequentlyQuestions">
            <Heading head="Frequently Ask Questions" />
            <StyledGridContainer>
                {questions.map(cur => (
                    <CustomAccordion
                        question={cur.question}
                        content={cur.content}
                        key={cur}
                        index={cur}
                        expanded={expanded}
                        handleChange={handleChange}
                    />
                ))}
            </StyledGridContainer>
        </StyledContainer>
    );
}

export default FrequentlyQuestions;
