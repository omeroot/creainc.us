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
} from "react-router-dom";
import Login from "src/pages/authentication/Login";
import AuthGuard from "src/components/AuthGuard";
import ProductList from "src/pages/product/List";
import ProductDetails from "src/pages/product/Details";
import FallbackSpinner from "./components/FallbackSpinner";
import NoAuthGuard from "./components/NoAuthGuard";

axiosConfig();

function App() {
  return (
    <Router>
      <CookiesProvider>
        <AuthProvider>
          <Routes>
            <Route element={<NoAuthGuard />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<AuthGuard fallback={<FallbackSpinner />} />}>
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetails />} />
            </Route>
          </Routes>
        </AuthProvider>
      </CookiesProvider>
    </Router>
  );
}

export default App;
