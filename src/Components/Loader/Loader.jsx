import { MutatingDots } from "react-loader-spinner";
import { styled } from "styled-components";

const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8rem 0;
`;
function Loader() {
  return (
    <StyledLoader>
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="var(--color-primary)"
        secondaryColor="var(--color-secondary)"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
      />
    </StyledLoader>
  );
}

export default Loader;
