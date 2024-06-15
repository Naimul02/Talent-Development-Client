import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "../../hooks/usePublicAxios";

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const axiosPublic = usePublicAxios();

  const { data: userInfo } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-36 mb-20">
        <h1 className="text-2xl font-bold mb-3">User Profile</h1>
        <div className="border hover:border-green-700 rounded-lg  ">
          <div className="flex items-center  h-full">
            <div className="p-4 w-[40%] h-full">
              <img
                src={userInfo?.image}
                alt=""
                className="h-[200px] w-full rounded-xl"
              />
            </div>

            <div className="pr-4 py-2 w-[60%] space-y-2">
              <h2 className="text-xl font-semibold capitalize text-red-800">
                Name : {userInfo?.name}
              </h2>
              <h2 className="text-lg">
                Role : {userInfo?.role ? userInfo.role : "Student"}
              </h2>
              <p className="text-xl">Email : {userInfo?.email}</p>
              <p className="text-xl">Phone : 018********</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
