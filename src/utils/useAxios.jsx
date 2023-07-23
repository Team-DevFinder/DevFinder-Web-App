import axios from "axios";
import dayjs from "dayjs";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import { baseURL } from "./config";

export const useAxios = () => {
  const { authTokens, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async (config) => {
    const user = jwtDecode(authTokens?.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1; //expiration time - current time
    console.log("isExp: ", isExpired);
    if (!isExpired) {
      return config;
    }

    try {
      const response = await axios.post(`${baseURL}/api/token/refresh/`, {
        refresh: authTokens?.refresh,
      });
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      config.headers.Authorization = `Bearer ${response.data.access}`;
      return config;
    } catch (error) {
      console.log(error);
      // handle error
    }

    // const response = await axios.post(`${baseURL}/api/token/refresh/`, {refresh : authTokens?.refresh});
    // localStorage.setItem("authTokens", JSON.stringify(response.data));

    // setAuthTokens(response.data);

    // config.headers.Authorization = `Bearer ${response.data.access}`;
    // return config;
  });

  return axiosInstance;
};
