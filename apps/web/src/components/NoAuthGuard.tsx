// ** React Imports
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// ** Hooks Import
import { useAuth } from "src/hooks/useAuth";

const NoAuthGuard = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the auth is still loading
    if (!auth.loading) {
      // If the user is authenticated, navigate to /products
      if (auth.user !== null) {
        navigate("/", {
          replace: true,
        });
      }
    }
  }, [auth.loading, auth.user, navigate]); // Dependencies

  if (auth.loading) {
    return null;
  }

  return <Outlet />;
};

export default NoAuthGuard;
