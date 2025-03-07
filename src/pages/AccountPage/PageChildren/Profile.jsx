import React, { useState, useEffect } from "react";
import { apiGetProvinces, apiGetDistricts, apiGetWards } from "../../../services/api/AddressApi";

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
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsChanged(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4">Hồ sơ tài khoản</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <label className="text-gray-600 font-medium">Tên người dùng</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-gray-600 font-medium">Họ và tên</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-gray-600 font-medium">Ngày sinh</label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-gray-600 font-medium">Giới tính</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:border-blue-500"
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>

        {/* Địa chỉ */}
        <div className="md:col-span-2">
          <label className="text-gray-600 font-medium">Địa chỉ</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              name="province"
              value={formData.province}
              onChange={handleProvinceChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:border-blue-500"
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
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:border-blue-500"
              disabled={!formData.province}
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
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:border-blue-500"
              disabled={!formData.district}
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
          <label className="text-gray-600 font-medium">Phường, Số nhà, Địa chỉ cụ thể</label>
          <textarea
            name="specificAddress"
            value={formData.specificAddress}
            onChange={handleChange}
            placeholder="Nhập số nhà, đường, tổ dân phố..."
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Nút lưu và hủy */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleSave}
          disabled={!isChanged}
          className={`px-4 py-2 rounded-lg text-white transition ${
            isChanged ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Lưu
        </button>

        {isChanged && (
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Hủy thay đổi
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
