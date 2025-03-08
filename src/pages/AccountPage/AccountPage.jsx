import { Routes, Route } from "react-router-dom";
import AccountInfoComponent from "../../components/AccountInfoComponent/AccountInfoComponent";
import { accountRoutes } from "../../routes/route";

const AccountPage = () => {
  return (
    <div className="res py-10">
    <div className="flex justify-between">
      <div className="">
        <AccountInfoComponent
          full_name="Dương Anh Vũ"
          user_name="rain494"
          // src_img=""
        />
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
