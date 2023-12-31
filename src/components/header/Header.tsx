import { useState } from "react";
import logo from "../../assets/logo-monoma.png";
import { useAuth } from "../../auth/AuthContext";

const Header = ({ children }: childrenComponent): JSX.Element => {
  const [showBox, setShowBox] = useState<boolean>(false);

  const auth = useAuth();

  const containerShow = () => {
    if (!showBox) {
      setShowBox(true);
    } else {
      setShowBox(false);
    }
  };

  const logoutUser = () => {
    auth.logout();
  };

  return (
    <>
      <div className="flex h-20 items-center justify-between bg-[#088BED] p-4">
        <div className="h-full">
          <img src={logo} alt="" className="h-[inherit]" />
        </div>
        <div className="text-lg font-bold text-white" onClick={containerShow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-10 w-10 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        {showBox ? (
          <>
            <div className="absolute right-0 top-20 border-t bg-[#088BED] p-3 text-end text-lg text-white">
              <div className="mb-1 border-b pb-1 font-medium">
                {auth.user.email}
              </div>
              <div className="cursor-pointer" onClick={logoutUser}>
                Logout
              </div>
            </div>
          </>
        ) : null}
      </div>
      {children}
    </>
  );
};

export { Header };
