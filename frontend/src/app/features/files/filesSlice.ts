import { createSlice} from "@reduxjs/toolkit";

interface FileItem {
    name: String;
    size: Number;
    status: String;
    fileId: String;
    type: String;
    lastModified : String;
    fileBlob: File;
  }

const initialState : Array<FileItem> = [];

  export const fileSlice = createSlice({
    name: "files",
    initialState,
    reducers: {
        addFile : (state, action) => {
            const newFile : any = {
                name: action.payload.name,
                size: action.payload.size,
                status: "queue",
                fileId: "",
                type: action.payload.type,
                lastModified: action.payload.lastModified,
                fileBlob: URL.createObjectURL(action.payload),
            }
            state.push(newFile);
        },
        updateStatusByFileName : (state, action) => {
            let filename = action.payload.filename;
            let status = action.payload.status;
            let fileId = action.payload.fileId;
            state = state.map(file => {
                if(file.name === filename){
                    let newFile = {...file};
                    newFile.status = status;
                    newFile.fileId = fileId
                    return newFile
                }else{
                    return file;
                }
            })
            return state;
        }
    },
  });
  
  export const {addFile, updateStatusByFileName} = fileSlice.actions;
  export default fileSlice.reducer;
