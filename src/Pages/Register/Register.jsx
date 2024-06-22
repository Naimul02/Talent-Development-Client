import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { getAuth, updateProfile } from "firebase/auth";
import app from "../../firebase/firebase.config";
import Swal from "sweetalert2";
import usePublicAxios from "../../hooks/usePublicAxios";

const auth = getAuth(app);
const Register = () => {
  const axiosPublic = usePublicAxios();
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const handleRegister = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;

        updateProfile(auth.currentUser, {
          displayName: data.name,
          photoURL: data.photo,
        })
          .then(async () => {
            console.log("profile update", user);
            const usersInfo = {
              name: data.name,
              email: data.email,
              password: data.password,
              image: data.photo,
            };
            const res = await axiosPublic.post("/users", usersInfo);
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User Created Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error?.message}`,
            });
            // console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="flex max-w-5xl mx-auto gap-6 flex-col lg:flex-row py-16 items-center">
      <div className="w-full lg:w-[45%]">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-8694031-6983270.png"
          className="w-full"
          alt=""
        />
      </div>
      <div className="p-6 w-full  lg:w-[55%] lg:p-0 mx-auto h-full">
        <div className="h-full w-full  flex  items-center">
          <form
            className="card-body  w-full space-y-5"
            onSubmit={handleSubmit(handleRegister)}
          >
            {/* register */}
            <h1 className="text-center text-4xl">Register</h1>
            <div className="form-control">
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                required
                {...register("name")}
              />
            </div>
            <div className="form-control">
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                {...register("email")}
              />
            </div>
            <div className="form-control">
              <input
                type="text"
                placeholder="photo URL"
                className="input input-bordered"
                required
                {...register("photo")}
              />
            </div>
            <div className="form-control">
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                {...register("password")}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-cyan-900 text-white hover:bg-cyan-800 border-none">
                Register
              </button>
            </div>
            <p className="text-xl text-center">
              Already have an account ?{" "}
              <Link className="text-blue-600 underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
