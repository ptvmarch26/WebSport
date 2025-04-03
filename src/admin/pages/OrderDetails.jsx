import { useLocation, useNavigate } from "react-router-dom";
import { Table, Button, Tag } from "antd";

const statusColors = {
  "Chờ xác nhận": "orange",
  "Đang giao": "blue",
  "Hoàn thành": "green",
  "Hủy hàng": "red",
  "Hoàn hàng": "purple",
};

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  const columns = [
    { title: "Mã sản phẩm", dataIndex: "id", key: "id" },
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (value) => `${value.toLocaleString()}đ`,
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (value) => `${value.toLocaleString()}đ`,
    },
  ];

  const productsData = order.products.map((name, index) => ({
    id: `SP00${index + 1}`,
    name,
    quantity: Math.floor(Math.random() * 3) + 1,
    price: order.total / order.products.length,
    total:
      (order.total / order.products.length) *
      (Math.floor(Math.random() * 3) + 1),
  }));

  return (
    <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen">
      <div className="space-y-5">
        <div className="flex justify-between items-center bg-[#e9eff5] py-5 px-2 rounded-md   ">
          <p className="text-base leading-loose">
            Mã đơn hàng: <span className="font-bold ml-1">{order.id}</span>
          </p>
          <p className="text-base leading-loose">
            Ngày mua hàng: <span className="font-bold ml-1">{order.date}</span>
          </p>
          <p className="text-base leading-loose">
            Trạng thái:{" "}
            <Tag className="py-2 px-3 ml-1" color={statusColors[order.status]}>{order.status}</Tag>
          </p>
        </div>

        <div className="flex justify-between rounded-md">
          <div className="border">
            <h3>Thông tin khách hàng</h3>
            <div>
              <p><strong>Họ và tên: </strong>{order.customer}</p>
              <p><strong>Số điện thoại: </strong>{order.name}</p>
              <p><strong>Địa chỉ: </strong>{order.name}</p>
            </div>
          </div>
          <div className="border">
            <h3>Thông tin khách hàng</h3>
          </div>
        </div>

        {/* Bảng chi tiết sản phẩm */}
        <Table
          columns={columns}
          dataSource={productsData}
          pagination={false}
          rowKey="id"
          rowClassName="cursor-pointer"
        />

        {/* Tổng tiền */}
        <div className="text-right font-bold text-lg">
          Tổng tiền phải thanh toán: {order.total.toLocaleString()}đ
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
