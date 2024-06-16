import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../../../Shared/Loading/Loading";
import usePublicAxios from "../../../hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";

const Feedback = () => {
  const axiosPublic = usePublicAxios();

  const { data: feedbacks, isLoading } = useQuery({
    queryKey: ["feedbacks"],
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

      <div className="border flex gap-5">
        <div className="border border-red-500 h-36  w-[35%]">
          <img
            src="https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/16/8f/56/168f5609-3c3a-e0d9-db98-6303b95c86f8/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg"
            alt=""
            className="w-full h-full"
          />
        </div>

        <div className="border h-64 flex-1 w-[65%] flex justify-center">
          <Slider {...settings} className="w-full">
            {feedbacks &&
              feedbacks?.map((feedback) => {
                return (
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
                      <h2 className="text-2xl font-semibold">
                        {feedback?.name}
                      </h2>
                      <h2 className="text-xl font-semibold">Class Title : </h2>
                      <p>{feedback?.description}</p>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
