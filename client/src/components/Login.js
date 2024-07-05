import React, { useState } from "react";
import PageTitle from "./PageTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_CRYPTOJS_SECRET_KEY;

//console.log("Secret Key:", SECRET_KEY); //debugging line

function Login() {
  const navigate = useNavigate();
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
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = {};

    if (!input.email.trim()) {
      validationError.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)) {
      validationError.email = "Please enter a valid email";
    }

    if (!input.password.trim()) {
      validationError.password = "Password is required";
    } else if (
      input.password.length < 10 ||
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(input.password)
    ) {
      validationError.password =
        "Password must be at least 10 characters and include at least one uppercase letter, one lowercase letter, and one number";
    }

    setError(validationError);

    if (Object.keys(validationError).length === 0) {
      try {
        const response = await axios.post("http://localhost:8080/api/payerup/login", input);
        setMessage("Login Successful");
        setMessageType('success');

        //console.log("API response data:", response.data); // Debugging line

        const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(response.data), SECRET_KEY).toString();
        
        //console.log("Encrypted user data:", encryptedUser); // Debugging line

        localStorage.setItem('user', encryptedUser);

        // Reset form
        setInput({
          email: "",
          password: "",
        });

        // Store user data in local storage
        // localStorage.setItem('user', JSON.stringify(response.data));
        navigate("/user/home");

      } catch (error) {
        setMessage("Login Failed: " + (error.response?.data || error.message));
        setMessageType('error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <PageTitle title="Login" />
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
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
          onSubmit={handleSubmit}
        >
        {message && (
            <div className={`text-center text-md  mt-4 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </div>
         )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-black rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="example@gmail.com"
                required
              />
              {error.email && (
                <span className="text-red-500 text-xs italic">
                  {error.email}
                </span>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={input.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-black rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                required
              />
              {error.password && (
                <span className="text-red-500 text-xs italic">
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
                href="/forgot-password"
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

          <div className="flex items-center justify-center space-x-4 mt-4">
            <button
              type="button"
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="48px"
                height="48px"
              >
                <path
                  fill="#4285F4"
                  d="M24 9.5c2.68 0 5.08 1.04 6.93 2.73l5.17-5.18C32.38 4.27 28.39 2.5 24 2.5 14.97 2.5 7.54 8.76 5.21 17h6.54c1.71-4.45 5.95-7.5 12.25-7.5z"
                />
                <path
                  fill="#34A853"
                  d="M24 44.5c5.67 0 10.42-1.87 13.9-5.09L31.4 33.6C29.61 34.75 27.39 35.5 24 35.5 18.86 35.5 14.41 32.38 12.64 27.25h-6.51v5.75C9.56 38.25 16.18 44.5 24 44.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M40.27 22H24v8.5h9.52c-1.09 2.94-4.33 5-9.52 5-5.95 0-10.79-4.74-10.79-10.5S18.05 14.5 24 14.5c2.91 0 5.47 1.04 7.5 2.76l5.99-5.99C34.92 7.84 29.76 5.5 24 5.5 14.28 5.5 6.5 12.74 6.5 21s7.78 15.5 17.5 15.5c10.41 0 15.5-7.13 15.5-14.14 0-.96-.1-1.82-.23-2.86z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
              Sign in with Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.326 3.438 9.8 8.205 11.385.6.111.82-.26.82-.577v-2.18c-3.338.724-4.033-1.416-4.033-1.416-.546-1.385-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.242 1.84 1.242 1.07 1.835 2.809 1.305 3.495.998.108-.774.418-1.305.76-1.606-2.665-.303-5.467-1.335-5.467-5.93 0-1.31.467-2.381 1.235-3.221-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.4 11.4 0 0 1 3.003-.404 11.38 11.38 0 0 1 3.003.404c2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.78.84 1.245 1.91 1.245 3.221 0 4.61-2.805 5.625-5.475 5.92.43.37.81 1.102.81 2.225v3.293c0 .322.225.697.825.577C20.565 22.092 24 17.61 24 12.297 24 5.67 18.63.297 12 .297z"
                />
              </svg>
              Sign in with GitHub
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
