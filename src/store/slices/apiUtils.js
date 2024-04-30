import axiosInstance from "../../axios/axiosInstance";
import { toast } from "react-toastify";
import { colors } from "../../assets/styled-components/global/theme";

export const apiRequestHandler = async (url, method, data, config) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      ...config
    });
    return response;
  } catch (error) {
    toastHandler(error?.response?.data,"error");
    throw error;
  }
};

export const toastHandler = (message, type) => {
  const backgroundColor = type === "success" ? colors.green : colors.red;
  toast[type](message, { backgroundColor, position: "top-center"  });
};
