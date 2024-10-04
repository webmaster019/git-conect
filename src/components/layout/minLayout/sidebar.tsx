import React from 'react';

const Sidebar = () => {
  return (
    <div className='sm:none w-64 bg-gray-800'>
      {/* Sidebar Header */}
      <div className='flex h-16 items-center justify-center border-b border-gray-700 bg-gray-900'>
        <h1 className='text-2xl font-bold text-white'>Dashboard</h1>
      </div>

      {/* Sidebar Links */}
      <nav className='mt-5'>
        <ul>
          <li>
            <a
              href='#'
              className='block px-4 py-2.5 text-white hover:bg-gray-700'
            >
              Home
            </a>
          </li>
          <li>
            <a
              href='#'
              className='block px-4 py-2.5 text-white hover:bg-gray-700'
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href='#'
              className='block px-4 py-2.5 text-white hover:bg-gray-700'
            >
              Reports
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Sidebar;
