import { useEffect } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

export default () => {
  const { makeRequest } = useRequest({
    url: "/api/users/logout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    makeRequest();
  }, []);
  return <div>Signing out ...</div>;
};
