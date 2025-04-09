import axios from "axios";

const getToken = () => localStorage.getItem("accessToken");

export const createPaymentLink = async (amount, description) => {
  try {
    const res = await axios.post( "http://localhost:5000/payment/create",
        {
          amount,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`, // Thêm vào header
          },
        });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
