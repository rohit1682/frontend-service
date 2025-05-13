import React from 'react';
import LoginDropDown from './loginDropDown';
import { IoIosNotificationsOutline } from "react-icons/io";
const LoginDetails: React.FC = () => {
  return (
    <div className="flex flex-row items-center gap-4">
      <button className="relative hover:cursor-pointer">
        <IoIosNotificationsOutline className='w-6 h-6'/>
        {/* <img src='images/Notification.png' alt='notification' className="w-6 h-6" /> */}
      </button>
      <LoginDropDown />
    </div>
  );
};

export default LoginDetails;