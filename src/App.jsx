import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, adminRoutes, privateRoutes } from "./routes/route";
import DefaultLayout from "./Layout/DefaultLayout/DefaultLayout";
import { Fragment } from "react";
import "./index.css";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  const { token } = useAuth();
  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/sign-in" replace />;
  };
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {publicRoutes.map((route, index) => {
          const Layout = route.Layout === null ? Fragment : DefaultLayout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                Layout ? (
                  <Layout>
                    <Page />
                  </Layout>
                ) : (
                  <Page />
                )
              }
            />
          );
        })}

        {/* Admin routes */}
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />
        {adminRoutes.map((route, index) => {
          const Layout = route.Layout || Fragment;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}

        {/* Private Routes (if logged in) */}
        {privateRoutes.map((route, index) => {
          const Layout = route.Layout === null ? Fragment : DefaultLayout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute>
                  {Layout ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <Page />
                  )}
                </ProtectedRoute>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
