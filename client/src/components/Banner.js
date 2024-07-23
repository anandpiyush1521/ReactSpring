import React, { useState, useEffect } from 'react';

function Banner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isBannerClosed = localStorage.getItem('bannerClosed');
    if (isBannerClosed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('bannerClosed', 'true');
  };

  return (
    isVisible && (
      <div
        id="sticky-banner"
        tabIndex="-1"
        className="fixed top-0 left-0 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
      >
        <div className="flex items-center mx-auto">
          <p className="flex items-center text-sm font-normal">
            <span className="inline-flex p-1 me-3 bg-gray-200 rounded-full bg-opacity-30 w-6 h-6 items-center justify-center flex-shrink-0">
              <svg
                className="w-3 h-3 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 19"
              >
                <path d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
              </svg>
              <span className="sr-only">Light bulb</span>
            </span>
            <span>
              New brand identity has been launched for the{' '}
              <a
                href="/n"
                className="inline font-medium text-yellow-200 underline decoration-yellow-300 hover:no-underline"
              >
                <i>payerUps</i>
              </a>
            </span>
          </p>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleDismiss}
            data-dismiss-target="#sticky-banner"
            type="button"
            className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-300 hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm p-1.5 transition-colors duration-200"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close this permanently</span>
          </button>
        </div>
      </div>
    )
  );
}

export default Banner;
