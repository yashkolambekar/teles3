import { useEffect, useState } from "react";
import CopyIcon from "../../../assets/copy.svg";
import uploadingIcon from "../../../assets/uploading.svg";
import errorIcon from "../../../assets/error.svg";

const FileItem = ({triggerAlert, filename, fileId, status} : any) => {

  const url = `/file/${fileId}`;

  const copyLink = () => {
    if(status == "success"){
      navigator.clipboard.writeText(url);
      triggerAlert(true, "Copied URL to clipboard");
    }
  }

  const [statusVisuals, setStatusVisuals] = useState({
    borderColor: "",
    statusMessage: "",
    icon: ""
  })

  useEffect(() => {
    if(status === "success"){
      const newStatusVisuals = {
        borderColor : "border-green-700",
        statusMessage: `Uploaded Succesfully - ${fileId}`,
        icon: CopyIcon
      }
      setStatusVisuals(newStatusVisuals);
    }else if(status === "progress"){
      const newStatusVisuals = {
        borderColor : "border-yellow-700",
        statusMessage: `Uploading...`,
        icon: uploadingIcon
      }
      setStatusVisuals(newStatusVisuals);
    }else if(status === "error"){
      const newStatusVisuals = {
        borderColor : "border-red-700",
        statusMessage: `Some error occurred`,
        icon: errorIcon
      }
      setStatusVisuals(newStatusVisuals);
    }else if(status === "queue"){
      const newStatusVisuals = {
        borderColor : "border-slate-400",
        statusMessage: `In Upload Queue`,
        icon: ""
      }
      setStatusVisuals(newStatusVisuals);
    }else if(status === "oversize"){
      const newStatusVisuals = {
        borderColor : "border-red-700",
        statusMessage: `File size over 20 MB`,
        icon: errorIcon
      }
      setStatusVisuals(newStatusVisuals);
    }
  }, [status])

  


  return (
    <>
      <div className={`border ${statusVisuals.borderColor} p-2 rounded-md my-1.5 flex justify-between`}>
        <div>
        <p className="text-[0.7em] break-all">{filename}</p>
        <p className="text">{statusVisuals.statusMessage}</p>
        </div>
        <div className={`flex-shrink-0 flex items-center px-2 ${status == "success" ? "hover:cursor-pointer" : ""} min-w-[2em]`}>
          <img onClick={copyLink} className="flex-grow z-10 min-h-[1.5em] !h-[1.5em]" src={statusVisuals.icon} alt="" />
        </div>
      </div>
    </>
  );
};

export default FileItem;
