import { useEffect, useState } from "react";

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

  return <div>{clock}</div>;
}

export default Time;
