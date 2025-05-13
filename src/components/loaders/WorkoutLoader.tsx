import React from "react";
import "./WorkoutLoader.css";

interface WorkoutLoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

const WorkoutLoader: React.FC<WorkoutLoaderProps> = ({
  text = "Loading...",
  size = "md",
}) => {
  // Size map for the barbell icon
  const sizeMap = {
    sm: "w-16 h-12",
    md: "w-24 h-16",
    lg: "w-36 h-24",
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`${sizeMap[size]} barbell-animation`}>
        <svg
          viewBox="0 0 120 40"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Bar */}
          <rect x="20" y="18" width="80" height="4" rx="2" fill="#888" />

          {/* Weights - Left Side */}
          <rect x="5" y="10" width="5" height="20" rx="1" fill="#333" />
          <rect x="10" y="8" width="5" height="24" rx="1" fill="#444" />
          <rect x="15" y="5" width="5" height="30" rx="1" fill="#555" />

          {/* Left collar */}
          <rect x="20" y="15" width="2" height="10" rx="1" fill="#9EF300" />

          {/* Weights - Right Side */}
          <rect x="110" y="10" width="5" height="20" rx="1" fill="#333" />
          <rect x="105" y="8" width="5" height="24" rx="1" fill="#444" />
          <rect x="100" y="5" width="5" height="30" rx="1" fill="#555" />

          {/* Right collar */}
          <rect x="98" y="15" width="2" height="10" rx="1" fill="#9EF300" />

          {/* Hand grip areas - with branded color */}
          <rect x="30" y="18" width="10" height="4" rx="2" fill="#9EF300" />
          <rect x="80" y="18" width="10" height="4" rx="2" fill="#9EF300" />
        </svg>
      </div>
      {text && <p className="mt-3 text-gray-600">{text}</p>}
    </div>
  );
};

export default WorkoutLoader;
