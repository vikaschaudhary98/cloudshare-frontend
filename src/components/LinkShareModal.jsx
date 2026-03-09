import React, { useState } from "react";
import { Copy, X, Check } from "lucide-react";
import toast from "react-hot-toast";

const LinkShareModal = ({ isOpen, onClose, link, title }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success("Link copied clipboard!");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Copy failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-112.5 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>

          <button onClick={onClose}>
            <X size={20} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3">
          Share this link with others to give them access to this file
        </p>

        {/* Link box */}
        <div className="flex items-center border rounded-md overflow-hidden">
          <input
            type="text"
            value={link}
            readOnly
            className="flex-1 px-3 py-2 text-sm outline-none"
          />

          <button
            onClick={handleCopy}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
          >
            {copied ? (
              <Check size={18} className="text-green-600" />
            ) : (
              <Copy size={18} />
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Anyone with this link can access this file.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Close
          </button>

          <button
            onClick={handleCopy}
            className={`px-4 py-2 text-sm rounded text-white ${
              copied ? "bg-green-600" : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkShareModal;
