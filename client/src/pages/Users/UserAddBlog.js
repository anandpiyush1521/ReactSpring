import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import { WithContext as ReactTags } from 'react-tag-input';
import './style/reactTags.css';
function UserAddBlog() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    bannerFile: null,
    imageFile: null,
    sections: [],
  });
  const [banner, setBanner] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);  // State for image preview
  const [message, setMessage] = useState('');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (name === "imageFile") {
      // Set the image preview for the image file
      setImagePreview(URL.createObjectURL(file));
    }
    setFormData({ ...formData, [name]: file });
  };
  const handleDelete = (i) => {
    const newSections = formData.sections.filter((section, index) => index !== i);
    setFormData({ ...formData, sections: newSections });
  };
  const handleAddition = (tag) => {
    setFormData({ ...formData, sections: [...formData.sections, tag] });
  };
  const handleDrag = (tag, currPos, newPos) => {
    const newSections = formData.sections.slice();
    newSections.splice(currPos, 1);
    newSections.splice(newPos, 0, tag);
    setFormData({ ...formData, sections: newSections });
  };
  /*
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bannerPath = await uploadFile(formData.bannerFile);
      const imagePath = await uploadFile(formData.imageFile);
      const blogData = {
        ...formData,
        bannerPath,
        imagePath,
      };
      const response = await axios.post('/api/blogs', blogData);
      setMessage('Blog added successfully!');
      console.log(response.data);
    } catch (error) {
      setMessage('Error adding blog');
      console.error('Error:', error);
    }
  };
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log all the form data to the console
      console.log('Form Data:', formData);
      // Optionally log the banner and image file data as well if needed
      console.log('Banner:', banner);
      console.log('Image File:', formData.imageFile);
      setMessage('Blog added successfully!');
    } catch (error) {
      setMessage('Error adding blog');
      console.error('Error:', error);
    }
  };
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post('/api/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };
  // Function to handle the removal of the image preview
  const handleRemoveImage = () => {
    setImagePreview(null);  // Reset the image preview state
    setFormData({ ...formData, imageFile: null });  // Reset the formData imageFile
  };
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="relative px-8 py-4">
        <div className="container mx-auto p-8 md:max-w-5xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Add a New Blog</h2>
          <p className="text-gray-600 mb-8 text-lg">Share your thoughts and experiences with our community.</p>
          <div className="w-full h-96 bg-gray-300 flex items-center justify-center mb-8 rounded-lg shadow-md overflow-hidden">
            {banner ? (
              <div className="relative w-full h-full">
                <img
                  src={URL.createObjectURL(banner)}
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
              onChange={(e) => {
                setBanner(e.target.files[0]);
                handleFileChange(e);
              }}
            />
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-10 rounded-lg shadow-md space-y-8"
          >
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-auto">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                Content
              </label>
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline overflow-y-auto"
                style={{ height: '400px', borderRadius: '8px' }} // Increased height and ensured smooth border radius
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageFile">
                Image
              </label>
              <input
                type="file"
                name="imageFile"
                onChange={handleFileChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {imagePreview && (
                <div className="mt-4 flex justify-center items-center relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg shadow-md"  // Small image preview
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}  // Trigger the remove image function
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition duration-200"
                  >
                    X
                  </button>
                </div>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Sections</label>
              <ReactTags
                tags={formData.sections}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                inputFieldPosition="bottom"
                autocomplete
              />
            </div>
            
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110"
              >
                Submit
              </button>
            </div>
          </form>
          {message && <p className="mt-4 text-center text-lg text-red-600">{message}</p>}
        </div>
      </div>
    </div>
  );
}
export default UserAddBlog;