// components/FileUpload.tsx
import React from "react";

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileChange(file);
  };

  return (
    <div className="border-2 border-gray-200 border-dashed rounded-md p-6 text-center ">
      <p className="mb-2 text-gray-600">Drag & drop file here</p>
      <p className="mb-4 text-gray-400 text-sm">or</p>
      <label className="cursor-pointer inline-block bg-gray-100 px-4 py-2 rounded shadow">
        <input type="file" className="hidden" onChange={handleFileChange} />
        Select File
      </label>
    </div>
  );
};

export default FileUpload;
