import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../button/Button";
import { CgProfile } from "react-icons/cg";
import { imagePlaceholder } from "../../constants/imagePlaceholder";

const LoginDropDown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userData, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  const handleEditProfile = (role?: string) => {
    if (role === "Coach") {
      navigate("/users/coachId");
    } else {
      navigate("/users/clientId");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center focus:outline-none"
      >
        {userData?.profileImage ? (
          <img
            src={userData.profileImage}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <CgProfile className="w-6 h-6 hover:cursor-pointer" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                {userData?.profileImage ? (
                  <img
                    src={userData.profileImage}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={imagePlaceholder.profile}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-800">
                  {userData?.firstName} {userData?.lastName} ({userData?.role})
                </p>
                <p className="text-sm text-gray-500">{userData?.email}</p>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <Button
              onClick={() => handleEditProfile(userData?.role)}
              className="flex items-center gap-3 w-full text-left"
              variant="secondary"
            >
              <img src="images/Settings.png" alt="settings" />
              <div>
                <p className="font-medium">My Account</p>
                <p className="text-sm text-gray-500">Edit account profile</p>
              </div>
            </Button>

            <Button
              variant="secondary"
              className="w-full py-2 mt-2"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginDropDown;
