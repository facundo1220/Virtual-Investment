import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { validateToken } from "../../services/authenticatedFetch";

const PrivateRoute = () => {
  const [valid, setValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const validation = await validateToken();
      setValid(validation ? true : false);
    };

    checkToken();
  }, []);

  if (valid === null) {
    return <div>Loading...</div>;
  }

  return valid ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
