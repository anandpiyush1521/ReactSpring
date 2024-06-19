import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from './PageTitle';
import axios from 'axios';


function Register() {
    const navigate = useNavigate();

    const [input, setInput] = useState({
      email: "",
      password: "",
      repeat_password: "",
      first_name: "",
      last_name: "",
      phone: "",
      address: ""
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setInput({
        ...input,
        [name]: value
      });
    };

    const [error, setError] = useState({});
    const[message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleRegister = async (e) => {
      e.preventDefault();

      const validationErrors = {};

      if(!input.email.trim()){
        validationErrors.email = "Email is required";
      }else if(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)){
        validationErrors.email = "Please enter a valid email";
      }

      if(!input.password.trim()){
        validationErrors.password = "Password is required";
      }else if(input.password.length<10 && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(input.password)){
        validationErrors.password = "Password must be at least 10 characters and include at least one uppercase letter, one lowercase letter, and one number";
      }

      if(!input.repeat_password.trim()){
        validationErrors.repeat_password = "Please confirm your password";
      }else if(input.repeat_password !== input.password){
        validationErrors.repeat_password = "Passwords do not match";
      }

      if(!input.first_name.trim()){
        validationErrors.first_name = "First name is required";
      }
      if(!input.last_name.trim()){
        validationErrors.last_name = "Last name is required";
      }

      if(!input.phone.trim()){
        validationErrors.phone = "Phone number is required";
      }else if(input.phone.length < 10){
        validationErrors.phone = "Please enter a valid phone number";
      }

      if(!input.address.trim()){
        validationErrors.address = "Address is required";
      }

      setError(validationErrors);

      if(Object.keys(validationErrors).length === 0){
        // console.log("Form submitted succesfully", input);
        // navigate("/login");
        try {
          const response = await axios.post('http://localhost:8080/api/users/register', input);
          setMessage('Registration successful');
          setMessageType('success');

          // Reset form
          setInput({
            email: '',
            password: '',
            repeat_password: '',
            first_name: '',
            last_name: '',
            phone: '',
            address: '',
          });
        } catch (err) {
          setMessage('Registration failed: ' + err.response.data);
          setMessageType('error');
        }
      }

    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
        <PageTitle title="Regsiter" />
          <div className="flex items-center justify-center h-full py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white-900">
                  Create an account
                </h2>
                <p className="mt-2 text-center text-sm text-white-600">
                  Or
                  <a href="/login" className="font-medium text-blue-200 hover:text-blue-200">
                    {" "}login to read Blogs
                  </a>
                </p>
              </div>
              <form className="mt-8 space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg" onSubmit={handleRegister}>
              {message && (
                  <div className={`text-center text-md  mt-4 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    {message}
                  </div>
              )}
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
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
                    {error.email && <span className="text-red-500 text-sm italic">{error.email}</span>}
                  </div>
                  <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
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
                    {error.password && <span className="text-red-500 text-sm italic">{error.password}</span>}
                  </div>
                  <div className="mb-5">
                    <label htmlFor="repeat_password" className="block mb-2 text-sm font-medium text-white">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="repeat_password"
                      value={input.repeat_password}
                      onChange={handleChange}
                      id="repeat_password"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="******************"
                    />
                    {error.repeat_password && <span className="text-red-500 text-sm italic">{error.repeat_password}</span>}
                  </div>
                  <div className="flex space-x-2 mb-5">
                    <div className="w-1/2">
                      <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-white">
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
                      {error.first_name && <span className="text-red-500 text-sm italic">{error.first_name}</span>}
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-white">
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
                      {error.last_name && <span className="text-red-500 text-sm italic">{error.last_name}</span>}
                    </div>
                  </div>
                  <div className="flex space-x-2 mb-5">
                    <div className="w-1/2">
                      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-white">
                        Phone number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={input.phone}
                        onChange={handleChange}
                        id="phone"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="123-456-7890"
                      />
                      {error.phone && <span className="text-red-500 text-sm italic">{error.phone}</span>}
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="address" className="block mb-2 text-sm font-medium text-white">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={input.address}
                        onChange={handleChange}
                        id="address"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Enter your address"
                      />
                      {error.address && <span className="text-red-500 text-sm italic">{error.address}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Register
                  </button>
                  <p className="mt-3 text-white">
                    Already registered? <a href="/login" className="text-blue-300 hover:underline">Login here</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
}

export default Register
