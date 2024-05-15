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
  &:focus-visible {
    outline: none;
  }
`;

export default function GalleryModal({
  handleClose,
  open,
  imagesList,
  selectedImage,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledBox>
        <Slider
          data={imagesList}
          style={{ height: "20px" }}
          selectedImage={selectedImage}
        />
      </StyledBox>
    </Modal>
  );
}
