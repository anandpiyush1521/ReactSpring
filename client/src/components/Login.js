import React, { useState } from "react";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const [error, setError] = useState({});

  const handlesubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!input.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)) {
      validationErrors.email = "Please enter a valid email";
    }

    if (!input.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (
      input.password.length < 10 &&
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
        input.password
      )
    ) {
      validationErrors.password =
        "Password must be at least 10 characters and include at least one uppercase letter, one lowercase letter, and one number";
    }

    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      //write your login login here
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white ">
      <div className="flex items-center justify-center h-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-black-900">
              Login to read our Blogs..
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Or
              <a
                href="/register"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-200 dark:hover:text-blue-200"
              >
                {" "}
                create a new account
              </a>
            </p>
          </div>
          <form
            className="mt-8 space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
            onSubmit={handlesubmit}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Email address
                </label>
                <input
                  type="text"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  id="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {error.email && (
                  <span className="text-red-500 text-sm italic">
                    {error.email}
                  </span>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  id="password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="******************"
                />
                {error.password && (
                  <span className="text-red-500 text-sm italic">
                    {error.password}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
