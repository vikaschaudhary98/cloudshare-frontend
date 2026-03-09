import { FileText, Loader2, Trash2, Upload } from "lucide-react";

const DashboardUpload = ({
  files=[],
  onFileChange,
  onUpload,
  uploading,
  onRemoveFile,
  remainingUploads,
}) => {
  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return "-";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  // Drag & Drop
  const handleDrop = (e) => {
    e.preventDefault();

    const droppedFiles = e.dataTransfer.files;

    const event = {
      target: { files: droppedFiles },
    };

    onFileChange(event);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Upload size={18} className="text-purple-500" />
          <h2 className="font-semibold text-gray-800">Upload Files</h2>
        </div>
        <span className="text-sm text-gray-500">
          {remainingUploads} of 5 files remaining
        </span>
      </div>

      {/* Upload Box */}
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-10 cursor-pointer hover:border-purple-500 transition bg-gray-100"
      >
        <Upload className="text-purple-500 mb-3" size={32} />

        <p className="text-gray-700 text-sm">Drag and drop files here</p>

        <p className="text-gray-400 text-xs">or click to browse</p>

        <input
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            onFileChange(e);
            e.target.value = null;
          }}
        />
      </label>

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="mt-5">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Selected Files ({files.length})
          </p>

          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 border rounded-lg px-3 py-3"
              >
                {/* Left side */}
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-purple-500 shrink-0" />

                  <div className="flex flex-col">
                    <span className="text-sm text-gray-800 truncate max-w-55">
                      {file.name}
                    </span>

                    <span className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => onRemoveFile(index)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={onUpload}
        disabled={uploading}
        className="w-full mt-5 bg-gradient-to-r from-purple-600 to-purple-500 hover:opacity-90 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
      >
        {uploading && <Loader2 size={18} className="animate-spin" />}

        {uploading
          ? "Uploading..."
          : `Upload ${files.length > 0 ? files.length : ""} File${files.length > 1 ? "s" : ""}`}
      </button>
    </div>
  );
};

export default DashboardUpload;
