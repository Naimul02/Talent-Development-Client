import { Link } from "react-router-dom";

const EnrollCard = ({ enrollClass }) => {
  console.log(enrollClass);
  return (
    <div>
      <div className="border hover:border-green-700 rounded-lg  ">
        <div className="flex items-center  h-full">
          <div className="p-4 w-[50%] lg:w-[40%] h-full">
            <img
              src={enrollClass?.courseImage}
              alt=""
              className="h-[200px] w-full rounded-xl"
            />
          </div>

          <div className="pr-4 py-2 w-[50%] lg:w-[60%] space-y-2">
            <h2 className="text-xl font-semibold capitalize text-red-800">
              {enrollClass.name}
            </h2>
            <h2 className="text-lg">{enrollClass?.courseName}</h2>
            <p className="text-xl">
              Price :{" "}
              <span className="text-xl font-bold text-red-900">
                ${enrollClass?.price}
              </span>
            </p>
            <Link to={`/dashboard/myenroll-class/${enrollClass.courseName}`}>
              <button className="btn-outline hover:bg-teal-800 hover:text-white px-5 btn">
                Continue
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollCard;
