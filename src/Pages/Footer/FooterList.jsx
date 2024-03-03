import styled from "styled-components";
import FooterListItem from "./FooterListItem";
import PropTypes from "prop-types";

const StyledList = styled.ul`
  list-style: none;
  gap: 0.5rem;
  display: ${(props) => props.direction && "flex"};
`;

FooterList.propTypes = {
  data: PropTypes.array.isRequired,
  direction: PropTypes.string.isRequired,
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
