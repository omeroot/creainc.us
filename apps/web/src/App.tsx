//!! Remove this line in production
/** LOAD FAKE DB */
import "src/_fake-db";
//!! Remove this line in production

import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "src/context/AuthContext";
import { axiosConfig } from "src/common/request/api";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "src/pages/authentication/Login";
import AuthGuard from "src/components/AuthGuard";
import ProductList from "src/pages/product/List";
import ProductDetails from "src/pages/product/Details";
import FallbackSpinner from "./components/FallbackSpinner";
import NoAuthGuard from "./components/NoAuthGuard";
import DefaultLayout from "./components/DefaultLayout";
import { ReactElement, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/base/404";

axiosConfig();

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const getLayout = (page: ReactElement) => (
    <DefaultLayout>{page}</DefaultLayout>
  );

  return (
    <Router>
      <ScrollToTop />
      <CookiesProvider>
        <AuthProvider>
          <Routes>
            <Route element={<NoAuthGuard />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<AuthGuard fallback={<FallbackSpinner />} />}>
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/products" element={getLayout(<ProductList />)} />
              <Route
                path="/products/:id"
                element={getLayout(<ProductDetails />)}
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </CookiesProvider>
      <Toaster />
    </Router>
  );
}

export default App;
