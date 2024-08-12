import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0">
            <a href="/" className="flex items-center">
            <img
              src="https://res.cloudinary.com/dth5ysuhs/image/upload/v1722406188/hbuiv9gdo9rbkhty2jkh.png"
              className="h-12"
              style={{ width: '250px', height: 'auto' }}
              alt="PayerUps Logo"
            />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">
                Follow us
              </h2>
              <ul className="text-gray-400">
                <li className="mb-4">
                  <a
                    href="https://github.com/anandpiyush1521/ReactSpring"
                    target="_blank"
                    className="hover:underline"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.com/channels/1241762441801629696/1241762441801629699"
                    target="_blank"
                    className="hover:underline"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
              <ul className="text-gray-400">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Connect</h2>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.556c-.883.392-1.83.656-2.825.775a4.925 4.925 0 0 0 2.163-2.724 9.847 9.847 0 0 1-3.13 1.195 4.92 4.92 0 0 0-8.384 4.483A13.978 13.978 0 0 1 1.671 3.149a4.919 4.919 0 0 0 1.523 6.573 4.902 4.902 0 0 1-2.229-.616c-.054 2.283 1.581 4.415 3.905 4.887a4.935 4.935 0 0 1-2.224.084 4.928 4.928 0 0 0 4.604 3.417A9.868 9.868 0 0 1 0 21.544a13.9 13.9 0 0 0 7.548 2.211c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0 0 24 4.557z" />
                  </svg>
                  <span className="sr-only">Twitter page</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.615 3.184a.845.845 0 0 0-.523-.529 8.376 8.376 0 0 0-2.4-.645c-.962-.07-3.845-.07-3.845-.07s-2.884 0-3.845.07a8.376 8.376 0 0 0-2.4.645.845.845 0 0 0-.523.529A8.27 8.27 0 0 0 3 7.615v8.769a8.27 8.27 0 0 0 .615 4.431.845.845 0 0 0 .523.529c.756.28 3.257.69 6.862.69 3.607 0 6.108-.411 6.862-.69a.845.845 0 0 0 .523-.529A8.27 8.27 0 0 0 21 16.385V7.615a8.27 8.27 0 0 0-.615-4.431zM9.615 15.385V8.615l6.846 3.385-6.846 3.385z" />
                  </svg>
                  <span className="sr-only">YouTube page</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.312 3.608.84.975.525 1.758 1.228 2.588 2.057.83.83 1.532 1.613 2.057 2.588.527.975.777 2.242.84 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.312 2.633-.84 3.608-.525.975-1.228 1.758-2.057 2.588-.83.83-1.613 1.532-2.588 2.057-.975.527-2.242.777-3.608.84-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.312-3.608-.84-.975-.525-1.758-1.228-2.588-2.057-.83-.83-1.532-1.613-2.057-2.588-.527-.975-.777-2.242-.84-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.312-2.633.84-3.608.525-.975 1.228-1.758 2.057-2.588C7.56 2.175 8.343 1.473 9.318.947c.975-.527 2.242-.777 3.608-.84C8.416 2.175 8.796 2.163 12 2.163zm0 1.622c-3.142 0-3.517.011-4.759.068-1.236.056-2.018.288-2.659.478-.7.204-1.312.514-1.941 1.143-.628.628-.939 1.24-1.143 1.941-.19.641-.422 1.423-.478 2.659-.057 1.242-.068 1.617-.068 4.759s.011 3.517.068 4.759c.056 1.236.288 2.018.478 2.659.204.7.514 1.312 1.143 1.941.628.628 1.24.939 1.941 1.143.641.19 1.423.422 2.659.478 1.242.057 1.617.068 4.759.068s3.517-.011 4.759-.068c1.236-.056 2.018-.288 2.659-.478.7-.204 1.312-.514 1.941-1.143.628-.628.939-1.24 1.143-1.941.19-.641.422-1.423.478-2.659.057-1.242.068-1.617.068-4.759s-.011-3.517-.068-4.759c-.056-1.236-.288-2.018-.478-2.659-.204-.7-.514-1.312-1.143-1.941-.628-.628-1.24-.939-1.941-1.143-.641-.19-1.423-.422-2.659-.478-1.242-.057-1.617-.068-4.759-.068zm0 2.252c2.854 0 5.168 2.315 5.168 5.168 0 2.854-2.315 5.168-5.168 5.168S6.832 12.037 6.832 9.183 9.147 5.037 12 5.037zm0 1.64a3.528 3.528 0 0 0-3.528 3.528A3.528 3.528 0 0 0 12 13.732a3.528 3.528 0 0 0 3.528-3.528A3.528 3.528 0 0 0 12 6.677zm5.247-.883a1.316 1.316 0 1 0 1.316 1.316 1.316 1.316 0 0 0-1.316-1.316z" />
                  </svg>
                  <span className="sr-only">Instagram page</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-center text-sm text-gray-400">
            &copy; 2024 Vichar<u>Stream</u>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
