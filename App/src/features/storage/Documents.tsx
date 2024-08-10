import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchStorageData, selectStorageFiles } from "./storageSlice";
import styles from "./../storage/Documents.module.css"


const Documents = () => {  
  const dispatch = useAppDispatch();
  
  const storageFiles = useAppSelector(selectStorageFiles)

  useEffect(() => {
    dispatch(fetchStorageData())
  },[])




  return (
    <div className={styles.uploadedHeader}>
      <table className={styles.main}>
      <thead className={styles.header}>        
        <tr>
          <td className={styles.dataCoulmn}> Uploaded files</td>
        </tr>
      </thead>
      
        <tbody>
          {storageFiles?.map((file: any,i:number) => {
          return (<tr className={styles.row}>
            {/* <td className={styles.data}>{i+1}</td> */}
            <td className={styles.data} title={file?.name}>{file?.name} 
              {/* <a className={styles.link} href={`https://storage.cloud.google.com/${file?.storage?.projectId}/${file?.name}`} target="_blank">{file?.name} 
                <div className={styles.download}>&darr;</div>
              </a> */}
              </td>
            </tr>)
        })}
        </tbody>
      </table>
    </div>

  )

}

export default Documents;
