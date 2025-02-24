import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, adminRoutes} from "./routes/route";
import DefaultLayout from "./Layout/DefaultLayout/DefaultLayout";
import { Fragment } from "react";
import './index.css'
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
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
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
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
      </Routes>
    </Router>
  );
}

export default App;
