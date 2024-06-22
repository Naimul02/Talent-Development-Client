import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import usePagination from "../../../hooks/usePagination";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const url = "users";
  const [
    datas,
    handlePrevPage,
    pages,
    currentPage,
    setCurrentPage,
    handleNextPage,
    itemsPerPage,
    handleItemsPerPage,
    
  ] = usePagination(url);

  const handleMakeAdmin = async (user) => {
    const res = await axiosSecure.patch(`/users/admin/${user?._id}`);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
    
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${user.name} is an Admin Now`,
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.reload()
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
            {datas?.map((user, index) => (
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

      {/* pagination */}
      <div className="text-center mt-6">
        <button className="btn mr-2" onClick={handlePrevPage}>
          Prev
        </button>
        {pages?.map((page) => (
          <button
            className={`${
              currentPage === page
                ? "btn bg-orange-600 hover:text-black text-white"
                : undefined
            } btn mr-2`}
            key={page}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button className="btn ml-2" onClick={handleNextPage}>
          Next
        </button>
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPage}
          name=""
          id=""
          className="ml-2 border-2 py-[10px] px-3 rounded-lg"
        >
          <option value="6">6</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default Users;
