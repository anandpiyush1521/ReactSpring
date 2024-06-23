import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleRequestOtp = async () => {
    try {
      await axios.post("http://localhost:8080/api/payerup/request-otp", { email });
      setMessage("OTP sent to your email.");
      setMessageType("success");
      setStep(2);
    } catch (error) {
      setMessage(
        "Failed to send OTP: " + (error.response?.data || error.message)
      );
      setMessageType("error");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const requestBody = {
        otp,
        user: {
          email,
          password: newPassword,
        },
      };

      await axios.post("http://localhost:8080/api/payerup/verify-otp", requestBody);
      setMessage("Password reset successfully.");
      setMessageType("success");
      setStep(3);
      navigate("/login");
    } catch (error) {
      setMessage(
        "Failed to reset password: " + (error.response?.data || error.message)
      );
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email to receive an OTP.
          </p>
        </div>
        {step === 1 && (
          <form
            className="mt-8 space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
            onSubmit={(e) => {
              e.preventDefault();
              handleRequestOtp();
            }}
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
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-black rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Request OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form
            className="mt-8 space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
            onSubmit={(e) => {
              e.preventDefault();
              handleVerifyOtp();
            }}
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
                  htmlFor="otp"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-black rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-black rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
