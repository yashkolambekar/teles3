import FileItem from "./FileItem/FileItem";

const FilesList = ({triggerAlert, filesObject} : any) => {

    const fileItemsArray = [];

    for(const file of filesObject){
        fileItemsArray.push(<FileItem 
            triggerAlert={triggerAlert}
            filename={file.name}
            fileId={file.fileId}
            status={file.status}
            key={file.name}
            />)
    }

    return (
        <>
            <div className="flex flex-col items-center w-full px-4 pb-8">
                <div className="flex flex-col w-full md:w-[50em]">
                    {fileItemsArray}
                </div>
            </div>
        </>
    )
}

export default FilesList;