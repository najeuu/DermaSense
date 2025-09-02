import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Bell,
  History,
  Home,
  Search,
  Newspaper,
  ScanLine,
  Clock,
  BookOpen,
  AlertTriangle,
  Settings,
  LogIn,
  UserPlus,
  LogOut,
} from 'lucide-react';
import { getProfile } from '../utils/axiosConfig';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'scan_result',
      title: 'Hasil Scan Siap',
      message: 'Hasil analisis kulit Anda sudah tersedia',
      time: '2 menit yang lalu',
      isRead: false,
      urgent: false,
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Kontrol Rutin',
      message: 'Saatnya check-up rutin, sudah 2 bulan sejak scan terakhir',
      time: '1 jam yang lalu',
      isRead: false,
      urgent: false,
    },
    {
      id: 3,
      type: 'article',
      title: 'Artikel Baru',
      message: '5 Tanda Awal Melanoma yang Harus Diwaspadai',
      time: '3 jam yang lalu',
      isRead: true,
      urgent: false,
    },
    {
      id: 4,
      type: 'urgent',
      title: 'Perhatian Khusus',
      message: 'Hasil scan menunjukkan area yang perlu konsultasi dokter',
      time: '1 hari yang lalu',
      isRead: false,
      urgent: true,
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (token) fetchProfile();
  }, [location.pathname]);

  const fetchProfile = async () => {
    try {
      const profile = await getProfile();
      setUserData(profile);
    } catch {
      setUserData(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const getInitials = (name, email) => {
    if (name) return name.charAt(0).toUpperCase();
    if (email) return email.charAt(0).toUpperCase();
    return 'U';
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'scan_result':
        return <ScanLine className="w-5 h-5 text-primary" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'article':
        return <BookOpen className="w-5 h-5 text-green-500" />;
      case 'urgent':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'system':
        return <Settings className="w-5 h-5 text-gray-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-primary font-bold text-2xl">
            DermaSense
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['/', '/scan', '/article'].map((path, idx) => {
              const names = ['Home', 'Scan', 'Article'];
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`font-medium transition-colors ${
                    isActive ? 'text-primary' : 'text-gray-400 hover:text-teal-500'
                  }`}
                >
                  {names[idx]}
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-1">
            {isLoggedIn ? (
              <>
                {/* History */}
                <Link to="/history" className="p-2 text-gray-600 hover:text-primary">
                  <History className="w-5 h-5" />
                </Link>

                {/* Notification */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setNotificationOpen(!notificationOpen);
                      setDropdownOpen(false);
                    }}
                    className="p-2 text-gray-600 hover:text-primary relative"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>

                  {notificationOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
                      <div className="px-4 py-3 border-b flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-900">
                          Notifikasi {unreadCount > 0 && `(${unreadCount})`}
                        </h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-primary hover:underline"
                          >
                            Tandai semua dibaca
                          </button>
                        )}
                      </div>

                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notif) => (
                            <div
                              key={notif.id}
                              onClick={() => markAsRead(notif.id)}
                              className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                                !notif.isRead ? 'bg-blue-50' : ''
                              } ${notif.urgent ? 'border-l-4 border-l-red-500' : ''}`}
                            >
                              <div className="flex items-start space-x-3">
                                {getNotificationIcon(notif.type)}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <p
                                      className={`text-sm font-medium ${
                                        notif.urgent ? 'text-red-700' : 'text-gray-900'
                                      }`}
                                    >
                                      {notif.title}
                                    </p>
                                    {!notif.isRead && (
                                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center">
                            <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Tidak ada notifikasi saat ini</p>
                          </div>
                        )}
                      </div>

                      {notifications.length > 0 && (
                        <div className="px-4 py-2 border-t bg-gray-50">
                          <button className="text-sm text-primary hover:underline w-full text-center">
                            Lihat semua notifikasi
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Avatar Dropdown */}
                <div className="relative ml-2">
                  <button
                    onClick={() => {
                      setDropdownOpen(!dropdownOpen);
                      setNotificationOpen(false);
                    }}
                    className="p-2"
                  >
                    {userData ? (
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                        {getInitials(userData.name, userData.email)}
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                    )}
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white"
                >
                  <LogIn className="w-4 h-4" /> Sign In
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:brightness-90"
                >
                  <UserPlus className="w-4 h-4" /> Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="w-6 h-6 text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsOpen(false)}
            ></div>

            {/* Sidebar */}
            <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <Link
                  to="/"
                  className="text-primary font-bold text-xl"
                  onClick={() => setIsOpen(false)}
                >
                  DermaSense
                </Link>
                <button onClick={() => setIsOpen(false)} className="p-2">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* User Info */}
              {isLoggedIn && userData && (
                <div className="p-4 bg-gray-50 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                      {getInitials(userData.name, userData.email)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{userData.name || 'User'}</p>
                      <p className="text-sm text-gray-500">{userData.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="flex-1 py-4">
                <div className="space-y-1 px-4">
                  {['/', '/scan', '/article'].map((path, idx) => {
                    const names = ['Home', 'Scan', 'Article'];
                    const icons = [Home, Search, Newspaper];
                    const Icon = icons[idx];
                    const isActive = location.pathname === path;
                    return (
                      <Link
                        key={path}
                        to={path}
                        className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                          isActive
                            ? 'text-primary bg-primary/10 border border-primary/20'
                            : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {names[idx]}
                      </Link>
                    );
                  })}

                  {/* Divider */}
                  <div className="my-4 border-t"></div>

                  {/* Sidebar Actions */}
                  {isLoggedIn && (
                    <>
                      <Link
                        to="/history"
                        className="flex items-center px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        <History className="w-5 h-5 mr-3" />
                        History
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-5 h-5 mr-3 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                          {userData ? getInitials(userData.name, userData.email) : 'U'}
                        </div>
                        Profile
                      </Link>
                    </>
                  )}

                  {!isLoggedIn && (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center px-3 py-3 rounded-lg text-base font-medium text-primary hover:bg-primary/10"
                        onClick={() => setIsOpen(false)}
                      >
                        <LogIn className="w-5 h-5 mr-3" />
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center px-3 py-3 rounded-lg text-base font-medium bg-primary text-white hover:brightness-90"
                        onClick={() => setIsOpen(false)}
                      >
                        <UserPlus className="w-5 h-5 mr-3" />
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Logout Button */}
              {isLoggedIn && (
                <div className="border-t p-4">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
