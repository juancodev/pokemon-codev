import React from "react";
import frontPageImage from "../assets/pokemon2.jpg";
import logo from "../assets/logo-monoma.png";

type childrenComponent = {
  children: JSX.Element[] | JSX.Element;
};

const Layout = ({ children }: childrenComponent): JSX.Element => {
  return (
    <>
      <div className="max-w-full max-h-full full-screen:max-h-full max-sm:px-9 max-sm:py-14 py-20 px-24 bg-[#5F636785]">
        <div className="max-h-full grid lg:grid-cols-2 max-sm:grid-cols-1 max-sm:grid-rows-1 bg-[#088BED] rounded-3xl">
          <div className="container-logo">
            <div className="max-md:hidden">
              <img className="pt-8 pl-7 mr-0 w-1/2" src={logo} />
            </div>
            <div className="text-center uppercase mt-7 max-md:text-start max-md:ml-5 max-md:mb-5">
              <h3 className="text-2xl max-md:text-sm font-bold text-white">
                Welcome to{" "}
                <span className="text-yellow-400">Pokemon-Codev</span>
              </h3>
            </div>
            <div className="flex flex-col items-center">{children}</div>
          </div>
          <div className="container-img max-sm:w-full max-sm:h-full md:w-full">
            <img
              src={frontPageImage}
              alt="Image"
              className="max-sm:h-full max-sm:w-full max-sm:object-cover md:w-full xl:w-full full-screen:w-full"
            />
          </div>
        </div>
        <p className="absolute max-lg:hidden lg:hidden xl:block full-screen:hidden bottom-[10%] right-[52%] left-[25%] font-light text-base text-white">
          Terms & conditions
        </p>
      </div>
    </>
  );
};

export { Layout };
