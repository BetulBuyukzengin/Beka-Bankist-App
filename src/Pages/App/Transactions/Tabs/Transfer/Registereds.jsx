/* eslint-disable react/prop-types */
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledH6 = styled.h6`
  text-align: start;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;
const StyledH5 = styled.h5`
  text-align: start;
  font-size: 1.1rem;
  color: var(--color-text);
`;

const StyledCheckComponent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7% 9%;
  border: 1px solid var(--color-border-2);
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
        style={{
          backgroundColor:
            registered?.id === registeredRecipient?.id &&
            "var(--color-background-3)",
          border:
            border === "standard"
              ? "none"
              : errors?.registeredRecipient
              ? "1px solid var(--color-error)"
              : registeredRecipient?.id === registered?.id &&
                "1px solid var(--color-text-2)",
        }}
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
