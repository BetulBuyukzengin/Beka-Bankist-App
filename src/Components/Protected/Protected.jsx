import { useNavigate } from "react-router-dom";
import { useUser } from "../../services/userServices";
import { useEffect } from "react";
function Protected({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useUser();
  useEffect(
    function () {
      if (!user) navigate("/login");
    },
    [user, navigate]
  );
  if (isAuthenticated) return children;
}

export default Protected;
