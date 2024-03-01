import styled from "styled-components";
import Heading from "../Heading/Heading";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "../Modal/Modal";
import { useState } from "react";

const StyledGaleryContainer = styled.div`
  padding: 5rem;
  background-color: var(--color-background);
`;
const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
`;

const StyledImg = styled.img`
  width: 100%;
  border-radius: var(--border-radius-md);
`;
const StyledSearchIcon = styled(SearchIcon)`
  opacity: 0;
  visibility: hidden;
  scale: 0;
  position: absolute;
  color: var(--color-text);
`;
const StyledGridItem = styled.div`
  width: 100%;
  background-color: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border-radius: var(--border-radius-md);
  cursor: pointer;

  &:hover {
    ${StyledImg} {
      opacity: 0.3;
    }
    ${StyledSearchIcon} {
      opacity: 1;
      visibility: visible;
      scale: 1.4;
      transition: all 0.4s;
    }
  }
`;
const images = [
  {
    galleryImg: "bank1.jpg",
  },
  {
    galleryImg: "money.jpg",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (img) => {
    setOpen(true);
    setSelectedImage(img);
  };
  const handleClose = () => setOpen(false);

  return (
    <StyledGaleryContainer>
      <Heading head="Gallery" />
      <StyledGridContainer>
        {images.map((img, index) => (
          <StyledGridItem
            key={index}
            onClick={() => handleOpen(img.galleryImg)}
          >
            <StyledImg
              src={`../../../public/img/${img.galleryImg}`}
              alt={`Resim ${index + 1}`}
            />
            <StyledSearchIcon />
          </StyledGridItem>
        ))}
      </StyledGridContainer>
      <Modal handleClose={handleClose} open={open} imagesList={images} />
    </StyledGaleryContainer>
  );
}
