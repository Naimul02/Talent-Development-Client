import { useLoaderData, useParams } from "react-router-dom";
import usePublicAxios from "../../hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";
import Assignment from "./Assignment";
import Loading from "../../Shared/Loading/Loading";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import React, { useContext, useState } from "react";
import { render } from "react-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const MyEnrollClassDetails = () => {
  const { register, handleSubmit, reset } = useForm();
  const info = useLoaderData();

  console.log("info ", info);
  const axiosPublic = usePublicAxios();

  const [ratings, setRatings] = useState(null);
  const { user } = useContext(AuthContext);

  const ratingChanged = (newRating) => {
    // console.log(newRating);
    setRatings(newRating);
  };

  const { data: assignments, isLoading } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/assignment/${info.courseName}`);
      console.log(res.data);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  

  const onSubmit = async (data) => {
    console.log("hibru", data, ratings);
    const feedbackData = {
      ratings: ratings,
      description: data.description,
      image: user?.photoURL,
      name: user?.displayName,
      email: user?.email,
      classTitle: info?.courseName,
    };
    console.log(feedbackData);
    const res = await axiosPublic.post(`/users/feedback`, feedbackData);
    console.log(data, res.data);
    if (res.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Feedback added successful",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="mx-10 my-10">
      {/* assignment */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-3">
        <h1 className="text-2xl font-bold  text-red-800">Assignments</h1>
        <div>
          <button
            className="btn bg-cyan-600 px-6 text-white hover:text-black mt-3 lg:mt-0"
            onClick={() => document.getElementById("my_modal_4").showModal()}
          >
            Teaching Evaluation Report (TER)
          </button>

          <dialog id="my_modal_4" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>

              <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-2xl font-bold text-center">Feedback</h1>
                <div className="flex justify-center">
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={40}
                    activeColor="#ffd700"
                  />
                </div>

                <label className="form-control w-full">
                  <textarea
                    className="textarea textarea-bordered w-full h-[150px]"
                    placeholder="description"
                    {...register("description", { required: true })}
                  ></textarea>
                </label>

                <button className="btn btn-outline  w-full mt-3">Send</button>
              </form>
            </div>
          </dialog>
        </div>
      </div>
      <div className="space-y-3">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Description</th>
                <th>Deadline</th>
                <th>Submit</th>
              </tr>
            </thead>
            <tbody>
              {assignments?.map((assignment, index) => (
                <Assignment
                  key={assignment._id}
                  assignment={assignment}
                  index={index}
                ></Assignment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyEnrollClassDetails;
