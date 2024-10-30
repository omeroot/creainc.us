// ** React Imports
import { ReactElement, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// ** Hooks Import
import { useAuth } from "src/hooks/useAuth";

interface AuthGuardProps {
  fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
  const { fallback } = props;
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (auth.user === null && !auth.loading) {
      const returnUrl =
        location.pathname !== "/" ? location.pathname : undefined;

      navigate("/login", {
        replace: true,
        state: returnUrl ? { returnUrl } : undefined,
      });
    }
  }, [auth, location.pathname, navigate]);

  if (auth.loading || auth.user === null) {
    return fallback;
  }

  return <Outlet />;
};

export default AuthGuard;
