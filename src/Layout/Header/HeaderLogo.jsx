import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import clsx from "clsx";

const HeaderLogo = ({ title }) => {
  return (
    <div
      className={clsx(
        "w-full min-h-[80px] fixed top-0 left-0 right-0 bg-primary z-10 shadow-md transition-transform duration-300 ease-in-out"
      )}
    >
      <div className="lg:max-w-[1200px] container mx-auto flex justify-between items-center h-full px-2">
        <div className="flex items-center justify-between w-full h-[80px] flex-wrap">
          <div className="flex items-center gap-3">
            <Link to={"/"}>
              <img
                src={logo}
                className="w-[100px] h-[60px] md:w-[150px] md:h-[80px] lg:block"
              />
            </Link>
            <h1 className="text-white font-semibold text-xl">{title}</h1>
          </div>
          <Link
            to={"/help-center"}
            className=" text-white text-md group -mt-[4px] relative"
          >
            Bạn cần trợ giúp?
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderLogo;
