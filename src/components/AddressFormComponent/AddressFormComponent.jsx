import { useEffect, useState } from "react";
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
    name: "Họ và tên",
    phone: "Số điện thoại",
    home_address: "Địa chỉ",
    province: "Tỉnh/Thành phố",
    district: "Quận/Huyện",
    ward: "Phường/Xã",
    is_default: "false",
  };

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    apiGetProvinces()
      .then((res) => setProvinces(res))
      .catch(() => {});
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
      (province) => province.name === provinceName
    );
    const provinceId = selectedProvince ? selectedProvince.code : "";

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
      setDistricts(res);
    } catch {
      return;
    }
  };

  const handleDistrictChange = async (e) => {
    const districtName = e.target.value;
    const selectedDistrict = districts.find(
      (district) => district.name === districtName
    );
    const districtId = selectedDistrict ? selectedDistrict.code : "";

    setNewAddress({
      ...newAddress,
      district: districtName,
      ward: "",
    });

    setWards([]);

    try {
      const res = await apiGetWards(districtId);
      setWards(res);
    } catch {
      return;
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <div className="md:flex md:gap-2 w-full">
          <div className="relative w-full mb-3">
            <input
              id="name"
              type="text"
              value={newAddress.name}
              onChange={(e) =>
                setNewAddress({ ...newAddress, name: e.target.value })
              }
              onBlur={() => handleBlur("name")}
              className={`peer w-full p-2 border rounded focus:ring-black placeholder-transparent ${
                formErrors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Họ và tên"
              required
            />
            <label
              htmlFor="name"
              className="absolute !text-sm bg-white px-1 left-2.5 top-2.5 text-black transition-all transform origin-left peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:-top-2.5 peer-focus:left-2.5 peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:left-2.5 peer-focus:text-xs peer-focus:text-black peer-focus:scale-90 cursor-text peer-not-placeholder-shown:opacity-0"
            >
              Họ và tên
            </label>
            {formErrors.name && (
              <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
            )}
          </div>
        </div>
      </div>

      {/* Phone Number */}
      <div className="relative w-full mb-3">
        <input
          id="phone"
          type="tel"
          value={newAddress.phone}
          onChange={(e) =>
            setNewAddress({ ...newAddress, phone: e.target.value })
          }
          onBlur={() => handleBlur("phone")}
          className={`peer w-full p-2 border rounded focus:ring-black placeholder-transparent ${
            formErrors.phone ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Số điện thoại"
        />
        <label
          htmlFor="phone"
          className="absolute !text-sm bg-white px-1 left-2.5 top-2.5 text-black transition-all transform origin-left peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:-top-2.5 peer-focus:left-2.5 peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:left-2.5 peer-focus:text-xs peer-focus:text-black peer-focus:scale-90 cursor-text peer-not-placeholder-shown:opacity-0"
        >
          Số điện thoại
        </label>
        {formErrors.phone && (
          <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
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
            {provinces?.map((province) => (
              <option key={province.code} value={province.name}>
                {province.name}
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
            {districts?.map((district) => (
              <option key={district.code} value={district.name}>
                {district.name}
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
            {wards?.map((ward) => (
              <option key={ward.code} value={ward.name}>
                {ward.name}
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
          id="home_address"
          type="text"
          value={newAddress.home_address}
          onChange={(e) =>
            setNewAddress({ ...newAddress, home_address: e.target.value })
          }
          onBlur={() => handleBlur("home_address")}
          className={`peer w-full p-2 border rounded focus:ring-black placeholder-transparent ${
            formErrors.home_address ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Địa chỉ cụ thể"
        />
        <label
          htmlFor="home_address"
          className="absolute !text-sm bg-white px-1 left-2.5 top-2.5 text-black transition-all transform origin-left peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:-top-2.5 peer-focus:left-2.5 peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:left-2.5 peer-focus:text-xs peer-focus:text-black peer-focus:scale-90 cursor-text peer-not-placeholder-shown:opacity-0"
        >
          Địa chỉ cụ thể
        </label>
        {formErrors.home_address && (
          <p className="text-red-500 text-xs mt-1">{formErrors.home_address}</p>
        )}
      </div>
    </div>
  );
}

export default AddressFormComponent;
