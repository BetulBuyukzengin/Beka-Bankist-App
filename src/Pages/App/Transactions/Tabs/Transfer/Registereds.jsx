/* eslint-disable react/prop-types */
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledH6 = styled.h6`
  text-align: start;
  font-size: 1rem;
  color: var(--color-text);
  font-weight: 500;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  @media (max-width: 48em) {
    font-size: 0.7rem !important;
  }
  @media (max-width: 31.25em) {
    font-size: 0.6rem !important;
  }
`;
const StyledH5 = styled.h5`
  text-align: start;
  color: var(--color-text);
  font-size: 1.1rem;
  @media (max-width: 48em) {
    font-size: 0.7rem !important;
  }
  @media (max-width: 31.25em) {
    font-size: 0.6rem !important;
  }
`;

const StyledCheckComponent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7% 9%;
  border: 1px solid var(--color-border-2);
  display: ${(props) => props.direction && "flex"};

  background-color: ${({ registered, registeredRecipient }) =>
    registered?.id === registeredRecipient?.id && "var(--color-background-3)"};
  border: ${({ border, errors, registeredRecipient, registered }) =>
    border === "standard"
      ? "none"
      : errors?.registeredRecipient
      ? "1px solid var(--color-error)"
      : registeredRecipient?.id === registered?.id &&
        "1px solid var(--color-text-2)"};
`;

//! Registereds bank account (recipients)
export default function Registereds({ registered, border }) {
  const [searchParams] = useSearchParams();
  const {
    formState: { errors },
  } = useFormContext();
  const registeredRecipient = JSON.parse(
    searchParams.get("registeredRecipient")
  );

  return (
    <>
      <StyledCheckComponent
        errors={errors}
        registeredRecipient={registeredRecipient}
        border={border}
        registered={registered}
      >
        <div>
          <StyledH5>{registered?.recipientShortName}</StyledH5>
          <StyledH6>
            {registered?.recipientAccountNumber || registered?.recipientIban}
          </StyledH6>
        </div>
      </StyledCheckComponent>
    </>
  );
}
