import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const Teachers = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-7xl mx-auto">
      {/* card card-side */}
      <div className="flex flex-col lg:flex-row  lg:h-[400px]  rounded-lg">
        <div className="w-full lg:w-[40%] h-full rounded-lg">
          <img
            src={
              user
                ? user?.photoURL
                : "https://sitescdn.wearevennture.co.uk/public/spencer-clarke-group/site/live/uploads/5005001.png"
            }
            alt="Movie"
            className="h-full w-full p-4 object-cover rounded-lg"
          />
        </div>
        <div className="w-full lg:w-[60%] flex flex-col lg:flex-row items-center lg:pl-10 px-3 lg:px-0">
          <div>
            <h1 className="text-2xl text-center lg:text-left font-bold capitalize">
              {user ? user?.displayName : "Naimul Islum"}
            </h1>

            <p className="mt-6 mb-4 text-lg ">
              A teacher, also called a schoolteacher or formally an educator, is
              a person who helps students to acquire knowledge, competence, or
              virtue, via the practice of teaching. A teacher, also called a
              schoolteacher or formally an educator, is a person who helps
              students to acquire knowledge, competence, or virtue, via the
              practice of teaching.
            </p>
            <Link to="/teachOn">
              <button className="btn btn-outline w-[300px]">
                Start Teaching Today
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
