import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import HeaderLogo from "../Header/HeaderLogo";
import ScrollToTopComponent from "../../components/ScrollToTopComponent/ScrollToTopComponent";
import BottomMenuComponent from "../../components/BottomMenuComponent/BottomMenuComponent";
import AIChatButton from "../../components/AIChatButton/AIChatButton";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DefaultLayout = ({ children }) => {
  const location = useLocation();
  const authPages = {
    "/sign-in": "Đăng nhập",
    "/sign-up": "Đăng ký",
    "/forgot-password": "Quên mật khẩu",
  };
  const { token } = useAuth();

  return (
    <div>
      {authPages[location.pathname] ? (
        <HeaderLogo title={authPages[location.pathname]} />
      ) : (
        <Header />
      )}
      <div className="mt-[100px]">{children}</div>
      {token && <BottomMenuComponent />}
      {authPages[location.pathname] || <AIChatButton />}
      <ScrollToTopComponent />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
