import axios from 'axios';
import { removeAuthUser } from '../store/slices/authSlice';
import { toast } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: backendUrl,
});

const handleErrorResponse = (error, dispatch) => {
  if (error?.response?.status === 500 ) {
    toast.error("Something went wrong");
    localStorage.clear();
    dispatch(removeAuthUser());
    window.location.href = "/";
  }

  return Promise.reject(error);
};


// Request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

axiosInstance.interceptors.response.use(
  function (response) {

    return response;
  },
  function (error) {
    return handleErrorResponse(error, axiosInstance.defaults.dispatch); 
  }
);

export default axiosInstance;
