import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout Successfull",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {});
  };
  const liItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/allClasses">All Classes</NavLink>
      </li>
      <li>
        <NavLink to="/teachOn">Teach On</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-opacity-50  bg-teal-950  fixed  z-10   lg:px-20 text-white top-0 box-border w-full">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="lg:hidden">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColo"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg> */}
            <IoMenu className="text-4xl mr-3 text-bold" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-black rounded-box w-52"
          >
            {liItems}
          </ul>
        </div>
        <Link to="/" className="text-lg md:text-xl flex items-center gap-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE2NdDsbjed9C9mOsPGxR5d9dXwINSg7S51Q&s"
            className="w-8 md:w-16 rounded-full"
            alt=""
          />
          <p className="text-base w-[50px] md:w-full">Talent development</p>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{liItems}</ul>
      </div>

      <div className="navbar-end">
        {user?.photoURL && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="m-1">
              <div className="avatar mr-6">
                <div className="w-12 rounded-full">
                  <img src={user?.photoURL} />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 text-black bg-base-100 rounded-lg w-52"
            >
              <li className="capitalize  text-lg font-semibold ml-4">
                {user?.displayName}
              </li>
              <hr />
              <li>
                <NavLink to="/dashboard" className="text-lg">
                  Dashboard
                </NavLink>
              </li>
              <hr />
              {user ? (
                <li onClick={handleLogOut}>
                  <a className="text-lg">Logout</a>
                </li>
              ) : (
                <li>
                  <Link to="/login" className="text-lg">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
        {!user && (
          <Link to="/login" className="btn btn-outline  px-6  text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
