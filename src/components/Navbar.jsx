// src/components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config"; // pastikan path-nya sesuai
import { User, ChevronDown, LogOut, UserCircle } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Subcription", path: "/subscription" },
    { name: "Contact Us", path: "/contact" },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })

    return () => unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try{
      await signOut(auth);
      setIsProfileOpen(false);
      navigate("/login");
    }catch(error){
      console.error("Gagal Logout: ", error.message);
    }
  }

  // Get user display name or email
  const getUserDisplayName = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName;
    }
    if (currentUser?.email) {
      return currentUser.email.split('@')[0];
    }
    return 'User';
  };

  // Get user avatar or initials
  const getUserAvatar = () => {
    if (currentUser?.photoURL) {
      return currentUser.photoURL;
    }
    return null;
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-inter font-semibold">SEA Catering</h1>
          <p className="text-sm font-inter">Healthy Meals, Anytime, Anywhere</p>
        </div>
        
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>☰</button>
        </div>

        <ul className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `hover:underline transition-all duration-200 ${
                    isActive ? "font-bold underline" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}

          {/* Auth Navigation */}
          {currentUser ? (
            <li className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                {getUserAvatar() ? (
                  <img
                    src={getUserAvatar()}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                    {getUserInitials()}
                  </div>
                )}
                <ChevronDown 
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    isProfileOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      {getUserAvatar() ? (
                        <img
                          src={getUserAvatar()}
                          alt="Profile"
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-semibold">
                          {getUserInitials()}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-800">{getUserDisplayName()}</p>
                        <p className="text-sm text-gray-500">{currentUser?.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate('/dashboard');
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <UserCircle className="w-4 h-4 mr-3" />
                      Dashboard
                    </button>
                    
                  </div>

                  <div className="border-t border-gray-100 py-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className="text-blue-600 hover:underline transition-all duration-200"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <ul className="md:hidden px-4 pb-4 space-y-2 font-inter border-t border-gray-100 bg-white">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-2 transition-all duration-200 ${
                    isActive ? "font-bold underline" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          
          {currentUser ? (
            <>
              {/* Mobile User Info */}
              <li className="border-t border-gray-100 pt-2">
                <div className="flex items-center space-x-3 py-2">
                  {getUserAvatar() ? (
                    <img
                      src={getUserAvatar()}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                      {getUserInitials()}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-800">{getUserDisplayName()}</p>
                    <p className="text-xs text-gray-500">{currentUser?.email}</p>
                  </div>
                </div>
              </li>
              
              <li>
                <NavLink
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center py-2 text-gray-700"
                >
                  <UserCircle className="w-4 h-4 mr-2" />
                  Dashboard
                </NavLink>
              </li>
              
              <li>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center py-2 text-red-600 w-full text-left"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="border-t border-gray-100 pt-2">
                <NavLink 
                  to="/login" 
                  onClick={() => setIsOpen(false)} 
                  className="block py-2 text-blue-600"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/register" 
                  onClick={() => setIsOpen(false)} 
                  className="block py-2 bg-blue-600 text-white rounded-lg text-center"
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}