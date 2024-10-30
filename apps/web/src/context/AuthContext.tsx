// ** React Imports
import { createContext, useEffect, useState, ReactNode } from "react";

// ** React Router Imports
import { useLocation, useNavigate } from "react-router-dom";

// ** Config
import authConfig from "src/configs/auth";

// ** Types
import {
  AuthValuesType,
  LoginParams,
  ErrCallbackType,
  UserDataType,
} from "./context.types";
import api from "src/common/request/api";
import { Cookies } from "react-cookie";
import { useQueryParam } from "src/hooks/useQueryParam";

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  // ** Hooks
  const location = useLocation();
  const query = useQueryParam();
  const navigate = useNavigate();
  const cookie = new Cookies();

  const pathname = location.pathname;

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = cookie.get(authConfig.storageTokenKeyName)!;

      if (storedToken) {
        setLoading(true);

        await api
          .get(authConfig.meEndpoint)
          .then(async (response) => {
            setUser({ ...response.data.userData });
            setLoading(false);
          })
          .catch(() => {
            cookie.remove(authConfig.storageTokenKeyName);

            setUser(null);
            setLoading(false);

            if (
              authConfig.onTokenExpiration === "logout" &&
              !pathname.includes("login")
            ) {
              navigate("/login", { replace: true });
            }

            // TODO: REFRESH TOKEN LOGIC
          });
      } else {
        setLoading(false);
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (
    params: LoginParams,
    errorCallback?: ErrCallbackType
  ) => {
    api
      .post(authConfig.loginEndpoint, params)
      .then(async (response) => {
        cookie.set(authConfig.storageTokenKeyName, response.data.accessToken, {
          path: "/",
        });
        const returnUrl = query.get("returnUrl");

        setUser({ ...response.data.userData });

        const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";

        navigate(redirectURL as string, { replace: true });
      })
      .catch((err) => {
        if (errorCallback) errorCallback(err);
      });
  };

  const handleLogout = () => {
    setUser(null);

    cookie.remove(authConfig.storageTokenKeyName);
    navigate("/login");
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
