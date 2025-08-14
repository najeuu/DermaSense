import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // ikon hamburger & close

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Scan', path: '/scan' },
    { name: 'Article', path: '/article' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-primary font-bold text-2xl md:text-2xl">
              DermaSense
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 relative">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <div key={item.name} className="relative">
                  <Link
                    to={item.path}
                    className={`font-medium transition-colors ${isActive ? 'text-primary' : 'text-gray-400 hover:text-teal-500'}`}
                  >
                    {item.name}
                  </Link>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded"></span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/login"
              className="w-[104px] h-[32px] px-[18px] py-[4px] border border-primary text-primary rounded-[9px] flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="w-[104px] h-[32px] px-[18px] py-[4px] bg-primary text-white rounded-[9px] flex items-center justify-center hover:brightness-90 transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-primary focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                    isActive ? 'text-primary' : 'text-gray-700 hover:text-teal-500'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="flex space-x-2 mt-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex-1 w-[104px] h-[32px] px-[18px] py-[4px] border border-primary text-primary rounded-[9px] flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="flex-1 w-[104px] h-[32px] px-[18px] py-[4px] bg-primary text-white rounded-[9px] flex items-center justify-center hover:brightness-90 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
