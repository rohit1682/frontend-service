import React from "react";
import { AiOutlineDownload, AiOutlineDelete } from "react-icons/ai";

// Define types for the props
interface FileCardProps {
  fileName: string;
  fileSize: string;
  fileIconSrc: string;
}

const FileCard: React.FC<FileCardProps> = ({
  fileName,
  fileSize,
  fileIconSrc,
}) => {
  return (
    <div className="flex justify-between items-center">
      <img src={fileIconSrc} alt="pdf" className="w-6 h-6" />

      <p className="text-[14px] text-gray-600 flex-1 truncate ml-2">
        {fileName}
      </p>

      <p className="text-[14px] text-gray-600 ml-2">{fileSize}</p>

      <AiOutlineDownload className="ml-4 w-5 h-5 text-[14px] text-gray-600 cursor-pointer" />

      <AiOutlineDelete className="w-5 h-5 text-[14px] text-gray-600 cursor-pointer" />
    </div>
  );
};

export default FileCard;
