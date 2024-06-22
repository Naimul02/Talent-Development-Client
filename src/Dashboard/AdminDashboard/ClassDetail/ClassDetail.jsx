import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { useParams } from "react-router-dom";

const ClassDetail = () => {
  const { classTitle } = useParams();
  console.log(classTitle);
  const axiosSecure = useAxiosSecure();
  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/feedback/${classTitle}`);
      console.log(res.data);
      return res.data;
    },
  });

  return (
    <div className="p-10">
      <div>
        <h2 className="text-2xl font-bold mb-2">Feedback</h2>
      </div>
    {/* feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {reviews &&
          reviews?.map((feedback) => {
            return (
              <div
                key={feedback._id}
                className="text-center h-full border py-6 px-3"
              >
                <div className="">
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={feedback?.image} />
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold capitalize">
                    {feedback?.name}
                  </h2>
                  <h2 className="text-xl font-semibold">
                    Title : {feedback?.classTitle}{" "}
                  </h2>
                  <p>{feedback?.description}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ClassDetail;
