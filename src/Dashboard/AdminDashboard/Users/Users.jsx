import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const handleMakeAdmin = async (user) => {
    const res = await axiosSecure.patch(`/users/admin/${user?._id}`);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${user.name} is an Admin Now`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="max-w-[85%] mx-auto my-10">
      <h1 className="text-2xl font-bold mb-2">Users</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>#</label>
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users?.map((user, index) => (
              <tr key={user._id}>
                <th>
                  <label> {index + 1}</label>
                </th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={user?.image} />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="text-lg">{user?.name}</div>
                    </div>
                  </div>
                </td>
                <td className="text-lg">{user?.email}</td>
                <td>
                  {user?.role === "admin" ? (
                    <button className="btn  btn-ghost btn-sm" disabled>
                      Admin
                    </button>
                  ) : (
                    <button
                      className="btn  btn-ghost btn-sm"
                      onClick={() => handleMakeAdmin(user)}
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
