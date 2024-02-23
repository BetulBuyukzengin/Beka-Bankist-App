/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import Slider from "../Slider/Slider";

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  width: 60%;
  height: 85dvh;

  &:focus-visible {
    outline: none;
  }
`;
const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  border: none;
`;
export default function GalleryModal({ handleClose, open, image }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledBox>
        <Slider />
        <StyledImg src={`../../../public/img/${image}`} />
      </StyledBox>
    </Modal>
  );
}

//////////////////////////////////////ilk verison

// /* eslint-disable react/prop-types */
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import styled from "styled-components";
// import Slider from "../Slider/Slider";

// const StyledBox = styled(Box)`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   border: none;
//   width: 60%;
//   height: 85dvh;

//   &:focus-visible {
//     outline: none;
//   }
// `;
// const StyledImg = styled.img`
//   width: 100%;
//   height: 100%;
//   border: none;
// `;
// export default function GalleryModal({ handleClose, open, image }) {
//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <StyledBox>

//         <StyledImg src={`../../../public/img/${image}`} />
//       </StyledBox>
//     </Modal>
//   );
// }
