import React from "react";
import { useNavigate } from "react-router-dom";

type Users = {
  user: {
    email: string;
    password: string;
    token: string;
    isAuthenticated: boolean;
  };
  login: (userInformation: {
    email: string;
    password: string;
    token: string;
    isAuthenticated: boolean;
  }) => void;
  logout: () => void;
};

const AuthContext = React.createContext<Users>({
  user: {
    email: "",
    password: "",
    token: "",
    isAuthenticated: false,
  },
  login: (data) => {
    data?.email, data?.password, data?.token, data?.isAuthenticated;
  },
  logout: () => undefined,
});

const AuthProvider = ({ children }: childrenComponent): JSX.Element => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    token: "",
    isAuthenticated: false,
  });

  const login = (userInformation = user) => {
    return [
      setUser({
        ...user,
        email: userInformation.email,
        password: userInformation.password,
        token: userInformation.token,
        isAuthenticated: userInformation.isAuthenticated,
      }),
      navigate("/"),
    ];
  };

  const logout = () => {
    return setUser({
      ...user,
      email: "",
      password: "",
      token: "",
    });
  };

  const auth: Users = { user, login, logout };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const auth = React.useContext(AuthContext);
  return auth;
};

export { AuthContext, AuthProvider, useAuth };
