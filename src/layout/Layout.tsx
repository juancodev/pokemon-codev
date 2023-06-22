import React from "react";
import frontPageImage from "../assets/pokemon2.jpg";
import logo from "../assets/logo-monoma.png";

const Layout = ({ children }: childrenComponent): JSX.Element => {
  return (
    <>
      <div className="full-screen:max-h-full max-h-full max-w-full bg-amber-400 px-24 py-20 max-sm:px-9 max-sm:py-14">
        <div className="grid max-h-full rounded-3xl bg-[#088BED] max-sm:grid-cols-1 max-sm:grid-rows-1 lg:grid-cols-2">
          <div className="container-logo">
            <div className="max-md:hidden">
              <img className="mr-0 w-1/2 pl-7 pt-8" src={logo} />
            </div>
            <div className="mt-7 text-center uppercase max-md:mb-5 max-md:ml-5 max-md:text-start">
              <h3 className="text-2xl font-bold text-white max-md:text-sm">
                Welcome to{" "}
                <span className="text-yellow-400">Pokemon-Codev</span>
              </h3>
            </div>
            <div className="flex h-3/5 flex-col items-center justify-center">
              <>{children}</>
            </div>
          </div>
          <div className="max-sm:h-full max-sm:w-full md:w-full">
            <img
              src={frontPageImage}
              alt="Image"
              className="full-screen:w-full max-sm:h-full max-sm:w-full max-sm:object-cover md:w-full xl:w-full"
            />
          </div>
        </div>
        <p className="full-screen:hidden absolute bottom-[10%] left-[25%] right-[52%] text-base font-light text-white max-lg:hidden lg:hidden xl:block">
          Terms & conditions
        </p>
      </div>
    </>
  );
};

export { Layout };
