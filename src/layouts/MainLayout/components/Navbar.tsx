/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import logo from "./../../../assets/images/logo.png";
import navLinks from "../../../constants/navlinks";
import Button from "../../../components/button/Button";
import { useAuth } from "../../../context/AuthContext";
import LoginDetails from "../../../components/workoutCard/logindetails";
import { imagePlaceholder } from "../../../constants/imagePlaceholder";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isLoggedIn, userData, logout } = useAuth();
  const navigate = useNavigate();

  const filteredNavLinks = navLinks.filter((link) => {
    // If user is not logged in, only show Home and Coaches
    if (!isLoggedIn) {
      return link.name === "Home" || link.name === "Coaches";
    }

    // If user is a coach, hide the Coaches link
    if (userData?.role === "Coach") {
      return (
        link.name !== "Coaches" &&
        link.name !== "Reports" &&
        link.name !== "Home"
      );
    }

    // For logged-in clients, show all links except Reports
    return link.name !== "Reports";
  });

  const handleLogin = () => {
    navigate("/auth/login");
  };

  const handleRegister = () => {
    navigate("/auth/register");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="h-16 bg-white flex items-center justify-between px-6 z-50 sticky top-0 shadow">
      <div className="flex items-center">
        <img src={logo} alt="EnergyX" className="h-8" />
        <nav className="pl-6 font-light hidden md:block">
          <ul className="flex gap-4">
            {filteredNavLinks.map((item) => (
              <li
                key={item.id}
                className="inline-block transition-all duration-200 ease-in"
              >
                <NavLink to={item.route} style={{ paddingBottom: "6px" }}>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="hidden md:flex items-center gap-4">
        {isLoggedIn ? (
          <LoginDetails />
        ) : (
          <>
            <Button variant="secondary" onClick={handleRegister}>
              Register
            </Button>
            <Button variant="secondary" onClick={handleLogin}>
              Log In
            </Button>
          </>
        )}
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-40 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <img src={logo} alt="EnergyX" className="h-6" />
          <button
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FiX size={24} />
          </button>
        </div>

        {isLoggedIn && (
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                {userData?.profileImage ? (
                  <img
                    src={userData.profileImage}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <FiUser size={20} />
                  </div>
                )}
              </div>
              <div>
                <p className="font-medium">
                  {userData?.firstName} {userData?.lastName}
                </p>
                <p className="text-sm text-gray-600">{userData?.email}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="p-4">
          <ul className="space-y-4">
            {filteredNavLinks.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.route}
                  className="block py-2"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {!isLoggedIn && (
          <div className="p-4 space-y-4">
            <Button
              variant="secondary"
              onClick={handleRegister}
              className="w-full"
            >
              Register
            </Button>
            <Button
              variant="secondary"
              onClick={handleLogin}
              className="w-full"
            >
              Log In
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
