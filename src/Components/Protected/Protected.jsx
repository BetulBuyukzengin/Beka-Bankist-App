import { useNavigate } from "react-router-dom";
import { useUser } from "../../services/userServices";
import { useEffect } from "react";

function Protected({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useUser();
  isLoading;
  useEffect(
    function () {
      if (!user && !isLoading) navigate("/login");
    },
    [user, navigate, isLoading]
  );
  if (isAuthenticated) return children;
}

export default Protected;
