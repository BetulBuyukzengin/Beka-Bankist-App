import styled from "styled-components";
import Slider from "../Slider/Slider";

const StyledHome = styled.div`
  height: 100dvh;
  background-image: url("../../../public/img/bank1.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`;
const StyledOpacity = styled.div`
  background: rgba(0, 0, 0, 0.7);
  opacity: 0.7;
  position: absolute;
  height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
// const StyledDescription = styled.div`
//   margin-top: 8rem;
//   width: 70%;
// `;
// const StyledH1 = styled.div`
//   font-size: 4rem;
//   color: #fff;
//   font-weight: 900;
//   letter-spacing: 0.3rem;
// `;
// const StyledParagraphy = styled.p`
//   font-size: 1.4rem;
//   color: #fff;
//   line-height: 2rem;
//   letter-spacing: 0.1rem;
// `;
export default function Home() {
  return (
    <StyledHome>
      <StyledOpacity>
        {/* <StyledDescription>
          <StyledH1>BANKING SOLUTIONS</StyledH1>
          <StyledParagraphy>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat
            eveniet maxime corrupti, nisi adipisicing elit. Quaerat eveniet
            maxime corrupti, nisi
          </StyledParagraphy>
        </StyledDescription> */}
        <Slider />
      </StyledOpacity>
    </StyledHome>
  );
}
