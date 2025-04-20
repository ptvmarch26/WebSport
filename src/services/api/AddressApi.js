import axios from "axios";

// Lấy danh sách tỉnh/thành phố
export const apiGetProvinces = () =>
  axios.get("https://provinces.open-api.vn/api/p/").then((res) => res.data);

// Lấy danh sách quận/huyện theo tỉnh/thành phố
export const apiGetDistricts = (provinceCode) =>
  axios
    .get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
    .then((res) => res.data.districts);

// Lấy danh sách phường/xã theo quận/huyện
export const apiGetWards = (districtCode) =>
  axios
    .get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
    .then((res) => res.data.wards);
