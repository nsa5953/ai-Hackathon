import { useState } from "react";
import styles from "../dashboard/Dashboard.module.css"
import { fetchFileUploadData } from "./fileUploadSlice";
import { useAppDispatch } from "../../app/hooks";
import img from "../../../src/cloudUpload.jpg";

const FileUpload = () => {
  const dispatch = useAppDispatch();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onFileChange = (e: any) =>{
    let files : any = selectedFiles;
    const uploadedFiles = [...e.target.files];
    uploadedFiles.forEach((file: { name: any; }) => {
       return files.push(file.name);
    })

    setSelectedFiles(files)
  }

  const handleFileUpload = (e: any) =>{
    dispatch(fetchFileUploadData({files:selectedFiles}))
  }

  return (
    <>
    <label onChange={onFileChange} htmlFor="formId">      
      <input className={styles.btnupload} name="" type="file" id="formId" multiple />
    </label>   
    {/* <button className={styles.btnupload} onClick={handleFileUpload} title="Upload">Upload</button>  */}
    <img className={styles.imgUpload} src={img} onClick={handleFileUpload} title="Upload"/>
    </>
  )
}

export default FileUpload;