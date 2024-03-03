import PropTypes from "prop-types";
import styled from "styled-components";

FooterListItem.propTypes = {
  link: PropTypes.string.isRequired,
};
const StyledItem = styled.li`
  margin-bottom: 0.5rem;
`;
const StyledLink = styled.a`
  color: var(--color-text);
  font-size: 14px;
`;
function FooterListItem({ link }) {
  return (
    <StyledItem>
      <StyledLink href="#">{link}</StyledLink>
    </StyledItem>
  );
}

export default FooterListItem;
