import { FaHome, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { MdClass } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { GiTeacher } from "react-icons/gi";
import useTeacher from "../../hooks/useTeacher";

const DashboardLayout = () => {
  const [isAdmin] = useAdmin();
  const [isTeacher] = useTeacher();
  console.log("layout", isAdmin, "teacher", isTeacher);

  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-violet-600">
        {isAdmin ? (
          <>
            <ul className="menu space-y-3 mb-1 text-white  font-semibold">
              <li>
                <NavLink to="/dashboard/teachers">
                  <GiTeacher className="text-2xl" />
                  Teacher Request
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/Users" className="text-white">
                  <FaUsers className="text-2xl"></FaUsers>Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allClass">
                  <MdClass className="text-2xl" />
                  All Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile">
                  <ImProfile className="text-2xl" />
                  Profile
                </NavLink>
              </li>
            </ul>
          </>
        ) : isTeacher ? (
          <>
            <ul className="menu space-y-3 mb-1 text-white font-semibold">
              <li>
                <NavLink to="/dashboard/addClass">Add Class</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myClass">My Class</NavLink>
              </li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className="menu space-y-3 mb-1 text-white font-semibold">
              <li>
                <NavLink to="/dashboard/enrollClass">My Enroll Class</NavLink>
              </li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
            </ul>
          </>
        )}

        <hr />
        <ul className="menu space-y-3 mt-1 text-white font-semibold">
          <li>
            <NavLink to="/">
              <FaHome className="text-2xl"></FaHome>Home
            </NavLink>
          </li>
        </ul>
      </div>
      {/* content */}
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
