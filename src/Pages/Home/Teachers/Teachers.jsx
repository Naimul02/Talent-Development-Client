const Teachers = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="card card-side  h-[400px]  rounded-lg">
        <div className="w-[40%] h-full rounded-lg">
          <img
            src="https://sitescdn.wearevennture.co.uk/public/spencer-clarke-group/site/live/uploads/5005001.png"
            alt="Movie"
            className="h-full w-full p-4 object-cover rounded-lg"
          />
        </div>
        <div className="w-[60%] flex items-center pl-10">
          <div>
            <h1 className="text-2xl font-bold">Naimul Islum</h1>
            <h2 className="text-xl font-semibold">Instructor</h2>
            <p className="mt-6 mb-4 text-lg ">
              A teacher, also called a schoolteacher or formally an educator, is
              a person who helps students to acquire knowledge, competence, or
              virtue, via the practice of teaching. A teacher, also called a
              schoolteacher or formally an educator, is a person who helps
              students to acquire knowledge, competence, or virtue, via the
              practice of teaching.
            </p>
            <button className="btn btn-outline w-[300px]">
              Start Teaching Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
