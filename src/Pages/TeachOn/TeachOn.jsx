import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import usePublicAxios from "../../hooks/usePublicAxios";
import { useParams } from "react-router-dom";

const TeachOn = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = usePublicAxios();

  const [statusTeachOn, setStatusTeachOn] = useState();
  console.log("statusTeachOn ", statusTeachOn);

  const onSubmit = async (data) => {
    console.log(data);
    const infoData = {
      data,
      status: "pending",
    };
    axiosPublic.post(`/teachOn`, infoData).then(async (res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Your request has been successful`,
          showConfirmButton: false,
          timer: 1500,
        });
        const response = await axiosPublic.get(
          `/teachOn/${res.data.insertedId}`
        );
        // console.log(response.data);
        setStatusTeachOn(response.data);
      }

      //
    });
  };
  return (
    <div className="max-w-3xl mx-3 lg:mx-auto mt-36 mb-10">
      <h1 className="text-3xl font-bold">Teach On</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              type="text"
              placeholder="Name"
              defaultValue={user?.displayName}
              className="input input-bordered w-full "
              {...register("name", { required: true })}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full "
              defaultValue={
                statusTeachOn?.data?.data?.title
                  ? statusTeachOn?.data?.data?.title
                  : ""
              }
              {...register("title", { required: true })}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Image</span>
            </div>
            <input
              type="text"
              placeholder="Photo"
              defaultValue={user?.photoURL}
              className="input input-bordered w-full "
              {...register("photo", { required: true })}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              placeholder="Email"
              defaultValue={user?.email}
              readOnly
              className="input input-bordered w-full"
              {...register("email", { required: true })}
            />
          </label>

          <div className="flex gap-6">
            {/* Experience */}
            <div className="w-full">
              <div className="label">
                <span className="label-text">Experience</span>
              </div>
              <select
                defaultValue={
                  statusTeachOn?.data?.data?.experience
                    ? statusTeachOn?.data?.data?.experience
                    : ""
                }
                className="select select-bordered w-full"
                {...register("experience", { required: true })}
              >
                <option disabled value="default">
                  Experience
                </option>
                <option value="beginner">Beginner</option>
                <option value="experienced">Experienced</option>
                <option value="midLevel">Mid-level</option>
              </select>
            </div>
            <div className="w-full">
              <div className="label">
                <span className="label-text">Category</span>
              </div>
              <select
                defaultValue={
                  statusTeachOn?.data?.data?.category
                    ? statusTeachOn?.data?.data?.category
                    : ""
                }
                className="select select-bordered w-full"
                {...register("category", { required: true })}
              >
                <option disabled value="default">
                  Category
                </option>
                <option value="Web Development Bootcamp">
                  Web Development Bootcamp
                </option>
                <option value="Graphic Design for Beginners">
                  Graphic Design for Beginners
                </option>
                <option value="Data Science with R">Data Science with R</option>
                <option value="Introduction to Python Programming">
                  Introduction to Python Programming
                </option>
                <option value="Photography Masterclass">
                  Photography Masterclass
                </option>
              </select>
            </div>

            {/* recipe details */}
          </div>

          {statusTeachOn?.data?.status === "accepted" ? (
            <button className="btn btn-outline  w-full mt-3">
              Submit for review
            </button>
          ) : statusTeachOn?.data?.status === "rejected" ? (
            <button className="btn btn-outline  w-full mt-3">
              Request to another
            </button>
          ) : (
            <button className="btn btn-outline  w-full mt-3">
              Submit for review
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default TeachOn;
