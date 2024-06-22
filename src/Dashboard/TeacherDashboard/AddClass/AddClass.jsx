import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import usePublicAxios from "../../../hooks/usePublicAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    console.log(data);

    axiosSecure.post("/addClass", data).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Your class  added successful.`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/myClass");
      }
    });
  };
  return (
    <div className="w-[80%] mx-auto my-10">
      <h1 className="text-lg font-bold">Add Class</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row gap-3">
          {/* name */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              type="text"
              placeholder="Name"
              readOnly
              defaultValue={user?.displayName}
              className="input input-bordered w-full "
              {...register("name", { required: true })}
            />
          </label>
          {/* email */}
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
        </div>
        <div className="flex flex-col lg:flex-row gap-3">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full "
              {...register("title", { required: true })}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Price</span>
            </div>
            <input
              type="text"
              placeholder="price"
              className="input input-bordered w-full"
              {...register("price", { required: true })}
            />
          </label>
        </div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Image</span>
          </div>
          <input
            type="text"
            placeholder="Photo"
            className="input input-bordered w-full "
            {...register("image", { required: true })}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered w-full h-[200px]"
            placeholder="Description"
            {...register("short_description", { required: true })}
          ></textarea>
        </label>

        <button className="btn btn-outline  w-full mt-3">Add Class</button>
      </form>
    </div>
  );
};

export default AddClass;
