import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import usePublicAxios from "../../../hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading/Loading";

const Feedback = () => {
  const axiosPublic = usePublicAxios();

  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users/feedback");
      console.log(res.data);

      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold text-center">Feedback</h2>
      </div>

      <div className="border flex gap5-">
        <div className="border border-red-500 h-36  w-[35%]">
          <img src="./pHero.png" alt="" className="w-full" />
        </div>

        <div className="border h-64 flex-1 w-[65%] flex justify-center">
          <Slider {...settings} className="w-full">
            {feedbacks &&
              feedbacks?.map((feedback) => (
                <div
                  key={feedback._id}
                  className="max-w-[70%] mx-auto text-center border-2 border-green-600"
                >
                  <div>
                    <div className="avatar">
                      <div className="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-semibold">{feedback?.name}</h2>
                    <h2 className="text-xl font-semibold">Class Title : </h2>
                    <p>{feedback?.description}</p>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
