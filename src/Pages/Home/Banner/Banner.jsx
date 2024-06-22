import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";

const Banner = () => {
  return (
    <>
      <Swiper
        rewind={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper  mt-[100px]"
      >
        <SwiperSlide>
          <div className="h-[250px] w-full lg:h-[550px]">
            <div className="h-full w-full">
              <img
                className="w-full h-full"
                src="https://images.unsplash.com/opengraph/1x1.png?blend=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1503676260728-1c00da094a0b%3Fblend%3D000000%26blend-alpha%3D10%26blend-mode%3Dnormal%26crop%3Dfaces%252Cedges%26h%3D630%26mark%3Dhttps%253A%252F%252Fimages.unsplash.com%252Fopengraph%252Fsearch-input.png%253Fh%253D84%2526txt%253Dquality%252Beducation%2526txt-align%253Dmiddle%25252Cleft%2526txt-clip%253Dellipsis%2526txt-color%253D000000%2526txt-pad%253D80%2526txt-size%253D40%2526txt-width%253D660%2526w%253D750%2526auto%253Dformat%2526fit%253Dcrop%2526q%253D60%26mark-align%3Dmiddle%252Ccenter%26mark-w%3D750%26w%3D1200%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixid%3DM3wxMjA3fDB8MXxzZWFyY2h8NHx8cXVhbGl0eSUyMGVkdWNhdGlvbnxlbnwwfHx8fDE3MTcxMTk5OTV8MA%26ixlib%3Drb-4.0.3&blend-w=1&h=630&mark=https%3A%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-align=top%2Cleft&mark-pad=50&mark-w=64&w=1200&auto=format&fit=crop&q=60"
                alt=""
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[250px] w-full lg:h-[550px]">
            <div className="h-full w-full">
              <img
                className="w-full h-full"
                src="https://wallpapercave.com/wp/wp3191443.jpg"
                alt=""
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[250px] w-full lg:h-[550px]">
            <div className="h-full w-full">
              <img
                className="w-full h-full"
                src="https://watermark.lovepik.com/photo/40147/6937.jpg_wh1200.jpg"
                alt=""
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[250px] w-full lg:h-[550px]">
            <div className="h-full w-full">
              <img
                className="w-full h-full"
                src="https://png.pngtree.com/background/20231030/original/pngtree-illustration-of-a-laptop-computer-displaying-an-online-course-representing-the-picture-image_5792396.jpg"
                alt=""
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
