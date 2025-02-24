function Discount() {
    const discounts = [
      { id: 1, code: "SUMMER20", value: "20%", expiry: "2025-06-30", status: "Hoạt động" },
      { id: 2, code: "WINTER50", value: "50%", expiry: "2025-12-31", status: "Hết hạn" },
      { id: 3, code: "FREESHIP", value: "Miễn phí vận chuyển", expiry: "2025-08-15", status: "Hoạt động" },
    ];
  
    return (
      <div>
        <h1 className="text-2xl font-bold">Discount</h1>
        <table className="w-full mt-4 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Mã giảm giá</th>
              <th className="border p-2">Giá trị</th>
              <th className="border p-2">Hạn sử dụng</th>
              <th className="border p-2">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount.id} className="border">
                <td className="border p-2">{discount.id}</td>
                <td className="border p-2">{discount.code}</td>
                <td className="border p-2">{discount.value}</td>
                <td className="border p-2">{discount.expiry}</td>
                <td className={`border p-2 ${discount.status === "Hoạt động" ? "text-green-500" : "text-red-500"}`}>
                  {discount.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Discount;
  