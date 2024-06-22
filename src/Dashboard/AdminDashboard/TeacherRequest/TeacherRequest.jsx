import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Loading from "../../../Shared/Loading/Loading";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [teachers, setTeachers] = useState([]);
  const { loading, setLoading } = useContext(AuthContext);
  const { count } = useLoaderData();
  console.log("count : ", count);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];
  useEffect(() => {
    axiosSecure
      .get(`teachOn?page=${currentPage}&size=${itemsPerPage}`)
      .then((res) => {
        console.log("res.data", res.data);
        setTeachers(res.data);
        setLoading(false);
      });
  }, [currentPage, itemsPerPage, setLoading, axiosSecure]);

  console.log("teachers vai ", teachers);

  const handleApproved = async (id) => {
    const res = await axiosSecure.patch(`/teachOn/${id}`);
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
    }
  };
  const handleRejected = async (id) => {
    const res = await axiosSecure.patch(`/teachOnRejected/${id}`);
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
    }
  };
  const handleItemsPerPage = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(0);
  };
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div className="max-w-[85%] mx-auto my-10">
        <h1 className="text-2xl font-bold mb-2">Teacher Request</h1>
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
                <th>Experience</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Approved</th>
                <th>Reject</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {teachers?.map((teacher, index) => (
                <tr key={teacher._id}>
                  <th>
                    <label> {index + 1}</label>
                  </th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={teacher?.data.photo} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="text-lg">{teacher?.data.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-lg">{teacher?.data.experience}</td>
                  <td>{teacher?.data.title}</td>
                  <td>{teacher.data.category}</td>
                  <td>{teacher.status}</td>
                  <td>
                    {teacher.status === "accepted" ? (
                      <button className="btn btn-ghost btn-sm" disabled>
                        Approved
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm bg-green-500 text-white hover:text-black"
                        onClick={() => handleApproved(teacher._id)}
                      >
                        Approved
                      </button>
                    )}
                  </td>
                  <td>
                    {teacher.status === "rejected" ? (
                      <button className="btn btn-ghost btn-sm" disabled>
                        Reject
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm bg-red-600 text-white hover:text-black"
                        onClick={() => handleRejected(teacher._id)}
                        id={`rejected/${teacher._id}`}
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

export default TeacherRequest;
