import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageTitle from "./PageTitle";

function Register() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
    repeat_password: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
  });

  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [timer, setTimer] = useState(120); // Set timer to 2 minutes (120 seconds)
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading spinner

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleRegister = async (e) => {
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

    if (!input.repeat_password.trim()) {
      validationErrors.repeat_password = "Please confirm your password";
    } else if (input.repeat_password !== input.password) {
      validationErrors.repeat_password = "Passwords do not match";
    }

    if (!input.first_name.trim()) {
      validationErrors.first_name = "First name is required";
    }
    if (!input.last_name.trim()) {
      validationErrors.last_name = "Last name is required";
    }

    if (!input.phone.trim()) {
      validationErrors.phone = "Phone number is required";
    } else if (input.phone.length < 10) {
      validationErrors.phone = "Please enter a valid phone number";
    }

    if (!input.address.trim()) {
      validationErrors.address = "Address is required";
    }

    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true); // Show loading spinner
        await axios.post("http://localhost:8080/api/payerup/register", input);
        setMessage(
          "Registration successful. Please check your email for the OTP."
        );
        setMessageType("success");
        setRegisteredEmail(input.email); // Store the email used for registration
        setShowOtpModal(true);
        setTimer(120); // Reset timer to 2 minutes

        // Start countdown timer
        const countdown = setInterval(() => {
          setTimer((prev) => {
            if (prev === 1) {
              clearInterval(countdown);
            }
            return prev - 1;
          });
        }, 1000);

        // Reset form
        setInput({
          email: "",
          password: "",
          repeat_password: "",
          first_name: "",
          last_name: "",
          phone: "",
          address: "",
        });
      } catch (error) {
        setMessage(
          "Registration failed: " +
            (error.response ? error.response.data : error.message)
        );
        setMessageType("error");
      } finally {
        setLoading(false); // Hide loading spinner
      }
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post("http://localhost:8080/api/payerup/verify", null, {
        params: {
          email: registeredEmail,
          otp: otp,
        },
      });
      setMessage("Verification successful. Your account has been created.");
      setMessageType("success");
      setShowOtpModal(false);
      navigate("/login");
    } catch (error) {
      setMessage(
        "Verification failed: " +
          (error.response ? error.response.data : error.message)
      );
      setMessageType("error");
    }
  };

  const handleCancelOtp = () => {
    setShowOtpModal(false);
    setMessage("Registration Failed, Register again !!!");
    setMessageType("error");
    setTimer(0); // Set timer to 0 to instantly cancel countdown
    setInput({
      email: "",
      password: "",
      repeat_password: "",
      first_name: "",
      last_name: "",
      phone: "",
      address: "",
    });
  };
  

  useEffect(() => {
    if (timer === 0) {
      setShowOtpModal(false);
      setMessage("OTP expired. Please try registering again.");
      setMessageType("error");
    }
  }, [timer]);

  return (
    <div className="min-h-screen bg-gray-900 text-white" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2016/08/23/15/01/board-1614646_1280.jpg')" }}>
      <PageTitle title="Register" />
      <div className="flex items-center justify-center h-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Create an account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-100">
              Or
              <a
                href="/login"
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                {" "}
                login to read Blogs
              </a>
            </p>
          </div>
          <form
            className="mt-8 space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
            onSubmit={handleRegister}
            style={{ backgroundImage: "url('https://img.freepik.com/free-vector/flat-geometric-background_23-2148974368.jpg?size=626&ext=jpg&ga=GA1.1.58708776.1721575645&semt=ais_user')" }}
          >
            {message && (
              <div
                className={`text-center text-md mt-4 ${
                  messageType === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </div>
            )}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700"
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
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  id="password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300  placeholder-gray-500 text-gray-900  rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="******************"
                />
                {error.password && (
                  <span className="text-red-500 text-sm italic">
                    {error.password}
                  </span>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="repeat_password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="repeat_password"
                  value={input.repeat_password}
                  onChange={handleChange}
                  id="repeat_password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="******************"
                />
                {error.repeat_password && (
                  <span className="text-red-500 text-sm italic">
                    {error.repeat_password}
                  </span>
                )}
              </div>
              <div className="flex space-x-2 mb-5">
                <div className="w-1/2">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={input.first_name}
                    onChange={handleChange}
                    id="first_name"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="First name"
                  />
                  {error.first_name && (
                    <span className="text-red-500 text-sm italic">
                      {error.first_name}
                    </span>
                  )}
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={input.last_name}
                    onChange={handleChange}
                    id="last_name"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Last name"
                  />
                  {error.last_name && (
                    <span className="text-red-500 text-sm italic">
                      {error.last_name}
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={input.phone}
                  onChange={handleChange}
                  id="phone"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Phone Number"
                />
                {error.phone && (
                  <span className="text-red-500 text-sm italic">
                    {error.phone}
                  </span>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700"
                >
                  Address
                </label>
                <textarea
                  name="address"
                  value={input.address}
                  onChange={handleChange}
                  id="address"
                  rows="2"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Address"
                ></textarea>
                {error.address && (
                  <span className="text-red-500 text-sm italic">
                    {error.address}
                  </span>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loading} // Disable button when loading
              >
                {loading ? ( // Show loading spinner when loading
                  <div className="flex items-center space-x-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    <span>Registering...</span>
                  </div>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showOtpModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Enter OTP
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Please enter the OTP sent to your email address.
                      </p>
                      <div className="mt-4">
                        <input
                          type="text"
                          value={otp}
                          onChange={handleOtpChange}
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                          placeholder="Enter OTP"
                        />
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Time remaining: {timer} seconds
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleVerifyOtp}
                >
                  Verify OTP
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={handleCancelOtp}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
