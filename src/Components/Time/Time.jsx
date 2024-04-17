import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledTime = styled.div`
  background-color: transparent;
  border-bottom: 3px solid var(--color-text);
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  color: var(--color-text);
  padding: 0.2rem 0.7rem;
  border-radius: 0.1rem;
  box-shadow: var(--shadow-md);
  font-size: 0.8rem;
`;
function Time() {
  const [clock, setClock] = useState("");

  useEffect(() => {
    const intervalID = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const prepareClock = `${`${hours}`.padStart(
        2,
        0
      )}:${`${minutes}`.padStart(2, 0)}:${`${seconds}`.padStart(2, 0)}`;
      setClock(prepareClock);
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  return <StyledTime>{clock}</StyledTime>;
}

export default Time;
