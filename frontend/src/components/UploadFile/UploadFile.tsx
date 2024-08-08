import { useState } from "react";
import FileUploadIcon from "../../assets/fileupload.svg";

const UploadFile = ({ onFileUpload }: any) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e : any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e : any) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', () => {
        const files = fileInput.files;
        onFileUpload(files);
    });

    fileInput.click();
  }

  const handleDrop = (e : any) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;

    // Upload files to the server
    onFileUpload(files);
  };

  return (
    <>
      <div className="flex flex-col p-4 items-center w-full">
        <div className="w-full md:w-[50em]">
          <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          className={`${isDragging ? 'bg-slate-700' : ''} z-1 h-[10em] flex flex-col items-center justify-center rounded-xl border-dotted border-slate-500 border-[0.15em]`}>
            <img  src={FileUploadIcon} className="z-0 h-[2em] mb-1" alt="" />
            <p className="z-0">Drop a file or click to select</p>
            <p className="z-0 text-[0.6em]">Upto 20MB</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadFile;
