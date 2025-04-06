import QRCode from "react-qr-code";

const QRComponent = ({ amount, orderId }) => {
  const paymentUrl = `https://payment-system.com/pay?amount=${amount}&currency=VND&order_id=${orderId}`;
  return <QRCode value={paymentUrl} size={256} />;
};

export default QRComponent;
