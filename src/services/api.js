import Axios from "axios";

const userToken = localStorage.getItem("mosali");
const url =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BASE_URL_PROD
    : process.env.REACT_APP_BASE_URL;

const instance = Axios.create({
  baseURL: url,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-type": "application/json",
    Authorization: `Bearer ${userToken}`,
  },
});

export default instance;
