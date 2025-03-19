import React, { useEffect, useState } from "react";
import {
  apiGetProvinces,
  apiGetDistricts,
  apiGetWards,
} from "../../services/api/AddressApi";

function AddressFormComponent({
  newAddress,
  setNewAddress,
  formErrors,
  setFormErrors,
}) {
  const fieldNames = {
    firstName: "Họ",
    lastName: "Tên",
    streetAddress: "Địa chỉ",
    province: "Tỉnh/Thành phố",
    district: "Quận/Huyện",
    ward: "Phường/Xã",
    phoneNumber: "Số điện thoại",
  };

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    apiGetProvinces()
      .then((res) => setProvinces(res.results))
      .catch((err) => console.error("Error fetching provinces:", err));
  }, []);

  const handleBlur = (field) => {
    if (!newAddress[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: `Bạn chưa nhập ${fieldNames[field]}`,
      }));
    } else {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleProvinceChange = async (e) => {
    const provinceName = e.target.value;
    const selectedProvince = provinces.find(
      (province) => province.province_name === provinceName
    );
    const provinceId = selectedProvince ? selectedProvince.province_id : "";

    setNewAddress({
      ...newAddress,
      province: provinceName,
      district: "",
      ward: "",
    });

    setDistricts([]);
    setWards([]);

    try {
      const res = await apiGetDistricts(provinceId);
      setDistricts(res.results);
    } catch (err) {
      console.error("Error fetching districts:", err);
    }
  };

  const handleDistrictChange = async (e) => {
    const districtName = e.target.value;
    const selectedDistrict = districts.find(
      (district) => district.district_name === districtName
    );
    const districtId = selectedDistrict ? selectedDistrict.district_id : "";

    setNewAddress({
      ...newAddress,
      district: districtName,
      ward: "",
    });

    setWards([]);

    try {
      const res = await apiGetWards(districtId);
      setWards(res.results);
    } catch (err) {
      console.error("Error fetching wards:", err);
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        {/* First Name */}
        <div className="md:flex md:gap-2 w-full">
          <div className="relative w-full mb-3">
            <input
              id="firstName"
              type="text"
              value={newAddress.firstName}
              onChange={(e) =>
                setNewAddress({ ...newAddress, firstName: e.target.value })
              }
              onBlur={() => handleBlur("firstName")}
              className={`peer w-full p-2 border rounded focus:ring-black placeholder-transparent ${
                formErrors.firstName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Họ"
              required
            />
            <label
              htmlFor="firstName"
              className="absolute !text-sm bg-white px-1 left-2.5 top-2.5 text-black transition-all transform origin-left peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:-top-2.5 peer-focus:left-2.5 peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:left-2.5 peer-focus:text-xs peer-focus:text-black peer-focus:scale-90 cursor-text peer-not-placeholder-shown:opacity-0"
            >
              Họ
            </label>
            {formErrors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {formErrors.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="relative w-full mb-3">
            <input
              id="lastName"
              type="text"
              value={newAddress.lastName}
              onChange={(e) =>
                setNewAddress({ ...newAddress, lastName: e.target.value })
              }
              onBlur={() => handleBlur("lastName")}
              className={`peer w-full p-2 border rounded focus:ring-black placeholder-transparent ${
                formErrors.lastName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Tên"
              required
            />
            <label
              htmlFor="lastName"
              className="absolute !text-sm bg-white px-1 left-2.5 top-2.5 text-black transition-all transform origin-left peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:-top-2.5 peer-focus:left-2.5 peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:left-2.5 peer-focus:text-xs peer-focus:text-black peer-focus:scale-90 cursor-text peer-not-placeholder-shown:opacity-0"
            >
              Tên
            </label>
            {formErrors.lastName && (
              <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
            )}
          </div>
        </div>
      </div>

      {/* Phone Number */}
      <div className="relative w-full mb-3">
        <input
          id="phoneNumber"
          type="tel"
          value={newAddress.phoneNumber}
          onChange={(e) =>
            setNewAddress({ ...newAddress, phoneNumber: e.target.value })
          }
          onBlur={() => handleBlur("phoneNumber")}
          className={`peer w-full p-2 border rounded focus:ring-black placeholder-transparent ${
            formErrors.phoneNumber ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Số điện thoại"
        />
        <label
          htmlFor="phoneNumber"
          className="absolute !text-sm bg-white px-1 left-2.5 top-2.5 text-black transition-all transform origin-left peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:-top-2.5 peer-focus:left-2.5 peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:left-2.5 peer-focus:text-xs peer-focus:text-black peer-focus:scale-90 cursor-text peer-not-placeholder-shown:opacity-0"
        >
          Số điện thoại
        </label>
        {formErrors.phoneNumber && (
          <p className="text-red-500 text-xs mt-1">{formErrors.phoneNumber}</p>
        )}
      </div>

      {/* Province/District/Ward */}
      <div className="flex flex-wrap lg:flex-nowrap gap-0 lg:gap-2">
        {/* Province */}
        <div className="relative w-full mb-3">
          <select
            id="province"
            value={newAddress.province || ""}
            onChange={handleProvinceChange}
            onBlur={() => handleBlur("province")}
            className={`peer w-full p-2 border text-sm rounded focus:ring-black bg-white disabled:opacity-50 ${
              formErrors.province ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Tỉnh/Thành phố</option>
            {provinces.map((province) => (
              <option key={province.province_id} value={province.province_name}>
                {province.province_name}
              </option>
            ))}
          </select>
          {formErrors.province && (
            <p className="text-red-500 text-xs mt-1">{formErrors.province}</p>
          )}
        </div>

        {/* District */}
        <div className="relative w-full mb-3">
          <select
            id="district"
            value={newAddress.district || ""}
            onChange={handleDistrictChange}
            disabled={!newAddress.province}
            onBlur={() => handleBlur("district")}
            className={`peer w-full p-2 border text-sm rounded focus:ring-black bg-white disabled:opacity-50 ${
              formErrors.district ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Quận/Huyện</option>
            {districts.map((district) => (
              <option key={district.district_id} value={district.district_name}>
                {district.district_name}
              </option>
            ))}
          </select>
          {formErrors.district && (
            <p className="text-red-500 text-xs mt-1">{formErrors.district}</p>
          )}
        </div>

        {/* Ward */}
        <div className="relative w-full mb-3">
          <select
            id="ward"
            value={newAddress.ward || ""}
            onChange={(e) =>
              setNewAddress({ ...newAddress, ward: e.target.value })
            }
            disabled={!newAddress.district}
            onBlur={() => handleBlur("ward")}
            className={`peer w-full p-2 border text-sm rounded focus:ring-black bg-white disabled:opacity-50 ${
              formErrors.ward ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Phường/Xã</option>
            {wards.map((ward) => (
              <option key={ward.ward_id} value={ward.ward_name}>
                {ward.ward_name}
              </option>
            ))}
          </select>
          {formErrors.ward && (
            <p className="text-red-500 text-xs mt-1">{formErrors.ward}</p>
          )}
        </div>
      </div>

      {/* Street Address */}
      <div className="relative w-full mb-3">
        <input
          id="streetAddress"
          type="text"
          value={newAddress.streetAddress}
          onChange={(e) =>
            setNewAddress({ ...newAddress, streetAddress: e.target.value })
          }
          onBlur={() => handleBlur("streetAddress")}
          className={`peer w-full p-2 border rounded focus:ring-black placeholder-transparent ${
            formErrors.streetAddress ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Địa chỉ cụ thể"
        />
        <label
          htmlFor="streetAddress"
          className="absolute !text-sm bg-white px-1 left-2.5 top-2.5 text-black transition-all transform origin-left peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:-top-2.5 peer-focus:left-2.5 peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:left-2.5 peer-focus:text-xs peer-focus:text-black peer-focus:scale-90 cursor-text peer-not-placeholder-shown:opacity-0"
        >
          Địa chỉ cụ thể
        </label>
        {formErrors.streetAddress && (
          <p className="text-red-500 text-xs mt-1">
            {formErrors.streetAddress}
          </p>
        )}
      </div>
    </div>
  );
}

export default AddressFormComponent;
