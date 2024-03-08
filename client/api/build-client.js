import axios from "axios";

const buildClient = ({ req }) => {
  //Server side
  if (typeof window === "undefined") {
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
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
