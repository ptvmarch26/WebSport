import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AccountInfoComponent from "../../components/AccountInfoComponent/AccountInfoComponent";
import { accountRoutes } from "../../routes/route";

const AccountPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath =
      location.pathname.split("/account/")[1] || "/account/profile";
    const isValidPath = accountRoutes.some(
      (route) => route.path === `/${currentPath}`
    );

    if (!isValidPath) {
      navigate("/account/profile", { replace: true });
    }
  }, [location, navigate]);

  
  return (
    <div className="xl:max-w-[1200px] container mx-auto py-10 px-2">
      <div className="lg:flex justify-between">
        <div className="pb-10 lg:pb-0">
          <AccountInfoComponent />
        </div>

        <div className="flex-1">
          <Routes>
            {accountRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
