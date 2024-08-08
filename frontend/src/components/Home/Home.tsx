import axios from "axios";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import UploadFile from "../UploadFile/UploadFile";
import FilesList from "../FilesList/FilesList";
import Alert from "../Alert/Alert";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFile,
  updateStatusByFileName,
} from "../../app/features/files/filesSlice";
import Footer from "../Footer/Footer";

const Home = () => {
  const dispatcher = useDispatch();

  interface FileItem {
    name: String;
    size: number;
    status: String;
    fileId: String;
    type: String;
    lastModified: String;
    fileBlob: String;
  }

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState(Array<FileItem>);

  const filesObject = useSelector((state: any) => state.files);

  const triggerAlert = (success: boolean, message: string) => {
    setAlertSuccess(success);
    setShowAlert(true);
    setAlertMessage(message);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };

  const fileUploadHandler = (files: any) => {
    for (const file of files) {
      dispatcher(addFile(file));
    }
  };

  const urlToObject = async (url: string, name: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], name);
    return file;
  };

  useEffect(() => {
    clearQueue();
  }, [filesObject]);

  const clearQueue = () => {
    const queueLength = filesObject.reduce((acc: number, file: FileItem) => {
      if (file.status == "queue") {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    if (queueLength > 0) {
      let file: any;
      for (const thisFile of filesObject) {
        if (thisFile.status === "queue") {
          file = thisFile;
          dispatcher(
            updateStatusByFileName({
              filename: file.name,
              status: "progress",
            })
          );
          break;
        }
      }

      if (file.size > 20000000) {
        dispatcher(
          updateStatusByFileName({
            filename: file.name,
            status: "oversize",
          })
        );
        return;
      }

      urlToObject(file.fileBlob, file.name).then((output) => {
        const formData = new FormData();
        formData.append("file", output);
        axios({
          method: "post",
          url: `${import.meta.env.VITE_BACKEND_API}/api/upload`,
          data: formData,
        })
          .then(function (response) {
            let fileId = response.data;
            dispatcher(
              updateStatusByFileName({
                filename: file.name,
                status: "success",
                fileId: fileId,
              })
            );
            triggerAlert(true, "Uploaded Successfully");
            setUploadedFiles([...uploadedFiles, file.name]);
          })
          .catch(function (response) {
            dispatcher(
              updateStatusByFileName({
                filename: file.name,
                status: "error",
              })
            );
            console.log(response);
          });
      });
    }
  };

  return (
    <>
      <Alert
        success={alertSuccess}
        message={alertMessage}
        showAlert={showAlert}
      />
      <div className="min-h-[100vh]">
      <Header />
      <Hero />
      <UploadFile onFileUpload={fileUploadHandler} />
      <FilesList filesObject={filesObject} triggerAlert={triggerAlert} />
      </div>
      <Footer />
      
    </>
  );
};

export default Home;
