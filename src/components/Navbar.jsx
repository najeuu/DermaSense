import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, History } from 'lucide-react';
import profileImg from '../assets/images/profil.png';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn] = useState(true); 

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Scan', path: '/scan' },
    { name: 'Article', path: '/article' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary md:text-2xl">
              DermaSense
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="relative hidden space-x-8 md:flex">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <div key={item.name} className="relative">
                  <Link
                    to={item.path}
                    className={`font-medium transition-colors ${
                      isActive ? 'text-primary' : 'text-gray-400 hover:text-teal-500'
                    }`}
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

          {/* Desktop Right Section */}
          <div className="items-center hidden space-x-4 md:flex">
            {isLoggedIn ? (
              <>
                <button className="text-gray-600 hover:text-primary">
                  <Bell size={20} />
                </button>
                <button className="text-gray-600 hover:text-primary">
                  <History size={20} />
                </button>
                <img src={profileImg} alt="User" className="object-cover w-8 h-8 rounded-full" />
              </>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center md:hidden">
            <button onClick={toggleMenu} className="text-primary focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-white shadow-md md:hidden">
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

            {/* Mobile Auth / Logged In */}
            {isLoggedIn ? (
              <div className="flex items-center mt-3 space-x-3">
                <button className="text-gray-600 hover:text-primary">
                  <Bell size={20} />
                </button>
                <button className="text-gray-600 hover:text-primary">
                  <History size={20} />
                </button>
                <img
                  src={profileImg}
                  alt="User"
                  className="object-cover w-8 h-8 rounded-full"
                />
              </div>
            ) : (
              <div className="flex mt-2 space-x-2">
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
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;