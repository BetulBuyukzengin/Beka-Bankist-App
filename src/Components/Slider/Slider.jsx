const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  border: none;
`;
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import {
  media31_25em,
  media48em,
  media84_37em,
} from "../../Constants/constants";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

function Slider({ data, isHead, isAvatar, selectedImage }) {
  // Test
  const swiperRef = useRef(null);
  const [initialSlide, setInitialSlide] = useState(0);

  useEffect(() => {
    const selectedImgIndex = data.findIndex(
      (item) => item.galleryImg === selectedImage
    );

    if (selectedImgIndex >= 0) {
      // Swiper'ı manuel olarak tıklanan resme kaydır - Autoplay'i durdur
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.autoplay.stop(); // Autoplay durdur
        swiperRef.current.swiper.slideTo(selectedImgIndex, 0); // Animasyonsuz slayta git

        // Slayta gittikten sonra autoplay'i yeniden başlat
        setTimeout(() => {
          swiperRef.current.swiper.autoplay.start(); // Autoplay tekrar başlasın
        }, 500); // Biraz gecikme ile başlat (500 ms)
      }
    }
  }, [selectedImage, data]);
  return (
    <Box
      sx={{
        maxWidth: "100%",
        flexGrow: 1,
        cursor: "pointer",
        [media48em]: {
          padding: isAvatar ? "0" : "1rem",
        },
      }}
    >
      <Swiper
        ref={swiperRef}
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        // autoplay={{ delay: 3000 }} // Autoplay özelliği aktif
        initialSlide={initialSlide} // Başlangıç slaytını ayarla
      >
        {data?.map((step, index) => (
          <SwiperSlide key={index}>
            <div>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <>
                  {isHead && (
                    <Typography
                      sx={{
                        fontSize: "3.8rem",
                        color: "var(--color-secondary)",
                        fontWeight: "900",
                        letterSpacing: "0.3rem",
                        textAlign: "center",
                        mb: "1rem",
                        [media84_37em]: {
                          fontSize: "1.9rem",
                        },
                        [media48em]: {
                          letterSpacing: "normal",
                          width: "100%",
                          fontSize: "1.4rem",
                          mb: ".3rem",
                        },
                        [media31_25em]: {
                          fontSize: "1.2rem",
                        },
                      }}
                    >
                      {data[index].head}
                    </Typography>
                  )}
                </>
                <Typography
                  sx={{
                    width: "60%",
                    fontSize: "1.3rem",
                    color: "var(--color-text)",
                    lineHeight: "2rem",
                    textAlign: "center",
                    mb: "2rem",
                    fontStyle: isAvatar && "italic",
                    [media84_37em]: {
                      fontSize: "1.2rem",
                    },
                    [media48em]: {
                      width: "100%",
                      fontSize: "1rem",
                      mb: "1rem",
                      lineHeight: ".9rem",
                    },
                    // [media31_25em]: {
                    //   fontSize: ".9rem",
                    // },
                  }}
                >
                  {data[index].desc}
                </Typography>
                {isAvatar && (
                  <Tooltip sx={{ zIndex: 999 }} title={step?.name} arrow>
                    <Avatar
                      alt={step?.name}
                      src={step?.avatar}
                      sx={{
                        width: 96,
                        height: 96,
                        mb: "2rem",
                      }}
                    />
                  </Tooltip>
                )}
                {step.galleryImg && (
                  <StyledImg src={`../../../img/${step.galleryImg}`} />
                )}
              </Box>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default Slider;
