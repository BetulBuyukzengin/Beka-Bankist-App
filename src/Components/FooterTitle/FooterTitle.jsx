import PropTypes from "prop-types";
import styled from "styled-components";
import { media31_25em, media48em } from "../../Constants/constants";

FooterTitle.propTypes = {
  children: PropTypes.string.isRequired,
};
const StyledTitle = styled.h3`
  color: var(--color-text);
  font-size: 18px;
  margin-bottom: 1rem;
  ${media48em} {
    font-size: 0.9rem;
  }
  ${media31_25em} {
    font-size: 0.8rem;
  }
`;
function FooterTitle({ children }) {
  return <StyledTitle>{children}</StyledTitle>;
}

export default FooterTitle;
