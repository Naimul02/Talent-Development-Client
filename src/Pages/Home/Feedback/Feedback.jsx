import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../../../Shared/Loading/Loading";

import usePublicAxios from "../../../hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";

const Feedback = () => {
  const axiosPublic = usePublicAxios();
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const res = await axiosPublic.get("/feedback");
      console.log("feedback", res.data);
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
        <h2 className="text-3xl font-bold text-center mb-10">Feedback</h2>
      </div>

      <div className="flex gap-4 lg:gap-0 px-3 lg:px-0 flex-col md:flex-row lg:flex-row justify-around">
        <div className="h-[280px]">
          <img
            src="https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/16/8f/56/168f5609-3c3a-e0d9-db98-6303b95c86f8/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:h-64  w-[full] lg:w-[60%] flex justify-center">
          <Slider {...settings} className="w-full h-full">
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
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
