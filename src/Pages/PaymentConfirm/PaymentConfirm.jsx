import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import usePublicAxios from "../../hooks/usePublicAxios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const PaymentConfirm = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const axiosPublic = usePublicAxios();
  const navigate = useNavigate();

  const { data: singleClass, isLoading } = useQuery({
    queryKey: ["singleClass"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/class/${id}`);
      return res.data;
    },
  });

  // const handlePayment = async () => {
  //   // TODO: ---------
  //   console.log("data ascheki na? : ", singleClass);
  //   const paymentInfo = {
  //     courseName: singleClass.title,
  //     totalPrice: singleClass.price,
  //     studentName: user?.displayName,
  //     studentImage: user?.photoURL,
  //     studentEmail: user?.email,
  //     courseImage: singleClass?.image,
  //   };
  //   const res = await axiosPublic.post("/payment", paymentInfo);
  //   console.log(res.data);
  //   if (res.data.insertedId) {
  //     Swal.fire({
  //       position: "top-end",
  //       icon: "success",
  //       title: "Your payment has been  Successfully",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //     const response = await axiosPublic.patch(`/enrollUpdate/${id}`);
  //     console.log(response.data);
  //     if(response.data){

  //       navigate("/dashboard/enrollClass");
  //     }
  //   }
  // };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="mt-[150px] mb-[150px] max-w-5xl mx-auto">
      <div className="flex items-center gap-10">
        {/* card */}
        <div className="border hover:border-green-700 rounded-lg w-[55%]  h-[150px]">
          <div className="flex items-center  h-full">
            <div className="p-4 h-full">
              <img
                src={singleClass?.image}
                alt=""
                className="h-full rounded-xl"
              />
            </div>

            <div className="px-4">
              <h2 className="text-2xl">{singleClass?.title}</h2>
              <p className="text-xl">
                Price :{" "}
                <span className="text-xl font-bold text-red-900">
                  ${singleClass?.price}
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* payment */}

        <div className="w-[45%]">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold">{singleClass?.title}</h2>
            <p className="text-lg font-semibold py-4">
              Price : ${singleClass?.price}
            </p>
            <hr />
            <p className="text-xl font-semibold py-4">
              Total Price : ${singleClass?.price}
            </p>
            <Link to={`/payment/${id}`}>
              <button className="btn bg-green-800 text-white hover:bg-green-900 w-full">
                Payment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirm;
