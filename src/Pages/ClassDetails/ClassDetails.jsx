import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";

const ClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: singleClass, isLoading } = useQuery({
    queryKey: ["singleClass"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/${id}`);
      console.log(res.data);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  console.log("class", singleClass, id);

  return (
    <div className="hero py-24">
      <div className="hero-content flex-col lg:flex-row gap-16">
        <div className="w-[40%] h-[500px] border">
          <img src={singleClass.image} alt="" className="h-full object-cover" />
        </div>
        <div className="w-[60%]">
          <h1 className="text-3xl font-bold">
            Teacher Name : {singleClass?.name}
          </h1>
          <h2 className="text-2xl font-bold">
            Course Name: {singleClass?.title}
          </h2>
          <p className="py-6">
            {singleClass.short_description} Enhance your Excel skills with
            advanced functions and data analysis techniques.Enhance your Excel
            skills with advanced functions and data analysis techniques.
          </p>
          <p className="text-xl">
            Total Enrolment : {singleClass?.total_enrolment}
          </p>
          <p className="text-xl font-bold">
            Price : <span className="text-red-800">${singleClass?.price}</span>
          </p>
          <Link to={`/paymentConfirm/${id}`}>
            <button className="btn px-10 mt-4 btn-outline hover:bg-cyan-950 hover:text-white">
              Payment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
