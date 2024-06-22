import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading/Loading";

const UpdateClass = () => {
  const { id } = useParams();
  console.log(id);
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  const axiosSecure = useAxiosSecure();

  //
  const { data: teacherClass, isLoading , refetch } = useQuery({
    queryKey: ["teacherClass"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/teacherClass/${id}`);
      console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  const onSubmit = async (data) => {
    console.log(data);

    axiosSecure.patch(`/updateClass/${id}`, data).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Updated Class successful.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div className="w-[80%] mx-auto my-10">
      <h1 className="text-2xl font-bold">Update Class</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              type="text"
              placeholder="Name"
              readOnly
              defaultValue={teacherClass.name}
              className="input input-bordered w-full "
              {...register("name", { required: true })}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              placeholder="Email"
              defaultValue={teacherClass?.email}
              readOnly
              className="input input-bordered w-full"
              {...register("email", { required: true })}
            />
          </label>
        </div>
        <div className="flex gap-3">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              type="text"
              placeholder="Title"
              defaultValue={teacherClass.title}
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
              defaultValue={teacherClass.price}
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
            defaultValue={teacherClass.image}
            {...register("image", { required: true })}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered w-full h-[200px]"
            defaultValue={teacherClass.short_description}
            placeholder="Description"
            {...register("short_description", { required: true })}
          ></textarea>
        </label>

        <button className="btn btn-outline  w-full mt-3">Update Class</button>
      </form>
    </div>
  );
};

export default UpdateClass;
