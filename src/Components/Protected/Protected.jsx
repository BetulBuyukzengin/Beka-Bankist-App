/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useUser } from "../../services/userServices";
import { useEffect } from "react";

function Protected({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useUser();
  useEffect(
    function () {
      if (!user && !isLoading) navigate("/signIn");
    },
    [user, navigate, isLoading]
  );
  if (isLoading) return <div>Loading</div>;
  if (isAuthenticated && !isLoading) return children;
}

export default Protected;
