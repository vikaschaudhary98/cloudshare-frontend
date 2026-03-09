import { useContext, useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { useAuth } from "@clerk/clerk-react";
import { UserCreditsContext } from "../context/UserCreditsContext";
import { AlertCircle } from "lucide-react";
import axios from "axios";
import UploadBox from "../components/UploadBox";
import { apiEndpoints } from "../Util/apiEndpoints";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Upload=()=>{
   const [files,setFiles]=useState([]);
   const [uploading,setUploading]=useState(false);
   const [message,setMessage]=useState("");
   const [messageType,setMessageType]=useState("");
   const {getToken}=useAuth();
   const {credits,setCredits}=useContext(UserCreditsContext);
   const MAX_FILES=5;
   const navigate=useNavigate();
   const [uploadProgress, setUploadProgress] = useState(0);

 

   const handleFileChange=(e)=>{
         const selectedFiles =Array.from(e.target.files);
               if(files.length + selectedFiles.length>MAX_FILES){
                setMessage(`You can only a maximum of ${MAX_FILES} files at once`);
                setMessageType("error");
                return;
               }
               setFiles((prevFiles)=>[...prevFiles, ...selectedFiles])
               
               setMessage("");
          
            }
   const handleRemoveFile=(index)=>{
      setFiles((prevFiles)=>prevFiles.filter((_,i)=>i!==index)) ;
       setMessageType("");
       setMessage("");

        

   }
   const handleUpload=async()=>{
           
if(files.length===0){
    setMessageType("error");
    setMessage("Please select at least one file to upload");
    return;
}

if(files.length>MAX_FILES){
    setMessage(`You can only upload  a maximum of${MAX_FILES} files at once `);
    setMessageType("error");
    return;
}

  setUploading(true);
  setMessage("Uploading Files ...");
  setMessageType("Info");
  const formData=new FormData();
  files.forEach((file)=>formData.append("files",file));
  try {
    const token = await getToken();
    const response = await axios.post(apiEndpoints.UPLOAD_FILE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        setUploadProgress(percent);
      },
    });
    if (response.data && response.data.remainingCredits != undefined) {
      setCredits(response.data.remainingCredits);
    }
    setMessage("Files uploaded successfully .");
    setMessageType("success");
    setFiles([]);
    window.dispatchEvent(new Event("filesUploaded"));
  } catch (error) {
    console.error("Error uploading files", error);
    setMessage(
      error.response?.data?.message || "Error uploading files please try again",
    );
    setMessageType("error");
  } finally {
    setTimeout(() => {
      setUploading(false);
      setUploadProgress(0);
    }, 500);
  }
   }
   const isUploadDisabled=files.length===0 ||files.length>MAX_FILES ||credits<=0 
   ||files.length>credits;
    return (
      <DashboardLayout activeMenu="Upload">
        <div className="p-6">
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-center gap-3
                 ${
                   messageType === "error"
                     ? "bg-red-50"
                     : messageType === "success"
                       ? "bg-green-50 text-green-700"
                       : "bg-blue-50 text-blue-700"
                 } `}
            >
              {messageType === "error" && <AlertCircle size={20} />}
              {message}
            </div>
          )}
          <UploadBox
            files={files}
            onFileChange={handleFileChange}
            onUpload={handleUpload}
            uploading={uploading}
            uploadProgress={uploadProgress}
            onRemoveFile={handleRemoveFile}
            remainingCredits={credits}
            isUploadDisabled={isUploadDisabled}
          />

          {/* Upload Guidelines */}
          <div className="mt-6 bg-purple-50 rounded-xl shadow-md border border-gray-200 p-8 min-h-[240px]">
            <h3 className="text-lg font-bold text-gray-800 mb-6">
              Upload Guidelines
            </h3>

            <div className="grid grid-cols-3 gap-6 text-lg text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-purple-500">📁</span>
                Maximum 5 files at once
              </div>

              <div className="flex items-center gap-2">
                <span className="text-blue-500">📦</span>
                Max file size: 100MB
              </div>

              <div className="flex items-center gap-2">
                <span className="text-green-500">📄</span>
                Images, Videos, Audio supported
              </div>

              <div className="flex items-center gap-2">
                <span className="text-amber-500">📑</span>
                Documents like PDF, DOC, TXT allowed
              </div>

              <div className="flex items-center gap-2">
                <span className="text-red-500">🚫</span>
                Executable files are not allowed
              </div>

              <div className="flex items-center gap-2">
                <span className="text-indigo-500">⚡</span>
                Faster upload with stable internet
              </div>

              <div className="flex items-center gap-2">
                <span className="text-pink-500">🔒</span>
                Files are securely stored
              </div>

              <div className="flex items-center gap-2">
                <span className="text-teal-500">💳</span>
                Each upload uses 1 credit
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
}
export default Upload;