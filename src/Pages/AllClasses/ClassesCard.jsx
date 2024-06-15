import { Link } from "react-router-dom";

const ClassesCard = ({ singleClass }) => {
  console.log(singleClass);
  const { image, title, name, short_description, price, total_enrolment, _id } =
    singleClass;
  return (
    <div className="border hover:border-green-600">
      <img src={image} alt="" className="h-[260px] w-full object-cover" />
      <div className="space-y-2 p-3">
        <h1 className="text-2xl font-bold">{name}</h1>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-lg">{short_description.slice(0, 80)}...</p>
        <p className="text-lg text-pink-700 font-bold">${price}</p>
        <p className="text-lg">
          Total Enrolment :{" "}
          <span className="text-pink-700 text-lg font-bold">
            {total_enrolment ? total_enrolment : 0}
          </span>
        </p>
        <Link to={`/class/details/${_id}`}>
          <button className="btn btn-outline hover:bg-emerald-900 hover:text-white px-10 text-lg">
            Enroll
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ClassesCard;
