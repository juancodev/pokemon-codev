import React from "react";
import { useNavigate } from "react-router-dom";

type Users = {
  user: object | string[] | string;
  login: (userInformation: {
    email: string;
    password: string;
    token: string;
  }) => void;
  logout: () => void;
};

const AuthContext = React.createContext<Users>({
  user: {},
  login: (data) => {
    data?.email, data?.password, data?.token;
  },
  logout: () => undefined,
});

const AuthProvider = ({ children }: childrenComponent): JSX.Element => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    token: "",
  });

  const login = (userInformation = user) => {
    return [
      setUser({
        ...user,
        email: userInformation.email,
        password: userInformation.password,
        token: userInformation.token,
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
