// import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";

const AllClass = () => {
  const url = "classes";
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

  const axiosSecure = useAxiosSecure();
  // const { data: allClasses, refetch } = useQuery({
  //   queryKey: ["allClasses"],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get("/classes");

  //     return res.data;
  //   },
  // });
  // console.log(allClasses);
  const handleApproved = async (id) => {
    const res = await axiosSecure.patch(`/users/admin/classes/${id}`);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Approved has been  Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.reload();
      // document.getElementById(`approved/${id}`).setAttribute("disabled", "");
    }
  };
  const handleRejected = async (id) => {
    const res = await axiosSecure.patch(`/users/admin/classes/Rejected/${id}`);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Rejected has been  Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.reload();
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
              {datas?.map((singleClass, index) => (
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
                    {singleClass?.status === "accepted" ? (
                      <button
                        className="btn btn-sm bg-green-500 text-white hover:text-black"
                        disabled
                      >
                        Approved
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm bg-green-500 text-white hover:text-black"
                        onClick={() => handleApproved(singleClass._id)}
                      >
                        Approved
                      </button>
                    )}
                  </td>
                  <td>
                    {singleClass.status === "rejected" ? (
                      <button
                        className="btn btn-sm bg-red-600 text-white hover:text-black"
                        disabled
                      >
                        Reject
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm bg-red-600 text-white hover:text-black"
                        onClick={() => handleRejected(singleClass._id)}
                      >
                        Reject
                      </button>
                    )}
                  </td>
                  <td>
                    <p>
                      {singleClass.status === "accepted" ? (
                        <Link
                          to={`/dashboard/class/${singleClass.title}/${singleClass._id}`}
                        >
                          <button className="btn btn-sm w-[110px] bg-green-600 text-white hover:text-black">
                            see progress
                          </button>
                        </Link>
                      ) : (
                        <button className="btn btn-sm w-[110px]" disabled>
                          see progress
                        </button>
                      )}
                    </p>
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
    </div>
  );
};

export default AllClass;
