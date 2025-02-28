import axios from "axios";

// Lấy danh sách tỉnh/thành phố
export const apiGetProvinces = () =>
  axios
    .get("https://vapi.vnappmob.com/api/v2/province/")
    .then((res) => res.data);

// Lấy danh sách quận/huyện theo tỉnh/thành phố
export const apiGetDistricts = (provinceId) =>
  axios
    .get(`https://vapi.vnappmob.com/api/v2/province/district/${provinceId}`)
    .then((res) => res.data);

// Lấy danh sách phường/xã theo quận/huyện
export const apiGetWards = (districtId) =>
  axios
    .get(`https://vapi.vnappmob.com/api/v2/province/ward/${districtId}`)
    .then((res) => res.data);
