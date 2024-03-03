import PropTypes from "prop-types";
import styled from "styled-components";

FooterTitle.propTypes = {
  children: PropTypes.string.isRequired,
};
const StyledTitle = styled.h3`
  color: var(--color-text);
  font-size: 18px;
  margin-bottom: 1rem;
`;
function FooterTitle({ children }) {
  return <StyledTitle>{children}</StyledTitle>;
}

export default FooterTitle;
