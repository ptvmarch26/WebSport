import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

function LoginPage() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState({
    username: "",
    password: "",
  });
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    let usernameError = "";
    let passwordError = "";

    if (!username) {
      usernameError = "Tài khoản không được để trống";
    }

    if (!password) {
      passwordError = "Mật khẩu không được để trống";
    }

    if (usernameError || passwordError) {
      setError({ username: usernameError, password: passwordError });
    } else {
      setError({ username: "", password: "" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#e3e6ff] py-12 px-6 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl text-center mb-4 font-bold uppercase text-black">
          Đăng nhập
        </h1>
        <form
          action="#"
          method="POST"
          className="space-y-6"
          onSubmit={handleLogin}
        >
          <div className="animate__animated animate__fadeIn animate__delay-1s">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              Tài khoản
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                className="block w-full rounded-lg bg-white px-4 py-2 text-base text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent sm:text-base transition duration-300 transform hover:scale-105"
              />
            </div>
            {error.username && (
              <div className="text-red-600 text-sm mt-2">{error.username}</div>
            )}
          </div>

          <div className="animate__animated animate__fadeIn animate__delay-1s">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Mật khẩu
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={passwordShown ? "text" : "password"}
                autoComplete="current-password"
                className="block w-full rounded-lg bg-white px-4 py-2 text-base text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent sm:text-base transition duration-300 transform hover:scale-105"
              />
              <span
                onClick={togglePasswordVisiblity}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer transition duration-300 hover:scale-110"
              >
                {passwordShown ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>
            {error.password && (
              <div className="text-red-600 text-sm mt-2">{error.password}</div>
            )}
          </div>

          <div className="animate__animated animate__fadeIn animate__delay-1s">
            <Button
              type="submit"
              className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300 transform hover:scale-105"
            >
              Đăng nhập
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
