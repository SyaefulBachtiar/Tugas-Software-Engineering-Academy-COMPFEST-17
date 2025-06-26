// src/components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config"; // pastikan path-nya sesuai

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try{
      await signOut(auth);
      navigate("/login");
    }catch(error){
      console.error("Gagagl Login: ", error.message);
    }
  }

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
                  `hover:underline ${
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
            <li>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className="text-blue-600 hover:underline"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="text-blue-600 hover:underline"
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
        <ul className="md:hidden px-4 pb-4 space-y-2 font-inter">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-2 ${
                    isActive ? "font-bold underline" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          {currentUser ? (
            <li>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="text-red-600"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <NavLink to="/login" onClick={() => setIsOpen(false)} className="text-blue-600">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" onClick={() => setIsOpen(false)} className="text-blue-600">
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
