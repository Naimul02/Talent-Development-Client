import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const TeacherClassCard = ({ teacherClass, refetch }) => {
  console.log("enroll", teacherClass);
  const axiosSecure = useAxiosSecure();
  const handleDelete = async (id) => {
    const res = await axiosSecure.delete(`/users/teacherClass/${id}`);
    console.log(res.data);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `class deleted successful`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  console.log(teacherClass);
  return (
    <div>
      <div className="border-2 hover:border-green-700 rounded-lg lg:h-[300px]">
        <div className="flex flex-col lg:flex-row items-center  h-full">
          <div className="p-3 lg:p-6 w-full lg:w-[40%] h-full">
            <img
              src={teacherClass?.image}
              alt=""
              className="h-full w-full rounded-xl border"
            />
          </div>

          <div className="px-2 lg:px-0 lg:pr-4 lg:py-2 w-full lg:w-[65%] space-y-1 pb-2 lg:pb-0">
            <h2 className="text-xl font-semibold capitalize text-red-800">
              {teacherClass?.title}
            </h2>
            <h2 className="text-lg font-semibold capitalize">
              {teacherClass?.name}
            </h2>
            <h2 className="text-lg font-semibold">{teacherClass?.email}</h2>
            <p>{teacherClass?.short_description.slice(0, 130)}...</p>
            <p className="text-lg font-semibold">
              Status :{" "}
              {teacherClass.status === "accepted"
                ? "accepted"
                : teacherClass.status === "rejected"
                ? "rejected"
                : "pending"}
            </p>
            <p className="text-xl font-semibold">
              Price :{" "}
              <span className="text-xl font-bold text-red-900">
                ${teacherClass?.price}
              </span>
            </p>
            <Link to={`/dashboard/updateClass/${teacherClass?._id}`}>
              <button className="btn  btn-sm bg-teal-800 text-white hover:text-black px-5">
                Update
              </button>
            </Link>
            <button
              className="btn btn-sm bg-teal-800 text-white hover:text-black px-5 mx-2"
              onClick={() => handleDelete(teacherClass?._id)}
            >
              Delete
            </button>
            {teacherClass.status === "accepted" ? (
              <Link
                to={`/dashboard/myClass/${teacherClass?._id}/${teacherClass?.title}`}
              >
                <button className="btn btn-sm bg-teal-800 text-white hover:text-black px-5">
                  See Details
                </button>
              </Link>
            ) : (
              <button
                className="btn btn-sm bg-teal-800 text-white hover:text-black px-5"
                disabled
              >
                See Details
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherClassCard;
