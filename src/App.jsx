import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/route";
import DefaultLayout from "./Layout/DefaultLayout/DefaultLayout";
import { Fragment } from "react";
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Layout = route.layout === null ? Fragment : DefaultLayout;
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
            />);
        })}
      </Routes>
    </Router>
  );
}

export default App;
