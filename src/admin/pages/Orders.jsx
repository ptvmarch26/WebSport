function Orders() {
    const orders = [
      { id: 1, customer: "Nguyễn Văn A", total: 500000, status: "Đang xử lý" },
      { id: 2, customer: "Trần Thị B", total: 1200000, status: "Hoàn thành" },
      { id: 3, customer: "Lê Văn C", total: 350000, status: "Hủy" },
    ];
  
    return (
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <table className="w-full mt-4 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Mã đơn</th>
              <th className="border p-2">Khách hàng</th>
              <th className="border p-2">Tổng tiền</th>
              <th className="border p-2">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border">
                <td className="border p-2">{order.id}</td>
                <td className="border p-2">{order.customer}</td>
                <td className="border p-2">{order.total} VND</td>
                <td className="border p-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Orders;
  