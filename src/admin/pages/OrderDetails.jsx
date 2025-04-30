import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOrder } from "../../context/OrderContext";
import { Table, Tag } from "antd";
import { getPaymentInfoByOrderCode } from "../../services/api/PaymentApi";

const statusColors = {
  "Chờ xác nhận": "orange",
  "Đang chuẩn bị hàng": "teal",
  "Đang giao": "blue",
  "Yêu cầu hoàn": "pink",
  "Hoàn thành": "green",
  "Hoàn hàng": "purple",
  "Hủy hàng": "red",
};

const OrderDetails = () => {
  const { id } = useParams();
  const { orderDetails, fetchOrderDetail } = useOrder();
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const order = await fetchOrderDetail(id);
      if (order.order_payment_method === "Paypal" && order.is_paid) {
        const res = await getPaymentInfoByOrderCode(order.order_code);
        if (res.EC === 0 && res.result.transactions) {
          setPaymentInfo(res.result);
        }
      }
    };
    fetchData();
  }, [id]);

  if (!orderDetails) {
    return (
      <p className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen text-gray-500">
        Loading...
      </p>
    );
  }

  const {
    createdAt,
    order_status,
    order_total_price,
    order_total_final,
    delivery_fee,
    order_payment_method,
    order_total_discount,
    order_note,
    estimated_delivery_date,
    products,
    received_date,
    shipping_address,
    is_feedback,
  } = orderDetails;

  const formattedProducts = products.map((product) => {
    const colorData = product.product_id.colors.find(
      (color) => color.color_name === product.color
    );

    const variantData = colorData?.variants.find(
      (variant) => variant.variant_size === product.variant
    );

    return {
      product_id: product.product_id._id,
      product_name: product.product_id.product_title,
      product_img: colorData?.imgs?.img_main || product.product_id.product_img,
      product_price: variantData.variant_price,
      quantity: product.quantity,
      variant: `${product.color} - ${product.variant}`,
    };
  });

  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "product_id",
      key: "product_id",
      align: "left",
      render: (id) => <span className="inline-block max-w-[100px]">{id}</span>,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      key: "product_name",
      align: "left",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.product_img}
            alt={record.product_name}
            className="w-12 h-12 object-contain rounded"
          />
          <span className="line-clamp-2">{record.product_name}</span>
        </div>
      ),
    },
    {
      title: "Biến thể",
      dataIndex: "variant",
      key: "variant",
      align: "left",
    },
    {
      title: "Giá (đ)",
      dataIndex: "product_price",
      key: "product_price",
      align: "left",
      render: (price) => `${price.toLocaleString()}`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "left",
    },
    {
      title: "Thành tiền (đ)",
      key: "total",
      align: "left",
      render: (_, record) =>
        `${(record.product_price * record.quantity).toLocaleString()}`,
    },
  ];

  console.log("paymentInfo", paymentInfo)

  return (
    <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen bg-gray-100">
      <div className="bg-white flex flex-col sm:flex-row gap-5 justify-between sm:items-center p-6 shadow-lg rounded-lg mt-4">
        <p>
          <strong>Ngày mua hàng:</strong> {new Date(createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Thanh toán:</strong> {order_payment_method.toUpperCase()}
        </p>
        <p>
          <strong>Trạng thái:</strong>{" "}
          <Tag className="py-1 px-2" color={statusColors[order_status]}>
            {order_status}
          </Tag>
        </p>
      </div>
      <div className="bg-white p-6 shadow-lg rounded-lg mt-4 space-y-5">
        <h3 className="font-semibold">Thông tin đơn hàng</h3>
        <div className="space-y-3 px-3 py-5 border rounded">
          <p>
            <strong>Họ tên:</strong> {shipping_address.name}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {shipping_address.phone}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {shipping_address.home_address},{" "}
            {shipping_address.ward}, {shipping_address.district},{" "}
            {shipping_address.province}
          </p>
          <p>
            <strong>Ghi chú:</strong> {order_note}
          </p>
          <p>
            <strong>Ngày giao dự kiến:</strong>{" "}
            {new Date(estimated_delivery_date).toLocaleString()}
          </p>
          <p>
            <strong>Đã nhận hàng:</strong>{" "}
            {new Date(received_date).toLocaleString()}
          </p>
        </div>
        {paymentInfo?.transactions.length > 0 && (
          <div>
            <h3 className="font-semibold">Thông tin thanh toán</h3>
            <div className="space-y-3 px-3 py-5 border rounded">
              <p>
                <strong>Tên:</strong>{" "}
                {paymentInfo.transactions[0]?.counterAccountName}
              </p>
              <p>
                <strong>Số tài khoản:</strong>{" "}
                {paymentInfo.transactions[0]?.counterAccountNumber}
              </p>
              <p>
                <strong>ID Ngân hàng:</strong>{" "}
                {paymentInfo.transactions[0]?.counterAccountBankId ??
                  "Không xác định"}
              </p>
              <p>
                <strong>Nội dung:</strong>{" "}
                {paymentInfo.transactions[0]?.description}
              </p>
              <p>
                <strong>Thời gian giao dịch:</strong>{" "}
                {new Date(
                  paymentInfo.transactions[0]?.transactionDateTime
                ).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-4 shadow-lg rounded-lg mt-4 space-y-5 overflow-x-auto">
        <h3 className="font-semibold">Sản phẩm</h3>
        <Table
          dataSource={formattedProducts}
          rowKey="_id"
          columns={columns}
          pagination={false}
          bordered
          scroll={{ x: "max-content" }}
          className="rounded-lg [&_.ant-table-thead_tr_th]:bg-[#e9eff5] [&_.ant-table-thead_tr_th]:text-black [&_.ant-table-thead_tr_th]:font-bold"
        />
      </div>

      <div className="bg-white p-6 shadow-lg rounded-lg mt-4 space-y-5">
        <h3 className="font-semibold">Thanh toán</h3>
        <div className="space-y-3 px-3 py-5 border rounded">
          <div className="flex justify-between">
            <strong>Tổng tiền hàng:</strong>
            <span>{order_total_price.toLocaleString()} đ</span>
          </div>
          <div className="flex justify-between">
            <strong>Phí giao hàng:</strong>
            <span>{delivery_fee.toLocaleString()} đ</span>
          </div>
          <div className="flex justify-between">
            <strong>Giảm giá:</strong>
            <span>{order_total_discount} %</span>
          </div>
          <div className="flex justify-between text-[#1890ff] font-semibold">
            <strong>Tổng tiền phải thanh toán:</strong>
            <span>{order_total_final.toLocaleString()} đ</span>
          </div>
        </div>
      </div>

      {is_feedback && (
        <div className="bg-white p-6 shadow-lg rounded-lg mt-4 space-y-5">
          <h3 className="font-semibold">Đánh giá sản phẩm</h3>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
