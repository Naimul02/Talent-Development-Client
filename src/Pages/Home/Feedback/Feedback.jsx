import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Feedback = () => {
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

        <div className="border h-64 flex-1 w-[65%]">
          <Slider {...settings} className="w-full">
            <div>
              <div className="max-w-[70%] mx-auto text-center border-2 border-green-600">
                <div>
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold">Naimul Islum</h2>
                  <h2 className="text-xl font-semibold">Class Title : </h2>
                  <p>
                    {" "}
                    Your satisfaction is our top priority, and we would greatly
                    appreciate your feedback on your experience
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
