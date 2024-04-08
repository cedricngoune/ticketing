import axios from "axios";

const buildClient = ({ req }) => {
  //Server side
  if (typeof window === "undefined") {
    return axios.create({
      baseURL: "ticketing-app-prod.xyz",
      headers: req.headers,
    });
  } else {
    // client side
    return axios.create({
      baseURL: "/",
    });
  }
};
export default buildClient;
