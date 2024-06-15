import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa";
import { GiSchoolBag } from "react-icons/gi";
import { MdAssuredWorkload } from "react-icons/md";
import { PiExamFill } from "react-icons/pi";

const Learning = () => {
  return (
    <div className="py-20 max-w-6xl mx-auto">
      <div className="max-w-3xl mx-auto space-y-5 mb-20">
        <h1 className="text-center text-4xl font-bold">
          Let the journey of organizing your own learning begin
        </h1>
        <p className="text-xl text-center">
          Go to the section of your choice to learn anything on any subject
        </p>
      </div>

      <div className="grid md:grid-cols-2  gap-12">
        <div className="flex border hover:border-green-700 rounded-lg  h-[150px] items-center justify-between  px-6">
          <div className="flex">
            <div>
              <GiSchoolBag className="text-5xl text-pink-700" />
            </div>

            <div className="pl-4">
              <h2 className="text-2xl font-bold">Class 5-12</h2>
              <p className="text-lg">Free Video , Live Class</p>
            </div>
          </div>

          <div>
            <FaAngleRight className="text-2xl font-bold" />
          </div>
        </div>
        <div className="flex border hover:border-green-700 rounded-lg  h-[150px] items-center justify-between  px-6">
          <div className="flex">
            <div>
              <BsFillRocketTakeoffFill className="text-5xl text-red-800" />
            </div>

            <div className="pl-4">
              <h2 className="text-2xl font-bold">Skills</h2>
              <p className="text-lg">English, Freelancing , skills and IT</p>
            </div>
          </div>

          <div>
            <FaAngleRight className="text-2xl font-bold" />
          </div>
        </div>
        <div className="flex border hover:border-green-700 rounded-lg  h-[150px] items-center justify-between  px-6">
          <div className="flex">
            <div>
              <PiExamFill className="text-5xl text-pink-700" />
            </div>

            <div className="pl-4">
              <h2 className="text-2xl font-bold">Admission Test</h2>
              <p className="text-lg">University , Medical</p>
            </div>
          </div>

          <div>
            <FaAngleRight className="text-2xl font-bold" />
          </div>
        </div>
        <div className="flex border hover:border-green-700 rounded-lg  h-[150px] items-center justify-between  px-6">
          <div className="flex">
            <div>
              <MdAssuredWorkload className="text-5xl text-blue-700" />
            </div>

            <div className="pl-4">
              <h2 className="text-2xl font-bold">Job Preparation</h2>
              <p className="text-lg">BCS , BANK job , Government Job </p>
            </div>
          </div>

          <div>
            <FaAngleRight className="text-2xl font-bold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;
