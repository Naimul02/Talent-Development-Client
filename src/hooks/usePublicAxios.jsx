import axios from "axios";
const instance = axios.create({
  baseURL: "https://assignment-12-server-wine.vercel.app",
});
const usePublicAxios = () => {
  return instance;
};

export default usePublicAxios;
