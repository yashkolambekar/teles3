import { Link, useParams } from "react-router-dom";
import Header from "../Header/Header";
import axios from "axios";
import { useEffect, useState } from "react";

const Download = () => {


  const [downloadMessage, setDownloadMessage] = useState(String);
  const [customDownloadLink, setCustomDownloadLink] = useState(String);
  const [fileIdInput, setFileIdInput] = useState(String);

  const routeParams = useParams();
  const fileId = routeParams.fileid;

  
  if(fileId === undefined){

    const handleInput = (e : any) => {
        setFileIdInput(e.target.value);
    }

      const handleClick = (e : any) => {
        e.preventDefault();
        window.location.href = `/${fileIdInput}`;
      }
      return (
        <>
          <Header />
          <div className="w-full flex justify-center">
            <div className="flex flex-col w-full md:w-[50em] items-center p-4">
              <p className="text-xl font-semibold">Download file by Id</p>
              <div className="p-4 w-full">
                <input className="w-full bg-[#141418] text-center p-4 text-[2em] tracking-[0.3em] rounded-xl border-[1px] border-[rgba(255,255,255,0.1)]" type="text" placeholder="xxxxx" value={fileIdInput} onInput={handleInput} />
                <button onClick={handleClick} className="mt-4 w-full text-black font-semibold bg-[#239407] text-center p-2 text-[1.2em] rounded-md border-[1px] border-[rgba(255,255,255,0.1)]" >Download</button>
              </div>
            </div>
          </div>
        </>
      );
  }else{

    useEffect(() => {
        axios({
            url: `${import.meta.env.VITE_BACKEND_API}/api/fileexists/${fileId}`, 
            method : 'GET'
        }).then((response) => {
            setDownloadMessage(`Your file will start downloading...`);
            // console.log(response);
            if(response.data.status == "exists" && response.data.filename != null){
                const filename = response.data.filename;
                axios({
                    url: `${import.meta.env.VITE_BACKEND_API}/api/file/${fileId}`,
                    method: 'GET',
                    responseType: 'blob', // important
                  }).then((response) => {
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', filename);
                        document.body.appendChild(link);
                        link.click();
                        setCustomDownloadLink(url);
                    })
            }
        }).catch(() => {
            setDownloadMessage("This file does not exist on TeleS3");
            return;
        })
    }, [])
    



    return(
        <>
          <Header />
          <div className="w-full flex justify-center">
            <div className="flex flex-col w-full md:w-[50em] items-center p-4">
              <p>{downloadMessage}</p>
              {customDownloadLink ? (<p>If the download doesn't start automatically, <Link className="underline" to={customDownloadLink}>click here</Link></p>) : "" }
            </div>
          </div>
        </>
    )
  }

};

export default Download;
