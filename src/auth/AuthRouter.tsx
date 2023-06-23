import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

const AuthRouter = ({ children }: childrenComponent) => {
  const userAuth = useAuth();

  if (!userAuth.user.isAuthenticated) {
    console.log(userAuth);
    return <Navigate to="/login" replace={true} />;
  }

  return <>{children}</>;
};

export { AuthRouter };
