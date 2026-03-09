import DashboardUpload from "../components/DashboardUpload"; // adjust path as needed
import RecentFile from "../components/RecentFile"; // adjust path as needed
import { useAuth } from "@clerk/clerk-react";
import DashboardLayout from "../layout/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { UserCreditsContext } from "../context/UserCreditsContext";
import axios from "axios";
import { apiEndpoints } from "../Util/apiEndpoints";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [remainingUploads, setRemainingUploads] = useState(5);
  const { getToken } = useAuth();
  const { fetchUserCredits } = useContext(UserCreditsContext);
  const MAX_FILES = 5;

  
    const fetchRecentFiles = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        const res = await axios.get(apiEndpoints.FETCH_FILES, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const sortedFiles = res.data
          .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
          .slice(0, 5);
        setFiles(sortedFiles);
      } catch (error) {
        console.error("Error Fetching recent files:", error);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    fetchRecentFiles();
  }, [getToken]);

useEffect(() => {
  const refreshFiles = () => {
    fetchRecentFiles();
  };

  window.addEventListener("filesUploaded", refreshFiles);

  return () => {
    window.removeEventListener("filesUploaded", refreshFiles);
  };
}, []);


  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (uploadFiles.length + selectedFiles.length > MAX_FILES) {
      setMessage(
        `You can only upload a maximum of ${MAX_FILES} files at one time`,
      );
      setMessageType("error");
      return;
    }
    setUploadFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setMessage("");
    setMessageType("");
  };

  const handleRemoveFiles = (index) => {
    setUploadFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setMessage("");
    setMessageType("");
  };

  useEffect(() => {
    setRemainingUploads(MAX_FILES - uploadFiles.length);
  }, [uploadFiles]);

  const handleUpload = async () => {
    if (uploadFiles.length === 0) {
      setMessageType("error");
      setMessage("Please select at least one file to upload");
      return;
    }

    if (uploadFiles.length > MAX_FILES) {
      setMessage(
        `You can only upload  a maximum of${MAX_FILES} files at once `,
      );
      setMessageType("error");
      return;
    }

    setUploading(true);
    setMessage("Uploading Files ...");
    setMessageType("Info");
    const formData = new FormData();
    uploadFiles.forEach((file) => formData.append("files", file));
    try {
      const token = await getToken();
      const response = await axios.post(apiEndpoints.UPLOAD_FILE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Files uploaded successfully .");
      setMessageType("Success");
      setUploadFiles([]);
      const res = await axios.get(apiEndpoints.FETCH_FILES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const sortedFiles = res.data
        .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
        .slice(0, 5);
      setFiles(sortedFiles);
      await fetchUserCredits();
    } catch (error) {
      console.error("Error uploading files", error);

      setMessage(
        error.response?.data?.message ||
          "Error uploading files please try again",
      );
      setMessageType("error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">My Drive</h1>
        <p className="text-gray-600 mb-6 ">
          {" "}
          Uploading , manage and share your files securely
        </p>
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg items-center gap-3 ${messageType === "error" ? "bg-red-50 text-red-700" : messageType === "success" ? "bg-green-50 text-green-700" : "bg-purple-50 text-purple-700"}`}
          >
            {message}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[40%]">
            <DashboardUpload
              files={uploadFiles}
              onFileChange={handleFileChange}
              onUpload={handleUpload}
              uploading={uploading}
              onRemoveFile={handleRemoveFiles}
              remainingUploads={remainingUploads}
            />
          </div>
          <div className="w-full md:w-[60%]">
            {loading ? (
              <div className="bg-white rounded-lg shadow p-8 flex flex-1">
                <Loader2 size={20} className="text-purple-500 animate-spin" />
                <p className="text-gray-500 ">Loading your Files...</p>
              </div>
            ) : (
              <RecentFile files={files} />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default Dashboard;
