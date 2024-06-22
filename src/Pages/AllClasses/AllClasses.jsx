import Loading from "../../Shared/Loading/Loading";
import ClassesCard from "./ClassesCard";
import { useLoaderData } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const AllClasses = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const { count } = useLoaderData();
  console.log("count", count);
  const [classes, setClasses] = useState([]);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  useEffect(() => {
    fetch(
      `https://assignment-12-server-wine.vercel.app/classes?page=${currentPage}&size=${itemsPerPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
        setLoading(false);
      });
  }, [currentPage, itemsPerPage, setLoading]);

  if (loading) {
    return <Loading></Loading>;
  }

  const handleItemsPerPage = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(0);
  };
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="max-w-7xl mx-auto py-20  mt-[50px] lg:mt-[100px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-3 lg:px-0">
        {classes?.map(
          (singleClass) =>
            singleClass.status === "accepted" && (
              <ClassesCard
                key={singleClass._id}
                singleClass={singleClass}
              ></ClassesCard>
            )
        )}
      </div>
      <div className="text-center mt-6">
        <button className="btn mr-2" onClick={handlePrevPage}>
          Prev
        </button>
        {pages?.map((page) => (
          <button
            className={`${
              currentPage === page
                ? "btn bg-orange-600 hover:text-black text-white"
                : undefined
            } btn mr-2`}
            key={page}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button className="btn ml-2" onClick={handleNextPage}>
          Next
        </button>
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPage}
          name=""
          id=""
          className="ml-2 border-2 py-[10px] px-3 rounded-lg"
        >
          <option value="6">6</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default AllClasses;
