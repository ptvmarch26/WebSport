import { useParams } from "react-router-dom";
import { Card, Typography, Table } from "antd";

const mockDetailData = {
  _id: "1",
  createdAt: "2025-04-25T08:12:45Z",
  ip: "192.168.1.1",
  userAgent: "Chrome on Windows",
  activities: [
    {
      orderId: "ORD12345",
      prev_status: "Processing",
      new_status: "Shipped",
      time: "2025-04-25T08:15:00Z",
    },
    {
      orderId: "ORD12346",
      prev_status: "Shipped",
      new_status: "Delivered",
      time: "2025-04-25T09:00:00Z",
    },
  ],
};

function LoginHistoryDetail() {
  const { id } = useParams();
  const data = mockDetailData;

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Trạng thái trước",
      dataIndex: "prev_status",
      key: "prev_status",
    },
    {
      title: "Trạng thái mới",
      dataIndex: "new_status",
      key: "new_status",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      render: (text) => new Date(text).toLocaleString("vi-VN"),
    },
  ];

  return (
    <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen bg-gray-50">
      <div className="bg-white p-4 shadow-lg space-y-4">
        <div className="space-y-3 px-3 py-5 border rounded">
          <h3 className="font-semibold">Thông tin cơ bản</h3>
          <p>
            <strong>IP:</strong> {data.ip}
          </p>
          <p>
            <strong>User Agent:</strong> {data.userAgent}
          </p>
        </div>
        <div className="space-y-3 px-3 py-5 border rounded">
          <h3 className="font-semibold">Lịch sử chỉnh sửa</h3>
          <Table
            columns={columns}
            dataSource={data.activities}
            rowKey="orderId"
            pagination={false}
            bordered
          />
        </div>
      </div>
    </div>
  );
}

export default LoginHistoryDetail;
