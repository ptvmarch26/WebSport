function Users() {
    const users = [
      { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", role: "Khách hàng" },
      { id: 2, name: "Trần Thị B", email: "b@gmail.com", role: "Admin" },
      { id: 3, name: "Lê Văn C", email: "c@gmail.com", role: "Khách hàng" },
    ];
  
    return (
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <table className="w-full mt-4 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Tên</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Vai trò</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border">
                <td className="border p-2">{user.id}</td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Users;
  