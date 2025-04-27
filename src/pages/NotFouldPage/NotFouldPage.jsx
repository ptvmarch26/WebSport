import { useNavigate } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";
import { FaFlag } from "react-icons/fa6";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-8">
      <div>
        <FaFlag className="w-20 h-20 mx-auto" />
        <Typography
          variant="h1"
          color="blue-gray"
          className="mt-10 !text-3xl !leading-snug md:!text-4xl"
        >
          Error 404 <br /> Trang bạn tìm kiếm không tồn tại.
        </Typography>
        <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
          Vui lòng thử làm mới trang hoặc quay lại sau.
        </Typography>
        <Button
          color="gray"
          className="w-full px-4 !bg-black"
          onClick={() => navigate(-1)}
        >
          Quay lại trang trước đó
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
