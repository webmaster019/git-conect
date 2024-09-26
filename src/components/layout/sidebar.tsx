import React from "react";

const Sidebar = () => {
  return (
      <div className="w-64  bg-gray-800 sm:none">
          {/* Sidebar Header */}
          <div className="flex items-center justify-center h-16 bg-gray-900 border-b border-gray-700">
              <h1 className="text-white text-2xl font-bold">Dashboard</h1>
          </div>

          {/* Sidebar Links */}
          <nav className="mt-5">
              <ul>
                  <li>
                      <a href="#" className="block py-2.5 px-4 text-white hover:bg-gray-700">
                          Home
                      </a>
                  </li>
                  <li>
                      <a href="#" className="block py-2.5 px-4 text-white hover:bg-gray-700">
                          Projects
                      </a>
                  </li>
                  <li>
                      <a href="#" className="block py-2.5 px-4 text-white hover:bg-gray-700">
                          Reports
                      </a>
                  </li>
              </ul>
          </nav>
      </div>
  )
}
export default Sidebar
