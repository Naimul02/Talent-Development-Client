import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "../../hooks/usePublicAxios";
import Loading from "../../Shared/Loading/Loading";
import ClassesCard from "./ClassesCard";

const AllClasses = () => {
  const axiosPublic = usePublicAxios();
  const { data: classes, isLoading } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/classes");
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="max-w-7xl mx-auto py-20 mt-[100px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes?.map((singleClass) => (
         singleClass.status === 'accepted' &&  <ClassesCard
         key={singleClass._id}
         singleClass={singleClass}
       ></ClassesCard>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
