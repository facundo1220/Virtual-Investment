import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { validateToken } from "../../services/authenticatedFetch";

const PrivateRoute = () => {
  const [valid, setValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const validation = await validateToken();
        setValid(validation);
      } catch (error) {
        console.error("Error in token validation process:", error);
        setValid(false);
      }
    };

    checkToken();
  }, []);

  if (valid === null) {
    return <div>Loading...</div>;
  }

  if (valid) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
