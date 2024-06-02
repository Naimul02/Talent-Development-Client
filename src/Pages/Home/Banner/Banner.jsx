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
        className="mySwiper max-w-7xl mx-auto rounded-xl"
      >
        <SwiperSlide>
          <div>
            <div className="max-h-[500px]">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/opengraph/1x1.png?blend=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1503676260728-1c00da094a0b%3Fblend%3D000000%26blend-alpha%3D10%26blend-mode%3Dnormal%26crop%3Dfaces%252Cedges%26h%3D630%26mark%3Dhttps%253A%252F%252Fimages.unsplash.com%252Fopengraph%252Fsearch-input.png%253Fh%253D84%2526txt%253Dquality%252Beducation%2526txt-align%253Dmiddle%25252Cleft%2526txt-clip%253Dellipsis%2526txt-color%253D000000%2526txt-pad%253D80%2526txt-size%253D40%2526txt-width%253D660%2526w%253D750%2526auto%253Dformat%2526fit%253Dcrop%2526q%253D60%26mark-align%3Dmiddle%252Ccenter%26mark-w%3D750%26w%3D1200%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixid%3DM3wxMjA3fDB8MXxzZWFyY2h8NHx8cXVhbGl0eSUyMGVkdWNhdGlvbnxlbnwwfHx8fDE3MTcxMTk5OTV8MA%26ixlib%3Drb-4.0.3&blend-w=1&h=630&mark=https%3A%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-align=top%2Cleft&mark-pad=50&mark-w=64&w=1200&auto=format&fit=crop&q=60"
                alt=""
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <div className="max-h-[600px]">
              <img
                className="w-full h-full object-cover"
                src="https://static.vecteezy.com/system/resources/previews/036/730/498/non_2x/ai-generated-red-apple-on-top-of-four-books-with-background-free-photo.jpg"
                alt=""
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <div className="max-h-[600px]">
              <img
                className="w-full h-full object-cover"
                src="https://media.istockphoto.com/id/1468140092/photo/happy-elementary-students-raising-their-hands-on-a-class-at-school.webp?b=1&s=170667a&w=0&k=20&c=UUOuFShFZNLSiy0kYvy504-jVPMr8S_7hhNp40z8m44="
                alt=""
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <div className="max-h-[600px]">
              <img
                className="w-full h-full object-cover"
                src="https://t3.ftcdn.net/jpg/06/21/74/12/360_F_621741288_iUc3CdlWSifKlBp3uQlpgOm0Egvk6gcX.jpg"
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