import PropTypes from "prop-types";
import styled from "styled-components";
import {
  media31_25em,
  media48em,
  media62_5em,
  media84_37em,
} from "../../../Constants/constants";

FooterListItem.propTypes = {
  link: PropTypes.any,
};
const StyledItem = styled.li`
  margin-bottom: 0.5rem;
`;
const StyledLink = styled.a`
  color: var(--color-text);

  font-size: 2.1rem;
  ${media84_37em} {
    font-size: 1.9rem;
  }
  ${media62_5em} {
    font-size: 1.8rem;
  }
  ${media48em} {
    font-size: 1.7rem;
  }
  ${media31_25em} {
    font-size: 1.6rem;
  }
`;
function FooterListItem({ link }) {
  return (
    <StyledItem>
      <StyledLink
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => console.log(`Navigating to: ${link.href}`)}
      >
        {link.component}
      </StyledLink>
    </StyledItem>
  );
}

export default FooterListItem;
