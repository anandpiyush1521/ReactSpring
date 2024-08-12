import React from 'react';
import PageTitle from '../components/PageTitle';
import Banner from '../components/Banner';

function Home() {
  return (
    <div className="relative">
      <Banner />
      <PageTitle title="Home" />
      <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2016/08/23/15/01/board-1614646_1280.jpg')" }}>
        <div className="w-full max-w-4xl p-8 bg-white bg-opacity-70 rounded-lg shadow-lg">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Welcome to Vichar<u>Stream</u>
          </h3>
          <p className="text-lg text-center text-gray-700 mb-6">
            Your one-stop solution for managing your blogs effortlessly.
            Explore our features and get started with your journey today!
          </p>
          <div className="flex justify-center">
            <a
              href="/login"
              className="px-6 py-2 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;