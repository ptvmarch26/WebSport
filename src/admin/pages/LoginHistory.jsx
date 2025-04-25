import { Table } from "antd";
import { useNavigate } from "react-router-dom";

const mockData = [
  {
    _id: "1",
    createdAt: "2025-04-25T08:12:45Z",
    ip: "192.168.1.1",
    userAgent: "Chrome on Windows",
    activities: ["login", "view_dashboard", "logout"],
  },
  {
    _id: "2",
    createdAt: "2025-04-24T10:30:21Z",
    ip: "192.168.1.22",
    userAgent: "Firefox on MacOS",
    activities: ["login"],
  },
  {
    _id: "3",
    createdAt: "2025-04-23T15:00:00Z",
    ip: "192.168.2.5",
    userAgent: "Safari on iPhone",
    activities: ["login", "update_profile"],
  },
];

const columns = [
  {
    title: "IP",
    dataIndex: "ip",
    key: "ip",
  },
  {
    title: "User Agent",
    dataIndex: "userAgent",
    key: "userAgent",
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
  const navigate = useNavigate();
  return (
    <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen bg-gray-50">
      <div className="bg-white p-4 shadow-lg">
        <Table
          columns={columns}
          dataSource={mockData}
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
