import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  console.log("useAdmin", user);
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      console.log("useAdmin ", res.data);

      return res.data.admin;
    },
  });
  return [isAdmin, isLoading];
};

export default useAdmin;
