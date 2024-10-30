// ** React Imports
import { Outlet, useNavigate } from "react-router-dom";

// ** Hooks Import
import { useAuth } from "src/hooks/useAuth";

const NoAuthGuard = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth.loading || auth.user === null) {
    return null;
  }

  if (auth.user !== null) {
    navigate("/products", {
      replace: true,
    });

    return null;
  }

  return <Outlet />;
};

export default NoAuthGuard;
