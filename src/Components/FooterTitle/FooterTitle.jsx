import PropTypes from "prop-types";
import styled from "styled-components";
import {
  media48em,
  media62_5em,
  media84_37em,
} from "../../Constants/constants";

FooterTitle.propTypes = {
  children: PropTypes.string.isRequired,
};
const StyledTitle = styled.h3`
  color: var(--color-text);
  font-size: 1.5rem;
  margin-bottom: 1rem;

  ${media84_37em} {
    font-size: 1.1rem;
  }
  ${media62_5em} {
    font-size: 1rem;
  }
  ${media48em} {
    font-size: 0.9rem;
  }
`;
function FooterTitle({ children }) {
  return <StyledTitle>{children}</StyledTitle>;
}

export default FooterTitle;
