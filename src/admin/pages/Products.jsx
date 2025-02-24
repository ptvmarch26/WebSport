function Products() {
    const products = [
      { id: 1, name: "Áo thể thao nam", price: 300000, stock: 50 },
      { id: 2, name: "Giày chạy bộ", price: 1200000, stock: 30 },
      { id: 3, name: "Quần short thể thao", price: 250000, stock: 70 },
    ];
  
    return (
      <div>
        <h1 className="text-2xl font-bold">Products</h1>
        <table className="w-full mt-4 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Tên sản phẩm</th>
              <th className="border p-2">Giá</th>
              <th className="border p-2">Tồn kho</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border">
                <td className="border p-2">{product.id}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.price} VND</td>
                <td className="border p-2">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Products;
  