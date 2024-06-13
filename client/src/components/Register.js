import React from 'react'
import Navbar from './Navbar';

function Register() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
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
              <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg">
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                      Email address
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="******************"
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="repeat_password" className="block mb-2 text-sm font-medium text-gray-900">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="repeat_password"
                      id="repeat_password"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="******************"
                    />
                  </div>
                  <div className="flex space-x-2 mb-5">
                    <div className="w-1/2">
                      <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">
                        First name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="First name"
                      />
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2 mb-5">
                    <div className="w-1/2">
                      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                        Phone number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="123-456-7890"
                      />
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Enter your address"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Submit
                  </button>
                  <p className="mt-3 text-black">
                    Already registered? <a href="/login" className="text-blue-700 hover:underline">Login here</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
}

export default Register
