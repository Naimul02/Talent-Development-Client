import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";
import TeacherClassCard from "./TeacherClassCard";

const MyClass = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: teacherClasses,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["teacherClasses"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/teacherClasses/${user?.email}`);
      console.log("AMI KOI" , res.data);
      return res.data;
    },
  });
  console.log("teacherClasses", teacherClasses);

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="w-[85%] mx-auto my-10">
      <h1 className="text-2xl font-bold mb-3">My Class</h1>
      <div className="grid grid-cols-1 gap-4">
        {teacherClasses?.map((teacherClass) => (
          <TeacherClassCard
            refetch={refetch}
            key={teacherClass._id}
            teacherClass={teacherClass}
          ></TeacherClassCard>
        ))}
      </div>
    </div>
  );
};

export default MyClass;
