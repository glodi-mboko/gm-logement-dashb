import Axios from "axios";

const userToken = localStorage.getItem("mosali");

const instance = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-type": "application/json",
    Authorization: `Bearer ${userToken}`,
  },
});

export default instance;
