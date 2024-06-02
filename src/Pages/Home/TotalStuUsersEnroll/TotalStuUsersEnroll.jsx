import { FaUsers } from "react-icons/fa";
import { GiEntryDoor } from "react-icons/gi";
import { MdClass } from "react-icons/md";

const TotalStuUsersEnroll = () => {
  return (
    <div className="max-w-7xl mx-auto py-20">
      <div className="flex gap-4 justify-center">
        <div className="stats stats-vertical lg:stats-horizontal shadow h-[200px] w-[700px] border  hover:border-green-600">
          <div className="stat">
            <div className="stat-title text-2xl font-semibold text-red-800">
              Total Users
            </div>
            <div className="stat-value">31K</div>
            <div className="stat-desc">
              <FaUsers className="text-4xl"></FaUsers>
            </div>
          </div>

          <div className="stat">
            <div className="stat-title text-2xl font-semibold text-red-800">
              Total Classes
            </div>
            <div className="stat-value">120</div>
            <div className="stat-desc">
              <MdClass className="text-4xl"></MdClass>
            </div>
          </div>

          <div className="stat">
            <div className="stat-title text-2xl font-semibold text-red-800">
              Total Enrollment
            </div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">
              <GiEntryDoor className="text-4xl" />
            </div>
          </div>
        </div>

        <div>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/030/805/488/small/abstract-tree-growing-from-a-book-mental-training-and-education-concept-free-photo.jpg"
            alt=""
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default TotalStuUsersEnroll;
