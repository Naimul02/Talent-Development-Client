import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import usePublicAxios from "../../../../hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Classes = () => {
  const axiosPublic = usePublicAxios();
  const { data: classes } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosPublic.get("/classes");
      // console.log(res.data);

      return res.data;
    },
  });
  const descendingSort = classes?.sort(
    (a, b) => b.total_enrolment - a.total_enrolment
  );
  // console.log("hello vai :", descendingSort);

  return (
    <div className="my-16 bg-slate-100 py-20 px-20">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold text-center">Our Classes</h1>
        <p className="max-w-5xl mx-auto text-center">
          The class is a blueprint that defines a nature of a future object. An
          instance is a specific object created from a particular class. Classes
          are used to create and manage new objects and support inheritance—a
        </p>
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {descendingSort?.slice(0, 10)?.map((singleClass) => {
          return (
            <SwiperSlide key={singleClass._id}>
              {singleClass.status === "accepted" && (
                <div className="card border  hover:border-green-600">
                  <figure>
                    <img
                      src={singleClass?.image}
                      alt="Shoes"
                      className="h-[250px] w-full object-cover"
                    />
                  </figure>
                  <div className="p-4 space-y-1">
                    <h2 className="text-lg font-bold">{singleClass?.name}</h2>
                    <h2 className="text-xl font-semibold">
                      {singleClass?.title}
                    </h2>
                    <p className="text-lg">
                      {singleClass?.short_description.slice(0, 50)}...
                    </p>
                    <p className="text-lg text-pink-700 font-bold">
                      ${singleClass.price}
                    </p>
                    <p className="text-lg">
                      Total Enrolment :{" "}
                      <span className="text-pink-700 text-lg font-bold">
                        {singleClass.total_enrolment
                          ? singleClass.total_enrolment
                          : 0}
                      </span>
                    </p>
                    <Link to={`/class/details/${singleClass._id}`}>
                      <button className="btn btn-outline hover:bg-emerald-900 hover:text-white px-10 text-lg">
                        Enroll
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Classes;
