import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import EnrollCard from "./EnrollCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EnrollClass = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: enrollClasses = [], isLoading } = useQuery({
    queryKey: ["enrollClass"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      console.log("payments", res.data);
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
        {enrollClasses.length > 0 ? (
          enrollClasses?.map((enrollClass) => (
            <EnrollCard
              key={enrollClass._id}
              enrollClass={enrollClass}
            ></EnrollCard>
          ))
        ) : (
          <p className="text-xl font-semibold text-green-600">
            Enroll class are not available
          </p>
        )}
      </div>
    </div>
  );
};

export default EnrollClass;
