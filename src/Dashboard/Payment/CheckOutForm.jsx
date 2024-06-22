import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = ({ price, singleClass, refetch }) => {
  console.log("singleClass", singleClass);
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  console.log("single class :  ", singleClass);

  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/create-payment-intent", {
          price: price,
          paymentInfo: singleClass,
        })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, price, singleClass]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log(paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const payment = {
          name: user?.displayName,
          email: user?.email,
          courseImage: singleClass?.image,
          courseName: singleClass?.title,
          price: price,
          date: new Date(),
          status: "pending",
          transactionId: paymentIntent.id,
          enrollClassId: singleClass?._id,
        };
        const res = await axiosSecure.post("/payments", payment);
        console.log("payment saved", res.data);
        if (res?.data?.insertedId) {
          // refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `thank you for the payment.`,
            showConfirmButton: false,
            timer: 1500,
          });
          const response = await axiosSecure.patch(
            `/enrollUpdate/${singleClass?._id}`
          );
          console.log(response.data);
          if (response.data) {
            navigate("/dashboard/enrollClass");
          }
        }
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="btn bg-teal-900 text-white px-5 hover:text-black mt-3"
      >
        Pay
      </button>
      <p className="text-red-600 mt-2">{error}</p>
      {transactionId && (
        <p className="text-green-600 mt-2">
          Your Transaction id : {transactionId}
        </p>
      )}
    </form>
  );
};

export default CheckOutForm;
