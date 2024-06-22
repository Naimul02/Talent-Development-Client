import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useLoaderData } from "react-router-dom";
import Loading from "../Shared/Loading/Loading";

const usePagination = (url) => {
  console.log("url vai", url);
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [datas, setDatas] = useState([]);
  const { loading, setLoading } = useContext(AuthContext);

  const { count } = useLoaderData();
  console.log("count vai re vai", count);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];
  useEffect(() => {
    axiosSecure
      .get(`${url}?page=${currentPage}&size=${itemsPerPage}`)
      .then((res) => {
        console.log("res.data", res.data);
        setDatas(res.data);
        setLoading(false);
      });
  }, [currentPage, itemsPerPage, setLoading, axiosSecure, url]);

  console.log("teachers vai ", datas);
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
  if (loading) {
    return <Loading></Loading>;
  }
  return [
    datas,
    handlePrevPage,
    pages,
    currentPage,
    setCurrentPage,
    handleNextPage,
    itemsPerPage,
    handleItemsPerPage,
  ];
};

export default usePagination;
