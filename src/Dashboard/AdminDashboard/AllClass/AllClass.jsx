import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllClass = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allClasses, refetch } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");

      return res.data;
    },
  });
  console.log(allClasses);
  const handleApproved = async (id) => {
    const res = await axiosSecure.patch(`/users/admin/classes/${id}`);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Approved has been  Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      // document.getElementById(`approved/${id}`).setAttribute("disabled", "");
    }
  };
  const handleRejected = async (id) => {
    const res = await axiosSecure.patch(`/users/admin/classes/Rejected/${id}`);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Rejected has been  Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      // document.getElementById(`approved/${id}`).setAttribute("disabled", "");
    }
  };
  return (
    <div>
      <div className="max-w-[85%] mx-auto my-10">
        <h1 className="text-2xl font-bold mb-2">All Classes</h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>#</label>
                </th>
                <th>Image</th>
                <th>Title</th>
                <th>Email</th>
                <th>Short Description</th>
                <th>Approved</th>
                <th>Reject</th>
                <th>See Progress</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {allClasses?.map((singleClass, index) => (
                <tr key={singleClass._id}>
                  <th>
                    <label> {index + 1}</label>
                  </th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={singleClass?.image} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div>{singleClass.title}</div>
                      </div>
                    </div>
                  </td>
                  <td>{singleClass.email}</td>
                  <td>{singleClass.short_description.slice(0, 25)}...</td>

                  <td>
                    <button
                      className="btn btn-sm bg-green-500 text-white hover:text-black"
                      onClick={() => handleApproved(singleClass._id)}
                    >
                      Approved
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm bg-red-600 text-white hover:text-black"
                      onClick={() => handleRejected(singleClass._id)}
                    >
                      Reject
                    </button>
                  </td>
                  <td>
                    <p className="text-lg">Progress</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllClass;
