import { FileText, Lock } from "lucide-react";

const RecentFile = ({ files }) => {

const formatFileSize = (bytes) => {
if (!bytes) return "-";
if (bytes < 1024) return bytes + " B";
if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
return (bytes / (1024 * 1024)).toFixed(2) + " MB";
};

const formatDate = (date) => {
if (!date) return "-";
return new Date(date).toLocaleDateString("en-GB", {
day: "numeric",
month: "short",
year: "numeric",
});
};

return ( <div className="bg-white rounded-xl shadow p-8">

  {/* Title */}
  <h2 className="font-semibold text-gray-800 text-lg mb-6">
    Recent Files ({files.length})
  </h2>

  {/* Table */}
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left">

      {/* Table Header */}
      <thead className="text-gray-500 border-b">
        <tr>
          <th className="py-4 font-medium">Name</th>
          <th className="py-4 font-medium">Size</th>
          <th className="py-4 font-medium">Uploaded By</th>
          <th className="py-4 font-medium">Modified</th>
          <th className="py-4 font-medium">Sharing</th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {files.map((file, index) => (
          <tr
            key={index}
            className="border-b hover:bg-gray-50 transition"
          >
            {/* File Name */}
            <td className="py-5 flex items-center gap-3">
              <FileText
                size={18}
                className="text-purple-500 flex-shrink-0"
              />
              <span className="truncate max-w-[260px]">
                {file.fileName || file.name}
              </span>
            </td>

            {/* File Size */}
            <td className="py-5 text-gray-600">
              {formatFileSize(file.size)}
            </td>

            {/* Uploaded By */}
            <td className="py-5 text-gray-600">
              You
            </td>

            {/* Modified Date */}
            <td className="py-5 text-gray-600">
              {formatDate(file.uploadedAt)}
            </td>

            {/* Sharing */}
            <td className="py-5">
              <div className="flex items-center gap-2 text-gray-600">
                <Lock size={16} />
                Private
              </div>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  </div>

</div>


);
};

export default RecentFile;
