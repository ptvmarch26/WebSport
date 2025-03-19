import React, { useState, useEffect } from "react";
import {
  apiGetProvinces,
  apiGetDistricts,
  apiGetWards,
} from "../../../services/api/AddressApi";
import { Button } from "@material-tailwind/react";

const Profile = () => {
  const [formData, setFormData] = useState({
    username: "Chưa cập nhật",
    fullname: "Chưa cập nhật",
    birthdate: "",
    gender: "other",
    province: "",
    district: "",
    ward: "",
    specificAddress: "",
  });

  const [originalData, setOriginalData] = useState({ ...formData });
  const [isChanged, setIsChanged] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Để kiểm soát chế độ chỉnh sửa

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    apiGetProvinces().then((data) => setProvinces(data.results));
  }, []);

  const handleChange = (e) => {
    const updatedData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedData);
    setIsChanged(JSON.stringify(updatedData) !== JSON.stringify(originalData));
  };

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setFormData({ ...formData, province: provinceId, district: "", ward: "" });
    setDistricts([]);
    setWards([]);
    setIsChanged(true);

    if (provinceId) {
      apiGetDistricts(provinceId).then((data) => setDistricts(data.results));
    }
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setFormData({ ...formData, district: districtId, ward: "" });
    setWards([]);
    setIsChanged(true);

    if (districtId) {
      apiGetWards(districtId).then((data) => setWards(data.results));
    }
  };

  const handleSave = () => {
    console.log("Dữ liệu đã lưu:", formData);
    setOriginalData(formData);
    setIsChanged(false);
    setIsEditing(false); // Tắt chế độ chỉnh sửa
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsChanged(false);
    setIsEditing(false); // Tắt chế độ chỉnh sửa
  };

  const handleEdit = () => {
    setIsEditing(true); // Bật chế độ chỉnh sửa
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <label
            htmlFor="username"
            className="block antialiased font-sans text-sm leading-normal text-inherit mb-2 font-medium text-gray-900"
          >
            Tên người dùng
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 ${
              !isEditing ? "cursor-not-allowed" : ""
            }`}
            placeholder="Nhập tên người dùng"
            disabled={!isEditing} // Chỉ cho phép chỉnh sửa khi isEditing = true
          />
        </div>

        <div>
          <label
            htmlFor="fullname"
            className="block antialiased font-sans text-sm leading-normal text-inherit mb-2 font-medium text-gray-900"
          >
            Họ và tên
          </label>
          <input
            id="fullname"
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className={`peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 ${
              !isEditing ? "cursor-not-allowed" : ""
            }`}
            placeholder="Nhập họ và tên"
            disabled={!isEditing} // Chỉ cho phép chỉnh sửa khi isEditing = true
          />
        </div>

        <div>
          <label
            htmlFor="birthdate"
            className="block antialiased font-sans text-sm leading-normal text-inherit mb-2 font-medium text-gray-900"
          >
            Ngày sinh
          </label>
          <input
            id="birthdate"
            type="date"
            name="birthdate"
            value={formData.birthdate}
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
            value={formData.gender}
            onChange={handleChange}
            className={`peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 ${
              !isEditing ? "cursor-not-allowed" : ""
            }`}
            disabled={!isEditing} // Chỉ cho phép chỉnh sửa khi isEditing = true
          >
            <option value="male" className="text-gray-700">
              Nam
            </option>
            <option value="female" className="text-gray-700">
              Nữ
            </option>
            <option value="other" className="text-gray-700">
              Khác
            </option>
          </select>
        </div>

        {/* Địa chỉ */}
        <div className="md:col-span-2">
          <label className="block antialiased font-sans text-sm leading-normal text-inherit mb-2 font-medium text-gray-900">
            Địa chỉ
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              name="province"
              value={formData.province}
              onChange={handleProvinceChange}
              className={`peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 ${
                !isEditing ? "cursor-not-allowed" : ""
              }`}
              disabled={!isEditing} // Chỉ cho phép chỉnh sửa khi isEditing = true
            >
              <option value="">Chọn Tỉnh/Thành phố</option>
              {provinces.map((prov) => (
                <option key={prov.province_id} value={prov.province_id}>
                  {prov.province_name}
                </option>
              ))}
            </select>

            <select
              name="district"
              value={formData.district}
              onChange={handleDistrictChange}
              className={`peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 ${
                !isEditing || !formData.province ? "cursor-not-allowed" : ""
              }`}
              disabled={!formData.province || !isEditing} // Chỉ cho phép chỉnh sửa khi isEditing = true và có tỉnh
            >
              <option value="">Chọn Quận/Huyện</option>
              {districts.map((dist) => (
                <option key={dist.district_id} value={dist.district_id}>
                  {dist.district_name}
                </option>
              ))}
            </select>

            <select
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              className={`peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 ${
                !isEditing || !formData.district ? "cursor-not-allowed" : ""
              }`}
              disabled={!formData.district || !isEditing} // Chỉ cho phép chỉnh sửa khi isEditing = true và có quận
            >
              <option value="">Chọn Phường/Xã</option>
              {wards.map((ward) => (
                <option key={ward.ward_id} value={ward.ward_id}>
                  {ward.ward_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Phường, Số nhà, Địa chỉ cụ thể */}
        <div className="md:col-span-2">
          <label
            htmlFor="detailAddress"
            className="block antialiased font-sans text-sm leading-normal text-inherit mb-2 font-medium text-gray-900"
          >
            Địa chỉ cụ thể
          </label>
          <textarea
            id="detailAddress"
            name="specificAddress"
            value={formData.specificAddress}
            onChange={handleChange}
            placeholder="Nhập số nhà, đường, tổ dân phố..."
            className={`peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 ${
              !isEditing ? "cursor-not-allowed" : ""
            }`}
            disabled={!isEditing} // Chỉ cho phép chỉnh sửa khi isEditing = true
          />
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
