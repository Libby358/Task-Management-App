import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-600">
                TaskMaster
              </Link>
            </div>
            <nav className="ml-6 flex items-center space-x-4">
              <Link
                to="/tasks"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Tasks
              </Link>
              {/* Add more navigation links as needed */}
            </nav>
          </div>
          <div className="flex items-center">
            {/* Add user account or other controls here */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;