import styled from "styled-components";

const StyledGaleryContainer = styled.div`
  height: 100dvh;
  padding: 5rem;
`;
const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  /* height: 100vh; */
`;

const StyledGridItem = styled.div`
  width: 100%;
  /* height: 100px; */
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

export default function Gallery() {
  const images = ["bank1.jpg", "money.jpg"];

  return (
    <StyledGaleryContainer>
      <StyledGridContainer>
        {images.map((img, index) => (
          <StyledGridItem key={index}>
            <img
              src={`../../../public/img/${img}`}
              alt={`Resim ${index + 1}`}
            />
          </StyledGridItem>
        ))}
      </StyledGridContainer>
    </StyledGaleryContainer>
  );
}
