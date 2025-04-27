import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useUser } from "../../../context/UserContext";
import avt_false from "../../../assets/images/avatar-false.jpg";
import { useLoading } from "../../../context/LoadingContext";

const Profile = () => {
  const { selectedUser, fetchUser, handleUpdateUser } = useUser();
  const [avatarFile, setAvatarFile] = useState(null);
  const { setLoading } = useLoading();

  const [formData, setFormData] = useState({
    user_name: selectedUser?.user_name || "Chưa cập nhật",
    full_name: selectedUser?.full_name,
    birth: selectedUser?.birth || "",
    gender: selectedUser?.gender,
    avt_img: selectedUser?.avt_img || avt_false,
  });

  // Cập nhật formData khi selectedUser thay đổi
  useEffect(() => {
    if (selectedUser) {
      setFormData({
        user_name: selectedUser.user_name || "Chưa cập nhật",
        full_name: selectedUser.full_name,
        birth: selectedUser.birth || "",
        gender: selectedUser.gender || "",
        avt_img: selectedUser.avt_img || avt_false,
      });
    }
  }, [selectedUser]);

  const [originalData, setOriginalData] = useState({ ...formData });
  const [isChanged, setIsChanged] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const updatedData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedData);
    setIsChanged(JSON.stringify(updatedData) !== JSON.stringify(originalData));
  };

  const handleSave = async () => {
    setLoading(true, "Đang đổi thông tin");
    const form = new FormData();
    form.append("user_name", formData.user_name);
    form.append("full_name", formData.full_name);
    form.append("birth", formData.birth);
    form.append("gender", formData.gender);

    if (avatarFile) {
      form.append("avatar", avatarFile); // <- tên phải trùng với `multer` backend
    }

    const res = await handleUpdateUser(form);
    if (res?.EC === 0) {
      fetchUser();
      setOriginalData(formData);
      setIsChanged(false);
      setIsEditing(false);
    } else {
      return;
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedUser) {
      const updatedForm = {
        user_name: selectedUser.user_name || "Chưa cập nhật",
        full_name: selectedUser.full_name,
        birth: selectedUser.birth || "",
        gender: selectedUser.gender || "",
        avt_img: selectedUser.avt_img || avt_false,
      };
      setOriginalData(updatedForm);
    }
  }, [selectedUser]);

  const handleCancel = () => {
    setFormData(originalData);
    setIsChanged(false);
    setIsEditing(false); // Tắt chế độ chỉnh sửa
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file); // <- lưu file thật để upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avt_img: reader.result }); // preview thôi
        setIsChanged(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="lg:px-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Hồ sơ tài khoản</h1>
        {!isEditing && (
          <div>
            <Button onClick={handleEdit}>Sửa thông tin</Button>
          </div>
        )}
      </div>
      <div className="w-full flex flex-col items-center gap-y-2 mb-4">
        <img
          className="w-20 h-20 rounded-full object-cover shadow-md cursor-pointer"
          src={formData.avt_img}
          alt="avatar"
          onClick={() => {
            handleEdit();
            document.getElementById("avatar-input").click();
          }}
        />
        <h2 className="block lg:hidden text-lg font-semibold text-gray-800">
          {selectedUser?.full_name || "Chưa cập nhật"}
        </h2>
        <p className="block lg:hidden text-gray-500 text-sm">
          {selectedUser?.user_name || "Chưa cập nhật"}
        </p>
        <input
          type="file"
          id="avatar-input"
          className="hidden"
          accept="image/*"
          onChange={handleAvatarChange}
        />
        <label
          htmlFor="avt_img"
          className="hidden lg:block antialiased font-sans text-sm leading-normal text-inherit mb-2 font-medium text-gray-900"
        >
          Ảnh đại diện
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <label
            htmlFor="user_name"
            className="block antialiased font-sans text-sm leading-normal text-inherit mb-2 font-medium text-gray-900"
          >
            Tên người dùng
          </label>
          <input
            id="user_name"
            type="text"
            name="user_name"
            value={formData.user_name || ""}
            className={
              "peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 cursor-not-allowed"
            }
            disabled
          />
        </div>

        <div>
          <label
            htmlFor="full_name"
            className="block antialiased font-sans text-sm leading-normal text-inherit mb-2 font-medium text-gray-900"
          >
            Họ và tên
          </label>
          <input
            id="full_name"
            type="text"
            name="full_name"
            value={formData.full_name || ""}
            onChange={handleChange}
            className={`peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 ${
              !isEditing ? "cursor-not-allowed" : ""
            }`}
            placeholder={"Nhập họ và tên"}
            disabled={!isEditing} // Chỉ cho phép chỉnh sửa khi isEditing = true
          />
        </div>

        <div>
          <label
            htmlFor="birth"
            className="block antialiased font-sans text-sm leading-normal text-inherit mb-2 font-medium text-gray-900"
          >
            Ngày sinh
          </label>
          <input
            id="birth"
            type="date"
            name="birth"
            value={formData.birth ? formData.birth.split("T")[0] : ""}
            onChange={handleChange}
            className={`peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 ${
              !isEditing ? "cursor-not-allowed" : ""
            }`}
            disabled={!isEditing} // Chỉ cho phép chỉnh sửa khi isEditing = true
          />
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block antialiased font-sans text-sm leading-normal text-inherit mb-2 font-medium text-gray-900"
          >
            Giới tính
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
            className={`peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 ${
              !isEditing ? "cursor-not-allowed" : ""
            }`}
            disabled={!isEditing} // Chỉ cho phép chỉnh sửa khi isEditing = true
          >
            <option value="Nam" className="text-gray-700">
              Nam
            </option>
            <option value="Nữ" className="text-gray-700">
              Nữ
            </option>
            <option value="Khác" className="text-gray-700">
              Khác
            </option>
          </select>
        </div>
      </div>

      {/* Nút lưu và hủy */}
      {isEditing && (
        <div className="flex gap-4 mt-6">
          <Button onClick={handleSave} disabled={!isChanged}>
            Lưu thay đổi
          </Button>

          <Button color="red" onClick={handleCancel}>
            Hủy
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
