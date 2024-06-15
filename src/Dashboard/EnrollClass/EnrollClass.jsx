import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "../../hooks/usePublicAxios";
import Loading from "../../Shared/Loading/Loading";
import EnrollCard from "./EnrollCard";

const EnrollClass = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = usePublicAxios();

  const { data: enrollClasses, isLoading } = useQuery({
    queryKey: ["enrollClass"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `http://localhost:5000/dashboard/enrollClass/${user?.email}`
      );
      console.log(res.data);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="w-[90%] mx-auto my-10">
      <h1 className="text-2xl font-bold mb-5">Enroll Class</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {enrollClasses?.map((enrollClass) => (
          <EnrollCard
            key={enrollClass._id}
            enrollClass={enrollClass}
          ></EnrollCard>
        ))}
      </div>
    </div>
  );
};

export default EnrollClass;
