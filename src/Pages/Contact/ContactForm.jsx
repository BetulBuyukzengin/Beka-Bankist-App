import styled from "styled-components";

const StyledForm = styled.form`
    width: 100%;
    padding: 0 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 2rem;
    color: var(--color-text);
    font-size: 1rem;
`;

function ContactForm() {
    return <StyledForm>Contact Form</StyledForm>;
}

export default ContactForm;
