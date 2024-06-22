import { useQuery } from "@tanstack/react-query";
import { FaUsers } from "react-icons/fa";
import { GiEntryDoor } from "react-icons/gi";
import { MdClass } from "react-icons/md";
import usePublicAxios from "../../../hooks/usePublicAxios";

const TotalStuUsersEnroll = () => {
  const axiosPublic = usePublicAxios();
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      // console.log(res.data);
      return res.data;
    },
  });
  const { data: classes } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosPublic.get("/classes");
      // console.log(res.data);
      return res.data;
    },
  });
  const { data: totalEnroll = [] } = useQuery({
    queryKey: ["totalEnroll"],
    queryFn: async () => {
      const res = await axiosPublic.get("/payments");
      // console.log("totalEnroll ", res.data);
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto py-20">
      <div className="flex flex-col lg:flex-row gap-4 px-3 lg:px-0 justify-center">
        <div className="stats stats-vertical lg:stats-horizontal shadow h-[200px] max-w-[700px] border  hover:border-green-600">
          <div className="stat">
            <div className="stat-title text-2xl font-semibold text-red-800">
              Total Users
            </div>
            <div className="stat-value">{users?.length}</div>
            <div className="stat-desc">
              <FaUsers className="text-4xl"></FaUsers>
            </div>
          </div>

          <div className="stat">
            <div className="stat-title text-2xl font-semibold text-red-800">
              Total Classes
            </div>
            <div className="stat-value">{classes?.length}</div>
            <div className="stat-desc">
              <MdClass className="text-4xl"></MdClass>
            </div>
          </div>

          <div className="stat">
            <div className="stat-title text-2xl font-semibold text-red-800">
              Total Enrollment
            </div>
            <div className="stat-value">
              {totalEnroll ? totalEnroll?.length : 0}
            </div>
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
