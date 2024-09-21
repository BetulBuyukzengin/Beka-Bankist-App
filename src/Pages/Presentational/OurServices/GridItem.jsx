/* eslint-disable react/prop-types */
import styled from "styled-components";
import {
  media31_25em,
  media48em,
  media62_5em,
  media84_37em,
} from "../../../Constants/constants";

const StyledGridItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  ${media84_37em} {
    align-items: center;
  }
  ${media48em} {
    align-items: center;
  }
`;

const StyledIconContainer = styled.div`
  width: 5rem;
  height: 5rem;
  ${media48em} {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
  }
  & img {
    width: 5rem;
    height: 5rem;
    fill: var(--color-primary);
    opacity: 0.9;
    filter: drop-shadow(var(--shadow-lg));
    ${media48em} {
      width: 5rem;
      height: 5rem;
    }
    ${media31_25em} {
      width: 4rem;
      height: 4rem;
    }
  }
`;

const StyledHead = styled.h3`
  font-size: 1.5rem;
  color: var(--color-text);
  ${media84_37em} {
    font-size: 1.1rem;
  }
  ${media48em} {
    font-size: 1rem;
  }
  ${media31_25em} {
    font-size: 0.9rem;
  }
`;

const StyledText = styled.p`
  color: var(--color-text);
  font-size: 1.2rem;
  width: 80%;
  margin-bottom: 0.5rem;
  text-align: center;

  opacity: 0.7;
  ${media84_37em} {
    font-size: 1.1rem;
  }
  ${media48em} {
    font-size: 1rem;
  }
  ${media31_25em} {
    font-size: 0.9rem;
  }
`;

const StyledButton = styled.button`
  outline: none;
  border: none;
  background-color: var(--color-secondary);
  padding: 0.5rem 1rem;
  color: white;
  border-radius: var(--border-radius-sm);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
  font-size: 1.2rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  ${media84_37em} {
    font-size: 1rem;
  }
  ${media62_5em} {
    font-size: 0.9rem;
  }
  ${media48em} {
    font-size: 0.8rem;
  }
  ${media31_25em} {
    font-size: 0.7rem;
  }
`;

function GridItem({ icon, head, text, button }) {
  return (
    <StyledGridItem>
      <StyledIconContainer>{icon}</StyledIconContainer>
      <StyledHead>{head}</StyledHead>
      <StyledText>{text}</StyledText>
      <StyledButton>{button}</StyledButton>
    </StyledGridItem>
  );
}

export default GridItem;
