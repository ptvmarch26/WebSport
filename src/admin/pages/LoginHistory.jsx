import { Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoginHistory } from "../../services/api/LoginHistoryApi";

const columns = [
  {
    title: "IP",
    dataIndex: "ip",
    key: "ip",
  },
  {
    title: "User Agent",
    dataIndex: "user_agent",
    key: "user_agent",
  },
  {
    title: "Thời gian",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text) => new Date(text).toLocaleString("vi-VN"),
  },
  {
    title: "Số hoạt động",
    key: "activityCount",
    render: (_, record) => record.activities.length || 0,
  },
];

function LoginHistory() {
  const [loginHistories, setLoginHistories] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const result = await getLoginHistory();
      if (result.EC === 0) {
        setLoginHistories(result.result);
      }
    };
    fetchData();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen bg-gray-50">
      <div className="bg-white p-4 shadow-lg">
        <Table
          columns={columns}
          dataSource={loginHistories}
          pagination={{ pageSize: 5 }}
          rowKey="_id"
          scroll={{ x: "max-content" }}
          onRow={(record) => ({
            onClick: () => navigate(`/admin/history/${record._id}`),
          })}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}

export default LoginHistory;
