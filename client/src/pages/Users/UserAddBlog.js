import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';

function UserAddBlog() {
  const [sections, setSections] = useState([
    { type: 'title', content: '' },
    { type: 'heading', content: '' },
    { type: 'subheading', content: '' },
    { type: 'text', content: '' },
  ]);

  const handleChange = (index, event) => {
    const newSections = sections.map((section, i) => {
      if (i === index) {
        return { ...section, content: event.target.value };
      }
      return section;
    });
    setSections(newSections);
  };

  const addSection = (type) => {
    setSections([...sections, { type, content: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(sections);
    // You can now send the sections to your backend
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <PageTitle title="Add Blog" />
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Add a New Blog
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Share your thoughts and experiences with our community.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          {sections.map((section, index) => (
            <div key={index} className="mb-4">
              {section.type === 'title' && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                  <input
                    type="text"
                    value={section.content}
                    onChange={(e) => handleChange(index, e)}
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Blog Title"
                  />
                </div>
              )}
              {section.type === 'heading' && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Heading</label>
                  <input
                    type="text"
                    value={section.content}
                    onChange={(e) => handleChange(index, e)}
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Heading"
                  />
                </div>
              )}
              {section.type === 'subheading' && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subheading</label>
                  <input
                    type="text"
                    value={section.content}
                    onChange={(e) => handleChange(index, e)}
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Subheading"
                  />
                </div>
              )}
              {section.type === 'text' && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Content</label>
                  <textarea
                    value={section.content}
                    onChange={(e) => handleChange(index, e)}
                    rows="4"
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Write your content here..."
                  ></textarea>
                </div>
              )}
              {section.type === 'image' && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Image URL</label>
                  <input
                    type="text"
                    value={section.content}
                    onChange={(e) => handleChange(index, e)}
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Image URL"
                  />
                </div>
              )}
              {section.type === 'link' && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Link</label>
                  <input
                    type="text"
                    value={section.content}
                    onChange={(e) => handleChange(index, e)}
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Link"
                  />
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-between">
            {/* <button
              type="button"
              onClick={() => addSection('heading')}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Add Heading
            </button>
            <button
              type="button"
              onClick={() => addSection('subheading')}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Add Subheading
            </button>
            <button
              type="button"
              onClick={() => addSection('text')}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Add Content
            </button> */}
            <button
              type="button"
              onClick={() => addSection('image')}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Add Image
            </button>
            <button
              type="button"
              onClick={() => addSection('link')}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Add Link
            </button>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserAddBlog;
