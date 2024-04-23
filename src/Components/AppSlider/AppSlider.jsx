import styled from "styled-components";
import AccountContent from "../../Pages/App/Account/AccountsContent";
import { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import { useAccounts } from "../../services/accountServices";
import Loader from "../Loader/Loader";
import { useDarkMode } from "../../Contexts/DarkModeContext";

const StyledCarouselCaption = styled(CarouselCaption)`
  bottom: 0;
  top: 0;
  right: 5%;
  left: 5%;
  color: var(--color-text);
`;
const StyledCarouselControl = styled(CarouselControl)`
  width: 8%;
  bottom: 20rem;
  & > span {
    background-image: ${(props) =>
      props.direction === "prev"
        ? props.isDarkMode
          ? "url(../../../../../public/img/prevLight.png)!important"
          : "url(../../../../../public/img/prevDark.png)!important"
        : props.isDarkMode
        ? "url(../../../../../public/img/nextLight.png)!important"
        : "url(../../../../../public/img/nextDark.png)!important"};
  }
`;

function AppSlider() {
  const { isLoading, accounts } = useAccounts();
  console.log(accounts);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { isDarkMode } = useDarkMode();
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === accounts.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? accounts.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  if (isLoading) return <Loader />;
  const slides = accounts?.map((item) => {
    return (
      <CarouselItem
        className="custom-tag"
        tag="div"
        key={item.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      >
        <StyledCarouselCaption
          captionHeader={<AccountContent item={item} />}
          captionText=""
        />
      </CarouselItem>
    );
  });

  return (
    <div>
      <style>
        {`.custom-tag {
              max-width: 100%;
              min-height: 450px;
              background: var(--color-background);
            }`}
      </style>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        enableTouch
        interval={null}
      >
        <CarouselIndicators
          items={accounts}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <StyledCarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
          isDarkMode={isDarkMode}
        />
        <StyledCarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
          isDarkMode={isDarkMode}
        />
      </Carousel>
    </div>
  );
}

export default AppSlider;
