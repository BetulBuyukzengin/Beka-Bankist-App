/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useUser } from "../../services/userServices";
import { useEffect } from "react";
import Loader from "../Loader/Loader";

function Protected({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useUser();
  useEffect(
    function () {
      if (!user && !isLoading) navigate("/signIn");
    },
    [user, navigate, isLoading]
  );
  if (isLoading) return <Loader />;
  if (isAuthenticated && !isLoading) return children;
}

export default Protected;
