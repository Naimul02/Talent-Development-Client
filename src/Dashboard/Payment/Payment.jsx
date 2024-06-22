import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "../../hooks/usePublicAxios";
import Loading from "../../Shared/Loading/Loading";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
  const { id } = useParams();
  const axiosPublic = usePublicAxios();

  const {
    data: singleClass,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["singleClass"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/class/${id}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="mt-40 mb-36 px-4 lg:px-20">
      <Elements stripe={stripePromise}>
        <CheckOutForm
          price={singleClass?.price}
          singleClass={singleClass}
          refetch={refetch}
        ></CheckOutForm>
      </Elements>
    </div>
  );
};

export default Payment;
