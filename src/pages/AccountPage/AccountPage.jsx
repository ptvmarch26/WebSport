import { Routes, Route } from "react-router-dom";
import AccountInfoComponent from "../../components/AccountInfoComponent/AccountInfoComponent";
import { accountRoutes } from "../../routes/route";

const AccountPage = () => {
  return (
    <div className="flex min-h-screen">
      
      <div className="w-1/4 p-4 bg-white shadow-md">
        <AccountInfoComponent 
          full_name="Dương Anh Vũ"
          user_name="rain494"
          src_img=""
        />
      </div>

      <div className="w-3/4 p-6">
        <Routes>
          {accountRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.component />} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default AccountPage;
