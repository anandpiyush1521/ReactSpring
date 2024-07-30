import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function UserAddBlog() {
  const [sections, setSections] = useState([
    { type: "title", content: "" },
    { type: "text", content: "" },
    { type: "image", content: "" },
  ]);
  const [banner, setBanner] = useState(null);

  const handleChange = (index, value) => {
    const newSections = sections.map((section, i) => {
      if (i === index) {
        return { ...section, content: value };
      }
      return section;
    });
    setSections(newSections);
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBanner(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newSections = sections.map((section, i) => {
        if (i === index) {
          return { ...section, content: URL.createObjectURL(file) };
        }
        return section;
      });
      setSections(newSections);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      banner,
      sections: sections.map((section) => ({
        type: section.type,
        content: section.content,
      })),
    };

    console.log(formData);
    // Here, you can send formData to your backend using a POST request
    // For example, using fetch or axios
    // fetch('/api/blog', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="relative px-8 py-4">
        <div className="container mx-auto p-8 md:max-w-5xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Add a New Blog
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Share your thoughts and experiences with our community.
          </p>

          <div className="w-full h-96 bg-gray-300 flex items-center justify-center mb-8 rounded-lg shadow-md overflow-hidden">
            {banner ? (
              <div className="relative w-full h-full">
                <img
                  src={banner}
                  alt="Banner"
                  className="w-full h-full object-cover rounded-lg shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105"
                />
                <button
                  onClick={() => setBanner(null)}
                  className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition-all duration-300"
                >
                  Change Banner
                </button>
              </div>
            ) : (
              <label
                htmlFor="banner-upload"
                className="flex flex-col items-center justify-center h-full w-full bg-blue-100 border-4 border-dashed border-blue-400 rounded-lg cursor-pointer hover:bg-blue-200 hover:border-blue-500 transition-colors"
              >
                <div className="flex flex-col items-center animate-bounce">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 15a4 4 0 00.88 2.62l4.72-4.71a2 2 0 112.83 2.83L6.83 20H21a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v3"
                    />
                  </svg>
                  <span className="mt-2 text-base text-blue-600 font-semibold">
                    Click to Upload Banner
                  </span>
                </div>
              </label>
            )}
            <input
              type="file"
              accept="image/*"
              id="banner-upload"
              hidden
              onChange={handleBannerUpload}
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-10 rounded-lg shadow-md space-y-8"
          >
            {sections.map((section, index) => (
              <div key={index} className="space-y-6">
                {section.type === "title" && (
                  <div>
                    <label
                      htmlFor={`section-${index}`}
                      className="block text-lg font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id={`section-${index}`}
                      name={`section-${index}-title`}
                      value={section.content}
                      onChange={(e) => handleChange(index, e.target.value)}
                      className="w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
                      placeholder="Enter Blog Title"
                    />
                  </div>
                )}
                {section.type === "text" && (
                  <div>
                    <label
                      htmlFor={`section-${index}`}
                      className="block text-lg font-medium text-gray-700"
                    >
                      Content
                    </label>
                    <ReactQuill
                      value={section.content}
                      onChange={(value) => handleChange(index, value)}
                      className="w-full px-4 py-4  border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg h-80"
                      placeholder="Write your content here..."
                    />
                  </div>
                )}
                {section.type === "image" && (
                  <div>
                    <label
                      htmlFor={`section-${index}`}
                      className="block text-lg font-medium text-gray-700"
                    >
                      Image Upload
                    </label>
                    <input
                      type="file"
                      id={`section-${index}`}
                      name={`section-${index}-image`}
                      accept="image/*"
                      onChange={(e) => handleImageUpload(index, e)}
                      className="w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
                    />
                    {section.content && (
                      <img
                        src={section.content}
                        alt="Preview"
                        className="mt-4 w-full h-auto rounded-lg shadow-md transition-all duration-500 ease-in-out transform hover:scale-105"
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full px-6 py-4 text-lg font-medium text-center text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-300"
            >
              Publish Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserAddBlog;
