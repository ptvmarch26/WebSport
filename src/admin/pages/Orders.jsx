import { useEffect, useState } from "react";
import { Table, Input, Select, Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../../context/OrderContext";
import moment from "moment";
import { usePopup } from "../../context/PopupContext";

const { Option } = Select;

const statusOrder = [
  "Chờ xác nhận",
  "Đang chuẩn bị hàng",
  "Đang giao",
  "Hoàn thành",
  "Yêu cầu hoàn",
  "Hoàn hàng",
  "Hủy hàng",
];

const Orders = () => {
  const { orders, fetchOrders, handleUpdateOrderStatus } = useOrder();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);
  const navigate = useNavigate();
  const [ordersState, setOrdersState] = useState(orders);
  const { showPopup } = usePopup();

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    setOrdersState(orders);
  }, [orders]);

  const handleStatusChange = async (orderId, newStatus) => {
    const result = await handleUpdateOrderStatus(orderId, newStatus);
    if (result.EC === 0) {
      const updatedOrders = ordersState.map((order) => {
        if (order._id === orderId) {
          return { ...order, order_status: newStatus };
        }
        return order;
      });
      setOrdersState(updatedOrders);
      showPopup(result.EM);
    } else showPopup(result.EM, false);
  };

  const filteredOrders = ordersState.filter((order) => {
    const matchesStatus = filterStatus
      ? order.order_status === filterStatus
      : true;
    const matchesSearch = searchText
      ? order._id.toLowerCase().includes(searchText.toLowerCase())
      : true;
    return matchesStatus && matchesSearch;
  });

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Sản phẩm",
      dataIndex: "products",
      key: "products",
      render: (products) => <span>{`${products.length} sản phẩm`}</span>,
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => {
        return moment(date).format("YYYY-MM-DD HH:mm");
      },
    },
    {
      title: "Khách hàng",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Hình thức",
      dataIndex: "order_payment_method",
      key: "order_payment_method",
      render: (value) => value.toUpperCase(),
    },
    {
      title: "Tổng tiền",
      dataIndex: "order_total_final",
      key: "order_total_final",
      render: (value) => `${value.toLocaleString()}đ`,
    },
    {
      title: "Trạng thái",
      dataIndex: "order_status",
      key: "order_status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(newStatus) => {
            handleStatusChange(record._id, newStatus);
          }}
          className="min-w-[200px]"
          onClick={(e) => e.stopPropagation()}
        >
          {statusOrder.map((s) => (
            <Option key={s} value={s}>
              {s}
            </Option>
          ))}
        </Select>
      ),
      onCell: () => ({
        onClick: (e) => {
          // Chỉ ngăn chặn sự kiện click không lan truyền lên hàng
          e.stopPropagation();
        },
      }),
    },
  ];

  return (
    <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen">
      <div className="space-y-3 mb-4">
        <div className="flex gap-4">
          <Input
            placeholder="Tìm kiếm theo mã đơn hàng..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="rounded-none"
          />

          <Button
            type="primary"
            icon={<ExportOutlined />}
            className="rounded-none"
          >
            Xuất file
          </Button>
        </div>
        <div className="flex justify-between">
          <Select
            placeholder="Trạng thái đơn hàng"
            value={filterStatus}
            onChange={setFilterStatus}
            allowClear
            className="w-[300px]"
          >
            {statusOrder.map((status, index) => (
              <Option key={index} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <div className="bg-white p-4 shadow-lg">
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          dataSource={filteredOrders}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="_id"
          onRow={(record) => ({
            onClick: () => navigate(`/admin/order-details/${record._id}`),
          })}
          scroll={{ x: "max-content" }}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Orders;
