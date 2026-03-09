import React, { useState } from "react";
import { Upload, X, File } from "lucide-react";

const UploadBox = ({
  files = [],
  onFileChange,
  onUpload,
  uploading,
  uploadProgress,
  onRemoveFile,
  remainingCredits,
  isUploadDisabled,
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);

    const event = {
      target: { files: droppedFiles },
    };

    onFileChange(event);
  };

  const formatFileSize = (size) => {
    if (size < 1024) return size + " B";
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + " KB";
    return (size / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Upload className="text-blue-500" size={20} />
          <h2 className="font-semibold text-lg">Upload Files</h2>
        </div>

        <span className="text-sm text-gray-500">
          {remainingCredits} credits remaining
        </span>
      </div>

      {/* Upload Area */}
      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-3 border-dashed  bg-gray-100 rounded-xl flex flex-col items-center justify-center p-10 cursor-pointer transition
        ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:bg-gray-50"}
        `}
      >
        <div className="bg-blue-100 p-3 rounded-full mb-3">
          <Upload className="text-blue-600" size={22} />
        </div>

        <p className="text-gray-700 font-medium">Drag and drop files here</p>

        <p className="text-gray-500 text-sm">
          or click to browse ({remainingCredits} credits remaining)
        </p>

        <input
          type="file"
          multiple
          onChange={onFileChange}
          className="hidden"
        />
      </label>

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Selected Files ({files.length})
          </h3>

          <div className="space-y-3">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between border rounded-lg px-4 py-3 bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <File className="text-blue-500" size={20} />

                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={onUpload}
        disabled={isUploadDisabled || uploading}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>
      {uploading && (
        <div className="mt-4 w-full">
          <p className="text-sm text-gray-600 mb-1">
            Uploading... {uploadProgress}%
          </p>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadBox;
