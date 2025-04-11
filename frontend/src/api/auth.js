import axiosInstance from "./axios";

export const createAccount = (data) =>
  axiosInstance.post("/create-account", data);

export const login = (data) => axiosInstance.post("/login", data);

export const getUser = () => axiosInstance.get("/get-user");
