import axios from "axios";

// use proxy in development environment
const instance = axios.create(
  process.env.NODE_ENV === "development" && {
    baseURL: "http://localhost:5000/",
  }
);

export default instance;
