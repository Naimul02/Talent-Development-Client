import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Loading from "../../../Shared/Loading/Loading";

const MyClassDetails = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const { id, title } = useParams();

  console.log("id", id, "title", title);
  const axiosSecure = useAxiosSecure();

  const {
    data: info,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["totalEnrolAssign"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/totalEnrolAssign/${title}/${id}`);
      console.log(res.data);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    // console.log(data, teacherClass);
    const assignmentData = {
      name: user?.displayName,
      email: user?.email,
      title: title,
      data,
    };
    const res = await axiosSecure.post(`/users/assignment`, assignmentData);

    console.log(data, res.data);
    if (res.data.insertedId) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Assignment added successful",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-20 lg:ml-10 mt-10">
        <div>
          <h2 className="text-2xl text-center lg:text-left mb-2 font-semibold text-red-800">
            Class Progress
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-5">
            <div className="stats shadow bg-slate-100">
              <div className="stat">
                <div className="stat-title text-xl font-semibold text-red-900">
                  Total Enrollment
                </div>
                <div className="stat-value">
                  {info.totalEnrolment?.total_enrolment
                    ? info.totalEnrolment?.total_enrolment
                    : 0}
                </div>
              </div>
            </div>
            <div className="stats shadow bg-slate-100">
              <div className="stat">
                <div className="stat-title  text-xl font-semibold text-red-900">
                  Total Assignment
                </div>
                <div className="stat-value">
                  {info?.totalAssignment?.length
                    ? info.totalAssignment.length
                    : 0}
                </div>
              </div>
            </div>
            <div className="stats shadow bg-slate-100">
              <div className="stat">
                <div className="stat-title  text-xl font-semibold text-red-900">
                  Per Day Assignment
                </div>
                <div className="stat-value">
                  {info?.totalSubmitAssignment?.length
                    ? info?.totalSubmitAssignment?.length
                    : 0}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-red-800 mb-2 text-center lg:text-left">
            Add Assignment
          </h2>
          <div>
            <div className="flex justify-center lg:justify-start mb-4 lg:mb-0">
              <button
                className="btn bg-green-600 text-white hover:text-black px-6 py-2 rounded-xl mx-auto lg:mx-0"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                <FaPlus className="text-2xl"></FaPlus>
                <span className="text-lg">Create</span>
              </button>
            </div>

            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Assignment Title</span>
                    </div>
                    <input
                      type="text"
                      placeholder="assignment title"
                      className="input input-bordered w-full "
                      {...register("assignmentTitle", { required: true })}
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Assignment Deadline</span>
                    </div>
                    <input
                      type="text"
                      placeholder="assignment deadline"
                      className="input input-bordered w-full "
                      {...register("assignmentDeadline", { required: true })}
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Assignment Description</span>
                    </div>
                    <textarea
                      className="textarea textarea-bordered w-full h-[200px]"
                      placeholder="assignment description"
                      {...register("assignmentDescription", { required: true })}
                    ></textarea>
                  </label>
                  <button className="btn btn-outline  w-full mt-3">
                    Add Assignment
                  </button>
                </form>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyClassDetails;
