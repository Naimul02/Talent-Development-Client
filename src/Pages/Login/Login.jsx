import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import usePublicAxios from "../../hooks/usePublicAxios";

const Login = () => {
  const axiosPublic = usePublicAxios();
  const { signInUser, googleSignIn } = useContext(AuthContext);
  const pathname = useLocation();

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const handleRegister = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(pathname.state || navigate("/"));
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error?.message}`,
        });
        // console.error(error.message);
      });
  };
  const handleGoogleSignIn = () => {
    googleSignIn().then(async (result) => {
      const user = result.user;
      console.log(user);

      const usersInfo = {
        name: user?.displayName,
        email: user?.email,
        // password: data.password,
        image: user?.photoURL,
      };
      const res = await axiosPublic.post("/users", usersInfo);
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User signin Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(pathname.state || navigate("/"));
      }
    });
  };

  return (
    <div className="flex max-w-5xl mx-auto gap-6 flex-col lg:flex-row py-16 items-center">
      {/* login page */}
      <div className="w-full lg:w-[45%]">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-8694031-6983270.png"
          className="w-full"
          alt=""
        />
      </div>
      <div className="p-6 w-full lg:w-[55%] lg:p-0 mx-auto h-full">
        <div className="h-full w-full  flex  items-center">
          <div className="w-full">
            <form
              className="card-body  w-full space-y-5"
              onSubmit={handleSubmit(handleRegister)}
            >
              <h1 className="text-center text-4xl">SignIn</h1>

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
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  {...register("password")}
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-cyan-900 text-white hover:bg-cyan-800 border-none">
                  Login
                </button>
              </div>
              <p className="text-xl text-center">
                Are you new here ?
                <Link className="text-blue-600 underline" to="/register">
                  Register
                </Link>
              </p>
            </form>
            <div>
              <FcGoogle
                className="text-4xl text-center mx-auto hover:cursor-pointer"
                onClick={handleGoogleSignIn}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
