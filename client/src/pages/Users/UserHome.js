import React from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_CRYPTOJS_SECRET_KEY;

function UserHome() {
  const navigate = useNavigate();
  const encryptedUser = localStorage.getItem('user');
  let user = null;

  if (encryptedUser) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedUser, SECRET_KEY);
      const decryptedUser = bytes.toString(CryptoJS.enc.Utf8);
      console.log("Decrypted user data:", decryptedUser); // Debugging line
      user = JSON.parse(decryptedUser);
    } catch (e) {
      console.error("Decryption failed: ", e);
      localStorage.removeItem('user');
      navigate('/login');
      return null;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <PageTitle title={`Welcome , ${user.first_name}`} />
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Welcome, {user.first_name}!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            You are logged in as {user.email}
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={handleLogout}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 dark:bg-red-500 dark:hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
