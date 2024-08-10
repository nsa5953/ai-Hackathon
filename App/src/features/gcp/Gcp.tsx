import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { approveColumGcpData, fetchGcpChartData, fetchGcpData, rejectColumGcpData, selectChartData, selectGcpData, setPieSeries, setXaxisData, setYaxisData } from "../gcp/gcpSlice";
import GCPCharts from "../charts/GCPCharts";
import FileUpload from "../fileUpload/FileUpload";
import styles from "./Gcp.module.css"
import { fetchChartData } from "./GcpAPI";

const Gcp = () => {
  const dispatch = useAppDispatch();
  const GcpData = useAppSelector(selectGcpData)
  let column_name_flag = false;

  const handleGCPConnect = () => {

    let xAxis = GcpData.rows?.map((data: { country_name: any; }) => data.country_name)
    let data = GcpData.rows?.map((ele:  any) => ele.population_male)
    let new_confirmed = GcpData.rows?.map((ele:  any) => ele.new_confirmed)
    
    dispatch(setXaxisData(xAxis))
    dispatch(setYaxisData([{data, name:'population_male'},{data:new_confirmed,name:'new_confirmed'}]))
  }



  useEffect(() => {
    dispatch(fetchGcpData())
    dispatch(fetchGcpChartData())
  },[])

  const handleApprove = (data: any) => {
    console.log("ele",JSON.stringify(data))
    dispatch(approveColumGcpData(data))
  }

  const handleReject = (data: any) => {
    console.log("ele",JSON.stringify(data))
    dispatch(rejectColumGcpData(data))
  }

  return (
    <div  className={styles.gcpLogTable}>
      <div className={styles.title}>Storage Logs</div>
    {/* <button onClick={handleGCPConnect}>Connect GCP</button>
    &nbsp;
    <FileUpload /> */}
    <table className={styles.main}>
      <thead className={styles.header}>
      <tr> 
        {GcpData.rows?.map((data: any) => {
          if(!column_name_flag) {            
            column_name_flag = true;
              return (Object.keys(data).map(ele => {
                return (<td className={styles.dataCoulmn} key={ele}>{ele}</td>)
              }))
          }})
        }
        {/* <td className={styles.dataCoulmn}>Actions</td> */}
      </tr>
      </thead>
      <tbody>
      {/*Table column data*/}
      {GcpData?.rows?.map((data: any,i:number) => {
        return (
          <tr className={styles.row} key={i}>
          {(Object.values(data).map((ele:any, i,number) => {
            if(i == 0) {
              return (
                <td className={styles.data} key={ele} title={ele}>
                <a className={styles.link} href={`https://storage.cloud.google.com/hack-team-dbvolthacksquad-garnished-docs-processed/${ele}`} target="_blank">{ele}         </a>
                </td>)
            }
            if(ele === 'action_required'){
              return (
                <td className={styles.data} key={ele}>
                  <button onClick={() => handleApprove(data)} className={styles.btn}>Approve</button>
                  <button onClick={() => handleReject(data)} className={styles.btn}>Reject</button>
                </td>
              )
            }
              return (
              <td className={styles.data} key={ele}>
              {ele}
              </td>)
              
          }))}          
        </tr>)})
      } 
      </tbody>
    </table>
    </div>
  )
}

export default Gcp;