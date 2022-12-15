import Axios from "axios";

const instance = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-type": "application/json",
  },
});

export default instance;
