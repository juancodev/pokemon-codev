import React from "react";

type Users = {
  user: object | string[] | string;
  login: (userInformation: {
    email: string;
    password: string;
    token: string;
  }) => void;
  logout: () => void;
};

const AuthContext = React.createContext({});

const AuthProvider = ({ children }: childrenComponent): JSX.Element => {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    token: "",
  });

  const login = (userInformation = user) => {
    return setUser({
      ...user,
      email: userInformation.email,
      password: userInformation.password,
      token: userInformation.token,
    });
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

export default AuthProvider;
