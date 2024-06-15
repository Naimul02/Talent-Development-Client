import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
  instance.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      console.log("request stopped by interceptors", token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      console.log("status error in the interceptor : ", error);
      const status = error.response.status;
      if (status === 401 || status === 403) {
        logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

export default useAxiosSecure;
