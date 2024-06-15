import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";

const MyClassDetails = () => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [assignments, setAssignments] = useState([]);

  const {
    data: teacherClass,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["teacherClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/teacherClass/${id}`);
      console.log(res.data);

      if (res.data) {
        const response = await axiosSecure.get(
          `/assignmentSubmit/${res?.data?.title}`
        );
        console.log("assignments", response.data);
        setAssignments(response.data);
      }
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    console.log(data, teacherClass);
    const assignmentData = {
      title: teacherClass.title,
      data,
    };
    const res = await axiosSecure.post(`/users/assignment`, assignmentData);
    console.log(data, res.data);
    if (res.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Assignment added successful",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <div className="flex gap-20 ml-10 mt-10">
        <div>
          <h2 className="text-2xl mb-2 font-semibold text-red-800">
            Class Progress
          </h2>
          <div className="flex items-center gap-5">
            <div className="stats shadow bg-slate-100">
              <div className="stat">
                <div className="stat-title text-xl font-semibold text-red-900">
                  Total Enrollment
                </div>
                <div className="stat-value">
                  {teacherClass?.total_enrolment
                    ? teacherClass?.total_enrolment
                    : 0}
                </div>
              </div>
            </div>
            <div className="stats shadow bg-slate-100">
              <div className="stat">
                <div className="stat-title  text-xl font-semibold text-red-900">
                  Total Assignment
                </div>
                <div className="stat-value">89,400</div>
                <div className="stat-desc">21% more than last month</div>
              </div>
            </div>
            <div className="stats shadow bg-slate-100">
              <div className="stat">
                <div className="stat-title  text-xl font-semibold text-red-900">
                  Per Day Assignment
                </div>
                <div className="stat-value">{assignments?.length}</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-red-800 mb-2">
            Add Assignment
          </h2>
          <div>
            <button
              className="btn bg-green-600 text-white hover:text-black px-6 py-2 rounded-xl"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              <FaPlus className="text-2xl"></FaPlus>
              <span className="text-lg">Create</span>
            </button>

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
