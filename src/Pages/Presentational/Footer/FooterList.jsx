import styled from "styled-components";
import FooterListItem from "./FooterListItem";
import PropTypes from "prop-types";
import { media48em } from "../../../Constants/constants";

const StyledList = styled.ul`
  list-style: none;
  gap: 0.5rem;
  display: ${(props) => props.direction && "flex"};
  padding-left: ${(props) => props.direction && 0};

  ${media48em} {
    padding-left: 0;
  }
`;

FooterList.propTypes = {
  data: PropTypes.array.isRequired,
  direction: PropTypes.string,
};

function FooterList({ data, direction }) {
  return (
    <StyledList direction={direction}>
      {data.map((link, i) => (
        <FooterListItem link={link} key={i} />
      ))}
    </StyledList>
  );
}

export default FooterList;
