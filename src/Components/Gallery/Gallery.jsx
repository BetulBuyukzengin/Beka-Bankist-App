import styled from "styled-components";
import Heading from "../Heading/Heading";
import SearchIcon from "@mui/icons-material/Search";
import GalleryModal from "../GalleryModal/GalleryModal";
import { useState } from "react";
import {
  media31_25em,
  media48em,
  media84_37em,
} from "../../Constants/constants";

const StyledGaleryContainer = styled.div`
  padding: 5rem;
  background-color: var(--color-background);
  ${media84_37em} {
    padding: 2rem;
  }
  ${media48em} {
    padding: 0.8rem;
  }
`;
const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  ${media48em} {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
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
  ${media48em} {
    font-size: 0.8rem !important;
  }
  ${media31_25em} {
    font-size: 0.7rem !important;
  }
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
  {
    galleryImg: "gallery1.jpg",
  },
  {
    galleryImg: "gallery2.jpg",
  },
  {
    galleryImg: "gallery3.jpg",
  },
  {
    galleryImg: "gallery4.jpg",
  },
  {
    galleryImg: "gallery5.jpg",
  },
  {
    galleryImg: "gallery6.jpg",
  },
  {
    galleryImg: "gallery7.jpg",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (img) => {
    setSelectedImage(img);
    setOpen(true);
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
      <GalleryModal
        handleClose={handleClose}
        open={open}
        imagesList={images}
        selectedImage={selectedImage}
      />
    </StyledGaleryContainer>
  );
}
