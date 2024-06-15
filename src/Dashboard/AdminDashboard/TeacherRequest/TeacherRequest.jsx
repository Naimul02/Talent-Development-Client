import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { data: teachers, refetch } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teachOn");

      return res.data;
    },
  });
  console.log(teachers);

  const handleApproved = async (id) => {
    const res = await axiosSecure.patch(`/teachOn/${id}`);
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
    }
  };
  const handleRejected = async (id) => {
    const res = await axiosSecure.patch(`/teachOnRejected/${id}`);
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
    }
  };
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
      </div>
    </div>
  );
};

export default TeacherRequest;
