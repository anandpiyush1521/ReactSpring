import React from 'react';
import PageTitle from '../components/PageTitle';

function About() {
  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2016/08/23/15/01/board-1614646_1280.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Overlay to improve text visibility */}
      
      <PageTitle title="About Us" />

      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl p-10 bg-white bg-opacity-90 rounded-lg shadow-xl transform transition-all hover:scale-105">
          <h3 className="text-5xl font-semibold text-center text-gray-900 mb-8">
            About Vichar<u>Stream</u>
          </h3>
          <p className="text-xl text-center text-gray-700 mb-6">
            VicharStream is a platform designed to help you manage your blogs effortlessly. Our mission is to provide a seamless and intuitive experience for bloggers of all levels.
          </p>
          <p className="text-xl text-center text-gray-700 mb-6">
            With VicharStream, you can create, edit, and publish your blogs with ease. Our platform offers a variety of features to enhance your blogging experience, including rich text editing, media management, and analytics.
          </p>
          <p className="text-xl text-center text-gray-700 mb-8">
            Join our community of bloggers today and start sharing your thoughts with the world!
          </p>

          <div className="flex justify-center mt-8">
            <a
              href="/contact"
              className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;