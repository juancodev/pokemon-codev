import React from "react";
import { useAuth } from "./AuthContext";

const AuthRouter = ({ children }: childrenComponent) => {
  const userAuth = useAuth();

  console.log(userAuth);
  return <div>AuthRouter</div>;
};

export { AuthRouter };
