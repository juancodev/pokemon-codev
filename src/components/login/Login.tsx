import { useState, FormEvent, useRef } from "react";
import { useAuth } from "../../auth/AuthContext";
import { Button } from "../button/Button";

type FormValues = {
  email: string;
  password: string;
  token?: string;
};

type FormElement = FormEvent<HTMLFormElement>;

const Login = (): JSX.Element => {
  const userAuth = useAuth();

  const [formValue, setFormValue] = useState<FormValues>({
    email: "",
    password: "",
    token: "",
  });

  const [token, setToken] = useState<string>(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imptb250aWxsYUBnbWFpbC5jb20iLCJwYXNzd29yZCI6InBhc3N3b3JkIn0.D3uHrypFBzkj3dcJuqNGXRGCXgRnO1lzpkRQuCdodwQ"
  );
  const inputPassword = useRef<HTMLInputElement>(null);

  localStorage.setItem("token", token);

  const lookPassword = () => {
    if (inputPassword.current?.type == "password") {
      inputPassword.current.type = "text";
    } else {
      if (inputPassword.current) {
        inputPassword.current.type = "password";
      }
    }
  };

  const handleSubmit = (event: FormElement) => {
    event.preventDefault();
    userAuth.login({
      email: formValue.email,
      password: formValue.password,
      token: token,
    });
    console.log(formValue);
  };

  return (
    <>
      <div className="mt-2.5 h-[70%] w-3/5 rounded bg-slate-50 p-3 max-sm:w-full max-sm:px-5">
        <h2 className="mb-7 text-5xl font-medium text-[#088BED] max-sm:text-2xl">
          Login
        </h2>
        <form className="relative mb-5" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="mb-5 w-full rounded-md"
            required
            onChange={(e) =>
              setFormValue({
                ...formValue,
                email: e.target.value,
              })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-5 w-full rounded-md"
            required
            onChange={(e) =>
              setFormValue({
                ...formValue,
                password: e.target.value,
              })
            }
            ref={inputPassword}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute right-[5%] top-[35%] h-6 w-6 cursor-pointer"
            onClick={lookPassword}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          <Button />
        </form>
      </div>
    </>
  );
};

export { Login };
