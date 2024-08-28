/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useLogout } from "../../services/userServices";

const AutoLogout = ({ timeout = 600000 }) => {
  // 300000 ms = 10 minutes

  let logoutTimer;

  const { mutateAsync: logout } = useLogout();

  // Reset the timer
  const resetTimer = () => {
    if (logoutTimer) clearTimeout(logoutTimer);
    logoutTimer = setTimeout(logout, timeout);
  };

  // watch user actions
  useEffect(() => {
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    // Start timer when page is loaded
    resetTimer();

    // Clean up function
    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, []);

  return null;
};

export default AutoLogout;
