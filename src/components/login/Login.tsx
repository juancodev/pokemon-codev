import React from "react";

const Login = () => {
  return (
    <>
      <div className="w-1/2 mt-2.5 max-sm:w-full max-sm:px-5">
        <h2 className="text-5xl text-white max-sm:text-2xl mb-7 font-normal">
          Login
        </h2>
        <form className="mb-5">
          <input
            type="email"
            placeholder="Email"
            className="form-email mb-5 rounded-md w-full"
            // onChange={(e) =>
            //   setFormValue({
            //     ...formValue,
            //     email: e.target.value,
            //   })
            // }
          />
          <input
            type="password"
            placeholder="Password"
            className="form-password mb-5 rounded-md w-full"
            // onChange={(e) =>
            //   setFormValue({
            //     ...formValue,
            //     password: e.target.value,
            //     isAuthenticated: true,
            //   })
            // }
          />
          <div>
            <input
              type="checkbox"
              name=""
              id="check"
              className="form-checkbox max-sm:hidden"
            />
            <p className="inline-block ml-3 font-light max-sm:w-full max-sm:m-0 max-sm:text-lg max-sm:text-center">
              ¿Olvidaste tu contraseña?
            </p>
          </div>
          {/* <Button /> */}
        </form>
      </div>
    </>
  );
};

export { Login };
