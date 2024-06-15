import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useTeacher = () => {
  const { user, loading } = useContext(AuthContext);
  console.log("useAdmin", user);
  const axiosSecure = useAxiosSecure();

  const { data: isTeacher, isLoading } = useQuery({
    queryKey: ["isTeacher"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/teacher/${user?.email}`);
      console.log("useTeacher ", res.data);

      return res.data.teacher;
    },
  });
  return [isTeacher, isLoading];
};

export default useTeacher;