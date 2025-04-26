import { useParams, useNavigate } from "react-router-dom";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { getLoginHistoryById } from "../../services/api/LoginHistoryApi";

function LoginHistoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loginHistory, setLoginHistory] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const result = await getLoginHistoryById(id);
      if (result.EC === 0) {
        setLoginHistory(result.result);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "order_id",
      key: "order_id",
      render: (text) => (
        <a
          onClick={() => navigate(`/admin/order-details/${text}`)}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          {text}
        </a>
      ),
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
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString("vi-VN"),
    },
  ];

  return (
    <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen bg-gray-50">
      <div className="bg-white p-4 shadow-lg space-y-4">
        <div className="space-y-3 px-3 py-5 border rounded">
          <h3 className="font-semibold">Thông tin cơ bản</h3>
          <p>
            <strong>IP:</strong> {loginHistory?.ip}
          </p>
          <p>
            <strong>User Agent:</strong> {loginHistory?.user_agent}
          </p>
        </div>
        <div className="space-y-3 px-3 py-5 border rounded">
          <h3 className="font-semibold">Lịch sử chỉnh sửa</h3>
          <Table
            columns={columns}
            dataSource={loginHistory?.activities}
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
