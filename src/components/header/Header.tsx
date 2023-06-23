import React from "react";
import logo from "../../assets/logo-monoma.png";

const Header = ({ children }: childrenComponent): JSX.Element => {
  return (
    <>
      <div className="flex h-20 items-center justify-between bg-[#088BED] p-4">
        <div className="h-full">
          <img src={logo} alt="" className="h-[inherit]" />
        </div>
        <div className="text-lg text-white">
          <p>email@gmail.com</p>
        </div>
      </div>
      {children}
    </>
  );
};

export { Header };
